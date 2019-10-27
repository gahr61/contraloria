<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ejercicio extends Model
{
    protected $table = 'ejercicio';

    protected $fillable = ['nombre'];

    public function matriz(){
    	return $this->hasMany('App\Matriz');
    }
}
