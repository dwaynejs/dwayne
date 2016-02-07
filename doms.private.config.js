var D = require("doms");
module.exports = {
	cli : {
		"before publish" : () => {
			D.exec("doms upgrade");
		}
	}
}