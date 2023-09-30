const { ObjectId } = require("mongodb");
const { getDbConnection } = require("../config/mongodb");

function filterBy(filterType, projectDetails) {
  for (let check = 0; check < projectDetails.length; ++check) {
    for (let index = 0; index < projectDetails.length - 1; ++index) {
      let temp = null;
      if (
        projectDetails[index][filterType] >
        projectDetails[index + 1][filterType]
      ) {
        temp = projectDetails[index];
        projectDetails[index] = projectDetails[index + 1];
        projectDetails[index + 1] = temp;
      }
    }
  }
}

module.exports.issueTrackerPage = async (req, res) => {
  const collection = getDbConnection().collection("IssueTrackerBySuraj");
  const addedProject = await collection.find({ id: "addedProject" }).toArray();
  return res.render("issueTracker", {
    title: "Issue Tracker",
    addedProject,
  });
};

module.exports.createProject = (req, res) => {
  return res.render("createProject", {
    title: "Create Project",
  });
};

module.exports.addProjectToMongoDB = async (req, res) => {
  let formData = req.body;
  formData = { ...formData, id: "addedProject" };
  const collection = getDbConnection().collection("IssueTrackerBySuraj");
  collection.insertOne(formData, (err, data) => {
    if (err) throw err;
    else if (data) console.log("data inserted");
  });
  res.redirect("/issueTracker");
};

module.exports.projectDetails = async (req, res) => {
  const collection = getDbConnection().collection("IssueTrackerBySuraj");
  let projectDetails = await collection.find({ id: "addedProject" }).toArray();
  return res.render("projectDetails", {
    title: "Project Details",
    projectDetails,
  });
};

module.exports.filterProjectDetails = async (req, res) => {
  const collection = getDbConnection().collection("IssueTrackerBySuraj");
  let projectDetails = await collection.find({ id: "addedProject" }).toArray();

  filterBy(req.body.flexRadio, projectDetails);

  return res.render("projectDetails", {
    title: "Project Details",
    projectDetails,
  });
};

module.exports.createAnIssue = async (req, res) => {
  const issueId = req.params;
  return res.render("createIssue", { title: "Create Issue", issueId });
};

module.exports.addAnIssue = async (req, res) => {
  // console.log(req.params);
  // console.log(req.body);
  const issue = req.body;
  const bugId = req.params.id;
  const collection = getDbConnection().collection("IssueTrackerBySuraj");
  await collection.findOneAndUpdate(
    { _id: ObjectId(bugId) },
    { $push: { bugs: issue } }
  );
  res.redirect("/issueTracker/projectDetails");
};
