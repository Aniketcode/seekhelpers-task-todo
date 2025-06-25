import React from "react";
import { Check, Edit3, Trash2, X } from "lucide-react";
const TableC = ({ todoList, handleTaskDelete, handleToggleCompleted }) => {
  if (!todoList || todoList.length === 0) {
    return (
      <div className="flex items-center justify-center text-center min-h-screen">
        <p className="text-gray-300 text-lg">No todo available. Add here..</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-4">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        <div className="py-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <div className="max-h-[500px] overflow-y-auto">
                <table className="min-w-full">
                  <thead className="sticky top-0 bg-slate-800/90 backdrop-blur-sm">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider border-b border-gray-600">
                        Task Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider border-b border-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-600/50">
                    {todoList?.map((item) => (
                      <tr
                        key={item?._id}
                        className={`group hover:bg-white/5 transition-all duration-200 ${
                          item.completed ? "opacity-75" : ""
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-1">
                              <p
                                className={`text-md  font-bold transition-all duration-200 ${
                                  item?.completed
                                    ? "text-gray-400 line-through"
                                    : "text-white group-hover:text-blue-300"
                                }`}
                              >
                                {item?.title}
                              </p>
                            </div>
                          </div>
                        </td>
                       
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleToggleCompleted(item?._id, item?.completed)
                              }
                              className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 transform cursor-pointer ${
                                item?.completed
                                  ? "bg-orange-500/20 hover:bg-orange-500/30 text-orange-400"
                                  : "bg-green-500/20 hover:bg-green-500/30 text-green-400"
                              }`}
                              title={
                                item?.completed
                                  ? "Mark as pending"
                                  : "Mark as completed"
                              }
                            >
                              <Edit3 size={16} />
                            </button>

                            <button
                              onClick={() => handleTaskDelete(item?._id)}
                              className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 cursor-pointer transition-all duration-200 hover:scale-110 transform"
                              title="Delete task"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {todoList.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-400 text-lg">No tasks found</p>
                <p className="text-gray-500 text-sm">
                  Add some tasks to get started!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableC;
