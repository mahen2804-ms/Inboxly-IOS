<!DOCTYPE html>
<html>
<head>
    <title>Emailer</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Titillium+Web:400,600,700&display=swap" rel="stylesheet">
    <style type="text/css">

        a{
            color: #0D52B9;
            text-decoration: none;
        }
    </style>
</head>
<body>
<div style="padding: 10px 0;margin-bottom: 15px;background-color: #fff !important;">
   <!--  <img src="{{url('/')}}/images/MyMentalFitnessLogo-CMYK.png" alt="logo" style="max-width: 100%;width: 70px; margin: 0 auto; display: block"> -->
   <table border="0" cellpadding="0" cellspacing="0" height="10%" width="100%">
        <tr>
            <td align="center" valign="top">
                <table border="0" cellpadding="20" cellspacing="0" width="600">
                    <tr>
                        <td align="center" valign="top">
                            <img src="{{url('/')}}/images/MyMentalFitnessLogo-CMYK.png" alt="logo" width="80px;">
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>
<table cellpadding="0" cellspacing="0" border="0" width="600" style="width: 600px; margin: 0 auto; font-family: 'Titillium Web', sans-serif; font-size: 14px; line-height: 22px; color: #000; background-color: #FFF;">
    <!-- Header -->
    <!-- Container -->
    <tr>
        <td style="padding: 0 32px 0 32px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%; margin: 0; font-family: 'Titillium Web', sans-serif; font-size: 14px;">
                <tr>
                    <td style="text-align: center; padding: 35px 0 18px 0;">
                        <h1 style="margin:10px 0 0 0; font-family: 'Titillium Web', sans-serif; font-size: 21px; font-weight: 600;">Congratulations</h1>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p style="font-weight: 700; margin: 0 0 9px 0;">Dear {{$user['username']}},</p>
                        <p style="margin: 0;">Your password has been updated on '<a href="#" style="color: #0D52B9; text-decoration: none;">Inboxly mobile app</a>'. <br>Please log in to the application with the below credentials to start using your account.</p>
                      
              
                


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
                            <p style="font-weight: 700; margin: 0 0 9px 0;">Dear {{$user['userName']}},</p>
                            <p style="margin: 0;">Your password has been updated on '<a href="#" style="color: #0D52B9; text-decoration: none;">Inboxly mobile app</a>'. <br>Please log in to the application with the below credentials to start using your account.</p>
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