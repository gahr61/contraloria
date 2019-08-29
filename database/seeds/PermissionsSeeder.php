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
                'display_name'  => 'Edición de usuario',
                'description'   => 'Permite editar información de un usuario.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'admin_users_delete',
                'display_name'  => 'Eliminación de usuario',
                'description'   => 'Permite eliminar información de un usuario.'
            ]);    
            DB::table('permissions')->insert([
                'name'          => 'admin_users_reset',
                'display_name'  => 'Reestablecer contraseña de usuario',
                'description'   => 'Permite reestablecer la contraseña de un usuario.'
            ]);     

            //company
            DB::table('permissions')->insert([
                'name'          => 'admin_company_view',
                'display_name'  => 'Submenu Empresas',
                'description'   => 'Permite ver el listado de empresas registradas en el sistema.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'admin_company_new',
                'display_name'  => 'Nueva empresa',
                'description'   => 'Permite registrar información de una empresa.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'admin_company_edit',
                'display_name'  => 'Edición de empresa',
                'description'   => 'Permite editar información de una empresa.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'admin_company_delete',
                'display_name'  => 'Eliminación de empresa',
                'description'   => 'Permite eliminar información de una empresa.'
            ]); 

            //order   
            DB::table('permissions')->insert([
                'name'          => 'admin_order_view',
                'display_name'  => 'Submenu Pedidos',
                'description'   => 'Permite ver el listado de pedidos registradas en el sistema.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'admin_order_new',
                'display_name'  => 'Nuevo pedido',
                'description'   => 'Permite registrar información de un pedido.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'admin_order_edit',
                'display_name'  => 'Edición de pedido',
                'description'   => 'Permite editar información de un pedido.'
            ]);

            DB::table('permissions')->insert([
                'name'          => 'admin_order_delete',
                'display_name'  => 'Eliminación de pedido',
                'description'   => 'Permite eliminar información de un pedido.'
            ]); 

            DB::table('permissions')->insert([
                'name'          => 'admin_order_finish',
                'display_name'  => 'Finalizar pedido',
                'description'   => 'Permite finalizar un pedido.'
            ]); 

    }
}
