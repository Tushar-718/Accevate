# Accevate - React Native Application

This is a React Native application built with TypeScript, Redux Toolkit for state management, and React Navigation for routing.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (>= 20.x)
- **Yarn** or **npm**
- **React Native CLI**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)
- **CocoaPods** (for iOS dependencies - macOS only)

> **Note**: Make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

---

## 🚀 Getting Started

Follow these steps to install and run the application locally:

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Accevate
```

### Step 2: Create Environment File

Create a `.env` file in the root directory of the project:

```bash
touch .env
```

Add the following content to the `.env` file:

```env
API_BASE_URL="Your API Base URL"
```

> **Important**: The `.env` file is already added to `.gitignore` to prevent sensitive data from being committed.

### Step 3: Install Dependencies

Install all the required Node modules:

```bash
yarn
```

Or if you're using npm:

```bash
npm install
```

### Step 4: Install iOS Dependencies (macOS only)

If you're developing for iOS, install CocoaPods dependencies:

```bash
cd ios
pod install
cd ..
```

### Step 5: Start Metro Bundler

Start the Metro bundler with cache reset:

```bash
yarn start --reset-cache
```

Or using npm:

```bash
npm start -- --reset-cache
```

> **Tip**: The `--reset-cache` flag clears the Metro bundler cache, which is useful when you encounter caching issues.

### Step 6: Run the Application

Open a **new terminal window** (keep Metro running in the previous terminal) and run:

#### For Android:

```bash
yarn android
```

Or using npm:

```bash
npm run android
```

#### For iOS (macOS only):

```bash
yarn ios
```

Or using npm:

```bash
npm run ios
```

---

## 📱 Available Scripts

- `yarn start` - Start Metro bundler
- `yarn start --reset-cache` - Start Metro bundler with cache reset
- `yarn android` - Run the app on Android emulator/device
- `yarn ios` - Run the app on iOS simulator/device
- `yarn lint` - Run ESLint to check code quality
- `yarn test` - Run Jest tests

---

## 🏗️ Project Structure

```
Accevate/
├── src/
│   ├── constants/        # App constants (colors, strings)
│   ├── navigation/       # Navigation configuration
│   ├── screens/          # Screen components
│   ├── services/         # API services and axios instance
│   ├── store/            # Redux store and slices
│   ├── styles/           # Common styles
│   └── utils/            # Utility functions
├── android/              # Android native code
├── ios/                  # iOS native code
├── .env                  # Environment variables (not committed)
└── App.tsx               # Root component
```

---

## 🔧 Troubleshooting

### Metro Bundler Issues

If you encounter issues with the Metro bundler, try:

```bash
# Clear Metro cache
yarn start --reset-cache

# Or manually clear cache
rm -rf node_modules/.cache
```

### Android Build Issues

```bash
# Clean Android build
cd android
./gradlew clean
cd ..

# Rebuild the app
yarn android
```

### iOS Build Issues

```bash
# Clean iOS build
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..

# Rebuild the app
yarn ios
```

### Icons Not Showing

If icons are not displaying properly:

```bash
# Re-link assets
npx react-native-asset

# For iOS, reinstall pods
cd ios && pod install && cd ..

# Rebuild the app
yarn android  # or yarn ios
```

---

## 🛠️ Tech Stack

- **React Native** 0.83.1
- **TypeScript** 5.8.3
- **Redux Toolkit** 2.11.2
- **React Navigation** 7.x
- **Axios** 1.13.4
- **React Native Vector Icons** 10.3.0
- **AsyncStorage** 2.2.0

---

## 📝 Environment Variables

The application uses the following environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `API_BASE_URL` | Base URL for API requests | `Your API Base URL` |

---

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly on both Android and iOS
4. Submit a pull request

---

## 📄 License

This project is private and proprietary.

---

## 📞 Support

For any issues or questions, please contact the development team.

---

## 🎯 Quick Start Summary

```bash
# 1. Create .env file with API_BASE_URL
echo "API_BASE_URL=Your API Base URL" > .env

# 2. Install dependencies
yarn

# 3. Install iOS dependencies (macOS only)
cd ios && pod install && cd ..

# 4. Start Metro bundler
yarn start --reset-cache

# 5. In a new terminal, run the app
yarn android  # or yarn ios
```

Happy coding! 🚀
