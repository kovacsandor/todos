import { LoadingButton } from '@mui/lab';
import { Button, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { FormikValues } from 'src/page/create-task/FormikValues';

type Props = {
  readonly isLoading: boolean;
};

export function SubmitButton({ isLoading }: Props): JSX.Element {
  const { errors, setTouched, resetForm, touched } = useFormikContext<FormikValues>();

  const onResetClicked = () => {
    resetForm();
  };

  const onSubmitClicked = () => {
    setTouched({
      description: true,
      dueDate: true,
      summary: true,
      type: true,
    });
  };

  return (
    <Stack direction='row' spacing={2} justifyContent='flex-end'>
      <Button onClick={onResetClicked}>Reset</Button>
      <LoadingButton
        disabled={
          (!!errors.description && touched.description) ||
          (!!errors.dueDate && touched.dueDate) ||
          (!!errors.summary && touched.summary) ||
          (!!errors.type && touched.type)
        }
        loading={isLoading}
        onClick={onSubmitClicked}
        type='submit'
        variant='contained'
      >
        Create task
      </LoadingButton>
    </Stack>
  );
}
