require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "ReactNativeSplashScreen"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => "https://github.com/NFSMONSTR/react-native-splash-screen.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift,cpp}"
  s.public_header_files = "ios/ReactNativeSplashScreen.h"
  s.module_map = "ios/ReactNativeSplashScreen.modulemap"

  install_modules_dependencies(s)

  # DEFINES_MODULE = YES causes CocoaPods to copy our module map to
  # Headers/Private/ReactNativeSplashScreen/ and add the -fmodule-map-file
  # flag to consuming targets automatically, enabling:
  #   import ReactNativeSplashScreen
  # in Swift AppDelegate without use_frameworks! or a bridging header.
  s.pod_target_xcconfig = {
    "DEFINES_MODULE" => "YES",
    "MODULEMAP_FILE" => "$(PODS_TARGET_SRCROOT)/ios/ReactNativeSplashScreen.modulemap"
  }
end
