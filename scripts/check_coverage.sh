echo "\n #paint# Check coverage \n"

yarn nyc --reporter=text mocha '**/src/**/test/**/*.ts' -r ts-node/register
