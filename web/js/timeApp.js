var timeApp = (function () {
    var timezones = false;
    var loggedUser = false;

    return {
        navigate: function (route) {
            route = route || '';
            document.location.hash = "#/" + route;
        },
        setTimezones: function (tz) {
            timezones = tz;
        },
        getTimezones: function () {
            return timezones;
        },
        login: function (username, password) {
            timeApp.service.login(username, password, this.initializeSession, this.showAjaxError);
        },
        register: function (username, password) {
            timeApp.service.register(username, password, this.initializeSession, this.showAjaxError);
        },
        logout: function () {
            timeApp.navigate("login");
            loggedUser = false;
            timeApp.forgetUser();
            timeApp.ui.showLoggedInUser(loggedUser);
        },
        showTimezones: function () {
            if (!loggedUser) {
                alert("Not logged in");
                timeApp.navigate("login");
                return;
            }
            timeApp.service.getTimezones(loggedUser, timeApp.ui.showTimezones, this.showAjaxError);
        },
        showAjaxError: function (error) {
            alert(error.message);
            if (error.status == 401) {
                document.location.hash = "#/login";
            }
        },
        initializeSession: function (user) {
            timeApp.setLoggedUser(user);
            timeApp.ui.showLoggedInUser(loggedUser);
            timeApp.persistUser(user);
            timeApp.navigate("timezones");
        },
        showStartPage: function () {
            if (loggedUser) {
                timeApp.navigate("timezones");
            }
            else {
                timeApp.navigate("login");
            }
        },
        setLoggedUser: function (user) {
            loggedUser = user;
        },
        persistUser: function (user) {
            localStorage.setItem("user", JSON.stringify(user));
        },
        loadUser: function () {
            var userString = localStorage.getItem("user");
            if (userString && (userString != 'undefined')) {
                return JSON.parse(userString);
            }
            else {
                return false;
            }
        },
        forgetUser: function () {
            localStorage.removeItem("user");
        },
        createTimezone: function (timezone) {
            timeApp.service.createTimezone(loggedUser, timezone, timeApp.showTimezones, timeApp.showAjaxError);
        },
        updateTimezone: function (timezone) {
            timeApp.service.updateTimezone(loggedUser, timezone, timeApp.showTimezones, timeApp.showAjaxError);
        },
        deleteTimezone: function (timezoneId) {
            timeApp.service.deleteTimezone(loggedUser, timezoneId, timeApp.showTimezones, timeApp.showAjaxError);
        }
    };
})();