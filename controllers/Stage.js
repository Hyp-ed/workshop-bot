const exec = require('child_process').exec;
const asyncExec = require('async-child-process');
const join = asyncExec.join;
const childPrinted = asyncExec.childPrinted;
const Team = require('../models/Team');
const stageConfig = require('../configs/stageConfig.js');
const winston = require('winston');
const uuid = require('uuid');

function execute(command, assert) {
  const child = exec(command);
  return childPrinted(child, assert);
}




var stages = stageConfig.stages;

module.exports = {
    async runTests(team) {
        const id = uuid.v1();// team.team_name;
        
        const stage = stages[team.stage];
        try {
            await join(exec(`cd repositories/${team.repository_id} && git pull origin master`));
            winston.log('info', `[${id}] git pull`);
            
            stage.preScriptFiles.forEach(async file => {
                await join(exec(`cp ${file} repositories/${team.repository_id}`));
                winston.log('info', `[${id}] copy ${file}`);
            });
            
            
            await join(exec(`cp ${stage.script} repositories/${team.repository_id}/test.sh`));
            winston.log('info', `[${id}] copy ${stage.script}`);
            
            const message = await execute(`cd repositories/${team.repository_id} && ./test.sh`, /.*/);
            winston.log('info', `[${id}] run ${stage.script}`);
            
            await join(exec(`rm repositories/${team.repository_id}/test.sh`));
            winston.log('info', `[${id}] remove ${stage.script}`);
        
            stage.preScriptFiles.forEach(async file => {
                let filename = file.split('/')[file.split('/').length-1];
                await join(exec(`cd repositories/${team.repository_id} && rm ${filename}`));
                winston.log('info', `[${id}] delete ${file}`);
            });
            
            
            if (stage.assert.test(message)) {
                winston.log('info', `[${id}] test passed`);
                stage.files.forEach(async file => {
                     await join(exec(`cp ${file} repositories/${team.repository_id}`));
                     winston.log('info', `[${id}] copy ${file}`);
                });
                
                await join(exec(`rm repositories/${team.repository_id}/README.md`));
                winston.log('info', `[${id}] remove ${stage.readme}`);
                
                join(exec(`cp ${stage.readme} repositories/${team.repository_id}/README.md`));
                winston.log('info', `[${id}] add new ${stage.readme}`);
                
                await join(exec(`cd repositories/${team.repository_id} && git add -A`));
                winston.log('info', `[${id}] git add -A`);
                
                await join(exec(`cd repositories/${team.repository_id} && git commit -m "${stage.commit_message}"`));
                winston.log('info', `[${id}] git commit -m "${stage.commit_message}"`);
                
                await join(exec(`cd repositories/${team.repository_id} && git push`));
                winston.log('info', `[${id}] git push`);
                
                await Team.appendConsole(team.repository_url, message);
                await Team.appendConsole(team.repository_url, 'Test passed!');
                
                return { success: true, next_stage: stage.next_stage };
            } else {
                winston.log('warn', `[${id}] test failed`);
                winston.log('warn', `[${id}] output: ${message}`);
                
                await Team.appendConsole(team.repository_url, message);
                await Team.appendConsole(team.repository_url, 'Test failed!');
                
                return { success: false, next_stage: team.stage };
            }
        } catch(e) {
            winston.log('warn', `[${id}] test failed`);
            winston.log('error', `[${id}] fatal error ${e}`);
            winston.log('warn', `[${id}] reverting to original state`);
            
            stage.preScriptFiles.forEach(async file => {
                let filename = file.split('/')[file.split('/').length-1];
                await join(exec(`cd repositories/${team.repository_id} && rm ${filename}`));
                winston.log('warn', `[${id}] delete ${file}`);
            });
            
            await Team.appendConsole(team.repository_url, e.name + ': ' + e.message);
            await Team.appendConsole(team.repository_url, 'Test failed! (contact support something is fucked)');
            
            return { success: false, next_stage: team.stage };
        }
    }
};
