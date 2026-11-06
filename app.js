let activityList = JSON.parse(
    localStorage.getItem("plannerData")
) || [];

function storeData() {
    localStorage.setItem(
        "plannerData",
        JSON.stringify(activityList)
    );
}

// Create a new activity
function createTask() {

    let input = document.getElementById("newTask");
    let priority = document.getElementById("taskPriority");

    let value = input.value.trim();

    if (value.length === 0) {
        alert("Enter an activity first!");
        return;
    }

    let newActivity = {
        code: Date.now(),
        title: value,
        level: priority.value,
        status: false
    };

    activityList.unshift(newActivity);

    input.value = "";
    priority.value = "Normal";

    storeData();
    showTasks();
}

// Display activities
function showTasks() {

    let area = document.getElementById("activityArea");
    let option = document.getElementById("viewType").value;

    area.innerHTML = "";

    let result = activityList.filter(item => {
        if (option === "unfinished") return !item.status;
        if (option === "finished") return item.status;
        return true;
    });

    if (result.length === 0) {
        area.innerHTML =
            '<p class="empty">No activities available!</p>';
    }

    result.forEach(item => {

        let card = document.createElement("div");

        card.className = item.status
            ? "activity done"
            : "activity";

        let check = document.createElement("input");
        check.type = "checkbox";
        check.checked = item.status;

        check.onchange = function() {
            changeStatus(item.code);
        };

        let name = document.createElement("span");
        name.className = "activity-name";
        name.textContent = item.title;

        let level = document.createElement("span");
        level.className = "priority";
        level.textContent = item.level;

        let actions = document.createElement("div");
        actions.className = "actions";

        let edit = document.createElement("button");
        edit.textContent = "Update";

        edit.onclick = function() {
            updateTask(item.code);
        };

        let del = document.createElement("button");
        del.textContent = "Remove";
        del.className = "delete";

        del.onclick = function() {
            deleteTask(item.code);
        };

        actions.append(edit, del);

        card.append(check, name, level, actions);

        area.appendChild(card);
    });

    calculateSummary();
}

// Change activity status
function changeStatus(code) {

    let selected = activityList.find(
        item => item.code === code
    );

    selected.status = !selected.status;

    storeData();
    showTasks();
}

// Update an existing activity
function updateTask(code) {

    let selected = activityList.find(
        item => item.code === code
    );

    let changed = prompt(
        "Enter updated activity:",
        selected.title
    );

    if (changed === null) return;

    if (changed.trim() === "") {
        alert("Activity cannot be empty!");
        return;
    }

    selected.title = changed.trim();

    storeData();
    showTasks();
}

// Remove a particular activity
function deleteTask(code) {

    if (!confirm("Do you want to remove this activity?")) {
        return;
    }

    activityList = activityList.filter(
        item => item.code !== code
    );

    storeData();
    showTasks();
}

// Calculate task summary
function calculateSummary() {

    let finished = activityList.filter(
        item => item.status
    ).length;

    document.getElementById("allTotal").textContent =
        activityList.length;

    document.getElementById("doneTotal").textContent =
        finished;

    document.getElementById("leftTotal").textContent =
        activityList.length - finished;
}

// Remove all completed activities
function removeFinished() {

    activityList = activityList.filter(
        item => !item.status
    );

    storeData();
    showTasks();
}

// Initial loading
showTasks();