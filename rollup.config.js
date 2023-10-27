const path = require('path');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('@rollup/plugin-node-resolve');
const typescript =  require('rollup-plugin-typescript2'); // 处理typescript

const pkg = require('./package.json');

const extensions = ['.js', '.ts'];

const resolve = function(...args) {
  return path.resolve(__dirname, ...args);
};

module.exports = {
  input: resolve('./src/index.ts'),
  output: [
    {
    file: resolve('./', pkg.main), // 为了项目的统一性，这里读取 package.json 中的配置项
    format: 'cjs',
    },
    {
      file: resolve('./', pkg.module), // 为了项目的统一性，这里读取 package.json 中的配置项
      format: 'es',
    }
  ],
  plugins: [
    nodeResolve({
      extensions,
      modulesOnly: true,
    }),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      // extensions,
    }),
  ],
};