(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d23014d"],{eb82:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("app-request-field",{attrs:{id:"-1",value:e.uploadAt,required:"true"},on:{input:function(t){return e.uploadAt=t}}}),e._l(e.Properties,function(t,i){return a("app-request-field",{key:""+t.id,attrs:{id:""+t.id,value:t},on:{input:function(t){return e.properties[i]=t}}})}),a("div",{staticClass:"row jusytify-center q-mt-md"},[a("div",{staticClass:"col text-right",staticStyle:{"margin-right":"13%"}},[a("q-btn",{staticClass:"q-mr-md",attrs:{round:"",icon:"exit_to_app",color:"purple",dark:"",to:"/requests"}}),a("q-btn",{staticClass:"q-mr-md",attrs:{round:"",icon:"delete",color:"black",dark:""},on:{click:e.clean_handler}}),a("q-btn",{staticClass:"q-mr-md",attrs:{round:"",icon:"add",color:"cyan"},on:{click:function(t){e.properties.push({id:""+e.id,disabled:!1}),e.id++}}}),a("q-btn",{staticClass:"q-mr-xl",attrs:{round:"",icon:"done",color:"indigo"},on:{click:e.handle_click_save}},[a("q-popup-proxy",{model:{value:e.opened,callback:function(t){e.opened=t},expression:"opened"}},[a("q-banner",{scopedSlots:e._u([{key:"avatar",fn:function(){return[a("q-icon",{attrs:{name:"save",color:"primary"}})]},proxy:!0},{key:"action",fn:function(){return[1==e.save?a("q-input",{attrs:{rounded:"",outlined:"",label:"Enter Schema Name"},model:{value:e.schemaName,callback:function(t){e.schemaName=t},expression:"schemaName"}}):e._e(),a("q-btn",{attrs:{flat:"",color:"indigo",label:"Dismiss"},on:{click:function(t){e.opened=!1}}}),a("q-btn",{attrs:{flat:"",color:"indigo",label:e.save_txt},on:{click:e.handle_save_schema}})]},proxy:!0}])},[e._v("\n            Save Schema as Template?\n            ")])],1)],1)],1)])],2)},n=[],s=a("9523"),l=a.n(s),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",{staticClass:"row text-center justify-left"},[a("div",{staticClass:"col-1 q-pt-lg"},["true"!=e.required?a("q-checkbox",{attrs:{label:"disable"},on:{input:function(t){return e.$emit("input",e.value)}},model:{value:e.value.disabled,callback:function(t){e.$set(e.value,"disabled",t)},expression:"value.disabled"}}):e._e()],1),a("div",{staticClass:"col-2 q-pt-lg q-ml-md"},[a("q-btn-dropdown",{style:{display:"true"==e.required?"none":"block"},attrs:{color:"primary",label:e.buttonText,disable:e.value.disabled}},[a("q-list",[a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(t){return e.onItemClick("photo")}}},[a("q-item-section",[a("q-item-label",[e._v("Photo")])],1)],1),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(t){return e.onItemClick("string")}}},[a("q-item-section",[a("q-item-label",[e._v("String")])],1)],1),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(t){return e.onItemClick("date")}}},[a("q-item-section",[a("q-item-label",[e._v("Date")])],1)],1)],1)],1)],1),e.choseType?a("div",{staticClass:"col-8 q-pa-sm"},[a("app-dynamic",{attrs:{disabled:e.value.disabled,mode:e.mode,value:e.value,"required-key":"true"==e.required?"upload date":null},on:{input:e.handleInput}})],1):e._e()])])},d=[],r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",["string"==e.mode?a("div",{staticClass:"row"},[a("div",{staticClass:"col q-pa-sm"},[a("q-input",{attrs:{rounded:"",outlined:"",label:"Enter Property",disable:e.disabled},on:{input:e.handleInput},model:{value:e.app_key,callback:function(t){e.app_key=t},expression:"app_key"}})],1),a("div",{staticClass:"col q-pa-sm"},[a("q-input",{attrs:{rounded:"",outlined:"",label:"Enter String",disable:e.disabled},on:{input:e.handleInput},model:{value:e.app_value,callback:function(t){e.app_value=t},expression:"app_value"}})],1)]):e._e(),"photo"==e.mode?a("div",{staticClass:"row"},[a("div",{staticClass:"col q-pa-sm"},[a("q-input",{attrs:{rounded:"",outlined:"",label:"Enter Property",disable:e.disabled},on:{input:e.handleInput},model:{value:e.app_key,callback:function(t){e.app_key=t},expression:"app_key"}})],1),a("div",{staticClass:"col q-pa-sm"},[a("q-input",{attrs:{rounded:"",outlined:"",label:"Enter photo",disable:e.disabled},on:{input:e.handleInput},model:{value:e.app_value,callback:function(t){e.app_value=t},expression:"app_value"}})],1)]):e._e(),"date"==e.mode?a("div",{staticClass:"row"},[a("div",{staticClass:"col q-pa-sm"},[a("q-input",{attrs:{rounded:"",outlined:"",label:null!=this.requiredKey?"Required":"Enter Property",disable:e.disabled,readonly:e.readOnly},on:{input:e.handleInput},model:{value:e.app_key,callback:function(t){e.app_key=t},expression:"app_key"}})],1),a("div",{staticClass:"col q-pa-md",staticStyle:{"max-width":"300px"}},[a("q-input",{attrs:{disable:e.disabled,filled:"",mask:"date",rules:["date"]},on:{input:e.handleInput},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{ref:"qDateProxy",attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{attrs:{disable:e.disabled},on:{input:function(){e.$refs.qDateProxy.hide(),e.handleInput()}},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1)],1)]},proxy:!0}],null,!1,2152658851),model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1),a("div",{staticClass:"col q-pa-md"},[a("q-input",{attrs:{disable:e.disabled,filled:"",mask:"time",rules:["time"]},on:{input:e.handleInput},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"access_time"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-time",{attrs:{disable:e.disabled},on:{input:e.handleInput},model:{value:e.time,callback:function(t){e.time=t},expression:"time"}})],1)],1)]},proxy:!0}],null,!1,1797291807),model:{value:e.time,callback:function(t){e.time=t},expression:"time"}})],1)]):e._e()])},c=[],u={props:["disabled","mode","value","required-key"],data:function(){return{app_key:"",app_value:"",mask:"DD-MM-YYYY HH:mm",date:"2019/02/01",time:"10:56",readOnly:!1}},methods:{handleInput:function(e){var t="",a="",i=this.mode,n=this.disabled;"date"==i?(t=this.app_key,a="".concat(this.date," ").concat(this.time)):(t=this.app_key,a=this.app_value),this.$emit("input",{key:t,value:a,mode:i,disabled:n})}},mounted:function(){null!=this.requiredKey&&(this.app_key=this.requiredKey,this.readOnly=!0)}},p=u,m=a("2877"),h=Object(m["a"])(p,r,c,!1,null,"32d2801d",null),v=h.exports,b={data:function(){return{checked:!0,choseType:!1,mode:"",buttonText:"data type",once:!0,obj:{},my_id:null}},computed:{disabled:function(){return this.value.disabled}},watch:{},methods:{onItemClick:function(e){this.choseType=!0,this.mode=e,this.buttonText=e},handleInput:function(e){e.disabled=this.value.disabled,e.id=this.my_id,this.$emit("input",e)},handleInputCheckBox:function(e){this.checked=!this.checked,this.handleInput(e)}},components:{"app-dynamic":v},props:["value","id","required"],created:function(){this.once&&(this.my_id=this.id,console.log(this.my_id),this.once=!1)},mounted:function(){"true"==this.required&&(this.onItemClick("date"),this.value.key="upload date")}},f=b,k=Object(m["a"])(f,o,d,!1,null,"22dd479f",null),q=k.exports,y={data:function(){return{properties:[],clicked:!1,clean:!1,opened:!1,schemaName:"",save:!1,id:0,uploadAt:l()({id:"-1",disabled:!1,mode:"date",key:"hggj"},"disabled",!1)}},computed:{save_txt:function(){return this.save?"Save":"Enter"},Clicked:function(){return this.clicked},Properties:function(){return this.properties}},components:{"app-request-field":q},methods:{log:function(e){console.log(e)},handle_click_save:function(){var e=this.properties.filter(function(e){return!e.disabled});e.push(this.uploadAt),this.filterdProperties=e.map(function(e){var t=e.key,a=e.value,i=e.mode;return{key:t,value:a,mode:i}}),this.$store.dispatch("Post/createPost",this.filterdProperties),this.$router.push("post/requests")},clean_handler:function(){this.properties=this.properties.filter(function(e){return!e.disabled})},handle_save_schema:function(){var e=this.schemaName,t=this.filterdProperties;this.save&&this.$store.dispatch("Post/createSchema",{schema_name:e,properties:t}),this.save=!0}}},_=y,x=Object(m["a"])(_,i,n,!1,null,"37bc2c1e",null);t["default"]=x.exports}}]);