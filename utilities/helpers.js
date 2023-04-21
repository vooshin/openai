const fs = require("fs");
const path = require("path");
const BASE_FILE_PATH = path.join(path.resolve("./"), "/demo");
module.exports = {
  stringToJSON: (string) => {
    try {
      console.log("string", string);
      const start = string.indexOf("{");
      const end = string.lastIndexOf("}");
      const sliced = string.slice(start, end + 1);
      return {
        status: true,
        response: JSON.parse(sliced),
        error: null,
      };
    } catch (error) {
      console.log("error string", string);
      return {
        status: false,
        response: null,
        error: error,
      };
    }
  },
  saveText: ({ x, y, name }) => {
    const default_name = name ?? "data";
    try {
      fs.appendFileSync(
        path.join(BASE_FILE_PATH, `${default_name}.txt`),
        `message:${x}\n\n ai:${y}\n\n\n`,
        "UTF8"
      );
      console.log("saved");

      return {
        status: true,
        error: null,
      };
    } catch (error) {
      console.log("error", error);
      return {
        status: false,
        error: error,
      };
    }
  },
};
