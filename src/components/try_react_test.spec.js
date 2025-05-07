import React from 'react';

// enzyme больше не поддерживается. нужно использовать react-testing-library
// https://habr.com/ru/companies/ruvds/articles/353076/
describe('Try react-testing-library', () => {
  test('individual test', () => {
    expect(1).toBe(1);
    expect("value").toEqual("value");
    expect(true).toBeTruthy();
  });

  test('array contains item', () => {
    const array = ["item1", "item2"]
    const item = "item1";

    expect(array).toContain(item);
  });
});
