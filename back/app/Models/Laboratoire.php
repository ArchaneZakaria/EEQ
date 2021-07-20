<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Laboratoire extends Model
{
    

    public function user()
    {
        return $this->hasOne('App\User');
    }
    use HasFactory;
    protected $table='Laboratoire';
    const CREATED_AT = 'Cdate_Laboratoire';
    const UPDATED_AT = 'Udate_Laboratoire';
    protected $fillable=[
        'Id_Laboratoire',
        'Nom_Laboratoire',
        'Responsable_Laboratoire',
        'Num_Tel_Laboratoire',
        'Email_Laboratoire',
        'Adresse_Laboratoire',
        'Discipline_Laboratoire',
        'User_Laboratoire',
        'Code_Acces_Laboratoire',
        'Cdate_Laboratoire',
        'Cby_Laboratoire',
        'Udate_Laboratoire',
        'Uby_Laboratoire',
        'Ddate_Laboratoire',
        'Dby_Laboratoire',
        'Deleted_Laboratoire',
        'Completed_Laboratoire'
    ];
/*

public function updateLaboratoire($req){
    User::where('id',$id)->update([])
        Laboratoire::where('')
    }
 */


    
}
