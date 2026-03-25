import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SplashScreen from '@nfsmonstr/react-native-splash-screen';

export default function App() {
  const [hidden, setHidden] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Simulate async initialization (auth check, config fetch, etc.)
    const timer = setTimeout(() => {
      SplashScreen.hide();
      setHidden(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>NEW ARCH</Text>
            </View>
            <Text style={styles.title}>react-native-splash-screen</Text>
            <Text style={styles.subtitle}>
              TurboModule · iOS &amp; Android · v5
            </Text>
            <View style={styles.statusRow}>
              <View
                style={[
                  styles.statusDot,
                  hidden ? styles.dotGreen : styles.dotOrange,
                ]}
              />
              <Text style={styles.statusText}>
                {hidden ? 'Splash hidden' : 'Hiding splash…'}
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Android Setup</Text>
            <Text style={styles.codeLabel}>res/values/styles.xml</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.code}>
                {
                  '<style name="AppTheme"\n  parent="Theme.SplashScreen">\n  <item name="windowSplashScreenBackground">\n    @color/splashBackground\n  </item>\n  <item name="postSplashScreenTheme">\n    @style/AppThemeBase\n  </item>\n</style>'
                }
              </Text>
            </View>
            <Text style={styles.codeLabel}>MainActivity.kt</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.code}>
                {
                  'override fun onCreate(state: Bundle?) {\n  ReactNativeSplashScreenModule\n    .init(this) // before super!\n  super.onCreate(state)\n}'
                }
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>iOS Setup</Text>
            <Text style={styles.codeLabel}>AppDelegate.swift</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.code}>
                {
                  'import ReactNativeSplashScreen\n\nfunc application(_ app, ...) -> Bool {\n  ReactNativeSplashScreen.show()\n  // ...\n}'
                }
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>JavaScript</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.code}>
                {
                  "import SplashScreen from\n  '@nfsmonstr/react-native-splash-screen';\n\nuseEffect(() => {\n  await loadAppData();\n  SplashScreen.hide();\n}, []);"
                }
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Running on {Platform.OS === 'ios' ? 'iOS' : 'Android'}
            </Text>
            <Text style={styles.footerCredit}>
              Original library by crazycodeboy
            </Text>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  content: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  badge: {
    backgroundColor: '#0066ff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 14,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1c1c1e',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#8e8e93',
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotGreen: {
    backgroundColor: '#34c759',
  },
  dotOrange: {
    backgroundColor: '#ff9500',
  },
  statusText: {
    fontSize: 13,
    color: '#636366',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1c1c1e',
    marginBottom: 12,
  },
  codeLabel: {
    fontSize: 11,
    color: '#8e8e93',
    marginBottom: 6,
    marginTop: 10,
    fontWeight: '500',
  },
  codeBlock: {
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    padding: 14,
  },
  code: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 11,
    color: '#e5e5ea',
    lineHeight: 18,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 12,
    gap: 4,
  },
  footerText: {
    fontSize: 13,
    color: '#8e8e93',
  },
  footerCredit: {
    fontSize: 12,
    color: '#aeaeb2',
  },
});
