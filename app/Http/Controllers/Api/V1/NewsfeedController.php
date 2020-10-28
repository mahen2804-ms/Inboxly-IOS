<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use PHPUnit\Framework\TestCase;
use Storage;
use App\SenderDetails;
use App\Newsfeeds;

class NewsfeedController extends TestCase
{

     private function getConfig()
    {
        // create a mailslurp configuration with API_KEY environment variable
        // get your own free API KEY at https://app.mailslurp.com/sign-up/
        return \MailSlurp\Configuration::getDefaultConfiguration()
            ->setApiKey('x-api-key', config('constant.common.mailslurp_api_key'));
    }

    public function test1(Request $request)
    {    
        Storage::put('file.txt', json_encode($request->all()));  
        $emailId = $request->emailId;
        // create an inbox controller
        $emailController = new \MailSlurp\Apis\EmailControllerApi(null, $this->getConfig());
        $email = $emailController->getEmail($emailId); 
        $sender = $email->getHeaders();
        Storage::put(time().'_sender.txt', $sender);     
        // $senderDetails = new SenderDetails();
        // $senderDetails->name = $senderName;

        // if($senderDetails->save()) {
        //     $newsfeed = new Newsfeeds();
        //     $newsfeed->title = $email->getSubject();
        //     $newsfeed->image = '';
        //     $newsfeed->description = $email->getBody();
        //     $newsfeed->date_time = date('Y-m-d h:i:s', strtotime($email->getUpadtedAt());
        //     $newsfeed->user_id = Auth::user()->id;
        //     $newsfeed->sender_id = $senderDetails->id;
        //     $newsfeed->save();

        // }

        Storage::put('email.txt', $email);         
    }



}
