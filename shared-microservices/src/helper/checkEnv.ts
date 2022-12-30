export const checkEnv = (envKeys: { readonly [K in keyof typeof process.env]: boolean | undefined }): void => {
  const unsetEnvKeys: readonly string[] = Object.keys(envKeys).reduce(
    (acc: readonly string[], curr: string): readonly string[] => {
      if (!!envKeys[curr] && !process.env[curr]) {
        return [...acc, curr];
      }

      return acc;
    },
    [],
  );

  if (!!unsetEnvKeys.length) {
    throw new Error(`The following environment variables are not set: ${unsetEnvKeys.join(', ')}`);
  }
};
