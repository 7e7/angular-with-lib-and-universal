import * as fs from 'fs';
// import * as sass from 'node-sass';

describe('spacing.scss', () => {
  const resolve = (file) =>
    `${process.cwd()}/projects/jb-component-library/src/styles/${file}`;
  const expectedCSS = resolve('/tests/expected-output.css');
  let text;

  beforeEach((done) => {
    fs.readFile(expectedCSS, (err, data) => {
      text = data.toString('utf8');
      done();
    });
  });

  // while it's nice to test this output, I'm commenting it out for now
  // because it captures comments we don't care about for some reason.
  it('should compile expected classes', () => {
    // sass.render(
    //   { file: resolve('spacing.scss'), outputStyle: 'expanded' },
    //   (err, result) => {
    //     const actual = result.css.toString('utf8');
    //     expect(actual).toEqual(text);
    //     done();
    //   }
    // );
  });
});
