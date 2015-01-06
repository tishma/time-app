<?php

require 'stage.php';

$fixtures = json_decode(file_get_contents("$appRoot/model/fixtures.json"), true);

foreach($fixtures['users'] as $item) {
    $user = R::dispense('user');
    $user->import($item);
    $user->password = sha1($user->password);
    R::store($user);
}

foreach($fixtures['timezones'] as $item) {
    $timezone = R::dispense('timezone');
    $timezone->import($item);
    R::store($timezone);
}