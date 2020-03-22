root=`pwd`

echo "\n #paint# Compile front.\n"
cd ./front/
yarn install
yarn webpack
cd $root
