/* Задание 1:

В файле src/app.js cоздать функцию getScore.
Функция getScore принимает на вход объект. В котором ключ это ник, а значение это успеваемость.
Функция getScore возвращает в ответ сумму всех баллов */

/** Функция, которая возвращает сумма значений объекта
 *
 * @param {object} students - объект с оценками студентов
 * @returns {number} - сумма всех значений объекта
 */

function getScore(students) {
  let score = 0;
  for (const key in students) {
    if (typeof students[key] === "number") {
      score += students[key];
    }
  }
  return score;
}

const students = {
  yuji: 10,
  nobara: 7,
  megumi: 9,
  satoru: "user not a student",
  nanami: null,
};

const answer = getScore(students);
console.log(`Ответ на первое задание ${answer}`);
