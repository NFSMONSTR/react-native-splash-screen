#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * React Native Splash Screen
 *
 * Original library by Jia PengHui (crazycodeboy)
 * https://github.com/crazycodeboy/react-native-splash-screen
 *
 * Reworked for New Architecture (TurboModules) by NFS_MONSTR
 */
@interface ReactNativeSplashScreen : NSObject

/**
 * Shows a UIWindow overlay loaded from LaunchScreen.storyboard.
 * Call this from AppDelegate before React Native initializes:
 *
 *   import ReactNativeSplashScreen
 *   ReactNativeSplashScreen.show()
 */
+ (void)show;

/**
 * Hides the splash screen with a fade animation.
 * Called automatically when SplashScreen.hide() is invoked from JavaScript.
 */
+ (void)hide;

@end

NS_ASSUME_NONNULL_END
