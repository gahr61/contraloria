<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Permission;
use App\RolePermission;
use App\Role;

class PermissionController extends Controller
{
    public function index(){
    	$permission = Permission::select('id', 'name', 'display_name', 'description')->get();

        $permissions = Permission::all();

    	return response()->json([
    		'permission'=>$permission,
    		'ok'=>true
    	]);
    }

    public function assignedPermissions($id){
    	$role_permissions = RolePermission::join('permissions', function($j){
							$j->on('permissions.id', '=', 'permission_role.permission_id');
						})
    					->select('permission_id as id', 'permissions.display_name as name')
    					->where('role_id',$id)
    					->orderBy('permission_id', 'ASC')->get();

    	$permissions = Permission::select('id', 'display_name')->orderBy('id', 'ASC')->get();
    
    	$array = array();
    	foreach ($permissions as $p) {
    		$existe = array_search($p->id, array_column($role_permissions->toArray(), 'id'));
    		if(strlen($existe) == 0){
    			$array[] = array('id' => $p->id, 'name'=>$p->display_name, 'assigned'=>false);
    		}else{
    			$array[] = array('id' => $p->id, 'name'=>$p->display_name, 'assigned'=>true);
    		}
    	}

    	return response()->json($array);
    }

    public function toAssign(Request $request){
    	$rol_id 		= $request->role_id;
    	$permission_id 	= $request->permission_id;

    	$rol = Role::find($rol_id);
    	$rol->attachPermission($permission_id);

    	return response()->json('ok');
    }

    public function design(Request $request){
    	$rol_id 		= $request->role_id;
    	$permission_id 	= $request->permission_id;

    	$rol = Role::find($rol_id);

    	$role_permissions = RolePermission::where('role_id', $rol_id)
    									->where('permission_id', $permission_id)
    									->delete();

    	return response()->json('ok');
    }

}
