/* Вариант 1:
Напишите 5 апи-тестов на сервис bookstore
https://bookstore.demoqa.com/swagger/
Напишите АПИ-тесты:

Создание пользователя c ошибкой, логин уже используется
Создание пользователя c ошибкой, пароль не подходит
Создание пользователя успешно
Генерация токена c ошибкой
Генерация токена успешно */

 // Подключаю faker для использования радомных данных

import faker from 'faker';
const userName = faker.name.findName();
console.log(userName);
const password = faker.internet.password(); 

// Регулярное выражение для теста userID
const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

async function createUser(userName, password) {
  const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
    method: 'post',
    body: JSON.stringify({
        userName,
        password
      }),
      headers: {'Content-Type':'application/json'}
    })
    return response;
  }
 
  describe("Bookstore api tests - create user", () => {
    test("Создание пользователя успешно", async () => {
      
      const response = await createUser(userName, password);
      const data = await response.json();
      expect(data.code).toBe(201);
      expect(uuidRegex.test(data.userID)).toBe(true);
      expect(data.username).toBe(userName);
      expect(data.books).toEqual([]);
    })
  });
