import React, { useState } from "react";

import "./TaskForm.css";
import Tag from "./Tag";

const TaskForm = ({ setTasks }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    status: "todo",
    tags: [],
    dueDate: "",
  });

  

  const checkTag = (tag) => {
    return taskData.tags.some((item) => item === tag);
  };

  const selectTag = (tag) => {
    if (taskData.tags.some((item) => item === tag)) {
      const filterTags = taskData.tags.filter((item) => item !== tag);
      setTaskData((prev) => {
        return { ...prev, tags: filterTags };
      });
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] };
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(taskData);
    setTasks((prev) => {
      return [...prev, taskData];
    });
    setTaskData({
      task: "",
      status: "todo",
      tags: [],
      dueDate: "",
    });
  };
  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <div className="task_inputs_group">
          <label htmlFor="taskInput" className="visually-hidden">Task Title</label>
          <input
          id="taskInput"
            type="text"
            name="task"
            value={taskData.task}
            className="task_input"
            placeholder="Enter your task"
            onChange={handleChange}
            required
            aria-required="true"
          />
          <label htmlFor="dueDate" className="visually-hidden">Due Date</label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            className="task_due_date"
          />
        </div>

        <div className="task_form_bottom_line">
          <fieldset>
            <legend className="visually-hidden">Select Tags</legend>
          <div>
            <Tag
              tagName="Urgent"
              selectTag={selectTag}
              selected={checkTag("Urgent")}
            />
            <Tag
              tagName="Important"
              selectTag={selectTag}
              selected={checkTag("Important")}
            />
            <Tag
              tagName="optional"
              selectTag={selectTag}
              selected={checkTag("optional")}
            />
          
          </div>
        </fieldset>

          <div>
            <label htmlFor="status" className="visually-hidden">
              Task Status
            </label>
            <select
              id="status"
              name="status"
              value={taskData.status}
              className="task_status"
              onChange={handleChange}
              aria-label="Task Status"
            >
              <option value="todo">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <button type="submit" className="task_submit" aria-label="Add Task to board">
              + Add Task
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
