import 'dotenv/config';

export default ({ config }) => ({
  expo: {
    name: "TenantTrack",
    slug: "TenantTrack",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "tenanttrack",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    extra: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_KEY,
    },

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.bodruddozaredoy.TenantTrack",
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          "Allow TenantTrack to access your location.",
      },
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_KEY,
      },
    },

    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#E6F4FE",
      },
      permissions: [
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
      ],
      package: "com.bodruddozaredoy.TenantTrack",
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_KEY,
        },
      },
    },

    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      [
        "expo-location",
        {
          locationWhenInUsePermission:
            "Allow TenantTrack to use your location.",
        },
      ],
      [
        "expo-maps",
        {
          apiKey: process.env.GOOGLE_MAPS_KEY,
          requestLocationPermission: true,
          locationPermission:
            "Allow TenantTrack to use your location.",
        },
      ],
      "expo-localization",
    ],

    experiments: {
      typedRoutes: true,
    },

    androidNavigationBar: {
      backgroundColor: "#F6F6F6",
      translucent: true,
      visible: "leanback",
    },
  },
});
