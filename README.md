# blynk-sketch-generator
This repository is for generating [Blynk](http://www.blynk.cc) sketches.

# Installation

##Install nodejs

```
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential realpath
```

##Install used modules

```
cd blynk-sketch-generator
npm install
npm install -g forever
```

##Forward to correct port
 
 ```
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
```
