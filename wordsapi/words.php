<?php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$language = $_GET['language'] ?? '';
$region = $_GET['region'] ?? '';

$file = __DIR__ . "/$language/$region/words.json";

if (!is_file($file)) {
    http_response_code(404);
    echo '{"error":"Words not found"}';
    exit;
}

readfile($file);