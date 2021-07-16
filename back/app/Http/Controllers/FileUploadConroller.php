<?php

namespace App\Http\Controllers;

use App\Models\piece_jointe;
use Illuminate\Http\Request;

class FileUploadConroller extends Controller
{

    public function getpiecesjointes(){
        return response()->download(public_path('/uploads/user1.pdf'),'user image');
    }
    
    public function postpiecesjointes(Request $request){
        $fileName="user1.pdf";
        $path=$request->file()->move(public_path("/uploads"),$fileName);
        $photoURL=url('/'.$fileName);
        return response()->json(['url'=>$photoURL],200);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Models\piece_jointe  $piece_jointe
     * @return \Illuminate\Http\Response
     */
    public function show(piece_jointe $piece_jointe)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\piece_jointe  $piece_jointe
     * @return \Illuminate\Http\Response
     */
    public function edit(piece_jointe $piece_jointe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\piece_jointe  $piece_jointe
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, piece_jointe $piece_jointe)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\piece_jointe  $piece_jointe
     * @return \Illuminate\Http\Response
     */
    public function destroy(piece_jointe $piece_jointe)
    {
        //
    }
}
