<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Auth;
use DB;
use Helpers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {   
        //$this->middleware('auth');
    }


    /**
     * Assuming the URL looks like this 
     * http://localhost/password-reset/random-string-here
     * You check if the user and the token exist and display a page
     */
    public function showForm()
    {
       return view('auth.passwords.email');
    }

    /**
     * Assuming the URL looks like this 
     * http://localhost/password-reset/random-string-here
     * You check if the user and the token exist and display a page
     */
    public function sendPasswordResetToken(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if ( !$user ) return redirect()->back()->withErrors(['error' => '404']);

        //create a new token to be sent to the user. 
        DB::table('password_resets')->insert([
            'email' => $request->email,
            'token' => Helpers::randomPassword(10), //change 60 to any length you want
            'created_at' => new \DateTime('NOW')
        ]);

        $tokenData = DB::table('password_resets')
        ->where('email', $request->email)->first();
        $token = $tokenData->token;
        $email = $request->email; // or $email = $tokenData->email;
        $result = Mail::send('emails.password', ['password' => $token, 'email'=>$email, 'name'=>$user->name], function($message) use ($email){
            $message->to($email)->subject('Reset Password Notification');
        });
        $user->update(['password'=>$token]);
        \Session::put('success', 'success');
        return redirect('/password-reset');
    }

    // /**
    //  * Assuming the URL looks like this 
    //  * http://localhost/password-reset/random-string-here
    //  * You check if the user and the token exist and display a page
    //  */

    // public function showPasswordResetForm($token)
    // {
    //     $tokenData = DB::table('password_resets')
    //     ->where('token', $token)->first();
    //     $data = [];

    //     if ( !$tokenData )  {
    //         return redirect()->to('home');
    //         //redirect them anywhere you want if the token does not exist.
    //     } else {
    //         $data['token'] = $tokenData->token;
    //         $data['email'] = $tokenData->email;
    //     }
        
    //     return view('auth.passwords.reset', $data);
    // }

    // /**
    //  * @name reset
    //  * @desc update password in reset passowrd
    //  *
    //  * @return \Illuminate\Contracts\Support\Renderable
    //  */
    // public function resetPassword(Request $request)
    // {   
    //     try {
    //         //vadilations
    //         $validator = Validator::make($request->all(), User::validationRules(), User::$validationMessages);

    //         //check fields validation on server side
    //         if($validator->fails()) {

    //             //Redirect user back with input if server side validation fails
    //             foreach($validator->errors()->all() as $error) {
    //                 toastr()->error($error);
    //                 $this->_response['error'][] = $error;
    //             }
    //             return redirect()->back();
    //         } else {
    //             $user = User::getEmailUser($request->email);
    //             $user->password_hash = Hash::make($request->password);
    //             $user->update();
    //             //login the user immediately they change password successfully
    //             Auth::login($user);
    //             // If the user shouldn't reuse the token later, delete the token 
    //             DB::table('password_resets')->where('email', $request->email)->delete();

    //             return redirect('/edit-profile'); 
    //         }

    //     } catch(ModelNotFoundException $ex) {
    //         return redirect()->back()->with('failure', config('constant.common.messages.RECORD_NOT_FOUND'));
    //     } catch (Exception $ex) {
    //         return redirect()->back()->with('failure', config('constant.common.messages.EXCEPTION_ERROR'));
    //     }
    // }    
}
