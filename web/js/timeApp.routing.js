$(
    function () {
        $(window).hashchange(function () {
            switch (document.location.hash) {
                case "#/":
                    timeApp.showStartPage();
                    break;
                case "#/login":
                    timeApp.ui.showLogin();
                    break;
                case "#/register":
                    timeApp.ui.showRegister();
                    break;
                case "#/logout":
                    timeApp.logout();
                    break;
                case "#/timezones":
                    timeApp.showTimezones();
                    break;
            }
        });
    }
);