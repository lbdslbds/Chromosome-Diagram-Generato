import matplotlib.pyplot as plt
import tkinter as tk
from tkinter import ttk, colorchooser, filedialog
import os

def draw_chromosome(genes, colors, show_xy, file_path):
    """
    根据给定的基因、颜色和选项绘制染色体图像。

    Args:
        genes (dict): 包含基因名称的字典。
        colors (dict): 包含背景和染色体颜色的字典。
        show_xy (bool): 是否显示XY标记。
        file_path (str): 图像的保存路径。
    """
    fig, ax = plt.subplots(figsize=(6, 6))

    # --- 设置颜色 ---
    fig.set_facecolor(colors['background'])
    ax.set_facecolor(colors['background'])
    line_color = colors['chromosome']

    # --- 绘图常量 ---
    line_width = 16
    base_font_style = {'family': 'serif', 'fontsize': 35, 'color': 'black'}

    # --- 自适应字体大小的辅助函数 ---
    def get_adaptive_font_style(text):
        """根据文本长度调整字体大小"""
        style = base_font_style.copy()
        length = len(str(text))
        if length > 4:
            style['fontsize'] = 18
        elif length > 2:
            style['fontsize'] = 22
        elif length > 1:
            style['fontsize'] = 28
        # 如果长度为1，则使用默认的35
        return style

    # --- 绘制左边的染色体 ---
    ax.plot([0.3, 0.3]， [0.1, 0.9], color=line_color, linewidth=line_width, solid_capstyle='round')
    # 仅当对应位置有基因时才绘制染色体臂
    if genes['left_top']:
        ax.plot([0.2, 0.4]， [0.75, 0.75], color=line_color, linewidth=line_width, solid_capstyle='round')
    if genes['left_middle']:
        ax.plot([0.2, 0.4]， [0.5, 0.5], color=line_color, linewidth=line_width, solid_capstyle='round')
    if genes['left_bottom']:
        ax.plot([0.2, 0.4]， [0.25, 0.25], color=line_color, linewidth=line_width, solid_capstyle='round')

    # --- 绘制右边的染色体 ---
    ax.plot([0.7, 0.7]， [0.1, 0.9], color=line_color, linewidth=line_width, solid_capstyle='round')
    # 仅当对应位置有基因时才绘制染色体臂
    if genes['right_top']:
        ax.plot([0.6, 0.8]， [0.75, 0.75], color=line_color, linewidth=line_width, solid_capstyle='round')
    if genes['right_middle']:
        ax.plot([0.6, 0.8]， [0.5, 0.5], color=line_color, linewidth=line_width, solid_capstyle='round')
    if genes['right_bottom']:
        ax.plot([0.6, 0.8]， [0.25, 0.25], color=line_color, linewidth=line_width, solid_capstyle='round')

    # --- 添加等位基因标签 (仅当文本框不为空时绘制) ---
    if genes['left_top']:
        font_style = get_adaptive_font_style(genes['left_top'])
        ax.text(0.1, 0.75, genes['left_top'], fontdict=font_style, ha='center', va='center')
    if genes['left_middle']:
        font_style = get_adaptive_font_style(genes['left_middle'])
        ax.text(0.1, 0.5, genes['left_middle'], fontdict=font_style, ha='center', va='center')
    if genes['left_bottom']:
        font_style = get_adaptive_font_style(genes['left_bottom'])
        ax.text(0.085, 0.25, genes['left_bottom'], fontdict=font_style, ha='center', va='center')

    if genes['right_top']:
        font_style = get_adaptive_font_style(genes['right_top'])
        ax.text(0.9, 0.75, genes['right_top'], fontdict=font_style, ha='center', va='center')
    if genes['right_middle']:
        font_style = get_adaptive_font_style(genes['right_middle'])
        ax.text(0.9, 0.5, genes['right_middle'], fontdict=font_style, ha='center', va='center')
    if genes['right_bottom']:
        font_style = get_adaptive_font_style(genes['right_bottom'])
        ax.text(0.915, 0.25, genes['right_bottom'], fontdict=font_style, ha='center', va='center')

    # --- 标记XY染色体 ---
    if show_xy:
        ax.text(0.3, 0.0, 'X', fontdict=base_font_style, ha='center', va='center')
        ax.text(0.7, 0.0, 'Y', fontdict=base_font_style, ha='center', va='center')

    # --- 美化和显示 ---
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.set_aspect('equal', adjustable='box')
    ax.axis('off')

    plt.savefig(file_path, dpi=300, facecolor=fig.get_facecolor())
    plt.close()


