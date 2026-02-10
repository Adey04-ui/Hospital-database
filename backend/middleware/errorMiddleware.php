<?php

// Always return JSON
header('Content-Type: application/json');

// Convert PHP errors into Exceptions
set_error_handler(function ($severity, $message, $file, $line) {
    throw new ErrorException($message, 0, $severity, $file, $line);
});

// Handle uncaught exceptions
set_exception_handler(function ($exception) {
    http_response_code(500);

    echo json_encode([
        "success" => false,
        "error" => [
            "message" => $exception->getMessage(),
            "file" => basename($exception->getFile()),
            "line" => $exception->getLine()
        ]
    ]);

    exit;
});

// Handle fatal errors (shutdown)
register_shutdown_function(function () {
    $error = error_get_last();

    if ($error !== null) {
        http_response_code(500);

        echo json_encode([
            "success" => false,
            "error" => [
                "message" => $error['message'],
                "file" => basename($error['file']),
                "line" => $error['line']
            ]
        ]);
    }
});
