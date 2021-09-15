<?php

namespace App\Http\Controllers;

use App\Models\Discipline;
use App\Models\Formulaire;
use App\Models\Option;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
    public function store(Request $request)
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
    public function update(Request $request, Formulaire $formulaire)
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


    public function getFormOfDiscipline(Request $request){

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
}
