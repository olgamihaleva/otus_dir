import { UsersBugred, UserFixture } from "../framework";

describe("Сервис users.bugred.ru", () => {
  let userData;
  let idcompany;

  beforeAll(async () => {
    userData = UserFixture.generateUserData();
  });

  it("Успешная регистрация юзера через doregister", async () => {
    const response = await UsersBugred.doregister({
      email: userData.userEmail,
      name: userData.userName,
      password: userData.password,
    });

    expect(response.status).toBe(200);
    expect(response.data.name).toBe(userData.userName);
    expect(response.data.avatar).toBe(
      "http://users.bugred.ru//tmp/default_avatar.jpg",
    );
    expect(response.data.password).toBe(
      "5cb557965d3fc1c4b559e1b7f3d6b13035cfca9656ce22e4ed932136f0350322faa281e90e10bba09b21fdb1878e59d64cc788ea1862f8e7b1e1c52cbf83f143",
    );
    expect(response.data.birthday).toBe(0);
    expect(response.data.gender).toBe("");
    expect(response.data.email).toBe(userData.userEmail);
    expect(response.data.date_start).toBe(0);
    expect(response.data.hobby).toBe("");
  });

  it("Ошибка - nакой пользователь уже существует", async () => {
    const response = await UsersBugred.doregister({
      email: userData.userEmail,
      name: userData.userName,
      password: userData.password,
    });

    expect(response.status).toBe(200);
    expect(response.data.type).toBe("error");
    expect(response.data.message).toBe(
      ` Текущее ФИО ${userData.userName} уже есть в базе`,
    );
  });

  it("Ошибка - регистрация без обязательного поля email", async () => {
    const response = await UsersBugred.doregister({
      name: userData.userName,
      password: userData.password,
    });

    expect(response.status).toBe(200);
    expect(response.data.type).toBe("error");
    expect(response.data.message).toBe("Параметр email является обязательным!");
  });

  //создание компании пользователя

  it("Успешное создание компании", async () => {
    let body = {
      company_name: userData.companyName,
      company_type: "ООО",
      company_users: ["manager@mail.ru"],
      email_owner: "manager@mail.ru",
    };
    const response = await UsersBugred.createCompany(body);
    idcompany = response.data.id_company;
    expect(response.status).toBe(200);
    expect(response.data.type).toBe("success");
  });

  //создание юзера через createuser

  it("Успешное создание юзера через createuser", async () => {
    const response = await UsersBugred.createUser({
      email: userData.userExampleEmail,
      name: userData.userFirstName,
      tasks: [12],
      companies: [87],
    });
    
    let lowerEmail = userData.userExampleEmail;
    expect(response.status).toBe(200);
    expect(response.data.email).toBe(lowerEmail.toLowerCase());
    expect(response.data.name).toBe(userData.userFirstName);
  });
});
