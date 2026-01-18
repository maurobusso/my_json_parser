const lexer = require("./src/lexer");
const parser = require("./src/parser");

function mainParse(jsonString) {
  const tokens = lexer(jsonString);
  const result = tokens[0];
  return result;
}

module.exports = mainParse;
