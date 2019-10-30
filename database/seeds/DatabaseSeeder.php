<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call([
	        UsersTableSeeder::class,
	        PermissionsSeeder::class,
	        RolesSeeder::class,
	        EjercicioSeeder::class,
	        AcreditaSeed::class,
	        CriterioSeleccionSeed::class,
	        ComponenteSeed::class,
	        ElementCompSeed::class
	    ]);
    }
}
