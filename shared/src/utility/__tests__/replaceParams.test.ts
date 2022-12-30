import { describe, expect, test } from '@jest/globals';
import { replaceParams } from 'src/utility/replaceParams';

describe('replaceParams', () => {
  const params = {
    paramOne: 'paramOneValue',
    paramTwo: 'paramTwoValue',
  };

  test('nothing to replace', () => {
    const url = 'https://todos-backend.com/api/nothing-to-replace';
    const replaced = replaceParams(url, params);
    expect(replaced).toBe(url);
  });

  test('one param to replace', () => {
    const url = 'https://todos-backend.com/api/one-param-to-replace/:paramOne';
    const replaced = replaceParams(url, params);
    expect(replaced).toBe('https://todos-backend.com/api/one-param-to-replace/paramOneValue');
  });

  test('more params to replace', () => {
    const url = 'https://todos-backend.com/api/more-params-to-replace/:paramOne/:paramTwo';
    const replaced = replaceParams(url, params);
    expect(replaced).toBe('https://todos-backend.com/api/more-params-to-replace/paramOneValue/paramTwoValue');
  });

  test('params is undefined', () => {
    const url = 'https://todos-backend.com/api/more-params-to-replace/:paramOne/:paramTwo';
    const replaced = replaceParams(url);
    expect(replaced).toBe(url);
  });
});
