<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Matriz;
use App\Ejercicio;
use App\Institucion;
use App\ProcesoPrior;
use App\User;

class MatrizController extends Controller
{

	public function show($id){
		$user_id = $id;
		$user = User::where('id', $user_id)->select('id')->first();
		$user->matriz()->select('id', 'id_institucion', 'id_ejercicio')->first();
		foreach($user->matriz as $m){
			foreach($m->proceso as $p){
				$p->criterio;
			}
		}

		return response()->json(['user'=>$user]);
	}

    public function store(Request $request){
    	//dd($request->proceso);
    	try{
			\DB::beginTransaction();

			if(!isset($request->id_matriz)){
				
				$matriz = new Matriz();
				$matriz->id_institucion = $request->institucion;
				$matriz->id_ejercicio = $request->ejercicio;

				$matriz->save();

				if(!$matriz->save()){
					\DB::rollback();
					return response()->json(['error'=>'Error al guardar matriz, MatrizController linea 40']);
				}

				$id_matriz = $matriz->id;

				$user = $request->user_id;
				$matriz->user()->sync($user);

			}else{
				$id_matriz = $request->id_matriz;
			}
		
			$proceso = new ProcesoPrior();
			$proceso->proceso = $request->proceso['nombre'];
 			$proceso->tipo = $request->proceso['tipo'];
 			$proceso->unidad_resp = $request->proceso['unidad'];
 			$proceso->persona_resp = $request->proceso['persona'];
 			$proceso->matriz_id = $id_matriz;
 			$proceso->total = $request->proceso['total'];
 			$proceso->save();

 			if(!$proceso->save()){
 				\SB::rollback();
 				return response()->json(['error'=>'Error al guardar proceso prioritario, MatrizController linea 63']);
 			}

 			foreach($request->proceso['criterios'] as $p){
 				$proceso->criterio()->sync($p);
 			}

    		\DB::commit();

    		return response()->json([
	    		'ok' => true,
	    		'id_matriz' => $id_matriz,
	    		'proceso' => $proceso,
	    		'mensaje' => 'El proceso '.$proceso->proceso.' se registro correctamente.'
	    	]);
			
	    }catch(\Exception $e){
			\DB::rollback();
			return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage().$e]);
		}
    }

    public function destroy($id){
    	try{
    		$proceso = ProcesoPrior::where('id', $id);
	    	$proceso->delete();

	    	\DB::commit();

	    	return response()->json(['ok'=>true]);
    	}catch(\Exception $e){
			\DB::rollback();
			return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage().$e]);
		}
	    	
    }
}
