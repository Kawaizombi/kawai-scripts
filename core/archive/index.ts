import work from 'webworkify-webpack';
import { JSZipGeneratorOptions } from 'jszip';

export interface FileEntry {
  file: ArrayBuffer;
  name: string;
}

interface WorkifyWorker extends Worker {
  objectURL: string,
}

interface Message {
  data: ArrayBuffer;
}

const DEFAULT_OPTIONS: JSZipGeneratorOptions = {
  compression: 'DEFLATE',
  compressionOptions: {
    level: 6,
  },
};

function archive(entries: FileEntry[], options?: JSZipGeneratorOptions) {
  return new Promise<Blob>((resolve) => {
    const worker: WorkifyWorker = work(require.resolve('./worker.ts'));
    const transfer = entries.map(({ file }) => file);

    worker.addEventListener('message', ({ data }: Message) => {
      resolve(new Blob([data], { type: 'application/zip' }));

      worker.terminate();
      URL.revokeObjectURL(worker.objectURL);
    });

    worker.postMessage({ entries, options: { ...DEFAULT_OPTIONS, ...options } }, transfer);
  });
}

export default archive;
