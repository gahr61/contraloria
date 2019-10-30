<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Acreditacion extends Model
{
    protected $table = 'acreditacion';

    public function elemento(){
    	return $this->belongsToMany('App\ElementoComp', 'acredita_element');
    }
}
