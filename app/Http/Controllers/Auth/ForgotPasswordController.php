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
    
}
