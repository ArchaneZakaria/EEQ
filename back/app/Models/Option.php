<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasFactory;
    protected $table='option';
    const CREATED_AT = 'Cdate_Option';
    const UPDATED_AT = 'Udate_Option';

    protected $fillable=[
        'Id_Option',
        'Libelle_Option',
        'Deleted_Option',
        'Cdate_Option',
        'Udate_Option',
        'Question_Id_Question'
    ];
}
