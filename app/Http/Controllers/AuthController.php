<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __contruct(){
    	$this->middleware('jwt', ['except'=>['login']]);
    }

    public function login(){
    	$credentials = request(['email', 'password']);
    	if(!$token = auth()->attempt($credentials)){
    		return response()->json(['error'=>'Unauthorized',], 401);
    	}

    	return $this->respondWithToken($token);
    }

    public function me(){
    	return response()->json(auth()->user());
    }

    public function payload(){
    	return response()->json(auth()->payload());
    }

    public function logout(){
    	auth()->logout();
    	return response()->json(['message'=>'Successfully logged out']);
    }

    public function refresh(){
    	return $this->respondWithToken(auth()->refresh());
    }

    public function respondWithToken($token){
    	return response()->json([
    		'access_token'=>$token,
    		'token_type'=>'bearer',
    		'expires_in'=>auth()->factory()->getTTL() * 60,
    		'user'=>auth()->user(),
    	]);
    }
}
