const Sequelize = require("sequelize");
const db = require("../db/models");


module.exports = {
 findAllBooked: function(req, res) {
    db.appointments
      .findAll({
        where: {
          userId: req.params.userId
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}