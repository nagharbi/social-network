const router = require("express").Router();
const userController = require("../controllers/user.controller");
const auth = require('../middlewares/auth.middleware');
const multer = require("../middlewares/multer-config.middleware");

router.get("/", userController.getAll);
router.get("/token-check", auth, userController.tokenCheck);
router.get("/:id", auth, userController.getOne);
router.put("/:id", auth, userController.update);
router.delete("/:id", auth, userController.delete);
router.patch("/:id/follow", auth, userController.follow);
router.patch("/:id/unfollow", auth, userController.unfollow);
router.post("/:id/upload/:type", auth, multer, userController.upload);

module.exports = router;
