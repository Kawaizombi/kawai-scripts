declare function GM_download(url: string, name: string): void;

export default async function gmDownload(url: string | Blob, name: string) {
  if(url instanceof Blob) {
    const reader = new FileReader();
    url = await new Promise((resolve) => {
      reader.onload = (e) => resolve(e.target.result as string);
      reader.readAsDataURL(url as Blob);
    });
  }

  GM_download(url as string, name);
}
