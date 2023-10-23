const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/:id', auth, commentController.comment);
router.put('/:id', auth, commentController.edit);
router.delete('/:id', auth, commentController.delete);

module.exports = router;