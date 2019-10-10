
const Sequelize = require("sequelize");
const db = require("../db/models");
const Op = Sequelize.Op;

function updateUser(userId, isProvider) {
  return db.user.update(
        {isProvider}, 
        {where: {id: userId}});       
}

// Defining methods for the Controller
module.exports = {
  create: function(req, res) {
    debugger;
    // const provider = req.body;
    // provider.img = "no image";
    // provider.workingHours = "no working hours";

    let newProviderJson;
    
    db.provider
      .create(req.body) // create the provider
      .then(dbModel => { // then, update the user
        newProviderJson = dbModel; // 
        return updateUser(req.body.userId, 1);     
      })
      .then(()=> { // then, send the provider info back 
      // dbModel is not in scope here (because its in another function, can't see it here)
      // so we stashed the value in newProviderJson and return it here
        res.json(newProviderJson)
      })
      .catch(err => res.status(422).json(err));
  },
  getProviderInfo: function (req, res) {
    db.provider
    .findAll({ 
      where: {id: req.params.id},
       include: [
          {
            model: db.service,
            required: false          
          }
        ]
             })
    .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  }
};
