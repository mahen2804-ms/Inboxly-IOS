<?php
    return [
        'common' => [

            // message of the pages
            'messages' => [
                'RECORD_NOT_EXIST' => 'This record is not exist',
                'ORDER_UPDATED' => 'Question order updated successfully',
                'EMPTY_SPACES' => 'Empty spaces are not allowed',
                'MINI_QUIZ_EXISTS' => 'Norm for one of the selected department with this mini quiz is already created. Please revise your selection and try again',
                'UPDATE_DEPARTMENT_ID' => 'Department id has been updated successfully in the record',
                'UPDATE_CATEGORY_ID' => 'Category id has been updated successfully in the record',
                'UPDATE_MINI_QUIZ_ID' => 'Mini quiz id has been updated successfully in the record',
                'RECORD_ADDED_SUCCESSFULLY' => 'Record added successfully',
                'SOMETHING_WRONG' => 'Something went wrong, please try again later',
                'MAIL_SEND' => 'Mail sent successfully to the user',
                'STATUS_UPDATED_SUCCESSFULLY'=> 'Status updated successfully',
                'PASSWORD_UPDATE' => 'Password updated successfully',
                'RECORDS_UPDATED' => 'Records updated successfully',
                'RECORDS_ADDED' => 'Records added successfully',
                'PASSWORD_NOT_EXIST' => 'Current password is incorrect',
                'IS_NUMERIC' => 'Please enter only numeric 6 digit values',
                'EMAIL_NOT_EXIST' => 'This email does not exist in our records',
                'EMAIL_UPDATED' => 'Email updated successfully',
                'PASSWORD_CHANGE' => 'Password change successfully',
                'USER_ALREADY_EXIST' => 'User name already exist',
                'MOBILE_ALREADY_EXIST' => 'Mobile number already exist',
                'EMAIL_UPDATED' => 'Email updated successfully',
                'PASSWORD_CHANGE' => 'Password change successfully',
                'REQUIRED' => 'Please fill the required fields',                      
                'SUCCESS' => 'Success',
                'REMINDER_STOP' => 'Reminder stop successfully',
                'REMINDER_DELETE' => 'Reminder deleted successfully',
                'EMPLOYER_CODE_NOT' => 'Employer code not found',
                'OTP_RESEND' => 'Otp resend successfully',
                'OTP_SEND' => 'Otp send successfully',
                'SENT_USERNAME' => 'User name sent on email',
                'VALID_CREDENTIALS' => 'Please enter valid credentials',
                'QUIZ_NORMS_NOT_FOUND' => 'There is something wrong with this quiz, contact your employer for the same',
                'EMAIL_SEND' => 'Email send successfully.',
                'INVALID_EMAIL'=> 'Provided emails are invalid', 
                'NORMS_NOT_FOUND' => 'There is something wrong with this quiz, contact your employer for the same',
                'EMAIL_NOT_FOUND' => 'Super admin email not found',
                'DATA_EXIST' => 'Record already exist',
                'LOGOUT' => 'Logout successfully'
                ], 

                //code status
            'api_code' => [
                'CREATE' => '201',
                'UPDATE' => '200',
                'DELETE' => '204',
                'LIST'   => '200',
                'FAILED' => '412',
                'UNAUTHORIZED' => '401'
            ],

            'token_name' => [
                'MY_APP' => 'MyApp'
            ],

            'icon_validation' => [
                'ICON' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ],
            
            'file_path' => [
                'USER_IMAGE' => '/uploads/user/',
            ],

        ],
     
    ];
?>
