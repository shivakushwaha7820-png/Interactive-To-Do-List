var taskInput = document.querySelector("#taskInput");
var addBtn = document.querySelector("#addBtn");
var taskList = document.querySelector("#taskList");
var emptyMessage = document.querySelector("#emptyMessage");

// LocalStorage se tasks lena
var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Tasks ko LocalStorage mein save karna
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Screen par tasks dikhana
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        var li = document.createElement("li");

        var span = document.createElement("span");
        span.textContent = task.text;

        // Complete task
        if (task.completed) {
            span.classList.add("completed");
        }

        span.addEventListener("click", function() {

            task.completed = !task.completed;

            saveTasks();
            displayTasks();

        });

        // Delete button
        var deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("deleteBtn");

        deleteBtn.addEventListener("click", function() {

            tasks.splice(index, 1);

            saveTasks();
            displayTasks();

        });

        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

    // Empty message
    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

}

// New task add karna
function addTask() {

    var text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    var newTask = {
        text: text,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    displayTasks();

    taskInput.value = "";

}

// Add button click event
addBtn.addEventListener("click", addTask);

// Enter key event
taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});

// Page load hone par tasks show karna
displayTasks();