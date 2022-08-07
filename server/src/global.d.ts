declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly CLIENT_ORIGIN?: string;
      readonly JWT_SECRET?: string;
      readonly PORT?: string;
    }
  }
}

export {};
