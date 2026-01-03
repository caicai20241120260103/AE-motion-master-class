
export interface SectionContent {
  id: string;
  title: string;
  description: string;
  steps: string[];
  tips?: string[];
  expression?: string;
  previewType: 'counter' | 'text-slide' | 'bar-growth' | 'mask-push' | 'camera-zoom' | 'shape-trim' | 'slide-transition' | 'tracking' | 'logo-anim' | 'pie-chart' | 'mg-elements';
}

export enum SectionID {
  DIGITAL_COUNTER = 'digital-counter',
  TEXT_ANIM = 'text-anim',
  BAR_CHART = 'bar-chart',
  MASK_PUSH = 'mask-push',
  CAMERA_PUSH = 'camera-push',
  SHAPE_BASICS = 'shape-basics',
  TRANSITIONS = 'transitions',
  TRACKING = 'tracking',
  LOGO_ANIM = 'logo-anim',
  CHART_ADVANCED = 'chart-advanced',
  MG_ELEMENTS = 'mg-elements'
}
