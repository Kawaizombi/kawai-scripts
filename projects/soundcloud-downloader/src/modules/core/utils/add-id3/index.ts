import ID3Writer from 'browser-id3-writer';

export default function addId3(buffer: ArrayBuffer, metadata: any): ArrayBuffer {
  return new ID3Writer(buffer)
    .setFrame('TCON', metadata.genre.split(' & '))
    .setFrame('TIT2', metadata.title)
    .setFrame('TPE1', [metadata.user.username])
    .setFrame('APIC', {
      type: 18,
      data: metadata.artwork,
      description: 'Artwork',
    })
    .addTag();
}
