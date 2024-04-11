export async function getAllUsers() {
  try {
    const res = await fetch('/api/getUsers.php');
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
}

export async function getTasksByUserId(idUser) {
  try {
    const res = await fetch(`/api/getTasks.php?id=${idUser}`);
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Error al obtener tareas por ID de usuario:", error);
    throw error;
  }
}

export async function createTask(formData) {
  try {
    const res = await fetch(`/api/createTask.php`, {
      method: "POST",
      body: formData
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Error al crear tarea:", error);
    throw error;
  }
}

export async function updateTask(taskId, newTitle, newDescription) {
  try {
    const formData = new FormData();
    formData.append('id', taskId);
    formData.append('title', newTitle);
    formData.append('description', newDescription);

    const res = await fetch("/api/updateTask.php", {
      method: "POST",
      body: formData
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    throw error;
  }
}

export async function deleteTask(taskId) {
  try {
    const formData = new FormData();
    formData.append('id', taskId);

    const res = await fetch("/api/deleteTask.php", {
      method: "POST",
      body: formData
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    throw error;
  }
}