<?php

use Illuminate\Database\Seeder;

class CriterioSeleccionSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('criterios_select')->delete();
     
        DB::table('criterios_select')->insert([
          	'criterio' => 'Aporta al logro de prioridades (PED, Programa Sectorial, Reglamento Interno)'
		]);
        DB::table('criterios_select')->insert([
        	'criterio' => 'Contribuye al logro de objetivos, misión y visión'
        ]);
        DB::table('criterios_select')->insert([
        	'criterio' => 'Genera beneficios o subsidios a la población'
        ]);
        DB::table('criterios_select')->insert([
        	'criterio' => 'Relacionado con tramites y servicios'
        ]);
        DB::table('criterios_select')->insert([
        	'criterio' => 'Permite el cumplimiento de indicadores'
        ]);
        DB::table('criterios_select')->insert([
        	'criterio' => 'Alto monto de recursos presupuestales asignados'
        ]);
        DB::table('criterios_select')->insert([
        	'criterio' => 'Presenta riesgos a la integridad y corrupción'
        ]);
        DB::table('criterios_select')->insert([
        	'criterio' => 'Se ejecuta con apoyo de sistemas informáticos'
        ]);
    }
}
