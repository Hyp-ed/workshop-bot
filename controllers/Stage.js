const exec = require('child_process').exec;
const asyncExec = require('async-child-process');
const join = asyncExec.join;
const childPrinted = asyncExec.childPrinted;
const Team = require('../models/Team');

function execute(command, assert) {
  const child = exec(command);
  return childPrinted(child, assert);
}

var stages = {
    '0': {
        preScriptFiles: ['controllers/scripts/stage1/test.cpp', 'controllers/scripts/stage1/stage.mk'],
        script: 'controllers/scripts/stage1/test.sh',
        assert: /Name: \S.*/,
        readme: 'controllers/scripts/stage1/README.md',
        files: [],
        commit_message: 'Update README.md & exercise'
    },
    '1': {
        preScriptFiles: ['controllers/scripts/stage2/test.cpp', 'controllers/scripts/stage2/stage.mk'],
        script: 'controllers/scripts/stage2/test.sh',
        assert: /Maximum speed: [^0\s].*/,
        readme: 'controllers/scripts/stage2/README.md',
        files: [],
        commit_message: 'Update README.md & exercise'
    },
    '2': {
        preScriptFiles: ['controllers/scripts/stage3/test.cpp', 'controllers/scripts/stage3/stage.mk'],
        script: 'controllers/scripts/stage3/test.sh',
        assert: /Temperature: -?(([0-9]\.[0-9])|[1-9])/,
        readme: 'controllers/scripts/stage3/README.md',
        files: [],
        commit_message: 'Update README.md & exercise'
    },
    '3': {
        preScriptFiles: ['controllers/scripts/stage4/test.cpp', 'controllers/scripts/stage4/stage.mk'],
        script: 'controllers/scripts/stage4/test.sh',
        assert: /Pressure: -?(([0-9]\.[0-9])|[1-9])/,
        readme: 'controllers/scripts/stage4/README.md',
        files: [],
        commit_message: 'Update README.md & exercise'
    },
    '4': {
        preScriptFiles: [],
        script: 'controllers/scripts/stage5/test.sh',
        assert: /Pressure: -?(([0-9]\.[0-9])|[1-9])/,
        readme: 'controllers/scripts/stage5/README.md',
        files: [],
        commit_message: 'Update README.md & exercise'
    },
    '5': {
        preScriptFiles: ['controllers/scripts/stage6/stage.mk'],
        script: 'controllers/scripts/stage6/test.sh',
        assert: /.*/,
        readme: 'controllers/scripts/stage6/README.md',
        files: [],
        commit_message: 'Update README.md & exercise'
    },
    '6': {
        preScriptFiles: ['controllers/scripts/stage7/stage.mk', 'controllers/scripts/stage7/test.cpp'],
        script: 'controllers/scripts/stage7/test.sh',
        assert: /Acceleration: -?(([0-9]\.[0-9])|[1-9])/,
        readme: 'controllers/scripts/stage7/README.md',
        files: [],
        commit_message: 'Update README.md & exercise'
    },
    '7': {
        preScriptFiles: ['controllers/scripts/stage8/stage.mk', 'controllers/scripts/stage8/test.cpp'],
        script: 'controllers/scripts/stage8/test.sh',
        assert: /Position: -?(([0-9]\.[0-9])|[1-9])/,
        readme: 'controllers/scripts/stage8/README.md',
        files: [],
        commit_message: 'Update README.md & exercise'
    },
    '8': {
        preScriptFiles: ['controllers/scripts/stage9/stage.mk', 'controllers/scripts/stage9/test.cpp'],
        script: 'controllers/scripts/stage9/test.sh',
        assert: /Current: -?(([0-9]\.[0-9])|[1-9])/,
        readme: 'controllers/scripts/stage9/README.md',
        files: [],
        commit_message: 'Update README.md & exercise'
    },
    '9': {
        preScriptFiles: ['controllers/scripts/stage10/stage.mk', 'controllers/scripts/stage10/test.cpp'],
        script: 'controllers/scripts/stage10/test.sh',
        assert: /Acceleration: -?(([0-9]\.[0-9])|[1-9])/,
        readme: 'controllers/scripts/stage10/README.md',
        files: [],
        commit_message: 'Update README.md & exercise'
    }
};

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
                console.log("replace README", team.team_name)
                
                await join(exec(`cd repositories/${team.repository_id} && git add -A && git commit -m "${stage.commit_message}" && git push`));
                console.log("add, commit & push", team.team_name);
                
                await Team.appendConsole(team.repository_url, message);
                await Team.appendConsole(team.repository_url, 'Test passed!');
                
                return true;
            } else {
                await Team.appendConsole(team.repository_url, message);
                await Team.appendConsole(team.repository_url, 'Test failed!');
                
                return false;
            }
        } catch(e) {
            stage.preScriptFiles.forEach(async file => {
                let filename = file.split('/')[file.split('/').length-1];
                await join(exec(`cd repositories/${team.repository_id} && rm ${filename}`));
            });
            
            await Team.appendConsole(team.repository_url, e.name + ': ' + e.message);
            await Team.appendConsole(team.repository_url, 'Test failed! (contact support something is fucked)');
            
            return false;
        }
    }
};
