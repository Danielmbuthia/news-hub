<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::apiResource('/articles', ArticleController::class)->middleware('guest');
    Route::post('/login', [AuthController::class, 'login'])->name('v1.login');
    Route::post('/register', [AuthController::class, 'register'])->name('v1.register');
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('v1.logout');
        Route::get('/user', function (Request $request) {
            return $request->user();
        })->name('v1.user');
    });
});
