export const replaceParams = (url: string, params: Record<string, string>): string => {
  return Object.keys(params).reduce((acc: string, curr: string): string => {
    const searchValue: string = `:${curr}`;
    return acc.replace(searchValue, params[curr]);
  }, url);
};
