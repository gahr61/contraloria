<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ElementoComp extends Model
{
    protected $table = 'elemento_comp';

    public function componente(){
    	return $this->belongsTo('App\Componente');
    }

    public function acredita(){
    	return $this->belongsToMany('App\Acreditacion', 'acredita_element');
    }

    public function ptci_element(){
    	return $this->hasMany('App\PtciElement');
    }
}
