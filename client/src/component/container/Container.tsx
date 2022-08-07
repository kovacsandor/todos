import MuiContainer from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

interface IProps {
  readonly children: ReactNode;
}

export function Container({ children }: IProps) {
  return (
    <MuiContainer>
      <Stack my={3} spacing={1}>
        {children}
      </Stack>
    </MuiContainer>
  );
}
