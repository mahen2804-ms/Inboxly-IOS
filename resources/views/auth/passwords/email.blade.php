@extends('layouts.app')
@section('content')
<div class="row justify-content-center">
    <div class="col-md-8">
         @if (session('success'))
            @section('scripts')
                <script>
                    $(document).ready( function() {
                        $('#exampleModal3').modal('toggle');
                        setTimeout(() => {
                            $('#exampleModal3').modal('toggle');
                        }, 8000);
                    })
                </script>
            @endsection
            {{session()->forget('success')}}
        @endif
        <div class="card-group">
            <div class="card p-4">
                <div class="card-body">
                    <form method="POST" action="{{ url('/password-reset') }}" data-parsley-validate>
                        {{ csrf_field() }}
                        <h1>
                            <div class="login-logo">
                                <a href="#">
                                    {{ trans('panel.site_title') }}
                                </a>
                            </div>
                        </h1>
                        <p class="text-muted"></p>
                        <div>
                            {{ csrf_field() }}
                            <div class="form-group has-feedback">
                                <input type="email" name="email" class="form-control" placeholder="{{ trans('global.login_email') }}" data-parsley-required data-parsley-required-message="Please enter email">
                                @if($errors->has('email'))
                                    <em class="invalid-feedback">
                                        {{ $errors->first('email') }}
                                    </em>
                                @endif
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 text-right">
                                <button type="submit" class="btn btn-primary btn-block btn-flat">
                                    {{ trans('global.reset_password') }}
                                </button>
                            </div>
                        </div>
                    </form>
                     <a style="margin-top:20px;" class="btn btn-default" href="{{ url('/login') }}">
                        Back to login
                    </a>
                </div>
            </div>
           <div class="modal fade show" id="exampleModal3" tabindex="-1" role="dialog"  aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">                      
                        <div class="modal-body text-center pt-7 pb-7">
                            <div><img src="{{url('assets/images/custom/email_confirm.png')}}" /></div>
                            <h3 class="text-dark">Check Your Email</h3>
                            <p class="px-sm-5" style="font-size: 1rem;">We've sent you an email please check your email and follow the instructions</p>
                            <span class="text-muted">Didn't receive the passwod reset email? 
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection