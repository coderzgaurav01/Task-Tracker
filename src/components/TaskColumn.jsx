import React from "react";
import Todo from "../assets/direct-hit.png";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./TaskColumn.css";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, icon, tasks, status, handleDelete ,handleEdit}) => {
    const filteredTasks = tasks.filter((task) => task.status === status);
    return (
        <section className='task_column' role='region' aria-label={`${title} tasks`}>
            <h2 className='task_column_heading'>
                <img className='task_column_icon' src={icon} alt={`${title} section icon`} aria-hidden="true"/> {title}
            </h2>

        <Droppable droppableId={status}>
            {(provided, snapshot) => (
                <div
                    className={`task_drop_zone ${
                    snapshot.isDraggingOver ? "dragging-over" : ""
                }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {filteredTasks.map((task, index) => (
              <TaskCard
                key={index}
                index={index}
                title={task.task}
                tags={task.tags}
                dueDate={task.dueDate}
                status={task.status}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
    );
};

export default TaskColumn;
