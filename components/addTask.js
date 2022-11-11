import { uniqueDates } from "../services/date.js";
import checkComplete from "./checkComplete.js";
import deleteIcon from "./deleteIcon.js";
import { displayTask } from "./readTask.js";

export const addTask = (event) => {
    event.preventDefault();
    const list          = document.querySelector("[data-list]");
    const input         = document.querySelector("[data-form-input]");
    const calendar      = document.querySelector("[data-form-date]");
    const validateDate  = (date) => isNaN(Date.parse(date));
    const value         = input.value;
    const date          = calendar.value;
    const dateFormat    = moment(date).format('DD/MM/YYYY');
    input.value         = "";
    calendar.value      = "";
    const valueDate     = validateDate(date);

    if (value.length > 0 && !valueDate) {

        const complete = false;

        const taskObj = {
            value,
            dateFormat,
            complete,
            id: uuid.v4()
        }

        list.innerHTML = '';

        const taskList      = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.push(taskObj);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        displayTask();

    } else if(value.length <= 0 && !valueDate) {
        swal("Debes ingresar una tarea primero", "", "error");
    } else {
        swal("Debes ingresar una fecha primero", "", "error");
    }
}

export const createTask = ({ value, dateFormat, complete, id }) => {
    const task          = document.createElement("li");
    const taskContent   = document.createElement("div");
    const title         = document.createElement("span");
    const dateElement   = document.createElement("span");
    const check         = checkComplete(id);
    if (complete) {
        check.classList.toggle("fas");
        check.classList.toggle("completeIcon");
        check.classList.toggle("far");
    }

    title.innerText         = value;
    dateElement.innerHTML   = dateFormat;
    title.classList.add("task");
    taskContent.appendChild(check);
    taskContent.appendChild(title);
    task.classList.add("card");
    task.appendChild(taskContent);
    task.appendChild(dateElement)
    task.appendChild(deleteIcon(id));
    return task;
};