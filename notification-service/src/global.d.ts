declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly REACT_APP_ORIGIN: string;
      readonly SENDGRID_API_KEY: string;
      readonly SENDGRID_FROM: string;
    }
  }
}

export {};
