import QRCode, { QRCodeToDataURLOptions } from 'qrcode';

export default function qrCodeAsPromised(text: string, options: QRCodeToDataURLOptions) {
  return new Promise<string>((resolve, reject) => {
    QRCode.toDataURL(text, options, (err, url) => {
      err ? reject(err) : resolve(url);
    });
  });
}
