import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask, deleteTask, getTasks } from "../store/reducer/taskSlice";
import { addTsk, deleteTsk, getAllTasks, updateTsk } from "../apiInstance/api";

const TaskManagement = () => {
    const dispatch = useDispatch();
    const taskList = useSelector((state) => state?.taskManagement?.tasks); // Get tasks from Redux
    const [tasks, setTasks] = useState({
        taskName: "",
        due_date: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTasks({
            ...tasks,
            [name]: value,
        });
    };

    // Fetch Tasks from API and store in Redux
    const fetchTasks = async () => {
        const tasksFromApi = await getAllTasks(); // Fetch tasks from the API
        dispatch(getTasks(tasksFromApi)); // Dispatch tasks to Redux
    };

    // Add Task
    const handleAddTask = async () => {
        if (tasks.taskName && tasks.due_date) {
            const newTask = {
                taskName: tasks.taskName,
                due_date: tasks.due_date,
            };
            const addedTask = await addTsk(newTask); // Add task to the API
            dispatch(addTask(addedTask)); // Dispatch add action to Redux
            setTasks({ taskName: "", due_date: "" }); // Clear input fields
        }
    };

    // Edit Task
    const handleEditTask = (task) => {
        setTasks({ taskName: task.taskName, due_date: task.due_date });
        setEditingTaskId(task._id); // Store the ID of the task being edited
        setIsEditing(true);
    };

    // Save Edited Task
    const handleSaveTask = async () => {
        if (tasks.taskName && tasks.due_date) {
            const updatedTask = {
                _id: editingTaskId, // Include the task ID for the update
                taskName: tasks.taskName,
                due_date: tasks.due_date,
            };
            await updateTsk(updatedTask._id, updatedTask); // Update task in the API
            dispatch(editTask(updatedTask)); // Dispatch edit action to Redux
            setTasks({ taskName: "", due_date: "" }); // Clear input fields
            setIsEditing(false);
            setEditingTaskId(null);
        }
    };

    // Delete Task
    const handleDeleteTask = async (id) => {
        await deleteTsk(id); // Delete task from the API
        dispatch(deleteTask(id)); // Dispatch delete action to Redux
    };

    // Fetch tasks when the component mounts
    useEffect(() => {
        fetchTasks();
    }, [dispatch]);

    return (
        <div className="bg-gray-500 min-h-screen flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Task Management</h1>

                {/* Input Fields */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        name="taskName"
                        value={tasks.taskName}
                        onChange={handleChange}
                        placeholder="Enter Task Name"
                        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                    />
                    <input
                        type="date"
                        name="due_date"
                        value={tasks.due_date}
                        onChange={handleChange}
                        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                    />
                    {isEditing ? (
                        <button
                            onClick={handleSaveTask}
                            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 shadow-md"
                        >
                            Save Task
                        </button>
                    ) : (
                        <button
                            onClick={handleAddTask}
                            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-md"
                        >
                            Add Task
                        </button>
                    )}
                </div>

                {/* Tasks Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead className="bg-blue-100 text-blue-600">
                            <tr>
                                <th className="px-4 py-2 border border-gray-300 text-left">#</th>
                                <th className="px-4 py-2 border border-gray-300 text-left">Task Name</th>
                                <th className="px-4 py-2 border border-gray-300 text-left">Due Date</th>
                                <th className="px-4 py-2 border border-gray-300 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taskList?.length > 0 ? (
                                taskList.map((task, index) => (
                                    <tr
                                        key={task._id}
                                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                                    >
                                        <td className="px-4 py-2 border border-gray-300 text-left">{index + 1}</td>
                                        <td className="px-4 py-2 border border-gray-300 text-left">{task.taskName}</td>
                                        <td className="px-4 py-2 border border-gray-300 text-left">{task.due_date}</td>
                                        <td className="px-4 py-2 border border-gray-300 text-center space-x-4">
                                            <button
                                                onClick={() => handleEditTask(task)}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTask(task._id)}
                                                className="text-red-500 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center text-gray-500 px-4 py-2 border border-gray-300"
                                    >
                                        No tasks added yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TaskManagement;
