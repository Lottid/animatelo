; (function (animatejs) {
    'use strict';
    var _defaultOptions = {
        duration: 1000,
        delay: 0,
        iterations: 1,
        direction: 'normal',
        fill: 'both',
        playbackRate: 1
    },
        _UUID = function () {
            var d = new Date().getTime(),
                uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
            return uuid;
        };

    animatejs._select = function (selector) {
        var nodeList,
            isNodeList = selector instanceof NodeList,
            isNode = selector instanceof Node,
            isString = typeof selector === 'string';
        if (isNodeList) {
            nodeList = selector;
        } else if (isNode) {
            nodeList[selector];
        } else if (isString) {
            nodeList = document.querySelectorAll(selector)
        } else {
            throw 'selector is invaid';
        }
        return nodeList;
    };

    animatejs._animate = function (selector, keyframes, optionsArg) {
        var options = {
            duration: optionsArg && 'duration' in optionsArg ? optionsArg.duration : _defaultOptions.duration,
            delay: optionsArg && 'delay' in optionsArg ? optionsArg.delay : _defaultOptions.delay,
            iterations: optionsArg && 'iterations' in optionsArg ? optionsArg.iterations : _defaultOptions.iterations,
            direction: optionsArg && 'direction' in optionsArg ? optionsArg.direction : _defaultOptions.direction,
            fill: optionsArg && 'fill' in optionsArg ? optionsArg.fill : _defaultOptions.fill,
            id: optionsArg && 'id' in optionsArg ? optionsArg.id : _UUID()
        },
            hasUserId = optionsArg && 'id' in optionsArg ? true : false,
            nodeList = animatejs._select(selector),
            players = [];
            
        nodeList.forEach(function (node, index) {
            var player = node.animate(keyframes, options);
            if (hasUserId) {
                player.id = options.id + '-' + index;
            } else {
                player.id = _UUID();
            }
            players.push(player);
        });
        return players;
    };

})(window.animatejs = window.animatejs || {});

/*
var player = document.getElementById('toAnimate').animate([
    { transform: 'scale(1)', opacity: 1, offset: 0 },
    { transform: 'scale(.5)', opacity: .5, offset: .3 },
    { transform: 'scale(.667)', opacity: .667, offset: .7875 },
    { transform: 'scale(.6)', opacity: .6, offset: 1 }
  ], {
    duration: 700, //milliseconds
    easing: 'ease-in-out', //'linear', a bezier curve, etc.
    delay: 10, //milliseconds
    iterations: Infinity, //or a number
    direction: 'alternate', //'normal', 'reverse', etc.
    fill: 'forwards' //'backwards', 'both', 'none', 'auto'
  });

*/
