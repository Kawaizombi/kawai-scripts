export default async function waitSelector(selector: string) {
  while(document.querySelector(selector) === null) {
    await new Promise(resolve => requestAnimationFrame(resolve));
  }

  return document.querySelector(selector);
}
