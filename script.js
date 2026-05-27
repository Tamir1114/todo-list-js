// Todo List - script.js

var todos = [];
var currentFilter = 'all';

// Load saved data from localStorage when page opens
function loadTodos() {
  var saved = localStorage.getItem('todos');
  if (saved) {
    todos = JSON.parse(saved);
  }
}

// Save current todos array to localStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Add a new todo when the Add button is clicked
function addTodo() {
  var input = document.querySelector('#todo-input');
  var text = input.value.trim();

  if (text === '') {
    input.focus();
    return;
  }

  var newTodo = {
    id: Date.now(),
    text: text,
    done: false
  };

  todos.push(newTodo);
  saveTodos();

  input.value = '';
  input.focus();
  render();
}

// Triggered by onkeydown — adds todo when Enter is pressed
function handleKeyDown(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
}

// Toggle a todo between done and not done
function toggleTodo(id) {
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].done = !todos[i].done;
      break;
    }
  }
  saveTodos();
  render();
}

// Delete a todo by id
function deleteTodo(id) {
  todos = todos.filter(function(todo) {
    return todo.id !== id;
  });
  saveTodos();
  render();
}

// Show an editable input field for a todo
function startEdit(id) {
  var textEl = document.querySelector('#text-' + id);
  if (!textEl) return;

  var todo = null;
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todo = todos[i];
      break;
    }
  }
  if (!todo) return;

  var editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'edit-input';
  editInput.value = todo.text;
  editInput.id = 'edit-input-' + id;

  editInput.onkeydown = function(e) {
    if (e.key === 'Enter') saveEdit(id);
    if (e.key === 'Escape') render();
  };

  textEl.replaceWith(editInput);
  editInput.focus();
  editInput.select();

  var editBtn = document.querySelector('#edit-btn-' + id);
  if (editBtn) {
    editBtn.textContent = 'Save';
    editBtn.onclick = function() { saveEdit(id); };
  }
}

// Save the edited text
function saveEdit(id) {
  var editInput = document.querySelector('#edit-input-' + id);
  if (!editInput) return;

  var newText = editInput.value.trim();
  if (newText === '') return;

  for (var i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].text = newText;
      break;
    }
  }

  saveTodos();
  render();
}

// Remove all completed todos
function clearCompleted() {
  todos = todos.filter(function(todo) {
    return !todo.done;
  });
  saveTodos();
  render();
}

// Switch between All / Active / Done filter
function setFilter(filter, btn) {
  currentFilter = filter;

  var buttons = document.querySelectorAll('.filter-btn');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active');
  }
  btn.classList.add('active');

  render();
}

// Build and display the todo list using innerHTML
function render() {
  var filtered = [];

  if (currentFilter === 'all') {
    filtered = todos;
  } else if (currentFilter === 'active') {
    filtered = todos.filter(function(t) { return !t.done; });
  } else if (currentFilter === 'done') {
    filtered = todos.filter(function(t) { return t.done; });
  }

  var listEl  = document.querySelector('#todo-list');
  var emptyEl = document.querySelector('#empty-msg');

  if (filtered.length === 0) {
    listEl.innerHTML = '';
    emptyEl.classList.remove('hidden');
  } else {
    emptyEl.classList.add('hidden');

    var html = '';
    for (var i = 0; i < filtered.length; i++) {
      var todo = filtered[i];
      var doneClass = todo.done ? 'done' : '';
      var checkMark = todo.done ? 'v' : '';

      html += '<li class="todo-item ' + doneClass + '" id="item-' + todo.id + '">';
      html += '<button class="check-btn" onclick="toggleTodo(' + todo.id + ')">' + checkMark + '</button>';
      html += '<span class="todo-text" id="text-' + todo.id + '">' + escapeHTML(todo.text) + '</span>';
      html += '<div class="item-actions">';
      html += '<button class="action-btn" id="edit-btn-' + todo.id + '" onclick="startEdit(' + todo.id + ')">Edit</button>';
      html += '<button class="action-btn delete-btn" onclick="deleteTodo(' + todo.id + ')">Delete</button>';
      html += '</div>';
      html += '</li>';
    }

    listEl.innerHTML = html;
  }

  updateStats();
}

// Update the stats text at the top
function updateStats() {
  var total = todos.length;
  var done  = 0;
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].done) done++;
  }
  var left = total - done;

  var statsEl = document.querySelector('#stats');
  statsEl.textContent = total + ' total  |  ' + done + ' done  |  ' + left + ' remaining';
}

// Prevent user input from breaking the HTML
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Run on page load
loadTodos();
render();
