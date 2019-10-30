<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Componente extends Model
{
    protected $table = 'componentes';

    public function elemento(){
    	return $this->hasMany('App\ElementoComp')
    				->select('id', 'nombre', 'componente_id');
    }
}
