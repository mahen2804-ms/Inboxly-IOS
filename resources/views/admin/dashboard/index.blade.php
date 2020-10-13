@extends('layouts.admin')
@section('content')
<div class="card">
    <div class="card-header">
        {{ trans('cruds.dashboard.title_singular') }} 
    </div>

    <div class="card-body">
         <div class="row">
            <div class="col-lg-4">
                <div class="card bg-teal-400">
                    <div class="cursor-pointer card-body">
                        <div class="d-flex">
                            <span class="icon"><i class="icon-circles"></i></span>
                            <div class="content">
                                <div class="form-group {{ $errors->has('search') ? 'has-error' : '' }}">
                                    <label for="search">{{ trans('cruds.dashboard.fields.search') }}</label>
                                    <select name="search" id="search" class="form-control ">
                                        <option value="1" >Daily</option>
                                        <option value="2" >Weekly</option>
                                        <option value="3" >Monthly</option>
                                    </select>
                                    @if($errors->has('search'))
                                        <em class="invalid-feedback">
                                            {{ $errors->first('search') }}
                                        </em>
                                    @endif
                                    <p class="helper-block">
                                        {{ trans('cruds.dashboard.fields.search_helper') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card bg-teal-400">
                    <div class="cursor-pointer card-body">
                        <div class="d-flex">
                            <span class="icon"><i class="icon-circles"></i></span>
                            <div class="content">
                                <label for="search">{{ trans('cruds.dashboard.fields.date') }}</label>
                                <input class="form-control datepicker">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4">
                <div class="card bg-teal-400">
                    <div class="cursor-pointer card-body">
                        <div class="d-flex">
                            <span class="icon"><i class="icon-circles"></i></span>
                            <div class="content">
                                <h5>Active Users</h5>
                                <span id="activeUsers">{{$activeUsers}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card bg-teal-400">
                    <div class="cursor-pointer card-body">
                        <div class="d-flex">
                            <span class="icon"><i class="icon-circles"></i></span>
                            <div class="content">
                                <h5>Inactive Users</h5>
                                 <span id="inactiveUsers">{{$inactiveUsers}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@section('scripts')
@parent
<script>    
   $(document).ready(function() {
        $('.datepicker').datepicker({
            dateFormat: "dd-mm-yy"
        });
        //on select get users records counts
        $('.date, #search').on('change', function(){
            alert('1233');
            $.ajax({
                url:APP_BASE_URL+'/getFilteredUser',
                type:'post',
                date:{

                },
                success:function(data) {
                    console.log(data);
                }
            })
        })
   })
</script>
@endsection