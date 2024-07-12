import { useEffect, useState } from "react";
import "./App.css";
import { BiTrash, BiPencil } from "react-icons/bi";

function App() {
  const [taskCompleted, setTaskCompleted] = useState(0);
  const [totalTask, setTotalTask] = useState(0);
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleTaskChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleSave = () => {
    if (taskName.trim() !== "") {
      if (isEdit) {
        const updatedTasks = [...tasks];
        updatedTasks[currentIndex] = {
          name: taskName,
          completed: false,
        };
        setTasks(updatedTasks);
        setTaskName("");
        setIsEdit(false);
      } else {
        setTasks([...tasks, { name: taskName, completed: false }]);
        setTaskName("");
        setTotalTask(totalTask + 1);
      }
    }
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);

    if (updatedTasks[index].completed) {
      setTaskCompleted(taskCompleted + 1);
    } else {
      setTaskCompleted(taskCompleted - 1);
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setTotalTask(totalTask - 1);
    if (tasks[index].completed) {
      setTaskCompleted(taskCompleted - 1);
    }
  };
  const handleEditTask = (index) => {
    const task = tasks[index];
    setTaskName(task.name);
    setIsEdit(true);
    setCurrentIndex(index);
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-black">
      <div className="flex flex-col gap-5 p-4 border border-white rounded-lg">
        <div className="flex justify-between px-5 py-2 border border-white rounded-lg">
          <div className="mx-2 text-white py-4">
            <p className="text-2xl">Task Done</p>
            <p className="text-md ml-1">Keep It Up</p>
          </div>
          <div className="ml-5 p-7 bg-green-800 rounded-full text-white text-[24px]">
            {taskCompleted}/{totalTask}
          </div>
        </div>
        <div className="flex">
          <input
            type="text"
            onChange={handleTaskChange}
            value={taskName}
            className="px-2 w-full text-[14px] bg-gray-500 text-white"
            placeholder="Enter the Task"
          />
          <button
            type="button"
            className="bg-green-800 ml-2 h-full rounded-sm text-xl px-3 py-1 text-white"
            onClick={handleSave}
          >
            {isEdit ? <BiPencil /> : <p>+</p>}
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {tasks.map((item, index) => (
            <div
              className="border border-white flex justify-between p-2"
              key={index}
            >
              <div
                className={`rounded-full border border-white px-3 py-1 cursor-pointer ${
                  item.completed ? "line-through" : ""
                }`}
                onClick={() => handleCompleteTask(index)}
              ></div>
              <p
                className={`text-white ${item.completed ? "line-through" : ""}`}
              >
                {item.name}
              </p>
              <div className="flex gap-2">
                <div
                  className="mt-1 cursor-pointer"
                  onClick={() => handleDeleteTask(index)}
                >
                  <BiTrash color="white" />
                </div>
                <div
                  className="mt-1 cursor-pointer"
                  onClick={() => handleEditTask(index)}
                >
                  <BiPencil color="white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
