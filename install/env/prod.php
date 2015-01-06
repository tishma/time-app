<?php

$db = $config['database'];
//exec("echo \"create schema if not exists {$db['database']};\" | mysql -u{$db['user']} -p{$db['password']}") ;

$dsnWithoutDbName = "mysql:host={$db['host']};port={$db['port']}";
$dsnWithDbName = "mysql:host={$db['host']};port={$db['port']};dbname={$db['database']}";

R::addDatabase('before selecting schema', $dsnWithoutDbName, $db['user'], $db['password']);
R::addDatabase('schema selected', $dsnWithDbName, $db['user'], $db['password']);

R::selectDatabase('before selecting schema');
R::exec("create schema if not exists {$db['database']};");

R::selectDatabase('schema selected');
R::freeze(false);
R::nuke();
R::exec(file_get_contents("$appRoot/model/create.sql"));
R::freeze(true);