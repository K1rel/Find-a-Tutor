<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;



Route::middleware('auth:api')->group(function () {
    Route::get('/posts', [PostController::class, 'index']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::get('/posts/{id}', [PostController::class, 'show']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);
    Route::post('/posts/{id}/students', [PostController::class, 'addStudent']);
    Route::delete('/posts/{id}/students/{student_id}', [PostController::class, 'removeStudent']);
});

Route::get('/current_user',[AuthController::class, 'currentUser'])->middleware('auth:api');;
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('/users/{id}', [UserController::class, 'show']);
// Route::delete('posts/{post}/students/{student}', [PostController::class, 'removeStudent']);

Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');

Route::get('tags', [TagController::class, 'index']);
Route::apiResource('users', UserController::class);
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');