/// <reference types="react-scripts" />

declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        readonly FAST_REFRESH?: string;
        readonly NODE_ENV?: string;
        readonly PUBLIC_URL?: string;
        readonly REACT_APP_ORIGIN: string;
        readonly REACT_APP_WEBSITE_NAME: string;
        readonly WDS_SOCKET_HOST?: string;
        readonly WDS_SOCKET_PATH?: string;
        readonly WDS_SOCKET_PORT?: string;
      }
    }
  }
}
