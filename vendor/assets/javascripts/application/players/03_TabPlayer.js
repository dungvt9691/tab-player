/*! jQuery UI - v1.8.23 - 2012-08-15
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.core.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(f, e) {
    function h(a, l) {
        var k = a.nodeName.toLowerCase();
        if ("area" === k) {
            var j = a.parentNode,
                i = j.name,
                d;
            return !a.href || !i || j.nodeName.toLowerCase() !== "map" ? !1 : (d = f("img[usemap=#" + i + "]")[0], !!d && g(d))
        }
        return (/input|select|textarea|button|object/.test(k) ? !a.disabled : "a" == k ? a.href || l : l) && g(a)
    }

    function g(a) {
        return !f(a).parents().andSelf().filter(function() {
            return f.curCSS(this, "visibility") === "hidden" || f.expr.filters.hidden(this)
        }).length
    }
    f.ui = f.ui || {};
    if (f.ui.version) {
        return
    }
    f.extend(f.ui, {
        version: "1.8.23",
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91
        }
    }), f.fn.extend({
        propAttr: f.fn.prop || f.fn.attr,
        _focus: f.fn.focus,
        focus: function(a, d) {
            return typeof a == "number" ? this.each(function() {
                var b = this;
                setTimeout(function() {
                    f(b).focus(), d && d.call(b)
                }, a)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function() {
            var a;
            return false && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? a = this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(f.curCSS(this, "position", 1)) && /(auto|scroll)/.test(f.curCSS(this, "overflow", 1) + f.curCSS(this, "overflow-y", 1) + f.curCSS(this, "overflow-x", 1))
            }).eq(0) : a = this.parents().filter(function() {
                return /(auto|scroll)/.test(f.curCSS(this, "overflow", 1) + f.curCSS(this, "overflow-y", 1) + f.curCSS(this, "overflow-x", 1))
            }).eq(0), /fixed/.test(this.css("position")) || !a.length ? f(document) : a
        },
        zIndex: function(j) {
            if (j !== e) {
                return this.css("zIndex", j)
            }
            if (this.length) {
                var i = f(this[0]),
                    b, a;
                while (i.length && i[0] !== document) {
                    b = i.css("position");
                    if (b === "absolute" || b === "relative" || b === "fixed") {
                        a = parseInt(i.css("zIndex"), 10);
                        if (!isNaN(a) && a !== 0) {
                            return a
                        }
                    }
                    i = i.parent()
                }
            }
            return 0
        },
        disableSelection: function() {
            return this.bind((f.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(b) {
                b.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }), f("<a>").outerWidth(1).jquery || f.each(["Width", "Height"], function(l, k) {
        function a(m, p, o, n) {
            return f.each(j, function() {
                p -= parseFloat(f.curCSS(m, "padding" + this, !0)) || 0, o && (p -= parseFloat(f.curCSS(m, "border" + this + "Width", !0)) || 0), n && (p -= parseFloat(f.curCSS(m, "margin" + this, !0)) || 0)
            }), p
        }
        var j = k === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
            i = k.toLowerCase(),
            b = {
                innerWidth: f.fn.innerWidth,
                innerHeight: f.fn.innerHeight,
                outerWidth: f.fn.outerWidth,
                outerHeight: f.fn.outerHeight
            };
        f.fn["inner" + k] = function(d) {
            return d === e ? b["inner" + k].call(this) : this.each(function() {
                f(this).css(i, a(this, d) + "px")
            })
        }, f.fn["outer" + k] = function(d, m) {
            return typeof d != "number" ? b["outer" + k].call(this, d) : this.each(function() {
                f(this).css(i, a(this, d, !0, m) + "px")
            })
        }
    }), f.extend(f.expr[":"], {
        data: f.expr.createPseudo ? f.expr.createPseudo(function(a) {
            return function(b) {
                return !!f.data(b, a)
            }
        }) : function(a, j, i) {
            return !!f.data(a, i[3])
        },
        focusable: function(a) {
            return h(a, !isNaN(f.attr(a, "tabindex")))
        },
        tabbable: function(a) {
            var i = f.attr(a, "tabindex"),
                c = isNaN(i);
            return (c || i >= 0) && h(a, !c)
        }
    }), f(function() {
        var a = document.body,
            d = a.appendChild(d = document.createElement("div"));
        d.offsetHeight, f.extend(d.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        }), f.support.minHeight = d.offsetHeight === 100, f.support.selectstart = "onselectstart" in d, a.removeChild(d).style.display = "none"
    }), f.curCSS || (f.curCSS = f.css), f.extend(f.ui, {
        plugin: {
            add: function(a, l, k) {
                var j = f.ui[a].prototype;
                for (var i in k) {
                    j.plugins[i] = j.plugins[i] || [], j.plugins[i].push([l, k[i]])
                }
            },
            call: function(j, i, m) {
                var l = j.plugins[i];
                if (!l || !j.element[0].parentNode) {
                    return
                }
                for (var k = 0; k < l.length; k++) {
                    j.options[l[k][0]] && l[k][1].apply(j.element, m)
                }
            }
        },
        contains: function(d, c) {
            return document.compareDocumentPosition ? d.compareDocumentPosition(c) & 16 : d !== c && d.contains(c)
        },
        hasScroll: function(a, k) {
            if (f(a).css("overflow") === "hidden") {
                return !1
            }
            var j = k && k === "left" ? "scrollLeft" : "scrollTop",
                i = !1;
            return a[j] > 0 ? !0 : (a[j] = 1, i = a[j] > 0, a[j] = 0, i)
        },
        isOverAxis: function(i, d, j) {
            return i > d && i < d + j
        },
        isOver: function(a, m, l, k, j, i) {
            return f.ui.isOverAxis(a, l, j) && f.ui.isOverAxis(m, k, i)
        }
    })
})(jQuery);
/*! jQuery UI - v1.8.23 - 2012-08-15
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.widget.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(f, e) {
    if (f.cleanData) {
        var h = f.cleanData;
        f.cleanData = function(a) {
            for (var j = 0, i;
                (i = a[j]) != null; j++) {
                try {
                    f(i).triggerHandler("remove")
                } catch (c) {}
            }
            h(a)
        }
    } else {
        var g = f.fn.remove;
        f.fn.remove = function(a, d) {
            return this.each(function() {
                return d || (!a || f.filter(a, [this]).length) && f("*", this).add([this]).each(function() {
                    try {
                        f(this).triggerHandler("remove")
                    } catch (c) {}
                }), g.call(f(this), a, d)
            })
        }
    }
    f.widget = function(a, m, l) {
        var k = a.split(".")[0],
            j;
        a = a.split(".")[1], j = k + "-" + a, l || (l = m, m = f.Widget), f.expr[":"][j] = function(b) {
            return !!f.data(b, a)
        }, f[k] = f[k] || {}, f[k][a] = function(d, c) {
            arguments.length && this._createWidget(d, c)
        };
        var i = new m;
        i.options = f.extend(!0, {}, i.options), f[k][a].prototype = f.extend(!0, i, {
            namespace: k,
            widgetName: a,
            widgetEventPrefix: f[k][a].prototype.widgetEventPrefix || a,
            widgetBaseClass: j
        }, l), f.widget.bridge(a, f[k][a])
    }, f.widget.bridge = function(b, a) {
        f.fn[b] = function(j) {
            var i = typeof j == "string",
                d = Array.prototype.slice.call(arguments, 1),
                c = this;
            return j = !i && d.length ? f.extend.apply(null, [!0, j].concat(d)) : j, i && j.charAt(0) === "_" ? c : (i ? this.each(function() {
                var l = f.data(this, b),
                    k = l && f.isFunction(l[j]) ? l[j].apply(l, d) : l;
                if (k !== l && k !== e) {
                    return c = k, !1
                }
            }) : this.each(function() {
                var k = f.data(this, b);
                k ? k.option(j || {})._init() : f.data(this, b, new a(j, this))
            }), c)
        }
    }, f.Widget = function(d, c) {
        arguments.length && this._createWidget(d, c)
    }, f.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: !1
        },
        _createWidget: function(a, j) {
            f.data(j, this.widgetName, this), this.element = f(j), this.options = f.extend(!0, {}, this.options, this._getCreateOptions(), a);
            var i = this;
            this.element.bind("remove." + this.widgetName, function() {
                i.destroy()
            }), this._create(), this._trigger("create"), this._init()
        },
        _getCreateOptions: function() {
            return f.metadata && f.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function() {},
        _init: function() {},
        destroy: function() {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function() {
            return this.element
        },
        option: function(i, b) {
            var a = i;
            if (arguments.length === 0) {
                return f.extend({}, this.options)
            }
            if (typeof i == "string") {
                if (b === e) {
                    return this.options[i]
                }
                a = {}, a[i] = b
            }
            return this._setOptions(a), this
        },
        _setOptions: function(a) {
            var d = this;
            return f.each(a, function(i, c) {
                d._setOption(i, c)
            }), this
        },
        _setOption: function(d, c) {
            return this.options[d] = c, d === "disabled" && this.widget()[c ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", c), this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _trigger: function(a, m, l) {
            var k, j, i = this.options[a];
            l = l || {}, m = f.Event(m), m.type = (a === this.widgetEventPrefix ? a : this.widgetEventPrefix + a).toLowerCase(), m.target = this.element[0], j = m.originalEvent;
            if (j) {
                for (k in j) {
                    k in m || (m[k] = j[k])
                }
            }
            return this.element.trigger(m, l), !(f.isFunction(i) && i.call(this.element[0], m, l) === !1 || m.isDefaultPrevented())
        }
    }
})(jQuery);
/*! jQuery UI - v1.8.23 - 2012-08-15
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.mouse.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(e, d) {
    var f = !1;
    e(document).mouseup(function(b) {
        f = !1
    }), e.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var a = this;
            this.element.bind("mousedown." + this.widgetName, function(b) {
                return a._mouseDown(b)
            }).bind("click." + this.widgetName, function(b) {
                if (!0 === e.data(b.target, a.widgetName + ".preventClickEvent")) {
                    return e.removeData(b.target, a.widgetName + ".preventClickEvent"), b.stopImmediatePropagation(), !1
                }
            }), this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(a) {
            if (f) {
                return
            }
            this._mouseStarted && this._mouseUp(a), this._mouseDownEvent = a;
            var h = this,
                g = a.which == 1,
                c = typeof this.options.cancel == "string" && a.target.nodeName ? e(a.target).closest(this.options.cancel).length : !1;
            if (!g || c || !this._mouseCapture(a)) {
                return !0
            }
            this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                h.mouseDelayMet = !0
            }, this.options.delay));
            if (this._mouseDistanceMet(a) && this._mouseDelayMet(a)) {
                this._mouseStarted = this._mouseStart(a) !== !1;
                if (!this._mouseStarted) {
                    return a.preventDefault(), !0
                }
            }
            return !0 === e.data(a.target, this.widgetName + ".preventClickEvent") && e.removeData(a.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(b) {
                return h._mouseMove(b)
            }, this._mouseUpDelegate = function(b) {
                return h._mouseUp(b)
            }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), a.preventDefault(), f = !0, !0
        },
        _mouseMove: function(a) {
            return !false || document.documentMode >= 9 || !!a.button ? this._mouseStarted ? (this._mouseDrag(a), a.preventDefault()) : (this._mouseDistanceMet(a) && this._mouseDelayMet(a) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, a) !== !1, this._mouseStarted ? this._mouseDrag(a) : this._mouseUp(a)), !this._mouseStarted) : this._mouseUp(a)
        },
        _mouseUp: function(a) {
            return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, a.target == this._mouseDownEvent.target && e.data(a.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(a)), !1
        },
        _mouseDistanceMet: function(b) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - b.pageX), Math.abs(this._mouseDownEvent.pageY - b.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function(b) {
            return this.mouseDelayMet
        },
        _mouseStart: function(b) {},
        _mouseDrag: function(b) {},
        _mouseStop: function(b) {},
        _mouseCapture: function(b) {
            return !0
        }
    })
})(jQuery);
/*! jQuery UI - v1.8.23 - 2012-08-15
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.position.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(j, i) {
    j.ui = j.ui || {};
    var p = /left|center|right/,
        o = /top|center|bottom/,
        n = "center",
        m = {},
        l = j.fn.position,
        k = j.fn.offset;
    j.fn.position = function(c) {
            if (!c || !c.of) {
                return l.apply(this, arguments)
            }
            c = j.extend({}, c);
            var q = j(c.of),
                g = q[0],
                f = (c.collision || "flip").split(" "),
                e = c.offset ? c.offset.split(" ") : [0, 0],
                d, a, r;
            return g.nodeType === 9 ? (d = q.width(), a = q.height(), r = {
                top: 0,
                left: 0
            }) : g.setTimeout ? (d = q.width(), a = q.height(), r = {
                top: q.scrollTop(),
                left: q.scrollLeft()
            }) : g.preventDefault ? (c.at = "left top", d = a = 0, r = {
                top: c.of.pageY,
                left: c.of.pageX
            }) : (d = q.outerWidth(), a = q.outerHeight(), r = q.offset()), j.each(["my", "at"], function() {
                var b = (c[this] || "").split(" ");
                b.length === 1 && (b = p.test(b[0]) ? b.concat([n]) : o.test(b[0]) ? [n].concat(b) : [n, n]), b[0] = p.test(b[0]) ? b[0] : n, b[1] = o.test(b[1]) ? b[1] : n, c[this] = b
            }), f.length === 1 && (f[1] = f[0]), e[0] = parseInt(e[0], 10) || 0, e.length === 1 && (e[1] = e[0]), e[1] = parseInt(e[1], 10) || 0, c.at[0] === "right" ? r.left += d : c.at[0] === n && (r.left += d / 2), c.at[1] === "bottom" ? r.top += a : c.at[1] === n && (r.top += a / 2), r.left += e[0], r.top += e[1], this.each(function() {
                var z = j(this),
                    y = z.outerWidth(),
                    x = z.outerHeight(),
                    w = parseInt(j.curCSS(this, "marginLeft", !0)) || 0,
                    v = parseInt(j.curCSS(this, "marginTop", !0)) || 0,
                    u = y + w + (parseInt(j.curCSS(this, "marginRight", !0)) || 0),
                    t = x + v + (parseInt(j.curCSS(this, "marginBottom", !0)) || 0),
                    s = j.extend({}, r),
                    b;
                c.my[0] === "right" ? s.left -= y : c.my[0] === n && (s.left -= y / 2), c.my[1] === "bottom" ? s.top -= x : c.my[1] === n && (s.top -= x / 2), m.fractions || (s.left = Math.round(s.left), s.top = Math.round(s.top)), b = {
                    left: s.left - w,
                    top: s.top - v
                }, j.each(["left", "top"], function(A, h) {
                    j.ui.position[f[A]] && j.ui.position[f[A]][h](s, {
                        targetWidth: d,
                        targetHeight: a,
                        elemWidth: y,
                        elemHeight: x,
                        collisionPosition: b,
                        collisionWidth: u,
                        collisionHeight: t,
                        offset: e,
                        my: c.my,
                        at: c.at
                    })
                }), j.fn.bgiframe && z.bgiframe(), z.offset(j.extend(s, {
                    using: c.using
                }))
            })
        }, j.ui.position = {
            fit: {
                left: function(a, h) {
                    var g = j(window),
                        f = h.collisionPosition.left + h.collisionWidth - g.width() - g.scrollLeft();
                    a.left = f > 0 ? a.left - f : Math.max(a.left - h.collisionPosition.left, a.left)
                },
                top: function(a, h) {
                    var g = j(window),
                        f = h.collisionPosition.top + h.collisionHeight - g.height() - g.scrollTop();
                    a.top = f > 0 ? a.top - f : Math.max(a.top - h.collisionPosition.top, a.top)
                }
            },
            flip: {
                left: function(a, u) {
                    if (u.at[0] === n) {
                        return
                    }
                    var t = j(window),
                        s = u.collisionPosition.left + u.collisionWidth - t.width() - t.scrollLeft(),
                        r = u.my[0] === "left" ? -u.elemWidth : u.my[0] === "right" ? u.elemWidth : 0,
                        q = u.at[0] === "left" ? u.targetWidth : -u.targetWidth,
                        e = -2 * u.offset[0];
                    a.left += u.collisionPosition.left < 0 ? r + q + e : s > 0 ? r + q + e : 0
                },
                top: function(a, u) {
                    if (u.at[1] === n) {
                        return
                    }
                    var t = j(window),
                        s = u.collisionPosition.top + u.collisionHeight - t.height() - t.scrollTop(),
                        r = u.my[1] === "top" ? -u.elemHeight : u.my[1] === "bottom" ? u.elemHeight : 0,
                        q = u.at[1] === "top" ? u.targetHeight : -u.targetHeight,
                        e = -2 * u.offset[1];
                    a.top += u.collisionPosition.top < 0 ? r + q + e : s > 0 ? r + q + e : 0
                }
            }
        }, j.offset.setOffset || (j.offset.setOffset = function(a, v) {
            /static/.test(j.curCSS(a, "position")) && (a.style.position = "relative");
            var u = j(a),
                t = u.offset(),
                s = parseInt(j.curCSS(a, "top", !0), 10) || 0,
                r = parseInt(j.curCSS(a, "left", !0), 10) || 0,
                q = {
                    top: v.top - t.top + s,
                    left: v.left - t.left + r
                };
            "using" in v ? v.using.call(a, q) : u.css(q)
        }, j.fn.offset = function(a) {
            var d = this[0];
            return !d || !d.ownerDocument ? null : a ? j.isFunction(a) ? this.each(function(b) {
                j(this).offset(a.call(this, b, j(this).offset()))
            }) : this.each(function() {
                j.offset.setOffset(this, a)
            }) : k.call(this)
        }), j.curCSS || (j.curCSS = j.css),
        function() {
            var a = document.getElementsByTagName("body")[0],
                v = document.createElement("div"),
                u, t, s, r, q;
            u = document.createElement(a ? "div" : "body"), s = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            }, a && j.extend(s, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            });
            for (var f in s) {
                u.style[f] = s[f]
            }
            u.appendChild(v), t = a || document.documentElement, t.insertBefore(u, t.firstChild), v.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;", r = j(v).offset(function(d, c) {
                return c
            }).offset(), u.innerHTML = "", t.removeChild(u), q = r.top + r.left + (a ? 2000 : 0), m.fractions = q > 21 && q < 22
        }()
})(jQuery);
/*! jQuery UI - v1.8.23 - 2012-08-15
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.draggable.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(d, c) {
    d.widget("ui.draggable", d.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1
        },
        _create: function() {
            this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
        },
        destroy: function() {
            if (!this.element.data("draggable")) {
                return
            }
            return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this
        },
        _mouseCapture: function(a) {
            var e = this.options;
            return this.helper || e.disabled || d(a.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(a), this.handle ? (e.iframeFix && d(e.iframeFix === !0 ? "iframe" : e.iframeFix).each(function() {
                d('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1000
                }).css(d(this).offset()).appendTo("body")
            }), !0) : !1)
        },
        _mouseStart: function(a) {
            var e = this.options;
            return this.helper = this._createHelper(a), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), d.ui.ddmanager && (d.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, d.extend(this.offset, {
                click: {
                    left: a.pageX - this.offset.left,
                    top: a.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.originalPosition = this.position = this._generatePosition(a), this.originalPageX = a.pageX, this.originalPageY = a.pageY, e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt), e.containment && this._setContainment(), this._trigger("start", a) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), d.ui.ddmanager && !e.dropBehaviour && d.ui.ddmanager.prepareOffsets(this, a), this._mouseDrag(a, !0), d.ui.ddmanager && d.ui.ddmanager.dragStart(this, a), !0)
        },
        _mouseDrag: function(a, f) {
            this.position = this._generatePosition(a), this.positionAbs = this._convertPositionTo("absolute");
            if (!f) {
                var e = this._uiHash();
                if (this._trigger("drag", a, e) === !1) {
                    return this._mouseUp({}), !1
                }
                this.position = e.position
            }
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            return d.ui.ddmanager && d.ui.ddmanager.drag(this, a), !1
        },
        _mouseStop: function(a) {
            var j = !1;
            d.ui.ddmanager && !this.options.dropBehaviour && (j = d.ui.ddmanager.drop(this, a)), this.dropped && (j = this.dropped, this.dropped = !1);
            var i = this.element[0],
                h = !1;
            while (i && (i = i.parentNode)) {
                i == document && (h = !0)
            }
            if (!h && this.options.helper === "original") {
                return !1
            }
            if (this.options.revert == "invalid" && !j || this.options.revert == "valid" && j || this.options.revert === !0 || d.isFunction(this.options.revert) && this.options.revert.call(this.element, j)) {
                var g = this;
                d(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    g._trigger("stop", a) !== !1 && g._clear()
                })
            } else {
                this._trigger("stop", a) !== !1 && this._clear()
            }
            return !1
        },
        _mouseUp: function(a) {
            return this.options.iframeFix === !0 && d("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }), d.ui.ddmanager && d.ui.ddmanager.dragStop(this, a), d.ui.mouse.prototype._mouseUp.call(this, a)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },
        _getHandle: function(a) {
            var e = !this.options.handle || !d(this.options.handle, this.element).length ? !0 : !1;
            return d(this.options.handle, this.element).find("*").andSelf().each(function() {
                this == a.target && (e = !0)
            }), e
        },
        _createHelper: function(a) {
            var f = this.options,
                e = d.isFunction(f.helper) ? d(f.helper.apply(this.element[0], [a])) : f.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
            return e.parents("body").length || e.appendTo(f.appendTo == "parent" ? this.element[0].parentNode : f.appendTo), e[0] != this.element[0] && !/(fixed|absolute)/.test(e.css("position")) && e.css("position", "absolute"), e
        },
        _adjustOffsetFromHelper: function(a) {
            typeof a == "string" && (a = a.split(" ")), d.isArray(a) && (a = {
                left: +a[0],
                top: +a[1] || 0
            }), "left" in a && (this.offset.click.left = a.left + this.margins.left), "right" in a && (this.offset.click.left = this.helperProportions.width - a.right + this.margins.left), "top" in a && (this.offset.click.top = a.top + this.margins.top), "bottom" in a && (this.offset.click.top = this.helperProportions.height - a.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var a = this.offsetParent.offset();
            this.cssPosition == "absolute" && this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (a.left += this.scrollParent.scrollLeft(), a.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && false) {
                a = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: a.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: a.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var b = this.element.position();
                return {
                    top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var a = this.options;
            a.containment == "parent" && (a.containment = this.helper[0].parentNode);
            if (a.containment == "document" || a.containment == "window") {
                this.containment = [a.containment == "document" ? 0 : d(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a.containment == "document" ? 0 : d(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (a.containment == "document" ? 0 : d(window).scrollLeft()) + d(a.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a.containment == "document" ? 0 : d(window).scrollTop()) + (d(a.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!/^(document|window|parent)$/.test(a.containment) && a.containment.constructor != Array) {
                var j = d(a.containment),
                    i = j[0];
                if (!i) {
                    return
                }
                var h = j.offset(),
                    g = d(i).css("overflow") != "hidden";
                this.containment = [(parseInt(d(i).css("borderLeftWidth"), 10) || 0) + (parseInt(d(i).css("paddingLeft"), 10) || 0), (parseInt(d(i).css("borderTopWidth"), 10) || 0) + (parseInt(d(i).css("paddingTop"), 10) || 0), (g ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) - (parseInt(d(i).css("borderLeftWidth"), 10) || 0) - (parseInt(d(i).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (g ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) - (parseInt(d(i).css("borderTopWidth"), 10) || 0) - (parseInt(d(i).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = j
            } else {
                a.containment.constructor == Array && (this.containment = a.containment)
            }
        },
        _convertPositionTo: function(a, l) {
            l || (l = this.position);
            var k = a == "absolute" ? 1 : -1,
                j = this.options,
                i = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !d.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                h = /(html|body)/i.test(i[0].tagName);
            return {
                top: l.top + this.offset.relative.top * k + this.offset.parent.top * k - (false && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : h ? 0 : i.scrollTop()) * k),
                left: l.left + this.offset.relative.left * k + this.offset.parent.left * k - (false && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : h ? 0 : i.scrollLeft()) * k)
            }
        },
        _generatePosition: function(t) {
            var s = this.options,
                r = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !d.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                q = /(html|body)/i.test(r[0].tagName),
                p = t.pageX,
                o = t.pageY;
            if (this.originalPosition) {
                var n;
                if (this.containment) {
                    if (this.relative_container) {
                        var m = this.relative_container.offset();
                        n = [this.containment[0] + m.left, this.containment[1] + m.top, this.containment[2] + m.left, this.containment[3] + m.top]
                    } else {
                        n = this.containment
                    }
                    t.pageX - this.offset.click.left < n[0] && (p = n[0] + this.offset.click.left), t.pageY - this.offset.click.top < n[1] && (o = n[1] + this.offset.click.top), t.pageX - this.offset.click.left > n[2] && (p = n[2] + this.offset.click.left), t.pageY - this.offset.click.top > n[3] && (o = n[3] + this.offset.click.top)
                }
                if (s.grid) {
                    var l = s.grid[1] ? this.originalPageY + Math.round((o - this.originalPageY) / s.grid[1]) * s.grid[1] : this.originalPageY;
                    o = n ? l - this.offset.click.top < n[1] || l - this.offset.click.top > n[3] ? l - this.offset.click.top < n[1] ? l + s.grid[1] : l - s.grid[1] : l : l;
                    var a = s.grid[0] ? this.originalPageX + Math.round((p - this.originalPageX) / s.grid[0]) * s.grid[0] : this.originalPageX;
                    p = n ? a - this.offset.click.left < n[0] || a - this.offset.click.left > n[2] ? a - this.offset.click.left < n[0] ? a + s.grid[0] : a - s.grid[0] : a : a
                }
            }
            return {
                top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (false && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : q ? 0 : r.scrollTop()),
                left: p - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (false && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : q ? 0 : r.scrollLeft())
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
        },
        _trigger: function(a, f, e) {
            return e = e || this._uiHash(), d.ui.plugin.call(this, a, [f, e]), a == "drag" && (this.positionAbs = this._convertPositionTo("absolute")), d.Widget.prototype._trigger.call(this, a, f, e)
        },
        plugins: {},
        _uiHash: function(b) {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), d.extend(d.ui.draggable, {
        version: "1.8.23"
    }), d.ui.plugin.add("draggable", "connectToSortable", {
        start: function(a, j) {
            var i = d(this).data("draggable"),
                h = i.options,
                g = d.extend({}, j, {
                    item: i.element
                });
            i.sortables = [], d(h.connectToSortable).each(function() {
                var b = d.data(this, "sortable");
                b && !b.options.disabled && (i.sortables.push({
                    instance: b,
                    shouldRevert: b.options.revert
                }), b.refreshPositions(), b._trigger("activate", a, g))
            })
        },
        stop: function(a, h) {
            var g = d(this).data("draggable"),
                f = d.extend({}, h, {
                    item: g.element
                });
            d.each(g.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0, g.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(a), this.instance.options.helper = this.instance.options._helper, g.options.helper == "original" && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", a, f))
            })
        },
        drag: function(a, j) {
            var i = d(this).data("draggable"),
                h = this,
                g = function(s) {
                    var r = this.offset.click.top,
                        q = this.offset.click.left,
                        p = this.positionAbs.top,
                        o = this.positionAbs.left,
                        n = s.height,
                        m = s.width,
                        l = s.top,
                        k = s.left;
                    return d.ui.isOver(p + r, o + q, l, k, n, m)
                };
            d.each(i.sortables, function(b) {
                this.instance.positionAbs = i.positionAbs, this.instance.helperProportions = i.helperProportions, this.instance.offset.click = i.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = d(h).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                    return j.helper[0]
                }, a.target = this.instance.currentItem[0], this.instance._mouseCapture(a, !0), this.instance._mouseStart(a, !0, !0), this.instance.offset.click.top = i.offset.click.top, this.instance.offset.click.left = i.offset.click.left, this.instance.offset.parent.left -= i.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= i.offset.parent.top - this.instance.offset.parent.top, i._trigger("toSortable", a), i.dropped = this.instance.element, i.currentItem = i.element, this.instance.fromOutside = i), this.instance.currentItem && this.instance._mouseDrag(a)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", a, this.instance._uiHash(this.instance)), this.instance._mouseStop(a, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), i._trigger("fromSortable", a), i.dropped = !1)
            })
        }
    }), d.ui.plugin.add("draggable", "cursor", {
        start: function(a, h) {
            var g = d("body"),
                f = d(this).data("draggable").options;
            g.css("cursor") && (f._cursor = g.css("cursor")), g.css("cursor", f.cursor)
        },
        stop: function(a, f) {
            var e = d(this).data("draggable").options;
            e._cursor && d("body").css("cursor", e._cursor)
        }
    }), d.ui.plugin.add("draggable", "opacity", {
        start: function(a, h) {
            var g = d(h.helper),
                f = d(this).data("draggable").options;
            g.css("opacity") && (f._opacity = g.css("opacity")), g.css("opacity", f.opacity)
        },
        stop: function(a, f) {
            var e = d(this).data("draggable").options;
            e._opacity && d(f.helper).css("opacity", e._opacity)
        }
    }), d.ui.plugin.add("draggable", "scroll", {
        start: function(a, f) {
            var e = d(this).data("draggable");
            e.scrollParent[0] != document && e.scrollParent[0].tagName != "HTML" && (e.overflowOffset = e.scrollParent.offset())
        },
        drag: function(a, j) {
            var i = d(this).data("draggable"),
                h = i.options,
                g = !1;
            if (i.scrollParent[0] != document && i.scrollParent[0].tagName != "HTML") {
                if (!h.axis || h.axis != "x") {
                    i.overflowOffset.top + i.scrollParent[0].offsetHeight - a.pageY < h.scrollSensitivity ? i.scrollParent[0].scrollTop = g = i.scrollParent[0].scrollTop + h.scrollSpeed : a.pageY - i.overflowOffset.top < h.scrollSensitivity && (i.scrollParent[0].scrollTop = g = i.scrollParent[0].scrollTop - h.scrollSpeed)
                }
                if (!h.axis || h.axis != "y") {
                    i.overflowOffset.left + i.scrollParent[0].offsetWidth - a.pageX < h.scrollSensitivity ? i.scrollParent[0].scrollLeft = g = i.scrollParent[0].scrollLeft + h.scrollSpeed : a.pageX - i.overflowOffset.left < h.scrollSensitivity && (i.scrollParent[0].scrollLeft = g = i.scrollParent[0].scrollLeft - h.scrollSpeed)
                }
            } else {
                if (!h.axis || h.axis != "x") {
                    a.pageY - d(document).scrollTop() < h.scrollSensitivity ? g = d(document).scrollTop(d(document).scrollTop() - h.scrollSpeed) : d(window).height() - (a.pageY - d(document).scrollTop()) < h.scrollSensitivity && (g = d(document).scrollTop(d(document).scrollTop() + h.scrollSpeed))
                }
                if (!h.axis || h.axis != "y") {
                    a.pageX - d(document).scrollLeft() < h.scrollSensitivity ? g = d(document).scrollLeft(d(document).scrollLeft() - h.scrollSpeed) : d(window).width() - (a.pageX - d(document).scrollLeft()) < h.scrollSensitivity && (g = d(document).scrollLeft(d(document).scrollLeft() + h.scrollSpeed))
                }
            }
            g !== !1 && d.ui.ddmanager && !h.dropBehaviour && d.ui.ddmanager.prepareOffsets(i, a)
        }
    }), d.ui.plugin.add("draggable", "snap", {
        start: function(a, h) {
            var g = d(this).data("draggable"),
                f = g.options;
            g.snapElements = [], d(f.snap.constructor != String ? f.snap.items || ":data(draggable)" : f.snap).each(function() {
                var e = d(this),
                    i = e.offset();
                this != g.element[0] && g.snapElements.push({
                    item: this,
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    top: i.top,
                    left: i.left
                })
            })
        },
        drag: function(L, K) {
            var J = d(this).data("draggable"),
                I = J.options,
                H = I.snapTolerance,
                G = K.offset.left,
                F = G + J.helperProportions.width,
                E = K.offset.top,
                D = E + J.helperProportions.height;
            for (var C = J.snapElements.length - 1; C >= 0; C--) {
                var B = J.snapElements[C].left,
                    A = B + J.snapElements[C].width,
                    z = J.snapElements[C].top,
                    y = z + J.snapElements[C].height;
                if (!(B - H < G && G < A + H && z - H < E && E < y + H || B - H < G && G < A + H && z - H < D && D < y + H || B - H < F && F < A + H && z - H < E && E < y + H || B - H < F && F < A + H && z - H < D && D < y + H)) {
                    J.snapElements[C].snapping && J.options.snap.release && J.options.snap.release.call(J.element, L, d.extend(J._uiHash(), {
                        snapItem: J.snapElements[C].item
                    })), J.snapElements[C].snapping = !1;
                    continue
                }
                if (I.snapMode != "inner") {
                    var x = Math.abs(z - D) <= H,
                        w = Math.abs(y - E) <= H,
                        v = Math.abs(B - F) <= H,
                        u = Math.abs(A - G) <= H;
                    x && (K.position.top = J._convertPositionTo("relative", {
                        top: z - J.helperProportions.height,
                        left: 0
                    }).top - J.margins.top), w && (K.position.top = J._convertPositionTo("relative", {
                        top: y,
                        left: 0
                    }).top - J.margins.top), v && (K.position.left = J._convertPositionTo("relative", {
                        top: 0,
                        left: B - J.helperProportions.width
                    }).left - J.margins.left), u && (K.position.left = J._convertPositionTo("relative", {
                        top: 0,
                        left: A
                    }).left - J.margins.left)
                }
                var a = x || w || v || u;
                if (I.snapMode != "outer") {
                    var x = Math.abs(z - E) <= H,
                        w = Math.abs(y - D) <= H,
                        v = Math.abs(B - G) <= H,
                        u = Math.abs(A - F) <= H;
                    x && (K.position.top = J._convertPositionTo("relative", {
                        top: z,
                        left: 0
                    }).top - J.margins.top), w && (K.position.top = J._convertPositionTo("relative", {
                        top: y - J.helperProportions.height,
                        left: 0
                    }).top - J.margins.top), v && (K.position.left = J._convertPositionTo("relative", {
                        top: 0,
                        left: B
                    }).left - J.margins.left), u && (K.position.left = J._convertPositionTo("relative", {
                        top: 0,
                        left: A - J.helperProportions.width
                    }).left - J.margins.left)
                }!J.snapElements[C].snapping && (x || w || v || u || a) && J.options.snap.snap && J.options.snap.snap.call(J.element, L, d.extend(J._uiHash(), {
                    snapItem: J.snapElements[C].item
                })), J.snapElements[C].snapping = x || w || v || u || a
            }
        }
    }), d.ui.plugin.add("draggable", "stack", {
        start: function(a, j) {
            var i = d(this).data("draggable").options,
                h = d.makeArray(d(i.stack)).sort(function(e, f) {
                    return (parseInt(d(e).css("zIndex"), 10) || 0) - (parseInt(d(f).css("zIndex"), 10) || 0)
                });
            if (!h.length) {
                return
            }
            var g = parseInt(h[0].style.zIndex) || 0;
            d(h).each(function(b) {
                this.style.zIndex = g + b
            }), this[0].style.zIndex = g + h.length
        }
    }), d.ui.plugin.add("draggable", "zIndex", {
        start: function(a, h) {
            var g = d(h.helper),
                f = d(this).data("draggable").options;
            g.css("zIndex") && (f._zIndex = g.css("zIndex")), g.css("zIndex", f.zIndex)
        },
        stop: function(a, f) {
            var e = d(this).data("draggable").options;
            e._zIndex && d(f.helper).css("zIndex", e._zIndex)
        }
    })
})(jQuery);
/*! jQuery UI - v1.8.23 - 2012-08-15
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.resizable.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(f, e) {
    f.widget("ui.resizable", f.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1000
        },
        _create: function() {
            var a = this,
                n = this.options;
            this.element.addClass("ui-resizable"), f.extend(this, {
                _aspectRatio: !!n.aspectRatio,
                aspectRatio: n.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: n.helper || n.ghost || n.animate ? n.helper || "ui-resizable-helper" : null
            }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(f('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({
                marginLeft: this.originalElement.css("marginLeft"),
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom")
            }), this.originalElement.css({
                marginLeft: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0
            }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })), this.originalElement.css({
                margin: this.originalElement.css("margin")
            }), this._proportionallyResize()), this.handles = n.handles || (f(".ui-resizable-handle", this.element).length ? {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            } : "e,s,se");
            if (this.handles.constructor == String) {
                this.handles == "all" && (this.handles = "n,e,s,w,se,sw,ne,nw");
                var m = this.handles.split(",");
                this.handles = {};
                for (var l = 0; l < m.length; l++) {
                    var k = f.trim(m[l]),
                        j = "ui-resizable-" + k,
                        i = f('<div class="ui-resizable-handle ' + j + '"></div>');
                    i.css({
                        zIndex: n.zIndex
                    }), "se" == k && i.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[k] = ".ui-resizable-" + k, this.element.append(i)
                }
            }
            this._renderAxis = function(o) {
                o = o || this.element;
                for (var s in this.handles) {
                    this.handles[s].constructor == String && (this.handles[s] = f(this.handles[s], this.element).show());
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var r = f(this.handles[s], this.element),
                            q = 0;
                        q = /sw|ne|nw|se|n|s/.test(s) ? r.outerHeight() : r.outerWidth();
                        var p = ["padding", /ne|nw|n/.test(s) ? "Top" : /se|sw|s/.test(s) ? "Bottom" : /^e$/.test(s) ? "Right" : "Left"].join("");
                        o.css(p, q), this._proportionallyResize()
                    }
                    if (!f(this.handles[s]).length) {
                        continue
                    }
                }
            }, this._renderAxis(this.element), this._handles = f(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
                if (!a.resizing) {
                    if (this.className) {
                        var b = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
                    }
                    a.axis = b && b[1] ? b[1] : "se"
                }
            }), n.autoHide && (this._handles.hide(), f(this.element).addClass("ui-resizable-autohide").hover(function() {
                if (n.disabled) {
                    return
                }
                f(this).removeClass("ui-resizable-autohide"), a._handles.show()
            }, function() {
                if (n.disabled) {
                    return
                }
                a.resizing || (f(this).addClass("ui-resizable-autohide"), a._handles.hide())
            })), this._mouseInit()
        },
        destroy: function() {
            this._mouseDestroy();
            var a = function(c) {
                f(c).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                a(this.element);
                var d = this.element;
                d.after(this.originalElement.css({
                    position: d.css("position"),
                    width: d.outerWidth(),
                    height: d.outerHeight(),
                    top: d.css("top"),
                    left: d.css("left")
                })).remove()
            }
            return this.originalElement.css("resize", this.originalResizeStyle), a(this.originalElement), this
        },
        _mouseCapture: function(a) {
            var j = !1;
            for (var i in this.handles) {
                f(this.handles[i])[0] == a.target && (j = !0)
            }
            return !this.options.disabled && j
        },
        _mouseStart: function(a) {
            var n = this.options,
                m = this.element.position(),
                l = this.element;
            this.resizing = !0, this.documentScroll = {
                top: f(document).scrollTop(),
                left: f(document).scrollLeft()
            }, (l.is(".ui-draggable") || /absolute/.test(l.css("position"))) && l.css({
                position: "absolute",
                top: m.top,
                left: m.left
            }), this._renderProxy();
            var k = h(this.helper.css("left")),
                j = h(this.helper.css("top"));
            n.containment && (k += f(n.containment).scrollLeft() || 0, j += f(n.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: k,
                top: j
            }, this.size = this._helper ? {
                width: l.outerWidth(),
                height: l.outerHeight()
            } : {
                width: l.width(),
                height: l.height()
            }, this.originalSize = this._helper ? {
                width: l.outerWidth(),
                height: l.outerHeight()
            } : {
                width: l.width(),
                height: l.height()
            }, this.originalPosition = {
                left: k,
                top: j
            }, this.sizeDiff = {
                width: l.outerWidth() - l.width(),
                height: l.outerHeight() - l.height()
            }, this.originalMousePosition = {
                left: a.pageX,
                top: a.pageY
            }, this.aspectRatio = typeof n.aspectRatio == "number" ? n.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
            var c = f(".ui-resizable-" + this.axis).css("cursor");
            return f("body").css("cursor", c == "auto" ? this.axis + "-resize" : c), l.addClass("ui-resizable-resizing"), this._propagate("start", a), !0
        },
        _mouseDrag: function(z) {
            var y = this.helper,
                x = this.options,
                w = {},
                v = this,
                u = this.originalMousePosition,
                t = this.axis,
                s = z.pageX - u.left || 0,
                r = z.pageY - u.top || 0,
                q = this._change[t];
            if (!q) {
                return !1
            }
            var p = q.apply(this, [z, s, r]),
                o = false,
                a = this.sizeDiff;
            this._updateVirtualBoundaries(z.shiftKey);
            if (this._aspectRatio || z.shiftKey) {
                p = this._updateRatio(p, z)
            }
            return p = this._respectSize(p, z), this._propagate("resize", z), y.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            }), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(p), this._trigger("resize", z, this.ui()), !1
        },
        _mouseStop: function(t) {
            this.resizing = !1;
            var s = this.options,
                r = this;
            if (this._helper) {
                var q = this._proportionallyResizeElements,
                    p = q.length && /textarea/i.test(q[0].nodeName),
                    o = p && f.ui.hasScroll(q[0], "left") ? 0 : r.sizeDiff.height,
                    n = p ? 0 : r.sizeDiff.width,
                    m = {
                        width: r.helper.width() - n,
                        height: r.helper.height() - o
                    },
                    l = parseInt(r.element.css("left"), 10) + (r.position.left - r.originalPosition.left) || null,
                    a = parseInt(r.element.css("top"), 10) + (r.position.top - r.originalPosition.top) || null;
                s.animate || this.element.css(f.extend(m, {
                    top: a,
                    left: l
                })), r.helper.height(r.size.height), r.helper.width(r.size.width), this._helper && !s.animate && this._proportionallyResize()
            }
            return f("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1
        },
        _updateVirtualBoundaries: function(i) {
            var d = this.options,
                n, m, l, k, j;
            j = {
                minWidth: g(d.minWidth) ? d.minWidth : 0,
                maxWidth: g(d.maxWidth) ? d.maxWidth : Infinity,
                minHeight: g(d.minHeight) ? d.minHeight : 0,
                maxHeight: g(d.maxHeight) ? d.maxHeight : Infinity
            };
            if (this._aspectRatio || i) {
                n = j.minHeight * this.aspectRatio, l = j.minWidth / this.aspectRatio, m = j.maxHeight * this.aspectRatio, k = j.maxWidth / this.aspectRatio, n > j.minWidth && (j.minWidth = n), l > j.minHeight && (j.minHeight = l), m < j.maxWidth && (j.maxWidth = m), k < j.maxHeight && (j.maxHeight = k)
            }
            this._vBoundaries = j
        },
        _updateCache: function(d) {
            var c = this.options;
            this.offset = this.helper.offset(), g(d.left) && (this.position.left = d.left), g(d.top) && (this.position.top = d.top), g(d.height) && (this.size.height = d.height), g(d.width) && (this.size.width = d.width)
        },
        _updateRatio: function(i, d) {
            var m = this.options,
                l = this.position,
                k = this.size,
                j = this.axis;
            return g(i.height) ? i.width = i.height * this.aspectRatio : g(i.width) && (i.height = i.width / this.aspectRatio), j == "sw" && (i.left = l.left + (k.width - i.width), i.top = null), j == "nw" && (i.top = l.top + (k.height - i.height), i.left = l.left + (k.width - i.width)), i
        },
        _respectSize: function(D, C) {
            var B = this.helper,
                A = this._vBoundaries,
                z = this._aspectRatio || C.shiftKey,
                y = this.axis,
                x = g(D.width) && A.maxWidth && A.maxWidth < D.width,
                w = g(D.height) && A.maxHeight && A.maxHeight < D.height,
                v = g(D.width) && A.minWidth && A.minWidth > D.width,
                u = g(D.height) && A.minHeight && A.minHeight > D.height;
            v && (D.width = A.minWidth), u && (D.height = A.minHeight), x && (D.width = A.maxWidth), w && (D.height = A.maxHeight);
            var t = this.originalPosition.left + this.originalSize.width,
                s = this.position.top + this.size.height,
                r = /sw|nw|w/.test(y),
                q = /nw|ne|n/.test(y);
            v && r && (D.left = t - A.minWidth), x && r && (D.left = t - A.maxWidth), u && q && (D.top = s - A.minHeight), w && q && (D.top = s - A.maxHeight);
            var d = !D.width && !D.height;
            return d && !D.left && D.top ? D.top = null : d && !D.top && D.left && (D.left = null), D
        },
        _proportionallyResize: function() {
            var a = this.options;
            if (!this._proportionallyResizeElements.length) {
                return
            }
            var m = this.helper || this.element;
            for (var l = 0; l < this._proportionallyResizeElements.length; l++) {
                var k = this._proportionallyResizeElements[l];
                if (!this.borderDif) {
                    var j = [k.css("borderTopWidth"), k.css("borderRightWidth"), k.css("borderBottomWidth"), k.css("borderLeftWidth")],
                        i = [k.css("paddingTop"), k.css("paddingRight"), k.css("paddingBottom"), k.css("paddingLeft")];
                    this.borderDif = f.map(j, function(o, n) {
                        var q = parseInt(o, 10) || 0,
                            p = parseInt(i[n], 10) || 0;
                        return q + p
                    })
                }
                if (!f(m).is(":hidden") && !f(m).parents(":hidden").length) {
                    k.css({
                        height: m.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: m.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                } else {
                    continue
                }
            }
        },
        _renderProxy: function() {
            var a = this.element,
                l = this.options;
            this.elementOffset = a.offset();
            if (this._helper) {
                this.helper = this.helper || f('<div style="overflow:hidden;"></div>');
                var k = false,
                    j = k ? 1 : 0,
                    i = k ? 2 : -1;
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + i,
                    height: this.element.outerHeight() + i,
                    position: "absolute",
                    left: this.elementOffset.left - j + "px",
                    top: this.elementOffset.top - j + "px",
                    zIndex: ++l.zIndex
                }), this.helper.appendTo("body").disableSelection()
            } else {
                this.helper = this.element
            }
        },
        _change: {
            e: function(i, d, j) {
                return {
                    width: this.originalSize.width + d
                }
            },
            w: function(j, i, n) {
                var m = this.options,
                    l = this.originalSize,
                    k = this.originalPosition;
                return {
                    left: k.left + i,
                    width: l.width - i
                }
            },
            n: function(j, i, n) {
                var m = this.options,
                    l = this.originalSize,
                    k = this.originalPosition;
                return {
                    top: k.top + n,
                    height: l.height - n
                }
            },
            s: function(i, d, j) {
                return {
                    height: this.originalSize.height + j
                }
            },
            se: function(a, j, i) {
                return f.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [a, j, i]))
            },
            sw: function(a, j, i) {
                return f.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [a, j, i]))
            },
            ne: function(a, j, i) {
                return f.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [a, j, i]))
            },
            nw: function(a, j, i) {
                return f.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [a, j, i]))
            }
        },
        _propagate: function(a, d) {
            f.ui.plugin.call(this, a, [d, this.ui()]), a != "resize" && this._trigger(a, d, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }), f.extend(f.ui.resizable, {
        version: "1.8.23"
    }), f.ui.plugin.add("resizable", "alsoResize", {
        start: function(a, l) {
            var k = f(this).data("resizable"),
                j = k.options,
                i = function(c) {
                    f(c).each(function() {
                        var d = f(this);
                        d.data("resizable-alsoresize", {
                            width: parseInt(d.width(), 10),
                            height: parseInt(d.height(), 10),
                            left: parseInt(d.css("left"), 10),
                            top: parseInt(d.css("top"), 10)
                        })
                    })
                };
            typeof j.alsoResize == "object" && !j.alsoResize.parentNode ? j.alsoResize.length ? (j.alsoResize = j.alsoResize[0], i(j.alsoResize)) : f.each(j.alsoResize, function(b) {
                i(b)
            }) : i(j.alsoResize)
        },
        resize: function(a, p) {
            var o = f(this).data("resizable"),
                n = o.options,
                m = o.originalSize,
                l = o.originalPosition,
                k = {
                    height: o.size.height - m.height || 0,
                    width: o.size.width - m.width || 0,
                    top: o.position.top - l.top || 0,
                    left: o.position.left - l.left || 0
                },
                j = function(c, i) {
                    f(c).each(function() {
                        var d = f(this),
                            s = f(this).data("resizable-alsoresize"),
                            r = {},
                            q = i && i.length ? i : d.parents(p.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        f.each(q, function(u, t) {
                            var v = (s[t] || 0) + (k[t] || 0);
                            v && v >= 0 && (r[t] = v || null)
                        }), d.css(r)
                    })
                };
            typeof n.alsoResize == "object" && !n.alsoResize.nodeType ? f.each(n.alsoResize, function(d, c) {
                j(d, c)
            }) : j(n.alsoResize)
        },
        stop: function(a, d) {
            f(this).removeData("resizable-alsoresize")
        }
    }), f.ui.plugin.add("resizable", "animate", {
        stop: function(v, u) {
            var t = f(this).data("resizable"),
                s = t.options,
                r = t._proportionallyResizeElements,
                q = r.length && /textarea/i.test(r[0].nodeName),
                p = q && f.ui.hasScroll(r[0], "left") ? 0 : t.sizeDiff.height,
                o = q ? 0 : t.sizeDiff.width,
                n = {
                    width: t.size.width - o,
                    height: t.size.height - p
                },
                m = parseInt(t.element.css("left"), 10) + (t.position.left - t.originalPosition.left) || null,
                a = parseInt(t.element.css("top"), 10) + (t.position.top - t.originalPosition.top) || null;
            t.element.animate(f.extend(n, a && m ? {
                top: a,
                left: m
            } : {}), {
                duration: s.animateDuration,
                easing: s.animateEasing,
                step: function() {
                    var b = {
                        width: parseInt(t.element.css("width"), 10),
                        height: parseInt(t.element.css("height"), 10),
                        top: parseInt(t.element.css("top"), 10),
                        left: parseInt(t.element.css("left"), 10)
                    };
                    r && r.length && f(r[0]).css({
                        width: b.width,
                        height: b.height
                    }), t._updateCache(b), t._propagate("resize", v)
                }
            })
        }
    }), f.ui.plugin.add("resizable", "containment", {
        start: function(B, A) {
            var z = f(this).data("resizable"),
                y = z.options,
                x = z.element,
                w = y.containment,
                v = w instanceof f ? w.get(0) : /parent/.test(w) ? x.parent().get(0) : w;
            if (!v) {
                return
            }
            z.containerElement = f(v);
            if (/document/.test(w) || w == document) {
                z.containerOffset = {
                    left: 0,
                    top: 0
                }, z.containerPosition = {
                    left: 0,
                    top: 0
                }, z.parentData = {
                    element: f(document),
                    left: 0,
                    top: 0,
                    width: f(document).width(),
                    height: f(document).height() || document.body.parentNode.scrollHeight
                }
            } else {
                var u = f(v),
                    t = [];
                f(["Top", "Right", "Left", "Bottom"]).each(function(i, d) {
                    t[i] = h(u.css("padding" + d))
                }), z.containerOffset = u.offset(), z.containerPosition = u.position(), z.containerSize = {
                    height: u.innerHeight() - t[3],
                    width: u.innerWidth() - t[1]
                };
                var s = z.containerOffset,
                    r = z.containerSize.height,
                    q = z.containerSize.width,
                    c = f.ui.hasScroll(v, "left") ? v.scrollWidth : q,
                    a = f.ui.hasScroll(v) ? v.scrollHeight : r;
                z.parentData = {
                    element: v,
                    left: s.left,
                    top: s.top,
                    width: c,
                    height: a
                }
            }
        },
        resize: function(D, C) {
            var B = f(this).data("resizable"),
                A = B.options,
                z = B.containerSize,
                y = B.containerOffset,
                x = B.size,
                w = B.position,
                v = B._aspectRatio || D.shiftKey,
                u = {
                    top: 0,
                    left: 0
                },
                t = B.containerElement;
            t[0] != document && /static/.test(t.css("position")) && (u = y), w.left < (B._helper ? y.left : 0) && (B.size.width = B.size.width + (B._helper ? B.position.left - y.left : B.position.left - u.left), v && (B.size.height = B.size.width / B.aspectRatio), B.position.left = A.helper ? y.left : 0), w.top < (B._helper ? y.top : 0) && (B.size.height = B.size.height + (B._helper ? B.position.top - y.top : B.position.top), v && (B.size.width = B.size.height * B.aspectRatio), B.position.top = B._helper ? y.top : 0), B.offset.left = B.parentData.left + B.position.left, B.offset.top = B.parentData.top + B.position.top;
            var s = Math.abs((B._helper ? B.offset.left - u.left : B.offset.left - u.left) + B.sizeDiff.width),
                r = Math.abs((B._helper ? B.offset.top - u.top : B.offset.top - y.top) + B.sizeDiff.height),
                q = B.containerElement.get(0) == B.element.parent().get(0),
                a = /relative|absolute/.test(B.containerElement.css("position"));
            q && a && (s -= B.parentData.left), s + B.size.width >= B.parentData.width && (B.size.width = B.parentData.width - s, v && (B.size.height = B.size.width / B.aspectRatio)), r + B.size.height >= B.parentData.height && (B.size.height = B.parentData.height - r, v && (B.size.width = B.size.height * B.aspectRatio))
        },
        stop: function(x, w) {
            var v = f(this).data("resizable"),
                u = v.options,
                t = v.position,
                s = v.containerOffset,
                r = v.containerPosition,
                q = v.containerElement,
                p = f(v.helper),
                o = p.offset(),
                n = p.outerWidth() - v.sizeDiff.width,
                a = p.outerHeight() - v.sizeDiff.height;
            v._helper && !u.animate && /relative/.test(q.css("position")) && f(this).css({
                left: o.left - r.left - s.left,
                width: n,
                height: a
            }), v._helper && !u.animate && /static/.test(q.css("position")) && f(this).css({
                left: o.left - r.left - s.left,
                width: n,
                height: a
            })
        }
    }), f.ui.plugin.add("resizable", "ghost", {
        start: function(a, l) {
            var k = f(this).data("resizable"),
                j = k.options,
                i = k.size;
            k.ghost = k.originalElement.clone(), k.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: i.height,
                width: i.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof j.ghost == "string" ? j.ghost : ""), k.ghost.appendTo(k.helper)
        },
        resize: function(a, k) {
            var j = f(this).data("resizable"),
                i = j.options;
            j.ghost && j.ghost.css({
                position: "relative",
                height: j.size.height,
                width: j.size.width
            })
        },
        stop: function(a, k) {
            var j = f(this).data("resizable"),
                i = j.options;
            j.ghost && j.helper && j.helper.get(0).removeChild(j.ghost.get(0))
        }
    }), f.ui.plugin.add("resizable", "grid", {
        resize: function(v, u) {
            var t = f(this).data("resizable"),
                s = t.options,
                r = t.size,
                q = t.originalSize,
                p = t.originalPosition,
                o = t.axis,
                n = s._aspectRatio || v.shiftKey;
            s.grid = typeof s.grid == "number" ? [s.grid, s.grid] : s.grid;
            var m = Math.round((r.width - q.width) / (s.grid[0] || 1)) * (s.grid[0] || 1),
                a = Math.round((r.height - q.height) / (s.grid[1] || 1)) * (s.grid[1] || 1);
            /^(se|s|e)$/.test(o) ? (t.size.width = q.width + m, t.size.height = q.height + a) : /^(ne)$/.test(o) ? (t.size.width = q.width + m, t.size.height = q.height + a, t.position.top = p.top - a) : /^(sw)$/.test(o) ? (t.size.width = q.width + m, t.size.height = q.height + a, t.position.left = p.left - m) : (t.size.width = q.width + m, t.size.height = q.height + a, t.position.top = p.top - a, t.position.left = p.left - m)
        }
    });
    var h = function(b) {
            return parseInt(b, 10) || 0
        },
        g = function(b) {
            return !isNaN(parseInt(b, 10))
        }
})(jQuery);
/*! jQuery UI - v1.8.23 - 2012-08-15
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.selectable.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(d, c) {
    d.widget("ui.selectable", d.ui.mouse, {
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch"
        },
        _create: function() {
            var a = this;
            this.element.addClass("ui-selectable"), this.dragged = !1;
            var e;
            this.refresh = function() {
                e = d(a.options.filter, a.element[0]), e.addClass("ui-selectee"), e.each(function() {
                    var f = d(this),
                        g = f.offset();
                    d.data(this, "selectable-item", {
                        element: this,
                        $element: f,
                        left: g.left,
                        top: g.top,
                        right: g.left + f.outerWidth(),
                        bottom: g.top + f.outerHeight(),
                        startselected: !1,
                        selected: f.hasClass("ui-selected"),
                        selecting: f.hasClass("ui-selecting"),
                        unselecting: f.hasClass("ui-unselecting")
                    })
                })
            }, this.refresh(), this.selectees = e.addClass("ui-selectee"), this._mouseInit(), this.helper = d("<div class='ui-selectable-helper'></div>")
        },
        destroy: function() {
            return this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"), this._mouseDestroy(), this
        },
        _mouseStart: function(a) {
            var f = this;
            this.opos = [a.pageX, a.pageY];
            if (this.options.disabled) {
                return
            }
            var e = this.options;
            this.selectees = d(e.filter, this.element[0]), this._trigger("start", a), d(e.appendTo).append(this.helper), this.helper.css({
                left: a.clientX,
                top: a.clientY,
                width: 0,
                height: 0
            }), e.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                var b = d.data(this, "selectable-item");
                b.startselected = !0, !a.metaKey && !a.ctrlKey && (b.$element.removeClass("ui-selected"), b.selected = !1, b.$element.addClass("ui-unselecting"), b.unselecting = !0, f._trigger("unselecting", a, {
                    unselecting: b.element
                }))
            }), d(a.target).parents().andSelf().each(function() {
                var g = d.data(this, "selectable-item");
                if (g) {
                    var b = !a.metaKey && !a.ctrlKey || !g.$element.hasClass("ui-selected");
                    return g.$element.removeClass(b ? "ui-unselecting" : "ui-selected").addClass(b ? "ui-selecting" : "ui-unselecting"), g.unselecting = !b, g.selecting = b, g.selected = b, b ? f._trigger("selecting", a, {
                        selecting: g.element
                    }) : f._trigger("unselecting", a, {
                        unselecting: g.element
                    }), !1
                }
            })
        },
        _mouseDrag: function(a) {
            var p = this;
            this.dragged = !0;
            if (this.options.disabled) {
                return
            }
            var o = this.options,
                n = this.opos[0],
                m = this.opos[1],
                l = a.pageX,
                k = a.pageY;
            if (n > l) {
                var j = l;
                l = n, n = j
            }
            if (m > k) {
                var j = k;
                k = m, m = j
            }
            return this.helper.css({
                left: n,
                top: m,
                width: l - n,
                height: k - m
            }), this.selectees.each(function() {
                var e = d.data(this, "selectable-item");
                if (!e || e.element == p.element[0]) {
                    return
                }
                var b = !1;
                o.tolerance == "touch" ? b = !(e.left > l || e.right < n || e.top > k || e.bottom < m) : o.tolerance == "fit" && (b = e.left > n && e.right < l && e.top > m && e.bottom < k), b ? (e.selected && (e.$element.removeClass("ui-selected"), e.selected = !1), e.unselecting && (e.$element.removeClass("ui-unselecting"), e.unselecting = !1), e.selecting || (e.$element.addClass("ui-selecting"), e.selecting = !0, p._trigger("selecting", a, {
                    selecting: e.element
                }))) : (e.selecting && ((a.metaKey || a.ctrlKey) && e.startselected ? (e.$element.removeClass("ui-selecting"), e.selecting = !1, e.$element.addClass("ui-selected"), e.selected = !0) : (e.$element.removeClass("ui-selecting"), e.selecting = !1, e.startselected && (e.$element.addClass("ui-unselecting"), e.unselecting = !0), p._trigger("unselecting", a, {
                    unselecting: e.element
                }))), e.selected && !a.metaKey && !a.ctrlKey && !e.startselected && (e.$element.removeClass("ui-selected"), e.selected = !1, e.$element.addClass("ui-unselecting"), e.unselecting = !0, p._trigger("unselecting", a, {
                    unselecting: e.element
                })))
            }), !1
        },
        _mouseStop: function(a) {
            var f = this;
            this.dragged = !1;
            var e = this.options;
            return d(".ui-unselecting", this.element[0]).each(function() {
                var b = d.data(this, "selectable-item");
                b.$element.removeClass("ui-unselecting"), b.unselecting = !1, b.startselected = !1, f._trigger("unselected", a, {
                    unselected: b.element
                })
            }), d(".ui-selecting", this.element[0]).each(function() {
                var b = d.data(this, "selectable-item");
                b.$element.removeClass("ui-selecting").addClass("ui-selected"), b.selecting = !1, b.selected = !0, b.startselected = !0, f._trigger("selected", a, {
                    selected: b.element
                })
            }), this._trigger("stop", a), this.helper.remove(), !1
        }
    }), d.extend(d.ui.selectable, {
        version: "1.8.23"
    })
})(jQuery);
/*! jQuery UI - v1.8.23 - 2012-08-15
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.dialog.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(g, f) {
    var j = "ui-dialog ui-widget ui-widget-content ui-corner-all ",
        i = {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        h = {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0
        };
    g.widget("ui.dialog", {
        options: {
            autoOpen: !0,
            buttons: {},
            closeOnEscape: !0,
            closeText: "close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: !1,
            maxWidth: !1,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                collision: "fit",
                using: function(a) {
                    var d = g(this).css(a).offset().top;
                    d < 0 && g(this).css("top", a.top - d)
                }
            },
            resizable: !0,
            show: null,
            stack: !0,
            title: "",
            width: 300,
            zIndex: 1000
        },
        _create: function() {
            this.originalTitle = this.element.attr("title"), typeof this.originalTitle != "string" && (this.originalTitle = ""), this.options.title = this.options.title || this.originalTitle;
            var t = this,
                s = t.options,
                r = s.title || "&#160;",
                q = g.ui.dialog.getTitleId(t.element),
                p = (t.uiDialog = g("<div></div>")).appendTo(document.body).hide().addClass(j + s.dialogClass).css({
                    zIndex: s.zIndex
                }).attr("tabIndex", -1).css("outline", 0).keydown(function(b) {
                    s.closeOnEscape && !b.isDefaultPrevented() && b.keyCode && b.keyCode === g.ui.keyCode.ESCAPE && (t.close(b), b.preventDefault())
                }).attr({
                    role: "dialog",
                    "aria-labelledby": q
                }).mousedown(function(b) {
                    t.moveToTop(!1, b)
                }),
                o = t.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(p),
                n = (t.uiDialogTitlebar = g("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(p),
                m = g('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function() {
                    m.addClass("ui-state-hover")
                }, function() {
                    m.removeClass("ui-state-hover")
                }).focus(function() {
                    m.addClass("ui-state-focus")
                }).blur(function() {
                    m.removeClass("ui-state-focus")
                }).click(function(b) {
                    return t.close(b), !1
                }).appendTo(n),
                c = (t.uiDialogTitlebarCloseText = g("<span></span>")).addClass("ui-icon ui-icon-closethick").text(s.closeText).appendTo(m),
                a = g("<span></span>").addClass("ui-dialog-title").attr("id", q).html(r).prependTo(n);
            g.isFunction(s.beforeclose) && !g.isFunction(s.beforeClose) && (s.beforeClose = s.beforeclose), n.find("*").add(n).disableSelection(), s.draggable && g.fn.draggable && t._makeDraggable(), s.resizable && g.fn.resizable && t._makeResizable(), t._createButtons(s.buttons), t._isOpen = !1, g.fn.bgiframe && p.bgiframe()
        },
        _init: function() {
            this.options.autoOpen && this.open()
        },
        destroy: function() {
            var b = this;
            return b.overlay && b.overlay.destroy(), b.uiDialog.hide(), b.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), b.uiDialog.remove(), b.originalTitle && b.element.attr("title", b.originalTitle), b
        },
        widget: function() {
            return this.uiDialog
        },
        close: function(a) {
            var m = this,
                l, k;
            if (!1 === m._trigger("beforeClose", a)) {
                return
            }
            return m.overlay && m.overlay.destroy(), m.uiDialog.unbind("keypress.ui-dialog"), m._isOpen = !1, m.options.hide ? m.uiDialog.hide(m.options.hide, function() {
                m._trigger("close", a)
            }) : (m.uiDialog.hide(), m._trigger("close", a)), g.ui.dialog.overlay.resize(), m.options.modal && (l = 0, g(".ui-dialog").each(function() {
                this !== m.uiDialog[0] && (k = g(this).css("z-index"), isNaN(k) || (l = Math.max(l, k)))
            }), g.ui.dialog.maxZ = l), m
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function(a, n) {
            var m = this,
                l = m.options,
                k;
            return l.modal && !a || !l.stack && !l.modal ? m._trigger("focus", n) : (l.zIndex > g.ui.dialog.maxZ && (g.ui.dialog.maxZ = l.zIndex), m.overlay && (g.ui.dialog.maxZ += 1, m.overlay.$el.css("z-index", g.ui.dialog.overlay.maxZ = g.ui.dialog.maxZ)), k = {
                scrollTop: m.element.scrollTop(),
                scrollLeft: m.element.scrollLeft()
            }, g.ui.dialog.maxZ += 1, m.uiDialog.css("z-index", g.ui.dialog.maxZ), m.element.attr(k), m._trigger("focus", n), m)
        },
        open: function() {
            if (this._isOpen) {
                return
            }
            var a = this,
                k = a.options,
                e = a.uiDialog;
            return a.overlay = k.modal ? new g.ui.dialog.overlay(a) : null, a._size(), a._position(k.position), e.show(k.show), a.moveToTop(!0), k.modal && e.bind("keydown.ui-dialog", function(l) {
                if (l.keyCode !== g.ui.keyCode.TAB) {
                    return
                }
                var o = g(":tabbable", this),
                    n = o.filter(":first"),
                    m = o.filter(":last");
                if (l.target === m[0] && !l.shiftKey) {
                    return n.focus(1), !1
                }
                if (l.target === n[0] && l.shiftKey) {
                    return m.focus(1), !1
                }
            }), g(a.element.find(":tabbable").get().concat(e.find(".ui-dialog-buttonpane :tabbable").get().concat(e.get()))).eq(0).focus(), a._isOpen = !0, a._trigger("open"), a
        },
        _createButtons: function(a) {
            var n = this,
                m = !1,
                l = g("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
                k = g("<div></div>").addClass("ui-dialog-buttonset").appendTo(l);
            n.uiDialog.find(".ui-dialog-buttonpane").remove(), typeof a == "object" && a !== null && g.each(a, function() {
                return !(m = !0)
            }), m && (g.each(a, function(c, p) {
                p = g.isFunction(p) ? {
                    click: p,
                    text: c
                } : p;
                var o = g('<button type="button"></button>').click(function() {
                    p.click.apply(n.element[0], arguments)
                }).appendTo(k);
                g.each(p, function(e, d) {
                    if (e === "click") {
                        return
                    }
                    e in o ? o[e](d) : o.attr(e, d)
                }), g.fn.button && o.button()
            }), l.appendTo(n.uiDialog))
        },
        _makeDraggable: function() {
            function k(b) {
                return {
                    position: b.position,
                    offset: b.offset
                }
            }
            var a = this,
                n = a.options,
                m = g(document),
                l;
            a.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(c, b) {
                    l = n.height === "auto" ? "auto" : g(this).height(), g(this).height(g(this).height()).addClass("ui-dialog-dragging"), a._trigger("dragStart", c, k(b))
                },
                drag: function(b, d) {
                    a._trigger("drag", b, k(d))
                },
                stop: function(c, b) {
                    n.position = [b.position.left - m.scrollLeft(), b.position.top - m.scrollTop()], g(this).removeClass("ui-dialog-dragging").height(l), a._trigger("dragStop", c, k(b)), g.ui.dialog.overlay.resize()
                }
            })
        },
        _makeResizable: function(n) {
            function a(c) {
                return {
                    originalPosition: c.originalPosition,
                    originalSize: c.originalSize,
                    position: c.position,
                    size: c.size
                }
            }
            n = n === f ? this.options.resizable : n;
            var m = this,
                l = m.options,
                k = m.uiDialog.css("position"),
                b = typeof n == "string" ? n : "n,e,s,w,se,sw,ne,nw";
            m.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: m.element,
                maxWidth: l.maxWidth,
                maxHeight: l.maxHeight,
                minWidth: l.minWidth,
                minHeight: m._minHeight(),
                handles: b,
                start: function(d, e) {
                    g(this).addClass("ui-dialog-resizing"), m._trigger("resizeStart", d, a(e))
                },
                resize: function(d, c) {
                    m._trigger("resize", d, a(c))
                },
                stop: function(d, e) {
                    g(this).removeClass("ui-dialog-resizing"), l.height = g(this).height(), l.width = g(this).width(), m._trigger("resizeStop", d, a(e)), g.ui.dialog.overlay.resize()
                }
            }).css("position", k).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        },
        _minHeight: function() {
            var b = this.options;
            return b.height === "auto" ? b.minHeight : Math.min(b.minHeight, b.height)
        },
        _position: function(a) {
            var m = [],
                l = [0, 0],
                k;
            if (a) {
                if (typeof a == "string" || typeof a == "object" && "0" in a) {
                    m = a.split ? a.split(" ") : [a[0], a[1]], m.length === 1 && (m[1] = m[0]), g.each(["left", "top"], function(d, c) {
                        +m[d] === m[d] && (l[d] = m[d], m[d] = c)
                    }), a = {
                        my: m.join(" "),
                        at: m.join(" "),
                        offset: l.join(" ")
                    }
                }
                a = g.extend({}, g.ui.dialog.prototype.options.position, a)
            } else {
                a = g.ui.dialog.prototype.options.position
            }
            k = this.uiDialog.is(":visible"), k || this.uiDialog.show(), this.uiDialog.css({
                top: 0,
                left: 0
            }).position(g.extend({
                of: window
            }, a)), k || this.uiDialog.hide()
        },
        _setOptions: function(a) {
            var k = this,
                e = {},
                d = !1;
            g.each(a, function(l, c) {
                k._setOption(l, c), l in i && (d = !0), l in h && (e[l] = c)
            }), d && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", e)
        },
        _setOption: function(a, n) {
            var m = this,
                l = m.uiDialog;
            switch (a) {
                case "beforeclose":
                    a = "beforeClose";
                    break;
                case "buttons":
                    m._createButtons(n);
                    break;
                case "closeText":
                    m.uiDialogTitlebarCloseText.text("" + n);
                    break;
                case "dialogClass":
                    l.removeClass(m.options.dialogClass).addClass(j + n);
                    break;
                case "disabled":
                    n ? l.addClass("ui-dialog-disabled") : l.removeClass("ui-dialog-disabled");
                    break;
                case "draggable":
                    var k = l.is(":data(draggable)");
                    k && !n && l.draggable("destroy"), !k && n && m._makeDraggable();
                    break;
                case "position":
                    m._position(n);
                    break;
                case "resizable":
                    var c = l.is(":data(resizable)");
                    c && !n && l.resizable("destroy"), c && typeof n == "string" && l.resizable("option", "handles", n), !c && n !== !1 && m._makeResizable(n);
                    break;
                case "title":
                    g(".ui-dialog-title", m.uiDialogTitlebar).html("" + (n || "&#160;"))
            }
            g.Widget.prototype._setOption.apply(m, arguments)
        },
        _size: function() {
            var a = this.options,
                n, m, l = this.uiDialog.is(":visible");
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                height: 0
            }), a.minWidth > a.width && (a.width = a.minWidth), n = this.uiDialog.css({
                height: "auto",
                width: a.width
            }).height(), m = Math.max(0, a.minHeight - n);
            if (a.height === "auto") {
                if (g.support.minHeight) {
                    this.element.css({
                        minHeight: m,
                        height: "auto"
                    })
                } else {
                    this.uiDialog.show();
                    var k = this.element.css("height", "auto").height();
                    l || this.uiDialog.hide(), this.element.height(Math.max(k, m))
                }
            } else {
                this.element.height(Math.max(a.height - n, 0))
            }
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        }
    }), g.extend(g.ui.dialog, {
        version: "1.8.23",
        uuid: 0,
        maxZ: 0,
        getTitleId: function(d) {
            var c = d.attr("id");
            return c || (this.uuid += 1, c = this.uuid), "ui-dialog-title-" + c
        },
        overlay: function(a) {
            this.$el = g.ui.dialog.overlay.create(a)
        }
    }), g.extend(g.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: g.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function(b) {
            return b + ".dialog-overlay"
        }).join(" "),
        create: function(a) {
            this.instances.length === 0 && (setTimeout(function() {
                g.ui.dialog.overlay.instances.length && g(document).bind(g.ui.dialog.overlay.events, function(c) {
                    if (g(c.target).zIndex() < g.ui.dialog.overlay.maxZ) {
                        return !1
                    }
                })
            }, 1), g(document).bind("keydown.dialog-overlay", function(b) {
                a.options.closeOnEscape && !b.isDefaultPrevented() && b.keyCode && b.keyCode === g.ui.keyCode.ESCAPE && (a.close(b), b.preventDefault())
            }), g(window).bind("resize.dialog-overlay", g.ui.dialog.overlay.resize));
            var d = (this.oldInstances.pop() || g("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
                width: this.width(),
                height: this.height()
            });
            return g.fn.bgiframe && d.bgiframe(), this.instances.push(d), d
        },
        destroy: function(a) {
            var k = g.inArray(a, this.instances);
            k != -1 && this.oldInstances.push(this.instances.splice(k, 1)[0]), this.instances.length === 0 && g([document, window]).unbind(".dialog-overlay"), a.remove();
            var e = 0;
            g.each(this.instances, function() {
                e = Math.max(e, this.css("z-index"))
            }), this.maxZ = e
        },
        height: function() {
            var a, d;
            return false ? (a = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), d = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), a < d ? g(window).height() + "px" : a + "px") : g(document).height() + "px"
        },
        width: function() {
            var a, d;
            return false ? (a = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), d = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), a < d ? g(window).width() + "px" : a + "px") : g(document).width() + "px"
        },
        resize: function() {
            var a = g([]);
            g.each(g.ui.dialog.overlay.instances, function() {
                a = a.add(this)
            }), a.css({
                width: 0,
                height: 0
            }).css({
                width: g.ui.dialog.overlay.width(),
                height: g.ui.dialog.overlay.height()
            })
        }
    }), g.extend(g.ui.dialog.overlay.prototype, {
        destroy: function() {
            g.ui.dialog.overlay.destroy(this.$el)
        }
    })
})(jQuery);
/*!
 * jQuery UI Slider 1.8.24
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Slider
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.mouse.js
 *  jquery.ui.widget.js
 */
