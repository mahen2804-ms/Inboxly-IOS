@extends('layouts.admin')
@section('content')

<div class="card">
    <div class="card-header">
        {{ trans('global.change_password') }} 
    </div>

    <div class="card-body">
        <form action="{{url('/admin/users/update-password')}}" method="POST" autocomplete="off" data-parsley-validate>
            @csrf
            <div class="form-group {{ $errors->has('password') ? 'has-error' : '' }}">
                <label for="password">{{ trans('cruds.user.fields.old_password') }}</label>
                <input type="password" id="old_password" name="old_password" class="form-control" data-parsley-required data-parsley-required-message="Please enter current password">
                <em class="invalid-feedback old_password" >
                    {{ $errors->first('password') }}
                </em>
                <p class="helper-block">
                    {{ trans('cruds.user.fields.password_helper') }}
                </p>
            </div>
            <div class="form-group {{ $errors->has('password') ? 'has-error' : '' }}">
                <label for="password">New {{ trans('cruds.user.fields.password') }}</label>
                <input type="password" id="password" data-parsley-pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" minlength="8" data-parsley-minlength="8" name="password" class="form-control" data-parsley-required data-parsley-required-message="Please enter new password" data-parsley-trigger="keyup" data-parsley-pattern-message="Password must contain at least (1) lowercase, (1) uppercase letter, (1) number and (1) special character.">
                @if($errors->has('password'))
                    <em class="invalid-feedback">
                        {{ $errors->first('password') }}
                    </em>
                @endif
                <p class="helper-block">
                    {{ trans('cruds.user.fields.password_helper') }}
                </p>
            </div>
            <div>
                <input class="btn btn-danger" type="submit" value="{{ trans('global.save') }}">
            </div>
        </form>


    </div>
</div>
@endsection
@section('scripts')
@parent
    <script>
        $(function () {
            //check the current password is exist in db or not
            $('#old_password').on('keyup', function(){
                $.ajax({
                    url:APP_BASE_URL+'/admin/users/check-password',
                    type:'post',
                    data:{'current_password':$(this).val(), '_token':$('meta[name="csrf-token"]').attr('content')},
                    success:function(data){
            
                        if(data == '') {
                            $('.invalid-feedback').css('display', 'block');
                            $('.old_password').text('Please enter valid password');
                        } else {
                            $('.invalid-feedback').css('display', 'none');
                            $('.old_password').text('');
                        }

                    }
                })
            })
        })
    </script>
@endsection