<?php
// load required files
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../src/autoload.php';
require_once __DIR__ . '/../vendor/slim/slim/Slim/Slim.php';

use Slim\Route;
use Slim\Slim;
use TimeApp\Service\ConfigService;
use Slim\Middleware\ContentTypes;

Slim::registerAutoloader();

$configService = new ConfigService();
$config = $configService->getConfig();


// set up database connection
if(!R::$currentDB){
    $db = $config['database'];
    R::setup("mysql:host={$db['host']};dbname={$db['database']};port={$db['port']}", $db['user'], $db['password']);
    R::useExportCase('camel');
}

if($config['env'] == 'dev') {
    R::freeze(false);
}
else {
    R::freeze(true);
}
// initialize app
$app = new \Slim\Slim();

$app->add(new ContentTypes());

// set default conditions for route parameters
Route::setDefaultConditions(array(
    'id' => '[0-9]{1,}',
    'userId' => '[0-9]{1,}',
));

// route middleware for simple API authentication

require_once 'middleware.php';


$app->group('/api', function () use ($app) {
    $app->group('/users/:userId/timezones', function () use ($app) {

        require 'timezone.php';

    });
    $app->group('/users', function () use ($app) {

        require 'user.php';

    });
});

$app->run();
