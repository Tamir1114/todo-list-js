let todos = [];
let currentFilter = 'all';
let editingId = null;

function loadTodos() {
  const saved = localStorage.getItem('todos');
  todos = saved ? JSON.parse(saved) : [];
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
  const input = document.querySelector('#todo-input');
  const text = input.value.trim();

  if (!text) return input.focus();

  todos.push({
    id: Date.now(),
    text,
    done: false
  });

  input.value = '';
  saveTodos();
  render();
}

function handleKeyDown(e) {
  if (e.key === 'Enter') addTodo();
}

/* 🔥 CLICK ANYWHERE TO TOGGLE */
function toggleTodo(id) {
  if (editingId !== null) return; // prevent toggle during edit

  todos = todos.map(t =>
    t.id === id ? { ...t, done: !t.done } : t
  );

  saveTodos();
  render();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  render();
}

/* 🔥 EDIT SYSTEM */
function startEdit(id) {
  editingId = id;
  render();

  setTimeout(() => {
    const input = document.querySelector(`#edit-${id}`);
    if (input) input.focus();
  }, 0);
}

function saveEdit(id) {
  const input = document.querySelector(`#edit-${id}`);
  const newText = input?.value.trim();

  if (!newText) return;

  todos = todos.map(t =>
    t.id === id ? { ...t, text: newText } : t
  );

  editingId = null;
  saveTodos();
  render();
}

function cancelEdit() {
  editingId = null;
  render();
}

function clearCompleted() {
  todos = todos.filter(t => !t.done);
  saveTodos();
  render();
}

function setFilter(filter, btn) {
  currentFilter = filter;

  document.querySelectorAll('.filter-btn')
    .forEach(b => b.classList.remove('active'));

  btn.classList.add('active');
  render();
}

function getFilteredTodos() {
  if (currentFilter === 'active') return todos.filter(t => !t.done);
  if (currentFilter === 'done') return todos.filter(t => t.done);
  return todos;
}

function render() {
  const listEl = document.querySelector('#todo-list');
  const emptyEl = document.querySelector('#empty-msg');

  const filtered = getFilteredTodos();

  if (filtered.length === 0) {
    listEl.innerHTML = '';
    emptyEl.classList.remove('hidden');
    updateStats();
    return;
  }

  emptyEl.classList.add('hidden');

  listEl.innerHTML = filtered.map(todo => {
    const isEditing = editingId === todo.id;

    return `
      <li class="todo-item ${todo.done ? 'done' : ''}"
          onclick="toggleTodo(${todo.id})">

        ${
          isEditing
            ? `<input id="edit-${todo.id}" class="edit-input"
                value="${escapeHTML(todo.text)}"
                onclick="event.stopPropagation()"
                onkeydown="if(event.key==='Enter') saveEdit(${todo.id});
                           if(event.key==='Escape') cancelEdit()" />`
            : `<span class="todo-text"
                onclick="event.stopPropagation()">
                ${escapeHTML(todo.text)}
              </span>`
        }

        <div class="item-actions" onclick="event.stopPropagation()">
          ${
            isEditing
              ? `<button class="action-btn" onclick="saveEdit(${todo.id})">Save</button>`
              : `<button class="action-btn" onclick="startEdit(${todo.id})">Edit</button>`
          }

          <button class="action-btn delete-btn" onclick="deleteTodo(${todo.id})">
            Delete
          </button>
        </div>

      </li>
    `;
  }).join('');

  updateStats();
}

function updateStats() {
  const total = todos.length;
  const done = todos.filter(t => t.done).length;
  const left = total - done;

  document.querySelector('#stats').textContent =
    `${total} total | ${done} done | ${left} remaining`;
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

loadTodos();
render();let todos = [];
let currentFilter = 'all';
let editingId = null;

function loadTodos() {
  const saved = localStorage.getItem('todos');
  todos = saved ? JSON.parse(saved) : [];
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
  const input = document.querySelector('#todo-input');
  const text = input.value.trim();

  if (!text) return input.focus();

  todos.push({
    id: Date.now(),
    text,
    done: false
  });

  input.value = '';
  saveTodos();
  render();
}

function handleKeyDown(e) {
  if (e.key === 'Enter') addTodo();
}

/* 🔥 CLICK ANYWHERE TO TOGGLE */
function toggleTodo(id) {
  if (editingId !== null) return; // prevent toggle during edit

  todos = todos.map(t =>
    t.id === id ? { ...t, done: !t.done } : t
  );

  saveTodos();
  render();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  render();
}

/* 🔥 EDIT SYSTEM */
function startEdit(id) {
  editingId = id;
  render();

  setTimeout(() => {
    const input = document.querySelector(`#edit-${id}`);
    if (input) input.focus();
  }, 0);
}

function saveEdit(id) {
  const input = document.querySelector(`#edit-${id}`);
  const newText = input?.value.trim();

  if (!newText) return;

  todos = todos.map(t =>
    t.id === id ? { ...t, text: newText } : t
  );

  editingId = null;
  saveTodos();
  render();
}

function cancelEdit() {
  editingId = null;
  render();
}

function clearCompleted() {
  todos = todos.filter(t => !t.done);
  saveTodos();
  render();
}

function setFilter(filter, btn) {
  currentFilter = filter;

  document.querySelectorAll('.filter-btn')
    .forEach(b => b.classList.remove('active'));

  btn.classList.add('active');
  render();
}

function getFilteredTodos() {
  if (currentFilter === 'active') return todos.filter(t => !t.done);
  if (currentFilter === 'done') return todos.filter(t => t.done);
  return todos;
}

function render() {
  const listEl = document.querySelector('#todo-list');
  const emptyEl = document.querySelector('#empty-msg');

  const filtered = getFilteredTodos();

  if (filtered.length === 0) {
    listEl.innerHTML = '';
    emptyEl.classList.remove('hidden');
    updateStats();
    return;
  }

  emptyEl.classList.add('hidden');

  listEl.innerHTML = filtered.map(todo => {
    const isEditing = editingId === todo.id;

    return `
      <li class="todo-item ${todo.done ? 'done' : ''}"
          onclick="toggleTodo(${todo.id})">

        ${
          isEditing
            ? `<input id="edit-${todo.id}" class="edit-input"
                value="${escapeHTML(todo.text)}"
                onclick="event.stopPropagation()"
                onkeydown="if(event.key==='Enter') saveEdit(${todo.id});
                           if(event.key==='Escape') cancelEdit()" />`
            : `<span class="todo-text"
                onclick="event.stopPropagation()">
                ${escapeHTML(todo.text)}
              </span>`
        }

        <div class="item-actions" onclick="event.stopPropagation()">
          ${
            isEditing
              ? `<button class="action-btn" onclick="saveEdit(${todo.id})">Save</button>`
              : `<button class="action-btn" onclick="startEdit(${todo.id})">Edit</button>`
          }

          <button class="action-btn delete-btn" onclick="deleteTodo(${todo.id})">
            Delete
          </button>
        </div>

      </li>
    `;
  }).join('');

  updateStats();
}

function updateStats() {
  const total = todos.length;
  const done = todos.filter(t => t.done).length;
  const left = total - done;

  document.querySelector('#stats').textContent =
    `${total} total | ${done} done | ${left} remaining`;
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

loadTodos();
render();
