const IMAGE_FORMATS = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'bmp'];

const STYLES: Partial<CSSStyleDeclaration> = {
  position: 'absolute',
  zIndex: '9999999',
  pointerEvents: 'none',
  maxWidth: '50%',
  maxHeight: '50%',
  border: '2px solid #ccc',
  borderRadius: '3px',
};

function createPreview(url) {
  const preview = new Image();
  Object.assign(preview.style, STYLES);
  preview.src = url;
  return preview;
}

function updatePos(el: HTMLElement, x: number, y: number) {
  el.style.left = `${ x }px`;
  el.style.top = `${ y }px`;
}

function addHandlers(img: HTMLImageElement, link: HTMLAnchorElement) {
  const moveHandler = ({ pageX, pageY }) => updatePos(img, pageX, pageY);
  const leaveHandler = () => {
    img.remove();
    link.removeEventListener('mousemove', moveHandler);
    link.removeEventListener('mouseleave', leaveHandler);
  };

  link.addEventListener('mousemove', moveHandler);
  link.addEventListener('mouseleave', leaveHandler);
}

document.querySelectorAll('a').forEach((link) => {
  link.addEventListener('mouseenter', async ({ pageX, pageY }) => {
    const url = link.getAttribute('href');
    const [ext] = url.split('.').reverse();

    if(IMAGE_FORMATS.includes(ext)) {
      const preview = createPreview(url);

      document.body.appendChild(preview);
      updatePos(preview, pageX, pageY);

      addHandlers(preview, link);
    }
  });
});
