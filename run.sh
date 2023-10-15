git pull;
if [ $1 = "vpn" ]; then
  nordvpn connect Dedicated_IP;
fi
sudo su;
x=1;
while [ $x -le 7 ]; do ts-node src/index.ts; done;
