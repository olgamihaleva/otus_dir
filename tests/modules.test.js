// первые unit тесты для функций в файле modules.js

import { greet, farewell } from "../src/modules.js";

// тесты на tales.js

import { kolobok, newYear } from "../src/tale.js";

import config from "../framework/config/config";

describe("greet function", () => {
  it("should return a greeting message with the given name", () => {
    const result = greet("John");
    expect(result).toBe("Hello, John!");
  });

  it("should handle empty name gracefully", () => {
    const result = greet("");
    expect(result).toBe("Hello, !");
  });
});

describe("farewell function", () => {
  it("should return a farewell message with the given name", () => {
    const result = farewell("Jane");
    expect(result).toBe("Goodbye, Jane!");
  });

  it("should handle empty name gracefully", () => {
    const result = farewell("");
    expect(result).toBe("Goodbye, !");
  });
});

describe("function kolobok", () => {
  it('fn kolobok should return "Меня съели"', () => {
    const result = kolobok("Лиса");
    expect(result).toBe("Меня съели");
  });

  // Тест на код, который возвращает ошибку
  it("fn kolobok meet unknown", () => {
    expect(() => {
      kolobok("неизвестный");
    }).toThrow("Я встретил кого-то неизвестного");
  });
});

describe("function newYear", () => {
  it('fn newYear should return "Снегурочка! Снегурочка! Снегурочка!"', () => {
    const result = newYear("Снегурочка");
    expect(result).toBe("Снегурочка! Снегурочка! Снегурочка!");
  });
});

console.log(config);
