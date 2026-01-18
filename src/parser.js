//functions are designed to return a value and an array of the remaining of the array not yet parsed

function parseValue(input) {
  //console.log(input)
  let current = input[0];

  if (current === "{") {
    return parseObject(input.slice(1));
  } else if (current === "[") {
    return parseArray(input.slice(1));
  } else if (
    typeof current === "string" ||
    typeof current === "number" ||
    typeof current === "boolean" ||
    current === null
  ) {
    return [current, input.slice(1)];
  } else {
    throw new Error(`unexpected token: ${current}`);
  }
}

function parseArray(input) {
  let arr = [];
  let current = input[0];

  if (input.length > 1 && current === "]") {
    return [arr, input.slice(1)];
  }

  while (current !== "]") {
    let [arrVal, remainingInput] = parseValue(input);
    arr.push(arrVal);

    current = remainingInput[0];
    if (current === "]") {
      return [arr, remainingInput.slice(1)];
    } else if (current !== ",") {
      throw new Error("Expected comma after object in array");
    }

    input = remainingInput.slice(1);
  }
}

function parseObject(input) {
  let obj = {};
  let current = input[0];

  if (current === "}") {
    return [obj, input.slice(1)];
  }

  while (input.length > 1 && current !== "}") {
    let jsonKey = input[0];
    if (typeof jsonKey === "string") {
      input = input.slice(1);
    } else {
      throw new Error(`Expected string key, got: ${jsonKey}`);
    }

    if (input[0] !== ":") {
      throw new Error(`Expected colon after key in object, got: ${current}`);
    }

    let [jsonValue, remainingInput] = parseValue(input.slice(1));

    obj[jsonKey] = jsonValue;

    current = remainingInput[0];
    if (current === "}") {
      return [obj, remainingInput.slice(1)];
    } else if (current !== ",") {
      throw new Error(`Expected comma after pair in object, got: ${current}`);
    }

    input = remainingInput.slice(1);
  }

  return obj;
}

module.exports = parseValue;
