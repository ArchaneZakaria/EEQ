<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discipline extends Model
{
    protected $table='Discipline';
    const CREATED_AT = 'Cdate_Discipline';
    const UPDATED_AT = 'Udate_Discipline';

    protected $fillable=[
            'Id_Discipline',
            'Libelle_Discipline',
            'Cdate_Discipline',
            'Cby_Discipline',
            'Udate_Discipline',
            'Uby_Discipline',
            'Ddate_Discipline',
            'Dby_Discipline',
            'Deleted_Discipline'
    ];
    use HasFactory;
}
