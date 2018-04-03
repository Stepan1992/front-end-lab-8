let http = {
    get: function (url) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function () {
                if (this.status === 200) {
                    resolve(xhr.response);
                } else {
                    let error = new Error(`Status: ${this.status}`);
                    reject(error);
                };
            };
            xhr.onerror = function () {
                let error = new Error(`Network Error`);
                reject(error);
            };
            xhr.send();
        });
    },
    post: function (url, requestBody) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.onload = function () {
                if (this.status === 200) {
                    resolve(xhr.response);
                } else {
                    let error = new Error(`Status: ${this.status}`);
                    reject(error);
                };
            };
            xhr.onerror = function () {
                let error = new Error(`Network Error`);
                reject(error);
            };
            xhr.send(requestBody);
        });
    }
};