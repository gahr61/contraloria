<?php

use Illuminate\Database\Seeder;

class EjercicioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('ejercicio')->delete();
     
        DB::table('ejercicio')->insert(['ejercicio'	=> '2017']);
        DB::table('ejercicio')->insert(['ejercicio'	=> '2018']);
        DB::table('ejercicio')->insert(['ejercicio'	=> '2019']);
        DB::table('ejercicio')->insert(['ejercicio'	=> '2020']);
        DB::table('ejercicio')->insert(['ejercicio'	=> '2021']);
        DB::table('ejercicio')->insert(['ejercicio'	=> '2022']);
        DB::table('ejercicio')->insert(['ejercicio'	=> '2023']);
        DB::table('ejercicio')->insert(['ejercicio'	=> '2024']);
        DB::table('ejercicio')->insert(['ejercicio'	=> '2025']);
    }
}
