<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\PTCI;
use App\PtciElement;
use App\Acreditacion;
use App\ElementoComp;
use App\PtciMatriz;

class PtciController extends Controller
{
	public function getMatriz($user_id){
		$user = User::where('id', $user_id)->select('id')->first();
		return $user->matriz()->select('id')->first();
	}

	public function show($id, $tipo){
		$user_id = $id;
		$tipo = $tipo;
		$matriz =  $this->getMatriz($user_id);
		$ptci_matriz = PtciMatriz::where('matriz_id', $matriz->id)->get();
		
		$ptci = null;

		if($ptci_matriz != NULL){
			foreach($ptci_matriz as $pm){
				$ptci = PTCI::where('id', $pm->ptci_id)->where('tipo', $tipo)->first();
			}
			

			if($ptci != NULL){

				if($tipo == 'especifico'){
					$proceso = $ptci->proceso()->select('id')->get();
					//dd($proceso);
					foreach($proceso as $p){
						
						$ptci['proceso'] = $p->id;
					}

				}

				$ptci->elemento->each(function($e){
					$element_comp = $e->elemento()->select('id', 'componente_id')->first();
					$e['componente'] = $element_comp->componente()->select('id')->first();
					$acredita = $element_comp->acredita()->select('id')->get();
					$aux_acredita = Array();
					foreach ($acredita as $a) {
						$aux_acredita[] = $a->id;
					}
					$e['acredita'] = $aux_acredita;
				});	
			}	
			
		}

		return response()->json($ptci);
	}	

    public function store(Request $request){
    	try{
			\DB::beginTransaction();

			//buscar id matriz desde usuario
			$user_id = $request->user_id;
			$matriz =  $this->getMatriz($user_id); 	

			//verifica si el id existe
			//guarda ptci
			if(!isset($request->ptci_id)){
				$ptci = new PTCI();
				$ptci->responsable = $request->ptci['responsable'];
				$ptci->fecha = date('Y-m-d');
				$ptci->tipo = $request->ptci['tipo'];
				$ptci->save();

				if(!$ptci->save()){
					\DB::rollback();
					return response()->json(['error'=>'Error al guardar ptci, PTCIController linea 60']);
				}

				//si ptci es especifico guarda ptci_proceso
				if($request->ptci['tipo'] == 'especifico'){
					$ptci->proceso()->sync($request->ptci['proceso']);
				}

				//guarda ptci_matriz
				$ptci->matriz()->sync($matriz->id);
			

			}else{
				$ptci = PTCI::where('id', $request->ptci_id)->select('id')->first();
				$ptci->responsable = $request->ptci['responsable'];
				$ptci->save();

				if(!$ptci->save()){
					\DB::rollback();
					return response()->json(['error'=>'Error al guardar ptci, PTCIController linea 70']);
				}

				if($request->ptci['tipo'] == 'especifico'){
					$ptci->proceso()->detach($request->ptci['proceso']);
					$ptci->proceso()->sync($request->ptci['proceso']);
				}
			}
				
			foreach($request->ptci['elementos'] as $e){
				if(!isset($e['id'])){
					//guarda ptci_element
					$ptci_element = new PtciElement();
					$ptci_element->id_ptci = $ptci->id;
					$ptci_element->fill($e);
					$ptci_element->save();

					if(!$ptci_element->save()){
						\DB::rollback();
						return response()->json(['error'=>'Error al guardar elemento ptci, PTCIController linea ']);
					}
				}else{
					$ptci_element = PtciElement::where('id', $e['id'])->first();
					$ptci_element->fill($e);
					$ptci_element->save();

					if(!$ptci_element->save()){
						\DB::rollback();
						return response()->json(['error'=>'Error al guardar elemento ptci, PTCIController linea ']);
					}

					//guarda acredita_elemento
					foreach($e['acredita'] as $a){
						$acredita = Acreditacion::where('id', $a)->select('id')->first();
						$acredita->elemento()->detach($e['id_element_comp']);
					}
				}
					
				//guarda acredita_elemento
				foreach($e['acredita'] as $a){
					$acredita = Acreditacion::where('id', $a)->select('id')->first();
					$acredita->elemento()->sync($e['id_element_comp']);
				}

				
			}

			\DB::commit();

			return response()->json([
				'ok'=>true,
				'ptci_id'=>$ptci->id,
				'mensaje'=>'El registro se guardo correctamente'
			]);


		}catch(\Exception $e){
			\DB::rollback();
			return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage().$e]);
		}

    }
}
