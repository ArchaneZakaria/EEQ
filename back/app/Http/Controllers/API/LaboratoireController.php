<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Laboratoire;

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
}
