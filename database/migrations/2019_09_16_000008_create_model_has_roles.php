<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModelHasRoles extends Migration
{
    public function up()
    {
        Schema::create('model_has_roles', function (Blueprint $table) {
            $table->unsignedInteger('model_id');

            $table->foreign('model_id', 'model_id_fk_344234')->references('id')->on('users')->onDelete('cascade');

            $table->string('model_type');
            $table->unsignedInteger('role_id');

            $table->foreign('role_id', 'role_id_fk_344234')->references('id')->on('roles')->onDelete('cascade');
        });
    }
}
