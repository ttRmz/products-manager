<?php
require_once '../vendor/autoload.php';
require_once './dao_user.php';
use Symfony\Component\HttpFoundation\Request;

$app = new Silex\Application();
function toJson($resultat, $httpCode=200) {
    global $app;
    $retour['success'] = true;
    $retour['result']['nb'] = count($resultat);
    $retour['result']['users'] = $resultat;
    return $app->json($retour, $httpCode);
}

$app->get('/users', function ()
{
    $resultat = DaoUser::findAll();
    return toJson($resultat);
});

$app->get('/users/{id}', function ($id)
{
    $resultat = DaoUser::find($id);
    return toJson($resultat);
});

$app->post('/users', function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : []);
        $newUser = DaoUser::add($data);
        return toJson($newUser, 201);
    }
    return 'Error';
});

$app->put('/users', function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : []);
        $user = DaoUser::update($data);
        return toJson($user, 201);
    }
    return 'Error';
});

$app->delete('/users/{id}', function ($id)
{
    $resultat = DaoUser::delete($id);
    return toJson($resultat);
});

$app->run();

