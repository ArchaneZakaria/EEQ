<?php

namespace App\Http\Controllers;

use App\Mail\AccueilMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Laboratoire;
use App\Models\Discipline_Has_Laboratoire;
use Illuminate\Support\Facades\Mail;

class LoginController extends Controller
{
    //
    
    private $apiToken;
    public function __construct()
     {
     $this->apiToken = uniqid(base64_encode(Str::random(40)));
     }
    
    public function authenticate(Request $request)
    {/*
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended('dashboard');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);*/
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password,'actif'=>1])){ 
            $user = Auth::user(); 
          //Setting login response 
          $success['token'] = $this->apiToken;
          $success['user'] =  $user;
          if($user->role==2){
            $reponse1= Laboratoire::all()->where("User_Laboratoire",$user->id);

            foreach ($reponse1 as $labo) {
             $rep1=$labo;
         }
         $success['labo'] =  $rep1->Completed_Laboratoire;
          }
          
            return response()->json([
              'status' => 'success',
              'data' => $success
            ]); 
          } else { 
            return response()->json([
              'status' => 'error',
              'data' => 'Unauthorized Access'
            ]); 
          } 
    }

    public function register(Request $request){
        
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
            'actif'=>0,
            'role'=>2
        ]);
        $laboratoire=Laboratoire::create([
            'Nom_Laboratoire'=>$fields['name'],
            'Email_Laboratoire'=>$fields['email'],
            'Responsable_Laboratoire'=>$request->responsable_laboratoire,
            'Num_Tel_Laboratoire'=>$request->num_tel_laboratoire,
            'Adresse_Laboratoire'=>$request->adresse_laboratoire,
            'User_Laboratoire'=>$user->id,
            'Deleted_Laboratoire'=>'0',
            'Completed_Laboratoire'=>'0'
        ]);
        /*
        foreach ($request->disciplines as $sku) {
            // Code Here
            $labo_has_disc=Discipline_Has_Laboratoire::create([
                'Discipline_Id_Discipline'=>$sku,
                'Laboratoire_Id_Laboratoire'=>$laboratoire->id
            ]);
        }
         */
        
        

        $token = $user->createToken('myapptoken')->plainTextToken;
        Mail::to($fields['email'])->send(new AccueilMail($request->responsable_laboratoire));
        $response = [
            'user' => $user,
            'token' => $token,
            'labo'=>$laboratoire
        ];

        return response($response, 201);
    }

    
}
