import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/index.cjs.js',
      format: 'cjs',
    },
    {
      file: 'lib/index.esm.js',
      format: 'esm',
    },
  ],
  plugins: [
    babel({extensions, include: 'src' }),
    typescript({ declarationDir: 'lib' }),
    terser({ format: { comments: false }}),
  ],
  external: ['react'],
};
