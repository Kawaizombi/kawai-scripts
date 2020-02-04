### Archive

Wrapper to run UZIP inside webworker

### Usage

```javascript
import archive from "@kawai-scripts/archive";

const files = [
  { name: 'test1.bin', file: new ArrayBuffer(100) },
  { name: 'test2.bin', file: new ArrayBuffer(100) },
];

archive(
  files
).then((zip) => {
  // Do something with zip
})
```
