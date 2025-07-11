# ♿️ Accessible React To-Do App

An advanced and inclusive task management application built using **React**, featuring **drag-and-drop**, **sorting**, **due dates**, and **accessibility support** for all users — including keyboard-only and screen reader users.

---

## 🚀 Features

✅ Add, edit, delete tasks  
✅ Assign **tags** (Urgent / Important / Optional)  
✅ Set **due dates**  
✅ Automatically highlights **overdue tasks**  
✅ Sort tasks by:
- Urgency
- Importance
- Due date

✅ Move tasks across columns: `To Do → Doing → Done`  
✅ Responsive **FAB (Floating Action Button)**  
✅ Real-time sync via **localStorage**

---

## 🧑‍🦽 Accessibility Highlights

This app is built to be **fully accessible** for users with:

### ✅ Keyboard-only navigation:
- All inputs, buttons, and drag items are focusable
- Drag-and-drop with `Space + Arrow Keys + Space`

### ✅ Screen reader support:
- `aria-label`s for buttons, tags, inputs
- `role="main"`, `role="region"` for navigation

### ✅ Color-blind friendly:
- Emoji + text indicators for urgency (`⏰`, `⭐`, `📝`)
- `⚠️ Overdue` warning with bold styling
- Drag-drop areas show visible outlines

### ✅ Focus styles:
- `:focus-visible` added for all elements
- Large tap targets and high-contrast design

---

## 🧱 Tech Stack

- React (Vite)
- `@hello-pangea/dnd` for drag and drop
- LocalStorage for persistence
- HTML5 + CSS3
- Custom icons / Material Icons (optional)

---

## 🛠️ Installation

```bash
git clone https://github.com/your-username/accessible-react-todo.git
cd accessible-react-todo
npm install
npm run dev


📢 Keyboard Shortcuts (Drag & Drop)

Tab – Focus on a task

Spacebar – Pick up task

Arrow keys – Move task

Spacebar – Drop task


Link to access: https://dlytasktracker.netlify.app/