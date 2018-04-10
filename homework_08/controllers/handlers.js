const fs = require('fs');

const callbacks = {
    getRockstars(req, res) {
        fs.readFile('./data/storage.json', 'utf8', (err, responce) => {
            if (err) throw err;
            res.status(200).send(responce);
        });

    },
    getRockstarById(req, res) {
        fs.readFile('./data/storage.json', 'utf8', (err, responce) => {
            if (err) throw err;
            const rockstars = JSON.parse(responce);
            const rockstar = rockstars.find((rockstar) => rockstar.id === parseInt(req.params.id));
            if (!rockstar) {
                res.sendStatus(404);
                return;
            };
            res.status(200).send(rockstar);
        });
    },
    putRockstarById(req, res) {
        fs.readFile('./data/storage.json', 'utf8', (err, responce) => {
            if (err) throw err;
            const rockstars = JSON.parse(responce);
            const rockstar = rockstars.find((rockstar) => rockstar.id === parseInt(req.params.id));
            if (!rockstar) {
                res.sendStatus(404);
                return;
            };
            rockstar.name = req.body.name;
            rockstar.band = req.body.band;
            rockstar.instrument = req.body.instrument;

            fs.writeFile('./data/storage.json', JSON.stringify(rockstars), (err) => {
                if (err) {
                    throw err;
                } else {
                    res.status(200).send(rockstar);
                };
            });
        });
    },
    deleteRockstar(req, res) {
        fs.readFile('./data/storage.json', 'utf8', (err, responce) => {
            if (err) throw err;
            const rockstars = JSON.parse(responce);
            const rockstar = rockstars.find((rockstar) => rockstar.id === parseInt(req.params.id));
            if (!rockstar) {
                res.sendStatus(404);
                return;
            };
            const index = rockstars.indexOf(rockstar);
            rockstars.splice(index, 1);

            fs.writeFile('./data/storage.json', JSON.stringify(rockstars), (err) => {
                if (err) {
                    throw err;
                } else {
                    res.status(200).send({
                        'message': 'Musician has been successfully removed.'
                    });
                };
            });
        });
    },
    postRockstar(req, res) {
        fs.readFile('./data/storage.json', 'utf8', (err, responce) => {

            if (err) throw err;
            const rockstars = JSON.parse(responce);
            const id = rockstars.find((rockstar) => rockstar.id === parseInt(req.body.id));
            if (id) {
                res.status(409).send({
                    'message': 'Musician already exist.'
                });
                return;
            };

            if (!req.body.id || !req.body.name || !req.body.band || !req.body.instrument) {
                res.sendStatus(400);
                return;
            };

            rockstars.push(req.body);
            fs.writeFile('./data/storage.json', JSON.stringify(rockstars), (err) => {
                if (err) {
                    throw err;
                } else {
                    res.sendStatus(201);
                };
            });
        });
    }
};

module.exports.callbacks = callbacks;