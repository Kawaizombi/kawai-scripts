### Archive

Wrapper to run [JSZip](https://stuk.github.io/jszip/) inside webworker

### Usage

```javascript
import archive from "@kawai-scripts/archive";

const files = [
  { name: 'test1.bin', file: new ArrayBuffer(100) },
  { name: 'test2.bin', file: new ArrayBuffer(100) },
];

archive(
  files,
  { compressionOptions: { level: 6 } },
).then((zip) => {
  // Do something with zip
})
```
