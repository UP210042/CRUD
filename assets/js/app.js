import { getAllUsers, getTasksByUserId, createTask, updateTask, deleteTask } from "./petitions.js";

const listUsers = document.getElementById('users');
const taskTable = document.getElementById('tasks');
const taskForm = document.getElementById('form-task');

document.addEventListener('DOMContentLoaded', async () => {
  const allUsers = await getAllUsers();

  let template = listUsers.innerHTML;
  for (const user of allUsers) {
    template += `
      <option value="${user.id}">${user.fullname}</option>
    `;
  }
  listUsers.innerHTML = template;

  listUsers.addEventListener('change', async () => {
    const userTasks = await getTasksByUserId(listUsers.value);

    let template = "";
    for (const task of userTasks) {
      template += `
        <tr id="tablerow${task.id}">
          <td>${task.id}</td>
          <td>${task.firstname}</td>
          <td>${task.title}</td>
          <td>${task.description}</td> 
          <td>
            <button class="btn btn-secondary btn-sm btn-actualizar">
              <span>Actualizar</span> <i class="nf nf-md-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm btn-borrar">
              <span>Borrar</span> <i class="nf nf-cod-trash"></i>
            </button>
          </td>
        </tr>`;
    }
    taskTable.querySelector('tbody').innerHTML = template;

    const updateButtons = document.querySelectorAll('.btn-actualizar');
    updateButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        const taskId = event.target.parentElement.parentElement.id.replace('tablerow', '');
        const newTitle = prompt("Ingrese el nuevo título:");
        const newDescription = prompt("Ingrese la nueva descripción:");
        const updatedTask = await updateTask(taskId, newTitle, newDescription); 
        console.log(updatedTask);
      });
    });

    
    const deleteButtons = document.querySelectorAll('.btn-borrar');
    deleteButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        const taskId = event.target.parentElement.parentElement.id.replace('tablerow', '');
        const confirmation = confirm("¿Estás seguro de que deseas eliminar esta tarea?");
        if (confirmation) {
          try {
            const deletedTask = await deleteTask(taskId);
            console.log(deletedTask);
            
            const userTasks = await getTasksByUserId(listUsers.value);
            let template = "";
            for (const task of userTasks) {
              template += `
                <tr id="tablerow${task.id}">
                  <td>${task.id}</td>
                  <td>${task.firstname}</td>
                  <td>${task.title}</td>
                  <td>${task.description}</td> 
                  <td>
                    <button class="btn btn-secondary btn-sm btn-actualizar">
                      <span>Actualizar</span> <i class="nf nf-md-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-sm btn-borrar">
                      <span>Borrar</span> <i class="nf nf-cod-trash"></i>
                    </button>
                  </td>
                </tr>`;
            }
            taskTable.querySelector('tbody').innerHTML = template;
          } catch (error) {
            console.error("Error al eliminar tarea:", error);
          }
        }
      });
    });
  });

  taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(taskForm); 
    const response = await createTask(formData);

    console.log(response);
  });
});
