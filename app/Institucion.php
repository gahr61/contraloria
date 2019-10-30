<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Institucion extends Model
{
    protected $table = 'institucion';

    protected $fillable = ['nombre'];

    public function matriz(){
    	return $this->hasMany('App\Matriz');
    }
}
