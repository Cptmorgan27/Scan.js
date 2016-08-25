#!/bin/sh
# launcher.sh
# navigate to home directory, then to Beacon_Scan directory, then execute scan.js, then go back to home directory

cd /
cd home/pi/Beacon_Scan
sudo node scan.js &
cd /