(function(b, c) {
    var a = 5;
    b.widget("ui.slider", b.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null
        },
        _create: function() {
            var e = this,
                k = this.options,
                j = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                h = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                d = (k.values && k.values.length) || 1,
                g = [];
            this._keySliding = false;
            this._mouseSliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all" + (k.disabled ? " ui-slider-disabled ui-disabled" : ""));
            this.range = b([]);
            if (k.range) {
                if (k.range === true) {
                    if (!k.values) {
                        k.values = [this._valueMin(), this._valueMin()]
                    }
                    if (k.values.length && k.values.length !== 2) {
                        k.values = [k.values[0], k.values[0]]
                    }
                }
                this.range = b("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + ((k.range === "min" || k.range === "max") ? " ui-slider-range-" + k.range : ""))
            }
            for (var f = j.length; f < d; f += 1) {
                g.push(h)
            }
            this.handles = j.add(b(g.join("")).appendTo(e.element));
            this.handle = this.handles.eq(0);
            this.handles.add(this.range).filter("a").click(function(i) {
                i.preventDefault()
            }).hover(function() {
                if (!k.disabled) {
                    b(this).addClass("ui-state-hover")
                }
            }, function() {
                b(this).removeClass("ui-state-hover")
            }).focus(function() {
                if (!k.disabled) {
                    b(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
                    b(this).addClass("ui-state-focus")
                } else {
                    b(this).blur()
                }
            }).blur(function() {
                b(this).removeClass("ui-state-focus")
            });
            this.handles.each(function(l) {
                b(this).data("index.ui-slider-handle", l)
            });
            this.handles.keydown(function(o) {
                var l = b(this).data("index.ui-slider-handle"),
                    p, m, i, n;
                if (e.options.disabled) {
                    return
                }
                switch (o.keyCode) {
                    case b.ui.keyCode.HOME:
                    case b.ui.keyCode.END:
                    case b.ui.keyCode.PAGE_UP:
                    case b.ui.keyCode.PAGE_DOWN:
                    case b.ui.keyCode.UP:
                    case b.ui.keyCode.RIGHT:
                    case b.ui.keyCode.DOWN:
                    case b.ui.keyCode.LEFT:
                        o.preventDefault();
                        if (!e._keySliding) {
                            e._keySliding = true;
                            b(this).addClass("ui-state-active");
                            p = e._start(o, l);
                            if (p === false) {
                                return
                            }
                        }
                        break
                }
                n = e.options.step;
                if (e.options.values && e.options.values.length) {
                    m = i = e.values(l)
                } else {
                    m = i = e.value()
                }
                switch (o.keyCode) {
                    case b.ui.keyCode.HOME:
                        i = e._valueMin();
                        break;
                    case b.ui.keyCode.END:
                        i = e._valueMax();
                        break;
                    case b.ui.keyCode.PAGE_UP:
                        i = e._trimAlignValue(m + ((e._valueMax() - e._valueMin()) / a));
                        break;
                    case b.ui.keyCode.PAGE_DOWN:
                        i = e._trimAlignValue(m - ((e._valueMax() - e._valueMin()) / a));
                        break;
                    case b.ui.keyCode.UP:
                    case b.ui.keyCode.RIGHT:
                        if (m === e._valueMax()) {
                            return
                        }
                        i = e._trimAlignValue(m + n);
                        break;
                    case b.ui.keyCode.DOWN:
                    case b.ui.keyCode.LEFT:
                        if (m === e._valueMin()) {
                            return
                        }
                        i = e._trimAlignValue(m - n);
                        break
                }
                e._slide(o, l, i)
            }).keyup(function(l) {
                var i = b(this).data("index.ui-slider-handle");
                if (e._keySliding) {
                    e._keySliding = false;
                    e._stop(l, i);
                    e._change(l, i);
                    b(this).removeClass("ui-state-active")
                }
            });
            this._refreshValue();
            this._animateOff = false
        },
        destroy: function() {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
            this._mouseDestroy();
            return this
        },
        _mouseCapture: function(f) {
            var g = this.options,
                j, l, e, h, n, k, m, i, d;
            if (g.disabled) {
                return false
            }
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            j = {
                x: f.pageX,
                y: f.pageY
            };
            l = this._normValueFromMouse(j);
            e = this._valueMax() - this._valueMin() + 1;
            n = this;
            this.handles.each(function(o) {
                var p = Math.abs(l - n.values(o));
                if (e > p) {
                    e = p;
                    h = b(this);
                    k = o
                }
            });
            if (g.range === true && this.values(1) === g.min) {
                k += 1;
                h = b(this.handles[k])
            }
            m = this._start(f, k);
            if (m === false) {
                return false
            }
            this._mouseSliding = true;
            n._handleIndex = k;
            h.addClass("ui-state-active");
            i = h.offset();
            d = !b(f.target).parents().andSelf().is(".ui-slider-handle");
            this._clickOffset = d ? {
                left: 0,
                top: 0
            } : {
                left: f.pageX - i.left - (h.width() / 2),
                top: f.pageY - i.top - (h.height() / 2) - (parseInt(h.css("borderTopWidth"), 10) || 0) - (parseInt(h.css("borderBottomWidth"), 10) || 0) + (parseInt(h.css("marginTop"), 10) || 0)
            };
            if (!this.handles.hasClass("ui-state-hover")) {
                this._slide(f, k, l)
            }
            this._animateOff = true;
            return true
        },
        _mouseStart: function(d) {
            return true
        },
        _mouseDrag: function(f) {
            var d = {
                    x: f.pageX,
                    y: f.pageY
                },
                e = this._normValueFromMouse(d);
            this._slide(f, this._handleIndex, e);
            return false
        },
        _mouseStop: function(d) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(d, this._handleIndex);
            this._change(d, this._handleIndex);
            this._handleIndex = null;
            this._clickOffset = null;
            this._animateOff = false;
            return false
        },
        _detectOrientation: function() {
            this.orientation = (this.options.orientation === "vertical") ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(e) {
            var d, h, g, f, i;
            if (this.orientation === "horizontal") {
                d = this.elementSize.width;
                h = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
            } else {
                d = this.elementSize.height;
                h = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
            }
            g = (h / d);
            if (g > 1) {
                g = 1
            }
            if (g < 0) {
                g = 0
            }
            if (this.orientation === "vertical") {
                g = 1 - g
            }
            f = this._valueMax() - this._valueMin();
            i = this._valueMin() + g * f;
            return this._trimAlignValue(i)
        },
        _start: function(f, e) {
            var d = {
                handle: this.handles[e],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                d.value = this.values(e);
                d.values = this.values()
            }
            return this._trigger("start", f, d)
        },
        _slide: function(h, g, f) {
            var d, e, i;
            if (this.options.values && this.options.values.length) {
                d = this.values(g ? 0 : 1);
                if ((this.options.values.length === 2 && this.options.range === true) && ((g === 0 && f > d) || (g === 1 && f < d))) {
                    f = d
                }
                if (f !== this.values(g)) {
                    e = this.values();
                    e[g] = f;
                    i = this._trigger("slide", h, {
                        handle: this.handles[g],
                        value: f,
                        values: e
                    });
                    d = this.values(g ? 0 : 1);
                    if (i !== false) {
                        this.values(g, f, true)
                    }
                }
            } else {
                if (f !== this.value()) {
                    i = this._trigger("slide", h, {
                        handle: this.handles[g],
                        value: f
                    });
                    if (i !== false) {
                        this.value(f)
                    }
                }
            }
        },
        _stop: function(f, e) {
            var d = {
                handle: this.handles[e],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                d.value = this.values(e);
                d.values = this.values()
            }
            this._trigger("stop", f, d)
        },
        _change: function(f, e) {
            if (!this._keySliding && !this._mouseSliding) {
                var d = {
                    handle: this.handles[e],
                    value: this.value()
                };
                if (this.options.values && this.options.values.length) {
                    d.value = this.values(e);
                    d.values = this.values()
                }
                this._trigger("change", f, d)
            }
        },
        value: function(d) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(d);
                this._refreshValue();
                this._change(null, 0);
                return
            }
            return this._value()
        },
        values: function(e, h) {
            var g, d, f;
            if (arguments.length > 1) {
                this.options.values[e] = this._trimAlignValue(h);
                this._refreshValue();
                this._change(null, e);
                return
            }
            if (arguments.length) {
                if (b.isArray(arguments[0])) {
                    g = this.options.values;
                    d = arguments[0];
                    for (f = 0; f < g.length; f += 1) {
                        g[f] = this._trimAlignValue(d[f]);
                        this._change(null, f)
                    }
                    this._refreshValue()
                } else {
                    if (this.options.values && this.options.values.length) {
                        return this._values(e)
                    } else {
                        return this.value()
                    }
                }
            } else {
                return this._values()
            }
        },
        _setOption: function(e, f) {
            var d, g = 0;
            if (b.isArray(this.options.values)) {
                g = this.options.values.length
            }
            b.Widget.prototype._setOption.apply(this, arguments);
            switch (e) {
                case "disabled":
                    if (f) {
                        this.handles.filter(".ui-state-focus").blur();
                        this.handles.removeClass("ui-state-hover");
                        this.handles.propAttr("disabled", true);
                        this.element.addClass("ui-disabled")
                    } else {
                        this.handles.propAttr("disabled", false);
                        this.element.removeClass("ui-disabled")
                    }
                    break;
                case "orientation":
                    this._detectOrientation();
                    this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                    this._refreshValue();
                    break;
                case "value":
                    this._animateOff = true;
                    this._refreshValue();
                    this._change(null, 0);
                    this._animateOff = false;
                    break;
                case "values":
                    this._animateOff = true;
                    this._refreshValue();
                    for (d = 0; d < g; d += 1) {
                        this._change(null, d)
                    }
                    this._animateOff = false;
                    break
            }
        },
        _value: function() {
            var d = this.options.value;
            d = this._trimAlignValue(d);
            return d
        },
        _values: function(d) {
            var g, f, e;
            if (arguments.length) {
                g = this.options.values[d];
                g = this._trimAlignValue(g);
                return g
            } else {
                f = this.options.values.slice();
                for (e = 0; e < f.length; e += 1) {
                    f[e] = this._trimAlignValue(f[e])
                }
                return f
            }
        },
        _trimAlignValue: function(g) {
            if (g <= this._valueMin()) {
                return this._valueMin()
            }
            if (g >= this._valueMax()) {
                return this._valueMax()
            }
            var d = (this.options.step > 0) ? this.options.step : 1,
                f = (g - this._valueMin()) % d,
                e = g - f;
            if (Math.abs(f) * 2 >= d) {
                e += (f > 0) ? d : (-d)
            }
            return parseFloat(e.toFixed(5))
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.options.max
        },
        _refreshValue: function() {
            var g = this.options.range,
                f = this.options,
                m = this,
                e = (!this._animateOff) ? f.animate : false,
                h, d = {},
                i, k, j, l;
            if (this.options.values && this.options.values.length) {
                this.handles.each(function(o, n) {
                    h = (m.values(o) - m._valueMin()) / (m._valueMax() - m._valueMin()) * 100;
                    d[m.orientation === "horizontal" ? "left" : "bottom"] = h + "%";
                    b(this).stop(1, 1)[e ? "animate" : "css"](d, f.animate);
                    if (m.options.range === true) {
                        if (m.orientation === "horizontal") {
                            if (o === 0) {
                                m.range.stop(1, 1)[e ? "animate" : "css"]({
                                    left: h + "%"
                                }, f.animate)
                            }
                            if (o === 1) {
                                m.range[e ? "animate" : "css"]({
                                    width: (h - i) + "%"
                                }, {
                                    queue: false,
                                    duration: f.animate
                                })
                            }
                        } else {
                            if (o === 0) {
                                m.range.stop(1, 1)[e ? "animate" : "css"]({
                                    bottom: (h) + "%"
                                }, f.animate)
                            }
                            if (o === 1) {
                                m.range[e ? "animate" : "css"]({
                                    height: (h - i) + "%"
                                }, {
                                    queue: false,
                                    duration: f.animate
                                })
                            }
                        }
                    }
                    i = h
                })
            } else {
                k = this.value();
                j = this._valueMin();
                l = this._valueMax();
                h = (l !== j) ? (k - j) / (l - j) * 100 : 0;
                d[m.orientation === "horizontal" ? "left" : "bottom"] = h + "%";
                this.handle.stop(1, 1)[e ? "animate" : "css"](d, f.animate);
                if (g === "min" && this.orientation === "horizontal") {
                    this.range.stop(1, 1)[e ? "animate" : "css"]({
                        width: h + "%"
                    }, f.animate)
                }
                if (g === "max" && this.orientation === "horizontal") {
                    this.range[e ? "animate" : "css"]({
                        width: (100 - h) + "%"
                    }, {
                        queue: false,
                        duration: f.animate
                    })
                }
                if (g === "min" && this.orientation === "vertical") {
                    this.range.stop(1, 1)[e ? "animate" : "css"]({
                        height: h + "%"
                    }, f.animate)
                }
                if (g === "max" && this.orientation === "vertical") {
                    this.range[e ? "animate" : "css"]({
                        height: (100 - h) + "%"
                    }, {
                        queue: false,
                        duration: f.animate
                    })
                }
            }
        }
    });
    b.extend(b.ui.slider, {
        version: "1.8.24"
    })
}(jQuery));
(function(e) {
    var b = {},
        k, m, o, j = false,
        a = false;
    e.tooltip = {
        blocked: false,
        defaults: {
            delay: 200,
            fade: false,
            showURL: true,
            extraClass: "",
            top: 15,
            left: 15,
            id: "tooltip"
        },
        block: function() {
            e.tooltip.blocked = !e.tooltip.blocked
        }
    };
    e.fn.extend({
        tooltip: function(p) {
            p = e.extend({}, e.tooltip.defaults, p);
            h(p);
            return this.each(function() {
                e.data(this, "tooltip", p);
                this.tOpacity = b.parent.css("opacity");
                this.tooltipText = this.title;
                e(this).removeAttr("title");
                this.alt = ""
            }).mouseover(l).mouseout(f)
        },
        fixPNG: j ? function() {
            return this.each(function() {
                var p = e(this).css("backgroundImage");
                if (p.match(/^url\(["']?(.*\.png)["']?\)$/i)) {
                    p = RegExp.$1;
                    e(this).css({
                        backgroundImage: "none",
                        filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + p + "')"
                    }).each(function() {
                        var q = e(this).css("position");
                        if (q != "absolute" && q != "relative") {
                            e(this).css("position", "relative")
                        }
                    })
                }
            })
        } : function() {
            return this
        },
        unfixPNG: j ? function() {
            return this.each(function() {
                e(this).css({
                    filter: "",
                    backgroundImage: ""
                })
            })
        } : function() {
            return this
        },
        hideWhenEmpty: function() {
            return this.each(function() {
                e(this)[e(this).html() ? "show" : "hide"]()
            })
        },
        url: function() {
            return this.attr("href") || this.attr("src")
        }
    });

    function h(p) {
        if (b.parent) {
            return
        }
        b.parent = e('<div id="' + p.id + '"><label></label><div class="body"></div><div class="url"></div></div>').appendTo(document.body).hide();
        if (e.fn.bgiframe) {
            b.parent.bgiframe()
        }
        b.title = e("label", b.parent);
        b.body = e("div.body", b.parent);
        b.url = e("div.url", b.parent)
    }

    function c(p) {
        return e.data(p, "tooltip")
    }

    function g(p) {
        if (c(this).delay) {
            o = setTimeout(n, c(this).delay)
        } else {
            n()
        }
        a = !!c(this).track;
        e(document.body).bind("mousemove", d);
        d(p)
    }

    function l() {
        if (e.tooltip.blocked || this == k || (!this.tooltipText && !c(this).bodyHandler)) {
            return
        }
        k = this;
        m = this.tooltipText;
        if (c(this).bodyHandler) {
            b.title.hide();
            var s = c(this).bodyHandler.call(this);
            if (s.nodeType || s.jquery) {
                b.body.empty().append(s)
            } else {
                b.body.html(s)
            }
            b.body.show()
        } else {
            if (c(this).showBody) {
                var r = m.split(c(this).showBody);
                b.title.html(r.shift()).show();
                b.body.empty();
                for (var q = 0, p;
                    (p = r[q]); q++) {
                    if (q > 0) {
                        b.body.append("<br/>")
                    }
                    b.body.append(p)
                }
                b.body.hideWhenEmpty()
            } else {
                b.title.html(m).show();
                b.body.hide()
            }
        }
        if (c(this).showURL && e(this).url()) {
            b.url.html(e(this).url().replace("http://", "")).show()
        } else {
            b.url.hide()
        }
        b.parent.addClass(c(this).extraClass);
        if (c(this).fixPNG) {
            b.parent.fixPNG()
        }
        g.apply(this, arguments)
    }

    function n() {
        o = null;
        if ((!j || !e.fn.bgiframe) && c(k).fade) {
            if (b.parent.is(":animated")) {
                b.parent.stop().show().fadeTo(c(k).fade, k.tOpacity)
            } else {
                b.parent.is(":visible") ? b.parent.fadeTo(c(k).fade, k.tOpacity) : b.parent.fadeIn(c(k).fade)
            }
        } else {
            b.parent.show()
        }
        d()
    }

    function d(s) {
        if (e.tooltip.blocked) {
            return
        }
        if (s && s.target.tagName == "OPTION") {
            return
        }
        if (!a && b.parent.is(":visible")) {
            e(document.body).unbind("mousemove", d)
        }
        if (k == null) {
            e(document.body).unbind("mousemove", d);
            return
        }
        b.parent.removeClass("viewport-right").removeClass("viewport-bottom");
        var u = b.parent[0].offsetLeft;
        var t = b.parent[0].offsetTop;
        if (s) {
            u = s.pageX + c(k).left;
            t = s.pageY + c(k).top;
            var q = "auto";
            if (c(k).positionLeft) {
                q = e(window).width() - u;
                u = "auto"
            }
            b.parent.css({
                left: u,
                right: q,
                top: t
            })
        }
        var p = i(),
            r = b.parent[0];
        if (p.x + p.cx < r.offsetLeft + r.offsetWidth) {
            u -= r.offsetWidth + 20 + c(k).left;
            b.parent.css({
                left: u + "px"
            }).addClass("viewport-right")
        }
        if (p.y + p.cy < r.offsetTop + r.offsetHeight) {
            t -= r.offsetHeight + 20 + c(k).top;
            b.parent.css({
                top: t + "px"
            }).addClass("viewport-bottom")
        }
    }

    function i() {
        return {
            x: e(window).scrollLeft(),
            y: e(window).scrollTop(),
            cx: e(window).width(),
            cy: e(window).height()
        }
    }

    function f(r) {
        if (e.tooltip.blocked) {
            return
        }
        if (o) {
            clearTimeout(o)
        }
        k = null;
        var q = c(this);

        function p() {
            b.parent.removeClass(q.extraClass).hide().css("opacity", "")
        }
        if ((!j || !e.fn.bgiframe) && q.fade) {
            if (b.parent.is(":animated")) {
                b.parent.stop().fadeTo(q.fade, 0, p)
            } else {
                b.parent.stop().fadeOut(q.fade, p)
            }
        } else {
            p()
        }
        if (c(this).fixPNG) {
            b.parent.unfixPNG()
        }
    }
})(jQuery);