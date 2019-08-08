<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TblPedidos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company', function(Blueprint $table){
            $table->increments('id');
            $table->string('name')->unique();
        });

        Schema::create('orders', function(Blueprint $table){
            $table->increments('id');
            $table->string('client');
            $table->string('direction');
            $table->string('phone');
            $table->integer('company_id')->unsigned()->index();

            $table->foreign('company_id')->references('id')->on('company');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('company');
        Schema::drop('orders');
    }
}
