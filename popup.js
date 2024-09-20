// Callback on opening extension popup
window.onload = get();

// Listner for 'Disable' button click
const disableBtn = document.getElementById("disableBtn");
disableBtn.addEventListener("click",() => {    
		disable();
});

// Listner for 'Enable' button click
const	enableBtn = document.getElementById("enableBtn");
enableBtn.addEventListener("click",() => {    
		enable();
});

// Icon in the popup
const iconPopup = document.getElementById("icon");

// Initial settings check and popup configuration
function get() {
	let getting = browser.proxy.settings.get({});
	getting.then((got) => {
		if (got.value.proxyType == "system") {
			icoOff();
		} else if (got.value.proxyType == "manual") {
			icoOn();
		}
	});
	if (localStorage.getItem("proxyHost") != null
		&& localStorage.getItem("proxyPort") != null
		&& localStorage.getItem("passthrough") != null) {
		let proxyHost = document.getElementById("proxyHost");
		let proxyPort = document.getElementById("proxyPort");
		let passthrough = document.getElementById("passthrough");
		proxyHost.value = localStorage.getItem("proxyHost");
		proxyPort.value = localStorage.getItem("proxyPort");
		passthrough.value = localStorage.getItem("passthrough");
	}
}

// Enable proxy
function enable() {
	let proxyHost = document.getElementById("proxyHost").value;
	let proxyPort = document.getElementById("proxyPort").value;
	let passthrough = document.getElementById("passthrough").value;
	let config = {
		proxyType: "manual",
		http: proxyHost + ":" + proxyPort,
		ssl: proxyHost + ":" + proxyPort,
		httpProxyAll:true,
		proxyDNS: false,
		passthrough: passthrough
	};
	browser.proxy.settings.set({value: config});
	icoOn();
	save();
}

// Disable proxy
function disable() {
	let config = {
		proxyType: "system",
		proxyDNS: false,
		passthrough: ""
	};
	browser.proxy.settings.set({value: config});
	icoOff();
	save();
}

function save() {
	let proxyHost = document.getElementById("proxyHost").value;
	let proxyPort = document.getElementById("proxyPort").value;
	let passthrough = document.getElementById("passthrough").value;
	localStorage.setItem("proxyHost", proxyHost);
	localStorage.setItem("proxyPort", proxyPort);
	localStorage.setItem("passthrough", passthrough);
}

// Set icons to enabled state
function icoOn() {
	browser.action.setIcon({path:iconsOn});
	iconPopup.src = "images/on/icon-48.png";
}

// Set icons to disabled state
function icoOff() {
	browser.action.setIcon({path:iconsOff});
	iconPopup.src = "images/icon-48.png"
}

// Icons path object for enabled state
iconsOn = {
	"16":"images/on/icon-16.png",
	"32":"images/on/icon-32.png",
	"48":"images/on/icon-48.png",
	"128":"images/on/icon-128.png"
}

// Icons path object for disabled state
iconsOff = {
	"16":"images/icon-16.png",
	"32":"images/icon-32.png",
	"48":"images/icon-48.png",
	"128":"images/icon-128.png"
}

// Show current settings JSON
function show() {
	let getting = browser.proxy.settings.get({});
	getting.then((got) => {
		alert(JSON.stringify(got.value));
	});
}