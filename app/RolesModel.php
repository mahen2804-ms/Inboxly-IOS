<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RolesModel extends Model
{
    protected $table = 'model_has_roles';

     /**
     * @name getRole
     * @desc get role of login user
     * @param $code
     * @return array
     */
    public function getRole() { 
    	return $this->hasOne('\App\Role', 'id', 'role_id');
    }
}
