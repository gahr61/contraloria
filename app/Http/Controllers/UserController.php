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
			\DB::beginTransaction();
		   	$user = new User();
	    	$user->name   = $request->name;
	    	$user->email  = $request->email;
	    	$user->password = \Hash::make($request->password);
	    	$user->active = true;
	    	$user->save();

	    	$user->roles()->attach($request->rol_id); //asignacion de rol a usuario

	    	\DB::commit();
	    	
	    	return response()->json([
	    		'ok' => true,
	    		'mensaje' => 'El usuario '.$user->name.' se registro correctamente.'
	    	]);
			
	    }catch(\Exception $e){
			\DB::rollback();
			return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()]);
		}
    }

    public function edit($id){
        $user = User::find($id);
        $userRole = $user->rol->first();
        $user['rol'] = $userRole;        
      
        return response()->json([
    		'user'=>$user,
    		'ok'=>true
    	]);
    }

    public function update(Request $request, $id){
    	try{
    		$user = User::find($id);
	        $user->fill($request->all());
	        $user->save();
	        $user->roles()->detach();
	        
	        $user->roles()->attach($request->rol_id); //asignacion de rol a usuario
	    
	        \DB::commit();
	        return response()->json([
				'mensaje'=>"Usuario ".$user->name." actualizado con exito."
			]);
    	}catch(\Exception $e){
			\DB::rollback();
			return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()]);
		}
	        
    }

    public function destroy($id){
    	try{
    		\DB::beginTransaction();
			$user = User::find($id);
			$user->delete();

			\DB::commit();

			return response()->json([
				'mensaje'=>"Usuario ".$user->name." se elimino con exito."
			]);
    	}catch(\Exception $e){
			\DB::rollback();
			return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()]);
		}
    
    }
}
