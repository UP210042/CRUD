import { getAllUsers, getTasksByUserId, createTask } from "./petitions.js";

const listUsers = document.getElementById('users');
const taskTable = document.getElementById('tasks');
const taskForm = document.getElementById('form-task'); // Agregar la referencia al formulario

document.addEventListener('DOMContentLoaded', async () => {
  const allUsers = await getAllUsers();

  let template = listUsers.innerHTML;
  for (const user of allUsers) {
    template += `
      <option value="${user.id}">${user.fullname}</option>
    `;
  }
  listUsers.innerHTML = template;
});

listUsers.addEventListener('change', async () => {
  const userTasks = await getTasksByUserId(listUsers.value);

  let template = "";
  for (const task of userTasks) {
    template += `
      <tr id="tablerow${task.id}">
        <td>${task.id}</td>
        <td>${task.firstname}</td>
        <td>${task.title}</td>
        <td>${task.description}</td> <!-- Mostrar la descripción en esta celda -->
        <td>
          <button class="btn btn-info btn-sm updateBtn" id="updateBtn${task.id}">
            <span>Actualizar</span> <i class="nf nf-md-pencil"></i>
          </button>
          <button class="btn btn-danger btn-sm deleteBtn" id="deleteBtn${task.id}">
            <span>Borrar</span> <i class="nf nf-cod-trash"></i>
          </button>
        </td>
      </tr>`;
  }
  taskTable.querySelector('tbody').innerHTML = template;
});

taskForm.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  const formData = new FormData(taskForm); 
  const response = await createTask(formData);

  console.log(response);
});

document.getElementById('form-task').addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita el envío predeterminado del formulario
  
  const formData = new FormData(event.target); // Obtén los datos del formulario
  
  try {
    const response = await createTask(formData); // Llama a la función createTask con los datos del formulario
    console.log(response); // Maneja la respuesta si es necesario
  } catch (error) {
    console.error(error); // Maneja el error si ocurre
  }
});
