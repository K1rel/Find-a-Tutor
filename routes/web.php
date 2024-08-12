<?php

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/test-mail', function () {
    Mail::raw('Test email', function($message) {
        $message->to('your-email@example.com')
                ->subject('Test Email');
    });

    return 'Mail sent!';
});