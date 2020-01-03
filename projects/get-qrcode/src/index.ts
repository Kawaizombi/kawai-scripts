/* eslint-disable @typescript-eslint/camelcase */
import QRCode, { QRCodeToDataURLOptions } from 'qrcode';
import styles from './styles.scss';
import template from './template.html';

interface GMTab {
  onclose?: () => void;
  closed: boolean;
  close: () => void;
}

type GM_registerMenuCommand = (name: string, callback: () => void) => void;
type GM_openInTab = (url: string, inBackground: boolean) => GMTab;

declare global {
  interface Window {
    GM_registerMenuCommand: GM_registerMenuCommand;
    GM_openInTab: GM_openInTab;
  }
}

function getQRCodePage(qrCodeUrl: string) {
  const doc = new DOMParser().parseFromString(template, 'text/html');
  doc.querySelector('.qr-code').setAttribute('src', qrCodeUrl);

  return `<style>${ styles }</style>${doc.body.innerHTML}`;
}

function qrCodeAsPromised(text: string, options: QRCodeToDataURLOptions) {
  return new Promise<string>((resolve, reject) => {
    QRCode.toDataURL(text, options, (err, url) => {
      err ? reject(err) : resolve(url);
    });
  });
}

window.GM_registerMenuCommand('Get QR code', async () => {
  const { href: currentUrl } = document.location;
  const { innerHeight, innerWidth } = window;
  const minDimension = Math.min(innerHeight, innerWidth);
  const qrCodeWidth = minDimension * 0.8;

  const qrCodeUrl = await qrCodeAsPromised(currentUrl, { width: qrCodeWidth });
  const qrCodePage = getQRCodePage(qrCodeUrl);

  const blob = new Blob([qrCodePage], { type: 'text/html' });
  const tabUrl = URL.createObjectURL(blob);

  const tab = window.GM_openInTab(tabUrl, false);
  tab.onclose = () => URL.revokeObjectURL(tabUrl);
});
