timeApp.ui = (function () {
    var formatTimezoneLabel = function (timezone) {
        return timezone.label.split("_").join(" ") + " (GMT" + moment.tz(timezone.value).format("Z") + ")";
    }

    return {
        showLogin: function () {
            $("#content").html($("#loggedOutContent").html());
            $(".formContainer").html($("#loginForm").html());

            $("form[name=loginForm]", "#content").off("submit").on("submit", function (e) {
                e.preventDefault();
                var username = $("input[name=username]", this).val();
                var password = $("input[name=password]", this).val();
                timeApp.login(username, password);
                return false;
            });
        },
        showRegister: function () {
            $("#content").html($("#loggedOutContent").html());
            $(".formContainer", "#content").html($("#registerForm").html());

            $("form[name=registerForm]", "#content").off("submit").on("submit", function (e) {
                e.preventDefault();
                var username = $("input[name=username]", this).val();
                var password = $("input[name=password]", this).val();
                var passwordRepeat = $("input[name=passwordRepeat]", this).val();
                if (!username.match(/^[A-Za-z][A-Za-z0-9]*$/g)) {
                    alert("Username not valid. Please start with a letter and use only alphanumeric characters.");
                }
                else if (username.length < 6) {
                    alert("Username must have at least 6 characters.");
                }
                else if (password.length < 5) {
                    alert("Password must have at least 5 characters.");
                }
                else if (password != passwordRepeat) {
                    alert("Passwords do not match");
                }
                else {
                    timeApp.register(username, password);
                }
                return false;
            });
        },
        showLoggedInUser: function (user) {
            if (user) {
                $("#userStatus").html($("#loggedInStatus").html());
                $(".username", "#userStatus").text(user.username);
            }
            else {
                $("#userStatus").html($("#loggedOutStatus").html());
            }
        },
        showTimezones: function (timezones) {
            $("#content").html($("#loggedInContent").html());
            $(".addTimezoneLink", "#content").off("click").on("click", function (e) {
                e.preventDefault();
                timeApp.ui.showAddTimezoneForm();
            });

            if (timezones.length > 1) {
                timezones = timezones.sort(function (a, b) {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                });
                $(".timezonesFilter", "#content").show();
            }
            else {
                $(".timezonesFilter", "#content").hide();
            }
            $.each(timezones, function (i, item) {
                $("<div>" +
                item.name + " (" + item.city.replace("_", " ") + " " + moment.tz(item.city).format("HH:mm Z") + ") "
                + "</div>")
                    .append("<button data-id='" + item.id + "' name='edit'>Edit</button> ")
                    .append("<button data-id='" + item.id + "' name='delete'>Delete</button> ")
                    .addClass("ui-widget")
                    .addClass("timezoneItem")
                    .appendTo($(".timezonesList", "#content"))
                    .data("timezone", item)
                ;
            });
            $("button[name=edit]", "#content").off("click").on("click", function () {
                timeApp.ui.showEditTimezoneForm($(this).parent());
            });
            $("button[name=delete]", "#content").off("click").on("click", function () {
                if (confirm("Are you sure?")) {
                    timeApp.deleteTimezone($(this).data('id'));
                }
            });

            var $search = $(".search", "#content")
            $search.off("keyup").on("keyup", function () {
                $(".timezoneItem", "#content").each(function (i) {
                    var timezone = $(this).data("timezone");
                    var search = new RegExp($search.val(), "i");

                    if (search == '' || timezone.city.match(search) || timezone.name.match(search)) {
                        $(this).show();
                    }
                    else {
                        $(this).hide();
                    }
                });
            });
        },
        showEditTimezoneForm: function ($itemContainer) {
            var timezone = $itemContainer.data("timezone");
            var itemHtml = $itemContainer.html();
            $itemContainer.html($("#timezoneForm").html());

            $("input[name=name]").val(timezone.name);
            $("input[name=city]").val(timezone.city);
            $("input[name=cityLabel]").val(timezone.city);
            $("button[name=save]", $itemContainer).off("click").on("click", function () {
                timezone.name = $("input[name=name]", $itemContainer).val();
                timezone.city = $("input[name=city]", $itemContainer).val();
                if (timezone.name == '' || timezone.city == '') {
                    alert("Neither Name nor City can be empty");
                    return;
                }
                timeApp.updateTimezone(timezone);
            });
            $("button[name=cancel]", $itemContainer).off("click").on("click", function () {
                $itemContainer.html(itemHtml);
            });
            timeApp.ui.initAutocomplete();
        },
        showAddTimezoneForm: function () {
            $(".addTimezoneFormContainer", "#content").html($("#timezoneForm").html());
            $("button[name=save]", "#content").off("click").on("click", function () {
                //save and refresh timezones
                timeApp.createTimezone({
                    name: $("input[name=name]", "#content").val(),
                    city: $("input[name=city]", "#content").val()
                });
                $(".addTimezoneFormContainer", "#content").html("");
            });
            $("button[name=cancel]", "#content").off("click").on("click", function () {
                $(".addTimezoneFormContainer", "#content").html("");
            });
            timeApp.ui.initAutocomplete();
        },

        initAutocomplete: function () {
            $("input[name=cityLabel]", "#content").autocomplete({
                minLength: 0,
                source: timeApp.getTimezones(),
                focus: function (event, ui) {
                    $(".city", "#content").val(ui.item.label);
                    return false;
                },
                select: function (event, ui) {
                    $("input[name=city]").val(ui.item.value);
                    $("input[name=cityLabel]").val(formatTimezoneLabel(ui.item));

                    return false;
                },
                change: function (event, ui) {
                    if (ui.item) {
                        $(this).val(formatTimezoneLabel(ui.item));
                        $("input[name=city]").val(ui.item.value);
                    }
                    else {
                        $(this).val("");
                        $("input[name=city]").val("");
                    }
                }
            }).autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .append("<a>" + formatTimezoneLabel(item) + "</a>")
                    .appendTo(ul);
            };
        }
    };

})
();