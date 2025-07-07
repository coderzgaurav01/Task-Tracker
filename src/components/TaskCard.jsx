import React from "react";

import "./TaskCard.css";
import Tag from "./Tag";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit.jpeg";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
const TaskCard = ({ title, tags,dueDate,status ,handleDelete, index ,handleEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedTags, setEditedTags] = useState(tags);
    const [editedDueDate, setEditedDueDate] = useState(dueDate);
    const toggleTag = (tag) => {
        if (editedTags.includes(tag)) {
           setEditedTags(editedTags.filter((t) => t !== tag));
        } else {
          setEditedTags([...editedTags, tag]);
        }
    };

    const saveEdit = () => {
        handleEdit(index, {
          task: editedTitle,
          tags: editedTags,
          dueDate: editedDueDate,
        });
    setIsEditing(false);
  };
    return ( 
        <Draggable draggableId={`${title}-${index}`} index={index}>
          {(provided) => (
            <article className="task_card" aria-label={`Task: ${title}`} role="article" 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <>
                <label htmlFor={`editTitle-${index}`} className="visually-hidden">
                    Edit task title
                </label>
              <input
                id={`editTitle-${index}`}
                className="task_input"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
                <label htmlFor={`editDueDate-${index}`} className="visually-hidden">
                    Edit due date
                </label>
              <input
                type="date"
                id={`editDueDate-${index}`}
                value={editedDueDate}
                onChange={(e) => setEditedDueDate(e.target.value)}
                className="task_due_date"
            />

              <div className="task_card_tags">
                {["Urgent", "Important", "optional"].map((tag) => (
                  <Tag
                    key={tag}
                    tagName={tag}
                    selected={editedTags.includes(tag)}
                    selectTag={() => toggleTag(tag)}
                  />
                ))}
              </div>
              <div className="task_card_bottom_line">
                <button onClick={saveEdit} className="task_submit" aria-label="Save task changes">Save</button>
                <button onClick={() => setIsEditing(false)} className="task_submit" aria-label="Cancel editing task">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p className="task_text">{title}</p>
              {dueDate && (
                  <p
                        className={`task_due_date_display ${
                            status !== "done" && new Date(dueDate) < new Date() ? "overdue" : ""
                        }`}
                    >
                         Due: {dueDate}
                    </p>
              )}
              <div className="task_card_bottom_line">
                <div className="task_card_tags">
                  {tags.map((tag, index) => (
                    <Tag key={index} tagName={tag} selected />
                  ))}
                </div>
                <div className="task_actions">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="icon_button"
                    aria-label={`Edit task: ${title}`}
                  >
                  <img
                    src={editIcon}
                    className="edit_icon"
                    alt="Edit"
                    onClick={() => setIsEditing(true)}
                  />
                  </button>
                  <img
                    src={deleteIcon}
                    className="delete_icon"
                    alt="Delete"
                    onClick={() => handleDelete(index)}
                  />
                </div>
              </div>
            </>
          )}
        </article>
          )}
        </Draggable>
    );
};

export default TaskCard;
