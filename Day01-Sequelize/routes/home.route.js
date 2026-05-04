const express = require("express");
const router = express.Router();
const homeController = require("../controller/home.controller");

router.get("/", homeController.getHomePage);
router.get("/home", homeController.getHomePage);
router.get("/about", homeController.getAboutPage);
router.get("/crud", homeController.getCRUD);
router.post("/post-crud", homeController.postCRUD);
router.get("/get-crud", homeController.getFindAllCrud);
router.get("/edit-crud", homeController.getEditCRUD);
router.post("/put-crud", homeController.putCRUD);
router.get("/delete-crud", homeController.deleteCRUD);

module.exports = router;
