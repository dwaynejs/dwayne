var D = require("doms");
module.exports = {
	cli : {
		"before publish" : () => {
			if (!D(process.argv).match("--forget"))
				D.exec("doms upgrade");
		}
	}
}