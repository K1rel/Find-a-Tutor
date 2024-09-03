<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TeacherProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Mail;

Route::middleware('auth:api')->group(function () {
    Route::get('/posts', [PostController::class, 'index']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::get('/posts/{id}', [PostController::class, 'show']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);
    Route::post('/posts/{id}/students', [PostController::class, 'addStudent']);
    Route::delete('/posts/{id}/students/{student_id}', [PostController::class, 'removeStudent']);
});// Route::delete('posts/{post}/students/{student}', [PostController::class, 'removeStudent']);


//users
Route::get('/current_user',[AuthController::class, 'currentUser'])->middleware('auth:api');
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('/update-profile', [UserController::class, 'update'])->middleware('auth:api');
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
Route::post('/password/reset', [UserController::class, 'sendPasswordResetLink']);


Route::post('/password/resetUser', [UserController::class, 'resetPassword'])->name('password.reset');



//contact

Route::get('/contact', [ContactController::class,'show'])->name('contact.show');
Route::post('/contact', [ContactController::class,'submit'])->name('contact.submit');


Route::get('tags', [TagController::class, 'index']);
Route::apiResource('users', UserController::class);
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


//teachers
Route::middleware('auth:api')->group(function () {
    Route::get('/teacher-profiles/{id}', [TeacherProfileController::class, 'show']);
    Route::post('/teachers/{teacherId}/reviews', [ReviewController::class, 'store']);
    Route::get('/teachers/{teacher}/reviews', [ReviewController::class, 'index']);
    Route::delete('/teachers/reviews/{id}', [ReviewController::class, 'destroy']);
    Route::get('/teachers/{teacherId}/reviews/all', [ReviewController::class, 'getAllReviewsForTeacher']);
});

//myStuff 

Route::middleware('auth:api')->get('/my-reviews', [ReviewController::class, 'getMyReviews']);
Route::middleware('auth:api')->get('/user-posts', [PostController::class, 'getUserPosts']);


//search

Route::middleware('auth:api')->get('/search/posts', [PostController::class, 'searchPosts']);