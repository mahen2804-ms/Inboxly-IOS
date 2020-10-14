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


Route::group(['prefix' => 'v1'], function () {
	
    // Route for registration of user
    Route::post('user-registration', 'Api\V1\UserRegistrationController@userRegistration');
    // Route for Login using email id
    Route::post('login', 'Api\V1\UserRegistrationController@login');
   
});

