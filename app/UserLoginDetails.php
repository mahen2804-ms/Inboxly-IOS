<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class UserLoginDetails extends Model
{
    protected $table = 'user_login_details';

    /**
     * @desc The attributes that are mass assignable.
     * @var array
     */
    protected $fillable = [
        'name'
    ];

    /**
     * @name getRemainderList
     * @desc fetch records on the basis of user id.
     * @return array
     */
    public static function getReminderListById($Id){
        $column = [
            'id',
            'title',
            'reminder_text',
            'reminder_time',
            'created_by as userCreated',
            'status'
        ];
        return self::select($column)
            ->where('id', $Id)
            ->Where('status', 1)
            ->get();
    }
    
    /**
     * @name getLoginUserToday
     * @desc fetch records on the basis of employer id.
     * @return array
     */
    public static function getLoginUserToday($employerId){

        $availableDate = date('Y-m-d');
        $column = [
                  'count(user_id) as user_id'
                  ];
                  
        return self::select($column)
            ->where('employer_id', $employerId)
            ->whereRaw(" cast(created_at as date) =  '".$availableDate."' group by employer_id")
            ->count();
    }
}
