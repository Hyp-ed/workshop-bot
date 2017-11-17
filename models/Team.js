const uuid = require('uuid4');
const knex = require('knex')(require('../config.js'));
const table = 'teams';

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
        const stage = 0;
        const insert_id = await knex(table).insert({ repository_id, repository_url, team_name, stage });
        if (insert_id.length > 0) {
            return this.get(repository_url);
        }
    },
    async updateStage(repository_url) {
        const team = await this.get(repository_url);
        const stage = team[0].stage + 1;
        console.log(stage)
        return knex(table).update({ stage });
    },
    delete(repository_url) {
        return knex(table).where({ repository_url }).del();
    }
};