<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProjetController;
use App\Http\Controllers\DisciplineController;
use App\Http\Controllers\API\LaboratoireController;
use App\Http\Controllers\FileUploadConroller;
use App\Http\Controllers\FormulaireController;
use App\Http\Controllers\ParticipationController;
use App\Http\Controllers\QuestionController;

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
Route::post('/cloturerProjet',[ProjetController::class,'cloturerProjet']);
Route::post('/getDisciplinesProject',[ProjetController::class,'getDisciplinesOfProject']);
Route::get('/getCountOfProjects',[ProjetController::class,'getCountOfProjects']);

//Disciplines
Route::get('/getDisciplines',[DisciplineController::class,'index']);
Route::post('/getLaboOfDiscipline',[DisciplineController::class,'getLaboOfDiscipline']);
Route::get('/getDisciplineOfForm',[DisciplineController::class,'getDisciplineOfForm']);
Route::get('/getCountOfDisciplines',[DisciplineController::class,'getCountOfDisciplines']);
Route::get('/getStatsOfDisciplines',[DisciplineController::class,'getStatsOfDisciplines']);

//Piéces jointes
Route::get('file/piecesjointes',[FileUploadConroller::class,'getpiecesjointes']);
Route::post('file/PostPiecesjointes',[FileUploadConroller::class,'postpiecesjointes']);

//Laboratoires
Route::post('/getLabo',[LaboratoireController::class,'getLaboratoire']);
Route::post('/updateLabo',[LaboratoireController::class,'updateLaboratoire']);
Route::get('/showLaboratoires',[LaboratoireController::class,'showLaboratoires']);
Route::post('/getDisciplinesLaboratoires',[LaboratoireController::class,'getDisciplinesLaboratoires']);
Route::post('/countOfParticipations',[LaboratoireController::class,'countOfParticipations']);
Route::post('/supprimerLaboratoire',[LaboratoireController::class,'supprimerLaboratoire']);
Route::get('/showDemandeInscription',[LaboratoireController::class,'showDemandeInscription']);
Route::post('/approuverInscription',[LaboratoireController::class,'approuverInscription']);
Route::get('/getCountOfLaboratoires',[LaboratoireController::class,'getCountOfLaboratoires']);

//Route::apiResource('projet','ProjetController');


//Participations
Route::post('/participationsOfProject',[ParticipationController::class,'getParticipationsOfProject']);
Route::post('/participateToProject',[ParticipationController::class,'participateToProject']);
Route::post('/countOfParticipation',[ParticipationController::class,'countOfParticipation']);
Route::post('/getParticipationsOfLaboratoire',[ParticipationController::class,'getParticipationsOfLaboratoire']);
Route::post('/getParticipationsValidesOfLaboratoire',[ParticipationController::class,'getParticipationsValidesOfLaboratoire']);
Route::post('/annulerParticipation',[ParticipationController::class,'annulerParticipation']);
Route::get('/getDemandesParticipations',[ParticipationController::class,'getDemandesParticipations']);
Route::post('/approuverParticipation',[ParticipationController::class,'approuverParticipation']);


//Formulaires

Route::post('/addForm',[FormulaireController::class,'store']);
Route::post('/getFormOfDiscipline',[FormulaireController::class,'getFormOfDiscipline']);
Route::post('/getFormOfProject',[FormulaireController::class,'getFormOfProject']);
Route::post('/submitFormulaire',[FormulaireController::class,'submitFormulaire']);
Route::post('/getReponseOfParticipation',[FormulaireController::class,'getReponseOfParticipation']);
Route::post('/evaluationOfReponse',[FormulaireController::class,'evaluationOfReponse']);

//question
Route::post('/addQuestion',[QuestionController::class,'store']);