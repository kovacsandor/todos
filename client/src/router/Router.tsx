import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Completed, MyTasks, NotFound, TaskEdit, TaskNew } from 'src/page';
import { Redirect } from 'src/router/Redirect';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Redirect redirectFrom={'/'} redirectTo={'/todos/my-tasks'} />}>
          <Route path='todos'>
            <Route path='my-tasks' element={<MyTasks />} />
            <Route path='completed' element={<Completed />} />
            <Route index element={<NotFound />} />
          </Route>
          <Route path='todo'>
            <Route path='new' element={<TaskNew />} />
            <Route path='edit'>
              <Route path=':id' element={<TaskEdit />} />
              <Route index element={<NotFound />} />
            </Route>
            <Route index element={<NotFound />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
