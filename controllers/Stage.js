const exec = require('child_process').exec;
const asyncExec = require('async-child-process');
const join = asyncExec.join;
const childPrinted = asyncExec.childPrinted;
const Team = require('../models/Team');
const stageConfig = require('../configs/stageConfig.js');

function execute(command, assert) {
  const child = exec(command);
  return childPrinted(child, assert);
}

var stages = stageConfig.stages;
 
module.exports = {
    async runTests(team) {
        const stage = stages[team.stage];
        try {
            await join(exec(`cd repositories/${team.repository_id} && git pull origin master`));
            console.log("git pull", team.team_name)
            
            stage.preScriptFiles.forEach(async file => {
                await join(exec(`cp ${file} repositories/${team.repository_id}`));
            });
            console.log("copy preScriptFiles")
            
            var message = await execute(`cp ${stage.script} repositories/${team.repository_id}/test.sh && cd repositories/${team.repository_id} && ./test.sh && rm test.sh`, /./);
            console.log("run test", team.team_name);
            console.log("test output:", message, team.team_name);
            
            
            stage.preScriptFiles.forEach(async file => {
                let filename = file.split('/')[file.split('/').length-1];
                await join(exec(`cd repositories/${team.repository_id} && rm ${filename}`));
            });
            console.log("delete preScriptFiles", team.team_name)
            
            if (stage.assert.test(message)) {
                stage.files.forEach(async file => {
                     await join(exec(`cp ${file} repositories/${team.repository_id}`));
                });
                console.log("copy files", team.team_name)
                
                await join(exec(`rm repositories/${team.repository_id}/README.md && cp ${stage.readme} repositories/${team.repository_id}/README.md`));
                console.log("replace README", team.team_name);
                
                await join(exec(`cd repositories/${team.repository_id} && git add -A && git commit -m "${stage.commit_message}" && git push`));
                console.log("add, commit & push", team.team_name);
                
                await Team.appendConsole(team.repository_url, message);
                await Team.appendConsole(team.repository_url, 'Test passed!');
                
                return { success: true, next_stage: stage.next_stage };
            } else {
                await Team.appendConsole(team.repository_url, message);
                await Team.appendConsole(team.repository_url, 'Test failed!');
                
                return { success: false, next_stage: team.stage };
            }
        } catch(e) {
            stage.preScriptFiles.forEach(async file => {
                let filename = file.split('/')[file.split('/').length-1];
                await join(exec(`cd repositories/${team.repository_id} && rm ${filename}`));
            });
            
            await Team.appendConsole(team.repository_url, e.name + ': ' + e.message);
            await Team.appendConsole(team.repository_url, 'Test failed! (contact support something is fucked)');
            
            return { success: false, next_stage: team.stage };
        }
    }
};
