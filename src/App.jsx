import React from 'react'
import TaskManagement from './components/TaskManagement'
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <Toaster />
      <TaskManagement/>
    </div>
  )
}

export default App