module.exports.validateInputCreate = (input) => {
  if (!input) {
    return {
      message: "Bad request!",
      pass: false,
    };
  }

  if (!input.hasOwnProperty("name")) {
    return {
      message: "Name not exist!",
      pass: false,
    };
  }
  if (typeof input.name !== "string") {
    return {
      message: "Name is not string!",
      pass: false,
    };
  }

  if (!input.hasOwnProperty("age")) {
    return {
      message: "Age not exist!",
      pass: false,
    };
  }
  if (isNaN(input.age)) {
    return {
      message: "Age is not number!",
      pass: false,
    };
  }
  return { pass: true };
};
