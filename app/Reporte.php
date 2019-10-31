<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reporte extends Model
{
    protected $table = 'report';

    public function matriz(){
    	return $this->belongsToMany('App\Matriz', 'report_matriz', 'report_id', 'matriz_id');
    }
}
