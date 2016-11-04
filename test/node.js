require('babel-register')({
  presets: ['es2015'],
  plugins: [
    'transform-class-properties'
  ]
});

require('./D');
require('./Alphabet');
require('./Arr');
require('./Dat');
require('./Func');
require('./Num');
require('./Promise');
require('./Str');
require('./Super');
require('./Switcher');
