const express = require('express');
const issueTracker = require('../controller/issueController');
const router = express.Router();

router.get('/', issueTracker.issueTrackerPage)
router.get('/createProject', issueTracker.createProject)
router.post('/addProject', issueTracker.addProjectToMongoDB)
router.get('/projectDetails', issueTracker.projectDetails)
router.post('/filterProjectDetails', issueTracker.filterProjectDetails)
router.get('/createAnIssue/:id', issueTracker.createAnIssue)
router.post('/createAnIssue/:id/addIssue', issueTracker.addAnIssue)

module.exports = router;