import { Header } from 'src/component/Page/Header';
import { PageProps } from 'src/component/Page/PageProps';

export function Page({ children, title }: PageProps) {
  return (
    <>
      <Header title={title} />
      {children}
    </>
  );
}
