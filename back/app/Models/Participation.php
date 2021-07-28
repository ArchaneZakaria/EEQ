<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participation extends Model
{
    use HasFactory;
    protected $table='Participation';
    const CREATED_AT = 'Cdate_Participation';
    const UPDATED_AT = 'Udate_Participation';
    protected $fillable=[
        'Id_Participation',
        'Date_Participation',
        'Date_Echeance_Participation',
        'Etat_Participation',
        'Cdate_Participation',
        'Cby_Participation',
        'Udate_Participation',
        'Uby_Participation',
        'Ddate_Participation',
        'Dby_Participation',
        'Deleted_Participation',
        'Laboratoire_Id_Laboratoire',
        'Projet_Id_Projet'
    ];
}
