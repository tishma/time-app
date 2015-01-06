$(
    function () {
        var user = timeApp.loadUser();
        if (user) {
            timeApp.initializeSession(user);
        }

        var timezones = moment.tz.names();
        var timezonesItems = [];
        $.each(timezones, function (i, item) {
            timezonesItems.push({
                    value: item,
                    label: item.replace("_", " "),
                    timezone: moment.tz.zone(item)
                }
            );
        });
        timeApp.setTimezones(timezonesItems);

        if ('' != window.location.hash) {
            $(window).hashchange();
        }
        else {
            timeApp.navigate();
        }
    }
);