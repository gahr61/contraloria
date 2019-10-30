<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Institucion;

class InstitucionController extends Controller
{
    public function index(){
    	$institucion = Institucion::select('id', 'nombre')->get();
    
    	return response()->json(['institucion'=>$institucion]);
    }

    public function store(Request $request){
    	try{
			\DB::beginTransaction();

			$institucion = new Institucion();
    		$institucion->nombre = $request->name;
    		$institucion->save();

    		\DB::commit();

    		return response()->json([
	    		'ok' => true,
	    		'mensaje' => 'La institución '.$institucion->nombre.' se registro correctamente.'
	    	]);
			
	    }catch(\Exception $e){
			\DB::rollback();
			return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()]);
		}
    }

    public function edit($id){
    	try{
			\DB::beginTransaction();

			$institucion = Institucion::where('id',$id)->select('id', 'nombre')->first();

    		\DB::commit();

    		return response()->json([
	    		'ok' => true,
	    		'institucion' => $institucion
	    	]);
			
	    }catch(\Exception $e){
			\DB::rollback();
			return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()]);
		}	
    }

    public function update(Request $request, $id){
    	try{
    		\DB::beginTransaction();

    		$institucion = Institucion::find($id);
    		$institucion->nombre = $request->name;
    		$institucion->save();

    		\DB::commit();

    		return response()->json([
    			'ok' => true,
    			'mensaje' => 'La institucion '.$institucion->nombre.' se actualizo correctamente.'
    		]);

    	}catch(\Exception $e){
			\DB::rollback();
			return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()]);
		}
    }

    public function destroy($id){
    	try{
    		\DB::beginTransaction();
			$institucion = Institucion::find($id);
			$institucion->delete();

			\DB::commit();

			return response()->json([
				'mensaje'=>"La institución ".$institucion->nombre." se elimino con exito."
			]);
    	}catch(\Exception $e){
			\DB::rollback();
			return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()]);
		}
    }
}
