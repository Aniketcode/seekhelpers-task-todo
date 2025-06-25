import React, { useState } from "react";
import {
  useGetAllTasksQuery,
  useDeleteTaskByIdMutation,
  useUpdateTaskMutation,
} from "../redux/taskApi";
import { CirclePlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import TaskAdd from "./TaskAdd";
import toast from "react-hot-toast";
import TableC from "../components/TableC";
import Loader from "../components/Loader";

const TaskLists = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useGetAllTasksQuery();
  const [deleteTask] = useDeleteTaskByIdMutation();
  const [updateCompleted] = useUpdateTaskMutation();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-2xl text-center mt-60">
        Failed to load tasks!
      </div>
    );
  }

  const handleTaskDelete = async (id) => {
    try {
      const response = await deleteTask(id);
      if (response?.data) {
        toast.success(response.data.message);
        refetch();
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Oops failed to delete task.";
      toast.error(errorMessage);
    }
  };

  const handleToggleCompleted = async (id, currentCompleted) => {
    try {
      const response = await updateCompleted({
        id,
        completed: !currentCompleted,
      });
      if (response?.data) {
        toast.success(response.data.message);
        refetch();
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Oops failed to mark as completed.";
      toast.error(errorMessage);
    }
  };
  return (
    <>
      <div className="py-6 flex items-center flex-col justify-center">
        <h1 className="text-xl font-bold text-center">Tasks App</h1>  
        {/* Task List */}
        <TableC
          todoList={data?.tasks || []}
          handleTaskDelete={handleTaskDelete}
          handleToggleCompleted={handleToggleCompleted}
        />
      </div>

      {/* Add Task Button */}
      <Link to="/task-add">
        <button
          className="fixed bottom-5 right-5 rounded-full w-16 h-16 flex items-center 
        justify-center bg-green-600 cursor-pointer text-white shadow-lg hover:bg-green-700 transition-transform transform"
        >
          <CirclePlus color="white" fontSize={45} />
        </button>
      </Link>
    </>
  );
};

export default TaskLists;
