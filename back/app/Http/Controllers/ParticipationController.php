<?php

namespace App\Http\Controllers;

use App\Models\Laboratoire;
use App\Models\Participation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ParticipationController extends Controller
{
    //
    public function getParticipationsOfProject(Request $req){
        $participations=DB::table('participation')->join('laboratoire','participation.Laboratoire_Id_Laboratoire','=','laboratoire.Id_Laboratoire')
        ->select('participation.*','laboratoire.*')->where('participation.Projet_Id_Projet','=',$req->Id_Projet)->where('Etat_Participation','=','v')->get();
        $response=['participations'=>$participations];
       return response($response,200);
    }

    public function participateToProject(Request $req){
        $laboratoire=DB::table('laboratoire')->select('Id_Laboratoire')->where('User_Laboratoire','=',$req->Id_Laboratoire)->get();
        $participation=new Participation();
        $participation->Date_Participation=Carbon::now()->toDateString();
        $participation->Etat_Participation="E";
        $participation->Deleted_Participation=0;
        $participation->Laboratoire_Id_Laboratoire=$laboratoire[0]->Id_Laboratoire;
        $participation->Projet_Id_Projet=$req->Id_Projet;
        $participation->save();
        return response()->json([
              'status'=>200,
              'message'=>'Participation added succesfully'
        ]);

    }

    public function countOfParticipation(Request $req){
        $laboratoire=DB::table('laboratoire')->select('Id_Laboratoire')->where('User_Laboratoire','=',$req->Id_Laboratoire)->get();
        $count=DB::table('participation')->where('Laboratoire_Id_Laboratoire','=',$laboratoire[0]->Id_Laboratoire)->where('Projet_Id_Projet','=',$req->Id_Projet)->count();
        return response()->json([
            'status'=>200,
            'count'=>$count
      ]);
    }

    public function getParticipationsOfLaboratoire(Request $req){
        $laboratoire=DB::table('laboratoire')->select('Id_Laboratoire')->where('User_Laboratoire','=',$req->Id_Laboratoire)->get();
        $participations=DB::table('participation')->selectRaw('participation.* ,projet.* ')->join('projet','participation.Projet_Id_Projet','=','projet.Id_Projet')->where('participation.Laboratoire_Id_Laboratoire','=',$laboratoire[0]->Id_Laboratoire)->where('projet.Deleted_Projet','=','0')->get();
        return response()->json([
            'status'=>200,
            'participations'=>$participations
      ]);
    }
}
