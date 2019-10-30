<?php

use Illuminate\Database\Seeder;

class AcreditaSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('acreditacion')->delete();
        //1
    	DB::table('acreditacion')->insert([
          	'nombre' => '1. No está formalizada',
		]);
		DB::table('acreditacion')->insert([
          	'nombre' => '2. Está formalizada',
		]);
		DB::table('acreditacion')->insert([
          	'nombre' => '3. Está operando',
		]);
		DB::table('acreditacion')->insert([
          	'nombre' => '4. Se supervisa',
		]);
		DB::table('acreditacion')->insert([
          	'nombre' => '5. Es eficiente y eficaz',
		]);
		DB::table('acreditacion')->insert([
          	'nombre' => '6. Está actualizada',
		]);

    }
}
