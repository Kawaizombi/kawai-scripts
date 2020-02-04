import { FileEntry } from './index';
import UZIP from 'uzip';

interface Message {
  data: {
    entries: FileEntry[];
  };
}

module.exports = function(self: Worker) {
  self.addEventListener('message', async ({ data: { entries } }: Message) => {
    const archive = entries.reduce((accumulator, { file, name }) => {
      accumulator[name] = new Uint8Array(file);

      return accumulator;
    }, {});

    const zip = UZIP.encode(archive);

    self.postMessage(zip, [zip]);
  });
};
