import React, { useState, useEffect } from "react";

import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [sortType, setSortType] = useState("none");
useEffect(() => {
  const today = new Date();
  const overdueTasks = tasks.filter(
    (task) =>
      task.dueDate &&
      new Date(task.dueDate) < today &&
      task.status !== "done"
  );

  if (
    overdueTasks.length > 0 &&
    !sessionStorage.getItem("overdueNotificationShown")
  ) {
    // Ask for browser permission
    if (Notification.permission === "granted") {
      new Notification("⏰ Overdue Task Reminder", {
        body: `You have ${overdueTasks.length} overdue task(s)!`,
      });
      sessionStorage.setItem("overdueNotificationShown", "true");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("⏰ Overdue Task Reminder", {
            body: `You have ${overdueTasks.length} overdue task(s)!`,
          });
          sessionStorage.setItem("overdueNotificationShown", "true");
        }
      });
    }
  }
}, [tasks]);


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  const handleEditTask = (index, updatedData) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, ...updatedData } : task
    );
    setTasks(newTasks);
  };
    const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(source.index, 1);

    // Update status if moved between columns
    if (destination.droppableId !== source.droppableId) {
      movedTask.status = destination.droppableId;
    }

    updatedTasks.splice(destination.index, 0, movedTask);
    setTasks(updatedTasks);
  };
  const getSortedTasks = () => {
    const sorted = [...tasks];

    if (sortType === "duedate") {
      sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortType === "urgent") {
      sorted.sort((a, b) =>
        (b.tags?.includes("Urgent") ? 1 : 0) - (a.tags?.includes("Urgent") ? 1 : 0)
      );
    } else if (sortType === "important") {
      sorted.sort((a, b) =>
        (b.tags?.includes("Important") ? 1 : 0) - (a.tags?.includes("Important") ? 1 : 0)
      );
    } else if (sortType === "optional") {
      sorted.sort((a, b) =>
        (b.tags?.includes("optional") ? 1 : 0) - (a.tags?.includes("optional") ? 1 : 0)
      );
    }

    return sorted;
  };

  return (
    <div className="app" role="application">
      <TaskForm setTasks={setTasks} />

      <div className="sort_controls">
        <label htmlFor="sort">Sort By: </label>
        <select
          id="sort"
          aria-label="Sort tasks by tag or due date"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="none">None</option>
          <option value="urgent">Urgent First</option>
          <option value="important">Important First</option>
          <option value="optional">Optional First</option>
          <option value="duedate">Due Date</option>
        </select>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
      <main className="app_main" role="main">
        {["todo", "doing", "done"].map((status) => (
        <TaskColumn
          key={status}
          title={status==="todo" ? "To Do" : status === "doing" ? "Doing" : "Done"}
          icon={status==="todo" ? todoIcon : status === "doing" ? doingIcon : doneIcon}
          tasks={getSortedTasks()}
          status={status}
          handleDelete={handleDelete}
          handleEdit={handleEditTask}
        />
        ))}
      </main>
      </DragDropContext>
    </div>
  );
};

export default App;
