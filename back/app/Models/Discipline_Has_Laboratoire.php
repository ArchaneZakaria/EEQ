<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discipline_Has_Laboratoire extends Model
{
    
    use HasFactory;
    protected $fillable=[
        'Discipline_Id_Discipline',
        'Laboratoire_Id_Laboratoire',
        'Cdate_Dhl',
        'Udate_Dhl'
    ];
    const CREATED_AT = 'Cdate_Dhl';
    const UPDATED_AT = 'Udate_Dhl';
    protected $table='discipline_has_laboratoire';
}
