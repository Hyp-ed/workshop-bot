const exec = require('child_process').exec;
const asyncExec = require('async-child-process');
const join = asyncExec.join;
const execAsync = asyncExec.execAsync;
const Team = require('../models/Team');
const stageConfig = require('../configs/stageConfig.js');
const winston = require('winston');
const uuid = require('uuid');

var stages = stageConfig.stages;

module.exports = {
    async runTests(team) {
        const id = uuid.v1();
        if (!(team.stage in stages)) {
            winston.log('warn', `[${id}][${team.team_name}] Stage (${team.stage}) not found.`);
            await Team.appendConsole(team.repository_url, `<p>All tasks <span class="success">DONE</span>! Congrats<p>`);
            return { success: false, next_stage: team.stage };
        }
        
        const stage = stages[team.stage];
        
        try {
            await join(exec(`cd repositories/${team.repository_id} && git pull origin master`));
            winston.log('info', `[${id}][${team.team_name}] cd repositories/${team.repository_id} && git pull origin master`);
            
            stage.preScriptFiles.forEach(async file => {
                await join(exec(`cp ${file} repositories/${team.repository_id}`));
                winston.log('info', `[${id}][${team.team_name}] cp ${file} repositories/${team.repository_id}`);
            });
            
            await join(exec(`cp ${stage.script} repositories/${team.repository_id}/test.sh`));
            winston.log('info', `[${id}][${team.team_name}] cp ${stage.script} repositories/${team.repository_id}/test.sh`);
            
            const { stdout, stderr } = await execAsync(`cd repositories/${team.repository_id} && ./test.sh`);
            winston.log('info', `[${id}][${team.team_name}] cd repositories/${team.repository_id} && ./test.sh`);
            
            const error = stderr;
            const message = stdout;
            
            await join(exec(`rm repositories/${team.repository_id}/test.sh`));
            winston.log('info', `[${id}][${team.team_name}] rm repositories/${team.repository_id}/test.sh`);
        
            stage.preScriptFiles.forEach(async file => {
                let filename = file.split('/')[file.split('/').length-1];
                await join(exec(`cd repositories/${team.repository_id} && rm ${filename}`));
                winston.log('info', `[${id}][${team.team_name}] cd repositories/${team.repository_id} && rm ${filename}`);
            });
            
            if (stage.assert.test(message) && error == "") {
                winston.log('info', `[${id}][${team.team_name}] Test PASSED`);
                winston.log('info', `[${id}][${team.team_name}] Output: ${message}`);
                
                stage.files.forEach(async file => {
                     await join(exec(`cp ${file} repositories/${team.repository_id}`));
                     winston.log('info', `[${id}][${team.team_name}] cp ${file} repositories/${team.repository_id}`);
                });
                
                await join(exec(`rm repositories/${team.repository_id}/README.md`));
                winston.log('info', `[${id}][${team.team_name}] rm repositories/${team.repository_id}/README.md`);
                
                await join(exec(`cp ${stage.readme} repositories/${team.repository_id}/README.md`));
                winston.log('info', `[${id}][${team.team_name}] cp ${stage.readme} repositories/${team.repository_id}/README.md`);
                
                await join(exec(`cd repositories/${team.repository_id} && git add -A`));
                winston.log('info', `[${id}][${team.team_name}] cd repositories/${team.repository_id} && git add -A`);
                
                await join(exec(`cd repositories/${team.repository_id} && git commit -m "${stage.commit_message}"`));
                winston.log('info', `[${id}][${team.team_name}] git commit -m "${stage.commit_message}"`);
                
                await join(exec(`cd repositories/${team.repository_id} && git push`));
                winston.log('info', `[${id}][${team.team_name}] git push`);
                
                await Team.appendConsole(team.repository_url, `<p>Test <span class="success">PASSED</span></p><div>${message}</div>`);
                
                return { success: true, next_stage: stage.next_stage };
            } else {
                winston.log('warn', `[${id}][${team.team_name}] Test FAILED`);
                winston.log('warn', `[${id}][${team.team_name}] Output:\n${error}\n${message}`);
                
                await Team.appendConsole(team.repository_url, `<p>Test <span class="error">FAILED</span></p><div>${error}</div><div>${message}</div>`);
                
                return { success: false, next_stage: team.stage };
            }
        } catch(e) {
            winston.log('warn', `[${id}][${team.team_name}] Test FAILED`);
            winston.log('error', `[${id}][${team.team_name}] FATAL ERROR ${e}`);
            winston.log('warn', `[${id}][${team.team_name}] reverting to original state`);
            
            stage.preScriptFiles.forEach(async file => {
                let filename = file.split('/')[file.split('/').length-1];
                await join(exec(`cd repositories/${team.repository_id} && rm ${filename}`));
                winston.log('warn', `[${id}][${team.team_name}] delete ${file}`);
            });
            
            await Team.appendConsole(team.repository_url, `<p>Test <span class="error">FAILED</span></p><div>${e}</div>`);
            
            return { success: false, next_stage: team.stage };
        }
    }
};
