<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CriterioEvaluacion extends Model
{
    protected $table = 'criterios_select';

    protected $fillable = ['criterio'];

    public function Proceso(){
    	return $this->belongsToMany('App\ProcesoPrior', 'procesos_criterio');
    }
}
