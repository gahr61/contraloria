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

    public function index(){
    	$role = Role::select('id', 'name', 'display_name', 'description')->get();

    	return response()->json([
    		'role'=>$role,
    		'ok'=>true
    	]);
    }

    public function store(Request $request){
    	try{
			\DB::beginTransaction();
		   	$role = new Role();
	    	$role->name   = $request->name;
	    	$role->display_name  = $request->display_name;
	    	$role->description = $request->description;
	    	$role->save();

	    	\DB::commit();
	    	
	    	return response()->json([
	    		'ok' => true,
	    		'mensaje' => 'El Rol '.$role->name.' se registro correctamente.'
	    	]);
			
	    }catch(\Exception $e){
			\DB::rollback();
			return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()]);
		}
    }

    public function edit($id){
    	$role = Role::find($id);

    	return response()->json($role);
    }

    public function update(Request $request, $id){
    	try{
			\DB::beginTransaction();
		   	$role = Role::find($id);
	    	$role->name   = $request->name;
	    	$role->display_name  = $request->display_name;
	    	$role->description = $request->description;
	    	$role->save();

	    	\DB::commit();
	    	
	    	return response()->json([
	    		'ok' => true,
	    		'mensaje' => 'El Rol '.$role->name.' se actualizo correctamente.'
	    	]);
			
	    }catch(\Exception $e){
			\DB::rollback();
			return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()]);
		}
    }

    public function destroy($id){
    	//dd($id);
    	try{
    		\DB::beginTransaction();	
			$rol = Role::find($id);
        	$rol->delete();

			\DB::commit();

			return response()->json([
				'mensaje'=>"Rol ".$role->name." se elimino con exito."
			]);
    	}catch(\Exception $e){
			\DB::rollback();
			
			return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()]);
		}
    }
}
