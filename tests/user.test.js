import { UserService, UserFixture, AuthService } from "../framework";

// Тесты - Создание пользователя
describe("Тесты Users", () => {
  let userData;
  let userId;
  let bearerToken;

  beforeAll(async () => {
    userData = UserFixture.generateUserData();
  });

  // Создание пользователя

  test("Создание пользователя успешно", async () => {
    const response = await UserService.create(
      userData.userName,
      userData.password,
    );
    const data = await response.json();
    userId = data.userID; // сохраняю юзер айди для удаления в конце тестов

    expect(response.status).toBe(201);
    expect(userData.uuidRegex.test(data.userID)).toBe(true);
    expect(data.username).toBe(userData.userName);
    expect(data.books).toEqual([]);
  });

  test("Ошибка создания пользователя - 'User exists'", async () => {
    const response = await UserService.create(
      userData.userName,
      userData.password,
    );
    const data = await response.json();

    expect(response.status).toBe(406);
    expect(data.code).toBe("1204");
    expect(data.message).toEqual("User exists!");
  });

  test("Ошибка создания пользователя - invalid password", async () => {
    const response = await UserService.create(
      userData.userName,
      userData.invalidPassword,
    );
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.code).toBe("1300");
    expect(data.message).toEqual(
      "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.",
    );
  });

  // Авторизация пользователя

  test("Пользователь ещё не авторизован", async () => {
    const response = await AuthService.authorize(
      userData.userName,
      userData.password,
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toBe(false);
  });

  // Получение токена, снова проверка авторизации

  test("Успешная генерация токена", async () => {
    const response = await AuthService.makeToken(
      userData.userName,
      userData.password,
    );
    const data = await response.json();
    bearerToken = `Bearer ${data.token}`;

    expect(response.status).toBe(200);
    expect(userData.tokenRegex.test(data.token)).toBe(true);
    expect(userData.expiresRegex.test(data.expires)).toBe(true);
    expect(data.status).toBe("Success");
    expect(data.result).toEqual("User authorized successfully.");
  });

  test("Пользователь успешно авторизован", async () => {
    const response = await AuthService.authorize(
      userData.userName,
      userData.password,
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toBe(true);
  });

  // Удаление юзера

  test("Пользователь успешно удалён", async () => {
    const response = await UserService.deleteUser(userId, bearerToken);
    expect(response.status).toBe(204);
  });
});
