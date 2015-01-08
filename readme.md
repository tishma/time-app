# TIME APP

Demo web app that allows users to register and manage list of timezones and view time in those.
 
## Requirements
* Apache web server
* MySQL Server
* PHP 5.5
 
 
## Configuration
Before automatic installation, it is required to setup database access parameters. The application uses the first config file it can find in config dir, with this priority:

1. prod.config

2. stage.config

3. test.config

4. dev.config

dev.config is provided via source control, and for the other environments - quick start examples are included.

NOTE: logging configuration is not working yet.

Test and dev environments include a couple of pre-loaded users for testing purposes:

novak:novak123

roger:roger123
 
## Installation

1. Get the application source (from this repo)

1. Setup web server (not covered)

2. Install composer if necessary (not covered)

3. Run composer install (not covered)

4. Run setup script (could be moved as an install task): 
```sh
cd install; 
php setup.php
```

5. That's it! You can navigate to your web app.

