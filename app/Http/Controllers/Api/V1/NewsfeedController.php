<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use PHPUnit\Framework\TestCase;
use Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Controllers\ApiBaseController;
use Illuminate\Support\Facades\Validator;
use DB;
use Storage;
use App\SenderDetails;
use App\Newsfeed;
use App\Categories;
use App\UserNewsCategory;
use App\SaveNewsfeed;
use App\ArchiveNewsfeed;
use App\UserSenderCategory;
use App\SenderSnoozeTimer;


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

     private function getConfig()
    {
        // create a mailslurp configuration with API_KEY environment variable
        // get your own free API KEY at https://app.mailslurp.com/sign-up/
        return \MailSlurp\Configuration::getDefaultConfiguration()
            ->setApiKey('x-api-key', config('constant.common.mailslurp_api_key'));
    }

    public function WebhookResponse(Request $request)
    {    
        Storage::put('file.txt', json_encode($request->all()));  
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

    
    /**
     * @OA\Post(
     *     path="/api/v1/unsave-categroy",
     *     tags={"unsave news categroy"},
     *     summary="Api for unsave news categroy",
     *     operationId="unsaveCategory",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="status",type="string"),
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
    public function unsaveCategory()
    {
        try {                  
            //register category details
            $input = $this->_request->all();
            $userId = Auth::user()->id;
            $newsfeedId = $input['newsfeed_id'];
            $categoryId = $input['category_id'];
            $senderId = $input['sender_id'];
            $updateStatus =  UserNewsCategory::unsaveCategory($userId, $newsfeedId, $categoryId);
            $updateSenderCategory = UserSenderCategory::updateUnsaveSenderCategory($userId, $senderId, $categoryId);

            if($updateStatus > 0) {
                $data['message'] = 'success';
                $data['data'] = ['message' => config('constant.common.messages.RECORDS_UPDATED')];
                $code = config('constant.common.api_code.UPDATE');

                return $this->sendSuccessResponse($data, $code); 
            } else {
                return $this->sendFailureResponse(config('constant.common.messages.RECORD_NOT_FOUND'));
            }
            
        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

    /**
     * @OA\Post(
     *     path="/api/v1/assign-categroy",
     *     tags={"assign news categroy"},
     *     summary="Api for assign news categroy",
     *     operationId="assignCategory",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="status",type="string"),
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
    public function assignCategory()
    {
        try {                  
            //register category details
            $input = $this->_request->all();
            $userId = Auth::user()->id; 
            $newsfeedId = $input['newsfeed_id'];
            $categoryId = $input['category_id'];
            $senderId = $input['sender_id'];
            $checkCategroryId = UserNewsCategory::checkCategroryId($userId, $newsfeedId);

            if(empty($checkCategroryId)) {
                //save details of user newsfeed category
                $category = new UserNewsCategory();
                $category->user_id = $userId;
                $category->newsfeed_id = $newsfeedId;
                $category->category_id = $categoryId;
                
                if($category->save()) {
                    //save details of user sender category
                    $sender = new UserSenderCategory();
                    $sender->user_id = $userId;
                    $sender->sender_id = $senderId;
                    $sender->category_id = $categoryId;
                    $sender->created_by = $userId;
                    $sender->updated_by = $userId;
                    $sender->save(); 
                } 
                
            } else {
                $updateCategroryId = UserNewsCategory::updateCategroryId($userId, $newsfeedId, $categoryId);
            }
                            
            DB::commit();
            $data['message'] = 'success';
            $data['data'] = ['message' => config('constant.common.messages.RECORD_ADDED_SUCCESSFULLY')];
            $code = config('constant.common.api_code.CREATE');

            return $this->sendSuccessResponse($data, $code);
        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

    /**
     * @OA\Post(
     *     path="/api/v1/save-news",
     *     tags={"save newsfeed"},
     *     summary="Api for save newsfeed",
     *     operationId="saveNewsfeed",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="status",type="string"),
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
    public function saveNewsfeed()
    {
        try {                  
            //register category details
            $input = $this->_request->all();
            $userId = Auth::user()->id;
            $newsfeedId = $input['newsfeed_id'];
            $categoryId = $input['category_id'];
            $checkSavedNews = SaveNewsfeed::checkSavedNews($userId, $newsfeedId);

            if(empty($checkCategroryId)) {
                $newsfeed = new SaveNewsfeed();
                $newsfeed->user_id = $userId;
                $newsfeed->newsfeed_id = $newsfeedId;
                $newsfeed->category_id = $categoryId;
                $newsfeed->save(); 
            } else {
                $updateCategroryId = SaveNewsfeed::updateSavedNews($userId, $newsfeedId, $categoryId);
            }
                
            DB::commit();
            $data['message'] = 'success';
            $data['data'] = ['message' => config('constant.common.messages.SAVED_NEWS_SUCCESSFULLY')];
            $code = config('constant.common.api_code.CREATE');

                return $this->sendSuccessResponse($data, $code); 
        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

    /**
     * @OA\Post(
     *     path="/api/v1/unsave-news",
     *     tags={"unsave newsfeed"},
     *     summary="Api for unsave newsfeed",
     *     operationId="unsaveNewsfeed",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="status",type="string"),
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
    public function unsaveNewsfeed()
    {
        try {                  
            //register category details
            $input = $this->_request->all();
            $userId = Auth::user()->id;
            $newsfeedId = $input['newsfeed_id'];
            $categoryId = $input['category_id'];
            
            $updateStatus =  SaveNewsfeed::unsaveNews($userId, $newsfeedId, $categoryId);

            if($updateStatus > 0) {
                $data['message'] = 'success';
                $data['data'] = ['message' => config('constant.common.messages.RECORDS_UPDATED')];
                $code = config('constant.common.api_code.UPDATE');

                return $this->sendSuccessResponse($data, $code); 
            } else {
                return $this->sendFailureResponse(config('constant.common.messages.RECORD_NOT_FOUND'));
            }

        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

     /**
     * @OA\Post(
     *     path="/api/v1/archive-news",
     *     tags={"archive newsfeed"},
     *     summary="Api for archive newsfeed",
     *     operationId="archiveNewsfeed",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="status",type="string"),
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
    public function archiveNewsfeed()
    {
        try {                  
            //register category details
            $input = $this->_request->all();
            //register category details
            $input = $this->_request->all();
            $userId = Auth::user()->id;
            $newsfeedId = $input['newsfeed_id'];
            $categoryId = $input['category_id'];
            $checkArchivedNews = ArchiveNewsfeed::checkArchivedNews($userId, $newsfeedId);

            if(empty($checkArchivedNews)) {
                $newsfeed = new ArchiveNewsfeed();
                $newsfeed->user_id = $userId;
                $newsfeed->newsfeed_id = $newsfeedId;
                $newsfeed->category_id = $categoryId;
                $newsfeed->save(); 
            } else {
                $update = ArchiveNewsfeed::updateArchivedNews($userId, $newsfeedId, $categoryId);
            }
                
            DB::commit();
            $data['message'] = 'success';
            $data['data'] = ['message' => config('constant.common.messages.ARCHIVED_NEWS_SUCCESSFULLY')];
            $code = config('constant.common.api_code.CREATE');

            return $this->sendSuccessResponse($data, $code); 
        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

    /**
     * @OA\Post(
     *     path="/api/v1/unarchive-news",
     *     tags={"unarchive newsfeed"},
     *     summary="Api for unarchive newsfeed",
     *     operationId="unarchiveNewsfeed",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="status",type="string"),
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
    public function unarchiveNewsfeed()
    {
        try {                  
            //register category details
            $input = $this->_request->all();
            $userId = Auth::user()->id;
            $newsfeedId = $input['newsfeed_id'];
            $categoryId = $input['category_id'];
            
            $updateStatus =  ArchiveNewsfeed::unarchiveNews($userId, $newsfeedId, $categoryId);

            if($updateStatus > 0) {
                $data['message'] = 'success';
                $data['data'] = ['message' => config('constant.common.messages.NEWSFEED_UPDATED')];
                $code = config('constant.common.api_code.UPDATE');

                return $this->sendSuccessResponse($data, $code); 
            } else {
                return $this->sendFailureResponse(config('constant.common.messages.RECORD_NOT_FOUND'));
            }

        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

    /**
     * @OA\Post(
     *     path="/api/v1/delete-news",
     *     tags={"delete newsfeed"},
     *     summary="Api for delete newsfeed",
     *     operationId="deleteNewsfeed",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="status",type="string"),
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
    public function deleteNewsfeed()
    {
        try {                  
            //register category details
            $input = $this->_request->all();
            $userId = Auth::user()->id;
            $newsfeedId = $input['newsfeed_id'];
            
            $updateStatus =  Newsfeed::deleteNews($userId, $newsfeedId);

            if($updateStatus > 0) {
                $data['message'] = 'success';
                $data['data'] = ['message' => config('constant.common.messages.NEWSFEED_DELETED')];
                $code = config('constant.common.api_code.DELETE');

                return $this->sendSuccessResponse($data, $code); 
            } else {
                return $this->sendFailureResponse(config('constant.common.messages.RECORD_NOT_FOUND')); 
            }

        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

    /**
     * @OA\Post(
     *     path="/api/v1/delete-saved-news",
     *     tags={"delete saved newsfeed"},
     *     summary="Api for delete saved newsfeed",
     *     operationId="deleteSavedNewsfeed",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="status",type="string"),
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
    public function deleteSavedNewsfeed()
    {
        try {                  
            //register category details
            $input = $this->_request->all();
            $userId = Auth::user()->id;
            $newsfeedId = $input['newsfeed_id'];
            $categoryId = $input['category_id'];
            
            $updateStatus =  SaveNewsfeed::deleteSavedNews($userId, $newsfeedId, $categoryId);

            if($updateStatus) {
                $data['message'] = 'success';
                $data['data'] = ['message' => config('constant.common.messages.NEWSFEED_DELETED')];
                $code = config('constant.common.api_code.DELETE');

                return $this->sendSuccessResponse($data, $code); 
            } else {
                return $this->sendFailureResponse(config('constant.common.messages.RECORD_NOT_FOUND'));
            }

        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

    /**
     * @OA\Post(
     *     path="/api/v1/delete-archived-news",
     *     tags={"delete archived newsfeed"},
     *     summary="Api for delete archived newsfeed",
     *     operationId="deleteArchivedNewsfeed",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="status",type="string"),
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
    public function deleteArchivedNewsfeed()
    {
        try {                  
            //register category details
            $input = $this->_request->all();
            $userId = Auth::user()->id;
            $newsfeedId = $input['newsfeed_id'];
            $categoryId = $input['category_id'];

            $updateStatus =  ArchiveNewsfeed::deleteArchivedNews($userId, $newsfeedId, $categoryId);

            if($updateStatus) {
                $data['message'] = 'success';
                $data['data'] = ['message' => config('constant.common.messages.NEWSFEED_DELETED')];
                $code = config('constant.common.api_code.DELETE');

                return $this->sendSuccessResponse($data, $code); 
            } else {
                return $this->sendFailureResponse(config('constant.common.messages.RECORD_NOT_FOUND'));
            }

        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

    /**
     * @OA\Get(
     *     path="/api/v1/saved-newsfeed",
     *     tags={"Saved Newsfeed List"},
     *     summary="api to get saved newsfeed list",
     *     operationId="savedNewsfeedList",
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
    public function savedNewsfeedList()
    {
        try {
            //get frequency list
            $newsfeed = Newsfeed::savedNewsfeedList();

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
     *     path="/api/v1/archived-newsfeed",
     *     tags={"All Archived Newsfeed List"},
     *     summary="api to get all archived newsfeed list",
     *     operationId="archivedNewsfeedList",
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
    public function archivedNewsfeedList()
    {
        try {
            //get frequency list
            $newsfeed = Newsfeed::archivedNewsfeedList($this->_request->filterValue);

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
     * @OA\Post(
     *     path="/api/v1/snooze-timer",
     *     tags={"snooze-timer newsfeed"},
     *     summary="Api for snooze-timer newsfeed",
     *     operationId="snoozeTimer",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="status",type="string"),
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
    public function snoozeTimer()
    {
        try {                  
            //register category details
            $input = $this->_request->all();
            $userId = Auth::user()->id;
            $senderId = $input['sender_id'];
            $durationId = $input['duration_id'];
            $checkSender = SenderSnoozeTimer::checkSender($userId, $senderId);

            if(empty($checkSender)) {
                $newsfeed = new SenderSnoozeTimer();
                $newsfeed->user_id = $userId;
                $newsfeed->sender_id = $senderId;
                $newsfeed->duration_id = $durationId;
                $newsfeed->save(); 
            } else {
                $update = SenderSnoozeTimer::updateSenderTimer($userId, $senderId, $durationId);
            }
                
            DB::commit();
            $data['message'] = 'success';
            $data['data'] = ['message' => config('constant.common.messages.SNOOZE_TIMER_SUCCESSFULLY')];
            $code = config('constant.common.api_code.CREATE');

            return $this->sendSuccessResponse($data, $code); 
        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

}
