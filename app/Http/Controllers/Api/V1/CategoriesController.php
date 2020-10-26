<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Categories;
use Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Controllers\ApiBaseController;
use Illuminate\Support\Facades\Validator;
use DB;

class CategoriesController extends ApiBaseController
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
         *     path="/api/v1/categories",
         *     tags={"All Categories List"},
         *     summary="api to get all categories list",
         *     operationId="allCategoriesList",
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
        public function allCategoriesList()
        {
            try {
                //get frequency list
                $categories = Categories::allCategoriesList();

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
     *     path="/api/v1/create-categroy",
     *     tags={"create categroy"},
     *     summary="Api for store categroy",
     *     operationId="store",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="name",type="string"),
     *                 @OA\Property(property="status",type="boolean")
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
    public function createCategory()
    {
        try {
            $input = $this->_request->all();
            //vadilations
            $validCategoryApi = Categories::validationRules();
            $validator = Validator::make($input,$validCategoryApi, Categories::$validationMessages);

            /*check fields validation on server side*/
            if($validator->fails()) {
                $errors = $validator->errors();
                $errorsMsg = "";

                if ($errors->first()) {
                    $errorsMsg .= " " . $errors->first();
                }

                return $this->sendFailureResponse($errorsMsg);
            } else {

                if($this->checkCategoryName($input['name'])) {
                    $this->_response =config('constant.common.messages.CATEGORY_ALREADY_EXIST');
                    $code = config('constant.common.api_code.FAILED');
                    $data = $this->_response;
                    return $this->sendFailureResponse($data, $code);
                } else {
                   
                    //register category details
                    $input = $this->_request->all();
                    $category = new Categories();
                    $category->name = $input['name'];
                    $category->status = 1;
                    $category->save();
                                        
                    DB::commit();
                    $data['message'] = 'success';
                    $data['data'] = ['category_name' => $input['name']];
                    $code = config('constant.common.api_code.CREATE');
                    return $this->sendSuccessResponse($data, $code);
                    
                }
            }
        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

    /**
     * @name checkCategoryName
     * @desc checkCategoryName is exist in database or not
     * @return int
     */
    public function checkCategoryName($categoryName,$categoryId= '') {
        try {
            //check Category enter email is already exist in database
            $checkName = Categories::checkCategoryName($categoryName);

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
     * @OA\Post(
     *     path="/api/v1/update-categroy",
     *     tags={"update categroy"},
     *     summary="Api for store categroy",
     *     operationId="store",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="name",type="string"),
     *                 @OA\Property(property="status",type="boolean")
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
    public function updateCategory()
    {
        try {
            $input = $this->_request->all();
            //vadilations
            $validCategoryApi = Categories::validationRules();
            $validator = Validator::make($input, $validCategoryApi, Categories::$validationMessages);

            /*check fields validation on server side*/
            if($validator->fails()) {
                $errors = $validator->errors();
                $errorsMsg = "";

                if ($errors->first()) {
                    $errorsMsg .= " " . $errors->first();
                }

                return $this->sendFailureResponse($errorsMsg);
            } else {

                if($this->checkCategoryName($input['name'], $input['category_id'])) {
                    $this->_response =config('constant.common.messages.CATEGORY_ALREADY_EXIST');
                    $code = config('constant.common.api_code.FAILED');
                    $data = $this->_response;
                    return $this->sendFailureResponse($data, $code);
                } else {
                   
                    //register category details
                    $category = Categories::findOrFail($input['category_id']);
                    $category->name = $input['name'];
                    $category->status = 1;
                    $category->save();
                                        
                    DB::commit();
                    $data['message'] = 'success';
                    $data['data'] = ['category_name' => $input['name']];
                    $code = config('constant.common.api_code.UPDATE');
                    return $this->sendSuccessResponse($data, $code);
                    
                }
            }
        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }

    /**
     * @OA\Post(
     *     path="/api/v1/manage-categroy",
     *     tags={"manage categroy"},
     *     summary="Api for manage categroy",
     *     operationId="manageCategory",
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
    public function manageStatus()
    {
        try {                  
            //register category details
            $input = $this->_request->all();
            $category = Categories::findOrFail($input['category_id']);
            $category->status = $input['status'];
            $category->save();
                                
            DB::commit();
            $data['message'] = 'success';
            $data['data'] = ['category_name' => $category['name'], 'status'=>$category['status']];
            $code = config('constant.common.api_code.UPDATE');

            return $this->sendSuccessResponse($data, $code);
        } catch(Exception $ex) {
            return $this->sendFailureResponse();
        }
    }
}
