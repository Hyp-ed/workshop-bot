const express = require('express');
const asyncMiddleware = require('../../utils');
const router = express.Router();
const Stage = require('../../controllers/Stage');
const Team = require('../../models/Team');

router.post('/', asyncMiddleware(async (req, res, next) => {
    console.log(req.body);
    const repository_url = req.body.repository.ssh_url;
    const team = await Team.get(repository_url);
    const test = await Stage.runTests(team[0]);
    
    if (test.success) {
        const rowsUpdated = await Team.updateStage(repository_url, test.next_stage);
        console.log("PASSED", repository_url, team.team_name);
    } else {
        console.log("FAILED", repository_url, team.team_name);
    }
    
    res.send({ success: true });
}));

module.exports = router;
