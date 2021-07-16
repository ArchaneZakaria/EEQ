<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class piece_jointe extends Model
{
    protected $table='Piece_jointe';
    const CREATED_AT = 'Cdate_Piece_Jointe';
    const UPDATED_AT = 'Udate_Piece_Jointe';
    protected $fillable=[
        'Id_Piece_Jointe',
        'Type_Piece_Jointe',
        'Description_Piece_Jointe',
        'Date_Publication_Piece_Jointe',
        'Laboratoiore_Id_Laboratoire',
        'Evaluation_Totale_Id_Evaluation_Totale',
        'Participation_Id_Participation',
        'Deleted_Piece_Jointe'
    ];
    use HasFactory;
}
