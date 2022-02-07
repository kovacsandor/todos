import { PropsWithChildren } from 'react';

export interface IErrorBoundaryProps extends PropsWithChildren<{}> {
  readonly error: boolean;
  readonly message: string;
}
