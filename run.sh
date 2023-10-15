git pull;
npm i;
if [ $1 == "vpn" ]; then
  nordvpn connect Dedicated_IP;
fi
x=1;
while [ $x != 203 ]; do x=sudo ts-node src/index.ts; done;
