<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Ejercicio;
use App\CriterioEvaluacion;
use App\Componente;
use App\Acreditacion;

class GeneralController extends Controller
{
	public function getEjercicio(){
		$ejercicio = Ejercicio::select('id', 'ejercicio')->get();

		return response()->json([
			'ok' => true,
			'ejercicio'	=> $ejercicio
		]);
		
	}

	public function getCriterioEval(){
		$criterio = CriterioEvaluacion::select('id', 'criterio')->get();

		return response()->json(['criterio' => $criterio]);
	}

	public function getElementComponent($tipo){	
		switch($tipo){
			case 'ptci_institucional':
				$t = 'PTCI Institucional';
				break;
		}

		$componente = Componente::where('tipo', $t)->select('id', 'componente', 'posicion')->get();
		
		foreach($componente as $c){
			$c->elemento;
		}

		return response()->json(['componente'=>$componente]);
	}

	public function getAcreditacion(){
		$acreditacion = Acreditacion::select('id', 'nombre')->get();

		return response()->json($acreditacion);
	}
}
