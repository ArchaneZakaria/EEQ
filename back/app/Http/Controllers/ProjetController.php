<?php

namespace App\Http\Controllers;

use App\Models\Projet;
use App\Models\Laboratoire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Discipline_Has_Laboratoire;

class ProjetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return Projet::all();
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
        Projet::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Projet  $projet
     * @return \Illuminate\Http\Response
     */
    public function show(Projet $projet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Projet  $projet
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Projet $projet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Projet  $projet
     * @return \Illuminate\Http\Response
     */
    public function destroy(Projet $projet)
    {
        //
    }

    public function showProjets(Request $req){
        $reponse1= Laboratoire::all()->where("User_Laboratoire",$req->id);
        foreach ($reponse1 as $labo) {
            $rep1=$labo;
        }
        $disciplines=Discipline_Has_Laboratoire::all()->where("Laboratoire_Id_Laboratoire",$rep1->Id_Laboratoire);
        $disc=array();
            foreach($disciplines as $discipline){
                    $disc[]=$discipline->Discipline_Id_Discipline;
            }
        $projets=DB::table('projet')->selectRaw('projet.Id_Projet, projet.Intitule_Projet, projet.Annee_Projet, projet.Description_Projet, projet.Etat_Projet')
        ->join('projet_has_discipline','projet.Id_Projet','=','projet_has_discipline.Projet_Id_Projet')->whereIn('projet_has_discipline.Discipline_Id_Discipline',$disc)
        ->distinct()->get();
        $response=['projets'=>$projets,'disciplines'=>$disc];
       return response($response,200);
    }



    
    public function getDisciplinesOfProject(Request $req){
        $disciplines=DB::table('projet_has_discipline')->selectRaw('projet_has_discipline.Projet_Id_Projet, projet_has_discipline.Discipline_Id_Discipline, discipline.Libelle_Discipline')
        ->join('discipline','projet_has_discipline.Discipline_Id_Discipline','=','discipline.Id_Discipline')->where('projet_has_discipline.Projet_Id_Projet','=',$req->Id_Projet)->distinct()->get();
        $response=['disciplines'=>$disciplines];
       return response($response,200);
    }
}
