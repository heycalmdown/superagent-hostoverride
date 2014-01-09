module.exports = setup;

function setup(superagent, prefix) {
	var Request = superagent.Request;
	Request.prototype.request = inject(Request.prototype.request, function () {
		if (this.url.slice(0, prefix.length) !== prefix) {
			this.url = prefix + this.url;
		}
	});
	return superagent;
}


function inject(oldFunction, newFunction) {
	return function () {
		newFunction.call(this);
		return oldFunction.apply(this, Array.prototype.slice.call(arguments));
	};
}
