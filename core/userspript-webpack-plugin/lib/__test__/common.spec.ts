import webpack, { Compiler, OutputFileSystem } from 'webpack';
import webpackConfig from './__fixture__/webpack.config';
import MemoryFileSystem from 'memory-fs';

describe('UserScriptWebpackPlugin', () => {
  let compiler: Compiler;
  let fileSystem: MemoryFileSystem & OutputFileSystem;

  beforeEach(() => {
    fileSystem = new MemoryFileSystem();
  });

  beforeEach(() => {
    compiler = webpack(webpackConfig);
    compiler.outputFileSystem = fileSystem;
  });

  it('should ', (done) => {
    compiler.run((err, stats) => {
      const info = stats.toJson();

      const fileContents = fileSystem.readFileSync('/main.js');
      console.log(fileContents.toString());

      expect(info.errors).toHaveLength(0);
      done();
    })
  });
});
