import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const LOCAL_URL = 'http://localhost:5000';
const DEPLOYED_URL = 'https://seekhelpers-task-todo.onrender.com'
export const taskApi = createApi({
  reducerPath: 'taskapi',
  baseQuery: fetchBaseQuery({
    baseUrl: DEPLOYED_URL
  }),
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: () => ({
        url: `/api/tasks`,
        method: 'GET',
      })
    }),
    createTask: builder.mutation({
      query: (newTask) => ({
        url: `/api/tasks`,
        method: 'POST',
        body: newTask,
        headers: {
          'Content-type': 'application/json',
        },
      })
    }),
    updateTask: builder.mutation({
      query: ({ id,completed }) => ({
        url: `/api/tasks/${id}`,
        method: 'PUT',
        body: {completed},
        headers: {
          'Content-type': 'application/json',
        },
      })
    }),
    deleteTaskById: builder.mutation({
      query: (id) => ({
        url: `/api/tasks/${id}`,
        method: 'DELETE',
      })
    })
  })
})

export const {
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskByIdMutation } = taskApi;