<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;

use OpenApi as OA;

/**
 * @OA\Server(url="http://local.inboxly.com/")
 * @OA\Info(title="Inboxly App",
 *     version="0.1" ,
 *     description="Inboxly App Api's",
 *     contact={
 *              "email": "yashu.singh@systematixindia.com"
 *          }
 *     ),
 * @OA\Schema(
 *      schema="Error",
 *      required={"code", "message"},
 *      @OA\Property(
 *          property="code",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @OA\Property(
 *          property="message",
 *          type="string"
 *      )
 *  ),
 * @OA\SecurityScheme(
 *   securityScheme="bearerAuth",
 *   type="http",
 *   scheme="bearer"
 * )
 */

class ApiBaseController extends Controller
{

    public function sendSuccessResponse($result = [], $code = 200, $token = '')
    {

        if(is_array($result) && count($result) == 0){
            $result = (object)$result;
        }
        $response = [
            'success'   => $result
        ];
        if($token && $token != ''){
            return response()->json($response, $code)->header('token', $token);
        }
        return response()->json($response, $code);
    }

    /*
     * function for send failure response
     */
    public function sendFailureResponse($message = 'Something went wrong.', $code = 422)
    {
        $response = [
            'error'   => $message,
        ];

        return response($response, $code);
    }
}
