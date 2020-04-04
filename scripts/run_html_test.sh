echo "\n #paint# compile front test\n"
yarn webpack --config front/src/js/paint/ctx/testHTML/webpack.config.js

echo "\n #paint# start server, and you shude open http://localhost:8000"

yarn http-server ./front/src/js/paint/ctx/testHTML/public -p 8000