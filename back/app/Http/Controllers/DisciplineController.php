<?php

namespace App\Http\Controllers;

use App\Models\Discipline;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DisciplineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
       return Discipline::all()->where('Deleted_Discipline',0);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Discipline  $discipline
     * @return \Illuminate\Http\Response
     */
    public function show(Discipline $discipline)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Discipline  $discipline
     * @return \Illuminate\Http\Response
     */
    public function edit(Discipline $discipline)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Discipline  $discipline
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Discipline $discipline)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Discipline  $discipline
     * @return \Illuminate\Http\Response
     */
    public function destroy(Discipline $discipline)
    {
        //
    }


    public function getDisciplineOfForm(){
        $discipline=DB::table('discipline')->selectRaw('discipline.Id_Discipline,discipline.Libelle_Discipline')->whereNotIn('discipline.Id_Discipline',DB::table('formulaire')->select('Discipline_Id_Discipline'))->distinct()->get();
        $response=['discipline'=>$discipline];
        return response($response,200);
    }

    public function getLaboOfDiscipline(Request $req){
        $laboratoires=DB::table('discipline')->selectRaw('laboratoire.Nom_Laboratoire')
        ->join('discipline_has_laboratoire','discipline.Id_Discipline','=','discipline_has_laboratoire.Discipline_Id_Discipline')
        ->join('laboratoire','discipline_has_laboratoire.Laboratoire_Id_Laboratoire','=','laboratoire.Id_Laboratoire')
        ->where('discipline.Id_Discipline','=',$req->Id_Discipline)->distinct()->get();
        $response=['laboratoires'=>$laboratoires];
        return response($response,200);
    }

    public function getCountOfDisciplines(){
        $disciplines=DB::table('discipline')->where('Deleted_Discipline','=','0')->count();
        $response=['disciplines'=>$disciplines];
        return response($response,200);
    }

    public function getStatsOfDisciplines(){
        $stats=DB::select("SELECT discipline.Libelle_Discipline,a.counta FROM discipline inner JOIN 
        (SELECT Discipline_Id_Discipline,COUNT(Discipline_Id_Discipline) 
        AS 'counta' FROM discipline_has_laboratoire GROUP BY Discipline_Id_Discipline) a ON
        discipline.Id_Discipline=a.Discipline_Id_Discipline");
        $response=['stats'=>$stats];
        return response($response,200);
    }
}
