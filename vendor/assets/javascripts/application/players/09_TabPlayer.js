
function checkWebAudioSupport() {
    var c = 0;
    try {
        if (window.ultimateAudioContext) {} else {
            var a = window.AudioContext || window.webkitAudioContext;
            window.ultimateAudioContext = new a();
            c = 1
        }
    } catch (b) {
    }
    console.log(c)
    return c

}

function LagDetectorNode(b, f, e, d, a) {
    var c = f.createScriptProcessor(e, d, a);
    c.owner = b;
    c.onaudioprocess = function(g) {
        c.owner.tickMoveTimeOut();
        if (c.owner.on) {
            var h = g.playbackTime - f.currentTime
        }
    };
    return c
}
var needMixAnotherTick = false;

function UltimateSoundTools(a) {
    this.on = false;
    this.currentTick = {
        bar: 0,
        step32: 0,
        position: null,
        beat: 0,
        audioContextCurrentTime: 0
    };
    this.mainVolume = 0.222;
    this.metronomeActivity = false;
    this.alarmCounter = 0;
    this.mainOutput = null;
    this.mainInput = null;
    this.echo = null;
    this.compressor = null;
    this.noise = null;
    this.equalizer = null;
    this.lagDetector = null;
    this.weakMode = false;
    if (a) {
        this.weakMode = true
    }
    if (window.ultimateWavesCache) {} else {
        window.ultimateWavesCache = []
    }
    this.initFilters();
    return this
}
window.aRequestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
        window.setTimeout(a, 1000 / 60)
    }
})();
UltimateSoundTools.prototype.timeAhead = 2;
UltimateSoundTools.prototype.instrumentCache = [];
UltimateSoundTools.prototype.channels = [];
UltimateSoundTools.prototype.tickLock = false;
UltimateSoundTools.prototype.waitLoadWaves = true;
UltimateSoundTools.prototype.soundFontPath = "/sounds/";
UltimateSoundTools.prototype.audioContext = function(a) {
    if (window.ultimateAudioContext) {} else {
        var b = window.AudioContext || window.webkitAudioContext;
        window.ultimateAudioContext = new b()
    }
    return window.ultimateAudioContext
};
UltimateSoundTools.prototype.createShapeFloat32Array1 = function(c) {
    var a = 44100;
    var e = new Float32Array(a);
    for (var b = 0; b < a; ++b) {
        var d = b * 2 / a - 1;
        e[b] = (3 + c) * d * 20 * (Math.PI / 180) / (Math.PI + c * Math.abs(d))
    }
    return e
};
UltimateSoundTools.prototype.createShapeFloat32Array2 = function() {
    return new Float32Array([-0.5, 0, 1])
};
UltimateSoundTools.prototype.createShapeFloat32Array3 = function(e, c) {
    var f = new Float32Array(c);
    if ((e >= 0) && (e < 1)) {
        var g = e;
        var b = 2 * g / (1 - g);
        for (var d = 0; d < c; d += 1) {
            var a = (d - 0) * (1 - (-1)) / (c - 0) + (-1);
            f[d] = (1 + b) * a / (1 + b * Math.abs(a))
        }
    }
    return f
};
UltimateSoundTools.prototype.createDistortionNode = function() {
    var a = {};
    a.input = this.audioContext().createGain();
    a.shaper = this.audioContext().createWaveShaper();
    a.shaper.curve = this.createShapeFloat32Array1(400);
    a.shaper.oversample = "none";
    a.biquad = this.audioContext().createBiquadFilter();
    a.biquad.type = "lowpass";
    a.biquad.frequency.value = 3000;
    a.output = this.audioContext().createGain();
    a.input.connect(a.shaper);
    a.shaper.connect(a.biquad);
    a.biquad.connect(a.output);
    a.unchain = function() {
    };
    return a
};
UltimateSoundTools.prototype.createEchoNode = function() {
    var a = {};
    a._passthrough = this.audioContext().createGain();
    a.setRatio = function(b) {};
    a.setBuffer = function(b) {};
    a.unlink = function() {
        a._passthrough.disconnect()
    };
    a.input = function(b) {
        b.connect(a._passthrough)
    };
    a.output = function(b) {
        a._passthrough.connect(b)
    };
    return a
};
UltimateSoundTools.prototype.createCompressorNode = function() {
    var a = {};
    a.on = false;
    a.compressor = this.audioContext().createDynamicsCompressor();
    a.input = this.audioContext().createGain();
    a.output = this.audioContext().createGain();
    a.input.connect(a.output);
    a.unchain = function() {
        a.input.disconnect();
        a.input = null;
        if (a.compressor) {
            a.compressor.disconnect();
            a.compressor = null
        }
        a.output.disconnect();
        a.output = null
    };
    a.setup = function(g, c, f, d, e, b) {
        if (!isNaN(1 * c)) {
            a.compressor.threshold.value = c
        }
        if (!isNaN(1 * f)) {
            a.compressor.knee.value = f
        }
        if (!isNaN(1 * d)) {
            a.compressor.ratio.value = d
        }
        if (!isNaN(1 * e)) {
            a.compressor.attack.value = e
        }
        if (!isNaN(1 * b)) {
            a.compressor.release.value = b
        }
        if (g) {
            a.on = true;
            if (a.compressor) {} else {
                a.compressor = this.audioContext().createDynamicsCompressor()
            }
            a.input.disconnect();
            a.input.connect(a.compressor);
            a.compressor.connect(a.output)
        } else {
            a.on = false;
            a.input.disconnect();
            a.input.connect(a.output)
        }
    };
    return a
};
UltimateSoundTools.prototype.createEqualizerNode = function() {
    var a = {};
    a.eq65 = this.bandEqualizer(65, 1);
    a.eq125 = this.bandEqualizer(125, 1);
    a.eq250 = this.bandEqualizer(250, 1);
    a.eq500 = this.bandEqualizer(500, 1);
    a.eq1000 = this.bandEqualizer(1000, 1);
    a.eq2000 = this.bandEqualizer(2000, 1);
    a.eq4000 = this.bandEqualizer(4000, 1);
    a.eq6000 = this.bandEqualizer(6000, 1);
    a.eq8000 = this.bandEqualizer(8000, 1);
    a.eq12000 = this.bandEqualizer(12000, 1);
    a.eq65.connect(a.eq125);
    a.eq125.connect(a.eq250);
    a.eq250.connect(a.eq500);
    a.eq500.connect(a.eq1000);
    a.eq1000.connect(a.eq2000);
    a.eq2000.connect(a.eq4000);
    a.eq4000.connect(a.eq6000);
    a.eq6000.connect(a.eq8000);
    a.eq8000.connect(a.eq12000);
    a.cleanup = function() {
        a.eq65.disconnect();
        a.eq65 = null;
        a.eq125.disconnect();
        a.eq125 = null;
        a.eq500.disconnect();
        a.eq500 = null;
        a.eq1000.disconnect();
        a.eq1000 = null;
        a.eq2000.disconnect();
        a.eq2000 = null;
        a.eq4000.disconnect();
        a.eq4000 = null;
        a.eq6000.disconnect();
        a.eq6000 = null;
        a.eq8000.disconnect();
        a.eq8000 = null;
        a.eq12000.disconnect();
        a.eq12000 = null
    };
    return a
};
UltimateSoundTools.prototype.__reInitWeakFilters = function() {
    try {
        this.mainOutput.disconnect();
        this.mainOutput = null;
        this.convolver.unlink();
        this.convolver = null;
        this.convolverGain.disconnect();
        this.convolverGain = null;
        this.mainInput.disconnect();
        this.mainInput = null;
        this.currentEqualizer = null;
        if (this.compressor) {
            this.compressor.unchain();
            this.compressor = null;
        }
    } catch (a) {
    }
    this.initFilters();
    this.resetChannels()
};
UltimateSoundTools.prototype.findPresetConfiguration = function(c) {
    var b = {
        midi: c
    };
    for (var a = 0; a < ultimatePresets.length; a++) {
        if (ultimatePresets[a].midi == c) {
            b = ultimatePresets[a];
            break
        }
    }
    return b
};
UltimateSoundTools.prototype.save2localStorage = function(a, b) {
    localStorage.setItem(a, JSON.stringify(b))
};
UltimateSoundTools.prototype.readFromlocalStorage = function(a) {
    var c = null;
    try {
        c = JSON.parse(localStorage.getItem(a))
    } catch (b) {
        console.lof(b)
    }
    return c
};
UltimateSoundTools.prototype.setEqualizerParameters = function(a) {
    this.currentEqualizer.volume = a.volume;
    this.currentEqualizer.noise = a.noise;
    this.currentEqualizer.F65 = a.F65;
    this.currentEqualizer.F125 = a.F125;
    this.currentEqualizer.F250 = a.F250;
    this.currentEqualizer.F500 = a.F500;
    this.currentEqualizer.F1000 = a.F1000;
    this.currentEqualizer.F2000 = a.F2000;
    this.currentEqualizer.F4000 = a.F4000;
    this.currentEqualizer.F6000 = a.F6000;
    this.currentEqualizer.F8000 = a.F8000;
    this.currentEqualizer.F12000 = a.F12000
};
UltimateSoundTools.prototype.getEqualizerParameters = function() {
    var a = {};
    a.volume = this.currentEqualizer.volume;
    a.noise = this.currentEqualizer.noise;
    a.F65 = this.currentEqualizer.F65;
    a.F125 = this.currentEqualizer.F125;
    a.F250 = this.currentEqualizer.F250;
    a.F500 = this.currentEqualizer.F500;
    a.F1000 = this.currentEqualizer.F1000;
    a.F2000 = this.currentEqualizer.F2000;
    a.F4000 = this.currentEqualizer.F4000;
    a.F6000 = this.currentEqualizer.F6000;
    a.F8000 = this.currentEqualizer.F8000;
    a.F12000 = this.currentEqualizer.F12000;
    return a
};
UltimateSoundTools.prototype.resetEqualizerParameters = function() {
    this.currentEqualizer = this.findPresetConfiguration(2000)
};
UltimateSoundTools.prototype.changeEqualizerParameters = function() {
    if (this.echo) {
        this.echo.setRatio(this.currentEqualizer.volume);
        if (this.currentEqualizer.noise) {
            this.noise.frequency.value = this.currentEqualizer.noise
        } else {
            this.currentEqualizer.noise = 24000;
            this.noise.frequency.value = this.currentEqualizer.noise
        }
    }
    if (this.equalizer) {
        this.equalizer.eq65.gain.value = this.currentEqualizer.F65;
        this.equalizer.eq125.gain.value = this.currentEqualizer.F125;
        this.equalizer.eq250.gain.value = this.currentEqualizer.F250;
        this.equalizer.eq500.gain.value = this.currentEqualizer.F500;
        this.equalizer.eq1000.gain.value = this.currentEqualizer.F1000;
        this.equalizer.eq2000.gain.value = this.currentEqualizer.F2000;
        this.equalizer.eq4000.gain.value = this.currentEqualizer.F4000;
        this.equalizer.eq6000.gain.value = this.currentEqualizer.F6000;
        this.equalizer.eq8000.gain.value = this.currentEqualizer.F8000;
        this.equalizer.eq12000.gain.value = this.currentEqualizer.F12000
    }
};
UltimateSoundTools.prototype.bandEqualizer = function(c, b) {
    var a = this.audioContext().createBiquadFilter();
    a.frequency.value = c;
    a.type = "peaking";
    a.gain.value = 0;
    a.Q.value = b;
    return a
};
UltimateSoundTools.prototype.createNoiseNode = function() {
    var a = this.audioContext().createBiquadFilter();
    a.type = "lowpass";
    a.gain.value = 24000;
    return a
};
UltimateSoundTools.prototype.initFilters = function() {
    this.lagDetector = new LagDetectorNode(this, this.audioContext(), 16 * 1024, 1, 1);
    this.mainInput = this.audioContext().createGain();
    this.mainOutput = this.audioContext().createGain();
    this.currentEqualizer = null;
    if (this.currentEqualizer) {} else {
        this.resetEqualizerParameters()
    }
    this.mainInput.connect(this.mainOutput);
    this.mainInput.connect(this.lagDetector);
    this.lagDetector.connect(this.mainOutput);
    if (this.weakMode) {
        this.mainOutput.connect(this.audioContext().destination)
    } else {
        this.equalizer = this.createEqualizerNode();
        this.compressor = this.createCompressorNode();
        this.echo = this.createEchoNode();
        this.noise = this.createNoiseNode();
        this.compressor.setup(this.takeInstrument(2000, true).samples[0].compressor, this.takeInstrument(2000, true).samples[0].threshold, this.takeInstrument(2000, true).samples[0].knee, this.takeInstrument(2000, true).samples[0].ratio, this.takeInstrument(2000, true).samples[0].attack, this.takeInstrument(2000, true).samples[0].release);
        this.mainOutput.connect(this.noise);
        this.noise.connect(this.equalizer.eq65);
        this.equalizer.eq12000.connect(this.compressor.input);
        this.echo.input(this.compressor.output);
        this.echo.output(this.audioContext().destination)
    }
    this.mainOutput.gain.setValueAtTime(this.mainVolume, this.audioContext().currentTime);
    this.changeEqualizerParameters()
};
UltimateSoundTools.prototype.calculateMeter = function(a, c) {
    var b = a;
    if (c > 0) {
        b = c
    }
    return b
};
UltimateSoundTools.prototype.calculate32duration = function(g, b) {
    var a = g.tempo;
    var f = g.subtempo;
    var d = 120;
    if (b) {
        d = b.tempo
    }
    var e = 60 / 8;
    var c = e / (a * f);
    if (d > 0) {
        c = e / (d * f)
    }
    return c
};
UltimateSoundTools.prototype.checkEnvelopes = function() {
    for (var a = 0; a < this.channels.length; a++) {
        this.channels[a].checkEnvelopes()
    }
};
UltimateSoundTools.prototype.sendCurrentStep = function() {
    if (this.currentTick.position) {
        if (this.on) {
            this.sendMetronome()
        }
        var o = this.calculate32duration(this.song, this.currentTick.position);
        for (var x = 1; x < this.channels.length; x++) {
            var b = this.channels[x];
            for (var m = 0; m < this.currentTick.position.riffIds.length; m++) {
                var s = 1 * this.currentTick.position.riffIds[m];
                var e = this.findChannelRiffById(b, s);
                if (e) {
                    if (b.link.midi < 0) {
                        var q = e.beat[this.currentTick.step32];
                        if (q != null) {
                            for (var v = 0; v < q.length; v++) {
                                var u = q[v];
                                var y = this.findSampleById(u.sampleId);
                                var k = this.takeInstrument(y.midi, true);
                                var j = u.velocity;
                                var f = this.currentTick.audioContextCurrentTime;
                                if (u.timeCorrection) {
                                    f = f + u.timeCorrection * o
                                }
                                b.hit(k, f, j, this.currentTick.position.left, this.currentTick.step32)
                            }
                        }
                    } else {
                        for (var l = 0; l < e.tunes.length; l++) {
                            var p = e.tunes[l];
                            var q = p.steps[this.currentTick.step32];
                            if (q != null) {
                                for (var v = 0; v < q.length; v++) {
                                    var d = q[v];
                                    var y = this.findSampleById(p.sampleId);
                                    var c = this.takeInstrument(y.midi, false);
                                    var j = d.velocity;
                                    var f = this.currentTick.audioContextCurrentTime;
                                    var a = d.length * o;
                                    var g = d.pitch;
                                    var n = false;
                                    if (d.fadeIn) {
                                        n = true
                                    }
                                    if (d.timeCorrection) {
                                        f = f + d.timeCorrection * o
                                    }
                                    if (d.strokeOrder) {
                                        f = f + 0.01 * d.strokeOrder;
                                        for (var w = 0; w < d.strokeOrder; w++) {
                                            j = 0.9 * j
                                        }
                                    }
                                    b.strum(c, f, a, j, g, n, d.bends, d.trillSize, d.vibrato, d.slideTo, d.beatEffectTremoloPickingDurationValue, d.length, d.palmMute, d.harmonic, d.slapping, d.popping, d.deadNote, this.currentTick.position.left, this.currentTick.step32)
                                }
                            }
                        }
                    }
                }
            }
        }
        this.checkBeatCallback()
    }
};
UltimateSoundTools.prototype.checkBeatCallback = function() {
    var h = this.currentTick.step32 * 120 + this.currentTick.position.start;
    var e = (this.currentTick.step32 + 1) * 120 + this.currentTick.position.start;
    for (var c = 1; c < this.channels.length; c++) {
        var d = this.channels[c];
        var g = d.link.riffs[this.currentTick.position.number - 1];
        for (var a = 0; a < g.measure.beats.length; a++) {
            var f = g.measure.beats[a];
            if (f.start >= h && f.start < e) {
                this.currentTick.beat = f;
                var b = {
                    position: this.currentTick.position,
                    beat: a,
                    step32: this.currentTick.step32,
                    audioContextCurrentTime: this.currentTick.audioContextCurrentTime,
                    channel: c
                };
                this.callbackQueue.push(b)
            }
        }
    }
};
UltimateSoundTools.prototype.findSampleById = function(b) {
    for (var a = 0; a < this.song.samples.length; a++) {
        if (this.song.samples[a].id == b) {
            return this.song.samples[a]
        }
    }
    return null
};
UltimateSoundTools.prototype.findChannelRiffById = function(b, c) {
    for (var a = 0; a < b.link.riffs.length; a++) {
        if (b.link.riffs[a].id == c) {
            return b.link.riffs[a]
        }
    }
    return null
};
UltimateSoundTools.prototype.sendMetronome = function() {
    var c = this.currentTick.position.measureHeader.timeSignature.numerator;
    var d = this.currentTick.position.measureHeader.timeSignature.denominator.value;
    var a = this.currentTick.step32 / (32 / d);
    if (this.currentTick.step32 == 0 || a == Math.floor(a)) {
        var b = this.takeInstrument(10000, true);
        this.channels[0].hit(b, this.currentTick.audioContextCurrentTime, 127, 0, 0)
    }
};
UltimateSoundTools.prototype.dumpEnvelopes = function() {
    var h = 0;
    var b = 0;
    var f = 0;
    var g = "";
    for (var j = 0; j < this.channels.length; j++) {
        var e = 0;
        var a = 0;
        for (var d = 0; d < this.channels[j].envelopes.length; d++) {
            if (this.channels[j].envelopes[d].free) {
                e++
            } else {
                a++
            }
        }
        g = g + " " + j + ":" + +e + "/" + this.channels[j].envelopes.length;
        f = f + this.channels[j].envelopes.length;
        h = h + e;
        b = b + a
    }
};
UltimateSoundTools.prototype.probeWeakMode = function() {
    if (this.lagDetector) {
        if (this.lagDetector.currentRatio < 0.6) {
            this.alarmCounter++;
            if (this.alarmCounter > 16) {
                window.weakModeForUltimateSoundTools = true;
                this.weakMode = true;
                this.reInitWeakFilters()
            }
        } else {
            if (this.alarmCounter > 0) {}
            this.alarmCounter = 0
        }
    }
};
UltimateSoundTools.prototype.moveTicker = function() {
    if (this.currentTick.audioContextCurrentTime < this.audioContext().currentTime) {
        this.currentTick.audioContextCurrentTime = this.audioContext().currentTime
    }
    this.sendCurrentStep();
    if (this.currentTick.position) {
        var a = this.calculate32duration(this.song, this.currentTick.position);
        this.currentTick.audioContextCurrentTime = this.currentTick.audioContextCurrentTime + a;
        var b = this.calculateMeter(this.song.meter, this.currentTick.position.length);
        if (this.currentTick.step32 + 1 >= b) {
            this.currentTick.step32 = 0;
            this.currentTick.beat = -1;
            this.currentTick.position = this.findPosition(this.currentTick.position.left + 1);
            this.checkEnvelopes()
        } else {
            this.currentTick.step32 = this.currentTick.step32 + 1
        }
        if (this.loopStart) {
            if (this.loopEnd) {
                if (this.currentTick.position) {
                    if (this.currentTick.position.left == this.loopEnd.position.left) {
                        if (this.currentTick.step32 >= this.loopEnd.step32) {
                            this.currentTick.step32 = this.loopStart.step32;
                            this.currentTick.position = this.loopStart.position
                        }
                    } else {
                        if (this.currentTick.position.left == this.loopStart.position.left) {
                            if (this.currentTick.step32 < this.loopStart.step32) {
                                this.currentTick.step32 = this.loopStart.step32;
                                this.currentTick.position = this.loopStart.position
                            }
                        } else {
                            if (this.currentTick.position.left > this.loopEnd.position.left) {
                                this.currentTick.step32 = this.loopStart.step32;
                                this.currentTick.position = this.loopStart.position
                            } else {
                                if (this.currentTick.position.left < this.loopStart.position.left) {
                                    this.currentTick.step32 = this.loopStart.step32;
                                    this.currentTick.position = this.loopStart.position
                                }
                            }
                        }
                    }
                } else {
                    this.currentTick.step32 = this.loopStart.step32;
                    this.currentTick.position = this.loopStart.position
                }
            }
        }
    } else {
        needMixAnotherTick = false
    }
};
UltimateSoundTools.prototype.sendPlayCallback = function() {
    for (var c = 0; c < this.callbackQueue.length; c++) {
        var b = this.callbackQueue[c];
        if (b) {
            if (this.audioContext().currentTime >= b.audioContextCurrentTime) {
                if (this.monitorChannel == b.channel) {
                    if (this.playCallback) {
                        var a = Math.round(this.calculateOffset(b.position.left, b.step32));
                        this.playCallback(b.position.number - 1, b.beat, a)
                    }
                }
            } else {
                break
            }
        } else {
            this.callbackQueue.length = c;
            return
        }
    }
    while (this.callbackQueue.length > 0) {
        var b = this.callbackQueue[0];
        if (b) {
            if (this.audioContext().currentTime >= b.audioContextCurrentTime) {
                this.callbackQueue.shift()
            } else {
                break
            }
        } else {
            return
        }
    }
};
UltimateSoundTools.prototype.calculateOffset = function(e, c) {
    var d = this.findPosition(e);
    var a = 0;
    for (var b = 0; b < e; b++) {
        d = this.findPosition(b);
        a = a + this.positionDuration(d)
    }
    a = a + (0.5 * 1000 * c * (60 / 4) / d.tempo) / this.song.subtempo;
    return a
};
UltimateSoundTools.prototype.clearQueue = function() {
    this.callbackQueue = [];
    this.cleanUpChannels()
};
UltimateSoundTools.prototype.tickMove = function() {
    this.tickMoveTimeOut(this)
};
UltimateSoundTools.prototype.tickMoveTimeOut = function() {
    var a = this;
    while (a.audioContext().currentTime + a.timeAhead > a.currentTick.audioContextCurrentTime && needMixAnotherTick) {
        a.moveTicker()
    }
};
UltimateSoundTools.prototype.tickCallBack = function() {
    this.tickCallBackTimeOut(this)
};
UltimateSoundTools.prototype.tickCallBackTimeOut = function() {
    var a = this;
    if (a.callbackQueue) {
        if (a.callbackQueue.length > 0) {
            a.sendPlayCallback();
            if (a.callbackQueue.length == 0) {
                if (needMixAnotherTick) {} else {
                    a.on = false;
                    a.notifyCallback({
                        stateCode: 4,
                        message: "tabPro.model.dto.NotesPlayerState.END_PLAY"
                    })
                }
            }
        }
    }
    aRequestAnimFrame(function() {
        a.tickCallBackTimeOut()
    })
};
UltimateSoundTools.prototype.setupMIDIChannels = function() {
    for (var a = 1; a < this.channels.length; a++) {
        this.channels[a].resetPresetProperies()
    }
};
UltimateSoundTools.prototype.resetChannels = function() {
    for (var b = 0; b < this.channels.length; b++) {
        this.channels[b].cleanUp();
        this.channels[b].unchain()
    }
    var a = this.channels;
    this.channels = [];
    this.count = this.song.channels.length;
    for (var b = 0; b < this.count; b++) {
        var d = new UltimateChannel(this, b);
        if (!isNaN(this.song.channels[b].pan)) {
            d.pan = this.song.channels[b].pan
        }
        if (this.song.channels[b].volume) {
            d.volume = this.song.channels[b].volume
        }
        if (a.length > b) {
            d.pitchShift = a[b].pitchShift;
            d.mute = a[b].mute;
            d.transposeShift = a[b].transposeShift
        } else {
            d.pitchShift = 0;
            d.mute = false;
            d.transposeShift = 0
        }
        d.link = this.song.channels[b];
        d.setup();
        this.channels.push(d)
    }
};
UltimateSoundTools.prototype.safeURL = function(a) {
    a = a.replace(/\s/g, "_");
    a = a.replace("&", "%26");
    a = a.replace("+", "%2B");
    a = a.replace("%", "%25");
    a = a.replace("#", "%23");
    return a
};
UltimateSoundTools.prototype.realPath = function(a) {
    return this.soundFontPath + a + ".wav"
};
UltimateSoundTools.prototype.readLENum = function(a, e, d) {
    var c = a[e];
    for (var b = e + 1; b < e + d; b++) {
        c = c + a[b] * 256
    }
    return c
};
UltimateSoundTools.prototype.loadArrayBuffer = function(a, d) {
    var b = this;
    var c = new XMLHttpRequest();
    c.responseType = "arraybuffer";
    c.open("GET", this.safeURL(a), true);
    c.onload = function() {
        if (c.readyState == 4) {
            var f = c.response;
            var e = new Uint8Array(f);
            var g = b.readLENum(e, 0 + 24, 2);
            d(f, g)
        } else {
        }
    };
    c.onerror = function(e) {
        d(null, 0)
    };
    c.send()
};
UltimateSoundTools.prototype.loadAudioBuffer = function(a, c) {
    var b = this;
    this.loadArrayBuffer(a, function(d, e) {
        b.audioContext().decodeAudioData(d, function(f) {
            c(f, e)
        }, function(f) {
            c(null, 0)
        })
    })
};
UltimateSoundTools.prototype.addWaveToCache = function(a, d) {
    for (var b = 0; b < window.ultimateWavesCache.length; b++) {
        var c = window.ultimateWavesCache[b];
        if (c.url == a) {
            if (c.audioBuffer) {
                d();
                return
            } else {
                this.loadAudioBuffer(a, function(e, f) {
                    c.audioBuffer = e;
                    c.waveSampleRate = f;
                    d()
                });
                return
            }
        }
    }
    window.ultimateWavesCache.push(new UltimateWave(a, null));
    this.addWaveToCache(a, d)
};
UltimateSoundTools.prototype.startFillWavesCache = function(d, c, e) {
    var b = this;
    if (d.length > 0) {
        var a = d.shift();
        this.notifyCallback({
            stateCode: 8,
            message: "" + c + ":" + (c - d.length) + ":" + (1 / c)
        });
        this.addWaveToCache(a, function() {
            b.startFillWavesCache(d, c, e)
        })
    } else {
        e()
    }
};
UltimateSoundTools.prototype.notifyCallback = function(a) {
    if (this.notifyCallbackFunction) {
        this.notifyCallbackFunction(a)
    } else {
    }
};
UltimateSoundTools.prototype.takeChannel = function() {
    var a = new UltimateChannel(this, this.channels.length);
    this.channels.push(a);
    return a
};
UltimateSoundTools.prototype.takeInstrument = function(d, c) {
    for (var b = 0; b < this.instrumentCache.length; b++) {
        if (this.instrumentCache[b].midi == d && this.instrumentCache[b].isDrum == c) {
            return this.instrumentCache[b]
        }
    }
    var a = new UltimateInstrument(this, d, c);
    this.instrumentCache.push(a);
    return a
};
UltimateSoundTools.prototype.findWave = function(a) {
    for (var b = 0; b < window.ultimateWavesCache.length; b++) {
        if (window.ultimateWavesCache[b].url == a) {
            return window.ultimateWavesCache[b]
        }
    }
    return null
};
UltimateSoundTools.prototype.attachAllWaves = function() {
    for (var a = 0; a < this.instrumentCache.length; a++) {
        if (this.instrumentCache[a]) {
            for (var c = 0; c < this.instrumentCache[a].samples.length; c++) {
                if (this.instrumentCache[a].samples[c].audioBuffer) {} else {
                    var b = this.findWave(this.realPath(this.instrumentCache[a].samples[c].sample));
                    this.instrumentCache[a].samples[c].wave = b
                }
            }
        }
    }
};
UltimateSoundTools.prototype.cacheAllWaves = function(f) {
    var e = [];
    for (var a = 0; a < this.instrumentCache.length; a++) {
        if (this.instrumentCache[a]) {
            for (var b = 0; b < this.instrumentCache[a].samples.length; b++) {
                e.push(this.realPath(this.instrumentCache[a].samples[b].sample))
            }
        }
    }
    var c = this;
    var d = e.length;
    this.startFillWavesCache(e, d, function() {
        c.attachAllWaves();
        c.setupMIDIChannels();
        f()
    })
};
UltimateSoundTools.prototype.clearWaves = function() {};
UltimateSoundTools.prototype.findPosition = function(a) {
    for (var b = 0; b < this.song.positions.length; b++) {
        if (this.song.positions[b].left == a) {
            return this.song.positions[b]
        }
    }
    return null
};
UltimateSoundTools.prototype.pause = function() {
    this.on = false;
    needMixAnotherTick = false;
    this.callbackQueue = [];
    for (var a = 1; a < this.channels.length; a++) {}
};
UltimateSoundTools.prototype.cleanUpChannels = function() {
    for (var a = 0; a < this.channels.length; a++) {
        this.channels[a].cleanUp()
    }
};
UltimateSoundTools.prototype.calculateSongDuration = function() {
    ms = 0;
    for (var a = 0; a < this.song.positions.length; a++) {
        ms = ms + this.positionDuration(this.song.positions[a])
    }
    return ms
};
UltimateSoundTools.prototype.positionDuration = function(b) {
    var a = this.song.meter;
    var c = this.song.tempo;
    if (b) {
        if (b.tempo) {
            c = b.tempo
        }
        if (b.length) {
            a = b.length
        }
    }
    return (7500 * a / c) / this.song.subtempo
};

