## v3.0.0

### 12/19/2017

- for styling changes, only using CSS variables now per [suggestion from @masonlouchart](https://github.com/googlecreativelab/obvi/issues/1).  This is a breaking change for those using HTML attributes like button-diameter, hence the major version jump.

## v2.0.0

### 11/14/2017

- support now for Safari (iOS11 and macOS); note that support for webRTC on WebKit on iOS11 still hasn't arrived https://stackoverflow.com/questions/45055329/does-webkit-in-ios-11-beta-support-webrtc
- removed recordRTC dependency
- state property is now readOnly
- performance improvements, code refactoring
- removed "onSpeechRecognitionUnsupported" event, just setting a new "supported" boolean property on the element
- added Travis CI support
- removed paper-button dependency, using only paper-ripple behavior


## v1.1.1

### 11/8/2017

Initial Release

