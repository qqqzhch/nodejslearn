
      // Test all the things!
      feature.testAll();

      // For Each
      function forEach(array, callback, context) {
        var length = array.length;
        var cont, i;

        for (i = 0; i < length; i++) {
          cont = callback.call(context, i, array[i]);
          if (cont === false) {
            break; // Allow early exit
          }
        }
      }

      // Fire event
      function fireEvent(el, etype) {
        if (el.dispatchEvent) {
          var evObj = document.createEvent("Events");
          evObj.initEvent(etype, true, false);
          el.dispatchEvent(evObj);
        } else if (el.fireEvent) {
          el.fireEvent("on" + etype);
        }
      }

  function browser_userAgent () {
    var results = document.getElementById("browser_userAgent");
    results.innerHTML+=window.navigator.userAgent
  }
      // Logger
      function log(support, value) {
        var results = document.getElementById("results");
        results.innerHTML += "<li class='" + (support ? "yes" : "no") + "'>" + value + " " + (support ? "" : "not") + " supported </li>";
      }

      // Feature tests
      log(feature.css3Dtransform, "CSS 3D transforms");
      log(feature.cssTransform, "CSS transforms");
      log(feature.cssTransition, "CSS transitions");
      log(feature.contextMenu, "Context Menu");
      log(feature.addEventListener, "AddEventListener");
      log(feature.querySelectorAll, "QuerySelectorAll");
      log(feature.matchMedia, "MatchMedia");
      log(feature.async, "Async attribute");
      log(feature.defer, "Defer attribute");
      log(feature.deviceMotion, "DeviceMotion");
      log(feature.deviceOrientation, "DeviceOrientation");
      log(feature.classList, "ClassList API");
      log(feature.placeholder, "Placeholders");
      log(feature.localStorage, "LocalStorage");
      log(feature.historyAPI, "History API");
      log(feature.serviceWorker, "serviceWorkers");
      log(feature.viewportUnit, "Viewport Units");
      log(feature.remUnit, "REM Units");
      log(feature.geolocation, "Geolocation");
      log(feature.srcset, "Srcset attribute");
      log(feature.sizes, "Sizes attribute");
      log(feature.pictureElement, "Picture element");
      log(feature.canvas, "Canvas");
      log(feature.svg, "SVG");
      log(feature.webGL, "WebGL");
      log(feature.cors, "CORS");
      log(feature.touch, "Touch");
      browser_userAgent();

      // 3D Transforms
      if (feature.css3Dtransform) {
        var needs3Dtransform = document.getElementById("css3dtransform");
        needs3Dtransform.className += " active";
      }

      // 2D Transforms
      if (feature.cssTransform) {
        var needsTransform = document.getElementById("csstransform");
        needsTransform.className += " active";
      }

      // Transitions
      try {
        var needsTransitions = document.querySelectorAll(".transition");
        forEach(needsTransitions, function(i) {
          needsTransitions[i].addEventListener("click", function(event) {
            event.preventDefault();
            this.className += " active";
          }, false);
        });
      } catch(err) {}

      // AddEventListener
      try {
        var needsListener = document.getElementById("addeventlistener");
        window.addEventListener("load", function(event) {
          event.preventDefault();
          needsListener.className += " active";
        }, false);
      } catch(err) {}

      // QuerySelectorAll
      try {
        var needsQuerySelector = document.querySelectorAll(".test.queryselectorall");
        forEach(needsQuerySelector, function(i) {
          needsQuerySelector[i].className += " active";
        });
      } catch(err) {}

      // Matchmedia
      try {
        var needsMatchMedia = document.getElementById("matchmedia");
        if (window.matchMedia("(min-width: 1px)").matches) {
          needsMatchMedia.className += " active";
        }
      } catch(err) {}

      // ClassList API
      try {
        var needsClassList = document.getElementById("classlist");
        needsClassList.classList.add("active");
      } catch(err) {}

      // LocalStorage
      try {
        var needsLocalStorage = document.getElementById("localstorage");
        var test = "active";
        localStorage.setItem(test, test);
        needsLocalStorage.className += " " + localStorage.getItem(test);
        localStorage.removeItem(test);
      } catch(err) {}

      // Viewport Units
      try {
        var needsViewportUnits = document.getElementById("viewportunits");
        needsViewportUnits.style.width = "50vw";
        if (feature.viewportUnit) {
          needsViewportUnits.className += " active";
        }
      } catch(err) {}

      // REM Units
      try {
        var needsREMUnits = document.getElementById("remunits");
        needsREMUnits.style.width = "10rem";
        if (feature.remUnit) {
          needsREMUnits.className += " active";
        }
      } catch(err) {}

      // Touch
      try {
        var needsTouch = document.getElementById("touch");
        needsTouch.addEventListener("touchstart", function() {
          this.className += " active";
        },false);
        needsTouch.addEventListener("MSPointerDown", function() {
          this.className += " active";
        },false);
        needsTouch.addEventListener("gesturestart", function() {
          this.className += " active";
        },false);
      } catch(err) {}

      // Canvas
      try {
        var needCanvas = document.getElementById("canvas");
        var ctx = needCanvas.getContext("2d");
        ctx.fillStyle = "green";
        ctx.fillRect(0,0,120,120);
      } catch(err) {}

      // WebGL
      try {
        var gl;
        function initWebGL(canvas) {
          gl = null;
          try {
            gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
          } catch(e) {}
          return gl;
        }
        var needsWebGL = document.getElementById("webgl");
        if (needsWebGL.getContext) {
          gl = initWebGL(needsWebGL);
          if (gl) {
            gl.clearColor(0.0, 255, 0.0, 1.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
          }
        }
      } catch(err) {}

      // Geolocation
      try {
        var needsGeolocation = document.getElementById("geolocation");
        navigator.geolocation.getCurrentPosition(function(pos) {
          needsGeolocation.innerHTML = pos.coords.latitude + " " + pos.coords.longitude;
        });
        if (feature.geolocation) {
          needsGeolocation.className += " active";
        }
      } catch(err) {}

      // Placeholder
      try {
        var needsPlaceholder = document.getElementById("placeholder");
        if ("placeholder" in document.createElement("input")) {
          needsPlaceholder.className += " active";
        }
      } catch(err) {}

      // Cors
      function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
          xhr.open(method, url, true);
        } else {
          xhr = null;
        }
        return xhr;
      }
      var xhr = createCORSRequest("GET", "http://featurejs.com");
      if (xhr) {
        var needsCors = document.getElementById("cors");
        needsCors.className += " active";
      }

      // Device motion
      try {
        if ("DeviceMotionEvent" in window) {
          var needsMotion = document.getElementById("motion");
          window.addEventListener("devicemotion", function() {
            needsMotion.className += " active";
          }, false);
          fireEvent(window, "devicemotion");
        }
      } catch(err) {}

      // Device orientation
      try {
        if ("DeviceOrientationEvent" in window) {
          var needsOrientation = document.getElementById("orientation");
          window.addEventListener("deviceorientation", function() {
            needsOrientation.className += " active";
          }, false);
          fireEvent(window, "deviceorientation");
        }
      } catch(err) {}

      // Context menu
      if (feature.contextMenu) {
        var needsContextMenu = document.getElementById("context");
        needsContextMenu.className += " active";
      }