var utils = require('utils/utils');
var enums = require('ui/enums');

export function getDeviceOrientation() {
  if (global.android) {
    var context = getContext();
		var orientation = context.getSystemService("window").getDefaultDisplay().getOrientation();
		switch (orientation) {
			case 1: /* LANDSCAPE */
				return enums.DeviceOrientation.landscape;
			case 0: /* PORTRAIT */
				return enums.DeviceOrientation.portrait;
			default:
				return false;
		}
  } else if (NSObject && UIDevice) {
    let device = utils.ios.getter(UIDevice, UIDevice.currentDevice);
    
    switch (device.orientation) {
      case UIDeviceOrientation.LandscapeLeft:
      case UIDeviceOrientation.LandscapeRight:
        return enums.DeviceOrientation.landscape;
      case UIDeviceOrientation.Portrait:
      case UIDeviceOrientation.PortraitUpsideDown:
        return enums.DeviceOrientation.portrait;
      default:
        // Since we have a up/Down orientation, we need to see what the statusbar is set to to get the actual current device orientation
        var appOrientation = utils.ios.getter(UIApplication, UIApplication.sharedApplication).statusBarOrientation;
        if (appOrientation === 1 || appOrientation === 2) { return enums.DeviceOrientation.portrait; }
        else { return enums.DeviceOrientation.landscape; }
    }
  }
}

function getContext() {
	var ctx = java.lang.Class.forName("android.app.AppGlobals").getMethod("getInitialApplication", null).invoke(null, null);
	if (ctx) { return ctx; }

	return java.lang.Class.forName("android.app.ActivityThread").getMethod("currentApplication", null).invoke(null, null);
}