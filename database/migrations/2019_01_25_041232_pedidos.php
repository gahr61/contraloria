<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Pedidos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function(Blueprint $table){
            $table->increments('id');
            $table->integer('service_id')->unsigned()->index();
            $table->integer('product_id')->unsigned()->index();
            $table->integer('cant_mounth');
            $table->integer('cant_year');
            $table->timestamps();

            $table->foreign('service_id')->references('id')->on('services')->onUpdate('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('orders');
    }
}
