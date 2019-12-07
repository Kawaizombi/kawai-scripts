import { JSZipGeneratorOptions } from 'jszip';
import JSZip from 'jszip';
import { FileEntry } from './index';

interface Message {
  data: {
    entries: FileEntry[];
    options?: JSZipGeneratorOptions;
  };
}

module.exports = function(self: Worker) {
  self.addEventListener('message', async ({ data: { entries, options } }: Message) => {
    const archive = entries.reduce((accumulator, { file, name }) => {
      accumulator.file(name, file);

      return accumulator;
    }, new JSZip());

    const zip = await archive.generateAsync({ ...options, type: 'arraybuffer' });

    self.postMessage(zip, [zip]);
  });
};