function UltimateChannel(a, b) {
    this.owner = a;
    this.order = b;
    this.pan = 0.5;
    this.volume = 0.75;
    this.volumeRatio = 1;
    this.equalizer = null;
    this.compressor = null;
    this.mute = false;
    this.createChain();
    this.createEnvelopes();
    return this
}
UltimateChannel.prototype.createChain = function() {
    if (this.owner.weakMode) {
        this.output = this.owner.audioContext().createGain();
        this.input = this.owner.audioContext().createGain();
        this.left = this.owner.audioContext().createGain();
        this.right = this.owner.audioContext().createGain();
        this.merger = this.owner.audioContext().createChannelMerger(2);
        this.input.connect(this.left);
        this.input.connect(this.right);
        this.left.connect(this.merger, 0, 0);
        this.right.connect(this.merger, 0, 1);
        this.merger.connect(this.output)
    } else {
        this.equalizer = this.owner.createEqualizerNode();
        this.compressor = this.owner.createCompressorNode();
        this.output = this.owner.audioContext().createGain();
        this.input = this.owner.audioContext().createGain();
        this.left = this.owner.audioContext().createGain();
        this.right = this.owner.audioContext().createGain();
        this.merger = this.owner.audioContext().createChannelMerger(2);
        this.input.connect(this.left);
        this.input.connect(this.right);
        this.left.connect(this.merger, 0, 0);
        this.right.connect(this.merger, 0, 1);
        this.merger.connect(this.equalizer.eq65);
        this.equalizer.eq12000.connect(this.compressor.input);
        this.compressor.output.connect(this.output)
    }
    if (this.order > 0) {
        this.output.connect(this.owner.mainInput)
    } else {
        this.output.connect(this.owner.mainOutput)
    }
};
UltimateChannel.prototype.resetPresetProperies = function() {
    for (var a = 0; a < ultimatePresets.length; a++) {
        var b = ultimatePresets[a];
        if (b.midi == this.link.midi) {
            if (b.volume) {
                this.volumeRatio = b.volume
            } else {
                this.volumeRatio = 1
            }
            if (!this.owner.weakMode) {
                if (b.F65) {
                    this.equalizer.eq65.gain.value = b.F65
                } else {
                    this.equalizer.eq65.gain.value = 0
                }
                if (b.F125) {
                    this.equalizer.eq125.gain.value = b.F125
                } else {
                    this.equalizer.eq125.gain.value = 0
                }
                if (b.F250) {
                    this.equalizer.eq250.gain.value = b.F250
                } else {
                    this.equalizer.eq250.gain.value = 0
                }
                if (b.F500) {
                    this.equalizer.eq500.gain.value = b.F500
                } else {
                    this.equalizer.eq500.gain.value = 0
                }
                if (b.F1000) {
                    this.equalizer.eq1000.gain.value = b.F1000
                } else {
                    this.equalizer.eq1000.gain.value = 0
                }
                if (b.F2000) {
                    this.equalizer.eq2000.gain.value = b.F2000
                } else {
                    this.equalizer.eq2000.gain.value = 0
                }
                if (b.F4000) {
                    this.equalizer.eq4000.gain.value = b.F4000
                } else {
                    this.equalizer.eq4000.gain.value = 0
                }
                if (b.F6000) {
                    this.equalizer.eq6000.gain.value = b.F6000
                } else {
                    this.equalizer.eq6000.gain.value = 0
                }
                if (b.F8000) {
                    this.equalizer.eq8000.gain.value = b.F8000
                } else {
                    this.equalizer.eq8000.gain.value = 0
                }
                if (b.F12000) {
                    this.equalizer.eq12000.gain.value = b.F12000
                } else {
                    this.equalizer.eq12000.gain.value = 0
                }
                this.compressor.setup(b.compressor, b.threshold, b.knee, b.ratio, b.attack, b.release)
            }
            this.setup();
            break
        }
    }
};
UltimateChannel.prototype.down = function() {
    if (this.mute) {} else {
        this.output.gain.cancelScheduledValues(this.owner.audioContext().currentTime);
        this.output.gain.setValueAtTime(0, this.owner.audioContext().currentTime)
    }
};
UltimateChannel.prototype.setup = function() {
    this.output.gain.cancelScheduledValues(this.owner.audioContext().currentTime);
    if (this.order == 0) {
        this.mute = !this.owner.metronomeActivity
    }
    if (this.mute) {
        this.output.gain.setValueAtTime(0, this.owner.audioContext().currentTime)
    } else {
        this.output.gain.setValueAtTime(this.volume, this.owner.audioContext().currentTime);
        this.left.gain.value = 1 - this.pan;
        this.right.gain.value = this.pan
    }
};
UltimateChannel.prototype.createEnvelopes = function() {
    this.envelopes = [];
    for (var a = 0; a < 4; a++) {
        var b = this.getFreeEnvelope(0, 0)
    }
    for (var a = 0; a < this.envelopes.length; a++) {
        this.envelopes[a].free = true
    }
};
UltimateChannel.prototype.cleanUp = function() {
    for (var a = 0; a < this.envelopes.length; a++) {
        this.envelopes[a].free = true;
        if (this.envelopes[a].audioBufferSourceNode) {
            try {
                this.clearEnvelope(this.envelopes[a])
            } catch (b) {
            }
        } else {}
    }
};
UltimateChannel.prototype.checkEnvelopes = function() {
    for (var a = 0; a < this.envelopes.length; a++) {
        if (this.envelopes[a].free) {} else {
            if (this.owner.audioContext().currentTime > this.envelopes[a].when + this.envelopes[a].durationAndDecay + 0.2) {
                this.clearEnvelope(this.envelopes[a])
            }
        }
    }
};
UltimateChannel.prototype.getFreeEnvelope = function(d, b) {
    for (var a = 0; a < this.envelopes.length; a++) {
        if (this.envelopes[a].free) {
            this.envelopes[a].free = false;
            this.envelopes[a].left = d;
            this.envelopes[a].step32 = b;
            return this.envelopes[a]
        }
    }
    var c = this.owner.audioContext().createGain();
    c.connect(this.input);
    this.envelopes.push(c);
    c.free = false;
    c.left = d;
    c.step32 = b;
    if (this.envelopes.length > 99) {
    }
    return c
};
UltimateChannel.prototype.calculatePlayBackRate = function(b, c) {
    var d = b.originalPitch - 100 * b.coarseTune - b.fineTune;
    var a = Math.pow(2, (100 * c - d) / 1200);
    return a
};
UltimateChannel.prototype.strumSampleRate = function(i, b, m, e, g, c, o, k) {
    g.playbackRate.value = this.calculatePlayBackRate(m, b);
    g.playbackRate.cancelScheduledValues(this.owner.audioContext().currentTime);
    if (c) {
        for (var j = 0; j < c.length; j++) {
            var h = this.calculatePlayBackRate(m, b + c[j].pitch / 2);
            g.playbackRate.linearRampToValueAtTime(h, i + c[j].position * e / 16)
        }
    } else {
        if (o) {
            var a = 25 / 100;
            var l = 1;
            var f = 0.15;
            for (var n = f; n < e; n = n + f) {
                var d = this.calculatePlayBackRate(m, b + a + l * a);
                g.playbackRate.linearRampToValueAtTime(d, i + n);
                l = -l
            }
        }
    }
    if (k) {
        for (var n = 0; n < e; n = n + 0.1) {
            g.playbackRate.setValueAtTime(this.calculatePlayBackRate(m, b), i + n);
            g.playbackRate.setValueAtTime(this.calculatePlayBackRate(m, b + k), i + n + 0.05)
        }
    }
};
UltimateChannel.prototype.strumDetune = function(i, b, m, e, h, d, p, k) {
    var g = b * 100 - (m.originalPitch - 100 * m.coarseTune - m.fineTune);
    h.detune.value = g;
    h.detune.cancelScheduledValues(this.owner.audioContext().currentTime);
    if (d) {
        for (var j = 0; j < d.length; j++) {
            var o = g + 100 * d[j].pitch / 2;
            h.detune.linearRampToValueAtTime(o, i + d[j].position * e / 16)
        }
    } else {
        if (p) {
            var a = 25;
            var l = 1;
            var f = 0.15;
            for (var n = f; n < e; n = n + f) {
                var c = g + a + l * a;
                h.detune.linearRampToValueAtTime(c, i + n);
                l = -l
            }
        }
    }
    if (k) {
        for (var n = 0; n < e; n = n + 0.1) {
            h.detune.setValueAtTime(0, i + n);
            h.detune.setValueAtTime(k * 100, i + n + 0.05)
        }
    }
};
UltimateChannel.prototype.strumVolume = function(j, g, f, b, k, i, l) {
    var h = g / 127;
    if (l) {
        h = h * 2
    }
    var a = j + b;
    var d = j + f;
    k.gain.cancelScheduledValues(this.owner.audioContext().currentTime);
    k.gain.setValueAtTime(0, j);
    if (i) {
        k.gain.linearRampToValueAtTime(0.001, j + 0.001);
        k.gain.linearRampToValueAtTime(h, d);
        k.gain.exponentialRampToValueAtTime(0.001, a)
    } else {
        k.gain.linearRampToValueAtTime(h, j + 0.001);
        if (l) {
            k.gain.exponentialRampToValueAtTime(0.001, j + 0.3)
        } else {
            var e = 4;
            if (f > e) {
                k.gain.linearRampToValueAtTime(0.0001, j + e)
            } else {
                var c = h * (1 - f / e);
                if (c < 0.0001) {
                    c = 0.0001
                }
                k.gain.linearRampToValueAtTime(c, d);
                k.gain.exponentialRampToValueAtTime(0.0001, a)
            }
        }
    }
};
UltimateChannel.prototype.adjustAhead = function(a) {
    if (this.owner.audioContext().currentTime >= a) {
        a = this.owner.audioContext().currentTime + 0.001
    }
    return a
};
UltimateChannel.prototype.strum = function(c, k, a, j, A, v, F, x, E, u, s, p, g, q, r, m, z, h, I) {
    k = this.adjustAhead(k);
    var o = this.pitchShift + A;
    var n = this.volumeRatio * j;
    if (q) {
        this.strum(c, k, a, j, A, v, F, x, E, u, s, p, g, false, r, m, z, h, I);
        n = n * 0.5
    }
    if (u) {
        var B = u - o - 1;
        var t = 0.8;
        this.strum(c, k, t * a, j, A, v, F, x, E, 0, s, p, g, false, r, m, z, h, I);
        for (var i = 0; i < B; i++) {
            var C = a * (t + i * (1 - t) / B);
            this.strum(c, k, t * a, j, A, v, F, x, E, 0, s, p, g, false, r, m, z, h, I)
        }
    } else {
        if (s) {
            var f = s * p / 32;
            for (var b = 0; b < f; b++) {
                var l = n;
                if (Math.floor(b * 0.5) == b * 0.5) {
                    l = n
                } else {
                    l = n * 0.8
                }
                var H = a / f;
                this.strum(c, k + b * H, H, l, o, v, F, x, E, u, 0, p, g, false, r, m, z, h, I)
            }
        } else {
            var y = c.findSample(o, g, q, r, m);
            if (y) {} else {
                return
            }
            if (y.wave) {} else {
                return
            }
            var D = this;
            var w = this.owner.audioContext().createBufferSource();
            var e = 1;
            if (y.volume) {
                e = y.volume
            }
            n = n * e;
            if (y.loopStart > 8 && y.loopStart < y.loopEnd && y.loopEnd / y.wave.waveSampleRate < a) {
                w.loop = true;
                w.loopStart = y.loopStart / y.wave.waveSampleRate;
                w.loopEnd = y.loopEnd / y.wave.waveSampleRate
            }
            var G = a + 0.5;
            w.buffer = y.wave.audioBuffer;
            var d = this.getFreeEnvelope(h, I);
            d.audioBufferSourceNode = w;
            this.strumSampleRate(k, o, y, a, w, F, E, x);
            this.strumVolume(k, n, a, G, d, v, z);
            w.connect(d);
            d.when = k;
            d.durationAndDecay = G;
            w.start(k, 0, G)
        }
    }
};
UltimateChannel.prototype.hit = function(m, g, l, b, c) {
    g = this.adjustAhead(g);
    var d = this.volumeRatio * l;
    var f = this.owner.audioContext().createBufferSource();
    var j = m.samples[0];
    if (j) {
        if (j.wave) {
            var k = 1;
            if (j.volume) {
                k = j.volume
            }
            var i = this;
            d = d * k;
            f.buffer = j.wave.audioBuffer;
            var h = this.getFreeEnvelope(b, c);
            h.audioBufferSourceNode = f;
            f.connect(h);
            var e = d / 127;
            h.gain.cancelScheduledValues(this.owner.audioContext().currentTime);
            h.gain.setValueAtTime(e, this.owner.audioContext().currentTime);
            var a = 2;
            h.when = g;
            h.durationAndDecay = a;
            f.start(g, 0, a)
        } else {
        }
    } else {
    }
};
UltimateChannel.prototype.cancelEnvelopes = function(d, b) {
    for (var a = 0; a < this.envelopes.length; a++) {
        if (this.envelopes[a].left > d || (this.envelopes[a].left == d && this.envelopes[a].step32 > b)) {
            this.envelopes[a].free = true;
            if (this.envelopes[a].audioBufferSourceNode) {
                try {
                    this.clearEnvelope(this.envelopes[a])
                } catch (c) {
                }
            }
        } else {
        }
    }
};
UltimateChannel.prototype.clearEnvelope = function(b) {
    b.free = true;
    if (b.audioBufferSourceNode) {
        try {
            b.audioBufferSourceNode.stop(0)
        } catch (a) {}
        try {
            b.audioBufferSourceNode.stop()
        } catch (a) {}
        b.audioBufferSourceNode.disconnect();
        b.audioBufferSourceNode = null
    }
};
UltimateChannel.prototype.unchain = function() {
    try {
        if (this.eq65) {
            this.eq65.disconnect();
            this.eq65 = null
        }
        if (this.eq125) {
            this.eq125.disconnect();
            this.eq125 = null
        }
        if (this.eq500) {
            this.eq500.disconnect();
            this.eq500 = null
        }
        if (this.eq1000) {
            this.eq1000.disconnect();
            this.eq1000 = null
        }
        if (this.eq2000) {
            this.eq2000.disconnect();
            this.eq2000 = null
        }
        if (this.eq4000) {
            this.eq4000.disconnect();
            this.eq4000 = null
        }
        if (this.eq6000) {
            this.eq6000.disconnect();
            this.eq6000 = null
        }
        if (this.eq8000) {
            this.eq8000.disconnect();
            this.eq8000 = null
        }
        if (this.eq12000) {
            this.eq12000.disconnect();
            this.eq12000 = null
        }
        if (this.output) {
            this.output.disconnect();
            this.output = null
        }
        if (this.input) {
            this.input.disconnect();
            this.input = null
        }
        if (this.left) {
            this.left.disconnect();
            this.left = null
        }
        if (this.right) {
            this.right.disconnect();
            this.right = null
        }
        if (this.merger) {
            this.merger.disconnect();
            this.merger = null
        }
        if (this.distortion) {
            this.distortion.unchain()
        }
        if (this.compressor) {
            this.compressor.unchain()
        }
    } catch (a) {
    }
};

