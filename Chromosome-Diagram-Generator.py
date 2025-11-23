import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from matplotlib.figure import Figure
import tkinter as tk
from tkinter import ttk, colorchooser, filedialog, messagebox
import os

class ChromosomeApp:
    def __init__(self, root):
        self.root = root
        self.root.title("基因绘图生成器")
        self.root.geometry("900x650")  # 增大窗口以容纳预览

        # --- 数据模型 ---
        self.gene_vars = {
            'left_top': tk.StringVar(value='d'),
            'left_middle': tk.StringVar(value=''),
            'left_bottom': tk.StringVar(value='E'),
            'right_top': tk.StringVar(value='d'),
            'right_middle': tk.StringVar(value=''),
            'right_bottom': tk.StringVar(value='E')
        }
        self.color_vars = {
            'background': tk.StringVar(value='#FFFFFF'),
            'chromosome': tk.StringVar(value='#403A3A')
        }
        self.marker_choice_var = tk.StringVar(value="None")

        # --- 布局 ---
        # 左侧面板：控制区
        left_panel = ttk.Frame(root, padding="10")
        left_panel.pack(side=tk.LEFT, fill=tk.Y)
        
        # 右侧面板：预览区
        right_panel = ttk.Frame(root, padding="10", relief="sunken")
        right_panel.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)

        self._setup_controls(left_panel)
        self._setup_preview(right_panel)
        
        # 初始化绘图
        self.update_preview()

    def _setup_controls(self, parent):
        """设置左侧控制面板"""
        # 1. 基因输入
        gene_frame = ttk.LabelFrame(parent, text="基因定义", padding="10")
        gene_frame.pack(fill=tk.X, pady=5)
        
        ttk.Label(gene_frame, text="左染色体", font="-weight bold").grid(row=0, column=1)
        ttk.Label(gene_frame, text="右染色体", font="-weight bold").grid(row=0, column=2)
        
        labels = ["顶部区域", "中间区域", "底部区域"]
        keys_l = ['left_top', 'left_middle', 'left_bottom']
        keys_r = ['right_top', 'right_middle', 'right_bottom']

        for i, (label, k_l, k_r) in enumerate(zip(labels, keys_l, keys_r)):
            ttk.Label(gene_frame, text=label).grid(row=i+1, column=0, padx=5, sticky=tk.E)
            e1 = ttk.Entry(gene_frame, textvariable=self.gene_vars[k_l], width=10)
            e1.grid(row=i+1, column=1, padx=2, pady=2)
            e1.bind('<KeyRelease>', self.schedule_update) # 绑定输入事件实现实时预览
            
            e2 = ttk.Entry(gene_frame, textvariable=self.gene_vars[k_r], width=10)
            e2.grid(row=i+1, column=2, padx=2, pady=2)
            e2.bind('<KeyRelease>', self.schedule_update)

        # 2. 样式选项
        style_frame = ttk.LabelFrame(parent, text="样式选项", padding="10")
        style_frame.pack(fill=tk.X, pady=10)

        self._create_color_picker(style_frame, "背景颜色", self.color_vars['background'], 0)
        self._create_color_picker(style_frame, "线条颜色", self.color_vars['chromosome'], 1)

        # 3. 标记
        marker_frame = ttk.Frame(style_frame)
        marker_frame.grid(row=2, column=0, columnspan=2, pady=10, sticky=tk.W)
        ttk.Label(marker_frame, text="底部标记: ").pack(side=tk.LEFT)
        for val in ["None", "XY", "XX"]:
            rb = ttk.Radiobutton(marker_frame, text=val, variable=self.marker_choice_var, 
                                 value=val, command=self.update_preview)
            rb.pack(side=tk.LEFT, padx=5)

        # 4. 按钮区
        btn_frame = ttk.Frame(parent)
        btn_frame.pack(fill=tk.X, pady=20)
        ttk.Button(btn_frame, text="保存图像", command=self.save_image, style="Accent.TButton").pack(fill=tk.X, ipady=5)

    def _create_color_picker(self, parent, text, var, row):
        """辅助函数：创建颜色选择器"""
        def pick():
            color = colorchooser.askcolor(initialcolor=var.get())[1]
            if color:
                var.set(color)
                btn.config(bg=color) # 更新按钮颜色
                self.update_preview()

        ttk.Label(parent, text=text).grid(row=row, column=0, padx=5, pady=5, sticky=tk.W)
        # 使用标准 tk.Button 因为它可以改变背景色
        btn = tk.Button(parent, bg=var.get(), width=10, command=pick, relief="flat") 
        btn.grid(row=row, column=1, padx=5, pady=5)

    def _setup_preview(self, parent):
        """初始化 Matplotlib 预览区域"""
        # 使用 Figure 而不是 pyplot，避免线程问题
        self.fig = Figure(figsize=(5, 6), dpi=100)
        self.ax = self.fig.add_subplot(111)
        
        self.canvas = FigureCanvasTkAgg(self.fig, master=parent)
        self.canvas.draw()
        self.canvas.get_tk_widget().pack(side=tk.TOP, fill=tk.BOTH, expand=True)

    def schedule_update(self, event=None):
        """延迟更新，避免每敲一个字都重绘"""
        if hasattr(self, '_after_id'):
            self.root.after_cancel(self._after_id)
        self._after_id = self.root.after(200, self.update_preview)

    def draw_chromosome_on_ax(self, ax, genes, colors, marker_choice):
        """核心绘图逻辑，只负责画，不负责保存或创建窗口"""
        ax.clear()
        ax.set_facecolor(colors['background'])
        self.fig.patch.set_facecolor(colors['background'])
        
        line_color = colors['chromosome']
        line_width = 14 # 稍微调小适应预览
        
        # 绘图数据结构化 (x_pos, gene_keys)
        sides = [
            (0.3, ['left_top', 'left_middle', 'left_bottom'], -0.1), # 左边, 文字偏移量
            (0.7, ['right_top', 'right_middle', 'right_bottom'], 0.1) # 右边
        ]
        
        y_positions = [0.75, 0.5, 0.25] # 对应 Top, Middle, Bottom

        for x_center, keys, text_offset in sides:
            # 绘制主干
            ax.plot([x_center, x_center], [0.1, 0.9], color=line_color, linewidth=line_width, solid_capstyle='round')
            
            for key, y_pos in zip(keys, y_positions):
                gene_text = genes[key]
                # 只有当有文本或者显式需要画臂时才画横线 (这里假设有文字才画)
                if gene_text:
                    # 横线范围
                    x_start = x_center - 0.1
                    x_end = x_center + 0.1
                    ax.plot([x_start, x_end], [y_pos, y_pos], color=line_color, linewidth=line_width, solid_capstyle='round')
                    
                    # 绘制文字
                    # 简单的字体大小逻辑
                    f_size = 28 if len(gene_text) <= 1 else (20 if len(gene_text) <= 3 else 14)
                    
                    text_x = x_center + (text_offset * 2.2) # 让文字离线远一点
                    ax.text(text_x, y_pos, gene_text, 
                            fontsize=f_size, fontfamily='serif', va='center', ha='center')

        # 标记
        if marker_choice == "XY":
            ax.text(0.3, 0.02, 'X', fontsize=30, ha='center', fontfamily='serif')
            ax.text(0.7, 0.02, 'Y', fontsize=30, ha='center', fontfamily='serif')
        elif marker_choice == "XX":
            ax.text(0.3, 0.02, 'X', fontsize=30, ha='center', fontfamily='serif')
            ax.text(0.7, 0.02, 'X', fontsize=30, ha='center', fontfamily='serif')

        ax.set_xlim(0, 1)
        ax.set_ylim(0, 1)
        ax.axis('off')

    def update_preview(self):
        """收集数据并刷新预览"""
        try:
            genes = {k: v.get().strip() for k, v in self.gene_vars.items()}
            colors = {k: v.get() for k, v in self.color_vars.items()}
            marker = self.marker_choice_var.get()
            
            self.draw_chromosome_on_ax(self.ax, genes, colors, marker)
            self.canvas.draw()
        except Exception as e:
            print(f"Preview error: {e}")

    def save_image(self):
        """保存当前预览的图像"""
        file_path = filedialog.asksaveasfilename(
            defaultextension=".png",
            filetypes=[("PNG files", "*.png"), ("PDF files", "*.pdf"), ("All files", "*.*")]
        )
        if file_path:
            try:
                # 保存 figure 对象
                self.fig.savefig(file_path, dpi=300, facecolor=self.fig.get_facecolor())
                messagebox.showinfo("成功", f"图像已保存:\n{file_path}")
            except Exception as e:
                messagebox.showerror("错误", f"保存失败:\n{e}")

if __name__ == '__main__':
    root = tk.Tk()
    # 设置样式
    style = ttk.Style()
    style.configure("Accent.TButton", font=("Helvetica", 12, "bold"))
    
    app = ChromosomeApp(root)
    root.mainloop()