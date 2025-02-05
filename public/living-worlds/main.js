// Color Cycling in HTML5 Canvas
// BlendShift Technology conceived, designed and coded by Joseph Huckaby
// Copyright (c) 2010 - 2024 Joseph Huckaby and PixlCore.
// MIT Licensed: https://github.com/jhuckaby/canvascycle/blob/main/LICENSE.md

FrameCount.visible = false

var CanvasCycle = {
  cookie: new CookieTree(),
  ctx: null,
  imageData: null,
  clock: 0,
  inGame: false,
  bmp: null,
  globalTimeStart: new Date().getTime(),
  inited: false,
  optTween: null,
  winSize: null,
  globalBrightness: 1.0,
  lastBrightness: 0,
  sceneIdx: -1,
  highlightColor: -1,
  defaultMaxVolume: 0.5,

  settings: {
    showOptions: false,
    targetFPS: 240,
    blendShiftEnabled: true,
    speedAdjust: 1.0,
  },

  contentSize: {
    width: 640,
    optionsWidth: 0,
    height: 480 + 40,
    scale: 1.0
  },

  init: function () {
    // called when DOM is ready
    if (!this.inited) {
      this.inited = true

      FrameCount.init()

      for (var idx = 0, len = 256; idx < len; idx++) {
        var div = document.createElement('div')
        div._idx = idx
        div.id = 'pal_' + idx
        div.className = 'palette_color'
        div.onmouseover = function () {
          CanvasCycle.highlightColor = this._idx
        }
        div.onmouseout = function () {
          CanvasCycle.highlightColor = -1
        }
      }

      // pick starting scene
      // var initialSceneIdx = Math.floor( Math.random() * scenes.length );
      var initialSceneIdx = Math.floor(Math.random() * scenes.length)

      // read prefs from cookie
      var prefs = this.cookie.get('settings')
      if (prefs) {
        this.setRate(240)
        this.setSpeed(prefs.speedAdjust)
        this.setBlendShift(prefs.blendShiftEnabled)
      }

      this.loadImage(scenes[initialSceneIdx].name)
      this.sceneIdx = initialSceneIdx

      setInterval(() => {
        this.randomScene()
      }, 120000);
    }
  },

  switchScene: function (sceneIdx) {
    var name = scenes[sceneIdx].name

    TweenManager.removeAll({ category: 'scenefade' })
    TweenManager.tween({
      target: { value: this.globalBrightness, newSceneName: name },
      duration: 15,
      mode: 'EaseInOut',
      algo: 'Quadratic',
      props: { value: 0.0 },
      onTweenUpdate: function (tween) {
        CanvasCycle.globalBrightness = tween.target.value
      },
      onTweenComplete: function (tween) {
        CanvasCycle.loadImage(tween.target.newSceneName)
      },
      category: 'scenefade'
    })
  },

  loadImage: async function (name) {
    // load image JSON from the server
    this.stop()

    var payload = await fetch(`./images/${name}`)
    var payloadJSON = await payload.json()
    CanvasCycle.processImage(payloadJSON)
  },

  processImage: function (img) {
    // initialize, receive image data from server
    this.bmp = new Bitmap(img)
    this.bmp.optimize()

    var canvas = $('mycanvas')
    if (!canvas.getContext) return // no canvas support

    if (!this.ctx) this.ctx = canvas.getContext('2d')
    this.ctx.clearRect(0, 0, this.bmp.width, this.bmp.height)
    this.ctx.fillStyle = 'rgb(0,0,0)'
    this.ctx.fillRect(0, 0, this.bmp.width, this.bmp.height)

    if (!this.imageData) {
      if (this.ctx.createImageData) {
        this.imageData = this.ctx.createImageData(
          this.bmp.width,
          this.bmp.height
        )
      } else if (this.ctx.getImageData) {
        this.imageData = this.ctx.getImageData(
          0,
          0,
          this.bmp.width,
          this.bmp.height
        )
      } else return // no canvas data support
    }

    if (ua.mobile) {
      // no transition on mobile devices
      this.globalBrightness = 1.0
    } else {
      this.globalBrightness = 0.0
      TweenManager.removeAll({ category: 'scenefade' })
      TweenManager.tween({
        target: { value: 0 },
        duration: 50,
        mode: 'EaseInOut',
        algo: 'Quadratic',
        props: { value: 1.0 },
        onTweenUpdate: function (tween) {
          CanvasCycle.globalBrightness = tween.target.value
        },
        category: 'scenefade'
      })
    }

    this.run()
  },

  run: function () {
    // start main loop
    if (!this.inGame) {
      this.inGame = true
      this.animate()
    }
  },

  stop: function () {
    // stop main loop
    this.inGame = false
  },

  animate: function () {
    // animate one frame. and schedule next
    if (this.inGame) {
      var colors = this.bmp.palette.colors

      if (this.settings.showOptions) {
        for (var idx = 0, len = colors.length; idx < len; idx++) {
          var clr = colors[idx]
        }
      }

      this.bmp.palette.cycle(
        this.bmp.palette.baseColors,
        GetTickCount(),
        this.settings.speedAdjust,
        this.settings.blendShiftEnabled
      )
      if (this.highlightColor > -1) {
        this.bmp.palette.colors[this.highlightColor] = new Color(255, 255, 255)
      }
      if (this.globalBrightness < 1.0) {
        // bmp.palette.fadeToColor( pureBlack, 1.0 - globalBrightness, 1.0 );
        this.bmp.palette.burnOut(1.0 - this.globalBrightness, 1.0)
      }
      this.bmp.render(
        this.imageData,
        this.lastBrightness == this.globalBrightness &&
          this.highlightColor == this.lastHighlightColor
      )
      this.lastBrightness = this.globalBrightness
      this.lastHighlightColor = this.highlightColor

      this.ctx.putImageData(this.imageData, 0, 0)

      TweenManager.logic(this.clock)
      this.clock++
      FrameCount.count()
      this.scaleAnimate()
      if (this.inGame)
        requestAnimationFrame(function () {
          CanvasCycle.animate()
        })
    }
  },

  scaleAnimate: function () {
    // scale back down to native
    if (this.contentSize.scale > 1.0) {
      this.contentSize.scale += (1.0 - this.contentSize.scale) / 8
      if (this.contentSize.scale < 1.001) this.contentSize.scale = 1.0 // close enough

      var sty = $('mycanvas').style

      if (ua.webkit)
        sty.webkitTransform =
          'translate3d(0px, 0px, 0px) scale(' + this.contentSize.scale + ')'
      else if (ua.ff)
        sty.MozTransform = 'scale(' + this.contentSize.scale + ')'
      else if (ua.op) sty.OTransform = 'scale(' + this.contentSize.scale + ')'
      else sty.transform = 'scale(' + this.contentSize.scale + ')'

      sty.marginRight =
        '' +
        Math.floor(
          this.contentSize.width * this.contentSize.scale -
            this.contentSize.width
        ) +
        'px'
      $('d_header').style.width =
        '' +
        Math.floor(this.contentSize.width * this.contentSize.scale) +
        'px'
    }
  },

  saveSettings: function () {
    // save settings in cookie
    this.cookie.set('settings', this.settings)
    this.cookie.save()
  },

  toggleOptions: function () {
    var startValue, endValue
    TweenManager.removeAll({ category: 'options' })

    if (!this.settings.showOptions) {
      startValue = 0
      if (this.optTween) startValue = this.optTween.target.value
      endValue = 1.0
    } else {
      startValue = 1.0
      if (this.optTween) startValue = this.optTween.target.value
      endValue = 0
    }

    this.optTween = TweenManager.tween({
      target: { value: startValue },
      duration: Math.floor(this.settings.targetFPS / 3),
      mode: 'EaseOut',
      algo: 'Quadratic',
      props: { value: endValue },
      onTweenUpdate: function (tween) {
        CanvasCycle.contentSize.optionsWidth = Math.floor(
          tween.target.value * 150
        )
      },
      onTweenComplete: function (tween) {
        CanvasCycle.optTween = null
      },
      category: 'options'
    })

    this.settings.showOptions = !this.settings.showOptions
    this.saveSettings()
  },

  setRate: function (rate) {
    /* $('btn_rate_30').setClass('selected', rate == 30);
		$('btn_rate_60').setClass('selected', rate == 60);
		$('btn_rate_90').setClass('selected', rate == 90); */
    this.settings.targetFPS = rate
    this.saveSettings()
  },

  setSpeed: function (speed) {
    this.settings.speedAdjust = speed
    this.saveSettings()
  },

  setBlendShift: function (enabled) {
    this.settings.blendShiftEnabled = enabled
    this.saveSettings()
  },

  randomScene: function () {
    var randomSceneIdx = Math.floor(Math.random() * scenes.length)
    this.sceneIdx = randomSceneIdx
    this.switchScene(randomSceneIdx)
  }
}

var CC = CanvasCycle // shortcut
