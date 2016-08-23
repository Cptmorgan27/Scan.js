# Scan.js
A Node.js script that monitors Estimote Telemetry packets from BLE beacons.
The script will appened to a logs file whenever it reads a Telemetry packet with a motion flag.
The script also uses noble, fs, and firebase.

Firbase needs a service key to access the Firebase databse. Instructions can be found on Firbse.google under the javascript server docs.
