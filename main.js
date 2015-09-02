process.title = "Cerveau Game Server"

var express = require('express');
var app = express();
var http = require('http').Server(app);
var expressHbs = require('express-handlebars');
var fs = require('fs');
var path = require('path');
var moment = require('moment');
var extend = require('extend');
var ArgumentParser = require('argparse').ArgumentParser;
require("./extensions/"); // extends built in JavaScript objects. Extend with care, prototypes can get funky if you are not careful
var utilties = require("./utilities/utilities");

var parser = new ArgumentParser({description: 'Run the JavaScript client with options to connect to a game server. Must provide a game name to play.'});
parser.addArgument(['-p', '--port'], {action: 'store', dest: 'port', defaultValue: 3000, help: 'the port that clients should connect through'});
parser.addArgument(['-H', '--host'], {action: 'store', dest: 'host', defaultValue: "localhost", help: 'the host that this should run on'});
parser.addArgument(['--printIO'], {action: 'storeTrue', dest: 'printIO', help: '(debugging) print IO through the TCP socket to the terminal'});
parser.addArgument(['--noTimeout'], {action: 'storeTrue', dest: 'noTimeout', help: '(debugging) clients cannot time out'});

var args = parser.parseArgs();

var Lobby = require("./lobby");

console.log("Cerveau started up as pid: " + process.pid);

//http://runnable.com/U07z_Y_j9rZk1tTx/handlebars-template-examples-with-express-4-for-node-js

http.listen(args.port, function(){
    console.log('--- Webserver running on ' + args.host + ':' + args.port + ' ---');
});

var lobby = new Lobby(args); // the game server for clients to connect to



// TODO: move all this below to file(s).

app.engine('hbs', expressHbs({
    extname:'hbs',
    defaultLayout:'main.hbs',
    helpers: {
        formatDate: function (date, format) {
            return moment(date).format(format);
        },
    },
}));
app.set('view engine', 'hbs');

var gameInfos = {};

function initGameInfos() {
    var gameFolders = utilties.getDirs("games/");
    for(var i = 0; i < gameFolders.length; i++) {
        var gameFolder = gameFolders[i];
        if(!gameFolder.startsWith("_")) {
            gameInfos[gameFolder] = gameInfos[gameFolder] || require('./games/' + gameFolder + "/gameInfo.json");
        }
    }
};

app.get('/', function(req, res){
    initGameInfos();

    var games = [];
    for(var gameName in gameInfos) {
        if(gameInfos.hasOwnProperty(gameName)) {
            var gameInfo = gameInfos[gameName];
            games.push({
                name: gameName,
                description: gameInfo.Game.description,
            });
        }
    }

    games.sort(function(a, b) {
        return a.name.toLowerCase() > b.name.toLowerCase();
    });

    var logs = lobby.gameLogger.getLogs();
    var gamelogs = [];
    for(var i = 0; i < logs.length; i++) {
        var log = logs[i];
        gamelogs.push({
            game: log.gameName,
            session: log.gameSession,
            epoch: log.epoch,
            uri: log.gameName + "/" + log.gameSession + "/" + log.epoch,
        });
    }

    res.render('index', {
        games: games,
        gamelogs: gamelogs,
    });
});


////////////////////
// JSON Responses //
////////////////////

app.get('/status/:gameName/:gameSession', function(req, res) {
    var response = {};
    if(req.params.gameName && req.params.gameSession) {
        var info = lobby.getGameSessionInfo(req.params.gameName, req.params.gameSession);
        if(!info.error) {
            response = info;
            response.status = (info.over === true ? "over" : "running");
            response.gamelog = undefined;
        }
        else {
            if(info.sessionID !== undefined) {
                response.status = "open";
            }
            else {
                response.status = "error";
                response.error = info.error;
                response.gameName = info.gameName;
            }
        }
    }
    else {
        response.status = "error";
        response.error = "gameName or gameSession not sent!";
    }

    res.json(response);
});

