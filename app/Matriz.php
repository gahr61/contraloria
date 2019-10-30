<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Matriz extends Model
{
    protected $table = 'matriz';

    public function user(){
    	return $this->belongsToMany('App\User', 'user_matriz');
    }

    public function ejercicio(){
    	return $this->belongsTo('App\Ejercicio');
    }

    public function institucion(){
    	return $this->belongsTo('App\Institucion');
    }

    public function proceso(){
    	return $this->hasMany('App\ProcesoPrior')
    				->select('id', 'proceso', 'tipo', 'unidad_resp', 'persona_resp', 'total');
    }

    public function ptci(){
        return $this->belongsToMany('App\PTCI', 'ptci_matriz', 'ptci_id', 'matriz_id');
    }
}
