(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["c3433a8c"],{"03c5":function(t,e,s){"use strict";var r=s("a6ae"),i=s.n(r);i.a},"2cbd":function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"q-gutter-md"},[s("div",{staticClass:"text-center"},[s("h1",[t._v(t._s(t.group.group_name))])]),s("div",{staticClass:"row justify-center"},[s("q-card",{staticStyle:{"max-width":"700px"}},[s("q-card-section",[s("u",{staticClass:"text-caption"},[t._v("admins:")])]),s("q-card-section",[s("q-list",{attrs:{bordered:"",separator:""}},t._l(t.Admins,function(e,r){return s("q-item",{key:r},[s("div",{staticClass:"row justify-center q-gutter-sm"},[s("div",{staticClass:"col-xs-12 text-center"},[s("q-chip",{attrs:{square:"",clickable:""},on:{click:function(s){return t.$router.push("/profile/"+e._id)}}},[s("q-avatar",[s("q-img",{staticStyle:{height:"100%"},attrs:{contains:"",src:t.baseUrl+"/"+e.profilePicture}})],1),t._v("\n                  "+t._s(e.email)+"\n                ")],1)],1)])])}),1)],1)],1)],1),s("div",{staticClass:"row justify-center"},[s("q-card",{staticStyle:{"max-width":"700px"}},[s("q-card-section",[s("u",{staticClass:"text-caption"},[t._v("Permissions:")])]),s("q-card-section",[s("q-list",{attrs:{bordered:"",separator:""}},t._l(t.Members,function(e,r){return s("q-item",{key:r},[s("div",{staticClass:"row justify-center q-gutter-sm"},[s("div",{staticClass:"col-md-4 col-xs-12 text-center"},[s("q-chip",{attrs:{square:"",clickable:""},on:{click:function(s){return t.$router.push("/profile/"+e._id)}}},[s("q-avatar",[s("q-img",{key:t.baseUrl+"/"+e.profilePicture,staticStyle:{height:"100%"},attrs:{contains:"",src:t.baseUrl+"/"+e.profilePicture}})],1),t._v("\n                  "+t._s(e.email)+"\n                ")],1)],1),s("div",{staticClass:"col-md-3 col-xs-12 text-center"},[s("q-btn",{staticClass:"q-ml-md q-mt-none q-pa-xs",attrs:{label:"take out",icon:"delete"},on:{click:function(s){return t.handle_userDelete(e)}}})],1),s("div",{staticClass:"col-md-2 col-xs-12 text-center"},[s("q-btn",{staticClass:"q-ml-md q-mt-none q-pa-xs",attrs:{label:"save",icon:"save"}})],1),s("div",{staticClass:"col-md-10 col-xs-12"},[s("q-option-group",{attrs:{inline:"",options:t.options,label:"Permission:",type:"checkbox"},model:{value:t.permissions[r],callback:function(e){t.$set(t.permissions,r,e)},expression:"permissions[index]"}})],1)])])}),1)],1)],1)],1),s("div",{staticClass:"row justify-center"},[s("q-card",{staticStyle:{"max-width":"700px"}},[s("q-card-section",[s("u",{staticClass:"text-caption"},[t._v("Posts:")])]),s("q-card-section",[s("q-list",{attrs:{bordered:"",separator:""}},t._l(t.Posts,function(e,r){return s("q-expansion-item",{key:r,attrs:{"header-class":{"deleted-item":t.Deleted[r]}},scopedSlots:t._u([{key:"header",fn:function(){return[""!=e.path&&void 0!=e.path?s("q-item-section",{attrs:{thumbnail:""}},[s("img",{attrs:{src:t.baseUrl+e.path}})]):t._e(),s("q-item-section",{staticClass:"q-mt-sm q-gutter-md"},[s("q-item-label",[s("u",[t._v("status:")]),t._v("\n                  "+t._s(e.status)+"\n                ")]),s("q-btn",{attrs:{icon:"delete"},on:{click:function(s){return s.stopPropagation(),t.handle_removePost(e)}}})],1),s("q-item-section",{attrs:{side:"",top:""}})]},proxy:!0}],null,!0)},[s("app-post-card",{key:r,staticClass:"col-6",attrs:{post:e}})],1)}),1)],1)],1)],1),s("div",[s("q-card",{staticClass:"q-mb-xl"},[s("q-card-section",[s("q-list",{attrs:{bordered:"",separator:""}},[s("q-expansion-item",{scopedSlots:t._u([{key:"header",fn:function(){return[s("q-item-section",{staticClass:"q-gutter-md"},[s("q-item-label",{staticClass:"text-center"},[s("u",[t._v("Delete Group")])])],1),s("q-item-section",{attrs:{side:"",top:""}})]},proxy:!0}])},[s("q-card",{staticClass:"row justify-center"},[s("q-card-actions",[s("q-btn",{staticClass:"text-center",attrs:{icon:"delete"},on:{click:t.deleteGroup_handle}})],1)],1)],1)],1)],1)],1)],1)])},i=[],a=s("a34a"),n=s.n(a),o=(s("96cf"),s("c973")),c=s.n(o),u=(s("7514"),s("5841")),l=s("3b48"),p=(s("dd43"),{components:{"app-post-card":l["a"]},data:function(){return{deleted:[],members:[],admins:[],group:{},baseUrl:u["a"].localBaseUrl,permissions:[],options:[{label:"Requests",value:"request"},{label:"In-Process",value:"in-process",color:"green"},{label:"Waiting For Approval",value:"waiting for approval",color:"indigo"},{label:"default",value:"default",color:"purple"}]}},computed:{Group:function(){var t=this;return this.$store.getters["Group/Groups"].find(function(e){return e._id==t.group._id})},Members:function(){return this.members},Admins:function(){return this.admins},Posts:function(){var t=this;return this.$store.getters["Post/getPosts"].filter(function(e){return e.groupID==t.group._id})},Deleted:function(){return this.Posts.map(function(t){return!0})}},methods:{handle_userDelete:function(){var t=c()(n.a.mark(function t(e){return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$store.dispatch("Group/removeUser",{groupId:this.group._id,friendshipId:this.group.members.find(function(t){return t.memberUid==e.uid})._id});case 2:return t.sent,t.next=5,this.$store.dispatch("Group/syncGroups");case 5:return t.next=7,this.updateData();case 7:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),handle_removePost:function(){var t=c()(n.a.mark(function t(e){return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.show(e),t.next=3,this.$store.dispatch("Group/removePost",{postId:e.id,groupId:e.groupID});case 3:return t.next=5,this.$store.dispatch("Post/getAllPosts",e.id);case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),show:function(t){console.log(t)},deleteGroup_handle:function(){var t=c()(n.a.mark(function t(){var e;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$store.dispatch("Group/deleteGroup",this.$route.params.groupid);case 2:e=t.sent,200==e.status&&this.$router.push("/groups");case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),membersToUsers:function(){var t=c()(n.a.mark(function t(){var e,s,r,i,a;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this.Group.members.filter(function(t){return"admin"!=t.role}).map(function(t){return t.memberUid}),s=this.group.members.filter(function(t){return"admin"==t.role}).map(function(t){return t.memberUid}),r=this.group.members.filter(function(t){return"admin"!=t.role}).map(function(t){return[t.role]}),console.log("roles",r),t.next=6,this.$store.dispatch("Friend/transformUidToUsers",e);case 6:return i=t.sent,t.next=9,this.$store.dispatch("Friend/transformUidToUsers",s);case 9:a=t.sent,this.members=i.data.result,this.admins=a.data.result,this.permissions=r;case 13:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),updateData:function(){var t=c()(n.a.mark(function t(){var e=this;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.group=this.$store.getters["Group/Groups"].find(function(t){return t._id==e.$route.params.groupid}),console.log(this.group),t.next=4,this.membersToUsers();case 4:console.log(this.members);case 5:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},created:function(){var t=c()(n.a.mark(function t(){return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.updateData();case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()}),d=p,m=s("2877"),h=Object(m["a"])(d,r,i,!1,null,"c49a6df8",null);e["default"]=h.exports},"3b48":function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",{staticClass:"card"},[s("q-card-section",[s("span",{staticClass:"text-h6"},[t._v("\n      status:\n      "),s("u",[t._v(t._s(t.post.status))])])]),s("q-card-section",[t._v("\n    properties:\n    "),s("q-list",{attrs:{bordered:"",separator:""}},[s("q-item",t._l(t.post.filterdProperties,function(e,r){return s("q-item-section",{key:r},[s("q-item-label",{attrs:{overline:""}},[t._v(t._s(e.key))]),s("q-item-label",[t._v(t._s(e.value))])],1)}),1)],1)],1),t.post.commits.length>0?s("q-card-section",[t._v("\n    commits:\n    "),s("q-list",{staticClass:"q-mt-sm q-mb-md",attrs:{bordered:"",separator:""}},t._l(t.post.commits,function(e,r){return s("q-expansion-item",{key:r,scopedSlots:t._u([{key:"header",fn:function(){return[s("q-item-section",{attrs:{thumbnail:""}},[s("img",{attrs:{src:t.mybaseUrl+e.path2}})]),s("q-item-section",{staticClass:"q-mt-sm"},[s("q-item-label",[t._v(t._s(e.user.email))]),s("q-item-label",{attrs:{caption:""}},[t._v(t._s(e.commitMessage))])],1),s("q-item-section",{attrs:{side:"",top:""}},[s("q-item-label",{attrs:{caption:""}},[t._v(t._s(Date(e.time).split(" ").slice(0,3).join(" ")))])],1)]},proxy:!0}],null,!0)},[s("q-card",[s("q-card-section",[s("div",{staticClass:"text-body"},[s("u",[t._v("commit message:")]),t._v("\n              "+t._s(e.commitMessage)+"\n            ")]),s("div",{staticClass:"text-body"},[s("u",[t._v("time uploaded:")]),t._v("\n              "+t._s(Date(e.time).split(" ").slice(0,5).join(" "))+"\n            ")]),s("div",{staticClass:"text-body"},[s("u",[t._v("done:")]),t._v("\n              "+t._s(e.done)+"\n            ")])])],1)],1)}),1)],1):t._e(),s("q-card-actions",{attrs:{vertical:""}},[s("q-btn",{staticClass:"absolute-bottom q-mt-sm",attrs:{icon:"waiting for approval"==t.post.status?"check":"edit",color:"waiting for approval"==t.post.status?"green":"indigo",to:"/"+t.post.id+("waiting for approval"==t.post.status?"/approval":"/image-editor")}})],1)],1)},i=[],a=s("5841"),n={props:["post"],data:function(){return{mybaseUrl:a["a"].localBaseUrl}}},o=n,c=(s("03c5"),s("2877")),u=Object(c["a"])(o,r,i,!1,null,"201f93f0",null);e["a"]=u.exports},a6ae:function(t,e,s){}}]);