import { config } from "../config";
import fetch from "node-fetch";

// здесь функции для запросов в систему http://users.bugred.ru

// doregister

const doregister = async (data) => {
  const response = await fetch(`${config.bugregURL}/tasks/rest/doregister`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return {
    headers: response.headers,
    status: response.status,
    data: await response.json(),
  };
};

// создание компании

const createCompany = async (data) => {
  const response = await fetch(`${config.bugregURL}/tasks/rest/createcompany`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return {
    headers: response.headers,
    status: response.status,
    data: await response.json(),
  };
};

// создание юзера через create user

const createUser = async (data) => {
  const response = await fetch(`${config.bugregURL}/tasks/rest/createuser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return {
    headers: response.headers,
    status: response.status,
    data: await response.json(),
  };
};

// добавление аватара addavatar

const addAvatar = async (formData) => {
  const response = await fetch(`${config.bugregURL}/tasks/rest/addavatar`, {
    method: "POST",
    body: formData,
  });
  return {
    headers: response.headers,
    status: response.status,
    data: await response.json(),
  };
};

export default {
  doregister,
  createCompany,
  createUser,
  addAvatar,
};
