<?php

$data = [
    [
        "name" => "US English",
        "region" => "us",
        "language" => "en"
    ],
    [
        "name" => "Japan Japanese",
        "region" => "jp",
        "language" => "ja"
    ],
    [
        "name" => "Mexico Spanish",
        "region" => "mx",
        "language" => "es"
    ]
];

header('Content-Type: application/json');

echo json_encode($data);