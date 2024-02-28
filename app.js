document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    const taskItem = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.innerText = taskInput.value;

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', function() {
        editButton.style.backgroundColor="white";
        const newText = prompt('Edit task:', taskText.innerText);
        if (newText !== null) {
            taskText.innerText = newText;
            saveTasks();
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', function() {
        deleteButton.style.backgroundColor="red";
        taskList.removeChild(taskItem);
        saveTasks();
    });

    taskItem.appendChild(taskText);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);

    taskInput.value = '';
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    taskList.childNodes.forEach(function(taskItem) {
        const taskText = taskItem.querySelector('span').innerText;
        tasks.push(taskText);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(function(taskText) {
        const taskItem = document.createElement('li');
        const taskTextElement = document.createElement('span');
        taskTextElement.innerText = taskText;

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', function() {
            const newText = prompt('Edit task:', taskTextElement.innerText);
            if (newText !== null) {
                taskTextElement.innerText = newText;
                saveTasks();
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        taskItem.appendChild(taskTextElement);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}