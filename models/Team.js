const uuid = require('uuid4');
const knex = require('knex')(require('../config.js'));
const table = 'teams';
const initial_stage = require('../configs/stageConfig.js').initialStage;

module.exports = {
    get(repository_url = null) {
        if (repository_url !== null) {
            return knex.select().where({ repository_url }).from(table);
        } else {
            return knex.select().from(table);
        }
    },
    async save(team_name, repository_url) {
        const repository_id = uuid();
        const stage = initial_stage;
        const insert_id = await knex(table).insert({ repository_id, repository_url, team_name, stage, console: 'repository saved' });
        if (insert_id.length > 0) {
            return this.get(repository_url);
        }
    },
    async updateStage(repository_url, stage) {
        return knex(table).where({ repository_url }).update({ stage });
    },
    getConsole(repository_url) {
        return knex.select('console').where({ repository_url }).from(table);
    },
    clearConsole(repository_url) {
        return knex(table).where({ repository_url }).update({ 'console': '' });
    },
    async appendConsole(repository_url, message) {
        try {
            const current = await this.getConsole(repository_url);
            const cons = 'Output:\n' + message + '\n=========================================================\n' + current[0].console;
            return knex(table).where({ repository_url }).update({ 'console': cons });
        } catch(e) {
            console.log(e);
        }
    },
    delete(repository_url) {
        return knex(table).where({ repository_url }).del();
    }
};
