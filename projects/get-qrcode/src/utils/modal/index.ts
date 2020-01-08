import styles from './modal.styles.scss';
import template from './modal.template.html';

export default function modal(element) {
  const doc = new DOMParser().parseFromString(template, 'text/html');

  const modal = doc.body.firstChild as HTMLElement;
  const style = document.createElement('style');
  const container: HTMLElement = modal.querySelector('.simple-modal-container');
  container.append(element);
  style.innerHTML = styles;

  const show = () => {
    document.head.append(style);
    document.body.append(modal);
    container.focus();
  };

  const hide = () => {
    modal.remove();
    style.remove();
  };

  modal.querySelector('.simple-modal-close').addEventListener('click', hide);

  return { show, hide }
}
