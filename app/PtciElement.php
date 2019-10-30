<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PtciElement extends Model
{
    protected $table = 'ptci_element';
    protected $fillable = ['id_element_comp', 'cumple', 'nombre_doc', 'accion_mejora', 'fecha_inicio', 
    						'fecha_fin', 'unidad_responsable', 'responsable', 'medio_verifica'];

   	public $timestamps = false;

   	public function ptci(){
   		return $this->belongsTo('App\PTCI');
   	}

   	public function elemento(){
   		return $this->belongsTo('App\ElementoComp', 'id_element_comp');
   	}
}
