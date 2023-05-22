 
document.getElementById('toggle-icon').addEventListener('click', function(event) {
    event.preventDefault();
    const body = document.body;
    const sun = document.querySelector('.light-mode');
    const header = document.querySelector('.header');
    // const li = document.querySelector('.li');
    

    if (body.classList.contains('dark-mode')) {
        // Switch to light mode
        body.classList.remove('dark-mode');
        sun.classList.remove('white-sun');
        header.style.border= '2px solid #000';
        localStorage.setItem('body', 'light-mode');
    } else {
        // Switch to dark mode
        body.classList.add('dark-mode');
        header.style.border= '2px solid #fff';
        localStorage.setItem('body', 'dark-mode');
    }

    // function 
});
document.addEventListener('DOMContentLoaded', function(event) {
    event.preventDefault();
    // Get the necessary elements
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const todoList = document.getElementById('todo-list');
    const errorBlank = document.querySelector('.error-blank');
    const deleteAllButton = document.getElementById('deleteAllButton');
  
    // Function to add a new task
    function addTask() {
      // Get the task input value
      const taskText = taskInput.value.trim();
  
      // Check if the task input is not empty
      if (taskText !== '') {
        errorBlank.textContent = ""

        // Create a new list item
        const listItem = document.createElement('li');
        listItem.innerText = taskText;
        listItem.classList.add('top-item');
        
         // Create a dropdown menu element
        const dropdownMenu = document.createElement('select');

        // Create an "Edit" option for the dropdown menu
        const editOption = document.createElement('option');
        editOption.value = 'edit';
        editOption.text = 'Edit';

        // Add the "Edit" option to the dropdown menu
        dropdownMenu.appendChild(editOption);

        // Append the dropdown menu to the list item
        listItem.appendChild(dropdownMenu);

         // Event listener for the dropdown menu
  todoList.addEventListener('change', function(event) {
    const selectedOption = event.target.value;

    // Check if the selected option is "Edit"
    if (selectedOption === 'edit') {
      // Call the editTask function passing the corresponding list item
      editTask(event.target.parentElement);
    }
  });

  function editTask(listItem) {
    const taskText = listItem.innerText.trim();
  
    // Replace the list item with an input field for editing
    const inputField = document.createElement('input');
    inputField.value = taskText;
    inputField.classList.add('edit-input');
    listItem.innerHTML = '';
    listItem.appendChild(inputField);
  
    // Focus on the input field
    inputField.focus();
  
    // Event listener for the input field
    inputField.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        // Save the edited task
        saveEditedTask(listItem, inputField.value);
      }
    });
  }

        // Append the new task to the list from top to bottom
        todoList.insertBefore(listItem, todoList.firstChild);
  
        // Clear the task input
        taskInput.value = '';

        // Save tasks to local storage
      saveTasksToLocalStorage();

      }else{
        //error message
        errorBlank.textContent = "Please enter a task..."
        errorBlank.style.color = 'red';
        taskInput.style.border = '2px solid red';
      }
    }

  // Event listener for the delete all button
  deleteAllButton.addEventListener('click', function() {
    // Call the deleteAllTasks function
    deleteAllTasks();

    function deleteAllTasks() {
        // Remove all list items from the task list
        while (todoList.firstChild) {
          todoList.removeChild(todoList.firstChild);
        }
      
        // Clear the tasks from local storage
        localStorage.removeItem('tasks');
      }
  });

    //function to save task to local storage
    function saveTasksToLocalStorage(){
        const tasks = Array.from(todoList.getElementsByTagName('li')).map(item => item.innerText);
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
            listItem.classList.add('top-item');
            todoList.insertBefore(listItem, todoList.firstChild);
          });
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
    loadTasksFromLocalStorage()
  });
  