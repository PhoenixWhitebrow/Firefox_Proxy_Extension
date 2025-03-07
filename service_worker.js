// Callback on browser startup
browser.runtime.onStartup.addListener(get);
browser.runtime.onInstalled.addListener(get);

// Initial settings check for status icon setup
function get() {
  let getting = browser.proxy.settings.get({});
  getting.then((got) => {
    if (got.value.proxyType == "system") {
      icoOff();
    } else if (got.value.proxyType == "manual") {
      icoOn();
    }
  });
}

// Set icons to enabled state
function icoOn() {
  browser.action.setIcon({path:iconsOn});
}

// Set icons to disabled state
function icoOff() {
  browser.action.setIcon({path:iconsOff});
}

// Icons path object for enabled state
const iconsOn = {
  "16":"images/on/icon-16.png",
  "32":"images/on/icon-32.png",
  "48":"images/on/icon-48.png",
  "128":"images/on/icon-128.png"
}

// Icons path object for disabled state
const iconsOff = {
  "16":"images/icon-16.png",
  "32":"images/icon-32.png",
  "48":"images/icon-48.png",
  "128":"images/icon-128.png"
}