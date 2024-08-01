const express = require("express");
const router = express.Router();
const controllers = require("../Controller/auth.controller");
//to check functioning of API
router.get("/", (req, response) => {
  // Setting up Headers
  response.setHeader("Content-Type", "text/html");
  response.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]);
  response.setHeader("X-Foo", "bar");

  // Calling response.writeHead method
  response.writeHead(200, {
    "Content-Type": "text/plain",
  });

  // Getting the set Headers
  const headers = response.getHeaders();

  // Printing those headers
  console.log(headers);

  // browser in response
  response.end("ok");
});
router.post("/api/signin", controllers.signInUser);
router.post("/api/signup", controllers.SignupEmailO);
router.post("/api/add/task", controllers.addTask);
router.get("/api/fetch/tasks", controllers.getTasks);
router.put("/api/edit/todo", controllers.editTodo);
router.post("/api/update/:id", controllers.updatetask);

module.exports = router;
