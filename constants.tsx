
import { SectionContent } from './types';

export const MANUAL_CONTENT: SectionContent[] = [
  {
    id: 'digital-counter',
    title: '数字跳动',
    previewType: 'counter',
    description: '数字跳动效果常用于数据展示或倒计时场景，能够有效吸引观众的注意力。其核心在于利用表达式动态改变文本图层的数值。',
    steps: [
      '在合成中新建一个文本图层。',
      '添加“效果与预设” > “表达式控制” > “滑块控制”。',
      '按住 Alt 点击“源文本”秒表。',
      '将表达式拾取器拖拽到“滑块控制”。'
    ],
    expression: 'Math.round(effect("滑块控制")("滑块").value);',
    tips: ['使用 Math.round() 进行取整', '设置滑块关键帧（如 0 到 100）驱动数值']
  },
  {
    id: 'text-anim',
    title: '文字动画',
    previewType: 'text-slide',
    description: '通过简单的位移和样式变化，即可实现专业、动态的视觉效果，包括标题滑入和关键词强调。',
    steps: [
      '设置文字位置关键帧，实现滑入效果。',
      '按 F9 应用“缓入/缓出”。',
      '在“动画”按钮中选择“填充颜色”或“缩放”。',
      '利用“范围选择器”控制动画作用区域。'
    ],
    tips: ['进入图表编辑器调整速度曲线', '使用范围选择器实现打字机效果']
  },
  {
    id: 'bar-chart',
    title: '条形图生长',
    previewType: 'bar-growth',
    description: '动态的数据图表能将枯燥的数据变得生动直观。',
    steps: [
      '绘制一个矩形形状图层。',
      '将锚点移动到矩形底部中心。',
      '取消缩放属性的等比链接。',
      '为 Y 轴缩放设置 0% 到 100% 的关键帧。'
    ],
    tips: ['锚点位置决定生长方向', '批量复制并错开关键帧时间']
  },
  {
    id: 'mask-push',
    title: '遮罩推入',
    previewType: 'mask-push',
    description: '遮罩是AE中功能强大的工具，可以实现如推拉门、画卷展开等转场效果。',
    steps: [
      '使用钢笔或形状工具绘制闭合遮罩。',
      '为“遮罩路径”属性设置关键帧。',
      '起始帧移出范围，结束帧完全显示。',
      '或使用轨道遮罩（Track Matte）通过图层交互。'
    ],
    tips: ['适当增加“遮罩羽化”使边缘柔和', '轨道遮罩提供更灵活的层级控制']
  },
  {
    id: 'camera-push',
    title: '镜头推进',
    previewType: 'camera-zoom',
    description: '模拟摄像机的推拉镜头，聚焦重点信息。',
    steps: [
      '启用 3D 图层开关。',
      '新建摄像机图层。',
      '为摄像机“位置”属性设置 Z 轴关键帧。',
      '或者直接在 2D 层面调整缩放与位置。'
    ],
    tips: ['3D 空间能带来更真实的透视感', '2D 推进需注意中心点的位移补偿']
  },
  {
    id: 'shape-basics',
    title: '形状图层基础',
    previewType: 'shape-trim',
    description: 'MG 动画的基石，通过路径操作创造复杂动效。',
    steps: [
      '形状图层可包含多个组，每个组独立。',
      '使用“合并路径”进行布尔运算。',
      '添加“修剪路径”制作线条生长。',
      '设置“起始”和“结束”百分比。'
    ],
    tips: ['修剪路径是线条动效的核心', '利用布尔运算简化复杂图形制作']
  },
  {
    id: 'transitions',
    title: '整体 Slide 转场',
    previewType: 'slide-transition',
    description: '模仿 PPT 翻页或场景切换的滑动效果，通常通过预合成实现。',
    steps: [
      '将所有关联图层进行“预合成”。',
      '为预合成图层设置“位置”位移。',
      '在衔接处放置下一页预合成并滑入。',
      '开启“运动模糊”开关。'
    ],
    tips: ['运动模糊是流畅感的灵魂', '预合成让场景管理更清晰']
  },
  {
    id: 'tracking',
    title: '呼应标注',
    previewType: 'tracking',
    description: '让文字或图标精确跟随视频中移动的物体。',
    steps: [
      '打开“跟踪器”面板，点击“跟踪运动”。',
      '设置特征区域和搜索区域。',
      '点击“向前分析”生成路径。',
      '应用数据到“空对象”，并建立父子链接。'
    ],
    tips: ['选择对比度高的点作为跟踪目标', '空对象是数据的最佳中转站']
  },
  {
    id: 'logo-anim',
    title: 'Logo 动画',
    previewType: 'logo-anim',
    description: '品牌展示的关键，综合多种 MG 技巧。',
    steps: [
      '导入 AI/EPS 矢量文件并保留图层大小。',
      '利用“修剪路径”动态绘制轮廓。',
      '依次控制各部分的缩放、位置和不透明度。',
      '配合缓动曲线提升节奏感。'
    ],
    tips: ['节奏感比炫酷的特效更重要', '从中心向外扩散通常视觉效果更好']
  },
  {
    id: 'chart-advanced',
    title: '高级图表动画',
    previewType: 'pie-chart',
    description: '饼图、环图、折线图的快速实现。',
    steps: [
      '绘制圆环并添加“修剪路径”。',
      '绘制折线路径并添加“修剪路径”。',
      '设置结束属性 0% -> N%。',
      '数据节点配合缩放动画出现。'
    ],
    tips: ['环形图的描边粗细决定其风格', '折线生长要配合坐标轴的出现']
  },
  {
    id: 'mg-elements',
    title: 'MG 动画元素',
    previewType: 'mg-elements',
    description: '点、线、面基本几何图形的组合，丰富画面细节。',
    steps: [
      '圆形：缩放+位移制作粒子感。',
      '线条：钢笔绘制+修剪路径。',
      '面：多边形+旋转+弹性缓动。',
      '组合多个元素形成爆炸或喷射效果。'
    ],
    tips: ['随机性（Random）能增加动效的生动度', '小元素的装饰性能极大提升高级感']
  }
];
