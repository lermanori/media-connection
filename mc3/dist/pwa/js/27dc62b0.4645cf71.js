(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["27dc62b0"],{"03c5":function(t,e,s){"use strict";var i=s("a6ae"),r=s.n(i);r.a},"3b48":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",{staticClass:"card"},[s("q-card-section",[s("span",{staticClass:"text-h6"},[t._v("\n      status:\n      "),s("u",[t._v(t._s(t.post.status))])])]),s("q-card-section",[t._v("\n    properties:\n    "),s("q-list",{attrs:{bordered:"",separator:""}},[s("q-item",t._l(t.post.filterdProperties,function(e,i){return s("q-item-section",{key:i},[s("q-item-label",{attrs:{overline:""}},[t._v(t._s(e.key))]),s("q-item-label",[t._v(t._s(e.value))])],1)}),1)],1)],1),t.post.commits.length>0?s("q-card-section",[t._v("\n    commits:\n    "),s("q-list",{staticClass:"q-mt-sm q-mb-md",attrs:{bordered:"",separator:""}},t._l(t.post.commits,function(e,i){return s("q-expansion-item",{key:i,scopedSlots:t._u([{key:"header",fn:function(){return[s("q-item-section",{attrs:{thumbnail:""}},[s("img",{attrs:{src:t.mybaseUrl+e.path2}})]),s("q-item-section",{staticClass:"q-mt-sm"},[s("q-item-label",[t._v(t._s(e.user.email))]),s("q-item-label",{attrs:{caption:""}},[t._v(t._s(e.commitMessage))])],1),s("q-item-section",{attrs:{side:"",top:""}},[s("q-item-label",{attrs:{caption:""}},[t._v(t._s(Date(e.time).split(" ").slice(0,3).join(" ")))])],1)]},proxy:!0}],null,!0)},[s("q-card",[s("q-card-section",[s("div",{staticClass:"text-body"},[s("u",[t._v("commit message:")]),t._v("\n              "+t._s(e.commitMessage)+"\n            ")]),s("div",{staticClass:"text-body"},[s("u",[t._v("time uploaded:")]),t._v("\n              "+t._s(Date(e.time).split(" ").slice(0,5).join(" "))+"\n            ")]),s("div",{staticClass:"text-body"},[s("u",[t._v("done:")]),t._v("\n              "+t._s(e.done)+"\n            ")])])],1)],1)}),1)],1):t._e(),s("q-card-actions",{attrs:{vertical:""}},[s("q-btn",{staticClass:"absolute-bottom q-mt-sm",attrs:{icon:"waiting for approval"==t.post.status?"check":"edit",color:"waiting for approval"==t.post.status?"green":"indigo",to:"/"+t.post.id+("waiting for approval"==t.post.status?"/approval":"/image-editor")}})],1)],1)},r=[],a=s("5841"),n={props:["post"],data:function(){return{mybaseUrl:a["a"].localBaseUrl}}},o=n,c=(s("03c5"),s("2877")),u=Object(c["a"])(o,i,r,!1,null,"201f93f0",null);e["a"]=u.exports},7489:function(t,e,s){"use strict";var i=s("cbe3"),r=s.n(i);r.a},a6ae:function(t,e,s){},a8df:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",{key:t.item._id,staticClass:"my-card"},[s("div",{staticClass:"row justify-center"},[s("img",{style:{maxWidth:"300px"},attrs:{src:null!=t.item.profilePic?t.item.profilePic:"https://previews.123rf.com/images/salamatik/salamatik1801/salamatik180100019/92979836-profile-anonymous-face-icon-gray-silhouette-person-male-default-avatar-photo-placeholder-isolated-on.jpg"}})]),s("q-card-section",[s("router-link",{attrs:{to:"/profile/"+t.item._id}},[s("div",{staticClass:"text-subtitle2"},[t._v(t._s(t.item.email))])])],1),s("q-card-section",[s("div",{staticClass:"row text-subtitle2 justify-center q-mb-xs"},[t._v("add user to group:")]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-9"},[s("q-select",{attrs:{options:t.options},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}})],1),s("div",{staticClass:"col-3"},[s("q-btn",{style:{height:"100%",width:"100%"},attrs:{outline:"","text-color":"primary",icon:"add"},on:{click:function(e){return t.$emit("addToGroup",{group:null==t.model?null:t.model.value,friend:t.item})}}})],1)]),s("div",{staticClass:"row justify-center q-mt-md"},[s("q-btn",{attrs:{outline:"",color:"white","text-color":"primary",label:"UnFriend"},on:{click:function(e){return t.$emit("unfriend",t.item)}}})],1)])],1)},r=[],a={props:["item","options"],data:function(){return{model:null}}},n=a,o=(s("7489"),s("2877")),c=Object(o["a"])(n,i,r,!1,null,"11063da9",null);e["a"]=c.exports},c386:function(t,e,s){"use strict";var i=s("e67a"),r=s.n(i);r.a},cbe3:function(t,e,s){},e67a:function(t,e,s){},fc86:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("h5",[s("u",[t._v(t._s(t.title))])]),s("div",{staticClass:"row q-gutter-md justify-center"},[t._l(t.filterdGroups,function(t,e){return[s("app-group-card",{key:e,staticClass:"col-6",attrs:{group:t}})]})],2),s("q-separator")],1)},r=[],a=function(){var t=this,e=this,s=e.$createElement,i=e._self._c||s;return i("q-card",{staticClass:"card"},[i("q-card-section",[i("div",{staticClass:"text-h6"},[i("u",[e._v("Group Name:")]),e._v("\n      "+e._s(e.group.group_name)+"\n    ")])]),i("q-card-section",[i("div",{staticClass:"text-body"},[i("u",[e._v("Group description:")]),e._v("\n      "+e._s(e.group.group_desc)+"\n    ")])]),i("q-card-section",[i("div",{staticClass:"text-body"},[i("u",[e._v("admin:")])]),e._l(e.Members.filter(function(t){return t.uid==e.group.admin}),function(t,s){return i("q-expansion-item",{key:s,scopedSlots:e._u([{key:"header",fn:function(){return[i("q-item-section",{staticClass:"q-mt-sm"},[i("q-item-label",[i("u",[e._v("email:")]),e._v("\n            "+e._s(t.email)+"\n          ")]),i("q-item-label",{attrs:{caption:""}},[e._v(e._s(t._id))])],1),i("q-item-section",{attrs:{side:"",top:""}})]},proxy:!0}],null,!0)},[i("app-friend-card",{key:s,attrs:{item:t,options:e.options},on:{addToGroup:function(t){return e.handle_addToGroup(t)},unfriend:function(t){return e.handle_unfriend(e.item)}}})],1)})],2),i("q-card-section"),i("q-card-section",[i("div",{staticClass:"text-body"},[i("u",[e._v("posts:")])]),i("q-list",e._l(e.Posts,function(t,s){return i("q-expansion-item",{key:s,scopedSlots:e._u([{key:"header",fn:function(){return[""!=t.path&&void 0!=t.path?i("q-item-section",{attrs:{thumbnail:""}},[i("img",{attrs:{src:e.mybaseUrl+t.path}})]):e._e(),i("q-item-section",{staticClass:"q-mt-sm"},[i("q-item-label",[i("u",[e._v("status:")]),e._v("\n              "+e._s(t.status)+"\n            ")]),i("q-item-label",{attrs:{caption:""}},[e._v(e._s(t.id))])],1),i("q-item-section",{attrs:{side:"",top:""}})]},proxy:!0}],null,!0)},[i("app-post-card",{key:s,staticClass:"col-6",attrs:{post:t}})],1)}),1),i("u",[e._v("members:")]),i("q-list",e._l(e.Members,function(t,s){return i("q-expansion-item",{key:s,scopedSlots:e._u([{key:"header",fn:function(){return[i("q-item-section",{staticClass:"q-mt-sm"},[i("q-item-label",[i("u",[e._v("email:")]),e._v("\n              "+e._s(t.email)+"\n            ")]),i("q-item-label",{attrs:{caption:""}},[e._v(e._s(t._id))])],1),i("q-item-section",{attrs:{side:"",top:""}})]},proxy:!0}],null,!0)},[i("app-friend-card",{key:s,attrs:{item:t,options:e.options},on:{addToGroup:function(t){return e.handle_addToGroup(t)},unfriend:function(t){return e.handle_unfriend(e.item)}}})],1)}),1)],1),i("q-separator"),i("q-card-actions",{staticClass:"q-mt-md",attrs:{align:"around"}},[i("q-btn-group",{staticClass:"absolute-bottom",attrs:{spread:""}},[i("q-btn",{staticClass:"q-mt-sm",attrs:{color:"cyan",to:"/grid"},on:{click:function(){return e.$store.dispatch("Group/setGroupID",t.group._id)}}},[e._v("Go To Grid")]),i("a",{attrs:{href:"https://api.instagram.com/oauth/authorize/?client_id="+e.client_id+"&redirect_uri="+e.redirect_uri+"&response_type=code"}},[i("q-btn",{staticClass:"q-mt-sm",attrs:{color:"purple"},on:{click:function(){return e.$store.dispatch("Group/setGroupID",t.group._id)}}},[e._v("sync instagram")])],1)],1)],1)],1)},n=[],o=s("a34a"),c=s.n(o),u=(s("96cf"),s("c973")),l=s.n(u),p=s("5841"),d=s("3b48"),m=s("a8df"),f={props:["group"],data:function(){return{members:[],options:[],mybaseUrl:p["a"].localBaseUrl,redirect_uri:p["a"].instagramRedirect,client_id:"c0a7f25d2a7645fd82686d1f128f7409"}},computed:{Posts:function(){var t=this;return this.$store.getters["Post/getPosts"].filter(function(e){return e.groupID==t.group._id})},Members:function(){return this.members},Options:function(){return this.options}},components:{"app-post-card":d["a"],"app-friend-card":m["a"]},created:function(){var t=l()(c.a.mark(function t(){var e,s,i,r,a;return c.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this.group.members,s=e.map(function(t){return t.memberUid}),t.next=4,this.$store.dispatch("Friend/transformUidToUsers",s);case 4:return i=t.sent,this.members=i.data.result,t.next=8,this.$store.dispatch("Group/syncGroups");case 8:r=this.$store.getters["Group/Groups"],a=r.map(function(t){return{label:"".concat(t.group_name,": ").concat(t.group_desc),value:t._id}}),this.options=a;case 11:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},_=f,v=(s("c386"),s("2877")),q=Object(v["a"])(_,a,n,!1,null,"50ce8167",null),h=q.exports,b={props:["title","filterFunc","mode"],components:{"app-group-card":h},computed:{Groups:function(){return this.$store.getters["Group/Groups"]},filterdGroups:function(){return this.Groups.filter(this.filterFunc)}},created:function(){"all"==this.mode&&this.$store.dispatch("Group/syncGroups"),this.$store.dispatch("Post/getAllPosts")}},g=b,y=Object(v["a"])(g,i,r,!1,null,"5a7f62b7",null);e["default"]=y.exports}}]);