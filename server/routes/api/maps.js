const Map = require("../../models/Map");
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

module.exports = app => {
  app.get("/api/maplist", (req, res, next) => {
    Map.find({})
      .exec()
      .then(map => res.json(map))
      .catch(err => next(err));
  });

  app.post("/api/saveMap", function (req, res, next) {
    let data = {
      mapName: req.body.mapName,
      elements: req.body.elements
    }
    const map = new Map(data);
    map
      .save()
      .then(() => res.json(map))
      .catch(err => next(err));
  });
};
