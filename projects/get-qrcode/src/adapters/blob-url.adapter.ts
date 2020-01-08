export default function blobUrlAdapter(page: string) {
  const blob = new Blob([page], { type: 'text/html' });

  return URL.createObjectURL(blob);
}
