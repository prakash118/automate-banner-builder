"use strict";
function checkDCEnabler() {
    Enabler.isInitialized() ? enablerInitHandler() : Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler)
}
function enablerInitHandler() {
    document.getElementById("bg-exit").addEventListener("click", bgExitHandler, !1), init()
}
function bgExitHandler() {
    Enabler.exit("clickThrough", clickTag)
}
function init() {
    TweenMax.to(document.getElementById("covering-div"), 1, {alpha: 0}),
    TweenMax.to(document.getElementById("bg"), 0, {alpha: 0}),
    TweenMax.to(document.getElementById("rolloverCTA"), 0, {alpha: 0}),
    bg();
}
function bg() {
    TweenMax.to(document.getElementById("covering-div"), 0, {alpha: 0}),
    TweenMax.to(document.getElementById("bg"), 0, {alpha:1 ,ease: Power3.easeOut});
}

var Enabler;
window.onload = init;
var timeToFadeOn = 1.25, timeToFadeOff = 1, delayBetweenFades = .5, loopCounter = 0, logoOnStart=!0;
