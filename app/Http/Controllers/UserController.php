<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;


class UserController extends Controller
{

	public function __construct(){
	    //$this->middleware('jwt');
	}
    public function index(){
    	$user = User::select('id', 'name', 'email')->get();

    	return response()->json([
    		'user'=>$user,
    		'ok'=>true
    	]);
    }

    public function store(Request $request){
   		
	   	try{ 
	    	\DB::transaction(function () use($request) {
			   	$user = new User();
		    	$user->name   = $request->name;
		    	$user->email  = $request->email;
		    	$user->password = \Hash::make($request->password);

		    	$user->roles()->attach($request->rol_id); //asignacion de rol a usuario
		    	$user->active = true;
		    	$user->save();
		    	
		    	//dd($user);

		    	return response()->json([
		    		'mensaje' => 'El usuario '.$user->name.' se registro correctamente.'
		    	]);
			}, 5);
	    }catch(\Exception $e){
			\DB::rollback();
			return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()]);
		}


    }
}
