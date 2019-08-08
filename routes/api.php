<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/
Route::group([
	'prefix'=>'auth',
], function(){
	Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
	Route::post('refresh', 'AuthController@refresh');
	Route::post('me', 'AuthController@me');
});

Route::resource('permissions', 'PermissionController');
Route::get('assignedPermissions/{id}', 'PermissionController@assignedPermissions');
route::post('toAssign', 'PermissionController@toAssign');
route::post('design', 'PermissionController@design');

Route::get('getRoles', 'RolesController@getRoles');
Route::resource('roles', 'RolesController');

Route::resource('user', 'UserController');
Route::post('user/reset_password/{id}', 'UserController@reset_password');

Route::resource('companies', 'CompanyController');