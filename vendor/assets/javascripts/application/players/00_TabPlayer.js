(function e(b, g, d) {
    function c(m, j) {
        if (!g[m]) {
            if (!b[m]) {
                var i = typeof require == "function" && require;
                if (!j && i) {
                    return i(m, !0)
                }
                if (a) {
                    return a(m, !0)
                }
                var k = new Error("Cannot find module '" + m + "'");
                throw k.code = "MODULE_NOT_FOUND", k
            }
            var h = g[m] = {
                exports: {}
            };
            b[m][0].call(h.exports, function(l) {
                var o = b[m][1][l];
                return c(o ? o : l)
            }, h, h.exports, e, b, g, d)
        }
        return g[m].exports
    }
    var a = typeof require == "function" && require;
    for (var f = 0; f < d.length; f++) {
        c(d[f])
    }
    return c
})({
    1: [function(b, c, a) {
        var d = b("../main");
        if (typeof define === "function" && define.amd) {
            define(d)
        } else {
            window.PerfectScrollbar = d;
            if (typeof window.Ps === "undefined") {
                window.Ps = d
            }
        }
    }, {
        "../main": 7
    }],
    2: [function(c, d, b) {
        function a(h, i) {
            var g = h.className.split(" ");
            if (g.indexOf(i) < 0) {
                g.push(i)
            }
            h.className = g.join(" ")
        }

        function f(i, j) {
            var h = i.className.split(" ");
            var g = h.indexOf(j);
            if (g >= 0) {
                h.splice(g, 1)
            }
            i.className = h.join(" ")
        }
        b.add = function(g, h) {
            if (g.classList) {
                g.classList.add(h)
            } else {
                a(g, h)
            }
        };
        b.remove = function(g, h) {
            if (g.classList) {
                g.classList.remove(h)
            } else {
                f(g, h)
            }
        };
        b.list = function(g) {
            if (g.classList) {
                return Array.prototype.slice.apply(g.classList)
            } else {
                return g.className.split(" ")
            }
        }
    }, {}],
    3: [function(c, f, b) {
        var h = {};
        h.e = function(j, k) {
            var i = document.createElement(j);
            i.className = k;
            return i
        };
        h.appendTo = function(j, i) {
            i.appendChild(j);
            return j
        };

        function g(j, i) {
            return window.getComputedStyle(j)[i]
        }

        function a(k, j, i) {
            if (typeof i === "number") {
                i = i.toString() + "px"
            }
            k.style[j] = i;
            return k
        }

        function d(j, k) {
            for (var i in k) {
                var l = k[i];
                if (typeof l === "number") {
                    l = l.toString() + "px"
                }
                j.style[i] = l
            }
            return j
        }
        h.css = function(j, k, i) {
            if (typeof k === "object") {
                return d(j, k)
            } else {
                if (typeof i === "undefined") {
                    return g(j, k)
                } else {
                    return a(j, k, i)
                }
            }
        };
        h.matches = function(i, j) {
            if (typeof i.matches !== "undefined") {
                return i.matches(j)
            } else {
                if (typeof i.matchesSelector !== "undefined") {
                    return i.matchesSelector(j)
                } else {
                    if (typeof i.webkitMatchesSelector !== "undefined") {
                        return i.webkitMatchesSelector(j)
                    } else {
                        if (typeof i.mozMatchesSelector !== "undefined") {
                            return i.mozMatchesSelector(j)
                        } else {
                            if (typeof i.msMatchesSelector !== "undefined") {
                                return i.msMatchesSelector(j)
                            }
                        }
                    }
                }
            }
        };
        h.remove = function(i) {
            if (typeof i.remove !== "undefined") {
                i.remove()
            } else {
                if (i.parentNode) {
                    i.parentNode.removeChild(i)
                }
            }
        };
        h.queryChildren = function(j, i) {
            return Array.prototype.filter.call(j.childNodes, function(k) {
                return h.matches(k, i)
            })
        };
        f.exports = h
    }, {}],
    4: [function(d, f, a) {
        var c = function(g) {
            this.element = g;
            this.events = {}
        };
        c.prototype.bind = function(g, h) {
            if (typeof this.events[g] === "undefined") {
                this.events[g] = []
            }
            this.events[g].push(h);
            this.element.addEventListener(g, h, false)
        };
        c.prototype.unbind = function(g, i) {
            var h = (typeof i !== "undefined");
            this.events[g] = this.events[g].filter(function(j) {
                if (h && j !== i) {
                    return true
                }
                this.element.removeEventListener(g, j, false);
                return false
            }, this)
        };
        c.prototype.unbindAll = function() {
            for (var g in this.events) {
                this.unbind(g)
            }
        };
        var b = function() {
            this.eventElements = []
        };
        b.prototype.eventElement = function(h) {
            var g = this.eventElements.filter(function(i) {
                return i.element === h
            })[0];
            if (typeof g === "undefined") {
                g = new c(h);
                this.eventElements.push(g)
            }
            return g
        };
        b.prototype.bind = function(h, g, i) {
            this.eventElement(h).bind(g, i)
        };
        b.prototype.unbind = function(h, g, i) {
            this.eventElement(h).unbind(g, i)
        };
        b.prototype.unbindAll = function() {
            for (var g = 0; g < this.eventElements.length; g++) {
                this.eventElements[g].unbindAll()
            }
        };
        b.prototype.once = function(j, h, k) {
            var g = this.eventElement(j);
            var i = function(l) {
                g.unbind(h, i);
                k(l)
            };
            g.bind(h, i)
        };
        f.exports = b
    }, {}],
    5: [function(b, c, a) {
        c.exports = (function() {
            function d() {
                return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1)
            }
            return function() {
                return d() + d() + "-" + d() + "-" + d() + "-" + d() + "-" + d() + d() + d()
            }
        })()
    }, {}],
    6: [function(c, f, b) {
        var a = c("./class"),
            g = c("./dom");
        b.toInt = function(d) {
            return parseInt(d, 10) || 0
        };
        b.clone = function(i) {
            if (i === null) {
                return null
            } else {
                if (typeof i === "object") {
                    var d = {};
                    for (var h in i) {
                        d[h] = this.clone(i[h])
                    }
                    return d
                } else {
                    return i
                }
            }
        };
        b.extend = function(i, j) {
            var d = this.clone(i);
            for (var h in j) {
                d[h] = this.clone(j[h])
            }
            return d
        };
        b.isEditable = function(d) {
            return g.matches(d, "input,[contenteditable]") || g.matches(d, "select,[contenteditable]") || g.matches(d, "textarea,[contenteditable]") || g.matches(d, "button,[contenteditable]")
        };
        b.removePsClasses = function(h) {
            var k = a.list(h);
            for (var d = 0; d < k.length; d++) {
                var j = k[d];
                if (j.indexOf("ps-") === 0) {
                    a.remove(h, j)
                }
            }
        };
        b.outerWidth = function(d) {
            return this.toInt(g.css(d, "width")) + this.toInt(g.css(d, "paddingLeft")) + this.toInt(g.css(d, "paddingRight")) + this.toInt(g.css(d, "borderLeftWidth")) + this.toInt(g.css(d, "borderRightWidth"))
        };
        b.startScrolling = function(d, h) {
            a.add(d, "ps-in-scrolling");
            if (typeof h !== "undefined") {
                a.add(d, "ps-" + h)
            } else {
                a.add(d, "ps-x");
                a.add(d, "ps-y")
            }
        };
        b.stopScrolling = function(d, h) {
            a.remove(d, "ps-in-scrolling");
            if (typeof h !== "undefined") {
                a.remove(d, "ps-" + h)
            } else {
                a.remove(d, "ps-x");
                a.remove(d, "ps-y")
            }
        };
        b.env = {
            isWebKit: "WebkitAppearance" in document.documentElement.style,
            supportsTouch: (("ontouchstart" in window) || window.DocumentTouch && document instanceof window.DocumentTouch),
            supportsIePointer: window.navigator.msMaxTouchPoints !== null
        }
    }, {
        "./class": 2,
        "./dom": 3
    }],
    7: [function(c, f, b) {
        var d = c("./plugin/destroy"),
            a = c("./plugin/initialize"),
            g = c("./plugin/update");
        f.exports = {
            initialize: a,
            update: g,
            destroy: d
        }
    }, {
        "./plugin/destroy": 9,
        "./plugin/initialize": 17,
        "./plugin/update": 21
    }],
    8: [function(b, c, a) {
        c.exports = {
            maxScrollbarLength: null,
            minScrollbarLength: null,
            scrollXMarginOffset: 0,
            scrollYMarginOffset: 0,
            stopPropagationOnClick: true,
            suppressScrollX: false,
            suppressScrollY: false,
            swipePropagation: true,
            useBothWheelAxes: false,
            useKeyboard: true,
            useSelectionScroll: false,
            wheelPropagation: false,
            wheelSpeed: 1,
            theme: "default"
        }
    }, {}],
    9: [function(b, c, a) {
        var i = b("../lib/dom"),
            f = b("../lib/helper"),
            g = b("./instances");
        c.exports = function(h) {
            var d = g.get(h);
            if (!d) {
                return
            }
            d.event.unbindAll();
            i.remove(d.scrollbarX);
            i.remove(d.scrollbarY);
            i.remove(d.scrollbarXRail);
            i.remove(d.scrollbarYRail);
            f.removePsClasses(h);
            g.remove(h)
        }
    }, {
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18
    }],
    10: [function(b, c, a) {
        var d = b("../../lib/helper"),
            i = b("../instances"),
            g = b("../update-geometry"),
            j = b("../update-scroll");

        function f(m, l) {
            function k(n) {
                return n.getBoundingClientRect()
            }
            var h = window.Event.prototype.stopPropagation.bind;
            if (l.settings.stopPropagationOnClick) {
                l.event.bind(l.scrollbarY, "click", h)
            }
            l.event.bind(l.scrollbarYRail, "click", function(r) {
                var n = d.toInt(l.scrollbarYHeight / 2);
                var p = l.railYRatio * (r.pageY - window.pageYOffset - k(l.scrollbarYRail).top - n);
                var q = l.railYRatio * (l.railYHeight - l.scrollbarYHeight);
                var o = p / q;
                if (o < 0) {
                    o = 0
                } else {
                    if (o > 1) {
                        o = 1
                    }
                }
                j(m, "top", (l.contentHeight - l.containerHeight) * o);
                g(m);
                r.stopPropagation()
            });
            if (l.settings.stopPropagationOnClick) {
                l.event.bind(l.scrollbarX, "click", h)
            }
            l.event.bind(l.scrollbarXRail, "click", function(r) {
                var n = d.toInt(l.scrollbarXWidth / 2);
                var o = l.railXRatio * (r.pageX - window.pageXOffset - k(l.scrollbarXRail).left - n);
                var q = l.railXRatio * (l.railXWidth - l.scrollbarXWidth);
                var p = o / q;
                if (p < 0) {
                    p = 0
                } else {
                    if (p > 1) {
                        p = 1
                    }
                }
                j(m, "left", ((l.contentWidth - l.containerWidth) * p) - l.negativeScrollAdjustment);
                g(m);
                r.stopPropagation()
            })
        }
        c.exports = function(k) {
            var h = i.get(k);
            f(k, h)
        }
    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    11: [function(g, c, i) {
        var l = g("../../lib/dom"),
            j = g("../../lib/helper"),
            a = g("../instances"),
            b = g("../update-geometry"),
            f = g("../update-scroll");

        function m(p, o) {
            var r = null;
            var n = null;

            function h(s) {
                var u = r + (s * o.railXRatio);
                var t = Math.max(0, o.scrollbarXRail.getBoundingClientRect().left) + (o.railXRatio * (o.railXWidth - o.scrollbarXWidth));
                if (u < 0) {
                    o.scrollbarXLeft = 0
                } else {
                    if (u > t) {
                        o.scrollbarXLeft = t
                    } else {
                        o.scrollbarXLeft = u
                    }
                }
                var v = j.toInt(o.scrollbarXLeft * (o.contentWidth - o.containerWidth) / (o.containerWidth - (o.railXRatio * o.scrollbarXWidth))) - o.negativeScrollAdjustment;
                f(p, "left", v)
            }
            var d = function(s) {
                h(s.pageX - n);
                b(p);
                s.stopPropagation();
                s.preventDefault()
            };
            var q = function() {
                j.stopScrolling(p, "x");
                o.event.unbind(o.ownerDocument, "mousemove", d)
            };
            o.event.bind(o.scrollbarX, "mousedown", function(s) {
                n = s.pageX;
                r = j.toInt(l.css(o.scrollbarX, "left")) * o.railXRatio;
                j.startScrolling(p, "x");
                o.event.bind(o.ownerDocument, "mousemove", d);
                o.event.once(o.ownerDocument, "mouseup", q);
                s.stopPropagation();
                s.preventDefault()
            })
        }

        function k(p, o) {
            var n = null;
            var h = null;

            function r(s) {
                var t = n + (s * o.railYRatio);
                var v = Math.max(0, o.scrollbarYRail.getBoundingClientRect().top) + (o.railYRatio * (o.railYHeight - o.scrollbarYHeight));
                if (t < 0) {
                    o.scrollbarYTop = 0
                } else {
                    if (t > v) {
                        o.scrollbarYTop = v
                    } else {
                        o.scrollbarYTop = t
                    }
                }
                var u = j.toInt(o.scrollbarYTop * (o.contentHeight - o.containerHeight) / (o.containerHeight - (o.railYRatio * o.scrollbarYHeight)));
                f(p, "top", u)
            }
            var d = function(s) {
                r(s.pageY - h);
                b(p);
                s.stopPropagation();
                s.preventDefault()
            };
            var q = function() {
                j.stopScrolling(p, "y");
                o.event.unbind(o.ownerDocument, "mousemove", d)
            };
            o.event.bind(o.scrollbarY, "mousedown", function(s) {
                h = s.pageY;
                n = j.toInt(l.css(o.scrollbarY, "top")) * o.railYRatio;
                j.startScrolling(p, "y");
                o.event.bind(o.ownerDocument, "mousemove", d);
                o.event.once(o.ownerDocument, "mouseup", q);
                s.stopPropagation();
                s.preventDefault()
            })
        }
        c.exports = function(h) {
            var d = a.get(h);
            m(h, d);
            k(h, d)
        }
    }, {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    12: [function(i, c, j) {
        var k = i("../../lib/helper"),
            l = i("../../lib/dom"),
            a = i("../instances"),
            b = i("../update-geometry"),
            f = i("../update-scroll");

        function g(n, m) {
            var h = false;
            m.event.bind(n, "mouseenter", function() {
                h = true
            });
            m.event.bind(n, "mouseleave", function() {
                h = false
            });
            var d = false;

            function o(q, p) {
                var r = n.scrollTop;
                if (q === 0) {
                    if (!m.scrollbarYActive) {
                        return false
                    }
                    if ((r === 0 && p > 0) || (r >= m.contentHeight - m.containerHeight && p < 0)) {
                        return !m.settings.wheelPropagation
                    }
                }
                var s = n.scrollLeft;
                if (p === 0) {
                    if (!m.scrollbarXActive) {
                        return false
                    }
                    if ((s === 0 && q < 0) || (s >= m.contentWidth - m.containerWidth && q > 0)) {
                        return !m.settings.wheelPropagation
                    }
                }
                return true
            }
            m.event.bind(m.ownerDocument, "keydown", function(t) {
                if (t.isDefaultPrevented && t.isDefaultPrevented()) {
                    return
                }
                var s = l.matches(m.scrollbarX, ":focus") || l.matches(m.scrollbarY, ":focus");
                if (!h && !s) {
                    return
                }
                var r = document.activeElement ? document.activeElement : m.ownerDocument.activeElement;
                if (r) {
                    while (r.shadowRoot) {
                        r = r.shadowRoot.activeElement
                    }
                    if (k.isEditable(r)) {
                        return
                    }
                }
                var q = 0;
                var p = 0;
                switch (t.which) {
                    case 37:
                        q = -30;
                        break;
                    case 38:
                        p = 30;
                        break;
                    case 39:
                        q = 30;
                        break;
                    case 40:
                        p = -30;
                        break;
                    case 33:
                        p = 90;
                        break;
                    case 32:
                        if (t.shiftKey) {
                            p = 90
                        } else {
                            p = -90
                        }
                        break;
                    case 34:
                        p = -90;
                        break;
                    case 35:
                        if (t.ctrlKey) {
                            p = -m.contentHeight
                        } else {
                            p = -m.containerHeight
                        }
                        break;
                    case 36:
                        if (t.ctrlKey) {
                            p = n.scrollTop
                        } else {
                            p = m.containerHeight
                        }
                        break;
                    default:
                        return
                }
                f(n, "top", n.scrollTop - p);
                f(n, "left", n.scrollLeft + q);
                b(n);
                d = o(q, p);
                if (d) {
                    t.preventDefault()
                }
            })
        }
        c.exports = function(h) {
            var d = a.get(h);
            g(h, d)
        }
    }, {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    13: [function(b, c, a) {
        var g = b("../instances"),
            f = b("../update-geometry"),
            h = b("../update-scroll");

        function d(n, m) {
            var k = false;

            function p(q, i) {
                var r = n.scrollTop;
                if (q === 0) {
                    if (!m.scrollbarYActive) {
                        return false
                    }
                    if ((r === 0 && i > 0) || (r >= m.contentHeight - m.containerHeight && i < 0)) {
                        return !m.settings.wheelPropagation
                    }
                }
                var s = n.scrollLeft;
                if (i === 0) {
                    if (!m.scrollbarXActive) {
                        return false
                    }
                    if ((s === 0 && q < 0) || (s >= m.contentWidth - m.containerWidth && q > 0)) {
                        return !m.settings.wheelPropagation
                    }
                }
                return true
            }

            function o(r) {
                var q = r.deltaX;
                var i = -1 * r.deltaY;
                if (typeof q === "undefined" || typeof i === "undefined") {
                    q = -1 * r.wheelDeltaX / 6;
                    i = r.wheelDeltaY / 6
                }
                if (r.deltaMode && r.deltaMode === 1) {
                    q *= 10;
                    i *= 10
                }
                if (q !== q && i !== i) {
                    q = 0;
                    i = r.wheelDelta
                }
                return [q, i]
            }

            function l(q, i) {
                var r = n.querySelector("textarea:hover");
                if (r) {
                    var t = r.scrollHeight - r.clientHeight;
                    if (t > 0) {
                        if (!(r.scrollTop === 0 && i > 0) && !(r.scrollTop === t && i < 0)) {
                            return true
                        }
                    }
                    var s = r.scrollLeft - r.clientWidth;
                    if (s > 0) {
                        if (!(r.scrollLeft === 0 && q < 0) && !(r.scrollLeft === s && q > 0)) {
                            return true
                        }
                    }
                }
                return false
            }

            function j(r) {
                var s = o(r);
                var q = s[0];
                var i = s[1];
                if (l(q, i)) {
                    return
                }
                k = false;
                if (!m.settings.useBothWheelAxes) {
                    h(n, "top", n.scrollTop - (i * m.settings.wheelSpeed));
                    h(n, "left", n.scrollLeft + (q * m.settings.wheelSpeed))
                } else {
                    if (m.scrollbarYActive && !m.scrollbarXActive) {
                        if (i) {
                            h(n, "top", n.scrollTop - (i * m.settings.wheelSpeed))
                        } else {
                            h(n, "top", n.scrollTop + (q * m.settings.wheelSpeed))
                        }
                        k = true
                    } else {
                        if (m.scrollbarXActive && !m.scrollbarYActive) {
                            if (q) {
                                h(n, "left", n.scrollLeft + (q * m.settings.wheelSpeed))
                            } else {
                                h(n, "left", n.scrollLeft - (i * m.settings.wheelSpeed))
                            }
                            k = true
                        }
                    }
                }
                f(n);
                k = (k || p(q, i));
                if (k) {
                    r.stopPropagation();
                    r.preventDefault()
                }
            }
            if (typeof window.onwheel !== "undefined") {
                m.event.bind(n, "wheel", j)
            } else {
                if (typeof window.onmousewheel !== "undefined") {
                    m.event.bind(n, "mousewheel", j)
                }
            }
        }
        c.exports = function(k) {
            var j = g.get(k);
            d(k, j)
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    14: [function(b, c, a) {
        var g = b("../instances"),
            f = b("../update-geometry");

        function d(j, h) {
            h.event.bind(j, "scroll", function() {
                f(j)
            })
        }
        c.exports = function(j) {
            var h = g.get(j);
            d(j, h)
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19
    }],
    15: [function(b, c, a) {
        var f = b("../../lib/helper"),
            i = b("../instances"),
            g = b("../update-geometry"),
            j = b("../update-scroll");

        function d(n, m) {
            function o() {
                var r = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
                if (r.toString().length === 0) {
                    return null
                } else {
                    return r.getRangeAt(0).commonAncestorContainer
                }
            }
            var q = null;
            var p = {
                top: 0,
                left: 0
            };

            function h() {
                if (!q) {
                    q = setInterval(function() {
                        if (!i.get(n)) {
                            clearInterval(q);
                            return
                        }
                        j(n, "top", n.scrollTop + p.top);
                        j(n, "left", n.scrollLeft + p.left);
                        g(n)
                    }, 50)
                }
            }

            function l() {
                if (q) {
                    clearInterval(q);
                    q = null
                }
                f.stopScrolling(n)
            }
            var k = false;
            m.event.bind(m.ownerDocument, "selectionchange", function() {
                if (n.contains(o())) {
                    k = true
                } else {
                    k = false;
                    l()
                }
            });
            m.event.bind(window, "mouseup", function() {
                if (k) {
                    k = false;
                    l()
                }
            });
            m.event.bind(window, "mousemove", function(r) {
                if (k) {
                    var t = {
                        x: r.pageX,
                        y: r.pageY
                    };
                    var s = {
                        left: n.offsetLeft,
                        right: n.offsetLeft + n.offsetWidth,
                        top: n.offsetTop,
                        bottom: n.offsetTop + n.offsetHeight
                    };
                    if (t.x < s.left + 3) {
                        p.left = -5;
                        f.startScrolling(n, "x")
                    } else {
                        if (t.x > s.right - 3) {
                            p.left = 5;
                            f.startScrolling(n, "x")
                        } else {
                            p.left = 0
                        }
                    }
                    if (t.y < s.top + 3) {
                        if (s.top + 3 - t.y < 5) {
                            p.top = -5
                        } else {
                            p.top = -20
                        }
                        f.startScrolling(n, "y")
                    } else {
                        if (t.y > s.bottom - 3) {
                            if (t.y - s.bottom + 3 < 5) {
                                p.top = 5
                            } else {
                                p.top = 20
                            }
                            f.startScrolling(n, "y")
                        } else {
                            p.top = 0
                        }
                    }
                    if (p.top === 0 && p.left === 0) {
                        l()
                    } else {
                        h()
                    }
                }
            })
        }
        c.exports = function(k) {
            var h = i.get(k);
            d(k, h)
        }
    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    16: [function(c, d, b) {
        var g = c("../instances"),
            f = c("../update-geometry"),
            h = c("../update-scroll");

        function a(k, w, o, A) {
            function p(C, i) {
                var F = k.scrollTop;
                var G = k.scrollLeft;
                var E = Math.abs(C);
                var D = Math.abs(i);
                if (D > E) {
                    if (((i < 0) && (F === w.contentHeight - w.containerHeight)) || ((i > 0) && (F === 0))) {
                        return !w.settings.swipePropagation
                    }
                } else {
                    if (E > D) {
                        if (((C < 0) && (G === w.contentWidth - w.containerWidth)) || ((C > 0) && (G === 0))) {
                            return !w.settings.swipePropagation
                        }
                    }
                }
                return true
            }

            function B(C, i) {
                h(k, "top", k.scrollTop - i);
                h(k, "left", k.scrollLeft - C);
                f(k)
            }
            var v = {};
            var s = 0;
            var x = {};
            var y = null;
            var r = false;
            var l = false;

            function q() {
                r = true
            }

            function m() {
                r = false
            }

            function u(i) {
                if (i.targetTouches) {
                    return i.targetTouches[0]
                } else {
                    return i
                }
            }

            function t(i) {
                if (i.targetTouches && i.targetTouches.length === 1) {
                    return true
                }
                if (i.pointerType && i.pointerType !== "mouse" && i.pointerType !== i.MSPOINTER_TYPE_MOUSE) {
                    return true
                }
                return false
            }

            function j(i) {
                if (t(i)) {
                    l = true;
                    var C = u(i);
                    v.pageX = C.pageX;
                    v.pageY = C.pageY;
                    s = (new Date()).getTime();
                    if (y !== null) {
                        clearInterval(y)
                    }
                    i.stopPropagation()
                }
            }

            function z(F) {
                if (!r && l && t(F)) {
                    var H = u(F);
                    var E = {
                        pageX: H.pageX,
                        pageY: H.pageY
                    };
                    var C = E.pageX - v.pageX;
                    var i = E.pageY - v.pageY;
                    B(C, i);
                    v = E;
                    var D = (new Date()).getTime();
                    var G = D - s;
                    if (G > 0) {
                        x.x = C / G;
                        x.y = i / G;
                        s = D
                    }
                    if (p(C, i)) {
                        F.stopPropagation();
                        F.preventDefault()
                    }
                }
            }

            function n() {
                if (!r && l) {
                    l = false;
                    clearInterval(y);
                    y = setInterval(function() {
                        if (!g.get(k)) {
                            clearInterval(y);
                            return
                        }
                        if (Math.abs(x.x) < 0.01 && Math.abs(x.y) < 0.01) {
                            clearInterval(y);
                            return
                        }
                        B(x.x * 30, x.y * 30);
                        x.x *= 0.8;
                        x.y *= 0.8
                    }, 10)
                }
            }
            if (o) {
                w.event.bind(window, "touchstart", q);
                w.event.bind(window, "touchend", m);
                w.event.bind(k, "touchstart", j);
                w.event.bind(k, "touchmove", z);
                w.event.bind(k, "touchend", n)
            }
            if (A) {
                if (window.PointerEvent) {
                    w.event.bind(window, "pointerdown", q);
                    w.event.bind(window, "pointerup", m);
                    w.event.bind(k, "pointerdown", j);
                    w.event.bind(k, "pointermove", z);
                    w.event.bind(k, "pointerup", n)
                } else {
                    if (window.MSPointerEvent) {
                        w.event.bind(window, "MSPointerDown", q);
                        w.event.bind(window, "MSPointerUp", m);
                        w.event.bind(k, "MSPointerDown", j);
                        w.event.bind(k, "MSPointerMove", z);
                        w.event.bind(k, "MSPointerUp", n)
                    }
                }
            }
        }
        d.exports = function(k, l, m) {
            var j = g.get(k);
            a(k, j, l, m)
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    17: [function(f, d, j) {
        var p = f("../lib/class"),
            l = f("../lib/helper"),
            a = f("./instances"),
            b = f("./update-geometry");
        var m = f("./handler/click-rail"),
            k = f("./handler/drag-scrollbar"),
            c = f("./handler/keyboard"),
            i = f("./handler/mouse-wheel"),
            o = f("./handler/native-scroll"),
            n = f("./handler/selection"),
            g = f("./handler/touch");
        d.exports = function(q, r) {
            r = typeof r === "object" ? r : {};
            p.add(q, "ps-container");
            var h = a.add(q);
            h.settings = l.extend(h.settings, r);
            p.add(q, "ps-theme-" + h.settings.theme);
            m(q);
            k(q);
            i(q);
            o(q);
            if (h.settings.useSelectionScroll) {
                n(q)
            }
            if (l.env.supportsTouch || l.env.supportsIePointer) {
                g(q, l.env.supportsTouch, l.env.supportsIePointer)
            }
            if (h.settings.useKeyboard) {
                c(q)
            }
            b(q)
        }
    }, {
        "../lib/class": 2,
        "../lib/helper": 6,
        "./handler/click-rail": 10,
        "./handler/drag-scrollbar": 11,
        "./handler/keyboard": 12,
        "./handler/mouse-wheel": 13,
        "./handler/native-scroll": 14,
        "./handler/selection": 15,
        "./handler/touch": 16,
        "./instances": 18,
        "./update-geometry": 19
    }],
    18: [function(g, f, j) {
        var q = g("../lib/class"),
            o = g("../lib/dom"),
            m = g("./default-setting"),
            i = g("../lib/event-manager"),
            p = g("../lib/guid"),
            l = g("../lib/helper");
        var a = {};

        function n(r) {
            var h = this;
            h.settings = l.clone(m);
            h.containerWidth = null;
            h.containerHeight = null;
            h.contentWidth = null;
            h.contentHeight = null;
            h.isRtl = o.css(r, "direction") === "rtl";
            h.isNegativeScroll = (function() {
                var u = r.scrollLeft;
                var t = null;
                r.scrollLeft = -1;
                t = r.scrollLeft < 0;
                r.scrollLeft = u;
                return t
            })();
            h.negativeScrollAdjustment = h.isNegativeScroll ? r.scrollWidth - r.clientWidth : 0;
            h.event = new i();
            h.ownerDocument = r.ownerDocument || document;

            function d() {
                q.add(r, "ps-focus")
            }

            function s() {
                q.remove(r, "ps-focus")
            }
            h.scrollbarXRail = o.appendTo(o.e("div", "ps-scrollbar-x-rail"), r);
            h.scrollbarX = o.appendTo(o.e("div", "ps-scrollbar-x"), h.scrollbarXRail);
            h.scrollbarX.setAttribute("tabindex", 0);
            h.event.bind(h.scrollbarX, "focus", d);
            h.event.bind(h.scrollbarX, "blur", s);
            h.scrollbarXActive = null;
            h.scrollbarXWidth = null;
            h.scrollbarXLeft = null;
            h.scrollbarXBottom = l.toInt(o.css(h.scrollbarXRail, "bottom"));
            h.isScrollbarXUsingBottom = h.scrollbarXBottom === h.scrollbarXBottom;
            h.scrollbarXTop = h.isScrollbarXUsingBottom ? null : l.toInt(o.css(h.scrollbarXRail, "top"));
            h.railBorderXWidth = l.toInt(o.css(h.scrollbarXRail, "borderLeftWidth")) + l.toInt(o.css(h.scrollbarXRail, "borderRightWidth"));
            o.css(h.scrollbarXRail, "display", "block");
            h.railXMarginWidth = l.toInt(o.css(h.scrollbarXRail, "marginLeft")) + l.toInt(o.css(h.scrollbarXRail, "marginRight"));
            o.css(h.scrollbarXRail, "display", "");
            h.railXWidth = null;
            h.railXRatio = null;
            h.scrollbarYRail = o.appendTo(o.e("div", "ps-scrollbar-y-rail"), r);
            h.scrollbarY = o.appendTo(o.e("div", "ps-scrollbar-y"), h.scrollbarYRail);
            h.scrollbarY.setAttribute("tabindex", 0);
            h.event.bind(h.scrollbarY, "focus", d);
            h.event.bind(h.scrollbarY, "blur", s);
            h.scrollbarYActive = null;
            h.scrollbarYHeight = null;
            h.scrollbarYTop = null;
            h.scrollbarYRight = l.toInt(o.css(h.scrollbarYRail, "right"));
            h.isScrollbarYUsingRight = h.scrollbarYRight === h.scrollbarYRight;
            h.scrollbarYLeft = h.isScrollbarYUsingRight ? null : l.toInt(o.css(h.scrollbarYRail, "left"));
            h.scrollbarYOuterWidth = h.isRtl ? l.outerWidth(h.scrollbarY) : null;
            h.railBorderYWidth = l.toInt(o.css(h.scrollbarYRail, "borderTopWidth")) + l.toInt(o.css(h.scrollbarYRail, "borderBottomWidth"));
            o.css(h.scrollbarYRail, "display", "block");
            h.railYMarginHeight = l.toInt(o.css(h.scrollbarYRail, "marginTop")) + l.toInt(o.css(h.scrollbarYRail, "marginBottom"));
            o.css(h.scrollbarYRail, "display", "");
            h.railYHeight = null;
            h.railYRatio = null
        }

        function c(d) {
            if (typeof d.dataset === "undefined") {
                return d.getAttribute("data-ps-id")
            } else {
                return d.dataset.psId
            }
        }

        function b(d, h) {
            if (typeof d.dataset === "undefined") {
                d.setAttribute("data-ps-id", h)
            } else {
                d.dataset.psId = h
            }
        }

        function k(d) {
            if (typeof d.dataset === "undefined") {
                d.removeAttribute("data-ps-id")
            } else {
                delete d.dataset.psId
            }
        }
        j.add = function(h) {
            var d = p();
            b(h, d);
            a[d] = new n(h);
            return a[d]
        };
        j.remove = function(d) {
            delete a[c(d)];
            k(d)
        };
        j.get = function(d) {
            return a[c(d)]
        }
    }, {
        "../lib/class": 2,
        "../lib/dom": 3,
        "../lib/event-manager": 4,
        "../lib/guid": 5,
        "../lib/helper": 6,
        "./default-setting": 8
    }],
    19: [function(f, b, g) {
        var m = f("../lib/class"),
            j = f("../lib/dom"),
            i = f("../lib/helper"),
            a = f("./instances"),
            c = f("./update-scroll");

        function l(h, d) {
            if (h.settings.minScrollbarLength) {
                d = Math.max(d, h.settings.minScrollbarLength)
            }
            if (h.settings.maxScrollbarLength) {
                d = Math.min(d, h.settings.maxScrollbarLength)
            }
            return d
        }

        function k(n, h) {
            var d = {
                width: h.railXWidth
            };
            if (h.isRtl) {
                d.left = h.negativeScrollAdjustment + n.scrollLeft + h.containerWidth - h.contentWidth
            } else {
                d.left = n.scrollLeft
            }
            if (h.isScrollbarXUsingBottom) {
                d.bottom = h.scrollbarXBottom - n.scrollTop
            } else {
                d.top = h.scrollbarXTop + n.scrollTop
            }
            j.css(h.scrollbarXRail, d);
            var o = {
                top: n.scrollTop,
                height: h.railYHeight
            };
            if (h.isScrollbarYUsingRight) {
                if (h.isRtl) {
                    o.right = h.contentWidth - (h.negativeScrollAdjustment + n.scrollLeft) - h.scrollbarYRight - h.scrollbarYOuterWidth
                } else {
                    o.right = h.scrollbarYRight - n.scrollLeft
                }
            } else {
                if (h.isRtl) {
                    o.left = h.negativeScrollAdjustment + n.scrollLeft + h.containerWidth * 2 - h.contentWidth - h.scrollbarYLeft - h.scrollbarYOuterWidth
                } else {
                    o.left = h.scrollbarYLeft + n.scrollLeft
                }
            }
            j.css(h.scrollbarYRail, o);
            j.css(h.scrollbarX, {
                left: h.scrollbarXLeft,
                width: h.scrollbarXWidth - h.railBorderXWidth
            });
            j.css(h.scrollbarY, {
                top: h.scrollbarYTop,
                height: h.scrollbarYHeight - h.railBorderYWidth
            })
        }
        b.exports = function(h) {
            var d = a.get(h);
            d.containerWidth = h.clientWidth;
            d.containerHeight = h.clientHeight;
            d.contentWidth = h.scrollWidth;
            d.contentHeight = h.scrollHeight;
            var n;
            if (!h.contains(d.scrollbarXRail)) {
                n = j.queryChildren(h, ".ps-scrollbar-x-rail");
                if (n.length > 0) {
                    n.forEach(function(o) {
                        j.remove(o)
                    })
                }
                j.appendTo(d.scrollbarXRail, h)
            }
            if (!h.contains(d.scrollbarYRail)) {
                n = j.queryChildren(h, ".ps-scrollbar-y-rail");
                if (n.length > 0) {
                    n.forEach(function(o) {
                        j.remove(o)
                    })
                }
                j.appendTo(d.scrollbarYRail, h)
            }
            if (!d.settings.suppressScrollX && d.containerWidth + d.settings.scrollXMarginOffset < d.contentWidth) {
                d.scrollbarXActive = true;
                d.railXWidth = d.containerWidth - d.railXMarginWidth;
                d.railXRatio = d.containerWidth / d.railXWidth;
                d.scrollbarXWidth = l(d, i.toInt(d.railXWidth * d.containerWidth / d.contentWidth));
                d.scrollbarXLeft = i.toInt((d.negativeScrollAdjustment + h.scrollLeft) * (d.railXWidth - d.scrollbarXWidth) / (d.contentWidth - d.containerWidth))
            } else {
                d.scrollbarXActive = false
            }
            if (!d.settings.suppressScrollY && d.containerHeight + d.settings.scrollYMarginOffset < d.contentHeight) {
                d.scrollbarYActive = true;
                d.railYHeight = d.containerHeight - d.railYMarginHeight;
                d.railYRatio = d.containerHeight / d.railYHeight;
                d.scrollbarYHeight = l(d, i.toInt(d.railYHeight * d.containerHeight / d.contentHeight));
                d.scrollbarYTop = i.toInt(h.scrollTop * (d.railYHeight - d.scrollbarYHeight) / (d.contentHeight - d.containerHeight))
            } else {
                d.scrollbarYActive = false
            }
            if (d.scrollbarXLeft >= d.railXWidth - d.scrollbarXWidth) {
                d.scrollbarXLeft = d.railXWidth - d.scrollbarXWidth
            }
            if (d.scrollbarYTop >= d.railYHeight - d.scrollbarYHeight) {
                d.scrollbarYTop = d.railYHeight - d.scrollbarYHeight
            }
            k(h, d);
            if (d.scrollbarXActive) {
                m.add(h, "ps-active-x")
            } else {
                m.remove(h, "ps-active-x");
                d.scrollbarXWidth = 0;
                d.scrollbarXLeft = 0;
                c(h, "left", 0)
            }
            if (d.scrollbarYActive) {
                m.add(h, "ps-active-y")
            } else {
                m.remove(h, "ps-active-y");
                d.scrollbarYHeight = 0;
                d.scrollbarYTop = 0;
                c(h, "top", 0)
            }
        }
    }, {
        "../lib/class": 2,
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-scroll": 20
    }],
    20: [function(f, d, i) {
        var b = f("./instances");
        var k = document.createEvent("Event"),
            j = document.createEvent("Event"),
            g = document.createEvent("Event"),
            o = document.createEvent("Event"),
            q = document.createEvent("Event"),
            m = document.createEvent("Event"),
            n = document.createEvent("Event"),
            l = document.createEvent("Event"),
            h = document.createEvent("Event"),
            a = document.createEvent("Event"),
            p, c;
        k.initEvent("ps-scroll-up", true, true);
        j.initEvent("ps-scroll-down", true, true);
        g.initEvent("ps-scroll-left", true, true);
        o.initEvent("ps-scroll-right", true, true);
        q.initEvent("ps-scroll-y", true, true);
        m.initEvent("ps-scroll-x", true, true);
        n.initEvent("ps-x-reach-start", true, true);
        l.initEvent("ps-x-reach-end", true, true);
        h.initEvent("ps-y-reach-start", true, true);
        a.initEvent("ps-y-reach-end", true, true);
        d.exports = function(s, t, u) {
            if (typeof s === "undefined") {
                throw "You must provide an element to the update-scroll function"
            }
            if (typeof t === "undefined") {
                throw "You must provide an axis to the update-scroll function"
            }
            if (typeof u === "undefined") {
                throw "You must provide a value to the update-scroll function"
            }
            if (t === "top" && u <= 0) {
                s.scrollTop = u = 0;
                s.dispatchEvent(h)
            }
            if (t === "left" && u <= 0) {
                s.scrollLeft = u = 0;
                s.dispatchEvent(n)
            }
            var r = b.get(s);
            if (t === "top" && u >= r.contentHeight - r.containerHeight) {
                s.scrollTop = u = r.contentHeight - r.containerHeight;
                s.dispatchEvent(a)
            }
            if (t === "left" && u >= r.contentWidth - r.containerWidth) {
                s.scrollLeft = u = r.contentWidth - r.containerWidth;
                s.dispatchEvent(l)
            }
            if (!p) {
                p = s.scrollTop
            }
            if (!c) {
                c = s.scrollLeft
            }
            if (t === "top" && u < p) {
                s.dispatchEvent(k)
            }
            if (t === "top" && u > p) {
                s.dispatchEvent(j)
            }
            if (t === "left" && u < c) {
                s.dispatchEvent(g)
            }
            if (t === "left" && u > c) {
                s.dispatchEvent(o)
            }
            if (t === "top") {
                s.scrollTop = p = u;
                s.dispatchEvent(q)
            }
            if (t === "left") {
                s.scrollLeft = c = u;
                s.dispatchEvent(m)
            }
        }
    }, {
        "./instances": 18
    }],
    21: [function(b, c, a) {
        var j = b("../lib/dom"),
            f = b("../lib/helper"),
            i = b("./instances"),
            g = b("./update-geometry"),
            k = b("./update-scroll");
        c.exports = function(h) {
            var d = i.get(h);
            if (!d) {
                return
            }
            d.negativeScrollAdjustment = d.isNegativeScroll ? h.scrollWidth - h.clientWidth : 0;
            j.css(d.scrollbarXRail, "display", "block");
            j.css(d.scrollbarYRail, "display", "block");
            d.railXMarginWidth = f.toInt(j.css(d.scrollbarXRail, "marginLeft")) + f.toInt(j.css(d.scrollbarXRail, "marginRight"));
            d.railYMarginHeight = f.toInt(j.css(d.scrollbarYRail, "marginTop")) + f.toInt(j.css(d.scrollbarYRail, "marginBottom"));
            j.css(d.scrollbarXRail, "display", "none");
            j.css(d.scrollbarYRail, "display", "none");
            g(h);
            k(h, "top", h.scrollTop);
            k(h, "left", h.scrollLeft);
            j.css(d.scrollbarXRail, "display", "");
            j.css(d.scrollbarYRail, "display", "")
        }
    }, {
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-geometry": 19,
        "./update-scroll": 20
    }]
}, {}, [1]);
(function(B) {
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(aj) {
            if (this == null) {
                throw new TypeError()
            }
            var ak = Object(this);
            var f = ak.length >>> 0;
            if (f === 0) {
                return -1
            }
            var al = 0;
            if (arguments.length > 0) {
                al = Number(arguments[1]);
                if (al != al) {
                    al = 0
                } else {
                    if (al != 0 && al != Infinity && al != -Infinity) {
                        al = (al > 0 || -1) * Math.floor(Math.abs(al))
                    }
                }
            }
            if (al >= f) {
                return -1
            }
            var o = al >= 0 ? al : Math.max(f - Math.abs(al), 0);
            for (; o < f; o++) {
                if (o in ak && ak[o] === aj) {
                    return o
                }
            }
            return -1
        }
    }
    if (!Array.prototype.lastIndexOf) {
        Array.prototype.lastIndexOf = function(aj) {
            if (this == null) {
                throw new TypeError()
            }
            var ak = Object(this);
            var f = ak.length >>> 0;
            if (f === 0) {
                return -1
            }
            var al = f;
            if (arguments.length > 1) {
                al = Number(arguments[1]);
                if (al != al) {
                    al = 0
                } else {
                    if (al != 0 && al != (1 / 0) && al != -(1 / 0)) {
                        al = (al > 0 || -1) * Math.floor(Math.abs(al))
                    }
                }
            }
            var o = al >= 0 ? Math.min(al, f - 1) : f - Math.abs(al);
            for (; o >= 0; o--) {
                if (o in ak && ak[o] === aj) {
                    return o
                }
            }
            return -1
        }
    }
    if (typeof String.prototype.trim !== "function") {
        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, "")
        }
    }
    var H = B.jQuery || B.Zepto,
        ai = {},
        t = {},
        z, s = 0,
        O = [],
        n = false,
        q = {},
        w = null;
    if (typeof module !== "undefined" && module.exports) {
        module.exports = ai
    } else {
        if (H) {
            H.i18n = H.i18n || ai
        }
        if (B.i18n) {
            w = B.i18n
        }
        B.i18n = ai
    }
    q = {
        load: function(aj, o, f) {
            if (o.useLocalStorage) {
                q._loadLocal(aj, o, function(ao, al) {
                    var an = [];
                    for (var am = 0, ak = aj.length; am < ak; am++) {
                        if (!al[aj[am]]) {
                            an.push(aj[am])
                        }
                    }
                    if (an.length > 0) {
                        q._fetch(an, o, function(ap, aq) {
                            ad.extend(al, aq);
                            q._storeLocal(aq);
                            f(ap, al)
                        })
                    } else {
                        f(ao, al)
                    }
                })
            } else {
                q._fetch(aj, o, function(al, ak) {
                    f(al, ak)
                })
            }
        },
        _loadLocal: function(al, ak, o) {
            var aj = {},
                am = new Date().getTime();
            if (window.localStorage) {
                var f = al.length;
                ad.each(al, function(ap, an) {
                    var ao = ad.localStorage.getItem("res_" + an);
                    if (ao) {
                        ao = JSON.parse(ao);
                        if (ao.i18nStamp && ao.i18nStamp + ak.localStorageExpirationTime > am) {
                            aj[an] = ao
                        }
                    }
                    f--;
                    if (f === 0) {
                        o(null, aj)
                    }
                })
            }
        },
        _storeLocal: function(o) {
            if (window.localStorage) {
                for (var f in o) {
                    o[f].i18nStamp = new Date().getTime();
                    ad.localStorage.setItem("res_" + f, JSON.stringify(o[f]))
                }
            }
            return
        },
        _fetch: function(ao, ap, aj) {
            var al = ap.ns,
                an = {};
            if (!ap.dynamicLoad) {
                var o = al.namespaces.length * ao.length,
                    am;
                ad.each(al.namespaces, function(ar, aq) {
                    ad.each(ao, function(at, av) {
                        var au = function(aw, ax) {
                            if (aw) {
                                am = am || [];
                                am.push(aw)
                            }
                            an[av] = an[av] || {};
                            an[av][aq] = ax;
                            o--;
                            if (o === 0) {
                                aj(am, an)
                            }
                        };
                        if (typeof ap.customLoad == "function") {
                            ap.customLoad(av, aq, ap, au)
                        } else {
                            q._fetchOne(av, aq, ap, au)
                        }
                    })
                })
            } else {
                var ak = function(aq, ar) {
                    aj(aq, ar)
                };
                if (typeof ap.customLoad == "function") {
                    ap.customLoad(ao, al.namespaces, ap, ak)
                } else {
                    var f = aa(ap.resGetPath, {
                        lng: ao.join("+"),
                        ns: al.namespaces.join("+")
                    });
                    ad.ajax({
                        url: f,
                        cache: ap.cache,
                        success: function(ar, aq, at) {
                            ad.log("loaded: " + f);
                            ak(null, ar)
                        },
                        error: function(at, aq, ar) {
                            ad.log("failed loading: " + f);
                            ak("failed loading resource.json error: " + ar)
                        },
                        dataType: "json",
                        async: ap.getAsync,
                        timeout: ap.ajaxTimeout
                    })
                }
            }
        },
        _fetchOne: function(ak, al, aj, f) {
            var o = aa(aj.resGetPath, {
                lng: ak,
                ns: al
            });
            ad.ajax({
                url: o,
                cache: aj.cache,
                success: function(an, am, ao) {
                    ad.log("loaded: " + o);
                    f(null, an)
                },
                error: function(ap, an, ao) {
                    if ((an && an == 200) || (ap && ap.status && ap.status == 200)) {
                        ad.error("There is a typo in: " + o)
                    } else {
                        if ((an && an == 404) || (ap && ap.status && ap.status == 404)) {
                            ad.log("Does not exist: " + o)
                        } else {
                            var am = an ? an : ((ap && ap.status) ? ap.status : null);
                            ad.log(am + " when loading " + o)
                        }
                    }
                    f(ao, {})
                },
                dataType: "json",
                async: aj.getAsync,
                timeout: aj.ajaxTimeout,
                headers: aj.headers
            })
        },
        postMissing: function(ao, an, aq, al, ar) {
            var ap = {};
            ap[aq] = al;
            var ak = [];
            if (Y.sendMissingTo === "fallback" && Y.fallbackLng[0] !== false) {
                for (var o = 0; o < Y.fallbackLng.length; o++) {
                    ak.push({
                        lng: Y.fallbackLng[o],
                        url: aa(Y.resPostPath, {
                            lng: Y.fallbackLng[o],
                            ns: an
                        })
                    })
                }
            } else {
                if (Y.sendMissingTo === "current" || (Y.sendMissingTo === "fallback" && Y.fallbackLng[0] === false)) {
                    ak.push({
                        lng: ao,
                        url: aa(Y.resPostPath, {
                            lng: ao,
                            ns: an
                        })
                    })
                } else {
                    if (Y.sendMissingTo === "all") {
                        for (var o = 0, f = ar.length; o < f; o++) {
                            ak.push({
                                lng: ar[o],
                                url: aa(Y.resPostPath, {
                                    lng: ar[o],
                                    ns: an
                                })
                            })
                        }
                    }
                }
            }
            for (var am = 0, aj = ak.length; am < aj; am++) {
                var at = ak[am];
                ad.ajax({
                    url: at.url,
                    type: Y.sendType,
                    data: ap,
                    success: function(ay, av, az) {
                        ad.log("posted missing key '" + aq + "' to: " + at.url);
                        var aw = aq.split(".");
                        var au = 0;
                        var ax = t[at.lng][an];
                        while (aw[au]) {
                            if (au === aw.length - 1) {
                                ax = ax[aw[au]] = al
                            } else {
                                ax = ax[aw[au]] = ax[aw[au]] || {}
                            }
                            au++
                        }
                    },
                    error: function(aw, au, av) {
                        ad.log("failed posting missing key '" + aq + "' to: " + at.url)
                    },
                    dataType: "json",
                    async: Y.postAsync,
                    timeout: Y.ajaxTimeout
                })
            }
        },
        reload: ag
    };
    var Y = {
        lng: undefined,
        load: "all",
        preload: [],
        lowerCaseLng: false,
        returnObjectTrees: false,
        fallbackLng: ["dev"],
        fallbackNS: [],
        detectLngQS: "setLng",
        detectLngFromLocalStorage: false,
        ns: {
            namespaces: ["translation"],
            defaultNs: "translation"
        },
        fallbackOnNull: true,
        fallbackOnEmpty: false,
        fallbackToDefaultNS: false,
        showKeyIfEmpty: false,
        nsseparator: ":",
        keyseparator: ".",
        selectorAttr: "data-i18n",
        debug: false,
        resGetPath: "/locales/__lng__/__ns__.json",
        resPostPath: "/locales/add/__lng__/__ns__",
        getAsync: true,
        postAsync: true,
        resStore: undefined,
        useLocalStorage: false,
        localStorageExpirationTime: 7 * 24 * 60 * 60 * 1000,
        dynamicLoad: false,
        sendMissing: false,
        sendMissingTo: "fallback",
        sendType: "POST",
        interpolationPrefix: "__",
        interpolationSuffix: "__",
        defaultVariables: false,
        reusePrefix: "$t(",
        reuseSuffix: ")",
        pluralSuffix: "_plural",
        pluralNotFound: ["plural_not_found", Math.random()].join(""),
        contextNotFound: ["context_not_found", Math.random()].join(""),
        escapeInterpolation: false,
        indefiniteSuffix: "_indefinite",
        indefiniteNotFound: ["indefinite_not_found", Math.random()].join(""),
        setJqueryExt: true,
        defaultValueFromContent: true,
        useDataAttrOptions: false,
        cookieExpirationTime: undefined,
        useCookie: true,
        cookieName: "i18next",
        cookieDomain: undefined,
        objectTreeKeyHandler: undefined,
        postProcess: undefined,
        parseMissingKey: undefined,
        missingKeyHandler: q.postMissing,
        ajaxTimeout: 0,
        shortcutFunction: "sprintf"
    };

    function A(aj, o) {
        if (!o || typeof o === "function") {
            return aj
        }
        for (var f in o) {
            aj[f] = o[f]
        }
        return aj
    }

    function j(aj, o, f) {
        for (var ak in o) {
            if (ak in aj) {
                if (typeof aj[ak] === "string" || aj[ak] instanceof String || typeof o[ak] === "string" || o[ak] instanceof String) {
                    if (f) {
                        aj[ak] = o[ak]
                    }
                } else {
                    j(aj[ak], o[ak], f)
                }
            } else {
                aj[ak] = o[ak]
            }
        }
        return aj
    }

    function X(ak, an, aj) {
        var o, al = 0,
            am = ak.length,
            f = am === undefined || Object.prototype.toString.apply(ak) !== "[object Array]" || typeof ak === "function";
        if (aj) {
            if (f) {
                for (o in ak) {
                    if (an.apply(ak[o], aj) === false) {
                        break
                    }
                }
            } else {
                for (; al < am;) {
                    if (an.apply(ak[al++], aj) === false) {
                        break
                    }
                }
            }
        } else {
            if (f) {
                for (o in ak) {
                    if (an.call(ak[o], o, ak[o]) === false) {
                        break
                    }
                }
            } else {
                for (; al < am;) {
                    if (an.call(ak[al], al, ak[al++]) === false) {
                        break
                    }
                }
            }
        }
        return ak
    }
    var b = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;"
    };

    function J(f) {
        if (typeof f === "string") {
            return f.replace(/[&<>"'\/]/g, function(o) {
                return b[o]
            })
        } else {
            return f
        }
    }

    function I(ap) {
        var aj = function(ar) {
            if (window.XMLHttpRequest) {
                return ar(null, new XMLHttpRequest())
            } else {
                if (window.ActiveXObject) {
                    try {
                        return ar(null, new ActiveXObject("Msxml2.XMLHTTP"))
                    } catch (aq) {
                        return ar(null, new ActiveXObject("Microsoft.XMLHTTP"))
                    }
                }
            }
            return ar(new Error())
        };
        var f = function(at) {
            if (typeof at === "string") {
                return at
            }
            var aq = [];
            for (var ar in at) {
                if (at.hasOwnProperty(ar)) {
                    aq.push(encodeURIComponent(ar) + "=" + encodeURIComponent(at[ar]))
                }
            }
            return aq.join("&")
        };
        var am = function(at) {
            at = at.replace(/\r\n/g, "\n");
            var aq = "";
            for (var ar = 0; ar < at.length; ar++) {
                var au = at.charCodeAt(ar);
                if (au < 128) {
                    aq += String.fromCharCode(au)
                } else {
                    if ((au > 127) && (au < 2048)) {
                        aq += String.fromCharCode((au >> 6) | 192);
                        aq += String.fromCharCode((au & 63) | 128)
                    } else {
                        aq += String.fromCharCode((au >> 12) | 224);
                        aq += String.fromCharCode(((au >> 6) & 63) | 128);
                        aq += String.fromCharCode((au & 63) | 128)
                    }
                }
            }
            return aq
        };
        var ak = function(av) {
            var aq = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            av = am(av);
            var aB = "",
                aA, ay, aw, az, ax, au, at, ar = 0;
            do {
                aA = av.charCodeAt(ar++);
                ay = av.charCodeAt(ar++);
                aw = av.charCodeAt(ar++);
                az = aA >> 2;
                ax = ((aA & 3) << 4) | (ay >> 4);
                au = ((ay & 15) << 2) | (aw >> 6);
                at = aw & 63;
                if (isNaN(ay)) {
                    au = at = 64
                } else {
                    if (isNaN(aw)) {
                        at = 64
                    }
                }
                aB += aq.charAt(az) + aq.charAt(ax) + aq.charAt(au) + aq.charAt(at);
                aA = ay = aw = "";
                az = ax = au = at = ""
            } while (ar < av.length);
            return aB
        };
        var o = function() {
            var aq = arguments[0];
            for (var ar = 1; ar < arguments.length; ar++) {
                var at = arguments[ar];
                for (var au in at) {
                    if (at.hasOwnProperty(au)) {
                        aq[au] = at[au]
                    }
                }
            }
            return aq
        };
        var al = function(aq, at, az, ay) {
            if (typeof az === "function") {
                ay = az;
                az = {}
            }
            az.cache = az.cache || false;
            az.data = az.data || {};
            az.headers = az.headers || {};
            az.jsonp = az.jsonp || false;
            az.async = az.async === undefined ? true : az.async;
            var au = o({
                accept: "*/*",
                "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
            }, al.headers, az.headers);
            var ax;
            if (au["content-type"] === "application/json") {
                ax = JSON.stringify(az.data)
            } else {
                ax = f(az.data)
            }
            if (aq === "GET") {
                var ar = [];
                if (ax) {
                    ar.push(ax);
                    ax = null
                }
                if (!az.cache) {
                    ar.push("_=" + (new Date()).getTime())
                }
                if (az.jsonp) {
                    ar.push("callback=" + az.jsonp);
                    ar.push("jsonp=" + az.jsonp)
                }
                ar = ar.join("&");
                if (ar.length > 1) {
                    if (at.indexOf("?") > -1) {
                        at += "&" + ar
                    } else {
                        at += "?" + ar
                    }
                }
                if (az.jsonp) {
                    var aw = document.getElementsByTagName("head")[0];
                    var av = document.createElement("script");
                    av.type = "text/javascript";
                    av.src = at;
                    aw.appendChild(av);
                    return
                }
            }
            aj(function(aA, aB) {
                if (aA) {
                    return ay(aA)
                }
                aB.open(aq, at, az.async);
                for (var aC in au) {
                    if (au.hasOwnProperty(aC)) {
                        aB.setRequestHeader(aC, au[aC])
                    }
                }
                aB.onreadystatechange = function() {
                    if (aB.readyState === 4) {
                        var aD = aB.responseText || "";
                        if (!ay) {
                            return
                        }
                        ay(aB.status, {
                            text: function() {
                                return aD
                            },
                            json: function() {
                                try {
                                    return JSON.parse(aD)
                                } catch (aE) {
                                    ad.error("Can not parse JSON. URL: " + at);
                                    return {}
                                }
                            }
                        })
                    }
                };
                aB.send(ax)
            })
        };
        var ao = {
            authBasic: function(ar, aq) {
                al.headers.Authorization = "Basic " + ak(ar + ":" + aq)
            },
            connect: function(ar, aq, at) {
                return al("CONNECT", ar, aq, at)
            },
            del: function(ar, aq, at) {
                return al("DELETE", ar, aq, at)
            },
            get: function(ar, aq, at) {
                return al("GET", ar, aq, at)
            },
            head: function(ar, aq, at) {
                return al("HEAD", ar, aq, at)
            },
            headers: function(aq) {
                al.headers = aq || {}
            },
            isAllowed: function(aq, ar, at) {
                this.options(aq, function(au, av) {
                    at(av.text().indexOf(ar) !== -1)
                })
            },
            options: function(ar, aq, at) {
                return al("OPTIONS", ar, aq, at)
            },
            patch: function(ar, aq, at) {
                return al("PATCH", ar, aq, at)
            },
            post: function(ar, aq, at) {
                return al("POST", ar, aq, at)
            },
            put: function(ar, aq, at) {
                return al("PUT", ar, aq, at)
            },
            trace: function(ar, aq, at) {
                return al("TRACE", ar, aq, at)
            }
        };
        var an = ap.type ? ap.type.toLowerCase() : "get";
        ao[an](ap.url, ap, function(aq, ar) {
            if (aq === 200 || (aq === 0 && ar.text())) {
                ap.success(ar.json(), aq, null)
            } else {
                ap.error(ar.text(), aq, null)
            }
        })
    }
    var T = {
        create: function(aj, am, ak, al) {
            var f;
            if (ak) {
                var o = new Date();
                o.setTime(o.getTime() + (ak * 60 * 1000));
                f = "; expires=" + o.toGMTString()
            } else {
                f = ""
            }
            al = (al) ? "domain=" + al + ";" : "";
            document.cookie = aj + "=" + am + f + ";" + al + "path=/"
        },
        read: function(o) {
            var ak = o + "=";
            var f = document.cookie.split(";");
            for (var aj = 0; aj < f.length; aj++) {
                var al = f[aj];
                while (al.charAt(0) == " ") {
                    al = al.substring(1, al.length)
                }
                if (al.indexOf(ak) === 0) {
                    return al.substring(ak.length, al.length)
                }
            }
            return null
        },
        remove: function(f) {
            this.create(f, "", -1)
        }
    };
    var p = {
        create: function(f, ak, o, aj) {},
        read: function(f) {
            return null
        },
        remove: function(f) {}
    };
    var ad = {
        extend: H ? H.extend : A,
        deepExtend: j,
        each: H ? H.each : X,
        ajax: H ? H.ajax : (typeof document !== "undefined" ? I : function() {}),
        cookie: typeof document !== "undefined" ? T : p,
        detectLanguage: i,
        escape: J,
        log: function(f) {
            if (Y.debug && typeof console !== "undefined") {
                console.log(f)
            }
        },
        error: function(f) {
            if (typeof console !== "undefined") {
                console.error(f)
            }
        },
        getCountyIndexOfLng: function(f) {
            var o = 0;
            if (f === "nb-NO" || f === "nn-NO" || f === "nb-no" || f === "nn-no") {
                o = 1
            }
            return o
        },
        toLanguages: function(ao, an) {
            var ak = this.log;
            an = an || Y.fallbackLng;
            if (typeof an === "string") {
                an = [an]
            }

            function am(aq) {
                var ar = aq;
                if (typeof aq === "string" && aq.indexOf("-") > -1) {
                    var at = aq.split("-");
                    ar = Y.lowerCaseLng ? at[0].toLowerCase() + "-" + at[1].toLowerCase() : at[0].toLowerCase() + "-" + at[1].toUpperCase()
                } else {
                    ar = Y.lowerCaseLng ? aq.toLowerCase() : aq
                }
                return ar
            }
            var o = [];
            var f = Y.lngWhitelist || false;
            var ap = function(aq) {
                if (!f || f.indexOf(aq) > -1) {
                    o.push(aq)
                } else {
                    ak("rejecting non-whitelisted language: " + aq)
                }
            };
            if (typeof ao === "string" && ao.indexOf("-") > -1) {
                var aj = ao.split("-");
                if (Y.load !== "unspecific") {
                    ap(am(ao))
                }
                if (Y.load !== "current") {
                    ap(am(aj[this.getCountyIndexOfLng(ao)]))
                }
            } else {
                ap(am(ao))
            }
            for (var al = 0; al < an.length; al++) {
                if (o.indexOf(an[al]) === -1 && an[al]) {
                    o.push(am(an[al]))
                }
            }
            return o
        },
        regexEscape: function(f) {
            return f.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
        },
        regexReplacementEscape: function(f) {
            if (typeof f === "string") {
                return f.replace(/\$/g, "$$$$")
            } else {
                return f
            }
        },
        localStorage: {
            setItem: function(f, o) {
                if (window.localStorage) {
                    try {
                        window.localStorage.setItem(f, o)
                    } catch (aj) {
                        ad.log('failed to set value for key "' + f + '" to localStorage.')
                    }
                }
            },
            getItem: function(f, o) {
                if (window.localStorage) {
                    try {
                        return window.localStorage.getItem(f, o)
                    } catch (aj) {
                        ad.log('failed to get value for key "' + f + '" from localStorage.');
                        return undefined
                    }
                }
            }
        }
    };

    function ab(aq, aj) {
        if (typeof aq === "function") {
            aj = aq;
            aq = {}
        }
        aq = aq || {};
        ad.extend(Y, aq);
        delete Y.fixLng;
        if (Y.functions) {
            delete Y.functions;
            ad.extend(ad, aq.functions)
        }
        if (typeof Y.ns == "string") {
            Y.ns = {
                namespaces: [Y.ns],
                defaultNs: Y.ns
            }
        }
        if (typeof Y.fallbackNS == "string") {
            Y.fallbackNS = [Y.fallbackNS]
        }
        if (typeof Y.fallbackLng == "string" || typeof Y.fallbackLng == "boolean") {
            Y.fallbackLng = [Y.fallbackLng]
        }
        Y.interpolationPrefixEscaped = ad.regexEscape(Y.interpolationPrefix);
        Y.interpolationSuffixEscaped = ad.regexEscape(Y.interpolationSuffix);
        if (!Y.lng) {
            Y.lng = ad.detectLanguage()
        }
        O = ad.toLanguages(Y.lng);
        z = O[0];
        ad.log("currentLng set to: " + z);
        if (Y.useCookie && ad.cookie.read(Y.cookieName) !== z) {
            ad.cookie.create(Y.cookieName, z, Y.cookieExpirationTime, Y.cookieDomain)
        }
        if (Y.detectLngFromLocalStorage && typeof document !== "undefined" && window.localStorage) {
            ad.localStorage.setItem("i18next_lng", z)
        }
        var an = c;
        if (aq.fixLng) {
            an = function(at, ar) {
                ar = ar || {};
                ar.lng = ar.lng || an.lng;
                return c(at, ar)
            };
            an.lng = z
        }
        F.setCurrentLng(z);
        if (H && Y.setJqueryExt) {
            G && G()
        } else {
            N && N()
        }
        var ap;
        if (H && H.Deferred) {
            ap = H.Deferred()
        }
        if (Y.resStore) {
            t = Y.resStore;
            n = true;
            if (aj) {
                aj(null, an)
            }
            if (ap) {
                ap.resolve(an)
            }
            if (ap) {
                return ap.promise()
            }
            return
        }
        var f = ad.toLanguages(Y.lng);
        if (typeof Y.preload === "string") {
            Y.preload = [Y.preload]
        }
        for (var al = 0, o = Y.preload.length; al < o; al++) {
            var ak = ad.toLanguages(Y.preload[al]);
            for (var ao = 0, am = ak.length; ao < am; ao++) {
                if (f.indexOf(ak[ao]) < 0) {
                    f.push(ak[ao])
                }
            }
        }
        ai.sync.load(f, Y, function(at, ar) {
            t = ar;
            n = true;
            if (aj) {
                aj(at, an)
            }
            if (ap) {
                (!at ? ap.resolve : ap.reject)(at || an)
            }
        });
        if (ap) {
            return ap.promise()
        }
    }

    function U() {
        return n
    }

    function m(ak, f) {
        if (typeof ak === "string") {
            ak = [ak]
        }
        for (var aj = 0, o = ak.length; aj < o; aj++) {
            if (Y.preload.indexOf(ak[aj]) < 0) {
                Y.preload.push(ak[aj])
            }
        }
        return ab(f)
    }

    function ae(aj, ak, al, f, o) {
        if (typeof ak !== "string") {
            al = ak;
            ak = Y.ns.defaultNs
        } else {
            if (Y.ns.namespaces.indexOf(ak) < 0) {
                Y.ns.namespaces.push(ak)
            }
        }
        t[aj] = t[aj] || {};
        t[aj][ak] = t[aj][ak] || {};
        if (f) {
            ad.deepExtend(t[aj][ak], al, o)
        } else {
            ad.extend(t[aj][ak], al)
        }
        if (Y.useLocalStorage) {
            q._storeLocal(t)
        }
    }

    function P(f, aj) {
        if (typeof aj !== "string") {
            aj = Y.ns.defaultNs
        }
        t[f] = t[f] || {};
        var o = t[f][aj] || {};
        var ak = false;
        for (var al in o) {
            if (o.hasOwnProperty(al)) {
                ak = true
            }
        }
        return ak
    }

    function x(f, o) {
        if (typeof o !== "string") {
            o = Y.ns.defaultNs
        }
        t[f] = t[f] || {};
        return ad.extend({}, t[f][o])
    }

    function k(f, o) {
        if (typeof o !== "string") {
            o = Y.ns.defaultNs
        }
        t[f] = t[f] || {};
        t[f][o] = {};
        if (Y.useLocalStorage) {
            q._storeLocal(t)
        }
    }

    function Z(o, ak, aj, an) {
        if (typeof ak !== "string") {
            resource = ak;
            ak = Y.ns.defaultNs
        } else {
            if (Y.ns.namespaces.indexOf(ak) < 0) {
                Y.ns.namespaces.push(ak)
            }
        }
        t[o] = t[o] || {};
        t[o][ak] = t[o][ak] || {};
        var am = aj.split(Y.keyseparator);
        var f = 0;
        var al = t[o][ak];
        var ao = al;
        while (am[f]) {
            if (f == am.length - 1) {
                al[am[f]] = an
            } else {
                if (al[am[f]] == null) {
                    al[am[f]] = {}
                }
                al = al[am[f]]
            }
            f++
        }
        if (Y.useLocalStorage) {
            q._storeLocal(t)
        }
    }

    function r(o, aj, ak) {
        if (typeof aj !== "string") {
            ak = aj;
            aj = Y.ns.defaultNs
        } else {
            if (Y.ns.namespaces.indexOf(aj) < 0) {
                Y.ns.namespaces.push(aj)
            }
        }
        for (var f in ak) {
            if (typeof ak[f] === "string") {
                Z(o, aj, f, ak[f])
            }
        }
    }

    function ah(f) {
        Y.ns.defaultNs = f
    }

    function R(o, f) {
        M([o], f)
    }

    function M(ak, am) {
        var o = {
            dynamicLoad: Y.dynamicLoad,
            resGetPath: Y.resGetPath,
            getAsync: Y.getAsync,
            customLoad: Y.customLoad,
            ns: {
                namespaces: ak,
                defaultNs: ""
            }
        };
        var aj = ad.toLanguages(Y.lng);
        if (typeof Y.preload === "string") {
            Y.preload = [Y.preload]
        }
        for (var ao = 0, al = Y.preload.length; ao < al; ao++) {
            var an = ad.toLanguages(Y.preload[ao]);
            for (var av = 0, aq = an.length; av < aq; av++) {
                if (aj.indexOf(an[av]) < 0) {
                    aj.push(an[av])
                }
            }
        }
        var ax = [];
        for (var aw = 0, at = aj.length; aw < at; aw++) {
            var ap = false;
            var f = t[aj[aw]];
            if (f) {
                for (var au = 0, ar = ak.length; au < ar; au++) {
                    if (!f[ak[au]]) {
                        ap = true
                    }
                }
            } else {
                ap = true
            }
            if (ap) {
                ax.push(aj[aw])
            }
        }
        if (ax.length) {
            ai.sync._fetch(ax, o, function(aA, az) {
                var ay = ak.length * ax.length;
                ad.each(ak, function(aC, aB) {
                    if (Y.ns.namespaces.indexOf(aB) < 0) {
                        Y.ns.namespaces.push(aB)
                    }
                    ad.each(ax, function(aD, aE) {
                        t[aE] = t[aE] || {};
                        t[aE][aB] = az[aE][aB];
                        ay--;
                        if (ay === 0 && am) {
                            if (Y.useLocalStorage) {
                                ai.sync._storeLocal(t)
                            }
                            am()
                        }
                    })
                })
            })
        } else {
            if (am) {
                am()
            }
        }
    }

    function D(aj, o, f) {
        if (typeof o === "function") {
            f = o;
            o = {}
        } else {
            if (!o) {
                o = {}
            }
        }
        o.lng = aj;
        return ab(o, f)
    }

    function C() {
        return z
    }

    function af() {
        var f = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam"];
        if (f.some(function(o) {
                return new RegExp("^" + o).test(z)
            })) {
            return "rtl"
        }
        return "ltr"
    }

    function ag(f) {
        t = {};
        D(z, f)
    }

    function g() {
        window.i18next = window.i18n;
        if (w) {
            window.i18n = w
        } else {
            delete window.i18n
        }
    }

    function G() {
        H.t = H.t || c;

        function o(an, am, al) {
            if (am.length === 0) {
                return
            }
            var aj = "text";
            if (am.indexOf("[") === 0) {
                var aq = am.split("]");
                am = aq[1];
                aj = aq[0].substr(1, aq[0].length - 1)
            }
            if (am.indexOf(";") === am.length - 1) {
                am = am.substr(0, am.length - 2)
            }
            var ak;
            if (aj === "html") {
                ak = Y.defaultValueFromContent ? H.extend({
                    defaultValue: an.html()
                }, al) : al;
                an.html(H.t(am, ak))
            } else {
                if (aj === "text") {
                    ak = Y.defaultValueFromContent ? H.extend({
                        defaultValue: an.text()
                    }, al) : al;
                    an.text(H.t(am, ak))
                } else {
                    if (aj === "prepend") {
                        ak = Y.defaultValueFromContent ? H.extend({
                            defaultValue: an.html()
                        }, al) : al;
                        an.prepend(H.t(am, ak))
                    } else {
                        if (aj === "append") {
                            ak = Y.defaultValueFromContent ? H.extend({
                                defaultValue: an.html()
                            }, al) : al;
                            an.append(H.t(am, ak))
                        } else {
                            if (aj.indexOf("data-") === 0) {
                                var ap = aj.substr(("data-").length);
                                ak = Y.defaultValueFromContent ? H.extend({
                                    defaultValue: an.data(ap)
                                }, al) : al;
                                var ao = H.t(am, ak);
                                an.data(ap, ao);
                                an.attr(aj, ao)
                            } else {
                                ak = Y.defaultValueFromContent ? H.extend({
                                    defaultValue: an.attr(aj)
                                }, al) : al;
                                an.attr(aj, H.t(am, ak))
                            }
                        }
                    }
                }
            }
        }

        function f(an, aj) {
            var ak = an.attr(Y.selectorAttr);
            if (!ak && typeof ak !== "undefined" && ak !== false) {
                ak = an.text() || an.val()
            }
            if (!ak) {
                return
            }
            var ao = an,
                am = an.data("i18n-target");
            if (am) {
                ao = an.find(am) || an
            }
            if (!aj && Y.useDataAttrOptions === true) {
                aj = an.data("i18n-options")
            }
            aj = aj || {};
            if (ak.indexOf(";") >= 0) {
                var al = ak.split(";");
                H.each(al, function(aq, ar) {
                    if (ar !== "") {
                        o(ao, ar, aj)
                    }
                })
            } else {
                o(ao, ak, aj)
            }
            if (Y.useDataAttrOptions === true) {
                var ap = H.extend({
                    lng: "non",
                    lngs: [],
                    _origLng: "non"
                }, aj);
                delete ap.lng;
                delete ap.lngs;
                delete ap._origLng;
                an.data("i18n-options", ap)
            }
        }
        H.fn.i18n = function(aj) {
            return this.each(function() {
                f(H(this), aj);
                var ak = H(this).find("[" + Y.selectorAttr + "]");
                ak.each(function() {
                    f(H(this), aj)
                })
            })
        }
    }

    function N() {
        function o(am, al, ak) {
            if (al.length === 0) {
                return
            }
            var aj = "text";
            if (al.indexOf("[") === 0) {
                var an = al.split("]");
                al = an[1];
                aj = an[0].substr(1, an[0].length - 1)
            }
            if (al.indexOf(";") === al.length - 1) {
                al = al.substr(0, al.length - 2)
            }
            if (aj === "html") {
                am.innerHTML = c(al, ak)
            } else {
                if (aj === "text") {
                    am.textContent = c(al, ak)
                } else {
                    if (aj === "prepend") {
                        am.insertAdjacentHTML(c(al, ak), "afterbegin")
                    } else {
                        if (aj === "append") {
                            am.insertAdjacentHTML(c(al, ak), "beforeend")
                        } else {
                            am.setAttribute(aj, c(al, ak))
                        }
                    }
                }
            }
        }

        function f(ap, ak) {
            var al = ap.getAttribute(Y.selectorAttr);
            if (!al && typeof al !== "undefined" && al !== false) {
                al = ap.textContent || ap.value
            }
            if (!al) {
                return
            }
            var aq = ap,
                ao = ap.getAttribute("i18n-target");
            if (ao) {
                aq = ap.querySelector(ao) || ap
            }
            if (al.indexOf(";") >= 0) {
                var an = al.split(";"),
                    aj = 0,
                    am = an.length;
                for (; aj < am; aj++) {
                    if (an[aj] !== "") {
                        o(aq, an[aj], ak)
                    }
                }
            } else {
                o(aq, al, ak)
            }
        }
        ai.translateObject = function(al, ak) {
            var an = al.querySelectorAll("[" + Y.selectorAttr + "]");
            var aj = 0,
                am = an.length;
            for (; aj < am; aj++) {
                f(an[aj], ak)
            }
        }
    }

    function aa(an, f, aj, ar) {
        if (!an) {
            return an
        }
        ar = ar || f;
        if (an.indexOf(ar.interpolationPrefix || Y.interpolationPrefix) < 0) {
            return an
        }
        var ak = ar.interpolationPrefix ? ad.regexEscape(ar.interpolationPrefix) : Y.interpolationPrefixEscaped,
            ap = ar.interpolationSuffix ? ad.regexEscape(ar.interpolationSuffix) : Y.interpolationSuffixEscaped,
            al = ar.keyseparator || Y.keyseparator,
            ao = "HTML" + ap;
        var o = f.replace && typeof f.replace === "object" ? f.replace : f;
        var am = new RegExp([ak, "(.+?)", "(HTML)?", ap].join(""), "g");
        var aq = ar.escapeInterpolation || Y.escapeInterpolation;
        return an.replace(am, function(at, aw, av) {
            var ax = o;
            var au = aw;
            while (au.indexOf(al) >= 0 && typeof ax === "object" && ax) {
                var az = au.slice(0, au.indexOf(al));
                au = au.slice(au.indexOf(al) + 1);
                ax = ax[az]
            }
            if (ax && typeof ax === "object" && ax.hasOwnProperty(au)) {
                var ay = ax[au];
                if (aq && !av) {
                    return ad.escape(ax[au])
                } else {
                    return ax[au]
                }
            } else {
                return at
            }
        })
    }
    ad.applyReplacement = aa;

    function l(ap, av) {
        var aw = ",";
        var ak = "{";
        var aq = "}";
        var f = ad.extend({}, av);
        delete f.postProcess;
        while (ap.indexOf(Y.reusePrefix) != -1) {
            s++;
            if (s > Y.maxRecursion) {
                break
            }
            var ao = ap.lastIndexOf(Y.reusePrefix);
            var au = ap.indexOf(Y.reuseSuffix, ao) + Y.reuseSuffix.length;
            var aj = ap.substring(ao, au);
            var at = aj.replace(Y.reusePrefix, "").replace(Y.reuseSuffix, "");
            if (au <= ao) {
                ad.error("there is an missing closing in following translation value", ap);
                return ""
            }
            if (at.indexOf(aw) != -1) {
                var ar = at.indexOf(aw);
                if (at.indexOf(ak, ar) != -1 && at.indexOf(aq, ar) != -1) {
                    var an = at.indexOf(ak, ar);
                    var o = at.indexOf(aq, an) + aq.length;
                    try {
                        f = ad.extend(f, JSON.parse(at.substring(an, o)));
                        at = at.substring(0, ar)
                    } catch (am) {}
                }
            }
            var al = S(at, f);
            ap = ap.replace(aj, ad.regexReplacementEscape(al))
        }
        return ap
    }

    function V(f) {
        return (f.context && (typeof f.context == "string" || typeof f.context == "number"))
    }

    function ac(o, f) {
        return (o.count !== undefined && typeof o.count != "string")
    }

    function y(f) {
        return (f.indefinite_article !== undefined && typeof f.indefinite_article != "string" && f.indefinite_article)
    }

    function a(o, f) {
        f = f || {};
        var aj = u(o, f),
            ak = Q(o, f);
        return ak !== undefined || ak === aj
    }

    function c(o, f) {
        f = f || {};
        if (!n) {
            ad.log("i18next not finished initialization. you might have called t function before loading resources finished.");
            return f.defaultValue || ""
        }
        s = 0;
        return S.apply(null, arguments)
    }

    function u(o, f) {
        return (f.defaultValue !== undefined) ? f.defaultValue : o
    }

    function L() {
        var f = [];
        for (var o = 1; o < arguments.length; o++) {
            f.push(arguments[o])
        }
        return {
            postProcess: "sprintf",
            sprintf: f
        }
    }

    function S(ak, at) {
        if (at && typeof at !== "object") {
            if (Y.shortcutFunction === "sprintf") {
                at = L.apply(null, arguments)
            } else {
                if (Y.shortcutFunction === "defaultValue") {
                    at = {
                        defaultValue: at
                    }
                }
            }
        } else {
            at = at || {}
        }
        if (typeof Y.defaultVariables === "object") {
            at = ad.extend({}, Y.defaultVariables, at)
        }
        if (ak === undefined || ak === null || ak === "") {
            return ""
        }
        if (typeof ak === "number") {
            ak = String(ak)
        }
        if (typeof ak === "string") {
            ak = [ak]
        }
        var ap = ak[0];
        if (ak.length > 1) {
            for (var al = 0; al < ak.length; al++) {
                ap = ak[al];
                if (a(ap, at)) {
                    break
                }
            }
        }
        var ao = u(ap, at),
            ar = Q(ap, at),
            f = at.nsseparator || Y.nsseparator,
            aq = at.lng ? ad.toLanguages(at.lng, at.fallbackLng) : O,
            am = at.ns || Y.ns.defaultNs,
            aj;
        if (ap.indexOf(f) > -1) {
            aj = ap.split(f);
            am = aj[0];
            ap = aj[1]
        }
        if (ar === undefined && Y.sendMissing && typeof Y.missingKeyHandler === "function") {
            if (at.lng) {
                Y.missingKeyHandler(aq[0], am, ap, ao, aq)
            } else {
                Y.missingKeyHandler(Y.lng, am, ap, ao, aq)
            }
        }
        var o;
        if (typeof Y.postProcess === "string" && Y.postProcess !== "") {
            o = [Y.postProcess]
        } else {
            if (typeof Y.postProcess === "array" || typeof Y.postProcess === "object") {
                o = Y.postProcess
            } else {
                o = []
            }
        }
        if (typeof at.postProcess === "string" && at.postProcess !== "") {
            o = o.concat([at.postProcess])
        } else {
            if (typeof at.postProcess === "array" || typeof at.postProcess === "object") {
                o = o.concat(at.postProcess)
            }
        }
        if (ar !== undefined && o.length) {
            o.forEach(function(au) {
                if (W[au]) {
                    ar = W[au](ar, ap, at)
                }
            })
        }
        var an = ao;
        if (ao.indexOf(f) > -1) {
            aj = ao.split(f);
            an = aj[1]
        }
        if (an === ap && Y.parseMissingKey) {
            ao = Y.parseMissingKey(ao)
        }
        if (ar === undefined) {
            ao = aa(ao, at);
            ao = l(ao, at);
            if (o.length) {
                ar = u(ap, at);
                o.forEach(function(au) {
                    if (W[au]) {
                        ar = W[au](ar, ap, at)
                    }
                })
            }
        }
        return (ar !== undefined) ? ar : ao
    }

    function Q(aK, al) {
        al = al || {};
        var aj, aE, ap = u(aK, al),
            ay = O;
        if (!t) {
            return ap
        }
        if (ay[0].toLowerCase() === "cimode") {
            return ap
        }
        if (al.lngs) {
            ay = al.lngs
        }
        if (al.lng) {
            ay = ad.toLanguages(al.lng, al.fallbackLng);
            if (!t[ay[0]]) {
                var ak = Y.getAsync;
                Y.getAsync = false;
                ai.sync.load(ay, Y, function(aN, aM) {
                    ad.extend(t, aM);
                    Y.getAsync = ak
                })
            }
        }
        var aL = al.ns || Y.ns.defaultNs;
        var aq = al.nsseparator || Y.nsseparator;
        if (aK.indexOf(aq) > -1) {
            var aA = aK.split(aq);
            aL = aA[0];
            aK = aA[1]
        }
        if (V(al)) {
            aj = ad.extend({}, al);
            delete aj.context;
            aj.defaultValue = Y.contextNotFound;
            var ao = aL + aq + aK + "_" + al.context;
            aE = c(ao, aj);
            if (aE != Y.contextNotFound) {
                return aa(aE, {
                    context: al.context
                })
            }
        }
        if (ac(al, ay[0])) {
            aj = ad.extend({
                lngs: [ay[0]]
            }, al);
            delete aj.count;
            aj._origLng = aj._origLng || aj.lng || ay[0];
            delete aj.lng;
            aj.defaultValue = Y.pluralNotFound;
            var au;
            if (!F.needsPlural(ay[0], al.count)) {
                au = aL + aq + aK
            } else {
                au = aL + aq + aK + Y.pluralSuffix;
                var aJ = F.get(ay[0], al.count);
                if (aJ >= 0) {
                    au = au + "_" + aJ
                } else {
                    if (aJ === 1) {
                        au = aL + aq + aK
                    }
                }
            }
            aE = c(au, aj);
            if (aE != Y.pluralNotFound) {
                return aa(aE, {
                    count: al.count,
                    interpolationPrefix: al.interpolationPrefix,
                    interpolationSuffix: al.interpolationSuffix
                })
            } else {
                if (ay.length > 1) {
                    var aI = ay.slice();
                    aI.shift();
                    al = ad.extend(al, {
                        lngs: aI
                    });
                    al._origLng = aj._origLng;
                    delete al.lng;
                    aE = c(aL + aq + aK, al);
                    if (aE != Y.pluralNotFound) {
                        return aE
                    }
                } else {
                    aj.lng = aj._origLng;
                    delete aj._origLng;
                    aE = c(aL + aq + aK, aj);
                    return aa(aE, {
                        count: al.count,
                        interpolationPrefix: al.interpolationPrefix,
                        interpolationSuffix: al.interpolationSuffix
                    })
                }
            }
        }
        if (y(al)) {
            var o = ad.extend({}, al);
            delete o.indefinite_article;
            o.defaultValue = Y.indefiniteNotFound;
            var an = aL + aq + aK + (((al.count && !ac(al, ay[0])) || !al.count) ? Y.indefiniteSuffix : "");
            aE = c(an, o);
            if (aE != Y.indefiniteNotFound) {
                return aE
            }
        }
        var aw;
        var f = al.keyseparator || Y.keyseparator;
        var ax = aK.split(f);
        for (var aF = 0, aG = ay.length; aF < aG; aF++) {
            if (aw !== undefined) {
                break
            }
            var aD = ay[aF];
            var at = 0;
            var aB = t[aD] && t[aD][aL];
            while (ax[at]) {
                aB = aB && aB[ax[at]];
                at++
            }
            if (aB !== undefined && (!Y.showKeyIfEmpty || aB !== "")) {
                var aH = Object.prototype.toString.apply(aB);
                if (typeof aB === "string") {
                    aB = aa(aB, al);
                    aB = l(aB, al)
                } else {
                    if (aH === "[object Array]" && !Y.returnObjectTrees && !al.returnObjectTrees) {
                        aB = aB.join("\n");
                        aB = aa(aB, al);
                        aB = l(aB, al)
                    } else {
                        if (aB === null && Y.fallbackOnNull === true) {
                            aB = undefined
                        } else {
                            if (aB !== null) {
                                if (!Y.returnObjectTrees && !al.returnObjectTrees) {
                                    if (Y.objectTreeKeyHandler && typeof Y.objectTreeKeyHandler == "function") {
                                        aB = Y.objectTreeKeyHandler(aK, aB, aD, aL, al)
                                    } else {
                                        aB = "key '" + aL + ":" + aK + " (" + aD + ")' returned an object instead of string.";
                                        ad.log(aB)
                                    }
                                } else {
                                    if (aH !== "[object Number]" && aH !== "[object Function]" && aH !== "[object RegExp]") {
                                        var aC = (aH === "[object Array]") ? [] : {};
                                        ad.each(aB, function(aM) {
                                            aC[aM] = S(aL + aq + aK + f + aM, al)
                                        });
                                        aB = aC
                                    }
                                }
                            }
                        }
                    }
                }
                if (typeof aB === "string" && aB.trim() === "" && Y.fallbackOnEmpty === true) {
                    aB = undefined
                }
                aw = aB
            }
        }
        if (aw === undefined && !al.isFallbackLookup && (Y.fallbackToDefaultNS === true || (Y.fallbackNS && Y.fallbackNS.length > 0))) {
            al.isFallbackLookup = true;
            if (Y.fallbackNS.length) {
                for (var ar = 0, av = Y.fallbackNS.length; ar < av; ar++) {
                    aw = Q(Y.fallbackNS[ar] + aq + aK, al);
                    if (aw || (aw === "" && Y.fallbackOnEmpty === false)) {
                        var az = aw.indexOf(aq) > -1 ? aw.split(aq)[1] : aw,
                            am = ap.indexOf(aq) > -1 ? ap.split(aq)[1] : ap;
                        if (az !== am) {
                            break
                        }
                    }
                }
            } else {
                al.ns = Y.ns.defaultNs;
                aw = Q(aK, al)
            }
            al.isFallbackLookup = false
        }
        return aw
    }

    function i() {
        var am;
        var aj = Y.lngWhitelist || [];
        var ak = [];
        var f = [];
        if (typeof window !== "undefined") {
            (function() {
                var aq = window.location.search.substring(1);
                var ar = aq.split("&");
                for (var ap = 0; ap < ar.length; ap++) {
                    var at = ar[ap].indexOf("=");
                    if (at > 0) {
                        var ao = ar[ap].substring(0, at);
                        if (ao == Y.detectLngQS) {
                            ak.push(ar[ap].substring(at + 1))
                        }
                    }
                }
            })()
        }
        if (Y.useCookie && typeof document !== "undefined") {
            var an = ad.cookie.read(Y.cookieName);
            if (an) {
                ak.push(an)
            }
        }
        if (Y.detectLngFromLocalStorage && typeof window !== "undefined" && window.localStorage) {
            var al = ad.localStorage.getItem("i18next_lng");
            if (al) {
                ak.push(al)
            }
        }
        if (typeof navigator !== "undefined") {
            if (navigator.languages) {
                for (var o = 0; o < navigator.languages.length; o++) {
                    ak.push(navigator.languages[o])
                }
            }
            if (navigator.userLanguage) {
                ak.push(navigator.userLanguage)
            }
            if (navigator.language) {
                ak.push(navigator.language)
            }
        }(function() {
            for (var ap = 0; ap < ak.length; ap++) {
                var ao = ak[ap];
                if (ao.indexOf("-") > -1) {
                    var aq = ao.split("-");
                    ao = Y.lowerCaseLng ? aq[0].toLowerCase() + "-" + aq[1].toLowerCase() : aq[0].toLowerCase() + "-" + aq[1].toUpperCase()
                }
                if (aj.length === 0 || aj.indexOf(ao) > -1) {
                    am = ao;
                    break
                }
            }
        })();
        if (!am) {
            am = Y.fallbackLng[0]
        }
        return am
    }
    var h = [
        ["ach", "Acholi", [1, 2], 1],
        ["af", "Afrikaans", [1, 2], 2],
        ["ak", "Akan", [1, 2], 1],
        ["am", "Amharic", [1, 2], 1],
        ["an", "Aragonese", [1, 2], 2],
        ["ar", "Arabic", [0, 1, 2, 3, 11, 100], 5],
        ["arn", "Mapudungun", [1, 2], 1],
        ["ast", "Asturian", [1, 2], 2],
        ["ay", "Aymará", [1], 3],
        ["az", "Azerbaijani", [1, 2], 2],
        ["be", "Belarusian", [1, 2, 5], 4],
        ["bg", "Bulgarian", [1, 2], 2],
        ["bn", "Bengali", [1, 2], 2],
        ["bo", "Tibetan", [1], 3],
        ["br", "Breton", [1, 2], 1],
        ["bs", "Bosnian", [1, 2, 5], 4],
        ["ca", "Catalan", [1, 2], 2],
        ["cgg", "Chiga", [1], 3],
        ["cs", "Czech", [1, 2, 5], 6],
        ["csb", "Kashubian", [1, 2, 5], 7],
        ["cy", "Welsh", [1, 2, 3, 8], 8],
        ["da", "Danish", [1, 2], 2],
        ["de", "German", [1, 2], 2],
        ["dev", "Development Fallback", [1, 2], 2],
        ["dz", "Dzongkha", [1], 3],
        ["el", "Greek", [1, 2], 2],
        ["en", "English", [1, 2], 2],
        ["eo", "Esperanto", [1, 2], 2],
        ["es", "Spanish", [1, 2], 2],
        ["es_ar", "Argentinean Spanish", [1, 2], 2],
        ["et", "Estonian", [1, 2], 2],
        ["eu", "Basque", [1, 2], 2],
        ["fa", "Persian", [1], 3],
        ["fi", "Finnish", [1, 2], 2],
        ["fil", "Filipino", [1, 2], 1],
        ["fo", "Faroese", [1, 2], 2],
        ["fr", "French", [1, 2], 9],
        ["fur", "Friulian", [1, 2], 2],
        ["fy", "Frisian", [1, 2], 2],
        ["ga", "Irish", [1, 2, 3, 7, 11], 10],
        ["gd", "Scottish Gaelic", [1, 2, 3, 20], 11],
        ["gl", "Galician", [1, 2], 2],
        ["gu", "Gujarati", [1, 2], 2],
        ["gun", "Gun", [1, 2], 1],
        ["ha", "Hausa", [1, 2], 2],
        ["he", "Hebrew", [1, 2], 2],
        ["hi", "Hindi", [1, 2], 2],
        ["hr", "Croatian", [1, 2, 5], 4],
        ["hu", "Hungarian", [1, 2], 2],
        ["hy", "Armenian", [1, 2], 2],
        ["ia", "Interlingua", [1, 2], 2],
        ["id", "Indonesian", [1], 3],
        ["is", "Icelandic", [1, 2], 12],
        ["it", "Italian", [1, 2], 2],
        ["ja", "Japanese", [1], 3],
        ["jbo", "Lojban", [1], 3],
        ["jv", "Javanese", [0, 1], 13],
        ["ka", "Georgian", [1], 3],
        ["kk", "Kazakh", [1], 3],
        ["km", "Khmer", [1], 3],
        ["kn", "Kannada", [1, 2], 2],
        ["ko", "Korean", [1], 3],
        ["ku", "Kurdish", [1, 2], 2],
        ["kw", "Cornish", [1, 2, 3, 4], 14],
        ["ky", "Kyrgyz", [1], 3],
        ["lb", "Letzeburgesch", [1, 2], 2],
        ["ln", "Lingala", [1, 2], 1],
        ["lo", "Lao", [1], 3],
        ["lt", "Lithuanian", [1, 2, 10], 15],
        ["lv", "Latvian", [1, 2, 0], 16],
        ["mai", "Maithili", [1, 2], 2],
        ["mfe", "Mauritian Creole", [1, 2], 1],
        ["mg", "Malagasy", [1, 2], 1],
        ["mi", "Maori", [1, 2], 1],
        ["mk", "Macedonian", [1, 2], 17],
        ["ml", "Malayalam", [1, 2], 2],
        ["mn", "Mongolian", [1, 2], 2],
        ["mnk", "Mandinka", [0, 1, 2], 18],
        ["mr", "Marathi", [1, 2], 2],
        ["ms", "Malay", [1], 3],
        ["mt", "Maltese", [1, 2, 11, 20], 19],
        ["nah", "Nahuatl", [1, 2], 2],
        ["nap", "Neapolitan", [1, 2], 2],
        ["nb", "Norwegian Bokmal", [1, 2], 2],
        ["ne", "Nepali", [1, 2], 2],
        ["nl", "Dutch", [1, 2], 2],
        ["nn", "Norwegian Nynorsk", [1, 2], 2],
        ["no", "Norwegian", [1, 2], 2],
        ["nso", "Northern Sotho", [1, 2], 2],
        ["oc", "Occitan", [1, 2], 1],
        ["or", "Oriya", [2, 1], 2],
        ["pa", "Punjabi", [1, 2], 2],
        ["pap", "Papiamento", [1, 2], 2],
        ["pl", "Polish", [1, 2, 5], 7],
        ["pms", "Piemontese", [1, 2], 2],
        ["ps", "Pashto", [1, 2], 2],
        ["pt", "Portuguese", [1, 2], 2],
        ["pt_br", "Brazilian Portuguese", [1, 2], 2],
        ["rm", "Romansh", [1, 2], 2],
        ["ro", "Romanian", [1, 2, 20], 20],
        ["ru", "Russian", [1, 2, 5], 4],
        ["sah", "Yakut", [1], 3],
        ["sco", "Scots", [1, 2], 2],
        ["se", "Northern Sami", [1, 2], 2],
        ["si", "Sinhala", [1, 2], 2],
        ["sk", "Slovak", [1, 2, 5], 6],
        ["sl", "Slovenian", [5, 1, 2, 3], 21],
        ["so", "Somali", [1, 2], 2],
        ["son", "Songhay", [1, 2], 2],
        ["sq", "Albanian", [1, 2], 2],
        ["sr", "Serbian", [1, 2, 5], 4],
        ["su", "Sundanese", [1], 3],
        ["sv", "Swedish", [1, 2], 2],
        ["sw", "Swahili", [1, 2], 2],
        ["ta", "Tamil", [1, 2], 2],
        ["te", "Telugu", [1, 2], 2],
        ["tg", "Tajik", [1, 2], 1],
        ["th", "Thai", [1], 3],
        ["ti", "Tigrinya", [1, 2], 1],
        ["tk", "Turkmen", [1, 2], 2],
        ["tr", "Turkish", [1, 2], 1],
        ["tt", "Tatar", [1], 3],
        ["ug", "Uyghur", [1], 3],
        ["uk", "Ukrainian", [1, 2, 5], 4],
        ["ur", "Urdu", [1, 2], 2],
        ["uz", "Uzbek", [1, 2], 1],
        ["vi", "Vietnamese", [1], 3],
        ["wa", "Walloon", [1, 2], 1],
        ["wo", "Wolof", [1], 3],
        ["yo", "Yoruba", [1, 2], 2],
        ["zh", "Chinese", [1], 3]
    ];
    var d = {
        1: function(f) {
            return Number(f > 1)
        },
        2: function(f) {
            return Number(f != 1)
        },
        3: function(f) {
            return 0
        },
        4: function(f) {
            return Number(f % 10 == 1 && f % 100 != 11 ? 0 : f % 10 >= 2 && f % 10 <= 4 && (f % 100 < 10 || f % 100 >= 20) ? 1 : 2)
        },
        5: function(f) {
            return Number(f === 0 ? 0 : f == 1 ? 1 : f == 2 ? 2 : f % 100 >= 3 && f % 100 <= 10 ? 3 : f % 100 >= 11 ? 4 : 5)
        },
        6: function(f) {
            return Number((f == 1) ? 0 : (f >= 2 && f <= 4) ? 1 : 2)
        },
        7: function(f) {
            return Number(f == 1 ? 0 : f % 10 >= 2 && f % 10 <= 4 && (f % 100 < 10 || f % 100 >= 20) ? 1 : 2)
        },
        8: function(f) {
            return Number((f == 1) ? 0 : (f == 2) ? 1 : (f != 8 && f != 11) ? 2 : 3)
        },
        9: function(f) {
            return Number(f >= 2)
        },
        10: function(f) {
            return Number(f == 1 ? 0 : f == 2 ? 1 : f < 7 ? 2 : f < 11 ? 3 : 4)
        },
        11: function(f) {
            return Number((f == 1 || f == 11) ? 0 : (f == 2 || f == 12) ? 1 : (f > 2 && f < 20) ? 2 : 3)
        },
        12: function(f) {
            return Number(f % 10 != 1 || f % 100 == 11)
        },
        13: function(f) {
            return Number(f !== 0)
        },
        14: function(f) {
            return Number((f == 1) ? 0 : (f == 2) ? 1 : (f == 3) ? 2 : 3)
        },
        15: function(f) {
            return Number(f % 10 == 1 && f % 100 != 11 ? 0 : f % 10 >= 2 && (f % 100 < 10 || f % 100 >= 20) ? 1 : 2)
        },
        16: function(f) {
            return Number(f % 10 == 1 && f % 100 != 11 ? 0 : f !== 0 ? 1 : 2)
        },
        17: function(f) {
            return Number(f == 1 || f % 10 == 1 ? 0 : 1)
        },
        18: function(f) {
            return Number(f == 0 ? 0 : f == 1 ? 1 : 2)
        },
        19: function(f) {
            return Number(f == 1 ? 0 : f === 0 || (f % 100 > 1 && f % 100 < 11) ? 1 : (f % 100 > 10 && f % 100 < 20) ? 2 : 3)
        },
        20: function(f) {
            return Number(f == 1 ? 0 : (f === 0 || (f % 100 > 0 && f % 100 < 20)) ? 1 : 2)
        },
        21: function(f) {
            return Number(f % 100 == 1 ? 1 : f % 100 == 2 ? 2 : f % 100 == 3 || f % 100 == 4 ? 3 : 0)
        }
    };
    var F = {
        rules: (function() {
            var f, o = {};
            for (f = h.length; f--;) {
                o[h[f][0]] = {
                    name: h[f][1],
                    numbers: h[f][2],
                    plurals: d[h[f][3]]
                }
            }
            return o
        }()),
        addRule: function(f, o) {
            F.rules[f] = o
        },
        setCurrentLng: function(f) {
            if (!F.currentRule || F.currentRule.lng !== f) {
                var o = f.split("-");
                F.currentRule = {
                    lng: f,
                    rule: F.rules[o[0]]
                }
            }
        },
        needsPlural: function(f, aj) {
            var ak = f.split("-");
            var o;
            if (F.currentRule && F.currentRule.lng === f) {
                o = F.currentRule.rule
            } else {
                o = F.rules[ak[ad.getCountyIndexOfLng(f)]]
            }
            if (o && o.numbers.length <= 1) {
                return false
            } else {
                return this.get(f, aj) !== 1
            }
        },
        get: function(f, o) {
            var aj = f.split("-");

            function ak(al, ap) {
                var an;
                if (F.currentRule && F.currentRule.lng === f) {
                    an = F.currentRule.rule
                } else {
                    an = F.rules[al]
                }
                if (an) {
                    var am;
                    if (an.noAbs) {
                        am = an.plurals(ap)
                    } else {
                        am = an.plurals(Math.abs(ap))
                    }
                    var ao = an.numbers[am];
                    if (an.numbers.length === 2 && an.numbers[0] === 1) {
                        if (ao === 2) {
                            ao = -1
                        } else {
                            if (ao === 1) {
                                ao = 1
                            }
                        }
                    }
                    return ao
                } else {
                    return ap === 1 ? "1" : "-1"
                }
            }
            return ak(aj[ad.getCountyIndexOfLng(f)], o)
        }
    };
    var W = {};
    var K = function(f, o) {
        W[f] = o
    };
    var v = (function() {
        function f(ak) {
            return Object.prototype.toString.call(ak).slice(8, -1).toLowerCase()
        }

        function o(al, am) {
            for (var ak = []; am > 0; ak[--am] = al) {}
            return ak.join("")
        }
        var aj = function() {
            if (!aj.cache.hasOwnProperty(arguments[0])) {
                aj.cache[arguments[0]] = aj.parse(arguments[0])
            }
            return aj.format.call(null, aj.cache[arguments[0]], arguments)
        };
        aj.format = function(ar, aq) {
            var aw = 1,
                au = ar.length,
                an = "",
                ax, ak = [],
                ao, am, ap, al, at, av;
            for (ao = 0; ao < au; ao++) {
                an = f(ar[ao]);
                if (an === "string") {
                    ak.push(ar[ao])
                } else {
                    if (an === "array") {
                        ap = ar[ao];
                        if (ap[2]) {
                            ax = aq[aw];
                            for (am = 0; am < ap[2].length; am++) {
                                if (!ax.hasOwnProperty(ap[2][am])) {
                                    throw (v('[sprintf] property "%s" does not exist', ap[2][am]))
                                }
                                ax = ax[ap[2][am]]
                            }
                        } else {
                            if (ap[1]) {
                                ax = aq[ap[1]]
                            } else {
                                ax = aq[aw++]
                            }
                        }
                        if (/[^s]/.test(ap[8]) && (f(ax) != "number")) {
                            throw (v("[sprintf] expecting number but found %s", f(ax)))
                        }
                        switch (ap[8]) {
                            case "b":
                                ax = ax.toString(2);
                                break;
                            case "c":
                                ax = String.fromCharCode(ax);
                                break;
                            case "d":
                                ax = parseInt(ax, 10);
                                break;
                            case "e":
                                ax = ap[7] ? ax.toExponential(ap[7]) : ax.toExponential();
                                break;
                            case "f":
                                ax = ap[7] ? parseFloat(ax).toFixed(ap[7]) : parseFloat(ax);
                                break;
                            case "o":
                                ax = ax.toString(8);
                                break;
                            case "s":
                                ax = ((ax = String(ax)) && ap[7] ? ax.substring(0, ap[7]) : ax);
                                break;
                            case "u":
                                ax = Math.abs(ax);
                                break;
                            case "x":
                                ax = ax.toString(16);
                                break;
                            case "X":
                                ax = ax.toString(16).toUpperCase();
                                break
                        }
                        ax = (/[def]/.test(ap[8]) && ap[3] && ax >= 0 ? "+" + ax : ax);
                        at = ap[4] ? ap[4] == "0" ? "0" : ap[4].charAt(1) : " ";
                        av = ap[6] - String(ax).length;
                        al = ap[6] ? o(at, av) : "";
                        ak.push(ap[5] ? ax + al : al + ax)
                    }
                }
            }
            return ak.join("")
        };
        aj.cache = {};
        aj.parse = function(ak) {
            var an = ak,
                ao = [],
                aq = [],
                ap = 0;
            while (an) {
                if ((ao = /^[^\x25]+/.exec(an)) !== null) {
                    aq.push(ao[0])
                } else {
                    if ((ao = /^\x25{2}/.exec(an)) !== null) {
                        aq.push("%")
                    } else {
                        if ((ao = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(an)) !== null) {
                            if (ao[2]) {
                                ap |= 1;
                                var ar = [],
                                    am = ao[2],
                                    al = [];
                                if ((al = /^([a-z_][a-z_\d]*)/i.exec(am)) !== null) {
                                    ar.push(al[1]);
                                    while ((am = am.substring(al[0].length)) !== "") {
                                        if ((al = /^\.([a-z_][a-z_\d]*)/i.exec(am)) !== null) {
                                            ar.push(al[1])
                                        } else {
                                            if ((al = /^\[(\d+)\]/.exec(am)) !== null) {
                                                ar.push(al[1])
                                            } else {
                                                throw ("[sprintf] huh?")
                                            }
                                        }
                                    }
                                } else {
                                    throw ("[sprintf] huh?")
                                }
                                ao[2] = ar
                            } else {
                                ap |= 2
                            }
                            if (ap === 3) {
                                throw ("[sprintf] mixing positional and named placeholders is not (yet) supported")
                            }
                            aq.push(ao)
                        } else {
                            throw ("[sprintf] huh?")
                        }
                    }
                }
                an = an.substring(ao[0].length)
            }
            return aq
        };
        return aj
    })();
    var E = function(o, f) {
        f.unshift(o);
        return v.apply(null, f)
    };
    K("sprintf", function(aj, f, o) {
        if (!o.sprintf) {
            return aj
        }
        if (Object.prototype.toString.apply(o.sprintf) === "[object Array]") {
            return E(aj, o.sprintf)
        } else {
            if (typeof o.sprintf === "object") {
                return v(aj, o.sprintf)
            }
        }
        return aj
    });
    ai.init = ab;
    ai.isInitialized = U;
    ai.setLng = D;
    ai.preload = m;
    ai.addResourceBundle = ae;
    ai.hasResourceBundle = P;
    ai.getResourceBundle = x;
    ai.addResource = Z;
    ai.addResources = r;
    ai.removeResourceBundle = k;
    ai.loadNamespace = R;
    ai.loadNamespaces = M;
    ai.setDefaultNamespace = ah;
    ai.t = c;
    ai.translate = c;
    ai.exists = a;
    ai.detectLanguage = ad.detectLanguage;
    ai.pluralExtensions = F;
    ai.sync = q;
    ai.functions = ad;
    ai.lng = C;
    ai.dir = af;
    ai.addPostProcessor = K;
    ai.applyReplacement = ad.applyReplacement;
    ai.options = Y;
    ai.noConflict = g
})(typeof exports === "undefined" ? window : exports);
var Mailcheck = {
    domainThreshold: 2,
    secondLevelThreshold: 2,
    topLevelThreshold: 2,
    defaultDomains: ["msn.com", "bellsouth.net", "telus.net", "comcast.net", "optusnet.com.au", "earthlink.net", "qq.com", "sky.com", "icloud.com", "mac.com", "sympatico.ca", "googlemail.com", "att.net", "xtra.co.nz", "web.de", "cox.net", "gmail.com", "ymail.com", "aim.com", "rogers.com", "verizon.net", "rocketmail.com", "google.com", "optonline.net", "sbcglobal.net", "aol.com", "me.com", "btinternet.com", "charter.net", "shaw.ca"],
    defaultSecondLevelDomains: ["yahoo", "hotmail", "mail", "live", "outlook", "gmx"],
    defaultTopLevelDomains: ["com", "com.au", "com.tw", "ca", "co.nz", "co.uk", "de", "fr", "it", "ru", "net", "org", "edu", "gov", "jp", "nl", "kr", "se", "eu", "ie", "co.il", "us", "at", "be", "dk", "hk", "es", "gr", "ch", "no", "cz", "in", "net", "net.au", "info", "biz", "mil", "co.jp", "sg", "hu"],
    run: function(c) {
        c.domains = c.domains || Mailcheck.defaultDomains;
        c.secondLevelDomains = c.secondLevelDomains || Mailcheck.defaultSecondLevelDomains;
        c.topLevelDomains = c.topLevelDomains || Mailcheck.defaultTopLevelDomains;
        c.distanceFunction = c.distanceFunction || Mailcheck.sift3Distance;
        var f = function(g) {
            return g
        };
        var b = c.suggested || f;
        var d = c.empty || f;
        var a = Mailcheck.suggest(Mailcheck.encodeEmail(c.email), c.domains, c.secondLevelDomains, c.topLevelDomains, c.distanceFunction);
        return a ? b(a) : d()
    },
    suggest: function(i, k, h, d, c) {
        i = i.toLowerCase();
        var g = this.splitEmail(i);
        if (h && d) {
            if (h.indexOf(g.secondLevelDomain) !== -1 && d.indexOf(g.topLevelDomain) !== -1) {
                return false
            }
        }
        var b = this.findClosestDomain(g.domain, k, c, this.domainThreshold);
        if (b) {
            if (b == g.domain) {
                return false
            } else {
                return {
                    address: g.address,
                    domain: b,
                    full: g.address + "@" + b
                }
            }
        }
        var f = this.findClosestDomain(g.secondLevelDomain, h, c, this.secondLevelThreshold);
        var j = this.findClosestDomain(g.topLevelDomain, d, c, this.topLevelThreshold);
        if (g.domain) {
            var b = g.domain;
            var a = false;
            if (f && f != g.secondLevelDomain) {
                b = b.replace(g.secondLevelDomain, f);
                a = true
            }
            if (j && j != g.topLevelDomain) {
                b = b.replace(g.topLevelDomain, j);
                a = true
            }
            if (a == true) {
                return {
                    address: g.address,
                    domain: b,
                    full: g.address + "@" + b
                }
            }
        }
        return false
    },
    findClosestDomain: function(h, b, d, a) {
        a = a || this.topLevelThreshold;
        var j;
        var f = 99;
        var c = null;
        if (!h || !b) {
            return false
        }
        if (!d) {
            d = this.sift3Distance
        }
        for (var g = 0; g < b.length; g++) {
            if (h === b[g]) {
                return h
            }
            j = d(h, b[g]);
            if (j < f) {
                f = j;
                c = b[g]
            }
        }
        if (f <= a && c !== null) {
            return c
        } else {
            return false
        }
    },
    sift3Distance: function(g, b) {
        if (g == null || g.length === 0) {
            if (b == null || b.length === 0) {
                return 0
            } else {
                return b.length
            }
        }
        if (b == null || b.length === 0) {
            return g.length
        }
        var k = 0;
        var j = 0;
        var h = 0;
        var a = 0;
        var f = 5;
        while ((k + j < g.length) && (k + h < b.length)) {
            if (g.charAt(k + j) == b.charAt(k + h)) {
                a++
            } else {
                j = 0;
                h = 0;
                for (var d = 0; d < f; d++) {
                    if ((k + d < g.length) && (g.charAt(k + d) == b.charAt(k))) {
                        j = d;
                        break
                    }
                    if ((k + d < b.length) && (g.charAt(k) == b.charAt(k + d))) {
                        h = d;
                        break
                    }
                }
            }
            k++
        }
        return (g.length + b.length) / 2 - a
    },
    splitEmail: function(b) {
        var g = b.trim().split("@");
        if (g.length < 2) {
            return false
        }
        for (var c = 0; c < g.length; c++) {
            if (g[c] === "") {
                return false
            }
        }
        var f = g.pop();
        var h = f.split(".");
        var d = "";
        var a = "";
        if (h.length == 0) {
            return false
        } else {
            if (h.length == 1) {
                a = h[0]
            } else {
                d = h[0];
                for (var c = 1; c < h.length; c++) {
                    a += h[c] + "."
                }
                a = a.substring(0, a.length - 1)
            }
        }
        return {
            topLevelDomain: a,
            secondLevelDomain: d,
            domain: f,
            address: g.join("@")
        }
    },
    encodeEmail: function(b) {
        var a = encodeURI(b);
        a = a.replace("%20", " ").replace("%25", "%").replace("%5E", "^").replace("%60", "`").replace("%7B", "{").replace("%7C", "|").replace("%7D", "}");
        return a
    }
};
if (typeof module !== "undefined" && module.exports) {
    module.exports = Mailcheck
}
if (typeof define === "function" && define.amd) {
    define("mailcheck", [], function() {
        return Mailcheck
    })
}
if (typeof window !== "undefined" && window.jQuery) {
    (function(a) {
        a.fn.mailcheck = function(f) {
            var b = this;
            if (f.suggested) {
                var d = f.suggested;
                f.suggested = function(g) {
                    d(b, g)
                }
            }
            if (f.empty) {
                var c = f.empty;
                f.empty = function() {
                    c.call(null, b)
                }
            }
            f.email = this.val();
            Mailcheck.run(f)
        }
    })(jQuery)
}
Date.now = Date.now || function() {
    return +new Date()
};
if (typeof Function.prototype.bind != "function") {
    Function.prototype.bind = function(a) {
        var b = Array.prototype.slice.call(arguments, 1),
            c = this;
        return function() {
            b.push.apply(b, arguments);
            return c.apply(a, b)
        }
    }
}(function(a, b) {
    if (typeof define === "function" && define.amd) {
        define(b)
    } else {
        if (typeof exports === "object") {
            module.exports = b()
        } else {
            a.Tock = b()
        }
    }
}(this, function() {
    function f() {
        this.time += this.interval;
        if (this.countdown && (this.duration_ms - this.time < 0)) {
            this.final_time = 0;
            this.go = false;
            this.callback(this);
            window.clearTimeout(this.timeout);
            this.complete(this);
            return
        } else {
            this.callback(this)
        }
        var n = (Date.now() - this.start_time) - this.time,
            m = n > 0 ? this.interval - n : this.interval;
        if (m <= 0) {
            this.missed_ticks = Math.floor(Math.abs(m) / this.interval);
            this.time += this.missed_ticks * this.interval;
            if (this.go) {
                f.call(this)
            }
        } else {
            if (this.go) {
                this.timeout = window.setTimeout(f.bind(this), m)
            }
        }
    }

    function a(m) {
        this.duration_ms = m;
        this.start_time = Date.now();
        this.time = 0;
        this.go = true;
        f.call(this)
    }

    function j(m) {
        this.start_time = m || Date.now();
        this.time = 0;
        this.go = true;
        f.call(this)
    }
    var g = /^\s*(\+|-)?\d+\s*$/,
        i = /^(\d{1,2}):(\d{2})$/,
        k = /^(\d{1,2}):(\d{2})(?::|\.)(\d{2,3})$/,
        d = 3600000,
        c = 60000,
        h = 1000,
        l = /^(\d{4})-([0-1]\d)-([0-3]\d)(?:\s|T)(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3})Z?)?$/;
    var b = function(m) {
        m = m || {};
        if (!(this instanceof b)) {
            return new b(m)
        }
        b.instances = (b.instances || 0) + 1;
        this.go = false;
        this.timeout = null;
        this.missed_ticks = null;
        this.interval = m.interval || 10;
        this.countdown = m.countdown || false;
        this.start_time = 0;
        this.pause_time = 0;
        this.final_time = 0;
        this.duration_ms = 0;
        this.time = 0;
        this.callback = m.callback || function() {};
        this.complete = m.complete || function() {}
    };
    b.prototype.reset = function() {
        if (this.countdown) {
            return false
        }
        this.stop();
        this.start_time = 0;
        this.time = 0
    };
    b.prototype.start = function(m) {
        if (this.go) {
            return false
        }
        m = m ? this.timeToMS(m) : 0;
        this.start_time = m;
        this.pause_time = 0;
        if (this.countdown) {
            a.call(this, m)
        } else {
            j.call(this, Date.now() - m)
        }
    };
    b.prototype.stop = function() {
        this.pause_time = this.lap();
        this.go = false;
        window.clearTimeout(this.timeout);
        if (this.countdown) {
            this.final_time = this.duration_ms - this.time
        } else {
            this.final_time = (Date.now() - this.start_time)
        }
    };
    b.prototype.pause = function() {
        if (this.go) {
            this.pause_time = this.lap();
            this.stop()
        } else {
            if (this.pause_time) {
                if (this.countdown) {
                    a.call(this, this.pause_time)
                } else {
                    j.call(this, Date.now() - this.pause_time)
                }
                this.pause_time = 0
            }
        }
    };
    b.prototype.lap = function() {
        if (this.go) {
            var m;
            if (this.countdown) {
                m = this.duration_ms - (Date.now() - this.start_time)
            } else {
                m = (Date.now() - this.start_time)
            }
            return m
        }
        return this.pause_time || this.final_time
    };
    b.prototype.msToTime = function(n) {
        if (n <= 0) {
            return "00:00.000"
        }
        var m = (n % h).toString(),
            p = Math.floor((n / h) % 60).toString(),
            o = Math.floor((n / (c)) % 60).toString();
        if (m.length === 1) {
            m = "00" + m
        } else {
            if (m.length === 2) {
                m = "0" + m
            }
        }
        if (p.length === 1) {
            p = "0" + p
        }
        if (o.length === 1) {
            o = "0" + o
        }
        return o + ":" + p + "." + m
    };
    b.prototype.msToTimecode = function(m) {
        if (m <= 0) {
            return "00:00:00"
        }
        var p = Math.floor((m / h) % 60).toString(),
            n = Math.floor((m / (c)) % 60).toString(),
            o = Math.floor((m / (d)) % 60).toString();
        if (p.length === 1) {
            p = "0" + p
        }
        if (n.length === 1) {
            n = "0" + n
        }
        if (o.length === 1) {
            o = "0" + o
        }
        return o + ":" + n + ":" + p
    };
    b.prototype.timeToMS = function(r) {
        if (g.test(String(r))) {
            return r
        }
        var q, m, p, o, n = new Date();
        if (i.test(r)) {
            m = r.split(":");
            q = parseInt(m[0], 10) * c;
            q += parseInt(m[1], 10) * h
        } else {
            p = r.match(k);
            if (p) {
                if (p[3].length == 3 || parseInt(p[3], 10) > 59) {
                    q = parseInt(p[1], 10) * c;
                    q += parseInt(p[2], 10) * h;
                    q += parseInt(p[3], 10)
                } else {
                    q = parseInt(p[1], 10) * d;
                    q += parseInt(p[2], 10) * c;
                    q += parseInt(p[3], 10) * h
                }
            } else {
                if (l.test(r)) {
                    o = new Date();
                    n = new Date();
                    p = r.match(l);
                    o.setYear(p[1]);
                    o.setMonth(p[2]);
                    o.setDate(p[3]);
                    o.setHours(p[4]);
                    o.setMinutes(p[5]);
                    o.setSeconds(p[6]);
                    if (typeof p[7] !== "undefined") {
                        o.setMilliseconds(p[7])
                    }
                    q = Math.max(0, o.getTime() - n.getTime())
                } else {
                    n = new Date();
                    q = Date.parse(r);
                    if (!isNaN(q)) {
                        q = Math.max(0, q - n.getTime())
                    } else {
                        q = 0
                    }
                }
            }
        }
        return q
    };
    return b
}));
(function(r) {
    if (r.fetch) {
        return
    }

    function i(s) {
        if (typeof s !== "string") {
            s = String(s)
        }
        if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(s)) {
            throw new TypeError("Invalid character in header field name")
        }
        return s.toLowerCase()
    }

    function g(s) {
        if (typeof s !== "string") {
            s = String(s)
        }
        return s
    }

    function p(s) {
        this.map = {};
        if (s instanceof p) {
            s.forEach(function(u, t) {
                this.append(t, u)
            }, this)
        } else {
            if (s) {
                Object.getOwnPropertyNames(s).forEach(function(t) {
                    this.append(t, s[t])
                }, this)
            }
        }
    }
    p.prototype.append = function(s, u) {
        s = i(s);
        u = g(u);
        var t = this.map[s];
        if (!t) {
            t = [];
            this.map[s] = t
        }
        t.push(u)
    };
    p.prototype["delete"] = function(s) {
        delete this.map[i(s)]
    };
    p.prototype.get = function(t) {
        var s = this.map[i(t)];
        return s ? s[0] : null
    };
    p.prototype.getAll = function(s) {
        return this.map[i(s)] || []
    };
    p.prototype.has = function(s) {
        return this.map.hasOwnProperty(i(s))
    };
    p.prototype.set = function(s, t) {
        this.map[i(s)] = [g(t)]
    };
    p.prototype.forEach = function(t, s) {
        Object.getOwnPropertyNames(this.map).forEach(function(u) {
            this.map[u].forEach(function(v) {
                t.call(s, v, u, this)
            }, this)
        }, this)
    };

    function l(s) {
        if (s.bodyUsed) {
            return Promise.reject(new TypeError("Already read"))
        }
        s.bodyUsed = true
    }

    function k(s) {
        return new Promise(function(u, t) {
            s.onload = function() {
                u(s.result)
            };
            s.onerror = function() {
                t(s.error)
            }
        })
    }

    function h(t) {
        var s = new FileReader();
        s.readAsArrayBuffer(t);
        return k(s)
    }

    function q(t) {
        var s = new FileReader();
        s.readAsText(t);
        return k(s)
    }
    var n = {
        blob: "FileReader" in r && "Blob" in r && (function() {
            try {
                new Blob();
                return true
            } catch (s) {
                return false
            }
        })(),
        formData: "FormData" in r,
        arrayBuffer: "ArrayBuffer" in r
    };

    function m() {
        this.bodyUsed = false;
        this._initBody = function(s) {
            this._bodyInit = s;
            if (typeof s === "string") {
                this._bodyText = s
            } else {
                if (n.blob && Blob.prototype.isPrototypeOf(s)) {
                    this._bodyBlob = s
                } else {
                    if (n.formData && FormData.prototype.isPrototypeOf(s)) {
                        this._bodyFormData = s
                    } else {
                        if (!s) {
                            this._bodyText = ""
                        } else {
                            if (n.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(s)) {} else {
                                throw new Error("unsupported BodyInit type")
                            }
                        }
                    }
                }
            }
            if (!this.headers.get("content-type")) {
                if (typeof s === "string") {
                    this.headers.set("content-type", "text/plain;charset=UTF-8")
                } else {
                    if (this._bodyBlob && this._bodyBlob.type) {
                        this.headers.set("content-type", this._bodyBlob.type)
                    }
                }
            }
        };
        if (n.blob) {
            this.blob = function() {
                var s = l(this);
                if (s) {
                    return s
                }
                if (this._bodyBlob) {
                    return Promise.resolve(this._bodyBlob)
                } else {
                    if (this._bodyFormData) {
                        throw new Error("could not read FormData body as blob")
                    } else {
                        return Promise.resolve(new Blob([this._bodyText]))
                    }
                }
            };
            this.arrayBuffer = function() {
                return this.blob().then(h)
            };
            this.text = function() {
                var s = l(this);
                if (s) {
                    return s
                }
                if (this._bodyBlob) {
                    return q(this._bodyBlob)
                } else {
                    if (this._bodyFormData) {
                        throw new Error("could not read FormData body as text")
                    } else {
                        return Promise.resolve(this._bodyText)
                    }
                }
            }
        } else {
            this.text = function() {
                var s = l(this);
                return s ? s : Promise.resolve(this._bodyText)
            }
        }
        if (n.formData) {
            this.formData = function() {
                return this.text().then(a)
            }
        }
        this.json = function() {
            return this.text().then(JSON.parse)
        };
        return this
    }
    var f = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];

    function j(t) {
        var s = t.toUpperCase();
        return (f.indexOf(s) > -1) ? s : t
    }

    function c(t, u) {
        u = u || {};
        var s = u.body;
        if (c.prototype.isPrototypeOf(t)) {
            if (t.bodyUsed) {
                throw new TypeError("Already read")
            }
            this.url = t.url;
            this.credentials = t.credentials;
            if (!u.headers) {
                this.headers = new p(t.headers)
            }
            this.method = t.method;
            this.mode = t.mode;
            if (!s) {
                s = t._bodyInit;
                t.bodyUsed = true
            }
        } else {
            this.url = t
        }
        this.credentials = u.credentials || this.credentials || "omit";
        if (u.headers || !this.headers) {
            this.headers = new p(u.headers)
        }
        this.method = j(u.method || this.method || "GET");
        this.mode = u.mode || this.mode || null;
        this.referrer = null;
        if ((this.method === "GET" || this.method === "HEAD") && s) {
            throw new TypeError("Body not allowed for GET or HEAD requests")
        }
        this._initBody(s)
    }
    c.prototype.clone = function() {
        return new c(this)
    };

    function a(s) {
        var t = new FormData();
        s.trim().split("&").forEach(function(u) {
            if (u) {
                var w = u.split("=");
                var v = w.shift().replace(/\+/g, " ");
                var x = w.join("=").replace(/\+/g, " ");
                t.append(decodeURIComponent(v), decodeURIComponent(x))
            }
        });
        return t
    }

    function d(u) {
        var s = new p();
        var t = u.getAllResponseHeaders().trim().split("\n");
        t.forEach(function(y) {
            var w = y.trim().split(":");
            var v = w.shift().trim();
            var x = w.join(":").trim();
            s.append(v, x)
        });
        return s
    }
    m.call(c.prototype);

    function b(t, s) {
        if (!s) {
            s = {}
        }
        this.type = "default";
        this.status = s.status;
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = s.statusText;
        this.headers = s.headers instanceof p ? s.headers : new p(s.headers);
        this.url = s.url || "";
        this._initBody(t)
    }
    m.call(b.prototype);
    b.prototype.clone = function() {
        return new b(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new p(this.headers),
            url: this.url
        })
    };
    b.error = function() {
        var s = new b(null, {
            status: 0,
            statusText: ""
        });
        s.type = "error";
        return s
    };
    var o = [301, 302, 303, 307, 308];
    b.redirect = function(t, s) {
        if (o.indexOf(s) === -1) {
            throw new RangeError("Invalid status code")
        }
        return new b(null, {
            status: s,
            headers: {
                location: t
            }
        })
    };
    r.Headers = p;
    r.Request = c;
    r.Response = b;
    r.fetch = function(s, t) {
        return new Promise(function(w, v) {
            var u;
            if (c.prototype.isPrototypeOf(s) && !t) {
                u = s
            } else {
                u = new c(s, t)
            }
            var y = new XMLHttpRequest();

            function x() {
                if ("responseURL" in y) {
                    return y.responseURL
                }
                if (/^X-Request-URL:/m.test(y.getAllResponseHeaders())) {
                    return y.getResponseHeader("X-Request-URL")
                }
                return
            }
            y.onload = function() {
                var A = (y.status === 1223) ? 204 : y.status;
                if (A < 100 || A > 599) {
                    v(new TypeError("Network request failed"));
                    return
                }
                var B = {
                    status: A,
                    statusText: y.statusText,
                    headers: d(y),
                    url: x()
                };
                var z = "response" in y ? y.response : y.responseText;
                w(new b(z, B))
            };
            y.onerror = function() {
                v(new TypeError("Network request failed"))
            };
            y.open(u.method, u.url, true);
            if (u.credentials === "include") {
                y.withCredentials = true
            }
            if ("responseType" in y && n.blob) {
                y.responseType = "blob"
            }
            u.headers.forEach(function(A, z) {
                y.setRequestHeader(z, A)
            });
            y.send(typeof u._bodyInit === "undefined" ? null : u._bodyInit)
        })
    };
    r.fetch.polyfill = true
})(typeof self !== "undefined" ? self : this);
(function(c, a) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "module"], a)
    } else {
        if (typeof exports !== "undefined" && typeof module !== "undefined") {
            a(exports, module)
        } else {
            var b = {
                exports: {}
            };
            a(b.exports, b);
            c.fetchJsonp = b.exports
        }
    }
})(this, function(b, d) {
    var a = {
        timeout: 5000,
        jsonpCallback: "callback",
        jsonpCallbackFunction: null
    };

    function h() {
        return "jsonp_" + Date.now() + "_" + Math.ceil(Math.random() * 100000)
    }

    function f(i) {
        try {
            delete window[i]
        } catch (j) {
            window[i] = undefined
        }
    }

    function c(j) {
        var i = document.getElementById(j);
        document.getElementsByTagName("head")[0].removeChild(i)
    }
    var g = function g(j) {
        var i = arguments[1] === undefined ? {} : arguments[1];
        var k = i.timeout != null ? i.timeout : a.timeout;
        var m = i.jsonpCallback != null ? i.jsonpCallback : a.jsonpCallback;
        var l = undefined;
        return new Promise(function(p, o) {
            var n = i.jsonpCallbackFunction || h();
            window[n] = function(r) {
                p({
                    ok: true,
                    json: function s() {
                        return Promise.resolve(r)
                    }
                });
                if (l) {
                    clearTimeout(l)
                }
                c(m + "_" + n);
                f(n)
            };
            j += j.indexOf("?") === -1 ? "?" : "&";
            var q = document.createElement("script");
            q.setAttribute("src", j + m + "=" + n);
            q.id = m + "_" + n;
            document.getElementsByTagName("head")[0].appendChild(q);
            l = setTimeout(function() {
                o(new Error("JSONP request to " + j + " timed out"));
                f(n);
                c(m + "_" + n)
            }, k)
        })
    };
    d.exports = g
});