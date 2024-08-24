<?php

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
Route::get('/', function () {
    return view('welcome');
});
Route::get('/password/reset-form', function (Request $request) {
    $token = $request->get('token');
    $email = $request->get('email');

    return redirect()->away("http://localhost:3000/password/reset-form?token={$token}&email={$email}");
});