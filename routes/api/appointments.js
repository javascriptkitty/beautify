const router = require("express").Router();
const appointmentsController = require("../../controllers/appointmentsController");
const usersController = require("../../controllers/usersController");

// Matches with "/api/appointments"

router.route("/appointments").post(appointmentsController.create);

router.route("/user/:id/appointments").get(usersController.findAllBooked);

module.exports = router;