function UltimateInstrument(a, c, b) {
    this.midi = c;
    this.isDrum = b;
    this.owner = a;
    this.samples = [];
    this._setup();
    return this
}
UltimateInstrument.prototype._setup = function() {
    if (this.samples.length < 1) {
        if (this.isDrum) {
            for (var a = 0; a < ultimateSamplesForDrums.length; a++) {
                if (ultimateSamplesForDrums[a].midi == this.midi) {
                    this.samples.push(ultimateSamplesForDrums[a])
                }
            }
        } else {
            for (var a = 0; a < ultimateSamplesForLoops.length; a++) {
                if (ultimateSamplesForLoops[a].midi == this.midi) {
                    this.samples.push(ultimateSamplesForLoops[a]);
                    if (ultimateSamplesForLoops[a].harmonic) {
                        ultimateSamplesForLoops[a].harmonicInstrument = this.owner.takeInstrument(ultimateSamplesForLoops[a].harmonic, false)
                    }
                    if (ultimateSamplesForLoops[a].palmMute) {
                        ultimateSamplesForLoops[a].palmMuteInstrument = this.owner.takeInstrument(ultimateSamplesForLoops[a].palmMute, false)
                    }
                    if (ultimateSamplesForLoops[a].slap) {
                        ultimateSamplesForLoops[a].slapInstrument = this.owner.takeInstrument(ultimateSamplesForLoops[a].slap, false)
                    }
                    if (ultimateSamplesForLoops[a].pop) {
                        ultimateSamplesForLoops[a].popInstrument = this.owner.takeInstrument(ultimateSamplesForLoops[a].pop, false)
                    }
                }
            }
        }
    }
};
UltimateInstrument.prototype.findSample = function(g, b, e, f, a) {
    var d = null;
    for (var c = 0; c < this.samples.length; c++) {
        d = this.samples[c];
        if (d.keyRangeLow <= g && g <= d.keyRangeHigh) {
            break
        }
    }
    if (d) {
        if (b && d.palmMuteInstrument) {
            return d.palmMuteInstrument.findSample(g)
        }
        if (e && d.harmonicInstrument) {
            return d.harmonicInstrument.findSample(g)
        }
        if (f && d.slapInstrument) {
            return d.slapInstrument.findSample(g)
        }
        if (a && d.popInstrument) {
            return d.popInstrument.findSample(g)
        }
    }
    return d
};

