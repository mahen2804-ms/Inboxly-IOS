//package com.inboxly;
//
//import com.facebook.react.ReactActivity;
//
//public class MainActivity extends ReactActivity {
//
//  /**
//   * Returns the name of the main component registered from JavaScript. This is used to schedule
//   * rendering of the component.
//   */
//  @Override
//  protected String getMainComponentName() {
//    return "inboxly";
//  }
//}


package com.inboxly;

import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import android.view.WindowManager;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      SplashScreen.show(this);
      // super.onCreate(savedInstanceState);
     // getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE,WindowManager.LayoutParams.FLAG_SECURE);

     /// getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "inboxly";
  }
}
