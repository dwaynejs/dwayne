beforeEach(function () {
  console.log(
    'starting "%c%s%c"',
    'color: blue; font-weight: 900; font-size: 14px;',
    this.currentTest.title,
    'color: initial; font-weight: initial; font-size: 12px;'
  );
});
afterEach(function () {
  const {
    err,
    title
  } = this.currentTest;

  if (err) {
    console.error('%s %o', 'Error happened:', err);
  }

  console.log(
    'finishing "%c%s%c"',
    'color: orange; font-weight: 900; font-size: 14px;',
    title,
    'color: initial; font-weight: initial; font-size: 12px;'
  );
});
