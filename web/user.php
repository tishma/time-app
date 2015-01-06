<?php

$app->post('/register', validateUser($app), function () use ($app) {
    try {
        $input = $app->request()->getBody();

        $user = R::dispense('user');
        $user->username = (string)$input['username'];
        $user->password = sha1((string)$input['password']);
        $user->apiKey = base64_encode(uniqid('user-' . microtime()));

        R::store($user);

        $app->response()->setStatus('201');
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode(array('id' => $user->id, 'username'=>$user->username, 'apiKey' => $user->apiKey));

    } catch (Exception $e) {
        $app->response()->status(400);
        $app->response()->header('X-Status-Reason', $e->getMessage());
    }
});

$app->post('/login', function () use ($app) {
    try {
        $input = $app->request()->getBody();

        $user = R::findOne('user', 'username = ? AND password = ?',
            array($input['username'], sha1($input['password'])));

        if ($user) {
            $app->response()->header('Content-Type', 'application/json');
            echo json_encode(array('id' => $user->id, 'username'=>$user->username, 'apiKey' => $user->apiKey));
        } else {
            $app->response()->setStatus('401');
        }

    } catch (Exception $e) {
        $app->response()->status(400);
        $app->response()->header('X-Status-Reason', $e->getMessage());
    }
});

$app->post('/changePassword/:userId', authenticate($app), checkPassword($app), function ($userId) use ($app) {
    try {
        $input = $app->request()->getBody();

        $user = R::findOne('user', 'username = ? AND password = ?',
            array($input['username'], sha1($input['password'])));

        if ($user) {
            $app->response()->header('Content-Type', 'application/json');
            echo json_encode(array('apiKey' => $user->apiKey));
        } else {
            $app->response()->setStatus('401');
        }

    } catch (Exception $e) {
        $app->response()->status(400);
        $app->response()->header('X-Status-Reason', $e->getMessage());
    }
});

