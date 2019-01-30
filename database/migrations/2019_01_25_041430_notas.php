<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Notas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notes', function(Blueprint $table){
            $table->increments('id');
            $table->integer('service_id')->unsigned()->index();
            $table->integer('noum_note');
            $table->date('deliver_date');
            $table->timestamps();

            $table->foreign('service_id')->references('id')->on('services')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('notes');
    }
}
