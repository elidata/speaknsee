<!-- to do: follow these steps: https://www.webcomponents.org/publish -->

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/googlecreativelab/obvi)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# OBVI
**O**ne **B**utton for **V**oice **I**nput is a customizable [webcomponent](https://developer.mozilla.org/en-US/docs/Web/Web_Components) built with [Polymer 2+](https://www.polymer-project.org/) to make it easy for including speech recognition in your web-based projects.  It uses the [Speech Recognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) API, and for unsupported browsers it will fallback to a client-side [Google Cloud Speech API](https://cloud.google.com/speech/) solution.  

![example](https://storage.googleapis.com/readme-assets/voice-button.gif)



## Run example

Make sure you have polymer & bower installed globally:

```
npm install -g polymer
npm install -g bower
```

And in the root of this repo:

```
bower install
npm start
```

## Setting up your project

[Bower](https://bower.io/) handles installing the components' dependencies and updating installed components. For more information, see [Installing with Bower](https://elements.polymer-project.org/guides/using-elements#installing-with-bower).  You need to have a ```bower.json``` file in the root of your project, and then install these dependencies:

```
bower init
bower install --save webcomponentsjs
bower install --save obvi
```

To use this component, first load the web components polyfill library, `webcomponents-lite.min.js`. Many browsers have yet to implement the various web components APIs. Until they do, webcomponents-lite provides polyfill support. Be sure to include this file before any code that touches the DOM.

Once you have some elements installed and you've loaded `webcomponents-lite.min.js`, using an element is simply a matter of loading the element file using an HTML Import.

```
<!DOCTYPE html>
<html>
  <head>
    <!-- 1. Load webcomponents-lite.min.js for polyfill support. -->
    <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>

    <!-- 2. Use an HTML Import to bring in the voice button. -->
    <link rel="import" href="bower_components/obvi/voice-button.html">
  </head>
  <body>
    <!-- 3. Declare the element. Configure using its attributes, include your own API key -->
    <voice-button id="voice-button" cloud-speech-api-key="YOUR_API_KEY" autodetect></voice-button>

    <script>
      // To ensure that elements are ready on polyfilled browsers, 
      // wait for WebComponentsReady. 
      document.addEventListener('WebComponentsReady', function() {
        var voiceEl = document.querySelector('voice-button');
        // listen for speech events
        voiceEl.addEventListener('onSpeech', function(event){
			if(event.detail.isFinal){
		      console.log('final:', event.detail.speechResult);
		    }
        })
      });
    </script>
  </body>
</html>
```

*Note: You must run your app from a web server for the HTML Imports polyfill to work properly. This requirement goes away when the API is available natively.*


*Also Note: If your app is running from SSL (https://), the microphone access permission will be persistent. That is, users won't have to grant/deny access every time.*

### For a single-build (one bundled file, no Bower dependency) set up:

Static hosting services like GitHub Pages and Firebase Hosting don't support serving different files to different user agents. If you're hosting your application on one of these services, you'll need to serve a single build like so:

```
<link rel="import" href="bower_components/obvi/build/dist/voice-button.html">
```

You can also customize the ```polymer build``` command in ```package.json``` and create your own build file to futher suit your needs.


## Usage

Basic usage is:

`<voice-button cloud-speech-api-key="YOUR_API_KEY"></voice-button>`



### Options

| Name		    | Description	| Type		  | Default | Options / Examples|
| ----------- | :-----------:| :-----------:| :-----------:|---------:|
| **cloudSpeechApiKey** | Cloud Speech API is the fallback when the Web Speech API isn't available.  Provide this key to cover more browsers. | String | null | `<voice-button cloud-speech-api-key="XXX"></voice-button>`
| **flat** | Whether or not to include the shadow.|  Boolean | *false* |`<voice-button flat>`
| **autodetect** | By default, the user needs to press & hold to capture speech.  If this is set to true, it will auto-detect silence to finish capturing speech. | Boolean | *false* | `<voice-button autodetect>`
| **language** | Language for [SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) interface.  If not set, will default to user agent's language setting.  [See here](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/lang) for more info. | String | 'en-US' | `<voice-button language="en-US">`
| **disabled** | Disables the button for being pressed and capturing speech. | Boolean | *false* | `<voice-button disabled>`
| **keyboardTrigger** | How the keyboard will trigger the button | String | `'space-bar'` | `<voice-button keyboard-trigger="space-bar">` `space-bar`, `all-keys`, `none`
| **clickForPermission** | If set to true, will only ask for browser microphone permissions when the button is clicked (instead of immediately) | Boolean | false | `<voice-button click-for-permission="true"`
| **hidePermissionText** | If set to true, the warning text for browser access to the microphone will not appear | Boolean | false | `hide-permission-text="true"`

### CSS Variables

You can customize the look of the button using these CSS variables (default values shown):

```
voice-button{
	--button-diameter: 100px;
	--mic-color: #FFFFFF;
	--text-color: #666666;
	--button-color: #666666;
	--circle-viz-color: #000000;
}
```


### Events

You can listen for the following custom events from the voice button:

| Name		    | Description	| Return |
| ----------- | :-----------:| :-----------:|
| `onSpeech` | Result from the speech handler | `detail: { result: { speechResult : String, confidence : Number, isFinal : Boolean, sourceEvent: Object }`
| `onSpeechError` | The raw event returned from the SpeechRecognition `onerror` handler | See [here](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/onerror)
| `onStateChange` | When the button changes state | `detail: { newValue: String, oldValue: String}` *see below for listening states* 

*Listening states:*

      IDLE: 'idle',
      LISTENING: 'listening',
      USER_INPUT: 'user-input',
      DISABLED: 'disabled'


### Microphone Permissions

When the component is loaded, microphone access is checked (unless `click-for-permission="true"` is set, then it will ask one the button is clicked).  If the host's mic access is blocked, there will be a warning shown.  The language of the text matches the `language` attribute for the component (defaults to "en-US").  If the color of the text needs to be customized, you can use the `--text-color` CSS variable.

![Microphone not allowed](https://storage.googleapis.com/readme-assets/cannotaccessmicrophone.png)


## Browser Compatibility

This component defaults to using the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).  If the browser does not support that, it will fall back to [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) in order to capture audio on the client and post it to the [Google Cloud Speech API](https://cloud.google.com/speech/).  Make sure to [create an API Key](https://support.google.com/cloud/answer/6158862?hl=en) and have the `cloud-speech-api-key` attribute (see above in Options) filled out in order to use this fallback.  You can check the `supported` property of the button once it's loaded in to see if it has browser support.

When the fallback is used, there will be no streaming speech recognition; the speech comes back all at once.


| Browser        | Support           | Features |
| ------------- |-------------|-------------|
| Firefox | [Stable](http://www.mozilla.org/en-US/firefox/new/) / [Aurora](http://www.mozilla.org/en-US/firefox/aurora/) / [Nightly](http://nightly.mozilla.org/) | Cloud Speech fallback |
| Google Chrome | [Stable](https://www.google.com/intl/en_uk/chrome/browser/) / [Canary](https://www.google.com/intl/en/chrome/browser/canary.html) / [Beta](https://www.google.com/intl/en/chrome/browser/beta.html) / [Dev](https://www.google.com/intl/en/chrome/browser/index.html?extra=devchannel#eula) | Web Speech API |
| Opera | [Stable](http://www.opera.com/) / [NEXT](http://www.opera.com/computer/next)  | Cloud Speech fallback |
| Android | [Chrome](https://play.google.com/store/apps/details?id=com.chrome.beta&hl=en) / [Firefox](https://play.google.com/store/apps/details?id=org.mozilla.firefox) / [Opera](https://play.google.com/store/apps/details?id=com.opera.browser) | Cloud Speech fallback |
| Microsoft Edge | [Normal Build](https://www.microsoft.com/en-us/windows/microsoft-edge) | Cloud Speech fallback |
| Safari 11 | Stable | Cloud Speech fallback |


## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Credits
This component was authored by [@nick-jonas](github.com/nick-jonas), and was built atop some great tools - special thanks to the Polymer team (esp. Chris Joel), [Jonathan Schaeffer](https://github/com/jonathanschaefferhookqa) for testing help, [@jasonfarrell](https://github.com/jasonfarrell) for fallback help, [@GersonRosales](https://github.com/gersonrosales) & [@danielstorey](https://github.com/danielstorey) for showing a working recording example in iOS11 early days.




#### This is an experiment, not an official Google product. We’ll do our best to support and maintain this experiment but your mileage may vary.