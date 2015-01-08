timeApp.service = (function () {


    return {
        login: function (username, password, successCallback, failCallback) {
            $.ajax("/api/users/login", {
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({username: username, password: password})
            })
                .done(function (data) {
                    successCallback(data);
                })
                .fail(function (data) {
                    failCallback({
                        message: data.responseText || "Invalid login data",
                        status: data.status
                    });
                })
            ;
        },

        register: function (username, password, successCallback, failCallback) {
            $.ajax("/api/users/register", {
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({username: username, password: password})
            })
                .done(function (data) {
                    successCallback(data);
                })
                .fail(function (data) {
                    failCallback({
                        message: data.responseText || "Invalid login data",
                        status: data.status
                    });
                })
            ;
        },
        getTimezones: function (user, successCallback, failCallback) {
            $.ajax("/api/users/" + user.id + "/timezones", {
                type: "GET",
                headers: {"X-Api-Key": user.apiKey},
                dataType: "json"
            })
                .done(function (data) {
                    successCallback(data);
                })
                .fail(function (data) {
                    failCallback({
                        message: "Couldn't get timezones",
                        status: data.status
                    });
                })
            ;
        },
        createTimezone: function(user, timezone, successCallback, failCallback) {
            $.ajax("/api/users/" + user.id + "/timezones", {
                type: "POST",
                headers: {"X-Api-Key": user.apiKey},
                contentType: "application/json",
                data: JSON.stringify(timezone)
            })
                .done(function () {
                    successCallback();
                })
                .fail(function (data) {
                    failCallback({
                        message: "Failed creating timezone",
                        status: data.status
                    });
                })
            ;
        },
        updateTimezone: function(user, timezone, successCallback, failCallback) {
            $.ajax("/api/users/" + user.id + "/timezones/" + timezone.id, {
                type: "PUT",
                headers: {"X-Api-Key": user.apiKey},
                contentType: "application/json",
                data: JSON.stringify(timezone),
                dataType: "json"
            })
                .done(function (data) {
                    successCallback(data);
                })
                .fail(function (data) {
                    failCallback({
                        message: "Couldn't update timezone",
                        status: data.status
                    });
                })
            ;
        },
        deleteTimezone: function(user, timezoneId, successCallback, failCallback) {
            $.ajax("/api/users/" + user.id + "/timezones/" + timezoneId, {
                type: "DELETE",
                headers: {"X-Api-Key": user.apiKey}
            })
                .done(function () {
                    successCallback();
                })
                .fail(function (data) {
                    failCallback({
                        message: "Couldn't delete timezone",
                        status: data.status
                    });
                })
            ;
        }

    };

})
();