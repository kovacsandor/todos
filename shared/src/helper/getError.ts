export const getError = async <T extends Error>(callback: () => Promise<any>): Promise<T> => {
  try {
    await callback();
  } catch (error) {
    return error;
  }
};
