<div class="sidebar">
    <nav class="sidebar-nav">

        <ul class="nav">
                <li class="nav-item">
                    <a href="{{ route("admin.dashboard.index") }}" class="nav-link {{ request()->is('admin/dashboard') || request()->is('admin/dashboard/*') ? 'active' : '' }}">
                        <i class="fa-fw fas fa-home nav-icon">

                        </i>
                        {{ trans('cruds.dashboard.title') }}
                    </a>
                </li>
            
                <li class="nav-item nav-dropdown">
                    <a href="{{ route("admin.users.index") }}" class="nav-link {{ request()->is('admin/users') || request()->is('admin/users/*') ? 'active' : '' }}">
                        <i class="fa-fw fas fa-users nav-icon">

                        </i>
                        {{ trans('cruds.userManagement.title') }}
                    </a> 
                </li>
            
                <li class="nav-item nav-dropdown">
                    <a class="nav-link  nav-dropdown-toggle" href="#">
                        <i class="fa-fw fas fa-briefcase nav-icon">

                        </i>
                        {{ trans('cruds.ProfileManagement.title') }}
                    </a>
                    <ul class="nav-dropdown-items">
                        
                            <li class="nav-item">
                                <a href="{{ route('admin.users.edit', eAuth::user()->id) }}" class="nav-link {{ request()->is('admin/user') || request()->is('admin/users/*') ? 'active' : '' }}">
                                    <i class="fa-fw fas fa-briefcase nav-icon">

                                    </i>
                                    {{ trans('cruds.profile.title') }}
                                </a>
                            </li>
                        
                        
                            <li class="nav-item">
                                <a href="{{ url('/admin/users/change-password') }}" class="nav-link {{ request()->is('admin/users') || request()->is('admin/users/*') ? 'active' : '' }}">
                                    <i class="fa-fw fas fa-user nav-icon">

                                    </i>
                                    {{ trans('cruds.change_password.title') }}
                                </a>
                            </li>
                        
                    </ul>
                </li>
            


            <li class="nav-item">
                <a href="#" class="nav-link" onclick="event.preventDefault(); document.getElementById('logoutform').submit();">
                    <i class="nav-icon fas fa-fw fa-sign-out-alt">

                    </i>
                    {{ trans('global.logout') }}
                </a>
            </li>
        </ul>


    </nav>
    <button class="sidebar-minimizer brand-minimizer" type="button"></button>
</div>