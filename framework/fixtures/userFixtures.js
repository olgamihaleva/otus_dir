import { faker } from "@faker-js/faker";

export function generateUserData() {
  return {
    userName: faker.person.fullName(),
    userFirstName: faker.person.firstName(),
    userExampleEmail: faker.internet.exampleEmail(),
    userEmail: faker.internet.email(),
    password: "Qwe0000!",
    userDontExist: "userolga2",
    invalidPassword: "qwe",
    companyName: faker.company.name(),
    uuidRegex:
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
    tokenRegex: /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/,
    expiresRegex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
  };
}
