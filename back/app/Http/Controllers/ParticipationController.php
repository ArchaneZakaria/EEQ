<?php

namespace App\Http\Controllers;

use App\Mail\ApprouvationMail;
use App\Models\Laboratoire;
use App\Models\Participation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\ParticipationsMail;
class ParticipationController extends Controller
{
    //
    public function getParticipationsOfProject(Request $req){
        $participations=DB::table('participation')->join('laboratoire','participation.Laboratoire_Id_Laboratoire','=','laboratoire.Id_Laboratoire')
        ->select('participation.*','laboratoire.*')->where('participation.Projet_Id_Projet','=',$req->Id_Projet)->where('laboratoire.Deleted_Laboratoire','=','0')->where('Etat_Participation','=','v')->get();
        $response=['participations'=>$participations];
       return response($response,200);
    }

    public function participateToProject(Request $req){
        $laboratoire=DB::table('laboratoire')->select('laboratoire.*')->where('User_Laboratoire','=',$req->Id_Laboratoire)->get();
        $participation=new Participation();
        $participation->Date_Participation=Carbon::now()->toDateString();
        $participation->Etat_Participation="E";
        $participation->Motivation_Participation=$req->Motivation_Participation;
        $participation->Deleted_Participation=0;
        $participation->Laboratoire_Id_Laboratoire=$laboratoire[0]->Id_Laboratoire;
        $participation->Projet_Id_Projet=$req->Id_Projet;
        $participation->save();
        $projet=DB::table('projet')->select('Intitule_Projet')->where('Id_Projet','=',$req->Id_Projet)->get();
        $admin=DB::table('users')->select('email','name')->where('role','=','1')->get();
        Mail::to($admin[0]->email)->send(new ParticipationsMail($admin[0]->name,$laboratoire[0]->Nom_Laboratoire,$projet[0]->Intitule_Projet));
        return response()->json([
              'status'=>200,
              'message'=>'Participation added succesfully',
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
        if($req->role=="user"){
            $laboratoire=DB::table('laboratoire')->select('Id_Laboratoire')->where('User_Laboratoire','=',$req->Id_Laboratoire)->get();
            $participations=DB::table('participation')->selectRaw('participation.* ,projet.* ')->join('projet','participation.Projet_Id_Projet','=','projet.Id_Projet')->where('participation.Laboratoire_Id_Laboratoire','=',$laboratoire[0]->Id_Laboratoire)->where('projet.Deleted_Projet','=','0')->get();
            return response()->json([
                'status'=>200,
                'participations'=>$participations
          ]);
        }else{
            $participations=DB::table('participation')->selectRaw('participation.* ,projet.* ')->join('projet','participation.Projet_Id_Projet','=','projet.Id_Projet')->where('participation.Laboratoire_Id_Laboratoire','=',$req->Id_Laboratoire)->where('projet.Deleted_Projet','=','0')->get();
            return response()->json([
                'status'=>200,
                'participations'=>$participations
          ]);
        }
        
    }


    public function getParticipationsValidesOfLaboratoire(Request $req){
        if($req->role=="user"){
            $laboratoire=DB::table('laboratoire')->select('Id_Laboratoire')->where('User_Laboratoire','=',$req->Id_Laboratoire)->get();
            $participations=DB::table('participation')->selectRaw('participation.* ,projet.* ')->join('projet','participation.Projet_Id_Projet','=','projet.Id_Projet')->where('participation.Laboratoire_Id_Laboratoire','=',$laboratoire[0]->Id_Laboratoire)->where('Etat_Participation','=','v')->where('projet.Deleted_Projet','=','0')->get();
            return response()->json([
                'status'=>200,
                'participations'=>$participations
          ]);
        }else{
            $participations=DB::table('participation')->selectRaw('participation.* ,projet.* ,laboratoire.*')->join('laboratoire','laboratoire.Id_Laboratoire','=','participation.Laboratoire_Id_Laboratoire')->join('projet','participation.Projet_Id_Projet','=','projet.Id_Projet')->where('projet.Deleted_Projet','=','0')->where('participation.Etat_Participation','=','S')->get();
            return response()->json([
                'status'=>200,
                'participations'=>$participations
          ]);
        }
        
    }


    public function annulerParticipation(Request $req){
        Participation::where('Id_Participation',$req->Id_Participation)->update(['Etat_Participation'=>'A']);
        $participations=DB::table('participation')->selectRaw('participation.* ,projet.* ,laboratoire.Nom_Laboratoire ,users.email')
        ->join('projet','participation.Projet_Id_Projet','=','projet.Id_Projet')
        ->join('laboratoire','participation.Laboratoire_Id_Laboratoire','=','laboratoire.Id_Laboratoire')->join('users','laboratoire.User_Laboratoire','=','users.id')
        ->where('participation.Id_Participation','=',$req->Id_Participation)->get();
        Mail::to($participations[0]->email)->send(new ApprouvationMail($participations[0]->Nom_Laboratoire,$participations[0]->Intitule_Projet,'rejetée'));
        return response()->json([
            'status'=>200
      ]);
    }

    public function getDemandesParticipations(){
        $participations=DB::table('participation')->selectRaw('participation.* ,projet.* ,laboratoire.Nom_Laboratoire')->join('projet','participation.Projet_Id_Projet','=','projet.Id_Projet')->join('laboratoire','participation.Laboratoire_Id_Laboratoire','=','laboratoire.Id_Laboratoire')->where('participation.Etat_Participation','=','E')->get();
        return response()->json([
            'status'=>200,
            'participations'=>$participations
      ]);
    }

    public function approuverParticipation(Request $req){
        Participation::where('Id_Participation',$req->Id_Participation)->update(['Etat_Participation'=>'V']);
        $participations=DB::table('participation')->selectRaw('participation.* ,projet.* ,laboratoire.Nom_Laboratoire ,users.email')
        ->join('projet','participation.Projet_Id_Projet','=','projet.Id_Projet')
        ->join('laboratoire','participation.Laboratoire_Id_Laboratoire','=','laboratoire.Id_Laboratoire')->join('users','laboratoire.User_Laboratoire','=','users.id')
        ->where('participation.Id_Participation','=',$req->Id_Participation)->get();
        Mail::to($participations[0]->email)->send(new ApprouvationMail($participations[0]->Nom_Laboratoire,$participations[0]->Intitule_Projet,'approuvée'));
        return response()->json([
            'status'=>200
      ]);
    }
}
