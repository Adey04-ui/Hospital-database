<?php
if (getenv('DB_HOST') || getenv('MAIL_HOST')) {
    return;
}

$envPath = __DIR__ . '/.env';

if (!file_exists($envPath)) {
    return; // safe fallback
}

$lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

foreach ($lines as $line) {
    $line = trim($line);

    if ($line === '' || str_starts_with($line, '#')) {
        continue;
    }

    [$key, $value] = explode('=', $line, 2);
    putenv(trim($key) . '=' . trim($value));
}