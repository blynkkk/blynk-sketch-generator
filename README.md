# blynk-sketch-generator
This repository is for generating Blynk sketches.

# Installation

##Install nodejs

curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
sudo apt-get install realpath

##Install used modules

npm install forever -g
npm install underscore
npm install path
npm install express
npm install body-parser
npm install serve-static
npm install serve-favicon

##Forward to correct port
 
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
