<?php

namespace App\Http\Controllers;

use App\Models\Discipline;
use App\Models\EvaluationIndividuelle;
use App\Models\Formulaire;
use App\Models\Option;
use App\Models\Participation;
use App\Models\Question;
use App\Models\Reponse;
use Request;
use Illuminate\Http\Request as req;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Console\Input\Input;

class FormulaireController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(req $request)
    {
        //

        $NewDiscipline=new Discipline();
        $NewDiscipline->Libelle_Discipline=$request->Libelle_Discipline;
        $NewDiscipline->Description_Discipline=$request->Description_Discipline;
        $NewDiscipline->Responsable_Discipline=$request->Responsable_Discipline;
        $NewDiscipline->Deleted_Discipline='0';
        $NewDiscipline->save();
        $NewForm=new Formulaire();
        $NewForm->Type_Formulaire=$request->Type_Formulaire;
        $NewForm->Discipline_Id_Discipline=DB::getPdo()->lastInsertId();
        //$NewForm->Discipline_Id_Discipline=$request->Discipline_Id_Discipline;
        $NewForm->Deleted_Formulaire='0';
        $NewForm->save();

        return response()->json([
            'status'=>200,
            'NewForm'=>$NewForm
      ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Formulaire  $formulaire
     * @return \Illuminate\Http\Response
     */
    public function show(Formulaire $formulaire)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Formulaire  $formulaire
     * @return \Illuminate\Http\Response
     */
    public function edit(Formulaire $formulaire)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Formulaire  $formulaire
     * @return \Illuminate\Http\Response
     */
    public function update(req $request, Formulaire $formulaire)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Formulaire  $formulaire
     * @return \Illuminate\Http\Response
     */
    public function destroy(Formulaire $formulaire)
    {
        //
    }

    public function getFormOfProject(req $request){
        $disciplines=DB::table('projet_has_discipline')->selectRaw('projet_has_discipline.Projet_Id_Projet, projet_has_discipline.Discipline_Id_Discipline, discipline.Libelle_Discipline')
        ->join('discipline','projet_has_discipline.Discipline_Id_Discipline','=','discipline.Id_Discipline')->where('projet_has_discipline.Projet_Id_Projet','=',$request->Id_Projet)->distinct()->get();
        $questions=[];
        /* */
        foreach ($disciplines as $discipline ) {
            $formOfDiscipline=DB::table("formulaire")->selectRaw("formulaire.*")->where("Discipline_Id_Discipline","=",$discipline->Discipline_Id_Discipline)->distinct()->get();
            if($formOfDiscipline->count()!=0){
                foreach ($formOfDiscipline as $key ) {
                    # code...
                    $qstOfForm=Question::all()->where("Formulaire_Id_Formulaire","=",$key->Id_Formulaire);
                }
               // $QuestionWithOptions=[];
                foreach ($qstOfForm as $qst) {
                    $questions[$discipline->Libelle_Discipline][$qst->Id_Question]=$qst;
                    if($qst->Type_Question!=1){
                        $options=Option::all()->where("Question_Id_Question","=",$qst->Id_Question);
                        $questions[$discipline->Libelle_Discipline][$qst->Id_Question]["options"]=$options;
                    }
        
                }
            }
            
        }
        $response=['questions'=>$questions];
       return response($response,200);
    }

    public function getFormOfDiscipline(req $request){

        $formOfDiscipline=DB::table("formulaire")->selectRaw("formulaire.*")->where("Discipline_Id_Discipline","=",$request->Id_Discipline)->distinct()->get();
        /* Formulaire::all()->where("Discipline_Id_Discipline","=",$request->Id_Discipline);*/
        $qstOfForm=Question::all()->where("Formulaire_Id_Formulaire","=",$formOfDiscipline[0]->Id_Formulaire);
        $QuestionWithOptions=[];
        foreach ($qstOfForm as $qst) {
            $QuestionWithOptions[$qst->Id_Question]=$qst;
            if($qst->Type_Question!=1){
                $options=Option::all()->where("Question_Id_Question","=",$qst->Id_Question);
                $QuestionWithOptions[$qst->Id_Question]["options"]=$options;
            }

        }
        
        
        $response=['questions'=>$QuestionWithOptions];
       return response($response,200);

    }





    public function submitFormulaire(Request $request){
        $cpt=0;
        $soma=$request::input();
        
        /* */
        foreach ($soma as $key => $reponse) {
            $cpt++;
            
            //if()
            if($cpt!=1){
                $question=DB::table("question")->selectRaw("question.*")->where("Id_Question","=",$key)->distinct()->get();
                if($question[0]->Type_Question==1){

                    $reponseOfQst=new Reponse();
                    $reponseOfQst->Contenu_Reponse=$reponse;
                    $reponseOfQst->Deleted_Reponse=0;
                    $reponseOfQst->Question_Id_Question=$key;
                    $reponseOfQst->Participation_Id_Participation=$soma["Id_Participation"];
                    $reponseOfQst->save();
                }else{
                    $option=DB::table('option')->selectRaw("option.*")->where("Id_Option","=",$reponse)->distinct()->get();
                    $reponseOfQst=new Reponse();
                    $reponseOfQst->Contenu_Reponse=$option[0]->Libelle_Option;
                    $reponseOfQst->Deleted_Reponse=0;
                    $reponseOfQst->Question_Id_Question=$key;
                    $reponseOfQst->Participation_Id_Participation=$soma["Id_Participation"];
                    $reponseOfQst->save();
                }
            }
        }
        $Participation=Participation::where('Id_Participation','=',$soma["Id_Participation"])->update(['Etat_Participation'=>'S']);
        $response=['etat'=>'success'];
       return response($response,200);

    }

    public function getReponseOfParticipation(req $request){
        //$Participation=DB::table("participation")->select('*')->where('Id_Participation',$request->Id_Participation)->distinct()->get();
        $Reponse=DB::table('question')->selectRaw('reponse.*,question.*,evaluation_individuelle.*')->join('reponse','reponse.Question_Id_Question','=','question.Id_Question')->leftJoin('evaluation_individuelle','evaluation_individuelle.Reponse_Id_Reponse','=','reponse.Id_Reponse')->where('reponse.Participation_Id_Participation','=',$request->Id_Participation)->distinct()->get();
        $response=['reponses'=>$Reponse];
       return response($response,200);
    }

    public function evaluationOfReponse(req $request){
        $evaluation=new EvaluationIndividuelle();
        $evaluation->Moyenne_Evaluation_Individuelle=$request->Moyenne_Evaluation_Individuelle;
        $evaluation->Remarque_Evaluation_Individuelle=$request->Remarque_Evaluation_Individuelle;
        $evaluation->Deleted_Evaluation_Individuelle='0';
        $evaluation->Reponse_Id_Reponse=$request->Id_Reponse;
        $evaluation->save();
        $response=['evaluation'=>$evaluation];
        return response($response,200);
    }
}
