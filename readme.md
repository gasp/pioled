node app.js to add to systemctl

* on startup: turn oled displays on and how to connect
* on shutdown: turn oled displays off
* displays whatever is HTTP POST to / on port 3142

# install as a service
- sudo cp oledboot.service /etc/systemd/system/oledboot.service
- sudo systemctl start oledboot.service
- sudo systemctl enable oledboot.service
