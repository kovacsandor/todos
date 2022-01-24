import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Redirect } from 'src/component/Redirect';

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
            <Route path="my-tasks" element={'My tasks'} />
            <Route path="completed" element={'Completed'} />
          </Route>
          <Route path="todo">
            <Route path="new" element={'Add new task'} />
            <Route path="edit">
              <Route path=":id" element={'Edit task'} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
