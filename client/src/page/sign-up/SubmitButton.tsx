import { PersonAdd } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useFormikContext } from 'formik';
import { SignUp } from 'todos-shared';

type Props = {
  readonly isLoading: boolean;
};

export function SubmitButton({ isLoading }: Props): JSX.Element {
  const { errors, setTouched, ...rest } = useFormikContext<SignUp['requestBody']>();

  const onButtonClicked = () => {
    setTouched({
      email: true,
      name: true,
      password: true,
      passwordConfirmation: true,
    });
  };
  console.log('errors', errors, rest);

  return (
    <LoadingButton
      disabled={!!errors.email || !!errors.name || !!errors.password || !!errors.passwordConfirmation}
      loading={isLoading}
      type='submit'
      variant='contained'
      onClick={onButtonClicked}
      endIcon={<PersonAdd />}
    >
      Sign up
    </LoadingButton>
  );
}
