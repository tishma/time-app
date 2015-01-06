<?php

$app->get('', authenticate($app), function ($userId) use ($app) {
    try {
        $timezones = R::find('timezone', 'user_id = ?', array($userId));

        $app->response()->header('Content-Type', 'application/json');
        echo json_encode(R::exportAll($timezones));

    } catch (Exception $e) {
        $app->response()->status(400);
        $app->response()->header('X-Status-Reason', $e->getMessage());
    }
});

$app->post('', authenticate($app), validateTimezone($app), function ($userId) use ($app) {
    try {
        $input = $app->request()->getBody();

        $timezone = R::dispense('timezone');
        $timezone->name = (string)$input['name'];
        $timezone->city = (string)$input['city'];
        $timezone->userId = (int)$userId;
        R::store($timezone);

        $app->response()->setStatus('201');

    } catch (Exception $e) {
        $app->response()->status(400);
        $app->response()->header('X-Status-Reason', $e->getMessage());
    }
});

$app->put('/:id', authenticate($app), validateTimezone($app), function ($userId, $id) use ($app) {
    try {
        $timezone = R::findOne('timezone', 'id = ?', array($id));

        if ($timezone) {
            $input = $app->request()->getBody();

            $timezone->name = (string)$input['name'];
            $timezone->city = (string)$input['city'];
            $timezone->userId = (int)$userId;
            R::store($timezone);

            $app->response()->header('Content-Type', 'application/json');
            echo json_encode(R::exportAll($timezone));

        } else {
            throw new ResourceNotFoundException();
        }
    } catch (ResourceNotFoundException $e) {
        $app->response()->status(404);
    } catch (Exception $e) {
        $app->response()->status(400);
        $app->response()->header('X-Status-Reason', $e->getMessage());
    }
});

$app->delete('/:id', authenticate($app), function ($userId, $id) use ($app) {
    try {
        $timezone = R::findOne('timezone', 'id = ?', array($id));
        if ($timezone) {
            R::trash($timezone);
            $app->response()->status(204);
        } else {
            throw new ResourceNotFoundException();
        }
    } catch (ResourceNotFoundException $e) {
        $app->response()->status(404);
    } catch (Exception $e) {
        $app->response()->status(400);
        $app->response()->header('X-Status-Reason', $e->getMessage());
    }
});