# Scan.js
A Node.js script that monitors Estimote Telemetry packets from BLE beacons.
The script will appened to a logs file whenever it reads a Telemetry packet with a motion flag.
The script also uses noble, fs, and firebase.

Firbase needs a service key to access the Firebase databse. Instructions can be found on Firbse.google under the javascript server docs.



Raspberry Pi Setup

1. Connect USB mouse and Keyboard, HDMI monitor

2. Plug power cable into Raspberry Pi

3. User: pi

4. Password: raspberry

5. Next connect to Greenline WiFi

Steps A-C are for setup for new RaspberryPi. Follow Steps D and E for Data Collection.

A) Enable Bluetooth Functionality

	1) Open terminal and enter each line individually, Make sure to press ENTER after each command.

			sudo apt-get update
			sudo apt-get dist-upgrade
			wget http://www.kernel.org/pub/linux/bluetooth/bluez-5.41.tar.xz
			tar xvf bluez-5.41.tar.xz
			cd bluez-5.41 
			sudo apt-get update
			sudo apt-get install -y libusb-dev libdbus-1-dev libglib2.0-dev libudev-dev libical-dev libreadline-dev
			./configure
			make
			sudo make install
			sudo systemctl start Bluetooth
			sudo systemctl enable Bluetooth
			sudo nano /lib/systemd/system/bluetooth.service
	
	2) Enable the experimental features by adding --experimental to the ExecStart line, for example the configuration should look like:
	
		[Service]
		Type=dbus
		BusName=org.bluez
		ExecStart=/usr/local/libexec/bluetooth/bluetoothd --experimental               
		NotifyAccess=main
		#WatchdogSec=10
		#Restart=on-failure
		CapabilityBoundingSet=CAP_NET_ADMIN CAP_NET_BIND_SERVICE
		LimitNPROC=1

	3) Save the file and exit the editor by pressing Ctrl-o, enter, then Ctrl-x.

	4) Now tell system to reload its configuration files by running:

			sudo systemctl daemon-reload
			sudo systemctl restart Bluetooth

B) Install Node.js

	1)Open terminal and enter each line individually, Make sure to press ENTER after each command.

			sudo apt-get install nodejs-legacy npm
			sudo npm install –g n
			sudo n latest
			mkdir Beacon_Scan
			cd Beacon_Scan
			sudo npm install noble

	Restart Raspberry Pi

			sudo reboot
C) Adding scan.js to monitor beacons
	
	1. Open a web browser
	2. Go to https://github.com/Cptmorgan27/Scan.js 
	3. click on scan.js 
	4. select all the text and copy
	5. Open terminal and enter each line individually, Make sure to press ENTER after each command. 
	
			cd Beacon_Scan
			sudo nano scan.js

	6. Paste text from web page
	7. Press CTRL and X 
	8. Press Y
	9. Press ENTER

D) Running scan.js

	1) Open terminal and enter each line individually, Make sure to press ENTER after each command. 

			sudo node /home/pi/Beacon_Scan/scan.js &

	The above command will keep scan.js running indefinitely as long as the Raspberry pi has power.

E) Access logs.txt file

	1) Open terminal and enter each line individually, Make sure to press ENTER after each command. 

			pkill node

	This will stop the scan.js running in the background

	2) Using the Graphical User Interface, access file manager

	3) Click to Beacon_Scan folder

	4) logs.txt file should be located within this folder

	5) logs.txt can be emailed or copied to flash drive for later analysis 

F) Add and Make launcher.sh executable

	1) Open terminal and enter each line individually, Make sure to press ENTER after each command.
	
			cd home/pi/Beacon_Test
			nano launcher.sh

	2) copy and paste launcher.sh code into terminal 
	3) Save and exit with CTRL + X, Y, ENTER
	4) Make launcher.sh executable

			chmod 755 launcher.sh
			cd
			mkdir errLogs

	5) Now make it so launcher.sh will be ran on startup

			sudo crontab -e

	6) This open a file called crontab, which is a file that tell the Raspberry Pi when to do specific things.
	7) Add the following line to the bottom of the file, after the last line that starts with a #

			@reboot sh /home/pi/Beacon_Scan/launcher.sh >/home/pi/errLogs/cronlog 2>&1

