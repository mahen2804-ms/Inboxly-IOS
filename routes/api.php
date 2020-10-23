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

   	// Route for validate otp
    Route::get('validate-otp/{otp}/{email}', 'Api\V1\UserRegistrationController@validateOTP');
    // Route for resend otp
    Route::get('resend-otp/{email}', 'Api\V1\UserRegistrationController@resendOTP');

    // Route for Login using email id
    Route::post('login', 'Api\V1\UserRegistrationController@login');

     // Route for forgot password
    Route::post('forgot-password', 'Api\V1\UserRegistrationController@forgotPassword');

    // Route for user's listing
        Route::get('categories', 'Api\V1\CategoriesController@allCategoriesList');
        // Route for user's listing
        Route::post('create-category', 'Api\V1\CategoriesController@createCategory');
        // Route for user's listing
        Route::post('update-category', 'Api\V1\CategoriesController@updateCategory');
        // Route for user's listing
        Route::post('manage-status', 'Api\V1\CategoriesController@manageStatus');
    // Apply middleware for routes which will need authentication
    Route::group(['middleware' => 'auth:api'], function(){
        
    });
  
});

