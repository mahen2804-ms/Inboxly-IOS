<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NewsfeedController extends Controller
{
    public function testMailSlurp(){
    	$config = \MailSlurp\Configuration::getDefaultConfiguration()->setApiKey('x-api-key', '3a33d8063534acf6d7b0d5c3536f66509d904240cdf01abcf3a65f847aa7bf65');
    	$apiInstance = new \MailSlurp\Apis\AttachmentControllerApi(
		    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
		    // This is optional, `GuzzleHttp\Client` will be used as default.
		    new \GuzzleHttp\Client(),
		    $config
		);
    	
    	
		// create controllers to access parts of the MailSlurp API
		$inboxController = new \MailSlurp\Models\Inbox();
		$waitForController = new \MailSlurp\Models\WaitForConditions();

		// create an email address
		$inbox = $apiInstance->createInbox($inboxController);
		print_r($inbox->getEmailAddress()); die;
		// get an email in the inbox
		$timeout = 10000; // wait at most 10 seconds for new email
		$unread_only = true; // only count unread emails

		$email = $waitForController->waitForLatestEmail($inbox->getId(), $timeout, $unread_only);
		print_r($email->getBody());die;
    }
}
