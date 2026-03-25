package com.nfsmonstr.reactnativesplashscreen

import android.app.Activity
import android.os.Handler
import android.os.Looper
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.facebook.react.bridge.ReactApplicationContext

class ReactNativeSplashScreenModule(reactContext: ReactApplicationContext) :
  NativeReactNativeSplashScreenSpec(reactContext) {

  override fun hide() {
    val splash = splashScreen ?: return
    Handler(Looper.getMainLooper()).post {
      splash.setKeepOnScreenCondition { false }
      splashScreen = null
    }
  }

  override fun show() {
    // Android does not support programmatic splash screen after app start.
    // Use the system splash screen via Theme.SplashScreen in your app theme.
    // Call ReactNativeSplashScreenModule.show(activity) in MainActivity.onCreate()
    // before super.onCreate() to keep the splash visible until hide() is called.
  }

  companion object {
    const val NAME = NativeReactNativeSplashScreenSpec.NAME

    @Volatile
    private var splashScreen: androidx.core.splashscreen.SplashScreen? = null

    /**
     * Call this in MainActivity.onCreate() BEFORE super.onCreate().
     * It installs the AndroidX SplashScreen and keeps it visible until
     * [ReactNativeSplashScreenModule.hide] is called from JavaScript.
     *
     * ```kotlin
     * override fun onCreate(savedInstanceState: Bundle?) {
     *   ReactNativeSplashScreenModule.show(this)
     *   super.onCreate(savedInstanceState)
     * }
     * ```
     */
    @JvmStatic
    fun show(activity: Activity) {
      val splash = activity.installSplashScreen()
      splash.setKeepOnScreenCondition { true }
      splashScreen = splash
    }
  }
}
