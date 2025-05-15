const { log } = require("console");
const fs = require("fs");
const filePath = "./tasks.json";

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (error) {
    return [];
  }
};

const listTask = () =>  {
    const tasks = loadTasks()
    tasks.forEach((task, index) => console.log(`${index+1} - ${task.task}`))
}

const saveTasks = (tasks) => {
  const dataJson = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJson);
};

const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({ task });
  saveTasks(tasks);
  console.log("task added", tasks);
};

const removeTask = (index) => {
  const tasks = loadTasks();
    if(index>0)
    {
        tasks.splice(index-1, 1);
        saveTasks(tasks);
    }
    else
    console.log("enter correct index");
};

const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTask();
} else if (command === "remove") {
  removeTask(parseInt(argument));
} else {
  console.log("command not found");
}
