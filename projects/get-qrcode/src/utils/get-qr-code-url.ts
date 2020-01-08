import qrCodeAsPromised from './qr-code-as-promised';

export default function getQrCodeUrl() {
  const { href: currentUrl } = document.location;
  const { innerHeight, innerWidth } = window;
  const minDimension = Math.min(innerHeight, innerWidth);
  const qrCodeWidth = minDimension * 0.8;

  return qrCodeAsPromised(currentUrl, { width: qrCodeWidth });
}
