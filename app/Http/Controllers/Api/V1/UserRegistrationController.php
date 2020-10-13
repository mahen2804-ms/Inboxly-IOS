<?php
die('shgdghsjd');
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
use App\Role;
use Helpers;
use URL;
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
            die('============');
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

                if($this->checkMobile($input['mobile'])) {
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

                    $checkUserRole = User::checkUser($input['email']);

                    if(!empty($checkUserRole)) {
                        $checkUserRole->assignRole('user');

                        //update user details
                        //generate otp
                        $randomid = Helpers::getRandomOTP();
                        //register user details
                        $input = $request->all();
                        $user = User::findOrFail($checkUserRole['id']);
                        $user->user_name = $input['userName'];
                        //$user->email = $input['email'];
                        $user->mobile_number = $input['mobile'];
                        $user->password = bcrypt($input['password']);
                        $user->is_verified = 0;
                        $user->is_initial_setup = 0;
                        $user->otp = $randomid;
                        $user->fcm_token = $input['FCMToken'];
                        $user->save();

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
                        $data['data'] = ['mobile_number' => $input['mobile'], 'email' => $input['email'], 'empCode' => $input['empCode']];
                        $code = config('constant.common.api_code.CREATE');
                        return $this->sendSuccessResponse($data, $code);


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
                        $data['data'] = ['mobile_number' => $input['mobile'], 'email' => $input['email'], 'empCode' => $input['empCode']];
                        $code = config('constant.common.api_code.CREATE');
                        return $this->sendSuccessResponse($data, $code);
                    }
                }
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

}
