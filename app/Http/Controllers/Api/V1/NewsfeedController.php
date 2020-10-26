<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\Newsfeed;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Controllers\ApiBaseController;
use Illuminate\Support\Facades\Validator;
use DB;


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
                $newsfeed = Newsfeed::allNewsfeedList();

                if(count($Newsfeed) > 0) {
                    $data['data'] = $newsfeed;

                    return $this->sendSuccessResponse($data);
                } else {
                    return $this->sendFailureResponse(config('constant.common.messages.RECORD_NOT_FOUND'));
                }
            } catch(Exception $ex) {
                return $this->sendFailureResponse();
            }
        }


  

}
