import { ReactNode } from 'react';

export interface PageProps {
  readonly children: ReactNode;
  readonly title: string;
}
