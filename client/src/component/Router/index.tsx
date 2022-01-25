import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageCompleted } from 'src/component/PageCompleted';
import { PageMyTasks } from 'src/component/PageMyTasks';
import { PageNotFound } from 'src/component/PageNotFound';
import { PageTaskEdit } from 'src/component/PageTaskEdit';
import { PageTaskNew } from 'src/component/PageTaskNew';
import { Redirect } from 'src/component/Router/Redirect';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Redirect redirectFrom={'/'} redirectTo={'todos/my-tasks'} />
          }
        >
          <Route path="todos">
            <Route path="my-tasks" element={<PageMyTasks />} />
            <Route path="completed" element={<PageCompleted />} />
            <Route index element={<PageNotFound />} />
          </Route>
          <Route path="todo">
            <Route path="new" element={<PageTaskNew />} />
            <Route path="edit">
              <Route path=":id" element={<PageTaskEdit />} />
              <Route index element={<PageNotFound />} />
            </Route>
            <Route index element={<PageNotFound />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
