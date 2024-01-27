/* Вариант 1:
Напишите 5 апи-тестов на сервис bookstore
https://bookstore.demoqa.com/swagger/
Напишите АПИ-тесты:

Создание пользователя c ошибкой, логин уже используется 
Создание пользователя c ошибкой, пароль не подходит 
Генерация токена c ошибкой 
Генерация токена успешно */

// Подключаю faker для использования радомных данных

import { faker } from "@faker-js/faker";

//Переменные для пользовательсих данных

const userName = faker.person.fullName();
const userDontExist = "userolga2";
const password = "Qwe0000!";
const invalidPassword = "qwe";
let bearerToken = "";
let userId = "";

// Регулярное выражения для тестов
const uuidRegex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
const tokenRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/;
const expiresRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

//Функция создания пользователя

async function createUser(userName, password) {
  const response = await fetch("https://bookstore.demoqa.com/Account/v1/User", {
    method: "post",
    body: JSON.stringify({
      userName,
      password,
    }),
    headers: { "Content-Type": "application/json" },
  });
  return response;
}

//Функция генерации токена

async function generateToken(userName, password) {
  const token = "Bearer " + bearerToken;
  const response = await fetch(
    "https://bookstore.demoqa.com/Account/v1/GenerateToken",
    {
      method: "post",
      body: JSON.stringify({
        userName,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
  );

  return response;
}

//Функция авторизации

async function getAuthorized(userName, password) {
  const response = await fetch(
    "https://bookstore.demoqa.com/Account/v1/Authorized",
    {
      method: "post",
      body: JSON.stringify({
        userName,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    },
  );
  return response;
}

//Функция удаления пользователя
async function deleteUser(userId) {
  const urlForDelete = "https://bookstore.demoqa.com/Account/v1/User/" + userId;
  console.log(urlForDelete);
  const response = await fetch(urlForDelete, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  return response;
}

//Тесты - Создание пользователя
describe("Bookstore api tests - create user", () => {
  test("Создание пользователя успешно", async () => {
    const response = await createUser(userName, password);
    const data = await response.json();
    userId = data.userID; //сохраняю юзер айди для удаления в конце тестов
    console.log(userId);

    expect(response.status).toBe(201);
    expect(uuidRegex.test(data.userID)).toBe(true);
    expect(data.username).toBe(userName);
    expect(data.books).toEqual([]);
  });

  test("Ошибка создания пользователя - 'User exists'", async () => {
    const response = await createUser(userName, password);
    const data = await response.json();
    expect(response.status).toBe(406);
    expect(data.code).toBe("1204");
    expect(data.message).toEqual("User exists!");
  });

  test("Ошибка создания пользователя - invalid password", async () => {
    const response = await createUser(userName, invalidPassword);
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.code).toBe("1300");
    expect(data.message).toEqual(
      "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.",
    );
  });
});

// Тест - успешная генерация токена
describe("Bookstore api tests - token generate", () => {
  test("Успешная генерация токена", async () => {
    const response = await generateToken(userName, password);
    const data = await response.json();
    bearerToken = data.token;
    expect(response.status).toBe(200);
    expect(tokenRegex.test(data.token)).toBe(true);
    expect(expiresRegex.test(data.expires)).toBe(true);
    expect(data.status).toBe("Success");
    expect(data.result).toEqual("User authorized successfully.");
  });

  test("Генерация токена с ошибкой", async () => {
    const response = await generateToken(userDontExist, password);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.token).toBe(null);
    expect(data.expires).toBe(null);
    expect(data.status).toBe("Failed");
    expect(data.result).toEqual("User authorization failed.");
  });
});

// Тест - авторизация юзера
describe("Bookstore api tests - авторизация юзера", () => {
  test("Успешная авторизация", async () => {
    const response = await getAuthorized(userName, password);
    expect(response.status).toBe(200);
  });
});

//Тесты удаление юзера

describe("Bookstore api tests - удаление юзера", () => {
  test("Успешное удаление юзера", async () => {
    const response = await deleteUser(userId);
    const data = await response.json();
    expect(response.status).toBe(200);
    console.log(data);
  });
});
