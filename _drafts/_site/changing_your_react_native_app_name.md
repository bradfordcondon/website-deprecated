
# Renaming my app in react-native

In theory, all you need to do is rename the app in your `package.json` file and run `react-native upgrade`.  

In practice, however, I've been getting the error: `A valid version number for 'react-native' is not specified in your 'package.json' file. Aborting.`

```
react-native-cli: 2.0.1
react-native: 0.42.3
```

Make sure that react and react-native are pointing to a stable release, for example, 

```
 "react": "^15.4.*",
    "react-native": "^0.42.*",
    ```


It also suggests using the git upgrader, at `npm install -g react-native-git-upgrade`.  Once the upgrader is installed, run `sudo react-native-git-upgrade`.


You should also be sure to run a find-replace to replace your old app name with the new one in all text throughout the app itself.



### Removing the old app

* Manually delete all of the build specific folders and files in the `ios` and `android` folder.

* Now delete all modules, install, and re-link

```
sudo rm -rf node_modules && sudo npm install && react-native link
```

* clear the cache

```
watchman watch-del-all

npm start --reset-cache
```