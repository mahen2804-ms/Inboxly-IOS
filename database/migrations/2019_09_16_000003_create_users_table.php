<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('user_name')->default('null');
            $table->string('first_name')->default('null');
            $table->string('last_name')->default('null');
            $table->string('email');
            $table->string('recovery_email');
            $table->string('mobile_number',15)->nullable();
            $table->datetime('email_verified_at')->nullable();
            $table->string('password');
            $table->boolean('status')->default(1);
            $table->string('profile_pic',250)->nullable();
            $table->rememberToken();
            $table->string('device_type')->nullable();
            $table->enum('gender', ['male', 'female','Prefer not to say','Non-binary']);
            $table->DATE('dob')->nullable();
            $table->string('fcm_token')->nullable();
            $table->unsignedBigInteger('verification_Code')->default(0);
            $table->unsignedBigInteger('otp')->nullable();
            $table->unsignedSmallInteger('is_initial_setup')->default(0);
            $table->unsignedSmallInteger('is_verified')->default(0);
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->unsignedBigInteger('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }
}