app.get('/gamelog/:gameName/:gameSession/:requestedEpoch?', function(req, res) {
    var response = {}
    if(!req.params.gameName || !req.params.gameSession) {
        response.error = "gameName or gameSession not sent!";
    }
    else {
        req.params.requestedEpoch = req.params.requestedEpoch || 0;
        var gamelog = lobby.gameLogger.getLog(req.params.gameName, req.params.gameSession, req.params.requestedEpoch);

        if(gamelog) {
            response = gamelog;
        }
        else {
            response.error ="gamelog not found";
        }
    }

    res.json(response);
});

////////////////////
// HTML Responses //
////////////////////

app.get('/visualize/:gameName/:gameSession/:requestedEpoch?', function(req, res) {
    res.render('visualize', req.params);
});

var docDatas = {};
app.get('/documentation/:gameName', function(req, res) {
    var gameName = req.params.gameName;
    initGameInfos();
    var gameInfo = gameInfos[gameName];

    if(!docDatas[gameName]) {
        classes = [];

        var objects = extend({
            'Game': gameInfo.Game,
            'AI': gameInfo.AI,
        }, gameInfo.gameObjects);

        function sortNames(a, b) {
            return a.name.toLowerCase() > b.name.toLowerCase();
        };

        function formatType(typeObj) {
            var baseType = typeObj['name'];
            switch(typeObj.name) {
                case "dictionary":
                    return "dictionary<" + formatType(typeObj.keyType) + ", " + formatType(typeObj.valueType) + ">";
                case "list":
                    return "list<" + formatType(typeObj.valueType) + ">";
                default:
                    return String(baseType);
            }
        };

        function formatVariable(variable) {
            if(variable.type) {
                variable.type = formatType(variable.type);
            }

            if(variable.type === "boolean" && variable['default'] !== null) {
                variable['default'] = String(variable['default']);
            }

            if(variable.type === "string" && variable['default'] !== null) {
                variable['default'] = '"' + variable['default'] + '"';
            }
        };

        var gameClass = undefined;
        var aiClass = undefined;
        for(var objName in objects) {
            if(objects.hasOwnProperty(objName)) {
                var gameObject = objects[objName];
                var docClass = extend({}, gameObject, {
                    name: objName,
                    attributes: [],
                    functions: [],
                });

                function addTo(array, dict) {
                    for(var key in dict) {
                        if(!key.startsWith("_") && dict.hasOwnProperty(key)) {
                            array.push(extend({name: key}, dict[key]));
                        }
                    }
                };

                addTo(docClass.attributes, gameObject.attributes);
                addTo(docClass.attributes, gameObject.inheritedAttributes);
                docClass.attributes.sort(sortNames);
                for(var i = 0; i < docClass.attributes.length; i++) {
                    formatVariable(docClass.attributes[i]);
                }

                addTo(docClass.functions, gameObject.functions);
                addTo(docClass.functions, gameObject.inheritedFunctions);
                docClass.functions.sort(sortNames);
                for(var i = 0; i < docClass.functions.length; i++) {
                    var funct = docClass.functions[i];
                    if(funct.returns !== null) {
                        formatVariable(funct.returns);
                    }
                    else {
                        funct.returns = {type: "void"};
                    }
                    for(var j = 0; j < funct.arguments.length; j++) {
                        formatVariable(docClass.functions[i].arguments[j]);
                    }
                }

                classes.push(docClass);

                if(docClass.name == "Game") {
                    gameClass = docClass;
                }
                else if(docClass.name == "AI") {
                    aiClass = docClass;
                }
            }
        }

        classes.removeElement(gameClass);
        classes.removeElement(aiClass);

        classes.sort(sortNames);
        classes.unshift(aiClass);
        classes.unshift(gameClass);

        docDatas[gameName] = classes;
    }

    res.render('documentation', {
        gameName: gameName,
        classes: docDatas[gameName],
    });
});



// GET /static/style.css etc.
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/gamelogs', express.static(__dirname + '/gamelogs'));