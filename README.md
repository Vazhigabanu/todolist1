# Ex03 To-Do List using JavaScript

## Date:06/11/2026

## AIM
To create a To-do Application with all features using JavaScript.

## ALGORITHM
### STEP 1
Build the HTML structure (index.html).

### STEP 2
Style the App (style.css).

### STEP 3
Plan the features the To-Do App should have.

### STEP 4
Create a To-do application using Javascript.

### STEP 5
Add functionalities.

### STEP 6
Test the App.

### STEP 7
Open the HTML file in a browser to check layout and functionality.

### STEP 8
Fix styling issues and refine content placement.

### STEP 9
Deploy the website.

### STEP 10
Upload to GitHub Pages for free hosting.

## PROGRAM

<<<<<<< HEAD
## home.html
```
<!DOCTYPE html>
<html>
<head>
    <title>Daily Task Planner</title>
    <link rel="stylesheet" href="design.css">
</head>
<body>

    <div class="main-box">

        <header>
            <h1>Daily Planner</h1>
            <p>Plan your work and achieve your goals!</p>
        </header>

        <section class="entry-box">
            <input type="text" id="newTask"
                   placeholder="What do you need to do?">

            <select id="taskPriority">
                <option value="Normal">Normal</option>
                <option value="Important">Important</option>
                <option value="Urgent">Urgent</option>
            </select>

            <button onclick="createTask()">Add</button>
        </section>

        <div class="summary">
            <div class="summary-card">
                <h2 id="allTotal">0</h2>
                <p>All Tasks</p>
            </div>

            <div class="summary-card">
                <h2 id="doneTotal">0</h2>
                <p>Finished</p>
            </div>

            <div class="summary-card">
                <h2 id="leftTotal">0</h2>
                <p>Remaining</p>
            </div>
        </div>

        <div class="toolbar">
            <h3>My Activities</h3>

            <select id="viewType" onchange="showTasks()">
                <option value="everything">All Activities</option>
                <option value="unfinished">Remaining</option>
                <option value="finished">Finished</option>
            </select>
        </div>

        <div id="activityArea"></div>

        <button class="remove-all" onclick="removeFinished()">
            Remove Finished Activities
        </button>

    </div>

    <script src="app.js"></script>
</body>
</html>
```
## Design.css

```

body {
    background: #eaf4ee;
    font-family: Verdana, sans-serif;
    margin: 0;
    padding: 30px 15px;
}

.main-box {
    max-width: 750px;
    margin: auto;
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

header {
    text-align: center;
    margin-bottom: 30px;
}

header h1 {
    color: #20744b;
    font-size: 32px;
}

header p {
    color: #777;
}

.entry-box {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

input, select {
    padding: 12px;
    border: 1px solid #cbd8ce;
    border-radius: 6px;
}

input {
    flex: 1;
    min-width: 150px;
}

button {
    background: #278653;
    color: white;
    border: none;
    padding: 12px 18px;
    border-radius: 6px;
    cursor: pointer;
}

button:hover {
    background: #155c35;
}

.summary {
    display: flex;
    gap: 15px;
    margin: 30px 0;
}

.summary-card {
    flex: 1;
    background: #eff8f1;
    text-align: center;
    padding: 15px 5px;
    border-radius: 8px;
}

.summary-card h2 {
    color: #278653;
    margin: 5px;
}

.summary-card p {
    color: #666;
    font-size: 13px;
}

.toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    gap: 10px;
}

.toolbar h3 {
    color: #245d3b;
}

.activity {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #f7faf7;
    padding: 15px;
    border-left: 4px solid #278653;
    margin-bottom: 12px;
    border-radius: 5px;
}

.activity-name {
    flex: 1;
    overflow-wrap: anywhere;
}

.activity.done .activity-name {
    text-decoration: line-through;
    color: #999;
}

.priority {
    font-size: 12px;
    color: #b45b24;
}

.actions {
    display: flex;
    gap: 5px;
}

.actions button {
    padding: 7px 10px;
    font-size: 12px;
}

.actions .delete {
    background: #d94a4a;
}

.remove-all {
    width: 100%;
    margin-top: 15px;
    background: #d94a4a;
}

.empty {
    text-align: center;
    color: #888;
    padding: 25px;
}

@media(max-width: 550px) {
    .summary {
        flex-direction: column;
    }

    .activity {
        flex-wrap: wrap;
    }

    .toolbar {
        flex-direction: column;
        align-items: flex-start;
    }
}
```
## app.js
```
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

```


## OUTPUT

![alt text](<Screenshot 2026-11-06 102657.png>)

## RESULT
The program for creating To-do list using JavaScript is executed successfully.
