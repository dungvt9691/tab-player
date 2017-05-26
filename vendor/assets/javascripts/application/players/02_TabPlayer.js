if (typeof deconcept == "undefined") {
    var deconcept = new Object()
}
if (typeof deconcept.util == "undefined") {
    deconcept.util = new Object()
}
if (typeof deconcept.SWFObjectUtil == "undefined") {
    deconcept.SWFObjectUtil = new Object()
}
deconcept.SWFObject = function(m, b, n, e, j, k, g, f, d, l) {
    if (!document.getElementById) {
        return
    }
    this.DETECT_KEY = l ? l : "detectflash";
    this.skipDetect = deconcept.util.getRequestParameter(this.DETECT_KEY);
    this.params = new Object();
    this.variables = new Object();
    this.attributes = new Array();
    if (m) {
        this.setAttribute("swf", m)
    }
    if (b) {
        this.setAttribute("id", b)
    }
    if (n) {
        this.setAttribute("width", n)
    }
    if (e) {
        this.setAttribute("height", e)
    }
    if (j) {
        this.setAttribute("version", new deconcept.PlayerVersion(j.toString().split(".")))
    }
    this.installedVer = deconcept.SWFObjectUtil.getPlayerVersion();
    if (!window.opera && document.all && this.installedVer.major > 7) {
        deconcept.SWFObject.doPrepUnload = true
    }
    if (k) {
        this.addParam("bgcolor", k)
    }
    var a = g ? g : "high";
    this.addParam("quality", a);
    this.setAttribute("useExpressInstall", false);
    this.setAttribute("doExpressInstall", false);
    var i = (f) ? f : window.location;
    this.setAttribute("xiRedirectUrl", i);
    this.setAttribute("redirectUrl", "");
    if (d) {
        this.setAttribute("redirectUrl", d)
    }
};
deconcept.SWFObject.prototype = {
    useExpressInstall: function(a) {
        this.xiSWFPath = !a ? "expressinstall.swf" : a;
        this.setAttribute("useExpressInstall", true)
    },
    setAttribute: function(a, b) {
        this.attributes[a] = b
    },
    getAttribute: function(a) {
        return this.attributes[a]
    },
    addParam: function(b, a) {
        this.params[b] = a
    },
    getParams: function() {
        return this.params
    },
    addVariable: function(b, a) {
        this.variables[b] = a
    },
    getVariable: function(a) {
        return this.variables[a]
    },
    getVariables: function() {
        return this.variables
    },
    getVariablePairs: function() {
        var b = new Array();
        var a;
        var c = this.getVariables();
        for (a in c) {
            b[b.length] = a + "=" + c[a]
        }
        return b
    },
    getSWFHTML: function() {
        var d = "";
        if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
            if (this.getAttribute("doExpressInstall")) {
                this.addVariable("MMplayerType", "PlugIn");
                this.setAttribute("swf", this.xiSWFPath)
            }
            d = '<embed type="application/x-shockwave-flash" src="' + this.getAttribute("swf") + '" width="' + this.getAttribute("width") + '" height="' + this.getAttribute("height") + '" style="' + this.getAttribute("style") + '"';
            d += ' id="' + this.getAttribute("id") + '" name="' + this.getAttribute("id") + '" ';
            var b = this.getParams();
            for (var a in b) {
                d += [a] + '="' + b[a] + '" '
            }
            var f = this.getVariablePairs().join("&");
            if (f.length > 0) {
                d += 'flashvars="' + f + '"'
            }
            d += "/>"
        } else {
            if (this.getAttribute("doExpressInstall")) {
                this.addVariable("MMplayerType", "ActiveX");
                this.setAttribute("swf", this.xiSWFPath)
            }
            d = '<object id="' + this.getAttribute("id") + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + this.getAttribute("width") + '" height="' + this.getAttribute("height") + '" style="' + this.getAttribute("style") + '">';
            d += '<param name="movie" value="' + this.getAttribute("swf") + '" />';
            var e = this.getParams();
            for (var a in e) {
                d += '<param name="' + a + '" value="' + e[a] + '" />'
            }
            var c = this.getVariablePairs().join("&");
            if (c.length > 0) {
                d += '<param name="flashvars" value="' + c + '" />'
            }
            d += "</object>"
        }
        return d
    },
    write: function(a) {
        if (this.getAttribute("useExpressInstall")) {
            var c = new deconcept.PlayerVersion([6, 0, 65]);
            if (this.installedVer.versionIsValid(c) && !this.installedVer.versionIsValid(this.getAttribute("version"))) {
                this.setAttribute("doExpressInstall", true);
                this.addVariable("MMredirectURL", escape(this.getAttribute("xiRedirectUrl")));
                document.title = document.title.slice(0, 47) + " - Flash Player Installation";
                this.addVariable("MMdoctitle", document.title)
            }
        }
        if (this.skipDetect || this.getAttribute("doExpressInstall") || this.installedVer.versionIsValid(this.getAttribute("version"))) {
            var b = (typeof a == "string") ? document.getElementById(a) : a;
            b.innerHTML = this.getSWFHTML();
            return true
        } else {
            if (this.getAttribute("redirectUrl") != "") {
                document.location.replace(this.getAttribute("redirectUrl"))
            }
        }
        return false
    }
};
deconcept.SWFObjectUtil.getPlayerVersion = function() {
    var a = new deconcept.PlayerVersion([0, 0, 0]);
    if (navigator.plugins && navigator.mimeTypes.length) {
        var b = navigator.plugins["Shockwave Flash"];
        if (b && b.description) {
            a = new deconcept.PlayerVersion(b.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."))
        }
    } else {
        if (navigator.userAgent && navigator.userAgent.indexOf("Windows CE") >= 0) {
            var c = 1;
            var d = 3;
            while (c) {
                try {
                    d++;
                    c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + d);
                    a = new deconcept.PlayerVersion([d, 0, 0])
                } catch (f) {
                    c = null
                }
            }
        } else {
            try {
                var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
            } catch (f) {
                try {
                    var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                    a = new deconcept.PlayerVersion([6, 0, 21]);
                    c.AllowScriptAccess = "always"
                } catch (f) {
                    if (a.major == 6) {
                        return a
                    }
                }
                try {
                    c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
                } catch (f) {}
            }
            if (c != null) {
                a = new deconcept.PlayerVersion(c.GetVariable("$version").split(" ")[1].split(","))
            }
        }
    }
    return a
};
deconcept.PlayerVersion = function(a) {
    this.major = a[0] != null ? parseInt(a[0]) : 0;
    this.minor = a[1] != null ? parseInt(a[1]) : 0;
    this.rev = a[2] != null ? parseInt(a[2]) : 0
};
deconcept.PlayerVersion.prototype.versionIsValid = function(a) {
    if (this.major < a.major) {
        return false
    }
    if (this.major > a.major) {
        return true
    }
    if (this.minor < a.minor) {
        return false
    }
    if (this.minor > a.minor) {
        return true
    }
    if (this.rev < a.rev) {
        return false
    }
    return true
};
deconcept.util = {
    getRequestParameter: function(c) {
        var d = document.location.search || document.location.hash;
        if (c == null) {
            return d
        }
        if (d) {
            var b = d.substring(1).split("&");
            for (var a = 0; a < b.length; a++) {
                if (b[a].substring(0, b[a].indexOf("=")) == c) {
                    return b[a].substring((b[a].indexOf("=") + 1))
                }
            }
        }
        return ""
    }
};
deconcept.SWFObjectUtil.cleanupSWFs = function() {
    var a = document.getElementsByTagName("OBJECT");
    for (var b = a.length - 1; b >= 0; b--) {
        a[b].style.display = "none";
        for (var c in a[b]) {
            if (typeof a[b][c] == "function") {
                a[b][c] = function() {}
            }
        }
    }
};
if (deconcept.SWFObject.doPrepUnload) {
    if (!deconcept.unloadSet) {
        deconcept.SWFObjectUtil.prepUnload = function() {
            __flash_unloadHandler = function() {};
            __flash_savedUnloadHandler = function() {};
            window.attachEvent("onunload", deconcept.SWFObjectUtil.cleanupSWFs)
        };
        window.attachEvent("onbeforeunload", deconcept.SWFObjectUtil.prepUnload);
        deconcept.unloadSet = true
    }
}
if (!document.getElementById && document.all) {
    document.getElementById = function(a) {
        return document.all[a]
    }
}
var getQueryParamValue = deconcept.util.getRequestParameter;
var FlashObject = deconcept.SWFObject;
var SWFObject = deconcept.SWFObject;