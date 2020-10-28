<?php
Route::get('/', 'HomePageController@index');
Route::get('search', 'HomePageController@table')->name('search');
Route::get('categories/{category}', 'HomePageController@category')->name('category');
Route::get('companies/{company}', 'HomePageController@company')->name('company');
// reset password functionality
Route::get('password-reset', 'Auth\ForgotPasswordController@showForm'); //I did not create this controller. it simply displays a view with a form to take the email
Route::post('password-reset', 'Auth\ForgotPasswordController@sendPasswordResetToken');

Route::redirect('/home', '/admin');
Auth::routes(['register' => false]);

Route::get('clear', function() {
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('config:cache');
    Artisan::call('view:clear');
    return "Cleared!";
});

Route::group(['prefix' => 'admin', 'as' => 'admin.', 'namespace' => 'Admin', 'middleware' => ['auth']], function () {
    Route::post('users/update-password', 'UsersController@updatePassword');
    Route::get('/', 'HomeController@index')->name('home');

    // Permissions
    Route::delete('permissions/destroy', 'PermissionsController@massDestroy')->name('permissions.massDestroy');
    Route::resource('permissions', 'PermissionsController');

    // Roles
    Route::delete('roles/destroy', 'RolesController@massDestroy')->name('roles.massDestroy');
    Route::resource('roles', 'RolesController');

    // Dashboard
    Route::post('dashboard/getFilteredUser', 'DashboardController@index');
    Route::delete('dashboard/destroy', 'DashboardController@massDestroy')->name('dashboard.massDestroy');
    Route::resource('dashboard', 'DashboardController');

    // Users
    Route::post('users/update-password', 'UsersController@updatePassword');
    Route::post('users/check-password', 'UsersController@checkPassword');
    Route::get('users/change-password', 'UsersController@changePassword');
    
    Route::post('users/status', 'UsersController@updateStatus');
    Route::delete('users/destroy', 'UsersController@massDestroy')->name('users.massDestroy');
    Route::resource('users', 'UsersController');

});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
