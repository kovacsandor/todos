import { PersonAdd } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useFormikContext } from 'formik';
import { SignUp } from 'todos-shared';

type Props = {
  readonly isLoading: boolean;
};

export function SubmitButton({ isLoading }: Props): JSX.Element {
  const { errors, setTouched, touched } = useFormikContext<SignUp['requestBody']>();

  const onButtonClicked = () => {
    setTouched({
      email: true,
      name: true,
      password: true,
      passwordConfirmation: true,
    });
  };

  return (
    <LoadingButton
      disabled={
        (!!errors.email && touched.email) ||
        (!!errors.name && touched.name) ||
        (!!errors.password && touched.password) ||
        (!!errors.passwordConfirmation && touched.passwordConfirmation)
      }
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
