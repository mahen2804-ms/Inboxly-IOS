<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use DB;

class UserDevices extends Model
{
    use Notifiable;
    protected $table = 'user_devices';

    /**
    * @desc The attributes that are mass assignable.
    * @var array
    */
        protected $fillable = [
            'user_id',
            'device_id',
        ];

    /**
     * @name routeNotificationForFcm
     * @desc for notification
     * @param $id
     * @return array
     */
    public function routeNotificationForFcm() {
        //return a device token, either from the model or from some other place. 
        return $this->device_id;
    }

    /**
     * @name getDevices
     * @desc fetch records on the basis of user id.
     * @return array
     */
    public static function getDevices($user_id,$deviceID){
         $column = [
                     'id',
                     'user_id',
                     'device_id',
                   ];
        return self::select($column)
                   ->where('user_id', $user_id)
                   //->where('device_id', $deviceID)
                   ->get()->toArray();
    }

    /**
     * @name userDeviceDetails
     * @desc fetch records on the basis of user id.
     * @return array
     */
    public static function getUserDevicesDetails($userId) {
        $column = [
                     'user_devices.id',
                     'user_devices.user_id',
                     'user_devices.device_id',
                   ];
        return self::select($column)
                   ->where('user_id', $userId)
                   ->get();
    }

    /**
     * @name checkAlreadyDevice
     * @desc fetch records on the basis of user id.
     * @return array
     */
    public static function checkAlreadyDevice($userId) {

        return self::where('user_id', $userId)
                   ->count();
    }


    /**
     * @name updateDevice
     * @desc fetch records on the basis of user id.
     * @return array
     */
    public static function updateDevice($userId, $deviceId) {

        return self::where('user_id', $userId)
                   ->where('device_id', $deviceId)
                   ->update(['device_id' => $deviceId]);
    }


}
