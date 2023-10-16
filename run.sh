git stash; git pull; chmod a+x run.sh; 
npm i;
if [ $1 == "vpn" ]; then
  nordvpn connect us10100;
fi
x=0;
while [ $x != 1 ]; do sudo ts-node src/index.ts; x=$?; done;
