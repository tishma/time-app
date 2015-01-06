<?php
require '../vendor/autoload.php';
require '../src/autoload.php';

use TimeApp\Service\ConfigService;

$configService = new ConfigService();
$config = $configService->getConfig();

$appRoot = dirname(__DIR__);

require "env/{$config['env']}.php";

R::close();

echo "Application successfully setup for {$config['env']} environment.", PHP_EOL;