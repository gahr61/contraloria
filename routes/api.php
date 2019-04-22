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


Route::get('getRoles', 'RolesController@getRoles');

Route::post('user', 'UserController@store');
Route::get('user', 'UserController@index');
Route::delete('user/{id}/destroy', 'UserController@destroy');
Route::get('user/{id}', 'UserController@edit');
Route::put('user/update/{id}', 'UserController@update');