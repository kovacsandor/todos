# todos

## Routes 
```
/todos/my-tasks
/todos/completed
/todo/new
/todo/edit/:id
```
## Endpoints 

```
GET     /api/todos/my-tasks/:from
            Response:
                - todos
                    - dueDate: number
                    - id: string
                    - summary: string
                    - status: string
                    - type: string
```
```
GET     /api/todos/completed/:from
            Response:
                - todos
                    - dueDate: number
                    - id: string
                    - summary: string
                    - status: string
                    - type: string
```
```
POST    /api/todos/new
            Request:
                - todo
                    - description: string
                    - dueDate: number
                    - summary: string
                    - type: string
            Response:
                - todo
                    - id: string
```
```            
GET     /api/todos/:id
            Response:
                - todo
                    - creationDate: number
                    - description: string
                    - dueDate: number
                    - id: string
                    - summary: string
                    - status: string
                    - type: string
```
```         
PUT     /api/todos/:id
            Request:
                - todo
                    - description: string
                    - dueDate: number
                    - summary: string
                    - status: string
                    - type: string
            Response:
                - todo
                    - id: string
```
```         
DELETE  /api/todos/:id
            Response:
                - todo
                    - creationDate: number
                    - description: string
                    - dueDate: number
                    - id: string
                    - summary: string
                    - status: string
                    - type: string
```

## Frontend skills

- routing (react-router)
- pagination
- component level state
- conditional rendering
- application level state (redux - optional)
- working with http requests (axios)
    - loading states
    - errors 
- forms (formik)
- validation (yup)
- hooks
- dates (moment)
- unit tests (@testing-library)
- layout (@mui)

## Strories

### All pages
- User can visit all pages through url
    - My tasks
    - Add new
    - Completed
    - Edit task
- User is taken to My tasks page by default
- User is taken to 404 page when visiting an invalid route
- User can see page title in the header
- User can navigate between pages through bottom navigation
    - My tasks
    - Add new
    - Completed
- User can see active page on bottom navigation

### My tasks and completed tasks pages
- User can see the first 10 tasks 
- User can see if there are no tasks
- User can see progress indicator when loading the tasks
- User can see if an error has occured while loading the tasks
- User can try loading tasks again if an error has occured
- User can see each task's summary
- User can see each task's type
- User can see each task's due date 
- User can see tasks grouped by month
- User can load the next 10 tasks
- User can see if tasks are loading
- User can see if there are no more tasks
- User can open task details
- User can open edit page
- User can delete task
- User can see progress indicator when saving a task
- User can see if an error has occured while saving a task

### My tasks page
- User can complete task

### Completed tasks
- User can reopen completed task
- User can see if a task is completed

### Task details dialog
- User can see summary of task
- User can see type of task
- User can see description of task
- User can see due date of task
- User can see creation date of task
- User can close dialog
- User can complete task
- User can reopen completed task
- User can open edit page
- User can delete task
- User can see progress indicator when loading the task
- User can see if an error has occured while loading the task
- User can try loading tasks again if an error has occured

### Edit task and Add new task pages
- User can see progress indicator when loading the task
- User can see if an error has occured while loading the task
- User can try loading tasks again if an error has occured
- User can edit summary of task
- User can edit type of task
- User can edit description of task
- User can edit due date of task
- User can't save if task is invalid
- User can see if the summary is invalid
- User can see if the due date is invalid
- User can save task
- User can see progress indicator when saving the task
- User can see if an error has occured while saving the task

### Edit task page
- User can save and complete open task
- User can save and reopen completed task
- User can cancel editing task

### Add new task page
- User can reset task fields to default
