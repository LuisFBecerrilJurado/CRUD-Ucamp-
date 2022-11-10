import checkComplete from "./components/checkComplete.js";
import deleteIcon from "./components/deleteIcon.js";

const btn = document.querySelector("[data-form-btn]");
const input = document.querySelector("[data-form-input]");

const createTask = (event) => {
    event.preventDefault();
    const input         = document.querySelector("[data-form-input]");
    const value         = input.value;
    const task          = document.createElement("li");
    const list          = document.querySelector("[data-list]");
    const taskContent   = document.createElement('div');
    const title         = document.createElement('span');
    input.value         = '';
    task.classList.add("card");
    title.classList.add("task");
    title.innerText     = value;
    taskContent.appendChild(checkComplete());
    taskContent.appendChild(title);
    task.appendChild(taskContent);
    list.appendChild(task);
    task.appendChild(deleteIcon());
}

btn.addEventListener("click", createTask);
