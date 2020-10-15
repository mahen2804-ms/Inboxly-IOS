<?php

namespace App;

use Carbon\Carbon;
use Hash;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use OwenIt\Auditing\Contracts\Auditable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements Auditable
{
    use Notifiable, HasApiTokens, HasRoles;
    use SoftDeletes;
    use \OwenIt\Auditing\Auditable;


    public $table = 'users';

    /**
     * @desc Should the audit be strict?
     * @var bool
     */
    protected $auditStrict = true;

    /**
     * @desc Attributes to include in the Audit.
     * @var array
     */
    protected $auditInclude = [
        'first_name',
        'last_name',
        'user_name',
        'email',
        'recovery_email',
        'mobile_number',
        'password',
        'status',
        'facebook_token',
        'device_token',
        'device_type',
        'profile_pic',
        'google_token',
        'forgot_pass_code',
        'verification_code',
        'verification_code_datetime',
        'created_at',
        'updated_at',
        'created_by',
        'updated_by'
    ];

    /**
     * @desc Auditable events.
     * @var array
     */
    protected $auditEvents = [
        'deleted',
        'restored',
        'created',
        'saved',
        'deleted',
        'updated',
        'update',
        'retrieved'
    ];

    /**
     * @desc The attributes that should be hidden for arrays.
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * @desc The attributes that are dates assignable.
     * @var array
     */
    protected $dates = [
        'updated_at',
        'created_at',
        'deleted_at',
        'email_verified_at',
    ];

    /**
     * @desc The attributes that are mass assignable.
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'user_name',
        'email',
        'recovery_email',
        'mobile_number',
        'password',
        'status',
        'profile_picture',
        'forgot_pass_code',
        'verification_code',
        'verification_code_datetime', 
        'fcm_token'
    ];

     /**
     * @desc The attributes that should be cast to native types.
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'status' => 'boolean',
        'is_verified' => 'boolean',
        'is_initial_setup' => 'boolean',
        'is_first_time' => 'boolean'
    ];

    /**
     * @name getUserPermissionsViaRoles
     * @desc for get user permissions via role
     * @param $id
     * @return array
     */
    public static function getUserPermissionsViaRoles($id) {
        $user = User::findOrfail($id);
        $permissions = $user->getPermissionsViaRoles();
        $permissionList = [];

        if($permissions && count($permissions) > 0) {

            foreach ($permissions as $permission) {
                array_push($permissionList, $permission->name);
            }

        }

        return $permissionList;
    }

    /**
     * @name getUserRoles
     * @desc get user all roles
     * @param $id
     * @return mixed
     */
    public static function getUserRoles($id) {
        $roles = self::findOrfail($id)->getRoleNames();

        return $roles;
    }

    /**
     * @name roleAssign
     * @desc get user all roles
     * @param $id
     * @return mixed
     */
    public  function roleAssign() {
        return $this->hasOne('\App\RolesModel', 'model_id', 'id')->with('getRole');
    }

    /**
     * @name checkUserRoles
     * @desc to check logged in user role for api
     * @param $id
     * @return mixed
     */
    public static function checkUserRoles($id) {
        $roles = DB::table('model_has_roles')
            ->select('role_id')
            ->where('model_id', $id)
            ->get();

        return $roles;
    }

    /**
     * @name checkEmail
     * @desc check email already exist or not
     * @param $email
     * @return mixed
    */
    public static function checkEmail($email, $userId = '') {
        $email = self::leftJoin('model_has_roles', 'model_has_roles.model_id', '=', 'users.id')
        ->leftJoin('roles', 'roles.id', '=','model_has_roles.role_id')
        ->where('users.email', $email)
        ->where('model_has_roles.role_id', config('constant.common.user_role_id'));

        if(!empty($userId)) {
            $email = $email->where('id', '!=', $userId);
        }

        //$email = $email->where('status', 1)
        $email = $email->first();

        return $email;
    }

    /**
     * check email already exist or not for resend code api
     * @param $email
     * @return array
     */
    public static function checkEmailForResendCode($email) {
        return self::where('email', $email)
            ->where('deleted_at', null)
            ->first();
    }

    /**
     * @name checkPassword
     * @desc to verify the password in db
     * @param $email
     * @param $password
     * @return mixed
     */
    public static function checkPassword($email, $password) {
        return self::where('email', $email)
            ->where('password', $password)
            ->first();
        }

    /**
     * @name checkValidCode
     * @desc check valid code for forgot reset password
     * @param $code
     * @return mixed
     */
    public static function checkValidCode($code) {
        return self::where('forgot_pass_code', $code)->first();
    }

    /**
     * @name checkValidCodeForSignup
     * @desc check valid code for signup
     * @param $code
     * @return array
     */
    public static function checkValidCodeForSignup($code, $email) {
        return self::where('verification_code', $code)
            ->where('email', $email)
            ->first();
    }

    /**
     * @name resetPassword
     * @desc update code and password on reset password
     * @param $id, $password
     * @return array
     */
    public static function resetPassword($id, $password) {
        return self::where('id', $id)->update(['password' => $password, 'forgot_pass_code' => Null]);
    }

    /**
     * @name AauthAcessToken
     * @desc to remove access token on logout from mobile app
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function AauthAcessToken() {
       return $this->hasMany('\App\OauthAccessToken');
    }

    /**

     * @name validationRulesForUser
     * @desc validation rules for add user form
     * @return array
     */
    public static function validationRulesForUser() {
        return [
            'name' => 'required|max:50'
        ];
    }

    /**
     * @name validationRulesForApiUser
     * @desc validation rules for add user form
     * @return array
     */
    public static function validationRulesForApiUser() {

        return [
            'userName' => 'required|max:50',
            'firstName' => 'required|max:50',
            'lastName' => 'required|max:50',
            'recovery_email' => 'required|email|max:70|unique:users',
            'password' => [
                'required',
                'min:8',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/'
            ],
        ];
    }

    /**
     * @name validationRulesCommon
     * @desc validation rules for add user form
     * @return array
     */
    public static function validationRulesCommon() {

        return [
            'email' => 'required|email|max:70|unique:users|regex:/^[A-Za-z0-9\.]*@(inboxly)[.](com)$/',
        ];
    }

     /**
     * @name validationRulesCommon
     * @desc validation rules for add user form
     * @return array
     */
    public static function validationRulesForProfile() {

        return [
            'first_name' => 'required|max:50',
            'last_name' => 'required|max:50',
            'email' => 'required|email|max:50',
        ];
    }

    /**
     * @name Validation messages
     * @var array
     */
    public static $validationMessages = [
        'password.regex' => 'Password should be combination of alphabets, numbers and special characters',
        'password.required' => 'Please enter password',
        'cPassword.required' => 'Please enter confirm password',
        'new_password.required' => 'Please enter new password',
        'cPassword.same' => 'The password and confirm password must match',
        'email.unique' => 'This user already exists. Please use another email id to create an account',
        'email.between' => 'Email address should have 07 to 70 characters only',
        'email.required' => 'Please enter your email address',
        'email.email' => 'Invalid email. Please enter a valid email.',
        'email.max' => 'The email should have max 50 characters.',
        'first_name.required' => 'Please enter your first name',
        'last_name.required' => 'Please enter your last name',
        'new_password.regex' => 'New password should be combination of alphabets, numbers and special characters'  , 
        'name.required'=> 'Name is required',
        'name.pattern' => 'Name contains only alphabets characters',
        'admin_search.required'  => 'Search value is required',
        'status.required'  => 'Status is required',        
    ]; 


    /**
     * @name checkOTP
     * @desc check OTP already exist or not
     * @param $email
     * @return mixed
     */
    public static function checkOTP($otp,$email) {
        return self::where('otp', $otp)
            ->where('email', $email)
            ->where('status', 1)
            ->first();
    }

    /**
     * @name updateUsersIsVerified
     * @desc update is verified field in users.
     * @return array
     */
    public static function updateUsersIsVerified($email) {
        $record = self::where('email',$email)
            ->update(['is_verified' => 1, 'otp' => 0]);
    }


    /**
     * @name updateOTP
     * @desc update OTP
     * @param $email
     * @return mixed
     */
    public static function updateOTP($otp,$email) {
        return self::where('email', $email)->update(['otp' =>$otp]);
    }

    /**
     * @name getUserByEmailID
     * @desc fetch records on the basis of email id.
     * @return array
     */
    public static function getUserByEmailID($email) {
        $column = [
            'id',
            'first_name',
            'last_name',
            'email',
            'mobile_number',
            'gender',
            'employer_id',
            'created_at as added_on',
            'updated_at',
            'status',
            'user_name',
            'is_initial_setup'
        ];
        return self::select($column)->where('email', $email)->first();
    }

    /**
     * @name updatePaswordByEmail
     * @desc update code and password on reset password
     * @param $password, $email
     * @return array
     */
    public static function updatePaswordByEmail($password,$email) {

        return self::where('email', $email)->update(['password' => $password]);
    }

    
    /**
     * @name updateInitialSetup
     * @desc update updateInitialSetup
     * @param $id, $password
     * @return array
     */
    public static function updateInitialSetup($id) {

        return self::whereNotNull('dob')
            ->whereNotNull('gender')
            ->whereNotNull('job_role_id')
            ->where('job_role_id','!=',0)
            ->update(['is_initial_setup' => 1]);
    }

    /**
     * @name checkUserName
     * @desc check
      already exist or not
     * @param $email
     * @return mixed
     */
    public static function checkUserName($userName) {
        return self::where('user_name', $userName)
            ->where('status', 1)
            ->first();
    }

    /**
     * @name checkMobile
     * @desc checkMobile already exist or not
     * @param $email
     * @return mixed
     */
    public static function checkMobile($userMobile) {
        return self::where('mobile_number', $userMobile)
            ->where('status', 1)
            ->first();
    }

    /**
     * @name updateOTPTOZeor
     * @desc update is otp to zero.
     * @return array
     */
    public static function updateOTPTOZero($email) {
        $record = self::where('email',$email)
            ->update(['otp' => 0]);
    }

    /**
     * @name getUserByEmail
     * @desc fetch records on the basis of User id.
     * @return array
     */
    public static function getUserByEmail($email) {
        $column = [
            'id',
            'first_name',
            'last_name',
            'email',
            'mobile_number',
            'gender',
            'employer_id',
            'is_verified',
            'is_initial_setup',
            'user_name',
            'profile_pic',
            'dob',
            'year_at_org',
            'created_at as added_on',
            'updated_at',
            'status',
        ];

        return self::select($column)->where('email', $email)->get()->toArray();
    }

    /**
     * @name updateFirstTime
     * @desc update FirstTime in users.
     * @return array
     */
    public static function updateFirstTime($id) {
        $record = self::where('id',$id)->update(['is_first_time' => 1]);
    }

    /**
    * @name getUserById
    * @param string $id
    * @desc fetch particular user by id.
    * @return array
    */
    public static function getUserById($id) {
        return self::select('id','first_name','last_name','email','profile_pic', 'mobile_number')->where('id', $id)->first();
    }

    /**
    * @name checkDuplicateUserName
    * @param string $userName  $id
    * @desc fetch username by id.
    * @return array
    */
    public static function checkDuplicateUserName($userName, $id=null) {
        $query = self::where('user_name', $userName);

        if (isset($id) && $id != '') {
            $query -> where('id', '!=', $id);
        }

        $query = $query -> first();
        return $query;
    }

    /**
    * @name checkDuplicateContactNumber
    * @param string $contactNumber  $id
    * @desc fetch username by id.
    * @return array
    */
    public static function checkDuplicateContactNumber($contactNumber, $id=null) {
        $query = self::where('mobile_number', $contactNumber);

        if (isset($id) && $id != '') {
            $query -> where('id', '!=', $id);
        }

        $query = $query -> first();

        return $query;
    }

    /**
     * @name getUserDetails
     * @desc fetch records of admin table
     * @return mixed
     */
    public static function getUserDetails($filters=[]) {

        $record = self::where('fcm_token','!=',null)
            ->where('fcm_token', '!=', '')
            ->where('status', 1)
            ->get();

        return $record;
    }

     /*
     * @name checkUser
     * @desc get existing user
     * @return array
     */
    public static function checkUser($email) {
        //return a device token, either from the model or from some other place. 
        return self::where('email', $email)->first();
    }

    /**
     * @name checkEmailUser
     * @desc check email already exist or not
     * @param $email
     * @return mixed
     */
    public static function checkEmailUser($email, $userId = '') {
        $email = self::leftJoin('model_has_roles', 'model_has_roles.model_id', '=', 'users.id')
            ->where('users.email', $email)
            ->where('model_has_roles.role_id', config('constant.common.user_role_id'));

        if(!empty($userId)) {
            $email = $email->where('id', '!=', $userId);
        }

        //$email = $email->where('status', 1)
        $email = $email->first();

        return $email;
    }
    
}
