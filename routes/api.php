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

//Route::middleware('jwt')->group(function(){
	Route::resource('permissions', 'PermissionController');
	Route::get('assignedPermissions/{id}', 'PermissionController@assignedPermissions');
	route::post('toAssign', 'PermissionController@toAssign');
	route::post('design', 'PermissionController@design');

	Route::get('getRoles', 'RolesController@getRoles');
	Route::resource('roles', 'RolesController');

	Route::resource('user', 'UserController');
	Route::post('user/reset_password/{id}', 'UserController@reset_password');

	//matriz
	Route::resource('institucion', 'InstitucionController');
	Route::get('ejercicio', 'GeneralController@getEjercicio');
	Route::get('criterio_evaluacion', 'GeneralController@getCriterioEval');	
	Route::resource('matriz', 'MatrizController');
	Route::delete('proceso_prior/{id}', [
		'uses'	=> 'MatrizController@destroy',
		'as'	=> 'proceso_prior.destroy'
	]);
	Route::get('proceso_prior/{id}', 'MatrizController@getProceso');

	//ptci
	Route::resource('ptci', 'PtciController');
	Route::get('ptci/{id}/{tipo}', [
		'uses'	=> 'PtciController@show',
		'as'	=> 'ptci.show'
	]);
	Route::get('element_component/{tipo}', 'GeneralController@getElementComponent');
	Route::get('acreditacion', 'GeneralController@getAcreditacion');
//});