function UltimateSample(a) {
    this.midi = a.midi;
    this.sample = a.sample;
    this.originalPitch = a.originalPitch;
    this.velRangeLow = a.velRangeLow;
    this.velRangeHigh = a.velRangeHigh;
    this.keyRangeLow = a.keyRangeLow;
    this.keyRangeHigh = a.keyRangeHigh;
    this.loopStart = a.loopStart;
    this.loopEnd = a.loopEnd;
    this.coarseTune = a.coarseTune;
    this.fineTune = a.fineTune;
    this.audioBuffer = null;
    return this
}

function UltimateWave(a, b) {
    this.url = a;
    this.audioBuffer = b;
    this.waveSampleRate = 0;
    return this
}

function PlayerBridge() {
    if (window.weakModeForUltimateSoundTools) {
        this.player = new UltimateSoundTools(true)
    } else {
        this.player = new UltimateSoundTools(false)
    }
    this.player.tickMove();
    this.player.tickCallBack();
    this.player.callbackQueue = [];
    this.player.notifyCallbackFunction = null;
    this.player.loopStart = null;
    this.player.loopEnd = null;
    this.player.monitorChannel = 0;
    return this
}
PlayerBridge.prototype.setEqualizerParameters = function(a) {
    this.player.setEqualizerParameters(a);
    this.player.changeEqualizerParameters()
};
PlayerBridge.prototype.getEqualizerParameters = function() {
    return this.player.getEqualizerParameters()
};
PlayerBridge.prototype.resetEqualizerParameters = function() {
    this.player.resetEqualizerParameters();
    this.player.changeEqualizerParameters()
};
PlayerBridge.prototype.setMetronomeActivity = function(a) {
    this.player.metronomeActivity = a;
    if (this.player.channels[0]) {
        this.player.channels[0].mute = !this.player.metronomeActivity;
        this.player.channels[0].setup()
    }
};
PlayerBridge.prototype.monitorTrack = function(a) {
    this.player.monitorChannel = 1 * a
};
PlayerBridge.prototype.resetQueue = function() {
    if (this.player.callbackQueue.length > 0) {
        var a = 0;
        var b = this.player.callbackQueue[a];
        this.changePosition(b.position.number - 1, b.beat)
    }
};
PlayerBridge.prototype.setLoop = function(d, h) {
    var a = this.findLastPositionByTime(d);
    if (a) {
        var f = this.findAfterPositionByTime(h, a.p.left);
        if (f) {
            this.player.loopStart = {
                position: a.p,
                step32: a.s
            };
            this.player.loopEnd = {
                position: f.p,
                step32: f.s
            };
        } else {
            this.player.loopStart = null;
            this.player.loopEnd = null;
        }
    } else {
        this.player.loopStart = null;
        this.player.loopEnd = null;
    }
    if (this.player.callbackQueue.length > 0) {
        var c = this.player.audioContext().currentTime;
        var k = needMixAnotherTick;
        needMixAnotherTick = false;
        var j = null;
        var b = 1;
        for (var g = 0; g < this.player.callbackQueue.length; g++) {
            j = this.player.callbackQueue[g];
            if (j) {
                if (j.audioContextCurrentTime > c + 0.1) {
                    break
                }
            }
            b++
        }
        if (j) {
            for (var g = 0; g < this.player.channels.length; g++) {
                for (var l = 0; l < this.player.channels[g].envelopes.length; l++) {
                    var m = this.player.channels[g].envelopes[l];
                    if (m.when > j.audioContextCurrentTime - 0.1) {
                        this.player.channels[g].clearEnvelope(m)
                    } else {}
                }
            }
            this.player.currentTick.position = j.position;
            this.player.currentTick.step32 = j.step32;
            this.player.currentTick.bar = j.bar;
            this.player.currentTick.audioContextCurrentTime = j.audioContextCurrentTime;
            this.player.callbackQueue.length = []
        }
        needMixAnotherTick = k
    } else {
        this.resetQueue()
    }
};
PlayerBridge.prototype.setLoop222 = function(c, b) {
    var d = this.findLastPositionByTime(c);
    if (d) {
        var a = this.findAfterPositionByTime(b, d.p.left);
        if (a) {
            this.player.loopStart = {
                position: d.p,
                step32: d.s
            };
            this.player.loopEnd = {
                position: a.p,
                step32: a.s
            };
        } else {
            this.player.loopStart = null;
            this.player.loopEnd = null;
        }
    } else {
        this.player.loopStart = null;
        this.player.loopEnd = null;
    }
    this.resetQueue()
};
PlayerBridge.prototype.stop = function() {
    var a = this;
    var b = 20;
    this.player.notifyCallback({
        stateCode: 5,
        message: "tabPro.model.dto.NotesPlayerState.PAUSE"
    });
    if (this.player) {
        if (this.player.mainOutput) {}
    }
    this.player.on = false;
    a.realStop()
};
PlayerBridge.prototype.realStop = function() {
    this.player.mainOutput.gain.cancelScheduledValues(0);
    this.player.mainOutput.gain.setValueAtTime(this.player.mainVolume, this.player.audioContext().currentTime);
    this.player.mainOutput.gain.linearRampToValueAtTime(0 * this.player.mainVolume, this.player.audioContext().currentTime + 0.1);
    this.player.pause();
    if (this.player.channels[0]) {
        this.player.channels[0].cleanUp();
        this.player.channels[0].mute = false;
        this.player.channels[0].setup()
    }
};
PlayerBridge.prototype.play = function() {
    if (this.player.on) {} else {
        if (this.player.waitLoadWaves) {
            return
        }
        this.player.mainOutput.gain.cancelScheduledValues(this.player.audioContext().currentTime + 0.001);
        this.player.mainOutput.gain.setValueAtTime(0, this.player.audioContext().currentTime);
        this.player.mainOutput.gain.linearRampToValueAtTime(this.player.mainVolume, this.player.audioContext().currentTime + 0.1);
        this.player.clearQueue();
        this.player.checkEnvelopes();
        this.player.currentTick.audioContextCurrentTime = this.player.audioContext().currentTime;
        this.player.on = true;
        needMixAnotherTick = true;
        this.player.channels[0].mute = !this.metronomeActivity;
        for (var a = 0; a < this.player.channels.length; a++) {
            this.player.channels[a].setup()
        }
    }
    this.player.notifyCallback({
        stateCode: 3,
        message: "tabPro.model.dto.NotesPlayerState.PLAYING"
    })
};
PlayerBridge.prototype.setTempCoeff = function(f) {
    var h = needMixAnotherTick;
    needMixAnotherTick = false;
    var c = this.player.audioContext().currentTime;
    var k = 1;
    if (f > 0) {
        k = this.player.song.subtempo / f
    }
    if (this.player.callbackQueue.length > 0) {
        var g = null;
        var a = 1;
        for (var d = 0; d < this.player.callbackQueue.length; d++) {
            g = this.player.callbackQueue[d];
            if (g) {
                if (g.audioContextCurrentTime > c) {
                    break
                }
            }
            a++
        }
        if (g) {
            var b = g.audioContextCurrentTime - c;
            for (var d = 0; d < this.player.channels.length; d++) {
                for (var j = 0; j < this.player.channels[d].envelopes.length; j++) {
                    var l = this.player.channels[d].envelopes[j];
                    if (l.when > g.audioContextCurrentTime - 0.01) {
                        this.player.channels[d].clearEnvelope(l)
                    } else {}
                }
            }
            this.player.currentTick.position = g.position;
            this.player.currentTick.step32 = g.step32;
            this.player.currentTick.bar = g.bar;
            this.player.currentTick.audioContextCurrentTime = c + b * k;
            this.player.callbackQueue.length = []
        }
    }
    needMixAnotherTick = h;
    this.player.song.subtempo = 1 * f
};
PlayerBridge.prototype.______setTempCoeff = function(a) {
    this.player.song.subtempo = 1 * a;
    if (this.player.callbackQueue.length > 0) {
        var f = 0;
        var d = 0;
        if (this.player.callbackQueue.length > 1) {
            f = 1
        }
        var e = this.player.callbackQueue[f];
        var c = this.player.callbackQueue[d];
        for (var b = 0; b < this.player.channels.length; b++) {
            this.player.channels[b].cancelEnvelopes(c.position.left, c.step32)
        }
        this.player.currentTick.position = e.position;
        this.player.currentTick.step32 = e.step32;
        this.player.currentTick.bar = e.bar;
        this.player.currentTick.audioContextCurrentTime = c.audioContextCurrentTime;
        this.player.clearQueue()
    }
};
PlayerBridge.prototype.initSong = function(c) {
    this.stop();
    this.player.waitLoadWaves = true;
    this.songModelSong = c;
    this.player.song = convertModelSong2UGPSong(this.songModelSong);
    this.player.resetChannels();
    for (var b = 0; b < this.player.channels.length; b++) {
        this.player.channels[b].mute = false;
        this.player.channels[b].setup()
    }
    this.player.currentTick = {
        bar: 0,
        step32: 0,
        position: this.player.findPosition(0),
        beat: 0,
        audioContextCurrentTime: this.player.audioContext().currentTime
    };
    for (var b = 0; b < this.player.song.samples.length; b++) {
        var a = this.player.song.samples[b];
        this.player.takeInstrument(a.midi, a.isDrum)
    }
    this.player.takeInstrument(10000, true);
    this.player.takeInstrument(2000, true);
    this.player.notifyCallback({
        stateCode: 0,
        message: "tabPro.model.dto.NotesPlayerState.READY"
    })
};
PlayerBridge.prototype.testAllSamples = function() {
    for (var a = 0; a < ultimateSamplesForDrums.length; a++) {
        this.testOneSamples(this.player.realPath(ultimateSamplesForDrums[a].sample))
    }
    for (var a = 0; a < ultimateSamplesForLoops.length; a++) {
        this.testOneSamples(this.player.realPath(ultimateSamplesForLoops[a].sample))
    }
};
PlayerBridge.prototype.testOneSamples = function(a) {
    this.player.loadAudioBuffer(a, function(b, c) {
    })
};
PlayerBridge.prototype.setVolume = function(a) {
    this.player.mainVolume = 0.222 * a / 127;
    this.player.mainOutput.gain.cancelScheduledValues(this.player.audioContext().currentTime);
    this.player.mainOutput.gain.setValueAtTime(this.player.mainVolume + 0.0001, this.player.audioContext().currentTime)
};
PlayerBridge.prototype.setTrackVolume = function(b, a) {
    if (b < this.player.channels.length) {
        this.player.channels[b].volume = a / 127;
        this.player.channels[b].setup()
    } else {
    }
};
PlayerBridge.prototype.playNote = function(d, c, b, a) {
    if (this.player.channels[0]) {
        this.player.channels[0].mute = false;
        this.player.channels[0].output.gain.cancelScheduledValues(this.player.audioContext().currentTime);
        this.player.channels[0].output.gain.setValueAtTime(this.player.channels[0].volume, this.player.audioContext().currentTime);
        this.player.mainOutput.gain.setValueAtTime(this.player.mainVolume + 0.0001, this.player.audioContext().currentTime)
    }
    this.hit(10000, 0, 127)
};
PlayerBridge.prototype.strum = function(f, e, d, a) {
    var c = this.player.channels[e];
    var b = this.player.takeInstrument(c.link.midi, false);
    c.strum(b, this.player.audioContext().currentTime, a * 1000, d, f, 0, 0)
};
PlayerBridge.prototype.hit = function(f, e, d) {
    var c = this.player.channels[e];
    var b = this.player.takeInstrument(f, true);
    var a = this.player.audioContext().currentTime;
    c.hit(b, a, d, 0, 0)
};
PlayerBridge.prototype.setTrackPan = function(b, a) {
    if (b < this.player.channels.length) {
        this.player.channels[b].pan = a / 127;
        this.player.channels[b].setup()
    } else {
    }
};
PlayerBridge.prototype.setTrackMute = function(b, a) {
    if (b < this.player.channels.length) {
        this.player.channels[b].mute = a & true;
        this.player.channels[b].setup()
    } else {
    }
};
PlayerBridge.prototype.changePosition = function(k, n) {
    var c = this.player.on;
    this.player.clearQueue();
    var g = null;
    for (var f = 0; f < this.player.song.positions.length; f++) {
        g = this.player.song.positions[f];
        if (g.number == k + 1) {
            break
        }
    }
    if (g != null) {
        this.player.currentTick.position = g;
        this.player.currentTick.step32 = 0;
        this.player.currentTick.bar = 0;
        try {
            var a = this.player.channels[this.player.monitorChannel];
            var l = a.link.riffs[k].measure.beats[n].start;
            var d = a.link.riffs[k].measure.header.start;
            var o = l - d;
            var j = Math.round(o / 120) - 1;
            if (j < 0) {
                j = 0
            }
            this.player.currentTick.step32 = j
        } catch (h) {
        }
    }
    this.player.currentTick.audioContextCurrentTime = this.player.audioContext().currentTime;
    this.player.on = c
};
PlayerBridge.prototype.changePositionMs = function(b) {
    this.player.clearQueue();
    var a = this.findPositionByTime(b);
    if (a.p != null) {
        this.player.currentTick.position = a.p;
        this.player.currentTick.step32 = a.s;
        this.player.currentTick.bar = 0;
        this.player.currentTick.beat = 0;
        this.player.currentTick.audioContextCurrentTime = this.player.audioContext().currentTime
    }
};
PlayerBridge.prototype.setPlayCallback = function(a) {
    this.player.clearQueue();
    this.player.playCallback = a
};
PlayerBridge.prototype.setNotifyCallback = function(a) {
    this.player.notifyCallbackFunction = a
};
PlayerBridge.prototype.loadSoundfont = function(a, c) {
    this.player.soundFontPath = a.substring(0, a.lastIndexOf("/") + 1);
    var b = this;
    this.player.cacheAllWaves(function() {
        b.player.waitLoadWaves = false;
        if (!b.player.weakMode) {
            b.player.echo.setBuffer(b.player.takeInstrument(2000, true).samples[0].wave.audioBuffer)
        }
        b.player.notifyCallback({
            stateCode: 1,
            message: "tabPro.model.dto.NotesPlayerState.SOUNDFONT_GENERAL_XML_LOADED"
        });
        b.player.notifyCallback({
            stateCode: 2,
            message: "tabPro.model.dto.NotesPlayerState.SOUNDFONT_PRESETS_LOADED"
        });
        if (c) {
            c()
        }
    })
};
PlayerBridge.prototype.findLastPositionByTime = function(d) {
    var b = this.findPositionByTime(d);
    if (b) {
        for (var a = this.player.song.positions.length - 1; a >= 0; a--) {
            var c = this.player.song.positions[a];
            if (c.number == b.p.number) {
                b.p = c;
                break
            }
        }
    }
    return b
};
PlayerBridge.prototype.findAfterPositionByTime = function(e, d) {
    var b = this.findPositionByTime(e);
    if (b) {
        for (var a = 0; a < this.player.song.positions.length; a++) {
            var c = this.player.song.positions[a];
            if (c.number == b.p.number && c.left >= d) {
                b.p = c;
                break
            }
        }
    }
    return b
};
PlayerBridge.prototype.findPositionByTime = function(e) {
    if (this.player.song) {
        var g = null;
        var j = -1;
        for (var f = 0; f < this.player.song.positions.length; f++) {
            var b = this.player.song.positions[f];
            if (b.startInMilliSeconds <= e) {
                if (j < 0) {
                    g = b;
                    j = e - b.startInMilliSeconds
                } else {
                    if (j > e - b.startInMilliSeconds) {
                        g = b;
                        j = e - b.startInMilliSeconds
                    }
                }
            }
        }
        if (g == null) {
            return null
        }
        var c = (1000 * (60 / 8) / g.tempo);
        var h = e - g.startInMilliSeconds;
        var d = Math.round(h / c);
        var a = {
            p: g,
            s: d
        };
        return a
    } else {
        return null
    }
};
PlayerBridge.prototype.changePreset = function(a, c) {
    if (this.player.channels[a].link.midi < 0) {
        return
    }
    this.player.channels[a].link.midi = 1 * c;
    this.player.channels[a].link.sample.midi = 1 * c;
    this.player.takeInstrument(1 * c);
    var b = this;
    this.player.cacheAllWaves(function() {
        b.resetQueue();
        if (b.player.on) {
            b.player.notifyCallback({
                stateCode: 3,
                message: "tabPro.model.dto.NotesPlayerState.PLAYING"
            })
        }
    })
};
PlayerBridge.prototype.changePitch = function(b) {
    for (var a = 0; a < this.player.channels.length; a++) {
        this.player.channels[a].pitchShift = 1 * b
    }
    this.resetQueue()
};
PlayerBridge.prototype.replaceSong = function(f) {
    var b = convertModelSong2UGPSong(f);
    for (var d = 0; d < b.riffs.length; d++) {
        b.riffs[d].beat = this.player.song.riffs[d].beat
    }
    this.player.song.riffs = b.riffs;
    for (var d = 0; d < this.player.song.channels.length; d++) {
        var h = this.player.song.channels[d];
        for (var g = 0; g < h.riffs.length; g++) {
            var e = h.riffs[g];
            for (var a = 0; a < this.player.song.riffs.length; a++) {
                if (this.player.song.riffs[a].id == e.id) {
                    h.riffs[g] = this.player.song.riffs[a];
                    break
                }
            }
        }
    }
    this.resetQueue();
};