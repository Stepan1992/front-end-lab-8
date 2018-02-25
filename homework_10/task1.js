function debounce(callback, delay) {
	let timer;
	return function (...args) {
		clearTimeout(timer);
		timer = setTimeout(function () {
			callback.apply(this, args);
		}, delay);
	};
};

let iterator = 0;

function increaseIteratorBy1() {
	iterator++;

	printIteratorValue();
}

function printIteratorValue() {
	console.log('Iterator value ', iterator);
}

var increaseIterator = debounce(increaseIteratorBy1, 1000);

increaseIterator();
increaseIterator();
increaseIterator();
increaseIterator();
increaseIterator();
increaseIterator();
increaseIterator();
increaseIterator();
increaseIterator();