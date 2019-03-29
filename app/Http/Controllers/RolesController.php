<?php

namespace App\Http\Controllers;

use App\Role;

use Illuminate\Http\Request;

class RolesController extends Controller
{
    /*Get roles to show in form user*/
    public function getRoles(){
    	$roles = Role::select('id', 'display_name')->get();

    	return response()->json($roles);
    }
}
