const express = require('express');
const asyncMiddleware = require('../../utils');
const router = express.Router();
const Team = require('../../models/Team');
const Git = require('../../controllers/Git');

router.get('/', asyncMiddleware(async (req, res, next) => {
    const response = {
        success: true,
        data: [],
        errors: []
    };
    
    const teams = await Team.get();
    response.data = teams;
    res.send(response);
}));

router.post('/new', asyncMiddleware(async (req, res, next) => {
    const response = {
        success: true,
        data: [],
        errors: []
    };
    
    const team_name = req.body.team_name;
    const repository_url = req.body.repository_url;
    
    if (team_name !== undefined && repository_url !== undefined) {
        const exists = await Team.get(repository_url);
        
        if (exists.length === 0) {
            const team = await Team.save(team_name, repository_url);
            const success = await Git.initializeRepo(team[0].repository_id, repository_url);
            
            if (success) {
                response.data = team;
            } else {
                response.success = false;
                response.errors.push('Error creating repository.');
            }
        } else {
            response.success = false;
            response.errors.push('Team with given repository already exists');
        }
    } else {
        response.success = false;
        if (team_name === undefined) response.errors.push('Missing team_name parameter.');
        if (repository_url === undefined) response.errors.push('Missing repository_url parameter.');
    }
    
    res.send(response);
}));

router.delete('/', asyncMiddleware(async (req, res, next) => {
    const response = {
        success: true,
        data: [],
        errors: []
    };
    
    const repository_url = req.body.repository_url;
    
    if (repository_url !== undefined) {
        const team = await Team.get(repository_url);
        Git.deleteRepo(team[0].repository_id);

        const linesAffected = await Team.delete(repository_url);
        
        response.data = [`Repositories deleted: ${linesAffected}`];
    } else {
        response.errors.push('Missing repository_url parameter.');
    }
    
    res.send(response);
}));


module.exports = router;