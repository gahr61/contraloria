<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProcesoPrior extends Model
{
    protected $table = 'proceso_prior';

    public function criterio(){
    	return $this->belongsToMany('App\CriterioEvaluacion', 'procesos_criterio')
    				->select('id', 'criterio');
    }

    public function matriz(){
    	return $this->belongsTo('App\Matriz');
    }
}
