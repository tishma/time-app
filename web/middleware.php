<?php

use Slim\Route;
use Slim\Slim;

function authenticate(Slim $app)
{
    return function (Route $route) use ($app) {
        $userId = $route->getParam('userId');
        $key = $app->request()->headers->get('X-API-Key');
        $user = R::findOne('user', 'id = ?', array($userId));
        if (!$user) {
            $app->halt(401);
        } elseif ($user->apiKey != $key) {
            $app->halt(403);
        }
    };
}

function checkPassword(Slim $app)
{
    return function (Route $route) use ($app) {
        $userId = $route->getParam('userId');
        $password = sha1($app->request()->headers->get('X-Password'));
        $user = R::findOne('user', 'id = ?', array($userId));
        if (!$user) {
            $app->halt(401);
        } elseif ($user->password != $password) {
            $app->halt(403);
        }
    };
}

function validateTimezone(Slim $app)
{
    return function (Route $route) use ($app) {
        extract($app->request()->getBody());
        if (empty($name) || empty($city)) {
            $app->halt(400);
        }
    };
}

function validateUser(Slim $app)
{
    return function (Route $route) use ($app) {
        extract($app->request()->getBody());
    };
}