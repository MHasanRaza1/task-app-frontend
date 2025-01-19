import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './reducer/taskSlice';

const store = configureStore({
    reducer:{
        taskManagement: taskReducer,
    }
});

export default store;