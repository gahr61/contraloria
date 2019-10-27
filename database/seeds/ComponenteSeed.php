<?php

use Illuminate\Database\Seeder;

class ComponenteSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('componentes')->delete();
        //1
    	DB::table('componentes')->insert([
          	'componente' => 'Ambiente de Control',
          	'posicion' => '1. ',
          	'tipo' => 'PTCI Institucional'
		]);

    	//2
		DB::table('componentes')->insert([
          	'componente' => 'Actividades de Control',
          	'posicion' => '3. ',
          	'tipo' => 'PTCI Institucional'
		]);

		//3
		DB::table('componentes')->insert([
          	'componente' => 'Informar y Comunicar',
          	'posicion' => '4. ',
          	'tipo' => 'PTCI Institucional'
		]);

		//4
		DB::table('componentes')->insert([
          	'componente' => 'Ambiente de Control',
          	'posicion' => '1. ',
          	'tipo' => 'Reporte Institucional'
		]);
		//5
		DB::table('componentes')->insert([
          	'componente' => 'Actividades de Control',
          	'posicion' => '3. ',
          	'tipo' => 'Reporte Institucional'
		]);
		//6
		DB::table('componentes')->insert([
          	'componente' => 'Informar y Comunicar',
          	'posicion' => '4. ',
          	'tipo' => 'Reporte Institucional'
		]);
		//7
		DB::table('componentes')->insert([
          	'componente' => 'Ambiente de Control',
          	'posicion' => '1. ',
          	'tipo' => 'PTCI Especifico'
		]);
		//8
		DB::table('componentes')->insert([
          	'componente' => 'Administración de Riesgos',
          	'posicion' => '2. ',
          	'tipo' => 'PTCI Especifico'
		]);
		//9
		DB::table('componentes')->insert([
          	'componente' => 'Actividades de Control',
          	'posicion' => '3. ',
          	'tipo' => 'PTCI Especifico'
		]);
		//10	
		DB::table('componentes')->insert([
          	'componente' => 'Informar y Comunicar',
          	'posicion' => '4. ',
          	'tipo' => 'PTCI Especifico'
		]);
		//11
		DB::table('componentes')->insert([
          	'componente' => 'Supervición y mejora continua',
          	'posicion' => '5. ',
          	'tipo' => 'PTCI Especifico'
		]);
		//12
		DB::table('componentes')->insert([
          	'componente' => 'Ambiente de Control',
          	'posicion' => '1. ',
          	'tipo' => 'Reporte Especifico'
		]);
		//13
		DB::table('componentes')->insert([
          	'componente' => 'Administración de Riesgos',
          	'posicion' => '2. ',
          	'tipo' => 'Reporte Especifico'
		]);
		//14
		DB::table('componentes')->insert([
          	'componente' => 'Actividades de Control',
          	'posicion' => '3. ',
          	'tipo' => 'Reporte Especifico'
		]);	
		//15
		DB::table('componentes')->insert([
          	'componente' => 'Informar y Comunicar',
          	'posicion' => '4. ',
          	'tipo' => 'Reporte Especifico'
		]);
		//16
		DB::table('componentes')->insert([
          	'componente' => 'Supervición y mejora continua',
          	'posicion' => '5. ',
          	'tipo' => 'Reporte Especifico'
		]);

    }
}
