# @nfsmonstr/react-native-splash-screen

A splash screen library for React Native using **TurboModules** (New Architecture).

Works on **iOS** (UIKit window overlay) and **Android** (AndroidX SplashScreen API).

> Reworked fork of [crazycodeboy/react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen) — original library by [Jia PengHui](https://github.com/crazycodeboy).

---

## Requirements

| | Minimum |
|---|---|
| React Native | 0.73+ (New Architecture) |
| iOS | 13.0+ |
| Android | API 24+ |

---

## Installation

```sh
npm install @nfsmonstr/react-native-splash-screen
# or
yarn add @nfsmonstr/react-native-splash-screen
```

---

## Android Setup

### 1. Update `styles.xml`

**`android/app/src/main/res/values/styles.xml`**

```xml
<resources>
    <!-- Splash screen theme — must inherit Theme.SplashScreen -->
    <style name="SplashTheme" parent="Theme.SplashScreen">

        <!-- ─── Required ──────────────────────────────────────────────────── -->

        <!-- Background color of the entire splash screen -->
        <item name="windowSplashScreenBackground">@color/splashBackground</item>

        <!-- Theme applied to the Activity after the splash exits.
             Must NOT inherit from Theme.SplashScreen. -->
        <item name="postSplashScreenTheme">@style/AppTheme</item>

        <!-- ─── Icon ──────────────────────────────────────────────────────── -->

        <!-- Center icon. Recommended size: 240×240dp (visible area: 160×160dp).
             Supports PNG, VectorDrawable, or AnimatedVectorDrawable. -->
        <item name="windowSplashScreenAnimatedIcon">@drawable/splash_icon</item>

        <!-- Background color shown behind the icon (useful when the icon
             has transparent areas or uses a non-circular shape).
             Default: transparent. -->
        <item name="windowSplashScreenIconBackgroundColor">@color/splashIconBackground</item>

        <!-- Duration of the icon animation in milliseconds.
             Only meaningful when windowSplashScreenAnimatedIcon is an
             AnimatedVectorDrawable. Maximum value: 1000ms.
             Default: 0 (no animation). -->
        <item name="windowSplashScreenAnimationDuration">500</item>

        <!-- ─── Branding ───────────────────────────────────────────────────── -->

        <!-- Branding image displayed at the bottom of the splash screen.
             Typically a company logo. Use a horizontal PNG or VectorDrawable.
             Shown on API 31+ (Android 12+); silently ignored on older versions. -->
        <item name="windowSplashScreenBrandingImage">@drawable/splash_branding</item>

    </style>

    <!-- The actual app theme, applied after the splash screen exits -->
    <style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
        <item name="android:editTextBackground">@drawable/rn_edit_text_material</item>
    </style>
</resources>
```

**`android/app/src/main/res/values/colors.xml`** (create if it doesn't exist)

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="splashBackground">#FFFFFF</color>
    <!-- Optional: background behind the icon -->
    <color name="splashIconBackground">#FFFFFF</color>
</resources>
```

### 2. Update `AndroidManifest.xml`

Set `SplashTheme` as the application theme:

**`android/app/src/main/AndroidManifest.xml`**

```xml
<application
  ...
  android:theme="@style/SplashTheme">
```

#### Icon size guide

The splash screen icon is placed inside a **circular mask** (following the adaptive icon spec):

| Zone | Size |
|---|---|
| Full icon canvas | 240 × 240 dp |
| Safe area (always visible) | 160 × 160 dp |
| Masked outer ring | 40 dp on each side |

Keep your logo within the **160 × 160 dp** safe area. The outer 40 dp may be clipped on some devices.

### 3. Wire up MainActivity

Add a single call to `ReactNativeSplashScreenModule.show(this)` **before** `super.onCreate()`:

```kotlin
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.nfsmonstr.reactnativesplashscreen.ReactNativeSplashScreenModule

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    ReactNativeSplashScreenModule.show(this) // must be before super!
    super.onCreate(savedInstanceState)
  }

  override fun getMainComponentName(): String = "YourAppName"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
```

> **Why before `super.onCreate()`?** The AndroidX SplashScreen API requires `installSplashScreen()` to be called before the Activity's `super.onCreate()`. The library handles this internally.

---

## iOS Setup

### 1. Call `show()` from AppDelegate

**Swift**

```swift
import ReactNativeSplashScreen

func application(
  _ application: UIApplication,
  didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
) -> Bool {
  // Show the splash screen overlay before React Native initializes
  ReactNativeSplashScreen.show()

  // ... rest of your setup
  return true
}
```

**Objective-C**

```objc
#import <ReactNativeSplashScreen/ReactNativeSplashScreen.h>

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [ReactNativeSplashScreen show];
  // ...
}
```

### 2. LaunchScreen.storyboard

The library automatically reads your app's existing **`LaunchScreen.storyboard`** — no additional assets or configuration needed. The overlay creates a seamless continuation of the system launch image.

---

## JavaScript Usage

```typescript
import SplashScreen from '@nfsmonstr/react-native-splash-screen';

// In your root component:
useEffect(() => {
  async function init() {
    await loadUserSession(); // your async initialization
    SplashScreen.hide();
  }
  init();
}, []);
```

### API

| Method | iOS | Android | Description |
|---|:---:|:---:|---|
| `SplashScreen.hide()` | ✓ | ✓ | Dismisses the splash screen with a fade animation |
| `SplashScreen.show()` | ✓ | — | Shows the splash screen overlay (iOS only; no-op on Android) |

---

## How It Works

### Android

Uses the [AndroidX SplashScreen API](https://developer.android.com/develop/ui/views/launch/splash-screen) (`androidx.core:core-splashscreen`). The system displays the splash before the Activity renders. `ReactNativeSplashScreenModule.show(this)` calls `installSplashScreen()` and sets a keep-visible condition. When `SplashScreen.hide()` is called from JavaScript, the condition is cleared and the system animates the splash out.

### iOS

Displays a `UIWindow` overlay loaded from your app's `LaunchScreen.storyboard`, at `UIWindowLevel` above the main window. The overlay is shown before React Native loads and is dismissed with a 250ms fade animation when `SplashScreen.hide()` is called.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

MIT

---

## Credits

Original library created by **Jia PengHui (crazycodeboy)** — [github.com/crazycodeboy/react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen)

Reworked for New Architecture (TurboModules) by [NFS_MONSTR](https://github.com/NFSMONSTR)
