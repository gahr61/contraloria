<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Reporte;
use App\ReportElement;
use App\User;

class ReporteController extends Controller
{
    public function getMatriz($user_id){
		$user = User::where('id', $user_id)->select('id')->first();
		return $user->matriz()->select('id')->first();
	}
	/*
	public function show($id, $tipo){
		$user_id = $id;
		$tipo = $tipo;
		$matriz =  $this->getMatriz($user_id);
		$reporte_matriz = reporteMatriz::where('matriz_id', $matriz->id)->get();
		
		$reporte = null;

		if($reporte_matriz != NULL){
			foreach($reporte_matriz as $pm){
				$reporte = reporte::where('id', $pm->reporte_id)->where('tipo', $tipo)->first();

				if($reporte != NULL){
					break;
				}
			}
			

			if($reporte != NULL){

				if($tipo == 'especifico'){
					$proceso = $reporte->proceso()->select('id')->get();
					//dd($proceso);
					foreach($proceso as $p){
						
						$reporte['proceso'] = $p->id;
					}

				}

				$reporte->elemento->each(function($e){
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

		return response()->json($reporte);
	}*/	

    public function store(Request $request){
    	//dd($request->all());
    	try{
			\DB::beginTransaction();

			//buscar id matriz desde usuario
			$user_id = $request->user_id;
			$matriz =  $this->getMatriz($user_id); 	

			//verifica si el id existe
			//guarda report
			if(!isset($request->report_id)){
				$report = new Reporte();
				$report->responsable = $request->reporte['responsable'];
				$report->fecha = date('Y-m-d');
				$report->tipo = $request->reporte['tipo'];
				$report->ejercicio_id = $request->reporte['ejercicio'];
				$report->save();

				if(!$report->save()){
					\DB::rollback();
					return response()->json(['error'=>'Error al guardar reporte, reporteController linea 60']);
				}

				//si reporte es especifico guarda report_proceso
				if($request->reporte['tipo'] == 'especifico'){
					$reporte->proceso()->sync($request->reporte['proceso']);
				}

				//guarda report_matriz
				$report->matriz()->sync($matriz->id);
			

			}else{
				$report = Reporte::where('id', $request->report_id)->select('id')->first();
				$report->responsable = $request->reporte['responsable'];
				$report->ejercicio_id = $request->reporte['ejercicio'];
				$report->save();

				if(!$report->save()){
					\DB::rollback();
					return response()->json(['error'=>'Error al guardar reporte, reporteController linea 70']);
				}

				if($request->report['tipo'] == 'especifico'){
					$report->proceso()->detach($request->report['proceso']);
					$report->proceso()->sync($request->report['proceso']);
				}
			}
				
			foreach($request->reporte['elementos'] as $e){
				if(!isset($e['id'])){
					//guarda reporte_element
					$report_element = new ReportElement();
					$report_element->id_report = $report->id;
					$report_element->fill($e);
					$report_element->total = $e['total'];
					$report_element->medio = $e['medio'][0];

					$report_element->save();

					if(!$report_element->save()){
						\DB::rollback();
						return response()->json(['error'=>'Error al guardar elemento reporte, reporteController linea ']);
					}
				}else{
					$report_element = ReportElement::where('id', $e['id'])->first();
					$report_element->fill($e);
					$report_element->save();

					if(!$report_element->save()){
						\DB::rollback();
						return response()->json(['error'=>'Error al guardar elemento reporte, reporteController linea ']);
					}

				}

				
			}

			\DB::commit();

			return response()->json([
				'ok'=>true,
				'report_id'=>$report->id,
				'mensaje'=>'El registro se guardo correctamente'
			]);


		}catch(\Exception $e){
			\DB::rollback();
			return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage().$e]);
		}

    }
}
