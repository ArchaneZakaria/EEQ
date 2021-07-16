<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProjetController;
use App\Http\Controllers\DisciplineController;
use App\Http\Controllers\API\LaboratoireController;
use App\Http\Controllers\FileUploadConroller;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/addLabo',[LaboratoireController::class,'store'])->middleware('auth:sanctum');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['web']], function () {
    // your routes here

});
Route::post('/register', [LoginController::class, 'register']);
Route::post('/login', [LoginController::class, 'authenticate']);

Route::post('/addProjet',[ProjetController::class,'store']);
Route::get('/getProjets',[ProjetController::class,'index']);

Route::get('/getDisciplines',[DisciplineController::class,'index']);
Route::get('file/piecesjointes',[FileUploadConroller::class,'getpiecesjointes']);
Route::post('file/PostPiecesjointes',[FileUploadConroller::class,'postpiecesjointes']);

//Route::apiResource('projet','ProjetController');