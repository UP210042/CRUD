import { deleteTask, createTask, getAllUsers, getTasksByUserId } from "./petitions.js";

const listUsers = document.getElementById('users');
const taskTable = document.getElementById('tasks');
const taskForm = document.getElementById('form-task');
const taskTitle = document.getElementById('form-title');
const completedCheckbox = document.getElementById('completed');

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
    const taskCompleted = task.completed ? "Completada" : "No completada";
    template += `
      <tr id="tablerow${task.id}">
        <td>${task.id}</td>
        <td>${task.firstname}</td>
        <td>${task.title}</td>
        <td>${taskCompleted}</td>
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

  const deleteButtons = document.querySelectorAll('.deleteBtn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const taskId = button.id.replace('deleteBtn', '');
      const row = document.getElementById(`tablerow${taskId}`);
      row.remove();
      await deleteTask(taskId);
    });
  });

  const updateButtons = document.querySelectorAll('.updateBtn');
  updateButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const taskId = button.id.replace('updateBtn', '');
      taskTitle.innerText = "Actualizar tarea";
    });
  });
});

// Reemplaza el event listener submit actual por este código
taskForm.addEventListener('submit', async (event) => {
  event.preventDefault(); 
  
  const formData = new FormData(taskForm);
  const completedValue = completedCheckbox.checked ? 1 : 0;
  formData.append('completed', completedValue);

  await createTask(formData);

  // Limpiar el formulario después de guardar la tarea
  taskForm.reset();
});
