const CustomerController = require("../controllers/customerController");
const { authentication } = require("../middlewares/authentication");
const router = require("express").Router();

router.post("/register", CustomerController.register);
router.post("/login", CustomerController.login);
router.post("/google-login", CustomerController.googleLogin);
router.get("/mangas", CustomerController.getMangas);
router.get("/mangas/:id", CustomerController.getMangaDetail);
router.get("/quotes", CustomerController.getQuotes);

router.use(authentication);
router.post("/bookmarks/:mangaId", CustomerController.addBookmark);
router.get("/bookmarks", CustomerController.getBookmarks);

module.exports = router;
