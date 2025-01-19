import toast from "react-hot-toast";
import apiInstance from "./axios";

export const getAllTasks = async () => {
    try {
        const data = await apiInstance.get("/tasks");
        toast.success("Tasks fetched successfully");
        return data?.data;
    } catch (error) {
        console.log(error);
    }
};

export const addTsk = async (task) => {
    try {
        const data = await apiInstance.post("/tasks/add", task);
        toast.success("Tasks Added successfully");
        return data?.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateTsk = async (id,task) => {
    try {
        const data = await apiInstance.put(`/tasks/update/${id}`, task);
        toast.success("Tasks Updated successfully");
        return data?.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteTsk = async (id) => {
    try {
        const data = await apiInstance.delete(`/tasks/delete/${id}`);
        toast.success("Tasks Deleted successfully");
        return data?.data;
    } catch (error) {
        console.log(error);
    }
};