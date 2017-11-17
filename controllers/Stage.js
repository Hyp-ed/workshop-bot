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
        script: 'stage1.sh',
        assert: /foo/
    },
    '1': {
        script: 'stage2.sh',
        assert: /bar/
    }
};

module.exports = {
    async runTests(team) {
        try {
            const stage = stages[team.stage];
            console.log(stage)
            await execute(`cp controllers/scripts/${stage.script} repositories/${team.repository_id}/test.sh && cd repositories/${team.repository_id} && ./test.sh && rm test.sh`, stage.assert);
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }
};
