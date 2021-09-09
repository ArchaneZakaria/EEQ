<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    protected $table='question';
    const CREATED_AT = 'Cdate_Question';
    const UPDATED_AT = 'Udate_Question';

    protected $fillable=[
        'Id_Question',
        'Enonce_Question',
        'Description_Question',
        'Type_Question',
        'Required_Question',
        'Cdate_Question',
        'Udate_Question',
        'Deleted_Question',
        'Formulaire_Id_Formulaire'
    ];
}
