(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d22c0ff"],{f241:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-layout",{attrs:{view:"lHh lpr lFf"}},[a("q-header",{staticClass:"glossy purple",attrs:{elevated:""}},[a("q-toolbar",[e.loggedIn?a("q-btn",{attrs:{flat:"",dense:"",round:"","aria-label":"Menu"},on:{click:function(t){e.leftDrawerOpen=!e.leftDrawerOpen}}},[a("q-icon",{attrs:{name:"menu"}})],1):e._e(),a("q-toolbar-title",[e._v("Media Connection")]),a("q-space"),e.loggedIn?a("q-btn",{attrs:{flat:"",dense:"",round:"","aria-label":"Logout"},on:{click:e.logout_Handle}},[a("q-icon",{attrs:{color:"white",name:"exit_to_app"}})],1):e._e()],1)],1),a("q-drawer",{attrs:{bordered:"","content-class":"bg-grey-2"},model:{value:e.leftDrawerOpen,callback:function(t){e.leftDrawerOpen=t},expression:"leftDrawerOpen"}},[a("q-list",[a("q-item-label",{attrs:{header:""}},[e._v("Profile")]),a("q-item",{attrs:{clickable:"",tag:"a",to:"/profile/"+e.$store.getters["User/id"]}},[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{name:"public"}})],1),a("q-item-section",[a("q-item-label",[e._v("profile")])],1)],1),a("q-item-label",{attrs:{header:""}},[e._v("In-app Links")]),a("q-item",{attrs:{clickable:"",tag:"a",to:"/dashboard"}},[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{name:"dashboard"}})],1),a("q-item-section",[a("q-item-label",[e._v("Dashboard")]),a("q-item-label",{attrs:{caption:""}},[e._v("Home,Profile etc..")])],1)],1),a("q-item",{attrs:{clickable:"",tag:"a",to:"/groups"}},[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{name:"people_outline"}})],1),a("q-item-section",[a("q-item-label",[e._v("Groups")])],1)],1),a("q-item",{attrs:{clickable:"",tag:"a",to:"/friends"}},[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{name:"person_outline"}})],1),a("q-item-section",[a("q-item-label",[e._v("Friends")])],1)],1),a("q-item",{attrs:{clickable:"",tag:"a",to:"/post"}},[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{name:"pages"}})],1),a("q-item-section",[a("q-item-label",[e._v("Posts")])],1)],1)],1)],1),a("q-page-container",[a("router-view")],1)],1)},r=[],n=a("0967"),i=a("2b0e"),s=function(e,t){var a=window.open;if(!0===n["a"].is.cordova){if(void 0!==cordova&&void 0!==cordova.InAppBrowser&&void 0!==cordova.InAppBrowser.open)a=cordova.InAppBrowser.open;else if(void 0!==navigator&&void 0!==navigator.app)return navigator.app.loadUrl(e,{openExternal:!0})}else if(void 0!==i["a"].prototype.$q.electron)return i["a"].prototype.$q.electron.shell.openExternal(e);var o=a(e,"_blank");if(o)return o.focus(),o;t&&t()},l={name:"MyLayout",data:function(){return{leftDrawerOpen:this.$q.platform.is.desktop&&this.$store.getters.loggedIn}},methods:{openURL:s,logout_Handle:function(){this.$store.dispatch("User/clearAuth"),this.$router.push("/"),console.log(this.$store.getters.loggedIn)}},computed:{loggedIn:function(){return this.$store.getters["User/loggedIn"]}},created:function(){}},c=l,p=a("2877"),d=Object(p["a"])(c,o,r,!1,null,null,null);t["default"]=d.exports}}]);