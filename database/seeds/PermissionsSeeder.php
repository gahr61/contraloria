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
                'display_name'  => 'Asignacion de permisos a rol',
                'description'   => 'Permite asignar permisos a un rol.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'admin_roles_edit',
                'display_name'  => 'Edicion de rol',
                'description'   => 'Permite editar informacion de un rol.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'admin_roles_delete',
                'display_name'  => 'Eliminacion de rol',
                'description'   => 'Permite eliminar informacion de un rol.'
            ]);

            //users
            DB::table('permissions')->insert([
                'name'          => 'admin_users_view',
                'display_name'  => 'Submenu Usuarios',
                'description'   => 'Permite ver el listado de usuarios del sistema.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'admin_users_edit',
                'display_name'  => 'Edicion de rol',
                'description'   => 'Permite editar informacion de un usuario.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'admin_users_delete',
                'display_name'  => 'Eliminacion de rol',
                'description'   => 'Permite eliminar informacion de un usuario.'
            ]);

        //warehouse
            DB::table('permissions')->insert([
                'name'          => 'warehouse_menu',
                'display_name'  => 'Menu Almacen',
                'description'   => 'Permite ver el menu de Almacen.'
            ]);

            //products
            DB::table('permissions')->insert([
                'name'          => 'warehouse_products_view',
                'display_name'  => 'Ver productos',
                'description'   => 'Permite listado de productos del sistema.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'warehouse_products_edit',
                'display_name'  => 'Edicion de producto',
                'description'   => 'Permite editar informacion de un producto.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'warehouse_products_delete',
                'display_name'  => 'Eliminacion de rol',
                'description'   => 'Permite eliminar informacion de un producto.'
            ]);
            


    }
}
