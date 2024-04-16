const { test, expect } = require('@playwright/test');
const { HandwrittnerLoginPage } = require('../pages/loginPage');
const { ForgotPasswordPage } = require('../pages/forgotpasswordPage');
const exp = require('constants');

// Запускает тесты последовательно в рамках одного файла
test.describe.configure({ mode: 'serial' });

test('Ошибка при авторизации без каптчи на Handwrittner', async ({ page }) => {
  const HandwrittnerLogin = new HandwrittnerLoginPage(page); //вопрос может лучше вынести создание перед всеми тестами, а не прописывать в каждом тесте?
  await HandwrittnerLogin.open();
  await HandwrittnerLogin.login('olgabathory1560@yandex.ru', '5w6u_W#fSk5$2BX'); //вопрос как безопасно хранить креды?
  await expect(page.locator('//div[@class="error"]')).toBeVisible();
});

test("Открытие экрана регистрации со страницы логина", async ({page}) => { 
  const HandwrittnerLogin = new HandwrittnerLoginPage(page);
 // await HandwrittnerLogin.open();
  await HandwrittnerLogin.openRegistration();
  await expect(page).toHaveURL(/reg/);
})

test("Восстановление пароля", async ({page}) => {
const HandwrittnerLogin = new HandwrittnerLoginPage(page);
await HandwrittnerLogin.open(); 
await HandwrittnerLogin.forgotpasswordclick();
await expect(page).toHaveURL(/forgotpassword/);
})


test("Ошибка при восстановлении пароля - 'Введите email'", async ({page}) => {
  const PasswordPage = new ForgotPasswordPage(page);
  await PasswordPage.open();
  await expect(PasswordPage.mainText).toHaveText('Восстановление пароля');
  await expect(PasswordPage.mainText).toBeVisible();
  await PasswordPage.emptySubmit();
  await expect(PasswordPage.errorText).toHaveText('Введите email');
  await expect(PasswordPage.errorText).toBeVisible();
})


test("Успешный запрос восстановления пароля", async ({page}) => { 
  const PasswordPage = new ForgotPasswordPage(page);
  await PasswordPage.open(); 
  await PasswordPage.enterEmail('test@mail.ru');
  await expect(PasswordPage.successText).toHaveText('Мы отправили вам инструкции по восстановлению пароля на почту')
  await expect(PasswordPage.successText).toBeVisible();
})








