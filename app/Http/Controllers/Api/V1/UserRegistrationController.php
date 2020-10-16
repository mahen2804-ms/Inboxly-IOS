<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\ApiBaseController;
use App\User;
use DemeterChain\A;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Mockery\Exception;
use App\Roles;
use Helpers;
use URL;
use App\UserDevices;
use App\UserLoginDetails;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserRegistrationController extends ApiBaseController
{
    private $_user;
    private $_request;
    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request) {
        // Assign logged in user value
        $this->_user = Auth::user();
        $this->_request = $request;
    }

    /**
     * @OA\Post(
     *     path="/api/v1/user-registration",
     *     tags={"User Registration"},
     *     summary="Api for store user profile",
     *     operationId="store",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="firstName",type="string"),
     *                 @OA\Property(property="lastName",type="string"),
     *                 @OA\Property(property="userName",type="string"),
     *                 @OA\Property(property="email",type="string"),
     *                 @OA\Property(property="recovery_email",type="string"),
     *                 @OA\Property(property="password",type="string"),
     *                
     *
     *                 example={"firstName": "Jimmy","lastName": "Nisham","userName": "Jimmy","email": "manjinder@gmail.com","mobile": "+97355880058","password": "Mj@123"}
     *             )
     *         )
     *     ),
     *     @OA\Response(response=200,description="OK"),
     *     @OA\Response(
     *         response="default",
     *         description="unexpected error",
     *         @OA\Schema(ref="#/components/schemas/Error")
     *     )
     * )
     */
    public function userRegistration(Request $request)
    {
        try {
            $input = $request->all();

            //vadilations
            $validUserApi = User::validationRulesForApiUser();
            $validUserCommon = User::validationRulesCommon();
            $allValidations  = array_merge($validUserApi,$validUserCommon);
            $validator = Validator::make($input,$allValidations, User::$validationMessages);

            /*check fields validation on server side*/
            if($validator->fails()) {

                /*Redirect user back with input if server side validation fails*/
                $errors = $validator->errors();
                $errorsMsg = "";

                if ($errors->first()) {
                    $errorsMsg .= " " . $errors->first();
                }
                return $this->sendFailureResponse($errorsMsg);
            } else {

                if($this->checkUserName($input['userName'])) {
                    $this->_response =config('constant.common.messages.USER_ALREADY_EXIST');
                    $code = config('constant.common.api_code.FAILED');
                    $data = $this->_response;
                    return $this->sendFailureResponse($data, $code);
                } elseif($this->checkEmail($input['email'])) {
                    $this->_response =config('constant.common.messages.EMAIL_ALREADY_EXIST');
                    $code = config('constant.common.api_code.FAILED');
                    $data = $this->_response;
                    return $this->sendFailureResponse($data, $code);
                } else {
                    //generate otp
                    $randomid = Helpers::getRandomOTP();
                    //register user details
                    $input = $request->all();
                    $user = new User();
                    // $user->first_name = $input['firstName'];
                    // $user->last_name = $input['lastName'];
                    $user->user_name = $input['name'];
                    $user->email = $input['email'];
                    $user->recovery_email = $input['recovery_email'];
                    //$user->mobile_number = $input['mobile'];
                    $user->password = bcrypt($input['password']);
                    $user->is_verified = 0;
                    $user->is_initial_setup = 0;
                    $user->otp = $randomid;
                    //$user->fcm_token = $input['FCMToken'];
                    $user->save();
                    $user->assignRole('user');

                    /*mail send to user for creating a new account*/
                    try {
                        $dats['user'] = ['userName' => $input['userName'], 'otp' => $randomid];
                        $subject = 'Inboxly App - Account created.';
                        Helpers::sendEmail('emails.user-otp', $dats,$user['recovery_email'], $user['recovery_email'], $subject);
                    } catch (Exception $ex) {
                        $error['message'] = config('constant.common.messages.INVALID_EMAIL');
                        return $this->sendFailureResponse($error);
                    }
                    DB::commit();
                    $data['message'] = 'success';
                    $data['data'] = ['email' => $input['email']];
                    $code = config('constant.common.api_code.CREATE');
                    return $this->sendSuccessResponse($data, $code);
                    
                }
            }
        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

    /**
     * @name checkUserName
     * @desc checkUserName is exist in database or not
     * @return int
     */
    public function checkUserName($userName,$userId= '') {
        try {
            //check user enter email is already exist in database
            $checkName = User::checkUserName($userName);

            if(!empty($checkName)) {
                return 1;
            } else {
                return 0;
            }

        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

    /**
     * @name checkEmail
     * @desc check email is exist in database or not
     * @return int
     */
    public function checkEmail($email, $userId= '') {
        try {
            //check user enter email is already exist in database
            $checkEmail = User::checkEmailUser($email);

            if(!empty($checkEmail)) {

                if($checkEmail->id == $userId) {
                    return 0;
                } else {
                    return 1;
                }
            } else {
                return 0;
            }
        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

    /**
     * @name checkMobile
     * @desc checkMobile is exist in database or not
     * @return int
     */
    public function checkMobile($userMobile,$userId= '') {
        try {
            //check user enter email is already exist in database
            $checkMobile = User::checkMobile($userMobile);

            if(!empty($checkMobile)) {
                return 1;
            } else {
                return 0;
            }

        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

     /**
     * @OA\Get(
     *     path="/api/v1/validate-otp/{otp}/{mobile}/{email}",
     *     tags={"Validate OTP"},
     *     summary="api to validate otp",
     *     operationId="validateOTP",
     *  @OA\Parameter(name="otp",in="path",required=false,
     *     description="otp given to user",
     *     ),
     *  @OA\Parameter(name="mobile",in="path",required=false,
     *     description="mobile no of user",
     *     ),
     *  @OA\Parameter(name="email",in="path",required=false,
     *     description="email of user",
     *     ),
     *   @OA\Parameter(name="deviceId",in="path",required=false,
     *     description="device id of user",
     *     ),
     *    @OA\Response(
     *         response=200,
     *         description="Ok"
     *     ),
     *      @OA\Response(
     *         response="default",
     *         description="unexpected error",
     *         @OA\Schema(ref="#/components/schemas/Error")
     *     )
     * )
     */
    public function validateOTP($otp,$email,$deviceId,$deviceType) {
        try {
            $numlength = strlen((string)$otp);

            if (is_numeric($otp) && $numlength == 6) {
                //check otp is already exist in database
                $checkOtp = User::checkOTP($otp, $email);

                if (!empty($checkOtp)) {

                    // Update isVerified true in users table
                    $data['isVerified'] = true;
                    $user = User::getUserByEmailID($email);

                    //update device type when login
                    $updateDeviceType = User::findOrFail($user['id']);
                    $updateDeviceType->device_type = $deviceType;
                    $updateDeviceType->save();

                    if(empty($user)) {
                        return $this->sendFailureResponse(config('constant.common.messages.RECORD_NOT_FOUND'));
                    }
                    
                    $userDetails = User::getUserByEmail($user['email']);

                    if (count($userDetails) > 0) {
                        $data['data']['userDetail'] = $userDetails[0];

                        $user = User::findOrFail($userDetails[0]['id']);
                        $token = $user->createToken(config('constant.common.token_name.MY_APP'))->accessToken;
                        $data['data']['token'] = $token;
                        //update device table
                        $deviceTableUpdate = $this->updateUserDevices($user['id'], $deviceId);

                        if($deviceTableUpdate == false) {
                            return $this->sendFailureResponse(config('constant.common.messages.EXCEPTION_ERROR'));
                        }
                        $updateOtp = User::updateOTPTOZero($email);
                        //insert data into user login details
                        $loginDetails = $this->insertLoginDetails($user['id'], $deviceId);
                        return $this->sendSuccessResponse($data);
                    }

                } else {
                    return $this->sendFailureResponse(config('constant.common.messages.INVALID_OTP'));
                }
            } else {
                return $this->sendFailureResponse(config('constant.common.messages.IS_NUMERIC'));
            }
        } catch(ModelNotFoundException $ex) {
            return $this->sendFailureResponse(config('constant.common.messages.RECORD_NOT_FOUND'));
        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

    /**
     * @OA\Get(
     *     path="/api/v1/resend-otp/{mobile}/{email}",
     *     tags={"Resend OTP"},
     *     summary="api to resend otp",
     *     operationId="resendOTP",
     *  @OA\Parameter(name="email",in="path",required=false,
     *     description="email of user",
     *     ),
     *    @OA\Response(
     *         response=200,
     *         description="Ok"
     *     ),
     *      @OA\Response(
     *         response="default",
     *         description="unexpected error",
     *         @OA\Schema(ref="#/components/schemas/Error")
     *     )
     * )
     */
    public function resendOTP($email) {
        try {
            //Regenerate otp
            $randomid =  Helpers::getRandomOTP();;
            //update otp for same user
            $updateOTP = User::updateOTP($randomid,$email);

            if($updateOTP) {
                //Get user details for sending sms and email
                $user = User::getUserByEmailID($email);
                
                if(!empty($user)) {

                    /*mail send to user for creating a new account*/
                    try {
                        $dats['user'] = ['userName' => $user['user_name'], 'otp' => $randomid];
                        $subject = 'Inboxly App - Account created.';
                        Helpers::sendEmail('emails.user-otp', $dats, $user['recovery_email'], $email, $subject);
                    } catch(Exception $ex) {
                        $error['message'] = config('constant.common.messages.INVALID_EMAIL');
                        return $this->sendFailureResponse($error);
                    }

                    $data['message'] = config('constant.common.messages.OTP_RESEND');
                    return $this->sendSuccessResponse($data);
                } else {
                    return $this->sendFailureResponse(config('constant.common.messages.RECORD_NOT_FOUND'));
                }
            } else {
                return $this->sendFailureResponse(config('constant.common.messages.EXCEPTION_ERROR'));
            }
        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

     /**
     * @name updateUserDevices
     * @desc update user device table
     * @param $id, $password
     * @return array
     */
    public function updateUserDevices($userId, $deviceId) {
        try{
            //if exist user then update device id
            $already = UserDevices::checkAlreadyDevice($userId);

            if($already > 0) {
                $update =  UserDevices::updateDevice($userId, $deviceId);

                if($update) {
                    return true;
                } else {
                    return false;
                }

            } else {
                //insert data into user device
                $newDevice = new UserDevices();
                $newDevice->user_id = $userId;
                $newDevice->device_id = $deviceId;

                if($newDevice->save()) {
                    return true;
                } else {
                    return false;
                }
            }


        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

    /**
     * @OA\Post(
     *     path="/api/v1/login",
     *     tags={"User"},
     *     summary="api for user login",
     *     operationId="login",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="user_name",type="string"),
     *                 @OA\Property(property="password",type="string"),
     *                 example={"username": "Mj", "password": "Mj@123"}
     *             )
     *         )
     *     ),
     *     @OA\Response(response=200,description="OK")
     * )
     */
    public function login(Request $request){

        try {

            $loginArray = array(
                'user_name' => request('username'),
                'password' => request('password'),
                'status' => 1
            );

            if (Auth::attempt($loginArray)) {

                //insert device id into user devices table
                $deviceID = $request->deviceId;
                $devices = UserDevices::getDevices(Auth::user()->id, $deviceID);

                $user = Auth::user();
                die($user);
                $token = $user->createToken(config('constant.common.token_name.MY_APP'))->accessToken;
                
                //update device type when login
                $updateDeviceType = User::findOrFail($user['id']);
                $updateDeviceType->device_type = $request->deviceType;
                $updateDeviceType->save();

                //Get user details by email id
                if ($user['is_initial_setup'] && $user['is_verified']) {
                    $userDetails = User::getUserByEmail($user['email']);

                    if(!empty($request->FCMToken)) {
                        $fcmTokenUpdate = $this->updateFCMToken(Auth::user()->id, $request->FCMToken);
                    }

                    if (!empty($userDetails['profile_picture'])) {
                        $userDetails['user'][0]['profile_picture'] = URL::to('/') . config('constant.common.file_path.USER_IMAGE') . $userDetails['user'][0]['profile_picture'];
                    } else if(!empty(Auth::user()->profile_picture)) {
                        $userDetails['user'][0]['profile_picture'] = URL::to('/') . config('constant.common.file_path.USER_IMAGE') . Auth::user()->profile_picture;
                    } else {
                        $userDetails['user'][0]['profile_picture'] = '';
                    }

                    if (count($userDetails) > 0) {
                        $data['data']['userDetail'] = $userDetails[0];
                        $data['data']['token'] = $token;
                        //check device already exist
                        if (count($devices) > 0) {
                            $data['data']['deviceID'] = true;
                        } else {
                            //insert new deice
                            $deviceTableUpdate = $this->updateUserDevices(Auth::user()->id, $deviceID);
                            if($deviceTableUpdate == false) {
                                return $this->sendFailureResponse(config('constant.common.messages.EXCEPTION_ERROR'));
                            }
                            $data['data']['deviceID'] = false;
                        }
                        //insert data into user login details
                        $loginDetails = $this->insertLoginDetails(Auth::user()->id, $deviceID );
                        return $this->sendSuccessResponse($data);
                    }
                    
                }
            } else {
                return $this->sendFailureResponse(config('constant.common.messages.VALID_CREDENTIALS'), config('constant.common.api_code.UNAUTHORIZED'));
            }
        } catch (\Exception $e) {
            return $this->sendFailureResponse();
        }
    }

    /**
     * @name insertLoginDetails
     * @desc insert login details
     * @param $id, $password
     * @return array
     */
    public function insertLoginDetails($userId, $deviceId ) {
        try{
            //insert data into user login details
            $loginDetails = new UserLoginDetails();
            $loginDetails->user_id = $userId;
            $loginDetails->device_id = $deviceId;
            $loginDetails->created_by = $userId;

            if($loginDetails->save()) {
                return true;
            } else {
                return false;
            }

        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

     /**
     * @OA\Post(
     *     path="/api/v1/forgot-password",
     *     tags={"Forgot Password"},
     *     summary="Api to get user password",
     *     operationId="forgotPassword",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="email",type="string"),
     *                example={"email": "manjinder07031990@gmail.com"}
     *             )
     *         )
     *     ),
     *     @OA\Response(response=200,description="OK"),
     *     @OA\Response(
     *         response="default",
     *         description="unexpected error",
     *         @OA\Schema(ref="#/components/schemas/Error")
     *     )
     * )
     */
    public function forgotPassword(Request $request) {
        try {
            //check email exist
            $email = $request->email;
            $isExist = User::checkUser($email);

            if((!empty($isExist)) ){
                //Regenerate otp
                $randomid =  Str::random(10);
                //update otp for same user
                $updatePassword = User::updatePassword($randomid,$email);

                if($updatePassword) {
                    //Get user details for sending sms and email
                    $user = User::getUserByEmailID($email);

                    if(!empty($user)) {
                        try {
                            $dats = ['name' => ucfirst($user['user_name']), 'password' => $randomid, 'email'=>$email];
                            $subject = 'Inboxly App - Forgot password.';
                            Helpers::sendEmail('emails.password', $dats, $user['recovery_email'], $email,  $subject);
                        } catch(Exception $ex) {
                            $error['message'] = config('constant.common.messages.INVALID_EMAIL');
                            return $this->sendFailureResponse($error);
                        }
                    } else {
                        return $this->sendFailureResponse(config('constant.common.messages.RECORD_NOT_FOUND'));
                    }

                    $data = config('constant.common.messages.EMAIL_SEND');
                    return $this->sendSuccessResponse($data);
                }
            } else {
                return $this->sendFailureResponse(config('constant.common.messages.EMAIL_NOT_EXIST'));
            }
        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

}
