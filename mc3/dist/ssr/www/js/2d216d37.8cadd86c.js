(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d216d37"],{c3b3:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("q-page",[a("q-page-container",[a("div",{staticClass:"text-center"},[a("div",{staticClass:"text-h6"},[t._v("currentGroupID: "+t._s(t.$store.getters["Group/currentGroupID"]))])]),a("div",{staticClass:"row justify-center q-gutter-sm"},[a("div",{staticClass:"col-md-5 col-xs-12 q-mb-lg"},[a("q-card",{staticClass:"my-card"},[a("q-card-section",{staticClass:"bg-indigo text-white text-center"},[a("div",{staticClass:"text-h6"},[t._v("Post Waiting For Approval")]),t.postLoaded?a("div",{staticClass:"text-h4"},[t._v(t._s(t.NumberOfWaitingPosts))]):t._e(),a("q-btn",{attrs:{to:"/post/waiting-for-approval"}},[t._v("to submissions")])],1)],1)],1),a("div",{staticClass:"col-md-5 col-xs-12 q-mb-lg"},[a("q-card",{staticClass:"my-card"},[a("q-card-section",{staticClass:"bg-blue darken 4 text-white text-center"},[a("div",{staticClass:"text-h6"},[t._v("Posts In Process")]),t.postLoaded?a("div",{staticClass:"text-h4"},[t._v(t._s(t.NumberOfInProcessPosts))]):t._e(),a("q-btn",{attrs:{to:"/post/in-process"}},[t._v("to In Process")])],1)],1)],1),a("div",{staticClass:"col-md-5 col-xs-12 q-mb-lg"},[a("q-card",{staticClass:"my-card"},[a("q-card-section",{staticClass:"bg-cyan text-white text-center"},[a("div",{staticClass:"text-h6"},[t._v("Posts requested")]),t.postLoaded?a("div",{staticClass:"text-h4"},[t._v(t._s(t.NumberOfNewPosts))]):t._e(),a("q-btn",{attrs:{to:"/post/requests"}},[t._v("to requests")])],1)],1)],1)])]),a("q-page-container",{staticClass:"q-mx-sm"},[a("div",{staticClass:"row justify-center q-mb-md"},[a("div",{staticClass:"q-gutter-sm"},[a("q-radio",{attrs:{val:"instagram",label:"Instagram"},model:{value:t.dataMode,callback:function(s){t.dataMode=s},expression:"dataMode"}}),a("q-radio",{attrs:{val:"in-app",label:"In App"},model:{value:t.dataMode,callback:function(s){t.dataMode=s},expression:"dataMode"}}),a("q-radio",{attrs:{val:"mixed",label:"Combined"},model:{value:t.dataMode,callback:function(s){t.dataMode=s},expression:"dataMode"}})],1)]),a("div",{staticClass:"row justify-center q-gutter-xl"},t._l(t.dynamicDataReverse,function(s,e){return a("div",{key:e,staticClass:"col-3"},[a("q-card",[a("q-img",{staticClass:"app-img q-mx-auto",attrs:{src:s.src,ratio:"1.2"}},[a("div",{staticClass:"absolute-bottom text-subtitle1 text-center q-pa-xs"},[t._v(t._s(t.dateToString(s.uploadTime)))])])],1)],1)}),0)])],1)},r=[],n=(a("6b54"),a("28a5"),a("a34a")),i=a.n(n),o=(a("96cf"),a("c973")),c=a.n(o),d=(a("55dd"),a("448a")),u=a.n(d),l=(a("7514"),a("5841")),p={name:"Register",data:function(){return{baseUrl:l["a"].localBaseUrl,username:"",password:"",auth:"true",data:[],postLoaded:!1,posts:[],dataMode:"mixed"}},computed:{InstagramData:function(){return this.data.map(function(t){return{src:t.images.standard_resolution.url,uploadTime:1e3*parseInt(t.created_time)}})},NumberOfNewPosts:function(){return this.posts.filter(function(t){return"new request"===t.status}).length},NumberOfInProcessPosts:function(){return this.posts.filter(function(t){return"in process"===t.status}).length},NumberOfWaitingPosts:function(){return this.posts.filter(function(t){return"waiting for approval"===t.status}).length},ApprovedPosts:function(){var t=this;return this.posts.filter(function(t){return"approved"===t.status}).map(function(s){return console.log(s),{src:t.baseUrl+s.path,uploadTime:Date.parse(s.filterdProperties.find(function(t){return"upload date"==t.key}).value)}})},mixed:function(){var t=this.ApprovedPosts,s=this.InstagramData,a=[].concat(u()(t),u()(s)),e=a;return e},dynamicData:function(){switch(this.dataMode){case"instagram":return this.InstagramData;case"mixed":return this.mixed;case"in-app":return this.ApprovedPosts;default:return this.mixed}},dynamicDataReverse:function(){return this.dynamicData.sort(function(t,s){return t.uploadTime-s.uploadTime}).reverse()}},methods:{getInstagramData:function(){var t=c()(i.a.mark(function t(){var s,a;return i.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$axios.get("https://api.instagram.com/v1/users/self/media/recent/?access_token="+this.$store.getters["User/instagram_token"]);case 2:return s=t.sent,a=s.data,this.data=a.data,t.abrupt("return");case 6:case"end":return t.stop()}},t,this)}));function s(){return t.apply(this,arguments)}return s}(),dateToString:function(t){return new Date(t).toString().split(" ").filter(function(t,s){return s<5}).join(" ")}},created:function(){var t=this;this.getInstagramData(),this.$store.dispatch("Post/syncPosts",this.$store.getters["Group/currentGroupID"]).then(function(s){t.posts=s,t.postLoaded=!0}).catch(function(t){console.log(t)})}},m=p,f=a("2877"),v=Object(f["a"])(m,e,r,!1,null,null,null);s["default"]=v.exports}}]);