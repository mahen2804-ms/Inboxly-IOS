package com.inboxly;

import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
//import android.support.v7.app.AppCompatActivity; //  ← For RN >= 0.60

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        Intent intent = new Intent(this, MainActivity.class);

        // Pass along FCM messages/notifications etc.
        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            intent.putExtras(extras);
        }

        startActivity(intent);
        finish();
    }
}
