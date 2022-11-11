import checkComplete from "./checkComplete.js";
import deleteIcon from "./deleteIcon.js";

export const addTask = (event) => {
    event.preventDefault();
    const list          = document.querySelector("[data-list]");
    const input         = document.querySelector("[data-form-input]");
    const calendar      = document.querySelector("[data-form-date]");
    const taskList      = JSON.parse(localStorage.getItem("tasks")) || [];
    const validateDate  = (date) => isNaN(Date.parse(date));
    const value         = input.value;
    const date          = calendar.value;
    const dateFormat    = moment(date).format('DD/MM/YYYY');
    input.value         = "";
    calendar.value      = "";
    const valueDate     = validateDate(date);

    if (value.length > 0 && !valueDate) {
        const taskObj = {
            value,
            dateFormat
        }

        const task = createTask(taskObj)
        list.appendChild(task);
        taskList.push({value,dateFormat});
        localStorage.setItem("tasks", JSON.stringify(taskList))

    } else if(value.length <= 0 && !valueDate) {
        swal("Debes ingresar una tarea primero", "", "error");
    } else {
        swal("Debes ingresar una fecha primero", "", "error");
    }
}

export const createTask = ({ value, dateFormat }) => {
    const task          = document.createElement("li");
    const taskContent   = document.createElement("div");
    const title         = document.createElement("span");
    const dateElement   = document.createElement("span");

    title.innerText         = value;
    dateElement.innerHTML   = dateFormat;
    title.classList.add("task");
    taskContent.appendChild(checkComplete());
    taskContent.appendChild(title);
    task.classList.add("card");
    task.appendChild(taskContent);
    task.appendChild(dateElement)
    task.appendChild(deleteIcon());
    return task;
};