import * as Yup from 'yup';

const digitsOnly = (value) => /^(([0-9]*)|(([0-9]*)))$/.test(value);

// const alphaNumeric = (value) => /^[\u00c0-\u01ffa-zA-Z0-9\s]*$/.test(value);
const alphaNumeric = (value) =>
    /^[\u00c0-\u01ffa-zA-Z0-9\s’'´`”“‘"\-\¨\.]*$/.test(value);

/@yahoo.com\s*$/

const checkForEmail = (value) => /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@nboxly.com\s*$/.test(value);

const checkEmail = (value) => /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(value);

const checkPassWord = (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$&%*=<>~?()\\-`'.+,-/\"]{8,20}$/.test(value);

export const SignupValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('This field is required.')
        .min(2, 'Please enter minimum 2 characters.')
        .max(50, 'Maximum characters should be less then 30.')
        .test(
            'alphaNumeric-only',
            'Only alphabets and Number are allowed.',
            alphaNumeric,
        ),
    username: Yup.string()
        .required('This field is required.')
        .min(2, 'Please enter minimum 2 characters.')
        .max(50, 'Maximum characters should be less then 30.')
        .test(
            'alphaNumeric-only',
            'Only alphabets and Number are allowed.',
            alphaNumeric,
        ),
    secondaryEmail: Yup.string().required('This field is required.').test(
        'valid-email',
        'Please enter a valid email address.',
        checkEmail,
    ),
    password: Yup.string().required('This field is required.').test('valid-password', 'Password must be min 8 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase', checkPassWord),
    
    acceptTerms: Yup.bool()
    .oneOf([true], 'Accept Terms & Conditions is required')
    .required()

});

export const LoginValidationSchema = Yup.object().shape({
    // inboxlyEmail: Yup.string().required('This field is required.')
    //     .test(
    //         'valid-email',
    //         'Please enter a valid email address.',
    //         checkEmail,
    //     ),
    username: Yup.string()
        .required('This field is required.')
        .min(2, 'Please enter minimum 2 characters.')
        .max(20, 'Maximum characters should be less then 20.')
        .test(
            'alphaNumeric-only',
            'Only alphabets and Number are allowed.',
            alphaNumeric,
        ),

    password: Yup.string().required('This field is required.').test('valid-password', 'Password must be min 8 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase', checkPassWord),

});

export const ForgotPasswordValidationSchema = Yup.object().shape({
    recoveryEmail: Yup.string().required('This field is required.').test(
        'valid-email',
        'Please enter a valid email address.',
        checkEmail,
    ),
});

export const VerifyEmailOTPSchema = Yup.object().shape({
    firstTextInput: Yup.string().required('required.'),
    secondTextInput: Yup.string().required('required.'),
    thirdTextInput: Yup.string().required('required.'),
    fourthTextInput: Yup.string().required('required.'),
});


export const UpdateProfileDetailsValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('This field is required.')
        .min(2, 'Please enter minimum 2 characters.')
        .max(50, 'Maximum characters should be less then 30.')
        .test(
            'alphaNumeric-only',
            'Only alphabets and Number are allowed.',
            alphaNumeric,
        ),
    recoveryEmail: Yup.string().required('This field is required.')
        .test(
            'valid-email',
            'Please enter a valid email address.',
            checkEmail,
        ),
});


export const UpdatePasswordValidationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('This field is required.').test('valid-password', 'Password must be min 8 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase', checkPassWord),
    newPassword: Yup.string().required('This field is required.').test('valid-password', 'Password must be min 8 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase', checkPassWord),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('newPassword')],
        'Confirm password must match with new password.',
    ).required('This field is required.')
});


// export const changePassword = Yup.object().shape({
//     oldPassword: Yup.string('Please enter a valid employee code')
//       .max(20, 'Max length is 20 characters')
//       .min(6, 'Min length is 8 characters')
//       .trim()
//       .required('This Field is Required'),
//     newPassword: Yup.string('Please enter a valid employee code')
//       .max(20, 'Max length is 20 characters')
//       .min(6, 'Min length is 6 characters')
//       .trim()
//       // .matches(
//       //   /^(?=\D*\d)(?=.*?[a-zA-Z]).*[\W_].*$/,
//       //   'Please match the appropriate data',
//       // )
//       .matches(
//         // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/,
//         /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$&%*=<>~?()\\-`'.+,-/\"]{6,20}$/,
//         'Please match the appropriate data',
//       )
//       .required('This Field is Required'),
//     confirmPassword: Yup.string('Please enter a valid employee code')
//       .required('This Field is Required')
//       .trim()
//       .test('passwords-match', 'Passwords must match', function(value) {
//         return this.parent.newPassword === value;
//       }),
//   });