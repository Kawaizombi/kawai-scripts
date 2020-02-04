import work from 'webworkify-webpack';

export interface FileEntry {
  file: ArrayBuffer;
  name: string;
}

interface WorkifyWorker extends Worker {
  objectURL: string;
}

interface Message {
  data: ArrayBuffer;
}


function archive(entries: FileEntry[]) {
  return new Promise<Blob>((resolve) => {
    const worker: WorkifyWorker = work(require.resolve('./worker.ts'));
    const transfer = entries.map(({ file }) => file);

    worker.addEventListener('message', ({ data }: Message) => {
      resolve(new Blob([data], { type: 'application/zip' }));

      worker.terminate();
      URL.revokeObjectURL(worker.objectURL);
    });

    worker.postMessage({ entries }, transfer);
  });
}

export default archive;
