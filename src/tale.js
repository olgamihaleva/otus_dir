/* Задание 1:

В файле tale.js cоздать функцию kolobok.
Функция kolobok принимает на вход имя персонажа, возвращает, что сделал колобок после встречи с персонажем.
Список персонажей: дедушка; заяц; лиса.
Пример работы функции:
kolobok('дедушка') // Я от дедушки ушёл
kolobok('лиса') // Меня съели */

export function kolobok(name) {
    switch(name) {
        case 'Дедушка': return "Я от дедушки ушёл";
        break; 

        case 'Заяц': return "Я от зайца ушел";
        break; 

        case 'Лиса': return "Меня съели";
        break;

        default:
          throw new Error('Я встретил кого-то неизвестного'); // добавили ошибку 
    }
}


/* Задание 2:

В файле tale.js cоздать функцию newYear.
Функция на вход принимает имя персонажа. Дед Мороз или Снегурочка.
Функция возвращает: "Дед Мороз! Дед Мороз! Дед Мороз!" или "Снегурочка! Снегурочка! Снегурочка!";
В функции используйте шаблонные строки; */

export function newYear(name){
  return `${name}! ${name}! ${name}!`;
}
