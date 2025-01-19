import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
};
const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers:{
        addTask(state,{payload}){
            state.tasks.push(payload);
            state.tasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
        },
        getTasks(state,{payload}){
            if (!state.tasks) state.tasks = [];
            state.tasks = payload;
            state.tasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
        },
        editTask(state,{payload}){
            const index = state.tasks?.findIndex(task => task?._id === payload._id);
            state.tasks[index] = payload;
        },
        deleteTask(state,{payload}){
            state.tasks = state.tasks?.filter(task => task?._id !== payload);
        }
    }
});

export const {addTask,getTasks,editTask,deleteTask} = taskSlice.actions;
export default taskSlice.reducer;