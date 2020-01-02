import {resolve, dirname} from 'path';
import webpack from 'webpack';
import Loader = webpack.loader.Loader;
import { Parser } from 'acorn';
import dynamicImport from 'acorn-dynamic-import';
import { walk } from 'estree-walker';
import {print} from 'recast';

const parser = Parser.extend(dynamicImport);

const loader: Loader = function loader(source) {
  const loaderCtx = this;
  const ast = parser.parse(source.toString(), { sourceType: 'module' });
  const newAst = walk(ast as any, {
    enter(node) {
      if(node.type === 'CallExpression' && (node.callee.type as any) === 'Import') {
        const path = (node.arguments[0] as any).value;
        const provider: any = parser.parse(`GM_getResourceURL('${ path }')`);
        node.arguments[0] = provider.body[0].expression;
        console.log(resolve(dirname(loaderCtx.resourcePath), path));
        loaderCtx.addContextDependency( path);

        this.replace(node);
      }
    }
  });
  console.log(source);
  return print(newAst).code;
};

export default loader;
