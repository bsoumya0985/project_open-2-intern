const express = require("express")
const router = express.Router()

const collegeController = require("../controllers/collegeControllers")
const internController = require("../controllers/internController")

router.post("/functionup/colleges", collegeController.createCollege)
router.post("/functionup/interns", internController.internCreate)
router.get("/functionup/collegeDetails", collegeController.getInternListOfCollege)


module.exports = router
