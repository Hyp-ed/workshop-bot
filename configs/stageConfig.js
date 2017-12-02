module.exports = {
    gitBotUsername: 'hackal',
    initialStage: '0%',
    stages: {
        '0%': {
            preScriptFiles: ['controllers/scripts/stage1/test.cpp', 'controllers/scripts/stage1/stage.mk'],
            script: 'controllers/scripts/stage1/test.sh',
            assert: /Name: \S.*/,
            readme: 'controllers/scripts/stage1/README.md',
            files: [],
            commit_message: 'Update README.md & exercise',
        	next_stage: '10%'
        },
        '10%': {
            preScriptFiles: ['controllers/scripts/stage2/test.cpp', 'controllers/scripts/stage2/stage.mk'],
            script: 'controllers/scripts/stage2/test.sh',
            assert: /Maximum speed: [^0\s].*/,
            readme: 'controllers/scripts/stage2/README.md',
            files: [],
            commit_message: 'Update README.md & exercise',
        	next_stage: '20%'
        },
        '20%': {
            preScriptFiles: ['controllers/scripts/stage3/test.cpp', 'controllers/scripts/stage3/stage.mk'],
            script: 'controllers/scripts/stage3/test.sh',
            assert: /Temperature: -?(([0-9]\.[0-9])|[1-9])/,
            readme: 'controllers/scripts/stage3/README.md',
            files: [],
            commit_message: 'Update README.md & exercise',
        	next_stage: '30%'
        },
        '30%': {
            preScriptFiles: ['controllers/scripts/stage4/test.cpp', 'controllers/scripts/stage4/stage.mk'],
            script: 'controllers/scripts/stage4/test.sh',
            assert: /Pressure: -?(([0-9]\.[0-9])|[1-9])/,
            readme: 'controllers/scripts/stage4/README.md',
            files: [],
            commit_message: 'Update README.md & exercise',
        	next_stage: '40%'
        },
        '40%': {
            preScriptFiles: [],
            script: 'controllers/scripts/stage5/test.sh',
            assert: /Pressure: -?(([0-9]\.[0-9])|[1-9])/,
            readme: 'controllers/scripts/stage5/README.md',
            files: [],
            commit_message: 'Update README.md & exercise',
        	next_stage: '50%'
        },
        '50%': {
            preScriptFiles: ['controllers/scripts/stage6/stage.mk'],
            script: 'controllers/scripts/stage6/test.sh',
            assert: /.*/,
            readme: 'controllers/scripts/stage6/README.md',
            files: [],
            commit_message: 'Update README.md & exercise',
        	next_stage: '60%'
        },
        '60%': {
            preScriptFiles: ['controllers/scripts/stage7/stage.mk', 'controllers/scripts/stage7/test.cpp'],
            script: 'controllers/scripts/stage7/test.sh',
            assert: /Acceleration: -?(([0-9]\.[0-9])|[1-9])/,
            readme: 'controllers/scripts/stage7/README.md',
            files: [],
            commit_message: 'Update README.md & exercise',
        	next_stage: '70%'
        },
        '70%': {
            preScriptFiles: ['controllers/scripts/stage8/stage.mk', 'controllers/scripts/stage8/test.cpp'],
            script: 'controllers/scripts/stage8/test.sh',
            assert: /Position: -?(([0-9]\.[0-9])|[1-9])/,
            readme: 'controllers/scripts/stage8/README.md',
            files: [],
            commit_message: 'Update README.md & exercise',
    	    next_stage: '80%'
        },
        '80%': {
            preScriptFiles: ['controllers/scripts/stage9/stage.mk', 'controllers/scripts/stage9/test.cpp'],
            script: 'controllers/scripts/stage9/test.sh',
            assert: /Current: -?(([0-9]\.[0-9])|[1-9])/,
            readme: 'controllers/scripts/stage9/README.md',
            files: [],
            commit_message: 'Update README.md & exercise',
    	    next_stage: '90%'
        },
        '90%': {
            preScriptFiles: ['controllers/scripts/stage10/stage.mk', 'controllers/scripts/stage10/test.cpp'],
            script: 'controllers/scripts/stage10/test.sh',
            assert: /Acceleration: -?(([0-9]\.[0-9])|[1-9])/,
            readme: 'controllers/scripts/stage10/README.md',
            files: [],
            commit_message: 'Update README.md & exercise',
    	    next_stage: '100%'
        }
    }
};
