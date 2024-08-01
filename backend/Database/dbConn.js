const mongoose = require("mongoose");
const uri = process.env.URI;
const connectdb = async (req, res) => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose
      .connect(uri, { dbName: "todo-Manager" })
      .then((e) => {
        console.log(`Mongodb connected successfully !`);
      })
      .catch((err) => {
        setTimeout(() => {
          console.error("no Internet " + err.message);
        });
      }, 3000);
  } catch (error) {
    console.error(error.message);
    res.status(404).send({
      message: "Db Connection failure",
    });
    process.exit();
  }
};
module.exports = { connectdb };