def create_gui():
    """创建并显示GUI窗口。"""
    root = tk.Tk()
    root.title("基因绘图选项")
    root.resizable(False, False)

    # --- 变量 ---
    gene_vars = {
        'left_top': tk.StringVar(value='d'),
        'left_middle': tk.StringVar(value=''),
        'left_bottom': tk.StringVar(value='E'),
        'right_top': tk.StringVar(value='d'),
        'right_middle': tk.StringVar(value=''),
        'right_bottom': tk.StringVar(value='E')
    }
    color_vars = {
        'background': tk.StringVar(value='#FFFFFF'),
        'chromosome': tk.StringVar(value='#000000')
    }
    show_xy_var = tk.BooleanVar(value=False)
    status_var = tk.StringVar(value="")
    save_path_var = tk.StringVar(value="")

    # --- GUI 布局 ---
    main_frame = ttk.Frame(root, padding="15")
    main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

    # --- 基因定义区 ---
    gene_frame = ttk.LabelFrame(main_frame, text="基因定义", padding="10")
    gene_frame.grid(row=0, column=0, columnspan=2, sticky="ew")

    ttk.Label(gene_frame, text="左边染色体", font="-weight bold").grid(column=0, row=0, pady=5)
    ttk.Label(gene_frame, text="右边染色体", font="-weight bold").grid(column=1, row=0, pady=5, padx=20)

    ttk.Entry(gene_frame, textvariable=gene_vars['left_top'], width=15).grid(column=0, row=1, pady=2)
    ttk.Entry(gene_frame, textvariable=gene_vars['right_top'], width=15).grid(column=1, row=1, pady=2, padx=20)
    ttk.Entry(gene_frame, textvariable=gene_vars['left_middle'], width=15).grid(column=0, row=2, pady=2)
    ttk.Entry(gene_frame, textvariable=gene_vars['right_middle'], width=15).grid(column=1, row=2, pady=2, padx=20)
    ttk.Entry(gene_frame, textvariable=gene_vars['left_bottom'], width=15).grid(column=0, row=3, pady=2)
    ttk.Entry(gene_frame, textvariable=gene_vars['right_bottom'], width=15).grid(column=1, row=3, pady=2, padx=20)
    
    # --- 选项区 ---
    options_frame = ttk.LabelFrame(main_frame, text="选项", padding="10")
    options_frame.grid(row=1, column=0, columnspan=2, sticky="ew", pady=10)

    def create_color_picker(parent, text, var, initial_color, row, col):
        frame = ttk.Frame(parent)
        frame.grid(row=row, column=col, padx=5, pady=5, sticky=tk.W)
        
        def pick_color():
            color_code = colorchooser.askcolor(title="选择颜色", initialcolor=var.get())
            if color_code and color_code[1]:
                var.set(color_code[1])
                color_display.config(background=color_code[1])

        ttk.Button(frame, text=text, command=pick_color).pack(side=tk.LEFT, padx=5)
        color_display = tk.Label(frame, text="  ", background=initial_color, relief="sunken", borderwidth=1)
        color_display.pack(side=tk.LEFT, ipadx=10)

    create_color_picker(options_frame, "背景颜色", color_vars['background'], '#FFFFFF', 0, 0)
    create_color_picker(options_frame, "染色体颜色", color_vars['chromosome'], '#403A3A', 0, 1)

    ttk.Checkbutton(options_frame, text="在底部生成XY标记", variable=show_xy_var).grid(row=1, column=0, columnspan=2, pady=5, sticky=tk.W)

    # --- 保存位置 ---
    def select_save_path():
        path = filedialog.asksaveasfilename(
            initialfile="chromosome_diagram.png",
            defaultextension=".png",
            filetypes=[("PNG files", "*.png"), ("JPEG files", "*.jpg"), ("All files", "*.*")]
        )
        if path:
            save_path_var.set(path)
            status_var.set(f"准备保存到: {os.path.basename(path)}")

    save_frame = ttk.Frame(options_frame)
    save_frame.grid(row=2, column=0, columnspan=2, pady=5, sticky="ew")
    ttk.Button(save_frame, text="选择保存位置", command=select_save_path).pack(side=tk.LEFT)
    ttk.Label(save_frame, textvariable=save_path_var, foreground="gray", wraplength=250).pack(side=tk.LEFT, padx=5)

    # --- 生成按钮和状态标签 ---
    def on_generate():
        file_path = save_path_var.get()
        if not file_path:
            select_save_path()
            file_path = save_path_var.get()
            if not file_path:
                status_var.set("已取消。请选择保存位置。")
                return

        status_var.set("正在生成...")
        root.update_idletasks()
        try:
            genes_to_draw = {key: var.get().strip() for key, var in gene_vars.items()}
            colors_to_draw = {key: var.get() for key, var in color_vars.items()}
            show_xy = show_xy_var.get()
            draw_chromosome(genes_to_draw, colors_to_draw, show_xy, file_path)
            status_var.set(f"图像已保存到: {os.path.basename(file_path)}")
        except Exception as e:
            status_var.set(f"发生错误: {e}")

    ttk.Button(main_frame, text="生成图像", command=on_generate, style="Accent.TButton").grid(row=2, column=0, columnspan=2, pady=10)
    ttk.Label(main_frame, textvariable=status_var, foreground="gray").grid(row=3, column=0, columnspan=2)
    
    style = ttk.Style(root)
    style.configure("Accent.TButton", font="-weight bold")

    root.mainloop()

if __name__ == '__main__':
    create_gui()
