import { Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import moment from 'moment';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageFrame, ProtectedResource, TaskListMessage } from 'src/component';
import { createTask } from 'src/page/create-task/createTask';
import { FieldDescription } from 'src/page/create-task/FieldDescription';
import { FieldDueDate } from 'src/page/create-task/FieldDueDate';
import { FieldSummary } from 'src/page/create-task/FieldSummary';
import { FieldType } from 'src/page/create-task/FieldType';
import { FormikValues } from 'src/page/create-task/FormikValues';
import { SubmitButton } from 'src/page/create-task/SubmitButton';
import { QueryKey } from 'src/type';
import { CreateTask, createTaskValidationSchema, getTimeBeforeTomorrow } from 'todos-shared';

export function CreateTaskPage(): JSX.Element {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, mutate, error, data, isError, isSuccess } = useMutation<
    CreateTask['response'],
    AxiosError<CreateTask['response'], CreateTask['requestBody']>,
    CreateTask['requestBody']
  >(createTask);

  useEffect(() => {
    if (isSuccess && data.type === 'Success') {
      queryClient.removeQueries([QueryKey.MyTasks]);
      navigate('/');
    }
  }, [data, isSuccess, navigate, queryClient]);

  const initialValues: FormikValues = {
    description: '',
    dueDate: getTimeBeforeTomorrow(),
    summary: '',
    type: 'private',
  };

  const onSubmit = ({ dueDate, ...rest }: FormikValues): void => {
    if (dueDate !== null) {
      mutate({
        ...rest,
        dueDate: moment(dueDate).toISOString(),
      });
    }
  };

  return (
    <ProtectedResource>
      <PageFrame title='Create task'>
        <Formik<FormikValues>
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={createTaskValidationSchema}
        >
          <Form>
            <Stack spacing={3}>
              <FieldSummary error={error} isLoading={isLoading} />
              <FieldType error={error} isLoading={isLoading} />
              <FieldDescription error={error} isLoading={isLoading} />
              <FieldDueDate error={error} isLoading={isLoading} />
              {isError && (
                <>
                  <Divider />
                  <TaskListMessage error text={error?.message || 'An error has occurred'} />
                  <Divider />
                </>
              )}
              <SubmitButton isLoading={isLoading} />
            </Stack>
          </Form>
        </Formik>
      </PageFrame>
    </ProtectedResource>
  );
}
