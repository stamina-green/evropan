git pull;
npm i;
if [ $1 -eq "vpn" ]; then
  nordvpn connect Dedicated_IP;
fi
x=1;
while [ $x -le 7 ]; do sudo ts-node src/index.ts; done;
