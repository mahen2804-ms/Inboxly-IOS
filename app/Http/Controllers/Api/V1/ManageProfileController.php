<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiBaseController;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Mockery\Exception;
use App\Roles;
use Helpers;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ManageProfileController extends ApiBaseController
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
         * @OA\Get(
         *     path="/api/v1/view-profile",
         *     tags={"view profile"},
         *     summary="api to get details of user",
         *     operationId="viewUser",
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
        public function viewUser()
        {
            try {
                //get frequency list
                $user = User::find(6);

                if(!empty($user)) {
                    $data['data'] = $user;

                    return $this->sendSuccessResponse($data);
                } else {
                    return $this->sendFailureResponse(config('constant.common.messages.RECORD_NOT_FOUND'));
                }
            } catch(Exception $ex) {
                return $this->sendFailureResponse();
            }
        }

        /**
         * @OA\Get(
         *     path="/api/v1/edit-profile",
         *     tags={"edit profile"},
         *     summary="api to get details of user",
         *     operationId="editUser",
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
        public function editUser()
        {
            try {
                //get frequency list
                $user = User::find(6);

                if(isset($this->_request->user_name) && !empty($this->_request->user_name)) {
                	$user->update(['user_name'=>$this->_request->user_name]);
                } elseif(isset($this->_request->recovery_email) && !empty($this->_request->recovery_email)) {
                	$user->update(['recovery_email'=>$this->_request->recovery_email]);
                }

                if(!empty($user)) {
                    $data['data'] = $user;
                     $data['message'] = config('constant.common.messages.RECORDS_UPDATED');

                    return $this->sendSuccessResponse($data);
                } else {
                    return $this->sendFailureResponse(config('constant.common.messages.RECORD_NOT_FOUND'));
                }

            } catch(Exception $ex) {
                return $this->sendFailureResponse();
            }
        }

         /**
         * @OA\Get(
         *     path="/api/v1/delete-profile",
         *     tags={"delete profile"},
         *     summary="api to get details of user",
         *     operationId="deleteUser",
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
        public function deleteUser()
        {
            try {
                //get frequency list
                $user = User::find(6);
                $user->delete();

                if(!empty($user)) {
                    $data['data'] = $user;
                    $data['message'] = config('constant.common.messages.RECORDS_DELETED');

                    return $this->sendSuccessResponse($data);
                } else {
                    return $this->sendFailureResponse(config('constant.common.messages.RECORD_NOT_FOUND'));
                }

            } catch(Exception $ex) {
                return $this->sendFailureResponse();
            }
        }

         /**
     * check password exist in records or not.
     *
     * @return \Illuminate\Http\Response
     */
    public function checkPassword() { 
        try {
            $password = $this->_request->current_password;
            $user = User::findOrFail(Auth::user()->id);
            
            if(Hash::check($password, $user->password)) {
                return $this->sendSuccessResponse($user);
            } else {
                return $this->sendFailureResponse(config('constant.common.messages.RECORD_NOT_FOUND'));
            }

        } catch(Exception $ex) { 
           return $this->sendFailureResponse();
        }
    }

    /**
     * update new password.
     *
     * @return \Illuminate\Http\Response
     */
    public function updatePassword() { 
        try {
            $user = User::findOrFail(Auth::user()->id);
            $user->update(['password'=>$this->_request->password]);
            
            if(!empty($user)) {
                $data['data'] = $user;
                $data['message'] = config('constant.common.messages.RECORDS_UPDATED');

                return $this->sendSuccessResponse($data);
            } else {
                return $this->sendFailureResponse(config('constant.common.messages.RECORD_NOT_FOUND'));
            }

            return $this->sendSuccessResponse($user);
        } catch(Exception $ex) { 
           return $this->sendFailureResponse();
        }
    }
}
