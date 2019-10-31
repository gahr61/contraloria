<?php

use Illuminate\Database\Seeder;

class TrimestreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('trimestre')->delete();
     
        DB::table('trimestre')->insert(['nombre' => '1er. Trimestre']);
        DB::table('trimestre')->insert(['nombre' => '2nd. Trimestre']);
        DB::table('trimestre')->insert(['nombre' => '3er. Trimestre']);
        DB::table('trimestre')->insert(['nombre' => '4to. Trimestre']);
    }
}
