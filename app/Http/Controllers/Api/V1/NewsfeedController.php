<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Controllers\ApiBaseController;
use Illuminate\Support\Facades\Validator;
use DB;
use PHPUnit\Framework\TestCase;
use Storage;
use App\SenderDetails;
use App\Newsfeed;


class NewsfeedController extends ApiBaseController
{
    private $_user;
    private $_request;
    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request) {
        // Execute authentication filter before processing any request
        //$this->middleware('auth');
        // Assign logged in user value
        $this->_user = Auth::user();
        $this->_request = $request;
    }

     /**
     * create a mailslurp configuration with API_KEY environment variable
     *
     * @return void
     */
     private function getConfig()
    {
        // create a mailslurp configuration with API_KEY environment variable
        // get your own free API KEY at https://app.mailslurp.com/sign-up/
        return \MailSlurp\Configuration::getDefaultConfiguration()
            ->setApiKey('x-api-key', config('constant.common.mailslurp_api_key'));
    }

     /**
         * @OA\Get(
         *     path="/api/v1/respponse",
         *     tags={"Fetch all detail of mail content"},
         *     summary="api fetch all details",
         *     operationId="fetchNewsfeed",
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
    public function fetchNewsfeed()
    {    
        Storage::put('file.txt', json_encode($this->_request->all()));  
        $emailId = $this->_request->emailId;
        // create an inbox controller
        $emailController = new \MailSlurp\Apis\EmailControllerApi(null, $this->getConfig());
        $email = $emailController->getEmail($emailId); 
        $sender = $this->_request->from;
        $senderName = explode('@', $sender);
        Storage::put(time().'_sender.txt', $sender);     
        $senderDetails = new SenderDetails();
        $senderDetails->name = $senderName[0];
        $senderDetails->email = $this->_request->from;
        $senderDetails->user_id = Auth::user()->id;
        $senderDetails->created_at = $this->_request->createdAt;

        if($senderDetails->save()) {
            $newsfeed = new Newsfeed();
            $newsfeed->title = $email->getSubject();
            $newsfeed->image = '';
            $newsfeed->description = $email->getBody();
            $newsfeed->date_time = date('Y-m-d h:i:s', strtotime($email->getUpadtedAt()));
            $newsfeed->user_id = Auth::user()->id;
            $newsfeed->sender_id = $senderDetails->id;
            $newsfeed->save();
        }

        Storage::put('email.txt', $email);         
    }

      /**
         * @OA\Get(
         *     path="/api/v1/newsfeed",
         *     tags={"All Newsfeed List"},
         *     summary="api to get all Newsfeed list",
         *     operationId="allNewsfeedList",
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
        public function allNewsfeedList()
        {
            try {
                //get frequency list
                $newsfeed = Newsfeed::allNewsfeedList($this->_request->filterValue);

                if(count($newsfeed) > 0) {
                    $data['data'] = $newsfeed;

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
         *     path="/api/v1/newsfeed-details",
         *     tags={"All Newsfeed details"},
         *     summary="api to get all Newsfeed details",
         *     operationId="allNewsfeedList",
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
        public function newsfeedDetails()
        {
            try {
                //get frequency list
                $newsfeed = Newsfeed::newsfeedDetails($this->_request->id);

                if(count($newsfeed) > 0) {
                    $data['data'] = $newsfeed;

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
         *     path="/api/v1/news-cayegories",
         *     tags={"All active categories List"},
         *     summary="api to get all categories list",
         *     operationId="allActiveCategories",
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
        public function allActiveCategories()
        {
            try {
                //get frequency list
                $categories = Categories::allActiveCategories();

                if(count($categories) > 0) {
                    $data['data'] = $categories;

                    return $this->sendSuccessResponse($data);
                } else {
                    return $this->sendFailureResponse(config('constant.common.messages.RECORD_NOT_FOUND'));
                }
            } catch(Exception $ex) {
                return $this->sendFailureResponse();
            }
        }

}
