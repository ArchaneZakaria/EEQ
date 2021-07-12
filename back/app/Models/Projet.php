<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    use HasFactory;
    protected $table='Projet';
    const CREATED_AT = 'Cdate_Projet';
    const UPDATED_AT = 'Udate_Projet';
    protected $fillable=[
        'Id_Projet',
        'Intitule_Projet',
        'Annee_Projet',
        'Description_Projet',
        'Etat_Projet',
        'Discipline_Projet',
        'Cdate_Projet',
        'Cby_Projet',
        'Udate_Projet',
        'Uby_Projet',
        'Ddate_Projet',
        'Dby_Projet',
        'Deleted_Projet',
        'Echantillon_Id_Echantillon'
    ];
}
