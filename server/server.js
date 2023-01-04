const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

app.listen(3000, (err) => {
  if (!err) {
    console.log("running on port 3000");
  }
});
