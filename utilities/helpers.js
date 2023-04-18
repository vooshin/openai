module.exports = {
  stringToJSON: (string) => {
    try {
    console.log("string", string)
      const start = string.indexOf("{");
      const end = string.lastIndexOf("}");
      const sliced = string.slice(start, end + 1);
      return {
        status: true,
        response: JSON.parse(sliced),
        error: null,
      };
    } catch (error) {
        console.log("error string", string)
      return {
        status: false,
        response: null,
        error: error,
      };
    }
  },
};
