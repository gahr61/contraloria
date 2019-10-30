<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TablesContraloria extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('institucion', function(Blueprint $table){
            $table->increments('id');
            $table->string('nombre', '100');
            $table->timestamps();
        });

        Schema::create('ejercicio', function(Blueprint $table){
            $table->increments('id');
            $table->string('ejercicio', '100');
            $table->timestamps();
        });

        Schema::create('matriz', function(Blueprint $table){
            $table->increments('id');
            $table->integer('id_institucion')->unsigned()->index();
            $table->integer('id_ejercicio')->unsigned()->index();
            $table->timestamps();

            $table->foreign('id_institucion')->references('id')->on('institucion');
            $table->foreign('id_ejercicio')->references('id')->on('ejercicio');
        });

        Schema::create('proceso_prior', function(Blueprint $table){
            $table->increments('id');
            $table->string('proceso');
            $table->enum('tipo', ['Sustantivo', 'Administrativo']);
            $table->string('unidad_resp');
            $table->string('persona_resp');
            $table->string('total', '10');
            $table->integer('matriz_id')->unsigned()->index();
            $table->timestamps();

            $table->foreign('matriz_id')->references('id')->on('matriz');
        });

        Schema::create('criterios_select', function(Blueprint $table){
            $table->increments('id');
            $table->string('criterio');
            $table->timestamps();
        });

        Schema::create('procesos_criterio', function(Blueprint $table){
            $table->integer('proceso_prior_id')->unsigned()->index();
            $table->integer('criterio_evaluacion_id')->unsigned()->index();

            $table->foreign('proceso_prior_id')->references('id')->on('proceso_prior')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('criterio_evaluacion_id')->references('id')->on('criterios_select')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->primary(['proceso_prior_id', 'criterio_evaluacion_id']);
        });

        Schema::create('componentes', function(Blueprint $table){
            $table->increments('id');
            $table->string('componente');
            $table->string('posicion');
            $table->enum('tipo',['PTCI Especifico', 'PTCI Institucional','Reporte Especifico', 'Reporte Institucional']);
            $table->timestamps();
        });

        //elemento componente
        Schema::create('elemento_comp', function(Blueprint $table){
            $table->increments('id');
            $table->text('nombre');
           
            $table->integer('componente_id')->unsigned()->index();
            $table->timestamps();
            
            $table->foreign('componente_id')->references('id')->on('componentes');            
        });


        Schema::create('acreditacion', function(Blueprint $table){
            $table->increments('id');
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('acredita_element', function(Blueprint $table){
            $table->integer('acreditacion_id')->unsigned()->index();
            $table->integer('elemento_comp_id')->unsigned()->index();

            $table->foreign('acreditacion_id')->references('id')->on('acreditacion')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('elemento_comp_id')->references('id')->on('elemento_comp')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->primary(['acreditacion_id', 'elemento_comp_id']);
        });

        Schema::create('ptci', function(Blueprint $table){
            $table->increments('id');
            $table->string('responsable');
            $table->date('fecha');
            $table->enum('tipo', ['Institucional', 'especifico']);
            $table->timestamps();
        });

        Schema::create('ptci_element', function(Blueprint $table){
            $table->increments('id');
            $table->integer('id_element_comp')->unsigned()->index();
            $table->integer('id_ptci')->unsigned()->index();
            $table->enum('cumple', ['Si', 'No']);
            $table->string('nombre_doc');
            $table->string('accion_mejora');
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->string('unidad_responsable');
            $table->string('responsable');
            $table->string('medio_verifica');

            $table->foreign('id_element_comp')->references('id')->on('elemento_comp');
            $table->foreign('id_ptci')->references('id')->on('ptci');

        });

        Schema::create('ptci_matriz', function(Blueprint $table){
            $table->integer('ptci_id')->unsigned()->index();
            $table->integer('matriz_id')->unsigned()->index();

            $table->foreign('ptci_id')->references('id')->on('ptci')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('matriz_id')->references('id')->on('matriz')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->primary(['ptci_id', 'matriz_id']);
        });

        Schema::create('ptci_proceso', function(Blueprint $table){
            $table->integer('id_ptci')->unsigned()->index();
            $table->integer('id_proceso')->unsigned()->index();

            $table->foreign('id_ptci')->references('id')->on('ptci')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('id_proceso')->references('id')->on('proceso_prior')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->primary(['id_ptci', 'id_proceso']);
        });

        Schema::create('report', function(Blueprint $table){
            $table->increments('id');
            $table->string('responsable');
            $table->date('fecha');
            $table->timestamps();
        });        

        Schema::create('elemento_report', function(Blueprint $table){
            $table->increments('id');
            $table->string('accion');
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->string('total');
            $table->string('medio');//file
            $table->string('obstaculo');
            $table->string('propuesta');
            $table->integer('id_report')->unsigned()->index();
            $table->integer('id_element_comp')->unsigned()->index();
            $table->timestamps();

            $table->foreign('id_report')->references('id')->on('report');
            $table->foreign('id_element_comp')->references('id')->on('elemento_comp');
        });

        Schema::create('trimestre', function(Blueprint $table){
            $table->increments('id');
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('element_trimestre', function(Blueprint $table){
            $table->integer('id_trimestre')->unsigned()->index();
            $table->integer('id_elemento')->unsigned()->index();
            $table->integer('porcentaje');

            $table->foreign('id_trimestre')->references('id')->on('trimestre')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('id_elemento')->references('id')->on('elemento_report')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->primary(['id_trimestre', 'id_elemento']);
        });

        Schema::create('report_matriz', function(Blueprint $table){
            $table->integer('id_report')->unsigned()->index();
            $table->integer('id_matriz')->unsigned()->index();

            $table->foreign('id_report')->references('id')->on('report')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('id_matriz')->references('id')->on('matriz')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->primary(['id_report', 'id_matriz']);
        });

        Schema::create('report_proceso', function(Blueprint $table){
            $table->integer('id_report')->unsigned()->index();
            $table->integer('id_proceso')->unsigned()->index();

            $table->foreign('id_report')->references('id')->on('report')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('id_proceso')->references('id')->on('proceso_prior')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->primary(['id_report', 'id_proceso']);
        });

        Schema::create('user_matriz', function(Blueprint $table){
            $table->integer('user_id')->unsigned()->index();
            $table->integer('matriz_id')->unsigned()->index();

            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('matriz_id')->references('id')->on('matriz')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->primary(['user_id', 'matriz_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('institucion');
        Schema::drop('ejercicio');
        Schema::drop('matriz');
        Schema::drop('proceso_prior');
        Schema::drop('criterios_select');
        Schema::drop('procesos_criterio');
        Schema::drop('componentes');
        Schema::drop('elemento_comp');
        Schema::drop('acreditacion');
        Schema::drop('acredita_element');
        Schema::drop('ptci');
        Schema::drop('ptci_matriz');
        Schema::drop('ptci_proceso');
        Schema::drop('report');
        Schema::drop('elemento_report');
        Schema::drop('trimestre');
        Schema::drop('element_trimestre');
        Schema::drop('report_matriz');
        Schema::drop('report_proceso');
        Schema::drop('user_matriz');
    }
}
