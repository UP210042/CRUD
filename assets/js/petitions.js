export async function getAllUsers() {
  const res = await fetch('/api/getUsers.php');
  const json = await res.json();
  return json;
}

export async function getTasksByUserId(idUser) {
  const res = await fetch(`/api/getTasks.php?id=${idUser}`);
  const json = await res.json();
  return json;
}

export async function createTask(formData) {
  const res = await fetch(`/api/createTask.php`, {
    method: "POST",
    body: formData
  });
  const json = await res.json();
  return json;
}

export async function updateTask(formData) {
  try {
    const res = await fetch(`/api/updateTask.php`, {
      method: "POST",
      body: formData
    });
    const json = await res.json();
    return json;
  } catch (error) {
    return { error: "Hubo un error al intentar actualizar la tarea" };
  }
}
