<?php
require_once '../vendor/autoload.php';
require_once './dao_products.php';
use Symfony\Component\HttpFoundation\Request;

$app = new Silex\Application();
function toJson($resultat, $httpCode=200) {
    global $app;
    $retour['success'] = true;
    $retour['result']['nb'] = count($resultat);
    $retour['result']['products'] = $resultat;
    return $app->json($retour, $httpCode);
}

$app->register(new JDesrosiers\Silex\Provider\CorsServiceProvider(), [
    "cors.allowOrigin" => "*",
]);

$app->get('/products', function ()
{
    $resultat = DaoProduct::findAllProduct();
    return toJson($resultat);
});


$app->get('/products/{id}', function ($id)
{
    $resultat = DaoProduct::findProduct($id);
    return toJson($resultat);
});

$app->post('/products', function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : []);
        $newProduct = DaoProduct::addProduct($data);
        return toJson($newProduct, 201);
    }
    return 'Error';
});

$app->put('/products', function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : []);
        $product = DaoProduct::updateProduct($data);
        return toJson($product, 201);
    }
    return 'Error';
});

$app->delete('/products/{id}', function ($id)
{
    $resultat = DaoProduct::deleteProduct($id);
    return toJson($resultat);
});

$app["options"]($app);

$app->run();

