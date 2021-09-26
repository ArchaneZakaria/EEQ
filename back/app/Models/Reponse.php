<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reponse extends Model
{
    use HasFactory;
    protected $table='reponse';
    const CREATED_AT = 'Cdate_Reponse';
    const UPDATED_AT = 'Udate_Reponse';

    protected $fillable=[
        'Id_Reponse',
        'Contenu_Reponse',
        'Type_Reponse',
        'Cdate_Reponse',
        'Udate_Reponse',
        'Deleted_Reponse',
        'Question_Id_Question',
        'Participation_Id_Participation'
    ];
}
