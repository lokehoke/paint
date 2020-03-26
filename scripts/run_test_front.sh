echo "\n #paint# start front test\n"

yarn mocha '**/src/**/test/**/*.ts' -r ts-node/register
