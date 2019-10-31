<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReportElement extends Model
{
    protected $table = 'elemento_report';
    protected $fillable = ['accion', 'fecha_inicio', 'fecha_fin', 'obstaculo', 'propuesta', 'id_element_comp'];
}
