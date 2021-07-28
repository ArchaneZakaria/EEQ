<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProjetController;
use App\Http\Controllers\DisciplineController;
use App\Http\Controllers\API\LaboratoireController;
use App\Http\Controllers\FileUploadConroller;
use App\Http\Controllers\ParticipationController;

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


//Projets
Route::post('/addProjet',[ProjetController::class,'store']);
Route::get('/getProjets',[ProjetController::class,'index']);
Route::post('/getProjetsSpecific',[ProjetController::class,'showProjets']);
Route::post('/getDisciplinesProject',[ProjetController::class,'getDisciplinesOfProject']);

//Disciplines
Route::get('/getDisciplines',[DisciplineController::class,'index']);

//Piéces jointes
Route::get('file/piecesjointes',[FileUploadConroller::class,'getpiecesjointes']);
Route::post('file/PostPiecesjointes',[FileUploadConroller::class,'postpiecesjointes']);

//Laboratoires
Route::post('/getLabo',[LaboratoireController::class,'getLaboratoire']);
Route::post('/updateLabo',[LaboratoireController::class,'updateLaboratoire']);
//Route::apiResource('projet','ProjetController');


//Participations
Route::post('/participationsOfProject',[ParticipationController::class,'getParticipationsOfProject']);
Route::post('/participateToProject',[ParticipationController::class,'participateToProject']);
Route::post('/countOfParticipation',[ParticipationController::class,'countOfParticipation']);
Route::post('/getParticipationsOfLaboratoire',[ParticipationController::class,'getParticipationsOfLaboratoire']);