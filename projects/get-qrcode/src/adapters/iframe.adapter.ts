export default function iframeAdapter(page: string) {
  const iframe = document.createElement('iframe');

  iframe.srcdoc = page;
  iframe.referrerPolicy = 'no-referrer';

  return iframe;
}
