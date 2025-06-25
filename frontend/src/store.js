import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './redux/taskSlice.js';
import { taskApi} from './redux/taskApi.js';

const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
       .concat(taskApi.middleware),
  devTools: true,
});

export default store