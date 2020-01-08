import template from './template.html';
import styles from './styles.scss';

export default function buildQRCodePage(qrCodeUrl) {
  const doc = new DOMParser().parseFromString(template, 'text/html');
  doc.querySelector('.qr-code').setAttribute('src', qrCodeUrl);

  return `<style>${ styles }</style>${ doc.body.innerHTML }`;
}
