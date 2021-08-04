<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class projet_has_discipline extends Model
{
    use HasFactory;
    protected $table='projet_has_discipline';
    protected $fillable=[
        'Projet_Id_Projet',
        'Discipline_Id_Discipline'
    ];
    public $timestamps = false;

}
