let todos = [];
let currentFilter = 'all';

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

  if (!text) {
    input.focus();
    return;
  }

  todos.push({
    id: Date.now(),
    text,
    done: false
  });

  input.value = '';
  input.focus();

  saveTodos();
  render();
}

function handleKeyDown(event) {
  if (event.key === 'Enter') addTodo();
}

function toggleTodo(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );

  saveTodos();
  render();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);

  saveTodos();
  render();
}

function startEdit(id) {
  const textEl = document.querySelector(`#text-${id}`);
  const todo = todos.find(t => t.id === id);
  if (!textEl || !todo) return;

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'edit-input';
  input.value = todo.text;
  input.id = `edit-input-${id}`;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveEdit(id);
    if (e.key === 'Escape') render();
  });

  textEl.replaceWith(input);
  input.focus();
  input.select();

  const editBtn = document.querySelector(`#edit-btn-${id}`);
  if (editBtn) {
    editBtn.textContent = 'Save';
    editBtn.onclick = () => saveEdit(id);
  }
}

function saveEdit(id) {
  const input = document.querySelector(`#edit-input-${id}`);
  if (!input) return;

  const newText = input.value.trim();
  if (!newText) return;

  todos = todos.map(todo =>
    todo.id === id ? { ...todo, text: newText } : todo
  );

  saveTodos();
  render();
}

function clearCompleted() {
  todos = todos.filter(todo => !todo.done);

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
  } else {
    emptyEl.classList.add('hidden');

    listEl.innerHTML = filtered.map(todo => `
      <li class="todo-item ${todo.done ? 'done' : ''}" id="item-${todo.id}">
        <button class="check-btn" onclick="toggleTodo(${todo.id})">
          ${todo.done ? '✓' : ''}
        </button>

        <span class="todo-text" id="text-${todo.id}">
          ${escapeHTML(todo.text)}
        </span>

        <div class="item-actions">
          <button class="action-btn" id="edit-btn-${todo.id}" onclick="startEdit(${todo.id})">
            Edit
          </button>
          <button class="action-btn delete-btn" onclick="deleteTodo(${todo.id})">
            Delete
          </button>
        </div>
      </li>
    `).join('');
  }

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
