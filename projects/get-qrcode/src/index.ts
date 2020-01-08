/* eslint-disable @typescript-eslint/camelcase */
import modal from './utils/modal';
import blobUrlAdapter from './adapters/blob-url.adapter';
import iframeAdapter from './adapters/iframe.adapter';
import buildQRCodePage from './utils/build-qr-code-page';
import getQrCodeUrl from './utils/get-qr-code-url';

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

const COMMANDS = [
  {
    caption: 'Get QR code(new tab)',
    async command() {
      const page = buildQRCodePage(await getQrCodeUrl());
      const pageUrl = blobUrlAdapter(page);

      const tab = window.GM_openInTab(pageUrl, false);
      tab.onclose = () => URL.revokeObjectURL(pageUrl);
    },
    enabled: () => navigator.userAgent.toLowerCase().indexOf('firefox') < 0,
  },
  {
    caption: 'Get QR code(current tab)',
    async command() {
      const page = buildQRCodePage(await getQrCodeUrl());
      const iframe = iframeAdapter(page);

      modal(iframe).show();
    },
  }
];

COMMANDS.forEach(({ caption, command, enabled }) => {
  if(!enabled || enabled()) {
    window.GM_registerMenuCommand(caption, command);
  }
});

