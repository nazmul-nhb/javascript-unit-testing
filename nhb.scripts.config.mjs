// @ts-check

import { defineScriptConfig } from 'nhb-scripts';

export default defineScriptConfig({
    format: {
        args: ['--write'],
        files: ['.'],
        ignorePath: '.prettierignore',
    },
    commit: {
        runFormatter: false,
    },
    count: {
        defaultPath: 'src',
        excludePaths: ['node_modules', 'dist', 'build']
    }
});
