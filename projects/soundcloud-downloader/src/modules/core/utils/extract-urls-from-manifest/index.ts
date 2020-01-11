export default function extractUrlsFromManifest(manifests: any[]): string[][] {
  return manifests.map((manifest) => manifest.segments.map(({ uri }) => uri));
}
