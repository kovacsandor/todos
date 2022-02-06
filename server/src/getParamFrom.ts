export const getParamFrom = (from: string): number => {
  const result = Number(from);

  if (typeof result === 'number' && !Number.isNaN(result)) {
    return result;
  }

  throw new Error('Invalid case');
};
