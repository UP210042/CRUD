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