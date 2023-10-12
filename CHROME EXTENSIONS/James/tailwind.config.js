const withMT = require("@material-tailwind/html/utils/withMT");

module.exports = withMT({
  content: ["./popup.html"],
  theme: {
    extend: {},
  },
  plugins: [],
});
