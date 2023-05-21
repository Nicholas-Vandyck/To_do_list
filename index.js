
document.getElementById('toggle-icon').addEventListener('click', function() {
    const body = document.body;
    const sun = document.querySelector('.light-mode');
    const header = document.querySelector('.header');
    const li = document.querySelector('.li');
    

    if (body.classList.contains('dark-mode')) {
        // Switch to light mode
        body.classList.remove('dark-mode');
        sun.classList.add('white-sun');
        header.style.border= '2px solid #000';
        li.style.border = '2px solid #000';
    } else {
        // Switch to dark mode
        body.classList.add('dark-mode');
        sun.classList.add('white-sun');
        header.style.border= '2px solid #fff';
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const todoList = document.getElementById('todo-list');
    const deleteAllButton = document.getElementById('deleteAllButton');
    const errorBlank = document.querySelector('.error-blank'); 
    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks in ascending order
    renderTasks();

    addTaskButton.addEventListener('click', function() {

        const taskText = taskInput.value.trim();

        if (taskText === '') {
            taskInput.style.border = '2px solid red';
           errorBlank.textContent = "Please task can't be empty";
           errorBlank.style.color = 'red';
            return;
        } else{
            taskInput.style.border = '';
            errorBlank.textContent = '';
            addTask(taskText);
            taskInput.value = '';
        }

        // Update local storage
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Render tasks in ascending order
        renderTasks();
    });

    

    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        todoList.appendChild(li);
    }

    function renderTasks() {
        // Clear the existing tasks
        todoList.innerHTML = '';

        // Sort tasks in ascending order
        tasks.sort();

        // Render tasks
        tasks.forEach(function(taskText) {
            addTask(taskText);
        });
    }

    deleteAllButton.addEventListener('click', function() {
        // Clear tasks from local storage
        localStorage.removeItem('tasks');

        // Clear the task list
        todoList.innerHTML = '';

        // Clear the tasks array
        tasks = [];
    });
});
