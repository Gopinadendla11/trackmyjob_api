const applicationModel = require("../model/applicationModel");

exports.newApplication = async (req, res) => {
  const appData = req.body;
  appData.createdBy = req.data.user_id;
  appData.createdAt = new Date();
  console.log(appData);
  if (!(appData.companyName && appData.jobRole && appData.jobLink))
    return res.status(400).send("Company Name and Job details are required");
  else {
    try {
      result = await new applicationModel(appData).save();
      return res.status(200).send("Application Saved Successfully");
    } catch (error) {
      console.log(error);
    }
  }
};

exports.getApplications = async (req, res) => {
  const user = req.data.user_id;
  console.log("getApplications");
  try {
    const appData = await applicationModel.find({ createdBy: user });
    return res.status(200).send(appData);
  } catch (err) {
    console.log(err);
  }
};

exports.updateStatus = async (req, res) => {
  const user = req.body._id;
  const temp_status = req.body.status;
  try {
    const result = await applicationModel.findByIdAndUpdate(user, {
      status: temp_status,
    });
    return res.status(200).send("Success");
  } catch (err) {
    console.log(err);
  }
};

exports.deleteApplications = async (req, res) => {
  console.log("Delete applications called");
  const user = req.body._id;
  const appData = req.body;
  try {
    const result = await applicationModel.deleteMany({ _id: { $in: appData } });
  } catch (err) {
    console.log(err);
  }
  return res.status(200).send(appData);
};
