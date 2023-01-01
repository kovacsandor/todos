import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CompletedTasks, CreateTaskPage, LoginPage, MyTasks, NotFound, SignUpPage, TaskEdit } from 'src/page';
import { Redirect } from 'src/router/Redirect';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Redirect redirectFrom={'/'} redirectTo={'/todos/my-tasks'} />}>
          <Route path='todos'>
            <Route path='my-tasks' element={<MyTasks />} />
            <Route path='completed' element={<CompletedTasks />} />
            <Route index element={<NotFound />} />
          </Route>
          <Route path='todo'>
            <Route path='new' element={<CreateTaskPage />} />
            <Route path='edit'>
              <Route path=':id' element={<TaskEdit />} />
              <Route index element={<NotFound />} />
            </Route>
            <Route index element={<NotFound />} />
          </Route>
        </Route>
        <Route path='login' element={<LoginPage />} />
        <Route path='sign-up' element={<SignUpPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
