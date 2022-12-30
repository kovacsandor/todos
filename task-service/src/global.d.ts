declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly JWT_SECRET: string;
    }
  }
}

export {};
