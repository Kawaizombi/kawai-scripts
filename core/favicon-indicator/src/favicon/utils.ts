import { FAVICON_SELECTOR } from './constants';

export const createIcon = (url) => {
  const icon = document.createElement('link');
  icon.type = 'image/x-icon';
  icon.rel = 'icon';
  icon.href = url;

  return icon;
};

export const removeAllIcons = () => {
  const icons = document.querySelectorAll(FAVICON_SELECTOR);
  icons.forEach((icon) => icon.remove());
};

export const getCanvas = (size = 256) => {
  const canvas = document.createElement('canvas');

  canvas.width = size;
  canvas.height = size;

  return canvas;
};
