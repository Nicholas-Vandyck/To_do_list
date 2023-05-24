
// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function(event) {
  event.preventDefault();

  // Get the necessary elements
  const body = document.body;
  const sun = document.querySelector('.light-mode');
  const header = document.querySelector('.header');
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTaskButton');
  const todoList = document.getElementById('todo-list');
  const errorBlank = document.querySelector('.error-blank');
  const deleteAllButton = document.getElementById('deleteAllButton');
  const pendingTask = document.querySelector('.pendingNum');

   // Event listener for the toggle icon
   document.getElementById('toggle-icon').addEventListener('click', function(event) {
    event.preventDefault();

    if (body.classList.contains('dark-mode')) {
      // Switch to light mode
      body.classList.remove('dark-mode');
      sun.classList.remove('white-sun');
      header.style.border = '2px solid #000';
      localStorage.setItem('body', 'light-mode');
    } else {
      // Switch to dark mode
      body.classList.add('dark-mode');
      sun.classList.add('white-sun');
      header.style.border = '2px solid #fff';
      localStorage.setItem('body', 'dark-mode');
    }
  });

// Load the saved mode from local storage
const savedMode = localStorage.getItem('body');

if (savedMode === 'dark-mode') {
  // Set the dark mode
  body.classList.add('dark-mode');
  header.style.border = '2px solid #fff';
} else {
  // Set the light mode (default)
  body.classList.remove('dark-mode');
  sun.classList.remove('white-sun');
  header.style.border = '2px solid #000';
}

  // Function to update the task count
  function updateTaskCount() {
    const taskCount = todoList.querySelectorAll('li:not(.completed) input[type="checkbox"]:not(:checked)').length;
    pendingTask.textContent = taskCount.toString();
  }

  // Function to add a new task
  function addTask() {

    // Get the task input value
    const taskText = taskInput.value.trim();

    // Check if the task input is not empty
    if (taskText !== '') {
      // Remove error message if present
      errorBlank.textContent = '';

      // Create a new list item
      const listItem = document.createElement('li');

      // Create checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          taskTextElement.classList.add('completed');
          listItem.classList.add('completed');
      
        } else {
          taskTextElement.classList.remove('completed');
          listItem.classList.remove('completed');
        }

        updateTaskCount();
      });

      // Create task text element
      const taskTextElement = document.createElement('span');
      taskTextElement.innerText = taskText;

      // Append checkbox and task text to the list item
      listItem.appendChild(checkbox);
      listItem.appendChild(taskTextElement);

      // Insert the new task at the top of the todo list
      todoList.insertBefore(listItem, todoList.firstChild);

      // Clear the task input
      taskInput.value = '';

      // Update the task count
      updateTaskCount();

      // Save tasks to local storage
      saveTasksToLocalStorage();
    } else {
      // Display error message for empty input
      errorBlank.textContent = 'Please enter a task.';
      errorBlank.style.color = 'red';
      taskInput.style.border = '2px solid red';
    }
  }

  // Function to save tasks to local storage
  function saveTasksToLocalStorage() {
    const tasks = Array.from(todoList.getElementsByTagName('li')).map(item =>
      item.innerText
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to load tasks from local storage
  function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerText = task;
        todoList.insertBefore(listItem, todoList.lastChild);
        if (task.completed) {
          listItem.querySelector('span').classList.add('completed');
          listItem.classList.add('completed');
        }
      });
      // Update the task count
      updateTaskCount();
    }
  }

  // Event listener for the add task button
  addTaskButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission (if in a form element)
    addTask();
  });

  // Event listener for pressing Enter key on the task input
  taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission (if in a form element)
      addTask();
    }
  });

  deleteAllButton.addEventListener('click', function() {
    // Remove all tasks from the todo list
    while (todoList.firstChild) {
      todoList.removeChild(todoList.firstChild);
    }

    // Clear the tasks from local storage
    localStorage.removeItem('tasks');

    // Update the task count
    updateTaskCount();
  });

  // Load tasks from local storage on page load
  loadTasksFromLocalStorage();
});


