<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Permission;

class AuthController extends Controller
{
    public function __contruct(){
    	$this->middleware('jwt', ['except'=>['login']]);
    }

    public function login(){
    	$credentials = request(['email', 'password']);
        
    	if(!$token = auth()->attempt($credentials)){
    		return response()->json(['error'=>'Unauthorized'], 401);
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
        $permissions = Permission::all();
        $user_permissions = [];
        foreach ($permissions as $p) {
            $user_permissions[$p->name] = auth()->user()->can($p->name);
        }

    	return response()->json([
    		'access_token'=>$token,
    		//'token_type'=>'bearer',
    		'expires_in'=>auth()->factory()->getTTL() * 60,
    		'user'=>[
                'name'=>auth()->user()->name,
                'id'=>auth()->user()->id,
                'created_at'=>auth()->user()->created_at->toDateString()
            ],
            'permissions'=>$user_permissions,
    		'ok'=>true,
    	]);
    }
}
