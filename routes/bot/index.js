const express = require('express');
const asyncMiddleware = require('../../utils');
const router = express.Router();
const Stage = require('../../controllers/Stage');
const Team = require('../../models/Team');
const stageConfig = require('../../configs/stageConfig.js');


router.post('/', asyncMiddleware(async (req, res, next) => {
    const name = req.body.pusher.name;
    
    if (name != stageConfig.gitBotUsername) {
        const repository_url = req.body.repository.ssh_url;
        const team = await Team.get(repository_url);
        const test = await Stage.runTests(team[0]);
        console.log(test)
        
        if (test.success) {
            await Team.updateStage(repository_url, test.next_stage);
            console.log("PASSED", repository_url, team[0].team_name);
        } else {
            console.log("FAILED", repository_url, team[0].team_name);
        }
    }
    
    res.send({ success: true });
}));

module.exports = router;
