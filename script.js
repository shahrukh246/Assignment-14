let tasks = [];

function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({ text: taskText, editing: false });
    taskInput.value = "";
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        if (task.editing) {
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.className = "edit-input";
            editInput.value = task.text;
            editInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    updateTask(index, editInput.value);
                }
            });
            listItem.appendChild(editInput);
            editInput.focus();
        } else {
            const taskText = document.createElement("span");
            taskText.textContent = task.text;
            listItem.appendChild(taskText);
        }

        const actionsDiv = document.createElement("div");
        actionsDiv.className = "actions";

        const editButton = document.createElement("button");
        editButton.className = "edit-btn";
        editButton.textContent = task.editing ? "Save" : "Edit";
        editButton.onclick = () => toggleEditTask(index);
        actionsDiv.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTask(index);
        actionsDiv.appendChild(deleteButton);

        listItem.appendChild(actionsDiv);
        taskList.appendChild(listItem);
    });
}

function toggleEditTask(index) {
    tasks[index].editing = !tasks[index].editing;
    renderTasks();
}

function updateTask(index, newText) {
    tasks[index].text = newText;
    tasks[index].editing = false;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}
