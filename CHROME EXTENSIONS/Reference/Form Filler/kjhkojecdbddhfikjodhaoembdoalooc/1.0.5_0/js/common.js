!function(e){var t={};function r(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(o,a,function(t){return e[t]}.bind(null,a));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=9)}({1:function(e){e.exports=JSON.parse('{"extId":"60b0d731cfe3646b85be3fdc","appName":"Form Filler","loginURL":"https://app.kyubi.io/api/end-user/login","logoutURL":null,"forgotPassURL":"https://app.kyubi.io/api/end-user/generate-password-token","changePassURL":"https://app.kyubi.io/api/end-user/update-password","checkUserStatusURL":"https://app.kyubi.io/api/end-user/get-status","youtubeLink":null,"youtubeLink2":null,"signupURL":null,"description":{"short_description":"Save your time by prefilling any form on the internet with your information.","long_description":"Automatically fills every form that you encounter"},"logo":{"small_icon":"./images/1622202076750-smallLogo.png","medium_icon":"./images/1622202076821-mediumLogo.png","large_icon":"./images/1622202076874-largeLogo.png","primary_logo":"./images/1622202076927-primaryLogo.png","secondary_logo":"./images/secondary_logo.png","background_image":""},"loader":{"preLoader":"./images/1622202076988-preLoader.gif","replyLoader":null,"customLoader":null},"footer":{"poweredBy":{"label":"Tier5","url":"https://www.tier5.us/","willBeDisplayed":true},"partnership":{"label":"Tier5 Partnerhsip","url":"https://partner.tier5.us/jrpartnership?utm_source=FormFiller","willBeDisplayed":true},"chatSupport":{"label":"Chat Support","url":"https://www.messenger.com/t/tier5development","willBeDisplayed":true},"officialGroup":{"label":"Tier5 Official Group","url":"https://www.facebook.com/tier5development","willBeDisplayed":true},"showFooter":true},"isLive":true,"advertisementTextHtml":null,"mailTo":"accounts@tier5.us","publicVapidKey":"BHcFkqcSHe3BS6EPkUWzYCXM2v4nSd541MqGyEao2EaSQeaQ_xfZrb8IcSasVN1G5pAwmDpXLNIjR7kTnEePOCA","clearSubscriptionObjectURL":"https://app.kyubi.io/api/clear-subscription-object"}')},9:function(e,t,r){const o=r(1),a=(chrome.runtime,chrome.storage.local),i=(chrome.identity,chrome.tabs);$(document).ready((function(){$.getJSON("kyubiSettings.json",(async function(e){"60b0d731cfe3646b85be3fdc"==e.extId?(console.log("----------------------------"),$(".morePower").css("display","block")):$(".morePower").css("display","none")})),l(),$("body").on("click","#openMenu",(function(){$(".sliding_navbar").show()})).on("click",".cross",(function(){$(".sliding_navbar").hide()})),$("#createProfile").click((function(e){e.preventDefault();i.query({},e=>{let t=!1;e.forEach(e=>{e.url.includes("../profile-page.html")&&(i.update(e.id,{active:!0}),t=!0)}),t||i.create({url:"../profile-page.html"})})})),$("#changePassBtn").click(e=>{e.preventDefault(),location.href="change_password.html"}),$("#cancelAcc").click(e=>{e.preventDefault(),location.href="cancel_account.html"}),$("#logoutBtn").click((function(e){e.preventDefault(),a.set({level:{valid:!1,extData:{}}},(function(){location.href="login.html"}))})),$("#forgotPass").click((function(e){e.preventDefault()})),$("a").click((function(e){e.preventDefault();let t=$(this).attr("href");t&&window.open(t)})),$("#mailTo").text(o.mailTo),$("#clr_acnt").html("Cancel My Account"),$("#goBack").click((function(e){e.preventDefault(),location.href="dashboard.html"}))}));const l=()=>{$("#dynamicLogo").html('<img src="'+o.logo.primary_logo+'" alt="Logo" ><span id="appTitle"></span>'),$("#appTitle").text(o.appName),$("#appTitle").hide(),o.loader.preLoader?$("#overlay").html('<img src="'+o.loader.preLoader+'" alt = "" height="34" width="34">'):$("#overlay").html('<img src="./images/loader.gif" alt = "" height="34" width="34">'),$("#built").text("Haven't built a "+o.appName+" yet?"),$("#note").html('<strong style="color: red;">Note:</strong>'+o.appName+' require to collect some non sensitive data\n      which may redirect you to the homepage while you try to "Use '+o.appName+'" for the first time.\n      This is one time process.'),$("#createFunnel").text("Create my "+o.appName),o.youtubeLink?$("#video").attr("src",o.youtubeLink):$("#video").attr("src",""),$("#myCards").text("My "+o.appName+" Cards"),$("#postSettings").text(o.appName+" Settings"),$("#set").text("Set your "+o.appName+" settings"),$("#save_in_card").text("Save "+o.appName),o.footer.showFooter?(o.footer.poweredBy.willBeDisplayed?(o.footer.poweredBy.url?(console.log(o.footer.poweredBy.url),$("#poweredby").attr("href",o.footer.poweredBy.url),"#"==o.footer.poweredBy.url&&$("#poweredby").removeAttr("target")):($("#poweredby").attr("href",""),$("#poweredby").removeAttr("target")),o.footer.poweredBy.label?$("#poweredby").html(o.footer.poweredBy.label):($("#poweredby").html(""),$("#and").hide())):($("#poweredby").attr("href",""),$("#poweredby").html(""),$("#and").hide()),o.footer.partnership.willBeDisplayed?(o.footer.partnership.url?($("#partnership").attr("href",o.footer.partnership.url),"#"==o.footer.partnership.url&&$("#partnership").removeAttr("target")):($("#partnership").attr("href",""),$("#partnership").removeAttr("target")),o.footer.partnership.label?$("#partnership").html(o.footer.partnership.label):($("#partnership").html(""),$("#and").hide())):($("#partnership").attr("href",""),$("#partnership").html(""),$("#and").hide()),o.footer.officialGroup.willBeDisplayed&&o.footer.officialGroup.url?$("#group").attr("href",o.footer.officialGroup.url):($("#group").attr("href",""),$("#group").html("")),o.footer.chatSupport.willBeDisplayed&&o.footer.chatSupport.url?$("#chat").attr("href",o.footer.chatSupport.url):($("#chat").attr("href",""),$("#chat").html(""))):$(".cf_footer").html("")}}});