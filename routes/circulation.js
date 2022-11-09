const CirculationController = require('../controller/circulation');
const Authentication = require('../middlewares/authentication');
const router = require('express').Router();

router.get('/borrow-request', CirculationController.getBorrowRequest)
router.get('/approved-request', Authentication.librarian, CirculationController.getApprovedList)
router.get('/book-out', Authentication.librarian, CirculationController.getBookOut)

router.post('/borrow-request/:id', Authentication.user, CirculationController.postBorrowRequest)
router.patch('/approve-request/:id', Authentication.librarian, CirculationController.approveRequest)
router.patch('/book-out/:id', Authentication.librarian, CirculationController.bookOut)
router.patch('/book-returned/:id', Authentication.librarian, CirculationController.bookReturned)

module.exports = router