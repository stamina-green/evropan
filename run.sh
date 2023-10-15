git pull;
npm i;
if [ $1 == "vpn" ]; then
  nordvpn connect Dedicated_IP;
fi
x=0;
while [ $x != 1 ]; do sudo ts-node src/index.ts; x=$?; done;
