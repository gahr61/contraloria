<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;

use App\CompanyUser;


class UserController extends Controller
{

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

	    	foreach($request->companies as $c){
	    		$user->company()->attach($c['company_id']); //asignacion de empresa a usuario
	    	}
	    	
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
        $user = User::select('id', 'name', 'email')->where('id','=',$id)->first();
        $user['rol'] = $user->rol->first();

        $user['companies'] = CompanyUser::join('company', function($j){
        									$j->on('company.id', '=', 'company_user.company_id');
        								})
        								->select('company.id')
        								->where('user_id', '=', $id)->get();
                
      
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
	    
	    	$user_company = CompanyUser::where('user_id', $id)->delete();
	    	foreach($request->companies as $c){
	    		$user->company()->attach($c['company_id']); //asignacion de empresa a usuario
	    	}

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

			$user_company = CompanyUser::where('user_id', $id)->delete();

			\DB::commit();

			return response()->json([
				'mensaje'=>"Usuario ".$user->name." se elimino con exito."
			]);
    	}catch(\Exception $e){
			\DB::rollback();
			return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()]);
		}
    }

    public function reset_password(Request $request){
    	try{
    		\DB::beginTransaction();
    		$user = User::find($request->id);
    		$user->password = \Hash::make($request->password);
    		$user->save();

    		\DB::commit();
    		return response()->json([
    			'ok'=>true,
				'mensaje'=>"Se actualizo la contraseña correctamente."
			]);
    	}catch(\Exception $e){
			\DB::rollback();
			return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()]);
		}
    }
}
