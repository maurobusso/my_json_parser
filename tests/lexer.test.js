const lexerJSON = require("../src/lexer");

describe("Lexer Tests", () => {
  describe("Primitives", () => {
    test("should lex boolean true", () => {
      expect(lexerJSON("true")).toEqual([true]);
    });

    test("should lex boolean false", () => {
      expect(lexerJSON("false")).toEqual([false]);
    });

    test("should lex null", () => {
      expect(lexerJSON("null")).toEqual([null]);
    });

    test("should lex string", () => {
      expect(lexerJSON('"hello"')).toEqual(["hello"]);
    });

    test("should lex number", () => {
      expect(lexerJSON("123")).toEqual([123]);
    });
  });

  describe("Collections", () => {
    test("should lex empty object", () => {
      expect(lexerJSON("{}")).toEqual(["{", "}"]);
    });

    test("should lex empty array", () => {
      expect(lexerJSON("[]")).toEqual(["[", "]"]);
    });

    test("should lex object with key-value", () => {
      expect(lexerJSON('{"key":"value"}')).toEqual([
        "{",
        "key",
        ":",
        "value",
        "}",
      ]);
    });

    test("should lex array with values", () => {
      expect(lexerJSON("[1,2,3]")).toEqual(["[", 1, ",", 2, ",", 3, "]"]);
    });
  });

  describe("Whitespace", () => {
    test("should ignore spaces", () => {
      expect(lexerJSON("{ }")).toEqual(["{", "}"]);
    });

    test("should ignore tabs and newlines", () => {
      expect(lexerJSON("{\n\t}")).toEqual(["{", "}"]);
    });
  });

  describe("Error Cases", () => {
    test("should reject number with leading zero", () => {
      expect(() => lexerJSON("0123")).toThrow("Error in parsing the number");
    });

    test("should reject invalid number", () => {
      expect(() => lexerJSON("12a34")).toThrow();
    });
  });
});
