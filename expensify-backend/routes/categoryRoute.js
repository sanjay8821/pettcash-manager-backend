const expresss = require("express");
const {
  destroy,
  create,
  update,
} = require("../controlers/category-controller");

const router = expresss.Router();

router.post("/", create);
router.delete("/:categoryId", destroy);
router.patch("/:categoryId", update);

module.exports = router;
