<?php

namespace App\Http\Controllers;

use App\Models\Formulaire;
use App\Models\Option;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuestionController extends Controller
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
        $Formulaire=DB::table('formulaire')->select('formulaire.*')->where('Discipline_Id_Discipline','=',$request->Id_Discipline)->get();
        
        /*$Formulaire=Formulaire::all()->where('Discipline_Id_Discipline',$request->Id_Discipline);
        foreach ($Formulaire as $rep) {
            $form=$rep;
        }*/
        //
        $NewQuestion=new Question();
        $NewQuestion->Enonce_Question=$request->Enonce_Question;
        $NewQuestion->Description_Question=$request->Description_Question;
        $NewQuestion->Type_Question=$request->Type_Question;
        $NewQuestion->Required_Question=$request->Required_Question;
        $NewQuestion->Deleted_Question=0;
        $NewQuestion->Formulaire_Id_Formulaire=$Formulaire[0]->Id_Formulaire;
        $NewQuestion->save();
        
        if($request->Options){
            foreach ($request->Options as $key ) {
                $NewOption=new Option();
                $NewOption->Libelle_Option=$key->Libelle_Option;
                $NewOption->Deleted_Option=0;
                $NewOption->Question_Id_Question=DB::getPdo()->lastInsertId();
                $NewOption->save();
            }
        }
        return response()->json([
            'status'=>200,
            'NewQuestion'=>$NewQuestion
      ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function show(Question $question)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function edit(Question $question)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Question $question)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function destroy(Question $question)
    {
        //
    }
}
