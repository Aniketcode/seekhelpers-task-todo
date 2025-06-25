import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import NotFound from "./components/NotFound.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import TaskLists from "./pages/TaskLists.jsx";
import TaskAdd from "./pages/TaskAdd.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="*" element={<NotFound />} />
      <Route index={true} element={<TaskLists />} />
      <Route path="/task-add" element={<TaskAdd />} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
