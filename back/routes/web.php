<?php

use App\Mail\AccueilMail;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/login',[LoginController::class,'authenticate']);


Route::get('/email', function () {
    Mail::to("zakariaarchane06@gmail.com")->send(new AccueilMail());
    return new AccueilMail();
});