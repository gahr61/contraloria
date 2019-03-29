<?php

use Illuminate\Database\Seeder;
use App\Role;
use App\Permission;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->delete();
     	$admin = Role::create([
     		'name'	=>	'admin',
     		'display_name'	=>	'Administrador de sistema',
            'description'   =>  'Permite utilizar y administrar todos los modulos del sistema'
     	]);


     	$permisos = Permission::all();
     	foreach ($permisos as $permiso) {
            $admin->attachPermission($permiso);

     	}
    }
}
