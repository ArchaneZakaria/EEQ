<?php

namespace App\Http\Controllers;

use App\Mail\NewProject;
use App\Models\Projet;
use App\Models\Laboratoire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\projet_has_discipline;
use App\Models\Discipline_Has_Laboratoire;
use Illuminate\Support\Facades\Mail;

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
        $NewProjet=new Projet();
        $NewProjet->Intitule_Projet=$request->Intitule_Projet;
        $NewProjet->Annee_Projet=$request->Annee_Projet;
        $NewProjet->Description_Projet=$request->Description_Projet;
        $NewProjet->Etat_Projet='E';
        $NewProjet->Deleted_Projet=0;
        $NewProjet->save();
        /* */
        if($request->disciplines){
            foreach ($request->disciplines as $sku) {
                $ProjetHasDisciplines=new projet_has_discipline();
                $ProjetHasDisciplines->Projet_Id_Projet=$NewProjet->id;
                $ProjetHasDisciplines->Discipline_Id_Discipline=$sku;
                $ProjetHasDisciplines->save();
            }
        }
        $mailLabos=DB::table('projet_has_discipline')->selectRaw('laboratoire.Email_Laboratoire')->join('discipline_has_laboratoire','projet_has_discipline.Discipline_Id_Discipline','=','discipline_has_laboratoire.Discipline_Id_Discipline')
        ->join('laboratoire','discipline_has_laboratoire.Laboratoire_Id_Laboratoire','=','laboratoire.Id_Laboratoire')->where('projet_has_discipline.Projet_Id_Projet','=',$NewProjet->id)->get();
        foreach ($mailLabos as $key ) {
            Mail::to($key->Email_Laboratoire)->send(new NewProject($NewProjet->Intitule_Projet));
        }
        return response()->json([
            'status'=>200,
            'NewProjet'=>$mailLabos
      ]);

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
        if($req->role==2){
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
        }else{
                $projets=DB::table('projet')->select()->distinct()->get();
        }
        
        $response=['projets'=>$projets];
       return response($response,200);
    }



    
    public function getDisciplinesOfProject(Request $req){
        $disciplines=DB::table('projet_has_discipline')->selectRaw('projet_has_discipline.Projet_Id_Projet, projet_has_discipline.Discipline_Id_Discipline, discipline.Libelle_Discipline')
        ->join('discipline','projet_has_discipline.Discipline_Id_Discipline','=','discipline.Id_Discipline')->where('projet_has_discipline.Projet_Id_Projet','=',$req->Id_Projet)->distinct()->get();
        $response=['disciplines'=>$disciplines];
       return response($response,200);
    }

    public function cloturerProjet(Request $req){
        $ProjetUpdated=Projet::where('Id_Projet','=',$req->Id_Projet)->update(['Etat_Projet'=>'C']);
        $response=['ProjetUpdated'=>$ProjetUpdated];
        return response($response,200);
    }
}
