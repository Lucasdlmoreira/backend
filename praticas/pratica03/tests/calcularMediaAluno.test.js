const calcularMediaAluno = require("../src/calcularMediaAluno");

describe("Testes da função calcularMediaAluno", () => {
  test("deve lançar erro se a1 ou a2 não forem informados", () => {
    expect(() => calcularMediaAluno(undefined, 7)).toThrow("Notas a1 ou a2 não informadas");
    expect(() => calcularMediaAluno(8, undefined)).toThrow("Notas a1 ou a2 não informadas");
  });

  test("deve lançar erro se a1 ou a2 forem negativos", () => {
    expect(() => calcularMediaAluno(-1, 7)).toThrow("Notas a1 ou a2 não podem ser negativas");
    expect(() => calcularMediaAluno(6, -5)).toThrow("Notas a1 ou a2 não podem ser negativas");
  });

  test("deve calcular média base quando a3 não é informada", () => {
    expect(calcularMediaAluno(5, 7)).toBeCloseTo(6.2, 1);
  });

  test("deve lançar erro se a3 for negativa", () => {
    expect(() => calcularMediaAluno(6, 7, -2)).toThrow("Nota a3 não pode ser negativa");
  });

  test("deve escolher a melhor média entre a1 e a3", () => {
    expect(calcularMediaAluno(9, 2, 10)).toBeCloseTo(9.6, 1);
  });

  test("deve escolher a melhor média entre a2 e a3", () => {
    expect(calcularMediaAluno(3, 9, 10)).toBeCloseTo(9.4, 1); 
  });
});
