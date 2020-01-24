export default function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (ev) => resolve((ev.target as any).result as string);
    reader.onerror = reject;

    reader.readAsText(file);
  });
}
