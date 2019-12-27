export default function readFile(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (ev) => resolve(ev.target.result);
    reader.onerror = reject;

    reader.readAsText(file);
  });
}
