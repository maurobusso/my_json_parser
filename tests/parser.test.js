const { parseValue } = require("../src/parser");

describe("Parser Tests", () => {
  describe("Primitives", () => {
    test("should parse boolean true", () => {
      const [result, remaining] = parseValue([true]);
      expect(result).toBe(true);
      expect(remaining).toEqual([]);
    });

    test("should parse boolean false", () => {
      const [result] = parseValue([false]);
      expect(result).toBe(false);
    });

    test("should parse null", () => {
      const [result] = parseValue([null]);
      expect(result).toBeNull();
    });

    test("should parse string", () => {
      const [result] = parseValue(["hello"]);
      expect(result).toBe("hello");
    });

    test("should parse number", () => {
      const [result] = parseValue([123]);
      expect(result).toBe(123);
    });
  });

  describe("Objects", () => {
    test("should parse empty object", () => {
      const [result] = parseValue(["{", "}"]);
      expect(result).toEqual({});
    });

    test("should parse simple object", () => {
      const [result] = parseValue(["{", "key", ":", "value", "}"]);
      expect(result).toEqual({ key: "value" });
    });

    test("should parse object with multiple pairs", () => {
      const [result] = parseValue([
        "{",
        "name",
        ":",
        "John",
        ",",
        "age",
        ":",
        30,
        "}",
      ]);
      expect(result).toEqual({ name: "John", age: 30 });
    });
  });

  describe("Arrays", () => {
    test("should parse empty array", () => {
      const [result] = parseValue(["[", "]"]);
      expect(result).toEqual([]);
    });

    test("should parse simple array", () => {
      const [result] = parseValue(["[", "item1", ",", "item2", "]"]);
      expect(result).toEqual(["item1", "item2"]);
    });

    test("should parse array with mixed types", () => {
      const [result] = parseValue(["[", 1, ",", "hello", ",", true, "]"]);
      expect(result).toEqual([1, "hello", true]);
    });

    test("should parse nested array", () => {
      const [result] = parseValue(["[", "[", 1, ",", 2, "]", ",", 3, "]"]);
      expect(result).toEqual([[1, 2], 3]);
    });
  });

  describe("Nested Structures", () => {
    test("should parse object with nested array", () => {
      const [result] = parseValue([
        "{",
        "items",
        ":",
        "[",
        1,
        ",",
        2,
        "]",
        "}",
      ]);
      expect(result).toEqual({ items: [1, 2] });
    });

    test("should parse array with nested object", () => {
      const [result] = parseValue(["[", "{", "id", ":", 1, "}", "]"]);
      expect(result).toEqual([{ id: 1 }]);
    });
  });

  describe("Error Cases", () => {
    test("should reject non-string object key", () => {
      expect(() => parseValue(["{", 123, ":", "value", "}"])).toThrow(
        "Expected string key",
      );
    });

    test("should reject missing colon in object", () => {
      expect(() => parseValue(["{", "key", "value", "}"])).toThrow(
        "Expected colon",
      );
    });

    test("should reject missing comma in array", () => {
      expect(() => parseValue(["[", 1, 2, "]"])).toThrow("Expected comma");
    });

    test("should reject unexpected token", () => {
      expect(() => parseValue([undefined])).toThrow("unexpected token");
    });
  });
});
