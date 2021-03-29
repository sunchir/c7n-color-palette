import colorPalette from '../index';

test('Color test', () => {
  expect(colorPalette('#3f51b5',3)).toBe('#b6bfdb');
});
