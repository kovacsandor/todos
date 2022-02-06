import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Footer } from 'src/component/Page/Footer';
import { Header } from 'src/component/Page/Header';
import { IPageProps } from 'src/component/Page/IPageProps';

export function Page({ children, title }: IPageProps) {
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
