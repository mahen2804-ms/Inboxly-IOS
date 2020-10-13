@extends('layouts.email-master')
@section('content')
    <table width="700"  class="deviceWidth" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#eeeeed">
        <tr>
            <td valign="top" style="padding:0" bgcolor="#ffffff"></td>
        </tr>
        <tr>
            <td style="font-size: 13px; color: #333; border-top:1px dotted #dddddd; font-weight: normal; text-align: left; font-family:Arial; line-height: 24px; vertical-align: top; padding:20px 20px 20px" bgcolor="#fff">
                <table width="650" class="deviceWidth" border="0" cellpadding="0" cellspacing="0" align="center">
                    <tr>
                        <td valign="middle" style="padding:0 10px 0px 0"><h3 style="text-decoration: none; color: #666; font-size: 17px; color: #272727; font-weight: bold; font-family:Arial;margin:0px;padding:0px;"></h3></td>
                    </tr>
                    <tr>
                        <td>
                            <p style="font-weight: 700; margin: 0 0 9px 0;">Hello {{$name}},</p></br>
                            <p>Forgot your password? Not a problem!</p><br>
                            <p>Please use mentioned password to login to your account on the website.</p><br>
                            <p>New Password: {{$password}}</p><br>
                            <p>If you have not requested this, please contact us to let us know!</p>
                        </td>
                    </tr>
                </table>
                <br />
                <br />
            </td>
        </tr>
        <tr>
            <td style=" background:#f4f4f4;font-size: 13px;
padding: 20px;"><b style="float:right;line-height: 19px;color: #707070;">Thanks,<br />
                 Inboxly Team</b>
            </td>
        </tr>
    </table>
@endsection