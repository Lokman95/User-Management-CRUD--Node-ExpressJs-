const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.view);
router.post("/", userController.find);
router.get("/create", userController.form);
router.post("/create", userController.add);
router.get("/edit/:id", userController.update);
router.post("/edit/:id", userController.saveUpdate);
router.get("/:id", userController.delete);
router.get("/viewuser/:id", userController.viewUser);
module.exports = router;
