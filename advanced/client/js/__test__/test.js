import * as Views from '../views';

test('HTMLエスケープのテスト', () => {
  const arg = '<script>alert("XSS");</script>';
  ans = Views.myEscape(arg);
  console.log(ans);
});
