/**
 * Chromosome Diagram Generator - Modern Interactive Engine
 * Pure Vanilla JavaScript, Canvas & SVG Dual Engine
 * Optimized for Biology Textbook / Exam Aesthetics with Cell Membrane Support
 */

(function () {
  'use strict';

  // --- 1. i18n Dictionary ---
  const i18n = {
    zh: {
      appTitle: '基因染色体绘图生成器',
      appSubtitle: '网页版',
      tabLoci: '基因位点',
      tabStyle: '形态与样式',
      tabCell: '细胞外框',
      tabMarkers: '标记与注释',
      tabPresets: '经典预设',
      modeLabel: '染色体形态',
      modePair: '同源染色体 (对)',
      modeSingle: '单条染色体',
      modeReplicated: '复制态 (双单体)',
      leftChrom: '左侧染色体',
      rightChrom: '右侧染色体',
      singleChrom: '染色体',
      addLocusBtn: '+ 添加基因位点',
      quickSymbols: '快速符号',
      colorMode: '配色模式',
      colorUnified: '统一单色',
      colorSeparate: '左右分色 (父/母本)',
      chromColor: '染色体颜色',
      chromColorL: '左侧颜色 (父本)',
      chromColorR: '右侧颜色 (母本)',
      bgColor: '画布背景',
      transparentBg: '透明背景',
      lineWidth: '染色体粗细',
      chromHeight: '染色体长度',
      chromSpacing: '双染色体间距',
      armWidth: '横臂长度',
      centromereStyle: '着丝粒样式',
      centromereNone: '无',
      centromereConstriction: '初级缢痕',
      centromereDot: '圆点标记',
      centromerePos: '着丝粒位置',
      fontFamily: '字体风格',
      fontSerif: '学术衬线体 (Serif)',
      fontSans: '现代无衬线 (Sans-serif)',
      fontMono: '等宽字体 (Monospace)',
      fontStyle: '字体样式',
      styleRegular: '常规 (Regular)',
      styleItalic: '等位基因斜体 (Italic)',
      styleBold: '粗体 (Bold)',
      fontSizeScale: '基因字号缩放',
      
      // Cell Membrane
      cellTitle: '细胞外框 (Cell Membrane)',
      showCell: '显示细胞外框',
      cellShape: '细胞形状',
      cellShapeCircle: '圆形细胞',
      cellShapeOval: '椭圆细胞',
      cellShapeRounded: '圆角矩形',
      cellBorderStyle: '边框线条样式',
      cellBorderSolid: '实线 (正常细胞)',
      cellBorderDashed: '虚线 (分裂期/核膜解体)',
      cellBorderWidth: '细胞边框粗细',
      cellBorderColor: '细胞边框颜色',
      cellRadius: '细胞大小/半径',
      cellFill: '细胞质填充颜色',
      cellFillNone: '透明细胞质',
      cellStageLabel: '细胞类型 / 分裂时期标注',
      cellStagePlaceholder: '如: 初级精母细胞 或 减数第一次分裂后期',

      bottomMarker: '底部性染色体标记',
      markerNone: '无',
      markerXY: 'XY (雄性)',
      markerXX: 'XX (雌性)',
      markerZW: 'ZW (雌鸟/蚕)',
      markerZZ: 'ZZ (雄鸟/蚕)',
      markerCustom: '自定义标记',
      markerSize: '标记字号',
      markerColor: '标记颜色',
      titleLabel: '顶部图题 / 题目说明 (可选)',
      titlePlaceholder: '例如: 图 1: 某雄性动物细胞减数分裂示意图',
      exportPng: '导出 PNG',
      exportSvg: '导出 SVG 矢量',
      copyImage: '复制到剪贴板',
      resetBtn: '重置',
      themeToggle: '切换主题',
      langToggle: 'EN / 中文',
      copiedSuccess: '已成功复制图片到剪贴板！可以直接粘贴进 Word/PPT。',
      copiedError: '复制失败，请尝试直接点击“导出 PNG”。',
      downloadSuccess: '图片已开始下载！',
      resetConfirm: '确定要重置所有设置为默认美观比例吗？',
      zoomIn: '放大',
      zoomOut: '缩小',
      zoomFit: '适应大小',
      shareUrl: '分享链接',
      shareCopied: '配置链接已复制到剪贴板！',
      importExport: '导入/导出配置',
      exportJson: '导出 JSON',
      importJson: '导入 JSON',
      selectRes: '导出分辨率',
      res1x: '标准 (1x - 750×750)',
      res2x: '高清 (2x - 1500×1500)',
      res4x: '印刷级超清 (4x - 3000×3000 300DPI)',
      locusPosition: '相对位置 (顶部 0% ~ 底部 100%)',
    },
    en: {
      appTitle: 'Chromosome Diagram Generator',
      appSubtitle: 'Web Edition',
      tabLoci: 'Gene Loci',
      tabStyle: 'Style & Geometry',
      tabCell: 'Cell Membrane',
      tabMarkers: 'Markers & Labels',
      tabPresets: 'Presets',
      modeLabel: 'Chromosome Mode',
      modePair: 'Homologous Pair',
      modeSingle: 'Single Chromosome',
      modeReplicated: 'Sister Chromatids',
      leftChrom: 'Left Chromosome',
      rightChrom: 'Right Chromosome',
      singleChrom: 'Chromosome',
      addLocusBtn: '+ Add Gene Locus',
      quickSymbols: 'Quick Symbols',
      colorMode: 'Color Mode',
      colorUnified: 'Unified Color',
      colorSeparate: 'Separate (Paternal/Maternal)',
      chromColor: 'Chromosome Color',
      chromColorL: 'Left Color (Paternal)',
      chromColorR: 'Right Color (Maternal)',
      bgColor: 'Background Color',
      transparentBg: 'Transparent Background',
      lineWidth: 'Chromosome Thickness',
      chromHeight: 'Chromosome Length',
      chromSpacing: 'Homolog Spacing',
      armWidth: 'Locus Arm Width',
      centromereStyle: 'Centromere Style',
      centromereNone: 'None',
      centromereConstriction: 'Constriction',
      centromereDot: 'Circle Dot',
      centromerePos: 'Centromere Position',
      fontFamily: 'Font Family',
      fontSerif: 'Academic Serif',
      fontSans: 'Modern Sans-Serif',
      fontMono: 'Monospace',
      fontStyle: 'Font Style',
      styleRegular: 'Regular',
      styleItalic: 'Italic (Genetics Standard)',
      styleBold: 'Bold',
      fontSizeScale: 'Gene Font Size',

      // Cell Membrane
      cellTitle: 'Cell Membrane Boundary',
      showCell: 'Show Cell Boundary',
      cellShape: 'Cell Shape',
      cellShapeCircle: 'Circle Cell',
      cellShapeOval: 'Oval Cell',
      cellShapeRounded: 'Rounded Rectangle',
      cellBorderStyle: 'Border Line Style',
      cellBorderSolid: 'Solid Line',
      cellBorderDashed: 'Dashed (Meiosis/Nuclear envelope breakdown)',
      cellBorderWidth: 'Cell Border Thickness',
      cellBorderColor: 'Cell Border Color',
      cellRadius: 'Cell Radius / Size',
      cellFill: 'Cytoplasm Fill Color',
      cellFillNone: 'Transparent Cytoplasm',
      cellStageLabel: 'Cell Type / Division Stage Label',
      cellStagePlaceholder: 'e.g., Primary Spermatocyte (Metaphase I)',

      bottomMarker: 'Sex Chromosome Marker',
      markerNone: 'None',
      markerXY: 'XY (Male)',
      markerXX: 'XX (Female)',
      markerZW: 'ZW (Female Avian/Lepidoptera)',
      markerZZ: 'ZZ (Male Avian/Lepidoptera)',
      markerCustom: 'Custom Marker',
      markerSize: 'Marker Font Size',
      markerColor: 'Marker Color',
      titleLabel: 'Top Diagram Title (Optional)',
      titlePlaceholder: 'e.g., Figure 1: Meiotic Cell with Linked Genes',
      exportPng: 'Export PNG',
      exportSvg: 'Export SVG Vector',
      copyImage: 'Copy to Clipboard',
      resetBtn: 'Reset',
      themeToggle: 'Toggle Theme',
      langToggle: '中文 / EN',
      copiedSuccess: 'Image copied to clipboard! Paste directly into Word/PPT.',
      copiedError: 'Copy failed. Please use "Export PNG" instead.',
      downloadSuccess: 'Image download started!',
      resetConfirm: 'Reset all settings to default aesthetic proportions?',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      zoomFit: 'Fit',
      shareUrl: 'Share Link',
      shareCopied: 'Configuration URL copied to clipboard!',
      importExport: 'Import/Export Config',
      exportJson: 'Export JSON',
      importJson: 'Import JSON',
      selectRes: 'Export Resolution',
      res1x: 'Standard (1x - 750×750)',
      res2x: 'High Res (2x - 1500×1500)',
      res4x: 'Ultra HD 300DPI (4x - 3000×3000)',
      locusPosition: 'Relative Position (Top 0% ~ Bottom 100%)',
    }
  };

  // --- 2. Preset Library (Optimized for High School & College Genetics Exams) ---
  const PRESETS = [
    {
      id: 'textbook_meiosis_cell',
      titleZh: '典型高考/竞赛遗传题细胞图 (AaBb)',
      titleEn: 'Textbook Cell Diagram (AaBb)',
      descZh: '圆形细胞外框、同源染色体配对与等位基因',
      descEn: 'Circular cell membrane with homologous pairs',
      state: {
        mode: 'pair',
        loci: [
          { id: 1, pos: 0.25, labelL: 'A', labelR: 'a' },
          { id: 2, pos: 0.75, labelL: 'B', labelR: 'b' }
        ],
        showCell: true,
        cellShape: 'circle',
        cellBorderStyle: 'solid',
        cellBorderWidth: 3,
        cellBorderColor: '#334155',
        cellRadius: 0.40,
        cellFillColor: '#F8FAFC',
        cellLabel: '精原细胞 (AaBb)',
        markerType: 'None',
        chromosomeColorMode: 'unified',
        chromosomeColor: '#1E293B',
        backgroundColor: '#FFFFFF',
        transparentBg: false,
        centromere: 'constriction',
        fontFamily: 'serif',
        fontStyle: 'italic',
        lineWidth: 15,
        chromHeight: 0.54,
        chromSpacing: 0.22,
        armWidth: 0.065
      }
    },
    {
      id: 'drosophila_sex_linked',
      titleZh: '果蝇伴性遗传 (X^B Y 雄性细胞)',
      titleEn: 'Sex-Linked Cell (Drosophila X^B Y)',
      descZh: 'XY性染色体分色及上标等位基因标注',
      descEn: 'Sex-linked alleles with XY bottom marker',
      state: {
        mode: 'pair',
        loci: [
          { id: 1, pos: 0.25, labelL: 'X^B', labelR: 'Y' },
          { id: 2, pos: 0.70, labelL: 'w^+', labelR: '' }
        ],
        showCell: true,
        cellShape: 'circle',
        cellBorderStyle: 'solid',
        cellBorderWidth: 3,
        cellBorderColor: '#334155',
        cellRadius: 0.40,
        cellFillColor: '#FFFFFF',
        cellLabel: '',
        markerType: 'XY',
        chromosomeColorMode: 'separate',
        chromosomeColorL: '#2563EB',
        chromosomeColorR: '#DC2626',
        backgroundColor: '#FFFFFF',
        transparentBg: false,
        centromere: 'constriction',
        fontFamily: 'serif',
        fontStyle: 'italic',
        lineWidth: 15,
        chromHeight: 0.52,
        chromSpacing: 0.24,
        armWidth: 0.065
      }
    },
    {
      id: 'homolog_bicolor',
      titleZh: '减数分裂联会 (父源蓝/母源红)',
      titleEn: 'Meiosis Synapsis (Bicolor)',
      descZh: '初级精母细胞同源染色体分色配对',
      descEn: 'Paternal and maternal homologous chromosome pairing',
      state: {
        mode: 'pair',
        loci: [
          { id: 1, pos: 0.20, labelL: 'A', labelR: 'a' },
          { id: 2, pos: 0.50, labelL: 'B', labelR: 'b' },
          { id: 3, pos: 0.80, labelL: 'C', labelR: 'c' }
        ],
        showCell: true,
        cellShape: 'circle',
        cellBorderStyle: 'solid',
        cellBorderWidth: 3,
        cellBorderColor: '#475569',
        cellRadius: 0.41,
        cellFillColor: '#FFFFFF',
        cellLabel: '初级精母细胞 (联会期)',
        markerType: 'None',
        chromosomeColorMode: 'separate',
        chromosomeColorL: '#3B82F6',
        chromosomeColorR: '#EC4899',
        backgroundColor: '#FFFFFF',
        transparentBg: false,
        centromere: 'dot',
        fontFamily: 'serif',
        fontStyle: 'italic',
        lineWidth: 14,
        chromHeight: 0.56,
        chromSpacing: 0.22,
        armWidth: 0.06
      }
    },
    {
      id: 'metaphase_dashed_cell',
      titleZh: '减数分裂后期 (虚线解体细胞膜)',
      titleEn: 'Meiosis Metaphase (Dashed Membrane)',
      descZh: '虚线细胞外框，适合表达核膜解体或分裂期',
      descEn: 'Dashed cell membrane for division stages',
      state: {
        mode: 'replicated',
        loci: [
          { id: 1, pos: 0.25, labelL: 'A', labelR: 'a' },
          { id: 2, pos: 0.75, labelL: 'B', labelR: 'b' }
        ],
        showCell: true,
        cellShape: 'circle',
        cellBorderStyle: 'dashed',
        cellBorderWidth: 3,
        cellBorderColor: '#64748B',
        cellRadius: 0.40,
        cellFillColor: '#F8FAFC',
        cellLabel: '减数第一次分裂中期',
        markerType: 'None',
        chromosomeColorMode: 'separate',
        chromosomeColorL: '#4F46E5',
        chromosomeColorR: '#06B6D4',
        backgroundColor: '#FFFFFF',
        transparentBg: false,
        centromere: 'dot',
        fontFamily: 'serif',
        fontStyle: 'italic',
        lineWidth: 14,
        chromHeight: 0.52,
        chromSpacing: 0.25,
        armWidth: 0.06
      }
    },
    {
      id: 'default_dE',
      titleZh: '经典三位点无细胞圈 (d-E)',
      titleEn: 'Classic Three-Locus (Clean Standalone)',
      descZh: '原桌面版传统纯染色体测交图',
      descEn: 'Standalone chromosome pairing without cell circle',
      state: {
        mode: 'pair',
        loci: [
          { id: 1, pos: 0.25, labelL: 'd', labelR: 'd' },
          { id: 2, pos: 0.50, labelL: '', labelR: '' },
          { id: 3, pos: 0.75, labelL: 'E', labelR: 'E' }
        ],
        showCell: false,
        markerType: 'None',
        chromosomeColorMode: 'unified',
        chromosomeColor: '#334155',
        backgroundColor: '#FFFFFF',
        transparentBg: false,
        centromere: 'constriction',
        fontFamily: 'serif',
        fontStyle: 'italic',
        lineWidth: 15,
        chromHeight: 0.60,
        chromSpacing: 0.24,
        armWidth: 0.065
      }
    },
    {
      id: 'cyber_dark',
      titleZh: '生化科技深色模式 (Cyber Lab)',
      titleEn: 'Cyber Biolab Dark Mode',
      descZh: '高对比度发光粒子风格科研图表',
      descEn: 'High contrast neon laboratory aesthetics',
      state: {
        mode: 'pair',
        loci: [
          { id: 1, pos: 0.25, labelL: 'GFP', labelR: 'RFP' },
          { id: 2, pos: 0.50, labelL: 'Cas9', labelR: 'Cas9' },
          { id: 3, pos: 0.75, labelL: 'Neo^r', labelR: 'Puro^r' }
        ],
        showCell: true,
        cellShape: 'circle',
        cellBorderStyle: 'solid',
        cellBorderWidth: 2,
        cellBorderColor: '#38BDF8',
        cellRadius: 0.40,
        cellFillColor: '#131B2E',
        cellLabel: 'CRISPR Gene Editing',
        markerType: 'None',
        chromosomeColorMode: 'separate',
        chromosomeColorL: '#06B6D4',
        chromosomeColorR: '#F43F5E',
        textColor: '#38BDF8',
        backgroundColor: '#0B0F19',
        transparentBg: false,
        centromere: 'dot',
        fontFamily: 'sans',
        fontStyle: 'bold',
        lineWidth: 14,
        chromHeight: 0.52,
        chromSpacing: 0.25,
        armWidth: 0.065
      }
    }
  ];

  // --- 3. Initial Application State ---
  let state = {
    lang: 'zh',
    theme: 'light',
    zoom: 1.0,
    exportResolution: 2, // 1, 2, 4
    
    mode: 'pair', // 'pair', 'single', 'replicated'
    loci: [
      { id: 1, pos: 0.25, labelL: 'A', labelR: 'a' },
      { id: 2, pos: 0.75, labelL: 'B', labelR: 'b' }
    ],
    
    // Cell Membrane Options (新功能)
    showCell: true,
    cellShape: 'circle', // 'circle', 'oval', 'rounded'
    cellBorderStyle: 'solid', // 'solid', 'dashed'
    cellBorderWidth: 3,
    cellBorderColor: '#334155',
    cellRadius: 0.40, // relative to canvas size
    cellFillColor: '#FFFFFF',
    cellLabel: '', // e.g. "精原细胞"

    // Colors & Styles
    chromosomeColorMode: 'unified', // 'unified', 'separate'
    chromosomeColor: '#1E293B',
    chromosomeColorL: '#2563EB',
    chromosomeColorR: '#DC2626',
    backgroundColor: '#FFFFFF',
    transparentBg: false,
    textColor: '#1E293B',
    
    // Geometry & Harmonious Proportions (微调优化黄金比例)
    lineWidth: 15,
    chromHeight: 0.54, // relative to canvas
    chromSpacing: 0.22, // distance between left and right (0.12 - 0.40)
    armWidth: 0.065, // relative arm width
    
    // Centromere
    centromere: 'constriction', // 'none', 'constriction', 'dot'
    centromerePos: 0.50,
    
    // Typography
    fontFamily: 'serif', // 'serif', 'sans', 'mono'
    fontStyle: 'italic', // 'regular', 'italic', 'bold'
    fontSizeScale: 1.0,
    
    // Markers & Title
    markerType: 'None', // 'None', 'XY', 'XX', 'ZW', 'ZZ', 'Custom'
    markerCustomL: 'X',
    markerCustomR: 'Y',
    markerFontSize: 26,
    markerColor: '#1E293B',
    titleText: ''
  };

  // Base canvas dimensions (Square canvas is ideal for cell circular diagrams)
  const CANVAS_BASE_WIDTH = 750;
  const CANVAS_BASE_HEIGHT = 750;

  // DOM Elements Cache
  let canvas, ctx, canvasWrapper;

  // --- 4. Initialization ---
  function init() {
    canvas = document.getElementById('chromosome-canvas');
    ctx = canvas.getContext('2d');
    canvasWrapper = document.getElementById('canvas-wrapper');

    // Load URL state or LocalStorage state if present
    loadStateFromUrlOrStorage();

    // Setup Event Listeners
    setupEventListeners();

    // Render UI controls & Update Canvas
    renderLociTable();
    updateUIControls();
    updateTheme(state.theme);
    updateLanguage(state.lang);
    renderCanvas();
  }

  // --- 5. State Persistence ---
  function saveStateToStorage() {
    try {
      localStorage.setItem('chromosome_app_state', JSON.stringify(state));
    } catch (e) {}
  }

  function loadStateFromUrlOrStorage() {
    try {
      if (window.location.hash && window.location.hash.length > 2) {
        const jsonStr = decodeURIComponent(atob(window.location.hash.substring(1)));
        const loaded = JSON.parse(jsonStr);
        state = Object.assign({}, state, loaded);
        return;
      }
      const saved = localStorage.getItem('chromosome_app_state');
      if (saved) {
        state = Object.assign({}, state, JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not restore state:', e);
    }
  }

  // --- 6. Event Listeners Setup ---
  function setupEventListeners() {
    // Navigation / Header Actions
    document.getElementById('btn-lang-toggle').addEventListener('click', () => {
      state.lang = state.lang === 'zh' ? 'en' : 'zh';
      updateLanguage(state.lang);
      saveStateToStorage();
    });

    document.getElementById('btn-theme-toggle').addEventListener('click', () => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      updateTheme(state.theme);
      saveStateToStorage();
    });

    document.getElementById('btn-reset').addEventListener('click', () => {
      if (confirm(i18n[state.lang].resetConfirm)) {
        resetToDefault();
      }
    });

    document.getElementById('btn-share').addEventListener('click', shareConfiguration);

    // Tab Switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const pane = document.getElementById(`tab-${targetTab}`);
        if (pane) pane.classList.add('active');
      });
    });

    // Mode Radio Buttons
    document.querySelectorAll('input[name="chromMode"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.mode = e.target.value;
        renderLociTable();
        scheduleRender();
        saveStateToStorage();
      });
    });

    // Add Locus Button
    document.getElementById('btn-add-locus').addEventListener('click', () => {
      const nextId = (state.loci.length > 0 ? Math.max(...state.loci.map(l => l.id)) : 0) + 1;
      let nextPos = 0.5;
      if (state.loci.length === 1) nextPos = 0.75;
      else if (state.loci.length >= 2) {
        nextPos = Math.min(0.88, (state.loci[state.loci.length - 1].pos + 0.20));
      }
      state.loci.push({ id: nextId, pos: Number(nextPos.toFixed(2)), labelL: '', labelR: '' });
      renderLociTable();
      scheduleRender();
      saveStateToStorage();
    });

    // --- Cell Membrane Controls ---
    const showCellCheck = document.getElementById('show-cell-toggle');
    if (showCellCheck) {
      showCellCheck.addEventListener('change', (e) => {
        state.showCell = e.target.checked;
        const cellDetails = document.getElementById('cell-details-wrap');
        if (cellDetails) cellDetails.style.display = state.showCell ? 'block' : 'none';
        scheduleRender();
        saveStateToStorage();
      });
    }

    document.querySelectorAll('input[name="cellShape"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.cellShape = e.target.value;
        scheduleRender();
        saveStateToStorage();
      });
    });

    document.querySelectorAll('input[name="cellBorderStyle"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.cellBorderStyle = e.target.value;
        scheduleRender();
        saveStateToStorage();
      });
    });

    bindRangeSlider('cell-border-width-slider', 'cell-border-width-val', 'cellBorderWidth', (v) => `${v}px`);
    bindRangeSlider('cell-radius-slider', 'cell-radius-val', 'cellRadius', (v) => `${Math.round(v * 200)}%`, parseFloat);
    bindColorInput('cell-border-color', 'cellBorderColor');
    bindColorInput('cell-fill-color', 'cellFillColor');

    const cellLabelInput = document.getElementById('cell-stage-input');
    if (cellLabelInput) {
      cellLabelInput.addEventListener('input', (e) => {
        state.cellLabel = e.target.value;
        scheduleRender();
        saveStateToStorage();
      });
    }

    // Color Mode
    document.querySelectorAll('input[name="colorMode"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.chromosomeColorMode = e.target.value;
        updateColorModeVisibility();
        scheduleRender();
        saveStateToStorage();
      });
    });

    // Color inputs
    bindColorInput('chrom-color', 'chromosomeColor');
    bindColorInput('chrom-color-l', 'chromosomeColorL');
    bindColorInput('chrom-color-r', 'chromosomeColorR');
    bindColorInput('bg-color', 'backgroundColor');
    bindColorInput('marker-color', 'markerColor');
    bindColorInput('text-color', 'textColor');

    // Transparent Background Checkbox
    const transBgCheckbox = document.getElementById('transparent-bg');
    if (transBgCheckbox) {
      transBgCheckbox.addEventListener('change', (e) => {
        state.transparentBg = e.target.checked;
        updateTransparentBackground();
        scheduleRender();
        saveStateToStorage();
      });
    }

    // Range Sliders
    bindRangeSlider('line-width-slider', 'line-width-val', 'lineWidth', (v) => `${v}px`);
    bindRangeSlider('chrom-height-slider', 'chrom-height-val', 'chromHeight', (v) => `${Math.round(v * 100)}%`, parseFloat);
    bindRangeSlider('chrom-spacing-slider', 'chrom-spacing-val', 'chromSpacing', (v) => `${Math.round(v * 100)}%`, parseFloat);
    bindRangeSlider('arm-width-slider', 'arm-width-val', 'armWidth', (v) => `${Math.round(v * 100)}%`, parseFloat);
    bindRangeSlider('centromere-pos-slider', 'centromere-pos-val', 'centromerePos', (v) => `${Math.round(v * 100)}%`, parseFloat);
    bindRangeSlider('font-size-scale-slider', 'font-size-scale-val', 'fontSizeScale', (v) => `${v}x`, parseFloat);
    bindRangeSlider('marker-size-slider', 'marker-size-val', 'markerFontSize', (v) => `${v}px`);

    // Centromere Radios
    document.querySelectorAll('input[name="centromere"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.centromere = e.target.value;
        document.getElementById('centromere-pos-group').style.display = state.centromere === 'none' ? 'none' : 'block';
        scheduleRender();
        saveStateToStorage();
      });
    });

    // Font Family & Style
    document.getElementById('font-family-select').addEventListener('change', (e) => {
      state.fontFamily = e.target.value;
      scheduleRender();
      saveStateToStorage();
    });

    document.querySelectorAll('input[name="fontStyle"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.fontStyle = e.target.value;
        scheduleRender();
        saveStateToStorage();
      });
    });

    // Marker Radios
    document.querySelectorAll('input[name="markerChoice"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.markerType = e.target.value;
        document.getElementById('custom-marker-inputs').style.display = state.markerType === 'Custom' ? 'flex' : 'none';
        scheduleRender();
        saveStateToStorage();
      });
    });

    document.getElementById('marker-custom-l').addEventListener('input', (e) => {
      state.markerCustomL = e.target.value;
      scheduleRender();
      saveStateToStorage();
    });

    document.getElementById('marker-custom-r').addEventListener('input', (e) => {
      state.markerCustomR = e.target.value;
      scheduleRender();
      saveStateToStorage();
    });

    // Title Input
    document.getElementById('diagram-title-input').addEventListener('input', (e) => {
      state.titleText = e.target.value;
      scheduleRender();
      saveStateToStorage();
    });

    // Quick Symbol Buttons
    document.querySelectorAll('.symbol-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        insertSymbolAtActiveInput(btn.getAttribute('data-symbol'));
      });
    });

    // Presets Grid
    renderPresets();

    // Export Buttons
    document.getElementById('btn-export-png').addEventListener('click', exportPNG);
    document.getElementById('btn-export-svg').addEventListener('click', exportSVG);
    document.getElementById('btn-copy-image').addEventListener('click', copyImageToClipboard);

    document.getElementById('export-res-select').addEventListener('change', (e) => {
      state.exportResolution = parseInt(e.target.value, 10);
    });

    // Zoom Controls
    document.getElementById('btn-zoom-in').addEventListener('click', () => adjustZoom(0.1));
    document.getElementById('btn-zoom-out').addEventListener('click', () => adjustZoom(-0.1));
    document.getElementById('btn-zoom-reset').addEventListener('click', () => setZoom(1.0));
  }

  // --- Helper: Bind Color Input ---
  function bindColorInput(elementId, stateKey) {
    const picker = document.getElementById(elementId);
    const textInput = document.getElementById(`${elementId}-text`);
    if (!picker) return;

    picker.addEventListener('input', (e) => {
      state[stateKey] = e.target.value;
      if (textInput) textInput.value = e.target.value.toUpperCase();
      scheduleRender();
      saveStateToStorage();
    });

    if (textInput) {
      textInput.addEventListener('input', (e) => {
        let val = e.target.value;
        if (!val.startsWith('#') && val.length === 6) val = '#' + val;
        if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
          state[stateKey] = val;
          picker.value = val;
          scheduleRender();
          saveStateToStorage();
        }
      });
    }
  }

  // --- Helper: Bind Range Slider ---
  function bindRangeSlider(sliderId, valueDisplayId, stateKey, formatFn, parser = parseInt) {
    const slider = document.getElementById(sliderId);
    const display = document.getElementById(valueDisplayId);
    if (!slider) return;

    slider.addEventListener('input', (e) => {
      const val = parser(e.target.value);
      state[stateKey] = val;
      if (display) display.textContent = formatFn(val);
      scheduleRender();
      saveStateToStorage();
    });
  }

  // --- 7. Loci Table Management ---
  function renderLociTable() {
    const container = document.getElementById('loci-container');
    if (!container) return;
    container.innerHTML = '';

    const isSingle = state.mode === 'single';

    state.loci.forEach((locus, index) => {
      const row = document.createElement('div');
      row.className = 'locus-row';
      if (isSingle) {
        row.style.gridTemplateColumns = '1fr 40px';
      }

      // Left locus input
      const leftWrap = document.createElement('div');
      leftWrap.className = 'locus-input-wrap';
      const inputL = document.createElement('input');
      inputL.type = 'text';
      inputL.className = 'form-control locus-input';
      inputL.value = locus.labelL;
      inputL.placeholder = isSingle ? (locus.label || `Locus ${index + 1}`) : 'L';
      inputL.addEventListener('input', (e) => {
        locus.labelL = e.target.value;
        scheduleRender();
        saveStateToStorage();
      });
      leftWrap.appendChild(inputL);
      row.appendChild(leftWrap);

      // Right locus input (if not single)
      if (!isSingle) {
        const rightWrap = document.createElement('div');
        rightWrap.className = 'locus-input-wrap';
        const inputR = document.createElement('input');
        inputR.type = 'text';
        inputR.className = 'form-control locus-input';
        inputR.value = locus.labelR;
        inputR.placeholder = 'R';
        inputR.addEventListener('input', (e) => {
          locus.labelR = e.target.value;
          scheduleRender();
          saveStateToStorage();
        });
        rightWrap.appendChild(inputR);
        row.appendChild(rightWrap);
      }

      // Remove button
      const removeBtn = document.createElement('button');
      removeBtn.className = 'btn-remove-locus';
      removeBtn.title = state.lang === 'zh' ? '删除该位点' : 'Delete locus';
      removeBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
      removeBtn.addEventListener('click', () => {
        if (state.loci.length <= 1) {
          showToast(state.lang === 'zh' ? '至少保留一个基因位点' : 'Keep at least one gene locus', 'info');
          return;
        }
        state.loci.splice(index, 1);
        renderLociTable();
        scheduleRender();
        saveStateToStorage();
      });
      row.appendChild(removeBtn);

      container.appendChild(row);
    });

    // Update table header visibility
    const headerR = document.getElementById('loci-header-right');
    if (headerR) {
      headerR.style.display = isSingle ? 'none' : 'block';
    }
  }

  // Insert symbol into currently focused input
  let lastFocusedInput = null;
  document.addEventListener('focusin', (e) => {
    if (e.target.classList && e.target.classList.contains('locus-input')) {
      lastFocusedInput = e.target;
    }
  });

  function insertSymbolAtActiveInput(symbol) {
    if (!lastFocusedInput) {
      const first = document.querySelector('.locus-input');
      if (first) lastFocusedInput = first;
    }
    if (lastFocusedInput) {
      const start = lastFocusedInput.selectionStart || lastFocusedInput.value.length;
      const end = lastFocusedInput.selectionEnd || lastFocusedInput.value.length;
      const val = lastFocusedInput.value;
      lastFocusedInput.value = val.substring(0, start) + symbol + val.substring(end);
      lastFocusedInput.dispatchEvent(new Event('input'));
      lastFocusedInput.focus();
      lastFocusedInput.setSelectionRange(start + symbol.length, start + symbol.length);
    }
  }

  // --- 8. Presets Rendering ---
  function renderPresets() {
    const grid = document.getElementById('presets-grid');
    if (!grid) return;
    grid.innerHTML = '';

    PRESETS.forEach(preset => {
      const card = document.createElement('div');
      card.className = 'preset-card';
      const title = state.lang === 'zh' ? preset.titleZh : preset.titleEn;
      const desc = state.lang === 'zh' ? preset.descZh : preset.descEn;

      card.innerHTML = `
        <div class="preset-title">${title}</div>
        <div class="preset-desc">${desc}</div>
      `;

      card.addEventListener('click', () => {
        applyPreset(preset);
      });

      grid.appendChild(card);
    });
  }

  function applyPreset(preset) {
    state = Object.assign({}, state, JSON.parse(JSON.stringify(preset.state)));
    renderLociTable();
    updateUIControls();
    scheduleRender();
    saveStateToStorage();
    showToast(state.lang === 'zh' ? `已应用预设: ${preset.titleZh}` : `Preset Applied: ${preset.titleEn}`, 'success');
  }

  // --- 9. UI Controls Sync with State ---
  function updateUIControls() {
    // Mode
    const modeRadio = document.querySelector(`input[name="chromMode"][value="${state.mode}"]`);
    if (modeRadio) modeRadio.checked = true;

    // Cell Controls
    const cellToggle = document.getElementById('show-cell-toggle');
    if (cellToggle) cellToggle.checked = !!state.showCell;
    const cellWrap = document.getElementById('cell-details-wrap');
    if (cellWrap) cellWrap.style.display = state.showCell ? 'block' : 'none';

    const cellShapeRadio = document.querySelector(`input[name="cellShape"][value="${state.cellShape || 'circle'}"]`);
    if (cellShapeRadio) cellShapeRadio.checked = true;

    const cellBorderRadio = document.querySelector(`input[name="cellBorderStyle"][value="${state.cellBorderStyle || 'solid'}"]`);
    if (cellBorderRadio) cellBorderRadio.checked = true;

    syncSliderField('cell-border-width-slider', 'cell-border-width-val', state.cellBorderWidth || 3, `${state.cellBorderWidth || 3}px`);
    syncSliderField('cell-radius-slider', 'cell-radius-val', state.cellRadius || 0.40, `${Math.round((state.cellRadius || 0.40) * 200)}%`);
    syncColorField('cell-border-color', state.cellBorderColor || '#334155');
    syncColorField('cell-fill-color', state.cellFillColor || '#FFFFFF');
    const cellLbl = document.getElementById('cell-stage-input');
    if (cellLbl) cellLbl.value = state.cellLabel || '';

    // Color Mode
    const colorModeRadio = document.querySelector(`input[name="colorMode"][value="${state.chromosomeColorMode}"]`);
    if (colorModeRadio) colorModeRadio.checked = true;
    updateColorModeVisibility();

    // Color Pickers
    syncColorField('chrom-color', state.chromosomeColor);
    syncColorField('chrom-color-l', state.chromosomeColorL);
    syncColorField('chrom-color-r', state.chromosomeColorR);
    syncColorField('bg-color', state.backgroundColor);
    syncColorField('marker-color', state.markerColor || '#1E293B');
    syncColorField('text-color', state.textColor || '#1E293B');

    // Transparent BG
    const transCheck = document.getElementById('transparent-bg');
    if (transCheck) transCheck.checked = !!state.transparentBg;
    updateTransparentBackground();

    // Sliders
    syncSliderField('line-width-slider', 'line-width-val', state.lineWidth, `${state.lineWidth}px`);
    syncSliderField('chrom-height-slider', 'chrom-height-val', state.chromHeight, `${Math.round(state.chromHeight * 100)}%`);
    syncSliderField('chrom-spacing-slider', 'chrom-spacing-val', state.chromSpacing, `${Math.round(state.chromSpacing * 100)}%`);
    syncSliderField('arm-width-slider', 'arm-width-val', state.armWidth, `${Math.round(state.armWidth * 100)}%`);
    syncSliderField('centromere-pos-slider', 'centromere-pos-val', state.centromerePos, `${Math.round(state.centromerePos * 100)}%`);
    syncSliderField('font-size-scale-slider', 'font-size-scale-val', state.fontSizeScale, `${state.fontSizeScale}x`);
    syncSliderField('marker-size-slider', 'marker-size-val', state.markerFontSize, `${state.markerFontSize}px`);

    // Centromere
    const centRadio = document.querySelector(`input[name="centromere"][value="${state.centromere}"]`);
    if (centRadio) centRadio.checked = true;
    const centPosGroup = document.getElementById('centromere-pos-group');
    if (centPosGroup) centPosGroup.style.display = state.centromere === 'none' ? 'none' : 'block';

    // Typography
    const fontFam = document.getElementById('font-family-select');
    if (fontFam) fontFam.value = state.fontFamily;
    const fontStyleRadio = document.querySelector(`input[name="fontStyle"][value="${state.fontStyle}"]`);
    if (fontStyleRadio) fontStyleRadio.checked = true;

    // Markers
    const markerRadio = document.querySelector(`input[name="markerChoice"][value="${state.markerType}"]`);
    if (markerRadio) markerRadio.checked = true;
    document.getElementById('custom-marker-inputs').style.display = state.markerType === 'Custom' ? 'flex' : 'none';
    const customL = document.getElementById('marker-custom-l');
    const customR = document.getElementById('marker-custom-r');
    if (customL) customL.value = state.markerCustomL || 'X';
    if (customR) customR.value = state.markerCustomR || 'Y';

    // Title
    const titleInput = document.getElementById('diagram-title-input');
    if (titleInput) titleInput.value = state.titleText || '';
  }

  function syncColorField(id, val) {
    const picker = document.getElementById(id);
    const text = document.getElementById(`${id}-text`);
    if (picker && val) picker.value = val;
    if (text && val) text.value = val.toUpperCase();
  }

  function syncSliderField(sliderId, valId, val, displayStr) {
    const slider = document.getElementById(sliderId);
    const display = document.getElementById(valId);
    if (slider) slider.value = val;
    if (display) display.textContent = displayStr;
  }

  function updateColorModeVisibility() {
    const unifiedRow = document.getElementById('color-unified-wrap');
    const separateRow = document.getElementById('color-separate-wrap');
    if (state.chromosomeColorMode === 'separate') {
      if (unifiedRow) unifiedRow.style.display = 'none';
      if (separateRow) separateRow.style.display = 'grid';
    } else {
      if (unifiedRow) unifiedRow.style.display = 'flex';
      if (separateRow) separateRow.style.display = 'none';
    }
  }

  function updateTransparentBackground() {
    if (state.transparentBg) {
      canvasWrapper.classList.add('is-transparent');
    } else {
      canvasWrapper.classList.remove('is-transparent');
    }
  }

  function updateTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.innerHTML = theme === 'dark' ? `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ` : `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
  }

  function updateLanguage(lang) {
    const dict = i18n[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (dict[key]) {
        el.title = dict[key];
      }
    });

    const langBtnText = document.getElementById('lang-btn-text');
    if (langBtnText) langBtnText.textContent = lang === 'zh' ? 'EN' : '中文';

    renderPresets();
  }

  // --- 10. Core Rendering Engine (Canvas & Math) ---
  let renderTimeout = null;
  function scheduleRender() {
    if (renderTimeout) cancelAnimationFrame(renderTimeout);
    renderTimeout = requestAnimationFrame(() => {
      renderCanvas();
    });
  }

  function getRenderGeometry(width, height) {
    const isSingle = state.mode === 'single';
    const isReplicated = state.mode === 'replicated';

    const chromHeightPx = height * state.chromHeight;
    const topY = (height - chromHeightPx) / 2 + (state.titleText ? 15 : 0) - (state.cellLabel ? 12 : 0);
    const bottomY = topY + chromHeightPx;

    const centerX = width / 2;
    const spacingPx = isSingle ? 0 : width * state.chromSpacing;
    const leftX = isSingle ? centerX : centerX - spacingPx / 2;
    const rightX = isSingle ? centerX : centerX + spacingPx / 2;

    const armLenPx = width * state.armWidth;

    return {
      width,
      height,
      topY,
      bottomY,
      chromHeightPx,
      centerX,
      leftX,
      rightX,
      armLenPx,
      isSingle,
      isReplicated
    };
  }

  function getFontSpec(sizePx, customStyle = null) {
    const style = customStyle || state.fontStyle;
    let fontName = 'serif';
    if (state.fontFamily === 'sans') fontName = 'Inter, -apple-system, sans-serif';
    else if (state.fontFamily === 'mono') fontName = 'JetBrains Mono, monospace';
    else fontName = 'Times New Roman, Times, serif';

    let weight = 'normal';
    let fontStyleStr = 'normal';
    if (style === 'italic') fontStyleStr = 'italic';
    if (style === 'bold') weight = 'bold';

    return `${fontStyleStr} ${weight} ${sizePx}px ${fontName}`;
  }

  /**
   * Helper to parse and draw rich text (superscripts & subscripts)
   */
  function drawRichText(ctx, text, x, y, baseFontSize, align = 'center', color = '#1E293B') {
    if (!text) return;
    ctx.save();
    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';

    const tokens = [];
    let i = 0;
    while (i < text.length) {
      if (text[i] === '^') {
        i++;
        let sub = '';
        if (text[i] === '{') {
          i++;
          while (i < text.length && text[i] !== '}') {
            sub += text[i];
            i++;
          }
          if (text[i] === '}') i++;
        } else {
          while (i < text.length && ![' ', '^', '_'].includes(text[i])) {
            sub += text[i];
            i++;
          }
        }
        tokens.push({ type: 'super', text: sub });
      } else if (text[i] === '_') {
        i++;
        let sub = '';
        if (text[i] === '{') {
          i++;
          while (i < text.length && text[i] !== '}') {
            sub += text[i];
            i++;
          }
          if (text[i] === '}') i++;
        } else {
          while (i < text.length && ![' ', '^', '_'].includes(text[i])) {
            sub += text[i];
            i++;
          }
        }
        tokens.push({ type: 'sub', text: sub });
      } else {
        let base = '';
        while (i < text.length && text[i] !== '^' && text[i] !== '_') {
          base += text[i];
          i++;
        }
        tokens.push({ type: 'normal', text: base });
      }
    }

    // Calculate total width
    const superFontSize = baseFontSize * 0.65;
    let totalWidth = 0;
    tokens.forEach(t => {
      ctx.font = getFontSpec(t.type === 'normal' ? baseFontSize : superFontSize);
      t.width = ctx.measureText(t.text).width;
      totalWidth += t.width;
    });

    let curX = x;
    if (align === 'center') {
      curX = x - totalWidth / 2;
    } else if (align === 'right') {
      curX = x - totalWidth;
    }

    tokens.forEach(t => {
      if (t.type === 'super') {
        ctx.font = getFontSpec(superFontSize);
        ctx.fillText(t.text, curX, y - baseFontSize * 0.28);
      } else if (t.type === 'sub') {
        ctx.font = getFontSpec(superFontSize);
        ctx.fillText(t.text, curX, y + baseFontSize * 0.28);
      } else {
        ctx.font = getFontSpec(baseFontSize);
        ctx.fillText(t.text, curX, y);
      }
      curX += t.width;
    });

    ctx.restore();
  }

  /**
   * Render Canvas Main Routine
   */
  function renderCanvas(targetCtx = ctx, targetWidth = CANVAS_BASE_WIDTH, targetHeight = CANVAS_BASE_HEIGHT, scale = 1) {
    if (!targetCtx) return;

    const width = targetWidth * scale;
    const height = targetHeight * scale;

    if (targetCtx === ctx) {
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${CANVAS_BASE_WIDTH}px`;
      canvas.style.height = `${CANVAS_BASE_HEIGHT}px`;
    }

    // 1. Draw Canvas Background
    if (!state.transparentBg) {
      targetCtx.fillStyle = state.backgroundColor;
      targetCtx.fillRect(0, 0, width, height);
    } else {
      targetCtx.clearRect(0, 0, width, height);
    }

    const geo = getRenderGeometry(width, height);
    const lw = state.lineWidth * scale;

    const colorL = state.chromosomeColorMode === 'separate' ? state.chromosomeColorL : state.chromosomeColor;
    const colorR = state.chromosomeColorMode === 'separate' ? state.chromosomeColorR : state.chromosomeColor;
    const labelColor = state.textColor || '#1E293B';

    // 2. Draw Cell Membrane Circle / Boundary if enabled
    if (state.showCell) {
      drawCellBoundary(targetCtx, geo, scale);
    }

    // 3. Draw Title if exists
    if (state.titleText && state.titleText.trim()) {
      targetCtx.save();
      targetCtx.font = getFontSpec(24 * scale, 'bold');
      targetCtx.fillStyle = labelColor;
      targetCtx.textAlign = 'center';
      targetCtx.textBaseline = 'top';
      targetCtx.fillText(state.titleText.trim(), width / 2, 20 * scale);
      targetCtx.restore();
    }

    // 4. Draw Chromosome Backbones
    if (geo.isReplicated) {
      drawReplicatedChromosome(targetCtx, geo.leftX, geo.topY, geo.bottomY, lw, colorL, scale);
      if (!geo.isSingle) {
        drawReplicatedChromosome(targetCtx, geo.rightX, geo.topY, geo.bottomY, lw, colorR, scale);
      }
    } else {
      drawSingleBackbone(targetCtx, geo.leftX, geo.topY, geo.bottomY, lw, colorL, scale);
      if (!geo.isSingle) {
        drawSingleBackbone(targetCtx, geo.rightX, geo.topY, geo.bottomY, lw, colorR, scale);
      }
    }

    // 5. Draw Centromere if enabled
    if (state.centromere !== 'none') {
      const centY = geo.topY + geo.chromHeightPx * state.centromerePos;
      if (state.centromere === 'dot') {
        const dotRadius = lw * 0.85;
        drawCentromereDot(targetCtx, geo.leftX, centY, dotRadius, colorL, scale);
        if (!geo.isSingle) {
          drawCentromereDot(targetCtx, geo.rightX, centY, dotRadius, colorR, scale);
        }
      }
    }

    // 6. Draw Loci & Horizontal Arms & Allele Text
    state.loci.forEach(locus => {
      const y = geo.topY + geo.chromHeightPx * locus.pos;
      const textOffset = 14 * scale;

      // Left Arm & Text
      if (locus.labelL && locus.labelL.trim()) {
        const textL = locus.labelL.trim();
        targetCtx.save();
        targetCtx.strokeStyle = colorL;
        targetCtx.lineWidth = lw * 0.9;
        targetCtx.lineCap = 'round';
        targetCtx.beginPath();
        targetCtx.moveTo(geo.leftX - geo.armLenPx, y);
        targetCtx.lineTo(geo.leftX + geo.armLenPx, y);
        targetCtx.stroke();
        targetCtx.restore();

        const baseFontSize = calculateFontSize(textL) * state.fontSizeScale * scale;
        const textX = geo.leftX - geo.armLenPx - textOffset;
        drawRichText(targetCtx, textL, textX, y, baseFontSize, 'right', labelColor);
      }

      // Right Arm & Text (if not single)
      if (!geo.isSingle && locus.labelR && locus.labelR.trim()) {
        const textR = locus.labelR.trim();
        targetCtx.save();
        targetCtx.strokeStyle = colorR;
        targetCtx.lineWidth = lw * 0.9;
        targetCtx.lineCap = 'round';
        targetCtx.beginPath();
        targetCtx.moveTo(geo.rightX - geo.armLenPx, y);
        targetCtx.lineTo(geo.rightX + geo.armLenPx, y);
        targetCtx.stroke();
        targetCtx.restore();

        const baseFontSize = calculateFontSize(textR) * state.fontSizeScale * scale;
        const textX = geo.rightX + geo.armLenPx + textOffset;
        drawRichText(targetCtx, textR, textX, y, baseFontSize, 'left', labelColor);
      }
    });

    // 7. Draw Bottom Markers (XY, XX, ZW, ZZ, Custom)
    drawBottomMarkers(targetCtx, geo, scale);

    // 8. Draw Cell Stage Label if set
    if (state.showCell && state.cellLabel && state.cellLabel.trim()) {
      targetCtx.save();
      targetCtx.font = getFontSpec(18 * scale, 'bold');
      targetCtx.fillStyle = state.textColor || '#1E293B';
      targetCtx.textAlign = 'center';
      targetCtx.textBaseline = 'bottom';
      targetCtx.fillText(state.cellLabel.trim(), width / 2, height - 16 * scale);
      targetCtx.restore();
    }
  }

  /**
   * Draw Cell Membrane / Boundary (Circle / Oval / Rounded Rect)
   */
  function drawCellBoundary(ctx, geo, scale) {
    const cx = geo.width / 2;
    const cy = geo.height / 2 + (state.titleText ? 15 : 0) - (state.cellLabel ? 12 : 0);
    const r = geo.width * (state.cellRadius || 0.40);
    const bw = (state.cellBorderWidth || 3) * scale;
    const bColor = state.cellBorderColor || '#334155';
    const fillColor = state.cellFillColor || '#FFFFFF';

    ctx.save();
    ctx.lineWidth = bw;
    ctx.strokeStyle = bColor;

    if (state.cellBorderStyle === 'dashed') {
      ctx.setLineDash([12 * scale, 8 * scale]);
    } else {
      ctx.setLineDash([]);
    }

    ctx.beginPath();
    if (state.cellShape === 'oval') {
      ctx.ellipse(cx, cy, r, r * 1.15, 0, 0, Math.PI * 2);
    } else if (state.cellShape === 'rounded') {
      const rx = r * 1.05;
      const ry = r * 1.15;
      ctx.roundRect(cx - rx, cy - ry, rx * 2, ry * 2, 24 * scale);
    } else {
      // Default: Circle
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
    }

    if (fillColor && fillColor !== 'transparent' && !state.transparentBg) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
    ctx.stroke();
    ctx.restore();
  }

  function drawSingleBackbone(ctx, x, topY, bottomY, lw, color, scale) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.lineCap = 'round';

    if (state.centromere === 'constriction') {
      const centY = topY + (bottomY - topY) * state.centromerePos;
      const waistH = 16 * scale;
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, centY - waistH);
      ctx.stroke();

      ctx.save();
      ctx.lineWidth = lw * 0.42;
      ctx.beginPath();
      ctx.moveTo(x, centY - waistH);
      ctx.lineTo(x, centY + waistH);
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      ctx.moveTo(x, centY + waistH);
      ctx.lineTo(x, bottomY);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawReplicatedChromosome(ctx, x, topY, bottomY, lw, color, scale) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.lineCap = 'round';

    const deltaX = 14 * scale;
    const centY = topY + (bottomY - topY) * state.centromerePos;

    // Chromatid 1
    ctx.beginPath();
    ctx.moveTo(x - deltaX, topY);
    ctx.quadraticCurveTo(x, centY, x - deltaX, bottomY);
    ctx.stroke();

    // Chromatid 2
    ctx.beginPath();
    ctx.moveTo(x + deltaX, topY);
    ctx.quadraticCurveTo(x, centY, x + deltaX, bottomY);
    ctx.stroke();

    ctx.restore();
  }

  function drawCentromereDot(ctx, x, y, radius, color, scale) {
    ctx.save();
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5 * scale;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawBottomMarkers(ctx, geo, scale) {
    if (state.markerType === 'None') return;

    const markerY = geo.bottomY + 36 * scale;
    const markerColor = state.markerColor || '#1E293B';
    const markerFontSize = state.markerFontSize * scale;

    let textL = '';
    let textR = '';

    if (state.markerType === 'XY') {
      textL = 'X';
      textR = 'Y';
    } else if (state.markerType === 'XX') {
      textL = 'X';
      textR = 'X';
    } else if (state.markerType === 'ZW') {
      textL = 'Z';
      textR = 'W';
    } else if (state.markerType === 'ZZ') {
      textL = 'Z';
      textR = 'Z';
    } else if (state.markerType === 'Custom') {
      textL = state.markerCustomL || '';
      textR = state.markerCustomR || '';
    }

    if (geo.isSingle) {
      if (textL) {
        drawRichText(ctx, textL, geo.centerX, markerY, markerFontSize, 'center', markerColor);
      }
    } else {
      if (textL) {
        drawRichText(ctx, textL, geo.leftX, markerY, markerFontSize, 'center', markerColor);
      }
      if (textR) {
        drawRichText(ctx, textR, geo.rightX, markerY, markerFontSize, 'center', markerColor);
      }
    }
  }

  function calculateFontSize(text) {
    const rawLen = text.replace(/[\^_{}]/g, '').length;
    if (rawLen <= 1) return 32;
    if (rawLen <= 2) return 27;
    if (rawLen <= 4) return 22;
    return 18;
  }

  // --- 11. SVG Generator Engine (With Cell Membrane Support) ---
  function generateSVG() {
    const width = CANVAS_BASE_WIDTH;
    const height = CANVAS_BASE_HEIGHT;
    const geo = getRenderGeometry(width, height);
    const lw = state.lineWidth;
    const colorL = state.chromosomeColorMode === 'separate' ? state.chromosomeColorL : state.chromosomeColor;
    const colorR = state.chromosomeColorMode === 'separate' ? state.chromosomeColorR : state.chromosomeColor;
    const labelColor = state.textColor || '#1E293B';

    let fontFam = 'serif';
    if (state.fontFamily === 'sans') fontFam = 'Inter, -apple-system, sans-serif';
    else if (state.fontFamily === 'mono') fontFam = 'JetBrains Mono, monospace';

    const fontStyleAttr = state.fontStyle === 'italic' ? 'font-style="italic"' : '';
    const fontWeightAttr = state.fontStyle === 'bold' ? 'font-weight="bold"' : '';

    let svg = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    svg += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">\n`;
    svg += `  <style>\n`;
    svg += `    text { font-family: ${fontFam}; ${fontStyleAttr ? 'font-style: italic;' : ''} ${fontWeightAttr ? 'font-weight: bold;' : ''} }\n`;
    svg += `  </style>\n`;

    // Canvas Background
    if (!state.transparentBg) {
      svg += `  <rect width="${width}" height="${height}" fill="${state.backgroundColor}" />\n`;
    }

    // Cell Membrane
    if (state.showCell) {
      const cx = width / 2;
      const cy = height / 2 + (state.titleText ? 15 : 0) - (state.cellLabel ? 12 : 0);
      const r = width * (state.cellRadius || 0.40);
      const bw = state.cellBorderWidth || 3;
      const bc = state.cellBorderColor || '#334155';
      const fc = (state.cellFillColor && state.cellFillColor !== 'transparent' && !state.transparentBg) ? state.cellFillColor : 'none';
      const dash = state.cellBorderStyle === 'dashed' ? 'stroke-dasharray="12 8"' : '';

      if (state.cellShape === 'oval') {
        svg += `  <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 1.15}" fill="${fc}" stroke="${bc}" stroke-width="${bw}" ${dash} />\n`;
      } else if (state.cellShape === 'rounded') {
        const rx = r * 1.05;
        const ry = r * 1.15;
        svg += `  <rect x="${cx - rx}" y="${cy - ry}" width="${rx * 2}" height="${ry * 2}" rx="24" fill="${fc}" stroke="${bc}" stroke-width="${bw}" ${dash} />\n`;
      } else {
        svg += `  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fc}" stroke="${bc}" stroke-width="${bw}" ${dash} />\n`;
      }
    }

    // Title
    if (state.titleText && state.titleText.trim()) {
      svg += `  <text x="${width / 2}" y="32" text-anchor="middle" font-size="24" font-weight="bold" fill="${labelColor}">${escapeXml(state.titleText.trim())}</text>\n`;
    }

    // Chromosomes
    if (geo.isReplicated) {
      const deltaX = 14;
      const centY = geo.topY + geo.chromHeightPx * state.centromerePos;
      svg += `  <path d="M ${geo.leftX - deltaX} ${geo.topY} Q ${geo.leftX} ${centY} ${geo.leftX - deltaX} ${geo.bottomY}" stroke="${colorL}" stroke-width="${lw}" stroke-linecap="round" fill="none" />\n`;
      svg += `  <path d="M ${geo.leftX + deltaX} ${geo.topY} Q ${geo.leftX} ${centY} ${geo.leftX + deltaX} ${geo.bottomY}" stroke="${colorL}" stroke-width="${lw}" stroke-linecap="round" fill="none" />\n`;
      if (!geo.isSingle) {
        svg += `  <path d="M ${geo.rightX - deltaX} ${geo.topY} Q ${geo.rightX} ${centY} ${geo.rightX - deltaX} ${geo.bottomY}" stroke="${colorR}" stroke-width="${lw}" stroke-linecap="round" fill="none" />\n`;
        svg += `  <path d="M ${geo.rightX + deltaX} ${geo.topY} Q ${geo.rightX} ${centY} ${geo.rightX + deltaX} ${geo.bottomY}" stroke="${colorR}" stroke-width="${lw}" stroke-linecap="round" fill="none" />\n`;
      }
    } else {
      if (state.centromere === 'constriction') {
        const centY = geo.topY + geo.chromHeightPx * state.centromerePos;
        const waistH = 16;
        svg += `  <line x1="${geo.leftX}" y1="${geo.topY}" x2="${geo.leftX}" y2="${centY - waistH}" stroke="${colorL}" stroke-width="${lw}" stroke-linecap="round" />\n`;
        svg += `  <line x1="${geo.leftX}" y1="${centY - waistH}" x2="${geo.leftX}" y2="${centY + waistH}" stroke="${colorL}" stroke-width="${lw * 0.42}" stroke-linecap="round" />\n`;
        svg += `  <line x1="${geo.leftX}" y1="${centY + waistH}" x2="${geo.leftX}" y2="${geo.bottomY}" stroke="${colorL}" stroke-width="${lw}" stroke-linecap="round" />\n`;
        if (!geo.isSingle) {
          svg += `  <line x1="${geo.rightX}" y1="${geo.topY}" x2="${geo.rightX}" y2="${centY - waistH}" stroke="${colorR}" stroke-width="${lw}" stroke-linecap="round" />\n`;
          svg += `  <line x1="${geo.rightX}" y1="${centY - waistH}" x2="${geo.rightX}" y2="${centY + waistH}" stroke="${colorR}" stroke-width="${lw * 0.42}" stroke-linecap="round" />\n`;
          svg += `  <line x1="${geo.rightX}" y1="${centY + waistH}" x2="${geo.rightX}" y2="${geo.bottomY}" stroke="${colorR}" stroke-width="${lw}" stroke-linecap="round" />\n`;
        }
      } else {
        svg += `  <line x1="${geo.leftX}" y1="${geo.topY}" x2="${geo.leftX}" y2="${geo.bottomY}" stroke="${colorL}" stroke-width="${lw}" stroke-linecap="round" />\n`;
        if (!geo.isSingle) {
          svg += `  <line x1="${geo.rightX}" y1="${geo.topY}" x2="${geo.rightX}" y2="${geo.bottomY}" stroke="${colorR}" stroke-width="${lw}" stroke-linecap="round" />\n`;
        }
      }
    }

    // Centromere Dot
    if (state.centromere === 'dot') {
      const centY = geo.topY + geo.chromHeightPx * state.centromerePos;
      const r = lw * 0.85;
      svg += `  <circle cx="${geo.leftX}" cy="${centY}" r="${r}" fill="#FFFFFF" stroke="${colorL}" stroke-width="2.5" />\n`;
      if (!geo.isSingle) {
        svg += `  <circle cx="${geo.rightX}" cy="${centY}" r="${r}" fill="#FFFFFF" stroke="${colorR}" stroke-width="2.5" />\n`;
      }
    }

    // Loci arms and labels
    state.loci.forEach(locus => {
      const y = geo.topY + geo.chromHeightPx * locus.pos;
      if (locus.labelL && locus.labelL.trim()) {
        svg += `  <line x1="${geo.leftX - geo.armLenPx}" y1="${y}" x2="${geo.leftX + geo.armLenPx}" y2="${y}" stroke="${colorL}" stroke-width="${lw * 0.9}" stroke-linecap="round" />\n`;
        const fSize = calculateFontSize(locus.labelL) * state.fontSizeScale;
        const textX = geo.leftX - geo.armLenPx - 14;
        svg += `  <text x="${textX}" y="${y + fSize * 0.35}" font-size="${fSize}" text-anchor="end" fill="${labelColor}">${escapeXml(locus.labelL)}</text>\n`;
      }

      if (!geo.isSingle && locus.labelR && locus.labelR.trim()) {
        svg += `  <line x1="${geo.rightX - geo.armLenPx}" y1="${y}" x2="${geo.rightX + geo.armLenPx}" y2="${y}" stroke="${colorR}" stroke-width="${lw * 0.9}" stroke-linecap="round" />\n`;
        const fSize = calculateFontSize(locus.labelR) * state.fontSizeScale;
        const textX = geo.rightX + geo.armLenPx + 14;
        svg += `  <text x="${textX}" y="${y + fSize * 0.35}" font-size="${fSize}" text-anchor="start" fill="${labelColor}">${escapeXml(locus.labelR)}</text>\n`;
      }
    });

    // Bottom Markers
    if (state.markerType !== 'None') {
      const markerY = geo.bottomY + 40;
      const markerSize = state.markerFontSize;
      const markerCol = state.markerColor || '#1E293B';
      let tL = '', tR = '';
      if (state.markerType === 'XY') { tL = 'X'; tR = 'Y'; }
      else if (state.markerType === 'XX') { tL = 'X'; tR = 'X'; }
      else if (state.markerType === 'ZW') { tL = 'Z'; tR = 'W'; }
      else if (state.markerType === 'ZZ') { tL = 'Z'; tR = 'Z'; }
      else if (state.markerType === 'Custom') { tL = state.markerCustomL; tR = state.markerCustomR; }

      if (geo.isSingle && tL) {
        svg += `  <text x="${geo.centerX}" y="${markerY}" font-size="${markerSize}" text-anchor="middle" fill="${markerCol}">${escapeXml(tL)}</text>\n`;
      } else {
        if (tL) svg += `  <text x="${geo.leftX}" y="${markerY}" font-size="${markerSize}" text-anchor="middle" fill="${markerCol}">${escapeXml(tL)}</text>\n`;
        if (tR) svg += `  <text x="${geo.rightX}" y="${markerY}" font-size="${markerSize}" text-anchor="middle" fill="${markerCol}">${escapeXml(tR)}</text>\n`;
      }
    }

    // Cell Stage Annotation
    if (state.showCell && state.cellLabel && state.cellLabel.trim()) {
      svg += `  <text x="${width / 2}" y="${height - 20}" font-size="18" font-weight="bold" text-anchor="middle" fill="${labelColor}">${escapeXml(state.cellLabel.trim())}</text>\n`;
    }

    svg += `</svg>`;
    return svg;
  }

  function escapeXml(str) {
    if (!str) return '';
    return str.replace(/[<>&'"]/g, c => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
      }
    });
  }

  // --- 12. Export & Action Handlers ---
  function exportPNG() {
    const scale = state.exportResolution || 2;
    const offCanvas = document.createElement('canvas');
    offCanvas.width = CANVAS_BASE_WIDTH * scale;
    offCanvas.height = CANVAS_BASE_HEIGHT * scale;
    const offCtx = offCanvas.getContext('2d');

    renderCanvas(offCtx, CANVAS_BASE_WIDTH, CANVAS_BASE_HEIGHT, scale);

    const link = document.createElement('a');
    link.download = `chromosome_cell_diagram_${Date.now()}.png`;
    link.href = offCanvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(i18n[state.lang].downloadSuccess, 'success');
  }

  function exportSVG() {
    const svgContent = generateSVG();
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `chromosome_cell_diagram_${Date.now()}.svg`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(i18n[state.lang].downloadSuccess, 'success');
  }

  async function copyImageToClipboard() {
    try {
      const scale = 2;
      const offCanvas = document.createElement('canvas');
      offCanvas.width = CANVAS_BASE_WIDTH * scale;
      offCanvas.height = CANVAS_BASE_HEIGHT * scale;
      const offCtx = offCanvas.getContext('2d');

      renderCanvas(offCtx, CANVAS_BASE_WIDTH, CANVAS_BASE_HEIGHT, scale);

      offCanvas.toBlob(async (blob) => {
        if (!blob) throw new Error('Blob generation failed');
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        showToast(i18n[state.lang].copiedSuccess, 'success');
      }, 'image/png');
    } catch (err) {
      console.error('Clipboard copy error:', err);
      showToast(i18n[state.lang].copiedError, 'info');
    }
  }

  function shareConfiguration() {
    try {
      const jsonStr = JSON.stringify(state);
      const encoded = btoa(encodeURIComponent(jsonStr));
      const shareUrl = `${window.location.origin}${window.location.pathname}#${encoded}`;
      navigator.clipboard.writeText(shareUrl);
      showToast(i18n[state.lang].shareCopied, 'success');
    } catch (e) {
      console.error('Share url generation error:', e);
    }
  }

  function resetToDefault() {
    localStorage.removeItem('chromosome_app_state');
    window.location.hash = '';
    state = {
      lang: state.lang,
      theme: state.theme,
      zoom: 1.0,
      exportResolution: 2,
      mode: 'pair',
      loci: [
        { id: 1, pos: 0.25, labelL: 'A', labelR: 'a' },
        { id: 2, pos: 0.75, labelL: 'B', labelR: 'b' }
      ],
      showCell: true,
      cellShape: 'circle',
      cellBorderStyle: 'solid',
      cellBorderWidth: 3,
      cellBorderColor: '#334155',
      cellRadius: 0.40,
      cellFillColor: '#FFFFFF',
      cellLabel: '',
      chromosomeColorMode: 'unified',
      chromosomeColor: '#1E293B',
      chromosomeColorL: '#2563EB',
      chromosomeColorR: '#DC2626',
      backgroundColor: '#FFFFFF',
      transparentBg: false,
      textColor: '#1E293B',
      lineWidth: 15,
      chromHeight: 0.54,
      chromSpacing: 0.22,
      armWidth: 0.065,
      centromere: 'constriction',
      centromerePos: 0.50,
      fontFamily: 'serif',
      fontStyle: 'italic',
      fontSizeScale: 1.0,
      markerType: 'None',
      markerCustomL: 'X',
      markerCustomR: 'Y',
      markerFontSize: 26,
      markerColor: '#1E293B',
      titleText: ''
    };
    renderLociTable();
    updateUIControls();
    scheduleRender();
  }

  // --- 13. Zoom Viewport Controls ---
  function adjustZoom(delta) {
    setZoom(Math.max(0.4, Math.min(2.5, state.zoom + delta)));
  }

  function setZoom(val) {
    state.zoom = Number(val.toFixed(2));
    if (canvasWrapper) {
      canvasWrapper.style.transform = `scale(${state.zoom})`;
    }
    const display = document.getElementById('zoom-display');
    if (display) display.textContent = `${Math.round(state.zoom * 100)}%`;
  }

  // --- 14. Toast Notification Utility ---
  function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 14 14"></polyline>
      </svg>
      <span>${msg}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
