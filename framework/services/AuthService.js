import { config } from "../config";

// Функция авторизации

async function getAuthorized(userName, password) {
  const response = await fetch(`${config.baseURL}/Account/v1/Authorized`, {
    method: "post",
    body: JSON.stringify({
      userName,
      password,
    }),
    headers: { "Content-Type": "application/json" },
  });
  return response;
}

// Функция генерации токена

async function generateToken(userName, password) {
  const response = await fetch(`${config.baseURL}/Account/v1/GenerateToken`, {
    method: "post",
    body: JSON.stringify({
      userName,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export default {
  authorize: getAuthorized,
  makeToken: generateToken,
};
