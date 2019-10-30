<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PTCI extends Model
{
    protected $table = 'ptci';

    public function matriz(){
    	return $this->belongsToMany('App\Matriz', 'ptci_matriz', 'ptci_id', 'matriz_id');
    }

    public function proceso(){
    	return $this->belongsToMany('App\ProcesoPrior', 'ptci_proceso', 'id_ptci');
    }

    public function elemento(){
    	return $this->hasMany('App\Ptcielement', 'id_ptci');
    }
}
