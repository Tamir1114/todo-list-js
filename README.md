# Todo List

A simple interactive Todo List web application built with HTML, CSS, and JavaScript.
No frameworks or libraries were used — just plain vanilla JavaScript.

---

## About

This project was created as an individual assignment to practice core web development concepts
including DOM manipulation, event handling, and browser storage.
Tasks are saved permanently in the browser so they remain after a page refresh.

---

## Features

- Add a task by typing and clicking Add or pressing Enter
- Mark a task as complete by clicking the checkbox (adds strikethrough)
- Edit any task inline and save with Enter or the Save button
- Delete individual tasks
- Filter tasks by All, Active, or Done
- Clear all completed tasks at once
- Task count displayed at the top (total, done, remaining)
- Data saved permanently using localStorage — survives page refresh

---

## JavaScript Concepts Used

- DOM Manipulation: document.querySelector(), .innerHTML, element.replaceWith()
- Event handling: onclick attribute, onkeydown event, keyboard key detection
- localStorage: localStorage.setItem(), localStorage.getItem()
- JSON: JSON.stringify() to save data, JSON.parse() to load data
- classList: adding and removing CSS classes to change appearance
- Array methods: .filter(), .push(), for loops for managing todo data

---

## File Structure

```
todo-list-js/
  index.html   - Page structure and layout
  style.css    - Styling and visual design
  script.js    - All JavaScript logic
  README.md    - Project description
```

---

## How to Run

Download or clone the repository, then open index.html in a browser.
No installation or setup required.
