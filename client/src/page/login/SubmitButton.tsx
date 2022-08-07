import { LoadingButton } from '@mui/lab';
import { useFormikContext } from 'formik';
import { Login } from 'todos-shared';

type Props = {
  readonly isLoading: boolean;
};

export function SubmitButton({ isLoading }: Props): JSX.Element {
  const { errors, setTouched } = useFormikContext<Login['requestBody']>();

  const onButtonClicked = () => {
    setTouched({
      email: true,
      password: true,
    });
  };

  return (
    <LoadingButton
      disabled={!!errors.email || !!errors.password}
      loading={isLoading}
      type='submit'
      variant='contained'
      onClick={onButtonClicked}
    >
      Login
    </LoadingButton>
  );
}
