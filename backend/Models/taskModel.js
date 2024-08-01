const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    is_completed: {
      type: Boolean,
      default: false,
    },
    is_done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const taskModel = mongoose.model("todoTask", taskSchema);
module.exports = taskModel;
