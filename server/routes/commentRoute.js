const {
  createAnewComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const router = require("express").Router();

router
  .post("/create", createAnewComment)
  .put("/:id", updateComment)
  .delete("/:id", deleteComment);

module.exports = router;
