!(function(e) {
  var t = {};
  function o(r) {
    if (t[r]) return t[r].exports;
    var i = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(i.exports, i, i.exports, o), (i.l = !0), i.exports;
  }
  (o.m = e),
    (o.c = t),
    (o.d = function(e, t, r) {
      o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (o.r = function(e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (o.t = function(e, t) {
      if ((1 & t && (e = o(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if ((o.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e))
        for (var i in e)
          o.d(
            r,
            i,
            function(t) {
              return e[t];
            }.bind(null, i)
          );
      return r;
    }),
    (o.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return o.d(t, "a", t), t;
    }),
    (o.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (o.p = ""),
    o((o.s = 5));
})({
  1: function(e) {
    e.exports = JSON.parse(
      '{"extId":"60b0d731cfe3646b85be3fdc","appName":"Form Filler","loginURL":"https://app.kyubi.io/api/end-user/login","logoutURL":null,"forgotPassURL":"https://app.kyubi.io/api/end-user/generate-password-token","changePassURL":"https://app.kyubi.io/api/end-user/update-password","checkUserStatusURL":"https://app.kyubi.io/api/end-user/get-status","youtubeLink":null,"youtubeLink2":null,"signupURL":null,"description":{"short_description":"Save your time by prefilling any form on the internet with your information.","long_description":"Automatically fills every form that you encounter"},"logo":{"small_icon":"./images/1622202076750-smallLogo.png","medium_icon":"./images/1622202076821-mediumLogo.png","large_icon":"./images/1622202076874-largeLogo.png","primary_logo":"./images/1622202076927-primaryLogo.png","secondary_logo":"./images/secondary_logo.png","background_image":""},"loader":{"preLoader":"./images/1622202076988-preLoader.gif","replyLoader":null,"customLoader":null},"footer":{"poweredBy":{"label":"Tier5","url":"https://www.tier5.us/","willBeDisplayed":true},"partnership":{"label":"Tier5 Partnerhsip","url":"https://partner.tier5.us/jrpartnership?utm_source=FormFiller","willBeDisplayed":true},"chatSupport":{"label":"Chat Support","url":"https://www.messenger.com/t/tier5development","willBeDisplayed":true},"officialGroup":{"label":"Tier5 Official Group","url":"https://www.facebook.com/tier5development","willBeDisplayed":true},"showFooter":true},"isLive":true,"advertisementTextHtml":null,"mailTo":"accounts@tier5.us","publicVapidKey":"BHcFkqcSHe3BS6EPkUWzYCXM2v4nSd541MqGyEao2EaSQeaQ_xfZrb8IcSasVN1G5pAwmDpXLNIjR7kTnEePOCA","clearSubscriptionObjectURL":"https://app.kyubi.io/api/clear-subscription-object"}'
    );
  },
  5: function(e, t, o) {
    "use strict";
    o.r(t);
    var r = o(1),
      i = {},
      n = !1;
    function a(e) {
      const t = (e + "=".repeat((4 - (e.length % 4)) % 4)).replace(/-/g, "+").replace(/_/g, "/"),
        o = window.atob(t),
        r = new Uint8Array(o.length);
      for (let e = 0; e < o.length; ++e) r[e] = o.charCodeAt(e);
      return r;
    }
    chrome.runtime.onMessage.addListener((e, t, o) => {
      "sendProfileToBack" === e.type
        ? ((i = e.data),
          console.log(i),
          chrome.tabs.query({ active: !0, currentWindow: !0 }, function(e) {
            var t = e[0];
            t && chrome.tabs.sendMessage(t.id, { type: "updatedProfileData", data: i });
          }))
        : "getProfile" === e.type
        ? (console.log("profile asked"), chrome.tabs.sendMessage(t.tab.id, { type: "profileData", data: i }))
        : "switchStatus" === e.type
        ? chrome.tabs.query({ active: !0, currentWindow: !0 }, function(t) {
            n = e.status;
            var o = t[0];
            o && chrome.tabs.sendMessage(o.id, { type: "switchEnabled", status: n });
          })
        : "selectedProfileForPopup" === e.type &&
          (console.log(i), chrome.runtime.sendMessage({ type: "activeProfile", data: i }));
    }),
      document.addEventListener("DOMContentLoaded", function() {
        console.log("DOM CONTENT LOADED"),
          "serviceWorker" in navigator &&
            (console.log("requesting permission"),
            Notification.requestPermission(function(e) {
              console.log("result : ", e), "granted" === e && s().catch(e => console.error("EERR : ", e));
            }));
      });
    const s = async () => {
      console.log("Registering service worker");
      const e = await navigator.serviceWorker.register("./worker.js", { scope: "/" });
      console.log("waiting for ready : ", e),
        await navigator.serviceWorker.ready,
        console.log("register service worker : ", e),
        console.log("Public Vapid key", a(r.publicVapidKey));
      const t = await e.pushManager.subscribe({ userVisibleOnly: !0, applicationServerKey: a(r.publicVapidKey) });
      console.log("Push registered..", t),
        chrome.storage.sync.set({ subscription: JSON.parse(JSON.stringify(t)) }, function(e) {
          console.log("setted");
        }),
        chrome.storage.sync.get(["subscription"], function(e) {
          console.log("broadcast subscription object", e.subscription);
        });
    };
  }
});
