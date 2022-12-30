export type EnvironmentVariables = { readonly [K in keyof typeof process.env]: string };
