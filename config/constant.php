<?php
    return [
        'common' => [

            //assessment sub category norm type id
            'NORM_TYPE_ID_SUB_CATEGORY'=>3,
            //status
            'STATUS' => ['Select Status', 'Active', 'Deactive'],

            // titles of the page
            'title' => [
                'TITLE_LOGIN'=> 'Login',
                'TITLE_DASHBOARD'=> 'Dashboard',
                'TITLE_DEPARTMENT_LIST' => 'Department List',
                'TITLE_JOB_ROLE' => 'Job role List',
                'TITLE_QUIZ_CATEGORY_LIST'=> 'Quiz Category List',
                'TITLE_ASSESSMENT_CATEGORY_LIST'=> 'Assessment Category List',
                'TITLE_CORE_ASSESSMENT_LIST'=> 'Core Assessment List',
                'TITLE_EMPLOYER_LIST' => 'Employer Listing',
                'TITLE_BADGES' => 'Badges',
                'TITLE_ADMIN_VIEW' => 'Admin View',
                'TITLE_CORE_ASSESSMENT_VIEW' => 'Core Assessment View',
                'TITLE_GOAL_TRACKER_LIST' => 'Goal Tracker List',
                'TITLE_GOAL_TRACKER_VIEW' => 'Goal Tracker View',
                'TITLE_MINI_QUIZZES_STANDARD_NORMS' => 'Mini Quizzes Standard Norms',
                'TITLE_EMPLOYER_LIST' => 'Employer List',
                'TITLE_MINI_QUIZZES_LIST' => 'Mini Quizzes List',
                'TITLE_NOTIFICATIONS' => 'Custom Notifications',
            ],

            // message of the pages
            'messages' => [
                'NORM_RECORD_DELETED' => 'Norm deleted successfully',
                'STATUS_ALREADY_EXIST' => 'Status is already up-to-date',
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
                'NOTIFICATION_RECORDS_ADDED' => 'Your notification has been sent successfully',
                'PASSWORD_NOT_EXIST' => 'Current password is incorrect',
                'DEPARTMENT_ALREADY_EXIST'=> 'Department name already exist',
                'JOB_ROLE_ALREADY_EXIST'=> 'Job role already exist',
                'CATEGORY_ALREADY_EXIST' => 'Category name already exist',
                'EMPLOYER_ALREADY_EXIST'=> 'Company name already exist',
                'CONTACT_EMAIL_EXIST'=> 'Contact email address already exist',
                'EMPLOYER_DELETED_SUCCESSFULLY'=> 'Employer deleted successfully',
                'BADGE_DELETED_SUCCESSFULLY'=> 'Badge deleted successfully',  
                'EMPLOYER_UPDATED' => 'Employer has been updated successfully.',
                'BADGES_UPDATED' => 'Badges has been updated successfully.',
                'RECORD_NOT_FOUND' => 'Records not found.',
                'EMPLOYER_CREATED' => 'Employer has been created successfully.',
                'EXCEPTION_ERROR' => 'Some error occurred, please try again later',
                'SELECT_DEPARTMENT' => 'Please select department',
                'EMPLOYER_CODE_SEND' => 'Employer code has been send successfully',
                'EMAIL_ALREADY_EXIST' => 'This email id already exist',
                'EMPLOYER_CODE_NOT_EXIST' => 'Employer code does not exist',
                'DEPARTMENT_NOT_EXIST' => 'Employer exist but department not assigned',
                'INVALID_OTP' => 'Invalid OTP',
                'IS_NUMERIC' => 'Please enter only numeric 6 digit values',
                'EMAIL_NOT_EXIST' => 'This email does not exist in our records',
                'EMAIL_UPDATED' => 'Email updated successfully',
                'PASSWORD_CHANGE' => 'Password change successfully',
                'USER_ALREADY_EXIST' => 'User name already exist',
                'MOBILE_ALREADY_EXIST' => 'Mobile number already exist',
                'POINT_EXIST' => 'Point score already exist',
                'POINT_EXIST_TABLE' => 'Points is already exists, Please enter another number and activate status again',
                'REQUIRED' => 'Please fill the required fields',
                //'MINI_QUIZ_CREATED' => 'Your quiz has been created successfully. Please associate norms so that user can view their results. Click here to go to norms section',
                'MINI_QUIZ_CREATED' => 'Your quiz has been created, you can add more question and publish it for users',
                'MINI_QUIZ_DELETED'=> 'Mini Quiz deleted successfully',
                'MINI_QUIZ_UPDATED' => 'Mini Quiz has been updated successfully',
                'QUESTION_CREATED' => 'Question has been created successfully',
                'QUESTION_DELETED'=> 'Question deleted successfully',
                'QUESTION_UPDATED'=> 'Question has been updated successfully',
                'QUESTION_ADDED'=> 'Question has been added in this quiz successfully',
                'QUIZ_PUBLISHED'=> 'Quiz has been published successfully',
                'EMPLOYER_ADDED_WITH_QUIZ' => 'Employer Details added with the Quiz',
                'QUIZ_EMPLOYER_DELETED'=> 'Employer and its department remove successfully',
                'EMPLOYER_UPDATED_WITH_QUIZ' => 'Employer Details updated with the Quiz',
                'EMAIL_UPDATED' => 'Email updated successfully',
                'PASSWORD_CHANGE' => 'Password change successfully',
                'REQUIRED' => 'Please fill the required fields',
                'QUIZ_ANSWER' => 'Answers submited successfully',
                'SAVE_ASSESSMENT' => 'Assessment submitted successfully',
                'ASSESSMENT_DRAFT' => 'Draft saved successfully',
                'ASSESSMENT_UPDATE' => 'Draft update successfully',
                'DEACTIVATE_DEPARTMENT_MESSAGE'=>'This department is associated with multiple employers, do you still want to deactivate this?',
                'DEACTIVATE_JOB_ROLE_MESSAGE' => 'This Job Role is associated with multiple users, You cannot mark this as Inactive',
                'DEACTIVATE_CATEGORY_MESSAGE' => 'This category is associated with other data, Do
                you still want to Deactivate this? ',                        
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
                'PUBLISH_RECORDS' => 'Records published successfully',
                'QUIZ_ALREADY_PUBLISHED' => 'This record is already published',
                'ASSESSMENT_EXISTS' => 'Norm for one of the selected department with this category is already created. Please revise your selection and try again',
                'CATEGORY_DISABLED' => 'Oops, this category has been disabled by administrator. You cannot proceed further.',
                'DATA_EXIST' => 'Record already exist',
                'LOGOUT' => 'Logout successfully',
                'ADMIN_GOAL' => 'You can not delete reminder until created.',
                'GOAL_SETTING' => 'You are not allowed to create goal, please contact your employer',
                ],
                'NORM_RANGE_ALREADY_EXIST' => 'Range Already Exists',
                

            // nav link titles
            'nav_status' => [
                'NAV_ACTIVE_EMPLOYER' => 'active',
                'NAV_ACTIVE_MASTER' => 'active',
                'NAV_ACTIVE_ADMIN_MANAGEMENT' => 'active',
                'NAV_ACTIVE_QUIZ' => 'active',
                'NAV_ACTIVE_ASSESSMENT' => 'active',
                'NAV_ACTIVE_DEPARTMENT' => 'active',
                'NAV_ACTIVE_JOB_ROLE' => 'active',
                'NAV_ACTIVE_BADGES' => 'active',
                'NAV_ACTIVE_CORE_ASSESSMENT' => 'active',
                'NAV_ACTIVE_MINI_QUIZZES' => 'active',
                'NAV_ACTIVE_JOB_ROLE' => 'active',
                'NAV_ACTIVE_GOAL_TRACKER' => 'active',
                'NAV_ACTIVE_NORMS' => 'active',
                'NAV_ACTIVE_MINI_QUIZZES' => 'active',
                'NAV_ACTIVE_NOTIFICATIONS' => 'active',                
            ],

            //status
            'status' => [
                'ACTIVE' => 'Active',
                'DEACTIVE' => 'Inactive'
            ],

             //Date format
            'table_date_format' => 'd/m/Y',
            'db_date_format' => 'Y-m-d',
            'role_id' => 2,
            'user_role_id'=>3,
            'super_admin_role_id' => 1,


            // Status Active/deactive
            'status_lable' => [
                "ACTIVE" => 'activate',
                "DEACTIVE" => 'inactivate'
            ],

            //mail status
            'mail_status' => [
                'ACTIVE' => 'activated',
                'DEACTIVE' => 'deactivated'
            ],

            // Date format
            'date_format' => [
                'API_DATE' => 'Y-m-d H:i:s',
                'NAV_ACTIVE_NOTIFICATIONS' => 'active',

            ],

            //status_filter_label
            'STATUS_FILTER_LABEL' => ['Select Status', 'Active', 'Inactive'],
            'item_action' => [
                '1' => 1 ,
                '2' => 2,
                '3' => 3,
                '4' => 4,
                '5' => 5,
            ],

            //status_filter_label
            'STATUS_FILTER_LABEL' => ['Select Status', 'Active', 'Inactive'],

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

            'email_result_validation' => [
                'IMAGE' => 'image|required|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ],

            'file_path' => [
                'GOAL_ICON' => '/uploads/goal-tracker/',
                'USER_IMAGE' => '/uploads/user/',
                'CATEGORY_IMAGE' => '/uploads/assessment-category/',
                'NORMS_IMAGE' => '/uploads/norms/',
                'QUIZ_ICONS' => '/uploads/quiz-category/',
                'BADGES_IMAGE' => '/uploads/badges/',
                'PROFILE_TITLE_IMAGE' => '/uploads/profile-titles/',

            ],

            //actions
            'actions' => [
                'POSITIVE_ACTION' => 'positiveAction',
                'NEGATIVE_ACTION' => 'negativeAction',
                'NO_ACTION' => 'noAction'
            ],

            //badge conditions
            'badge_condition' => [
                'FIRST' => 1,
                'SECOND' => 2,
                'THIRD' => 3,
                'FOURTH' => 4,
                'FIFTH' => 5,
                'SIXTH' => 6,
                'SEVENTH' => 7,
                'EIGHT' => 8
            ],
        ],
        
     
    ];
?>
