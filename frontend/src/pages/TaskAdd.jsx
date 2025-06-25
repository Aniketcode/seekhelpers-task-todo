import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateTaskMutation } from "../redux/taskApi";

const TaskAdd = ({ refetchTasks }) => {
  const navigate = useNavigate();
  const [createTask] = useCreateTaskMutation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createTask({ ...data, completed: false }).unwrap();
      reset();
      toast.success(response.message || "Task created successfully!");
      navigate("/");
    } catch (error) {
      const errorMessage = error?.data?.message || "Oops! Failed to add task.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-md mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transform transition-all duration-300 hover:scale-105">
          <div className="relative text-center mb-8">
            <h2 className="text-3xl font-bold text-white bg-clip-text !mb-5">
              Add New Task
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative space-y-6"
          >
            <div className="mb-10">
              <label className="block text-md text-white !mb-2">
                Task Title
              </label>
              <input
                type="text"
                {...register("title", { required: "Title is required.." })}
                placeholder="Enter todo title.."
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md"
              />
              {errors.title && (
                <div className="text-red-500 mt-1">{errors.title.message}</div>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md !mt-5 cursor-pointer"
            >
              {isSubmitting ? "Submitting task please wait...." : "Submit"}
            </button>
            <Link to="/">
              <button
                type="button"
                className="w-full text-white !mt-5 cursor-pointer"
              >
                Go Back
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskAdd;
