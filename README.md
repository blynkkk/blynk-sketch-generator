# blynk-sketch-generator
This repository is for generating [Blynk](http://www.blynk.cc) sketches.

https://examples.blynk.cc/

# Installation

## Fail to ban

```
sudo apt-get update
sudo apt-get install fail2ban
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

## Certs

```
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
export LC_ALL="en_US.UTF-8"
export LC_CTYPE="en_US.UTF-8"
./certbot-auto certonly --standalone -d examples.blynk.cc
 ```

## Cron job

@monthly   /root/certbot-auto renew --standalone --pre-hook "/root/blynk-sketch-generator/stop_server.sh" --post-hook "/root/blynk-sketch-generator/start_server.sh"

## Git

```
sudo apt-get install git
```

## Download project

```
git clone https://github.com/blynkkk/blynk-sketch-generator.git
```

## Install nodejs

```
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential realpath
```

## Install used modules

```
cd blynk-sketch-generator
npm install
npm install -g forever
```

## Forward to correct port
 
 ```
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 8443
```
