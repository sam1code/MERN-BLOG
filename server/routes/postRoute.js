const {
  createAnewPost,
  getAllPosts,
  updatePost,
  getAPost,
  deletePost,
} = require("../controllers/postControllers");

const router = require("express").Router();

router
  .post("/create", createAnewPost)
  .get("/all", getAllPosts)
  .put("/:id", updatePost)
  .get("/:id", getAPost)
  .delete("/:id", deletePost);


// router.post("/comment/getall")
module.exports = router;
