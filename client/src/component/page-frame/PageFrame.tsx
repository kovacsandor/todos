import Box from '@mui/material/Box';
import { Container } from 'src/component/container';
import { Footer } from 'src/component/page-frame/Footer';
import { Header } from 'src/component/page-frame/Header';
import { IPageProps } from 'src/component/page-frame/IPageProps';

export function PageFrame({ children, title }: IPageProps) {
  return (
    <>
      <Header title={title} />
      <Box sx={{ pb: 7 }}>
        <Container>{children}</Container>
      </Box>
      <Footer />
    </>
  );
}
