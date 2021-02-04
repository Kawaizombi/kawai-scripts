import ID3Writer from 'browser-id3-writer';

export default function addId3(buffer: ArrayBuffer, metadata: any): ArrayBuffer {
  const writer = new ID3Writer(buffer)
    .setFrame('TCON', metadata.genre ? metadata.genre.split(' & ') : [])
    .setFrame('TIT2', metadata.title)
    .setFrame('TPE1', [metadata.user.username]);

  if (metadata.trackNumber) {
    writer.setFrame('TRCK', metadata.trackNumber);
  }

  if (metadata.albumTitle) {
    writer.setFrame('TALB', metadata.albumTitle);
  }

  if (metadata.artwork) {
    writer.setFrame('APIC', {
      type: 18,
      data: metadata.artwork,
      description: 'Artwork',
    });
  }

  return writer.addTag();
}
