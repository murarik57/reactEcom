<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{   
    var $clientSecret='heythisismmyclientsecret2021';
    
    function register(Request $req){
        if($req->header('client-secret') === $this->clientSecret){
            $user = new User;
            $user->name= $req->input('displayName');
            $user->email= $req->input('email');
            $user->password= Hash::make($req->input('password'));
            $user->save();
            return $user;
        }
        else{
            return ["error"=>"invalid Client Secret"];
        }
    }
    function login(Request $req){
        if($req->header('client-secret') === $this->clientSecret){
        $user = User::where('email',$req->email)->first();
        if(!$user || !Hash::check($req->password, $user->password) ){
            return ["error"=>"Email or password is not matched"];
        }
        return $user;
    }
    else{
        return ["error"=>"invalid Client Secret"];
    }
    }
    
}
