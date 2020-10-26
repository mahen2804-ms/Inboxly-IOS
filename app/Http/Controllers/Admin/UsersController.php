<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MassDestroyUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\User;
use Gate;
use Role;
use Auth;
use Storage;
use Hash;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UsersController extends Controller
{

    private $_request;
    /**
     * @name __construct
     * @desc create a new controller instance.
     * @return void
     */
    public function __construct(Request $request) {
        // Execute authentication filter before processing any request
        $this->middleware('auth');
        // Assign logged in user value
        $this->_user = Auth::user();
        $this->_request = $request;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //abort_if(Gate::denies('user_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $users = User::getAllUsers();

        return view('admin.users.index', compact('users'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //abort_if(Gate::denies('user_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

       // $roles = Role::all()->pluck('title', 'id');

        return view('admin.users.create');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $user = User::create($request->all());
        $user->roles()->sync($request->input('roles', []));

        return redirect()->route('admin.users.index');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //abort_if(Gate::denies('user_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        //$roles = Role::all()->pluck('title', 'id');

        return view('admin.users.edit', compact('user'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {   
        $input = $request->all();
        $imagePath = Storage::disk('uploads')->put('profile-picture', $input['profile_picture']);
        $imageName = str_replace('profile-picture/', '', $imagePath);
        $input['profile_picture'] = $imageName;      
        $user->update($input);
        $user->roles()->sync($request->input('roles', []));
        toastr()->success(config('constant.common.messages.RECORDS_UPDATED'));

        return redirect('/admin/users/'.Auth::user()->id.'/edit');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //abort_if(Gate::denies('user_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        //$user->load('roles');

        return view('admin.users.show', compact('user'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //abort_if(Gate::denies('user_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $user->delete();

        return back();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function massDestroy(MassDestroyUserRequest $request)
    {
        User::whereIn('id', request('ids'))->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function updateStatus(){
        try {
            $id = $this->_request->id;
            $status = $this->_request->status;
            $admin = User::findOrFail($id);

            if(!empty($admin)) {
                $data = $admin->toArray();
                $admin->status = $status;

                if($admin->save()) {
                    $this->_response['status'] = true;
                    $this->_response['message'] = config('constant.common.messages.STATUS_UPDATED_SUCCESSFULLY');
                    return $this->_response;
                } else {
                    $this->_response['status'] = false;
                    $this->_response['message'] = config('contant.common.messages.RECORD_NOT_FOUND');
                    return $this->_response;
                }
            }

        } catch(ModelNotFoundException $ex) {
          return redirect()->back()->with('failure', config('constant.common.messages.RECORD_NOT_FOUND'));
        } catch(Exception $ex) { 
           return redirect()->back()->with('failure', config('constant.common.messages.EXCEPTION_ERROR'));
        }
    }

    /**
     * load change password page.
     *
     * @return \Illuminate\Http\Response
     */
    public function changePassword() { 
        try {
            return view('admin.users.update-password');
        } catch(Exception $ex) { 
           return redirect()->back()->with('failure', config('constant.common.messages.EXCEPTION_ERROR'));
        }
    }

    /**
     * check password exist in records or not.
     *
     * @return \Illuminate\Http\Response
     */
    public function checkPassword() { 
        try {
            $password = $this->_request->current_password;
            $user = User::findOrFail(Auth::user()->id);
            
            if(Hash::check($password, $user->password)) {
                return true;
            } else {
                return false;
            }

        } catch(Exception $ex) { 
           return redirect()->back()->with('failure', config('constant.common.messages.EXCEPTION_ERROR'));
        }
    }


    /**
     * update new password.
     *
     * @return \Illuminate\Http\Response
     */
    public function updatePassword() { 
        try {
            $user = User::findOrFail(Auth::user()->id);
            $user->update(['password'=>$this->_request->password]);
            toastr()->success(config('constant.common.messages.RECORDS_UPDATED'));

            return redirect('/admin/users/change-password');
        } catch(Exception $ex) { 
           return redirect()->back()->with('failure', config('constant.common.messages.EXCEPTION_ERROR'));
        }
    }
}
