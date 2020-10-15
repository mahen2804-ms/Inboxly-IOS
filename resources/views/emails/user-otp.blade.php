<!DOCTYPE html>
<html>
<head>
    <title>Emailer</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Titillium+Web:400,600,700&display=swap" rel="stylesheet">
    <style type="text/css">
        body{
            background-color: #CCC;
        }
        a{
            color: #0D52B9;
            text-decoration: none;
        }
    </style>
</head>
<body>
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
                        <p style="font-weight: 700; margin: 0 0 9px 0;">Dear {{$user['userName']}},</p>
                        <p style="margin: 0;">Your account has been created on '<a href="#" style="color: #0D52B9; text-decoration: none;">Inboxly App</a>'. <br>Please log in to the application with the below credentials to start using your account.</p>
                        <p style="margin:20px 0 0 0;">
                            <strong>Username:</strong> {{$user['userName']}} <br>
                            <strong>OTP:</strong> {{$user['otp']}} <br>
                        </p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <!-- Footer -->
    <tr>
        <td>
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%; margin: 0;">
                <tr>
                    <td style="text-align: left; padding: 19px 32px 32px 32px;">
                        <p style="margin: 0;">
                            <strong>Regards,</strong> <br>My Mental Fitness Team
                        </p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>
