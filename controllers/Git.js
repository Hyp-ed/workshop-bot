const exec = require('child_process').exec;
const asyncExec = require('async-child-process');
const join = asyncExec.join;
const childPrinted = asyncExec.childPrinted;
const rimraf = require('rimraf');

function execute(command) {
  const child = exec(command);
  return childPrinted(child, /Your branch is up-to-date with 'origin\/master'\./);
}

module.exports = {
    async repoExists() {
        
    },
    async initializeRepo(repository_id, repository_url) {
        try {
            await join(exec(`cd repositories && mkdir ${repository_id} && cd ${repository_id} && git clone ${repository_url} .`));
            await execute(`cd repositories && cd ${repository_id} && git status`);
            return true;
        } catch(e) {
            return false;
        }
    },
    async deleteRepo(repository_id) {
        rimraf(`repositories/${repository_id}`, err => {
            if (err) console.log(err);
        });
    }
};