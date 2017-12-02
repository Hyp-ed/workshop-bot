console.log('Connecting to database: ');
var knex = require('knex')(require('../config.js'));

knex.schema.createTable('teams', table => {
    table.string('repository_url').primary().unique();
    table.string('team_name');
    table.string('repository_id');
    table.integer('stage');
    table.string('console');
}).then(() => {
    console.log('Created TEAMS table');
    knex.destroy(() => {
        console.log("Closing connection");
    });
}).catch(error => {
    console.log(error);
});