<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\Laboratoire;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Discipline_Has_Laboratoire;

class LaboratoireController extends Controller
{
    //Request $request
    public function store(){
        $Laboratoire=new Laboratoire;
        //$Laboratoire->Id_Laboratoire=101;
        $Laboratoire->Nom_Laboratoire='LPEE';
        $Laboratoire->Responsable_Laboratoire='ARCHANE Zakaria';
        $Laboratoire->Num_Tel_Laboratoire='0627268978';
        $Laboratoire->Email_Laboratoire='zakariaarchane06@gmail.com';
        $Laboratoire->Adresse_Laboratoire='28 rue badr bettana salé';
        $Laboratoire->Discipline_Laboratoire='Oculaire';
        $Laboratoire->Code_Acces_Laboratoire='12345';
        //$Laboratoire->Cdate_Laboratoire='2021-01-01';
        $Laboratoire->Cby_Laboratoire=1;
        //$Laboratoire->Udate_Laboratoire='2021-01-01';
        $Laboratoire->Uby_Laboratoire=1;
        $Laboratoire->Ddate_Laboratoire='2021-01-01';
        $Laboratoire->Dby_Laboratoire=1;
        $Laboratoire->Deleted_Laboratoire=0;
        $Laboratoire->save();
        return response()->json([
              'status'=>200,
              'message'=>'Labo added succesfully'
        ]);

    }

    public function getLaboratoire(Request $req){
           $reponse1= Laboratoire::all()->where("User_Laboratoire",$req->id);
            $users=User::all()->where("id",$req->id);
            
            foreach ($reponse1 as $labo) {
                $rep1=$labo;
            }
            $disciplines=Discipline_Has_Laboratoire::all()->where("Laboratoire_Id_Laboratoire",$rep1->Id_Laboratoire);
            $disc=array();
            foreach($disciplines as $discipline){
                    $disc[]=$discipline->Discipline_Id_Discipline;
            }
            foreach ($users as $user) {
                $rep2=$user;
            }
           $response = [
            //'id'=>$req->id,
            'labo' => $rep1,
            'user'=>$rep2,
            'disciplines'=>$disc
        ];
           return response($response,200);
    }

    public function updateLaboratoire(Request $req){

       $UserUpdt= User::where('id',$req->id)->update(['name'=>$req->name,'email'=>$req->email]);
       $LaboUpdt=Laboratoire::where('User_Laboratoire',$req->id)->update(['Nom_Laboratoire'=>$req->name,'Responsable_Laboratoire'=>$req->responsable_laboratoire,'Num_Tel_Laboratoire'=>$req->num_tel_laboratoire,'Adresse_Laboratoire'=>$req->adresse_laboratoire,'Completed_Laboratoire'=>1]);
       $reponse1= Laboratoire::all()->where("User_Laboratoire",$req->id);
       foreach ($reponse1 as $labo) {
        $rep1=$labo;
    }
        if($req->disciplines){
            foreach ($req->disciplines as $sku) {
                $labo_has_disc=Discipline_Has_Laboratoire::insertOrIgnore([
                    'Discipline_Id_Discipline'=>$sku,
                    'Laboratoire_Id_Laboratoire'=>$rep1->Id_Laboratoire
                ]);
            }
        }
         
         
        
    
       $response=['user'=>$UserUpdt];
       return response($response,200);
    }
}
