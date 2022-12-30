export const createUrl = (path: string): string => {
  return `${process.env.REACT_APP_ORIGIN}${path}`;
};
