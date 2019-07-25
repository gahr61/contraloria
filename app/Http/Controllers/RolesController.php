<?php

namespace App\Http\Controllers;

use App\Role;

use Illuminate\Http\Request;

class RolesController extends Controller
{
    /*Get roles to show in form user*/
    public function getRoles(){
    	$roles = Role::select('id', 'display_name')->get();

    	return response()->json($roles);
    }

    public function edit($id){
    	$role = Role::find($id);

    	return response()->json($role);
    }

    public function store(Request $request){
    	try{
			\DB::beginTransaction();
		   	$role = new Role();
	    	$user->name   = $request->name;
	    	$user->display_name  = $request->display_name;
	    	$user->description = $request->description;
	    	$user->save();

	    	\DB::commit();
	    	
	    	return response()->json([
	    		'ok' => true,
	    		'mensaje' => 'El Rol '.$user->name.' se registro correctamente.'
	    	]);
			
	    }catch(\Exception $e){
			\DB::rollback();
			return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()]);
		}
    }
}
