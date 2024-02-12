import { config } from "../config";

// Функция создания пользователя

async function createUser(userName, password) {
  const response = await fetch(`${config.baseURL}/Account/v1/User`, {
    method: "post",
    body: JSON.stringify({
      userName,
      password,
    }),
    headers: { "Content-Type": "application/json" },
  });
  return response;
}

// Функция удаления пользователя
async function deleteUser(userId, bearerToken) {
  const urlForDelete = `${config.baseURL}/Account/v1/User/` + userId;

  const response = await fetch(urlForDelete, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });

  return response;
}

export default {
  create: createUser,
  deleteUser,
};
