export const createUrl = (path: string): string => {
  return `${process.env.REACT_APP_BACKEND_API_URL}${path}`;
};
