<?php

use Illuminate\Database\Seeder;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       	DB::table('permissions')->delete();
     
        //administration
            DB::table('permissions')->insert([
                'name'          => 'admin_menu',
                'display_name'  => 'Menu administración',
                'description'   => 'Permite ver el menu de administración de permisos, roles y ususarios.'
            ]);

           	//permissions
            DB::table('permissions')->insert([
                'name'          => 'admin_permissions_view',
                'display_name'  => 'Submenu Permisos',
                'description'   => 'Permite ver el listado de permisos del sistema.'
            ]);

            //roles
            DB::table('permissions')->insert([
                'name'          => 'admin_roles_view',
                'display_name'  => 'Submenu Roles',
                'description'   => 'Permite ver el listado de roles del sistema.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'admin_roles_assign_permissions',
                'display_name'  => 'Asignación de permisos a rol',
                'description'   => 'Permite asignar permisos a un rol.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'admin_roles_new',
                'display_name'  => 'Nuevo de rol',
                'description'   => 'Permite registrar información de un rol.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'admin_roles_edit',
                'display_name'  => 'Edición de rol',
                'description'   => 'Permite editar información de un rol.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'admin_roles_delete',
                'display_name'  => 'Eliminación de rol',
                'description'   => 'Permite eliminar información de un rol.'
            ]);

            //users
            DB::table('permissions')->insert([
                'name'          => 'admin_users_view',
                'display_name'  => 'Submenu Usuarios',
                'description'   => 'Permite ver el listado de usuarios del sistema.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'admin_users_new',
                'display_name'  => 'Nuevo usuario',
                'description'   => 'Permite registrar información de un usuario.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'admin_users_edit',
                'display_name'  => 'Edición de rol',
                'description'   => 'Permite editar información de un usuario.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'admin_users_delete',
                'display_name'  => 'Eliminación de rol',
                'description'   => 'Permite eliminar información de un usuario.'
            ]);    
            DB::table('permissions')->insert([
                'name'          => 'admin_users_reset',
                'display_name'  => 'Reestablecer contraseña de usuario',
                'description'   => 'Permite reestablecer la contraseña de un usuario.'
            ]);       


    }
}
