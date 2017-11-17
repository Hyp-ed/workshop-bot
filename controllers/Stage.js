const exec = require('child_process').exec;
const asyncExec = require('async-child-process');
const join = asyncExec.join;
const childPrinted = asyncExec.childPrinted;

function execute(command, assert) {
  const child = exec(command);
  return childPrinted(child, assert);
}

var stages = {
    '0': {
        script: 'controllers/scripts/stage1.sh',
        assert: /success/,
        readme: 'controllers/scripts/readme1.md',
        commit_message: 'Update README.md'
    },
    '1': {
        script: 'controllers/scripts/stage2.sh',
        assert: /bar/,
        readme: 'controllers/scripts/readme2.md',
        commit_message: 'Update README.md'
    }
};

module.exports = {
    async runTests(team) {
        try {
            const stage = stages[team.stage];
            console.log(stage);
            await join(exec(`cd repositories/${team.repository_id} && git pull origin master`));
            await execute(`cp ${stage.script} repositories/${team.repository_id}/test.sh && cd repositories/${team.repository_id} && ./test.sh && rm test.sh`, stage.assert);
            await join(exec(`rm repositories/${team.repository_id}/README.md && cp ${stage.readme} repositories/${team.repository_id}/README.md`));
            await join(exec(`cd repositories/${team.repository_id} && git add -A && git commit -m "${stage.commit_message}"`));
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }
};
