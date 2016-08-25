# Scan.js
A Node.js script that monitors Estimote Telemetry packets from BLE beacons.
The script will appened to a logs file whenever it reads a Telemetry packet with a motion flag.
The script also uses noble, fs, and firebase.

Firbase needs a service key to access the Firebase databse. Instructions can be found on Firbse.google under the javascript server docs.



Raspberry Pi Setup
1. Connect USB mouse and Keyboard, HDMI monitor.
2. Plug power cable into Raspberry Pi
3. User: pi
4. Password: raspberry
5. Next connect to Greenline WiFi

Steps A-C are for setup for new RaspberryPi. Follow Steps D and E for Data Collection.

A) Enable Bluetooth Functionality

	1) Open terminal and enter each line individually, Make sure to press ENTER after each command.

		1)	sudo apt-get update
		2)	sudo apt-get dist-upgrade
		3)	wget http://www.kernel.org/pub/linux/bluetooth/bluez-5.41.tar.xz
		4)	tar xvf bluez-5.41.tar.xz
		5)	cd bluez-5.41 
		6)	sudo apt-get update
		7)	sudo apt-get install -y libusb-dev libdbus-1-dev libglib2.0-dev libudev-dev libical-dev libreadline-dev
		8)	./configure
		9)	make
		10)	sudo make install
		11)	sudo systemctl start Bluetooth
		12)	sudo systemctl enable Bluetooth
		13)	sudo nano /lib/systemd/system/bluetooth.service
	
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
		1.	sudo systemctl daemon-reload
		2.	sudo systemctl restart Bluetooth

B) Install Node.js

	1)Open terminal and enter each line individually, Make sure to press ENTER after each command.
		1.	sudo apt-get install nodejs-legacy npm
		2.	sudo npm install –g n
		3.	sudo n latest
		4.	mkdir Beacon_Scan
		5.	cd Beacon_Scan
		6.	sudo npm install noble
	Restart Raspberry Pi

C) Adding scan.js to monitor beacons
	
	1. Open a web browser
	2. Go to https://github.com/Cptmorgan27/Scan.js 
	3. click on scan.js 
	4. select all the text and copy
	5. Open terminal and enter each line individually, Make sure to press ENTER after each command. 
		1.	cd Beacon_Scan
		2.	sudo nano scan.js
	6. Paste text from web page
	7. Press CTRL and X 
	8. Press Y
	9. Press ENTER

D) Running scan.js

	1) Open terminal and enter each line individually, Make sure to press ENTER after each command. 
		1.	sudo node /home/pi/Beacon_Scan/scan.js &
	The above command will keep scan.js running indefinitely as long as the Raspberry pi has power.

E) Access logs.txt file

	1) Open terminal and enter each line individually, Make sure to press ENTER after each command. 
		1.	pkill node
	This will stop the scan.js running in the background
	2) Using the Graphical User Interface, access file manager
	3) Click to Beacon_Scan folder
	4) logs.txt file should be located within this folder
	5) logs.txt can be emailed or copied to flash drive for later analysis 
