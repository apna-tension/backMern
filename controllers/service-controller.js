
const Service = require('../models/service-model');

const services = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response) {
      res.status(404).json("No services found");
      return;
    }
    // console.log("response : ", response);

    res.status(200).json({response});
  } catch (err) {
    res.status(500).json("Internal server error : " + err);
  }
};

module.exports = services;