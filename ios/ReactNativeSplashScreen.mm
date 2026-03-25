#import "ReactNativeSplashScreen.h"
#import <ReactNativeSplashScreenSpec/ReactNativeSplashScreenSpec.h>

// Private class extension adds TurboModule conformance without exposing
// C++/JSI headers in the public ReactNativeSplashScreen.h
@interface ReactNativeSplashScreen () <NativeReactNativeSplashScreenSpec>
@end

static UIWindow *_splashWindow = nil;

@implementation ReactNativeSplashScreen

#pragma mark - Class-level API (called from AppDelegate)

+ (void)show {
  dispatch_async(dispatch_get_main_queue(), ^{
    if (_splashWindow) return;

    UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"LaunchScreen" bundle:nil];
    UIViewController *viewController = [storyboard instantiateInitialViewController];

    // UIWindowScene is required on iOS 13+
    UIWindowScene *windowScene = nil;
    for (UIScene *scene in UIApplication.sharedApplication.connectedScenes) {
      if ([scene isKindOfClass:[UIWindowScene class]] &&
          scene.activationState == UISceneActivationStateForegroundActive) {
        windowScene = (UIWindowScene *)scene;
        break;
      }
    }

    if (windowScene) {
      _splashWindow = [[UIWindow alloc] initWithWindowScene:windowScene];
    } else {
      _splashWindow = [[UIWindow alloc] initWithFrame:UIScreen.mainScreen.bounds];
    }

    _splashWindow.windowLevel = UIWindowLevelNormal + 1;
    _splashWindow.rootViewController = viewController;
    _splashWindow.hidden = NO;
    [_splashWindow makeKeyAndVisible];
  });
}

+ (void)hide {
  dispatch_async(dispatch_get_main_queue(), ^{
    if (!_splashWindow) return;

    UIWindow *windowToHide = _splashWindow;
    _splashWindow = nil;

    [UIView animateWithDuration:0.25
                          delay:0.0
                        options:UIViewAnimationOptionCurveEaseOut
                     animations:^{
                       windowToHide.alpha = 0.0;
                     }
                     completion:^(__unused BOOL finished) {
                       windowToHide.hidden = YES;
                       windowToHide.rootViewController = nil;
                     }];
  });
}

#pragma mark - TurboModule instance methods (delegate to class methods)

- (void)hide {
  [ReactNativeSplashScreen hide];
}

- (void)show {
  [ReactNativeSplashScreen show];
}

#pragma mark - TurboModule registration

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeReactNativeSplashScreenSpecJSI>(params);
}

+ (NSString *)moduleName
{
  return @"ReactNativeSplashScreen";
}

@end
