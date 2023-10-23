const router = require("express").Router();
const postController = require("../controllers/post.controller");
const auth = require("../middlewares/auth.middleware");
const multer = require("../middlewares/multer-config.middleware");

router.get('/', postController.read);
router.post('/:type', auth, multer, postController.create);
router.put('/:id', auth, postController.update);
router.delete('/:id', auth, postController.delete);
router.patch('/:id/like', postController.like);

module.exports = router;