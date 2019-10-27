<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Ejercicio;
use App\CriterioEvaluacion;

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
}
