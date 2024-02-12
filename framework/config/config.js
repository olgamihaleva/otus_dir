import "dotenv/config"; // импорт из файла .env в корне проекта

const config = {
  baseURL: process.env.TEST_BASE_API_URL, // process.env обращение к переменной в .env
};

// если хотим задать значения по-умолчанию, можно использовать оператор ??
export default Object.freeze(config);
