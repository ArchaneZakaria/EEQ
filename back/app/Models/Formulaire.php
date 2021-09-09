<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formulaire extends Model
{
    use HasFactory;
    protected $table='formulaire';
    const CREATED_AT = 'Cdate_Formulaire';
    const UPDATED_AT = 'Udate_Formulaire';

    protected $fillable=[
        'Id_Formulaire',
        'Type_Formulaire',
        'Enonce_Formulaire',
        'Date_Formulaire',
        'Cdate_Formulaire',
        'Udate_Formulaire',
        'Deleted_Formulaire',
        'Discipline_Id_Discipline'
    ];
}
