export default function combineBuffers(buffers: ArrayBuffer[]): ArrayBuffer {
  let offset = 0;
  const size = buffers.reduce((sum, { byteLength }) => sum + byteLength, 0);

  return buffers.reduce((result: Uint8Array, buffer: ArrayBuffer) => {
    result.set(new Uint8Array(buffer), offset);
    offset += buffer.byteLength;

    return result
  }, new Uint8Array(size));
}
