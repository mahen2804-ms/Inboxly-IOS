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
     *                 @OA\Property(property="mobile",type="string"),
     *                 @OA\Property(property="password",type="string"),
     *                 @OA\Property(property="empCode",type="string"),
     *                 @OA\Property(property="departmentCode",type="int"),
     *                 @OA\Property(property="employerId",type="int"),
     *
     *                 example={"firstName": "Jimmy","lastName": "Nisham","userName": "Jimmy","email": "manjinder@gmail.com","mobile": "+97355880058","password": "Mj@123","empCode": "emp123456","departmentCode": "1","employerId": "1"}
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
                } elseif($this->checkMobile($input['mobile'])) {
                    $this->_response =config('constant.common.messages.MOBILE_ALREADY_EXIST');
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
                    $user->first_name = $input['firstName'];
                    $user->last_name = $input['lastName'];
                    $user->user_name = $input['userName'];
                    $user->email = $input['email'];
                    $user->mobile_number = $input['mobile'];
                    $user->password = bcrypt($input['password']);
                    $user->is_verified = 0;
                    $user->is_initial_setup = 0;
                    $user->otp = $randomid;
                    $user->fcm_token = $input['FCMToken'];
                    $user->save();
                    $user->assignRole('user');

                    /*mail send to user for creating a new account*/
                    try {
                        $dats['user'] = ['userName' => $input['userName'], 'otp' => $randomid];
                        $subject = 'Inboxly App - Account created.';
                        Helpers::sendEmail('emails.user-otp', $dats, $user['email'], $user['email'], $subject);
                    } catch (Exception $ex) {
                        $error['message'] = config('constant.common.messages.INVALID_EMAIL');
                        return $this->sendFailureResponse($error);
                    }
                    DB::commit();
                    $data['message'] = 'success';
                    $data['data'] = ['mobile_number' => $input['mobile'], 'email' => $input['email']];
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
                        $loginDetails = $this->insertLoginDetails(Auth::user()->id, $deviceID , Auth::user()->employer_id);
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
}
