export const QUALITY_CHOICES = [
  {label: 'Auto', value: 'AUTO'},
  {label: '240p', value: 240},
  {label: '360p', value: 360},
  {label: '480p', value: 480},
  {label: '720p', value: 720},
  {label: '1080p', value: 1080},
  {label: 'Max', value: 'MAX'},
];

export const SPEED_CHOICES = [
  {label: 'x0.25', value: 0.25},
  {label: 'x0.5', value: 0.5},
  {label: 'x0.75', value: 0.75},
  {label: 'Normal', value: 1},
  {label: 'x1.25', value: 1.25},
  {label: 'x1.5', value: 1.5},
  {label: 'x1.75', value: 1.75},
  {label: 'x2', value: 2},
];

export const [DEFAULT_QUALITY] = QUALITY_CHOICES;
export const DEFAULT_SPEED = SPEED_CHOICES.find(({value}) => value === 1);
