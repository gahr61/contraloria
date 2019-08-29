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

            $table->timestamps();
        });

        Schema::create('orders', function(Blueprint $table){
            $table->increments('id');
            $table->string('client');
            $table->string('direction');
            $table->string('phone', 15);
            $table->decimal('total', 15, 2);
            $table->enum('status', ['open', 'paid', 'canceled']);
            $table->integer('company_id')->unsigned()->index();

            $table->foreign('company_id')->references('id')->on('company');
            $table->timestamps();
        });

        Schema::create('company_user', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->integer('company_id')->unsigned();

            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('company_id')->references('id')->on('company')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->primary(['user_id', 'company_id']);
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
        Schema::drop('user_company');
    }
}
