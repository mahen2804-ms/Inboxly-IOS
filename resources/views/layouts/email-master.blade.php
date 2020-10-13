<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Fifth Quarter</title>
<style type="text/css">
body { width: 100%; background-color: #e9e9e9; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; font-family: Arial }
table { border-collapse: collapse; }

@media only screen and (max-width: 640px) {
body[yahoo] .deviceWidth { width: 440px!important; padding: 0; }
body[yahoo] .center { text-align: center!important; }
}

@media only screen and (max-width: 479px) {
body[yahoo] .deviceWidth { width: 280px!important; padding: 0; }
body[yahoo] .center { text-align: center!important; }
}
</style>
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" yahoo="fix" style="font-family:Arial; background: #e9e9e9;">
<!-- Wrapper -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
  <tr>
    <td width="100%" valign="top" bgcolor="#e9e9e9" style="padding-top:10px"><!-- Start Header-->
      
      <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
        <tr>
          <td bgcolor="#3c8dbc"><table width="700" border="0" cellpadding="0" cellspacing="0" align="center" class="deviceWidth">
              <tr>
                <td width="100%" bgcolor="#fff"><!-- Logo -->
                  
                  <table border="0" cellpadding="0" cellspacing="0" align="left" style="padding:5px 0;">
                    <tr>
                      <td style="padding:10px 20px 5px;" align="center" class="center"><a href="#"><img src={{ url('/images/logo1.png')}} alt="" height="80px" border="0" /></a></td>
                    </tr>
                  </table>                  
                  <!-- End Logo --> 
                  <!-- Nav -->                  
                  <table border="0" cellpadding="0" cellspacing="0" align="right" class="deviceWidth">
                    <tr>
                      <td valign="top" style="font-size: 11px; color: #f1f1f1; font-weight: normal; font-family:Arial; line-height: 26px; vertical-align: top; text-align:right;padding-top:16px;padding-right:10px" class="center"><br /></td>
                    </tr>
                  </table>
                  
                  <!-- End Nav --></td>
              </tr>
            </table></td>
        </tr>
        <!-- End Header --> 
        
        <!-- One Column -->
      </table>
      
      @yield('content')
      
      <!-- End One Column --> 
      
      <!-- 4 Columns -->      
      <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" style="margin-top: 30px;">
        <tr>
          <td bgcolor="#3c8dbc" style="padding:30px 0 10px"><table width="700" border="0" cellpadding="0" cellspacing="0" align="center" class="deviceWidth">
              <tr>
                <td><table width="100%" cellpadding="0" cellspacing="0"  border="0" align="left" class="deviceWidth">
                    <tr>
                        <td valign="top" style="font-size: 12px; color: #fff;font-family: Arial; padding-bottom:20px;text-align:center" class="center"> Copyright {{ date('Y')}} © <strong><a href="{{ \config('app.url') }}">{{ \config('app.name') }}</a></strong>. All Rights Reserved.</td>
                    </tr>
                    <tr>
                        @if(isset($campaign['email']))
                        <center><a href="">Unsubscribe</a></center>
                        @endif
                    </tr>
                  </table></td>
              </tr>
            </table></td>
        </tr>
      </table>
      
      <!-- End 4 Columns --></td>
  </tr>
</table>
<!-- End Wrapper -->

</body>
</html>