root=`pwd`

echo "\n #paint# install dep.\n"
yarn install

echo "\n #paint# Compile front.\n"
cd ./front/

yarn webpack --config ./front/webpack.config.js --env.production

cd $root
