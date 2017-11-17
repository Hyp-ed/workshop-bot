const express = require('express');
const asyncMiddleware = require('../../utils');
const router = express.Router();
const Stage = require('../../controllers/Stage');
const Team = require('../../models/Team');

router.post('/', asyncMiddleware(async (req, res, next) => {
    const repository_url = req.body.repository.clone_url;
    const team = await Team.get(repository_url);
    const correct = await Stage.runTests(team[0]);
    
    if (correct) {
        const rowsUpdated = await Team.updateStage(repository_url);
        console.log("PASSED", rowsUpdated);
    } else {
        // await Team.setError(repository_url);
        console.log("FAILED")
    }
    
    res.send({ success: true });
}));

module.exports = router;