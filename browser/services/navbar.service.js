class urlAutoComplete{
	constructor(url) {
		let searchProvider = OhHaiBrowser.settings.search;
		let urlbarValid = {};
		OhHaiBrowser.validate.url(url,function(isurl){ urlbarValid = isurl; });

		this.valid = urlbarValid.valid;
		this.output = this.valid ? urlbarValid.url : searchProvider + urlbarValid.url;
		this.type = this.valid ? 'url' : 'search';
		this.results = [];
	}
}
module.exports.AutoComplete = (value,callback) => { callback(new urlAutoComplete(value)); };

let controls = {
	btn_ToggleTabBar: () => document.getElementById('HideShow'),
	lbl_TabCount: () => document.getElementById('HideShowCount'),
	btn_back: () => document.getElementById('Back'),
	txt_urlbar: () => document.getElementById('URLBar'),
	btn_forward: () => document.getElementById('Forward'),
	btn_overflow: () => document.getElementById('Menu')
};
module.exports.controls = controls;

let functions = {
	updateTabCounter: function () {
		controls.lbl_TabCount().textContent = OhHaiBrowser.tabs.count;
	},
	updateURLBar: function (webview, callback) {
		controls.txt_urlbar().setValues(webview.getTitle(), webview.getURL());
		this.updatePageInfo(webview);
		if (typeof callback == 'function') {
			callback(true);
		}
	},
	updatePageInfo: function (webview) {
		var webviewcontent = webview.getWebContents();
		webviewcontent.on('certificate-error', (e, url, error, cert) => {
			controls.txt_urlbar().updateCertBtn('error');
		});
	}
};
module.exports.functions = functions;