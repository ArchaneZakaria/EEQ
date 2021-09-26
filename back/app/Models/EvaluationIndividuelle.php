<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EvaluationIndividuelle extends Model
{
    protected $table='evaluation_individuelle';
    const CREATED_AT = 'Cdate_Evaluation_Individuelle';
    const UPDATED_AT = 'Udate_Evaluation_Individuelle';

    protected $fillable=[
            'Id_Evaluation_Individuelle',
            'Moyenne_Evaluation_Individuelle',
            'Remarque_Evaluation_Individuelle',
            'Cdate_Evaluation_Individuelle',
            'Udate_Evaluation_Individuelle',
            'Deleted_Evaluation_Individuelle',
            'Reponse_Id_Reponse'
    ];
    use HasFactory;
}
