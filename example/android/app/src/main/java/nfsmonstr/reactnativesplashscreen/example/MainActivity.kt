package nfsmonstr.reactnativesplashscreen.example

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.nfsmonstr.reactnativesplashscreen.ReactNativeSplashScreenModule

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    // Must be called BEFORE super.onCreate() to keep the splash screen
    // visible while React Native loads. The library handles installSplashScreen()
    // and setKeepOnScreenCondition internally.
    ReactNativeSplashScreenModule.show(this)
    super.onCreate(savedInstanceState)
  }

  override fun getMainComponentName(): String = "ReactNativeSplashScreenExample"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
