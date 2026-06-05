const exp = require("express");

const {
    handleBookStoreController,
    handleBookListController,handleUpdateBookController,handleDeleteBookController
} = require("../controller/book.controller.js");

const router = exp.Router();

router.post("/addbook", handleBookStoreController);
router.get("/booklists", handleBookListController);
router.put('/updatebook/:id',handleUpdateBookController);
router.delete("/deletebook/:id",handleDeleteBookController);
module.exports = router;