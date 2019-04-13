(window.webpackJsonp=window.webpackJsonp||[]).push([["7ef09aca"],{"1a6f":function(t,e,a){"use strict";var s=a("7c9d");a.n(s).a},2178:function(t,e,a){"use strict";var s=a("cb37");a.n(s).a},4541:function(t,e,a){},4732:function(t,e,a){"use strict";a.r(e);var s=a("bd4c"),n=Date.now(),o=s.a.formatDate(n,"YYYY/MM/DD"),r={data:function(){return{lorem:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",hasDone_msg:"what has been Done since last meeting",toBeDone_msg:"what whould be complete till next meeting",obstacles_msg:"obastacles that would be in the way",dailyMeeting:{hasDone:"",toBeDone:"",obstacles:"",date:o}}}},c=(a("d25b"),a("2877")),i=Object(c.a)(r,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",{staticClass:"bg-grey-9 my-card",attrs:{dark:"",bordered:""}},[a("q-card-section",[a("div",{staticClass:"text-h6"},[t._v("daily scrum meeting")])]),a("q-card-section",[a("q-input",{attrs:{dark:"",label:t.hasDone_msg},model:{value:t.dailyMeeting.hasDone,callback:function(e){t.$set(t.dailyMeeting,"hasDone",e)},expression:"dailyMeeting.hasDone"}}),a("q-input",{attrs:{dark:"",label:t.toBeDone_msg},model:{value:t.dailyMeeting.toBeDone,callback:function(e){t.$set(t.dailyMeeting,"toBeDone",e)},expression:"dailyMeeting.toBeDone"}}),a("q-input",{attrs:{dark:"",label:t.obstacles_msg},model:{value:t.dailyMeeting.obstacles,callback:function(e){t.$set(t.dailyMeeting,"obstacles",e)},expression:"dailyMeeting.obstacles"}}),a("q-input",{attrs:{dark:"",filled:"",mask:t.dailyMeeting.date,rules:["date"]},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{attrs:{breakpoint:600}},[a("q-date",{attrs:{dark:"",filled:""},model:{value:t.dailyMeeting.date,callback:function(e){t.$set(t.dailyMeeting,"date",e)},expression:"dailyMeeting.date"}})],1)],1)]},proxy:!0}]),model:{value:t.dailyMeeting.date,callback:function(e){t.$set(t.dailyMeeting,"date",e)},expression:"dailyMeeting.date"}})],1),a("q-btn",{staticClass:"shadow-24",attrs:{fab:"",icon:"add",color:"accent"}})],1)},[],!1,null,"01a26bfa",null).exports,d={computed:{projectsArr:function(){return this.$store.getters.projects}},methods:{click_handle:function(t){this.$emit("toRoadmap",t)}},created:function(){this.$store.dispatch("syncProjects")}},l=(a("fc76"),Object(c.a)(d,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",{staticClass:"my-card",attrs:{flat:"",bordered:""}},[a("q-card-section",[a("div",{staticClass:"text-h6"},[t._v("Projects")])]),t._l(t.projectsArr,function(e,s){return a("div",{key:s},[a("q-card-section",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-12 col-md-4"},[a("div",{staticClass:"text-caption text-color-grey"},[t._v("Projects")]),a("div",{staticClass:"text-h6 text-weight-light"},[t._v(t._s(e.project_name))])]),a("div",{staticClass:"col-xs-4 col-sm-4 col-md-2"},[a("div",{staticClass:"text-caption"},[t._v("Person")]),a("div",{staticClass:"text-subtitle1"},[t._v(t._s(e.project_person))])]),a("div",{staticClass:"col-xs-6 col-sm-4 col-md-2"},[a("div",{staticClass:"text-caption"},[t._v("due by")]),a("div",{staticClass:"text-subtitle1"},[t._v(t._s(e.project_due_by))])]),a("div",{staticClass:"col-xs-2 col-sm-4 col-md-2"},[a("div",{staticClass:"text-caption"},[t._v("status")]),a("div",{staticClass:"text-subtitle1"},[t._v(t._s(e.project_status))])]),a("div",{staticClass:"col-xs-2 col-sm-4 col-md-2"},[a("div",{staticClass:"text-caption"},[t._v("roadmap")]),a("q-btn",{attrs:{round:""},on:{click:function(e){return t.click_handle(s)}}},[a("q-icon",{staticStyle:{"font-size":"3em"},attrs:{name:"directions"}})],1)],1)])]),a("q-separator")],1)})],2)},[],!1,null,"ae99bb36",null).exports),p=Date.now(),u=s.a.formatDate(p,"YYYY/MM/DD"),m={data:function(){return{project_name_msg:"what is the projects name",project_person_msg:"who is behind this project",project_status_msg:"status of the project (def. created)",newProject:{project_name:"",project_person:"",project_status:"created",project_due_by:u,project_roadmap:[]}}},methods:{addProject:function(t){var e={project_name:t.project_name,project_person:t.project_person,project_status:t.project_status,project_due_by:t.project_due_by,project_roadmap:t.project_roadmap};try{this.$store.dispatch("addProject",e).catch(function(t){alert(t)})}catch(t){alert(t)}}}},_=(a("2178"),Object(c.a)(m,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",{staticClass:" my-card",attrs:{bordered:""}},[a("q-card-section",[a("div",{staticClass:"text-h6"},[t._v("Add a New Project")])]),a("q-card-section",[a("q-input",{attrs:{label:t.project_name_msg},model:{value:t.newProject.project_name,callback:function(e){t.$set(t.newProject,"project_name",e)},expression:"newProject.project_name"}}),a("q-input",{attrs:{label:t.project_person_msg},model:{value:t.newProject.project_person,callback:function(e){t.$set(t.newProject,"project_person",e)},expression:"newProject.project_person"}}),a("q-input",{attrs:{label:t.project_status_msg},model:{value:t.newProject.project_status,callback:function(e){t.$set(t.newProject,"project_status",e)},expression:"newProject.project_status"}}),a("q-input",{attrs:{filled:"",mask:t.newProject.project_due_by,rules:["date"]},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{attrs:{breakpoint:600}},[a("q-date",{attrs:{filled:""},model:{value:t.newProject.project_due_by,callback:function(e){t.$set(t.newProject,"project_due_by",e)},expression:"newProject.project_due_by"}})],1)],1)]},proxy:!0}]),model:{value:t.newProject.project_due_by,callback:function(e){t.$set(t.newProject,"project_due_by",e)},expression:"newProject.project_due_by"}})],1),a("q-btn",{staticClass:"shadow-24",attrs:{fab:"",icon:"add",color:"cyan"},on:{click:function(e){return t.addProject(t.newProject)}}})],1)},[],!1,null,"ac4c565c",null).exports),y={props:["roadmap"],methods:{click_handle:function(){this.$emit("closeRoadmap")},add_handle:function(){this.$emit("showAddEntry")}},computed:{layout:function(){return this.$q.screen.lt.sm?"dense":this.$q.screen.lt.md?"comfortable":"loose"},projectName:function(){return this.$store.getters.projects[this.roadmap].project_name},projectRoadmap:function(){return this.$store.getters.projects[this.roadmap].project_roadmap}}},f=(a("d154"),Object(c.a)(y,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",{staticClass:"my-card",attrs:{flat:"",bordered:""}},[a("q-card-section",[a("div",{staticClass:"row justify-between"},[a("div",{staticClass:"col-6"},[a("div",{staticClass:"text-h6"},[t._v("Roadmap "+t._s(t.roadmap))])]),a("div",{staticClass:"col-5"},[a("div",{staticClass:"text-h6 text-right text-grey"},[a("q-btn",{staticClass:"q-mr-md",attrs:{round:""},on:{click:t.add_handle}},[a("q-icon",{staticStyle:{"font-size":"3em"},attrs:{name:"add"}})],1),a("q-btn",{staticClass:"q-mr-md",attrs:{round:""},on:{click:t.click_handle}},[a("q-icon",{staticStyle:{"font-size":"3em"},attrs:{name:"close"}})],1)],1)])])]),a("q-card-section",[a("div",{staticClass:"q-px-lg q-pb-md"},[a("q-timeline",{attrs:{layout:t.layout,color:"secondary"}},[a("q-timeline-entry",{attrs:{heading:""}},[t._v("\n      "+t._s(t.projectName)+"\n    ")]),t._l(t.projectRoadmap,function(e,s){return a("q-timeline-entry",{key:s,attrs:{title:e.title,subtitle:e.date,side:e.side,color:e.color,icon:e.icon}},[a("div",[t._v("\n        "+t._s(e.description)+"\n      ")])])})],2)],1)])],1)},[],!1,null,"8930e210",null).exports),h=Date.now(),b=s.a.formatDate(h,"YYYY/MM/DD"),w={props:["roadmapIndex"],data:function(){return{entry_title_msg:"what is the entry title",entry_side_msg:"what side to display",entry_color_msg:"what color to use",entry_icon_msg:"what icon to use",entry_description_msg:"enter description",newEntry:{title:"",side:"",icon:"",description:"",color:"",date:b}}},methods:{addEntry:function(t){var e={index:t.index,entry:{title:t.entry.title,side:t.entry.side,icon:t.entry.icon,description:t.entry.description,color:t.entry.color,date:t.entry.date}};this.$store.dispatch("addEntry",e)}}},j=(a("1a6f"),{components:{"app-daily-scrum-meeting":i,"app-table-projects":l,"app-add-new-project":_,"app-project-roadmap":f,"app-add-entry":Object(c.a)(w,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",{staticClass:" my-card",staticStyle:{width:"700px",height:"450px","max-height":"80vw","max-width":"80vw",overflow:"visible"},attrs:{bordered:""}},[a("q-card-section",[a("div",{staticClass:"text-h6"},[t._v("Add a New Entry")])]),a("q-card-section",[a("q-input",{attrs:{label:t.entry_title_msg},model:{value:t.newEntry.title,callback:function(e){t.$set(t.newEntry,"title",e)},expression:"newEntry.title"}}),a("q-input",{attrs:{label:t.entry_side_msg},model:{value:t.newEntry.side,callback:function(e){t.$set(t.newEntry,"side",e)},expression:"newEntry.side"}}),a("q-input",{attrs:{label:t.entry_color_msg},model:{value:t.newEntry.color,callback:function(e){t.$set(t.newEntry,"color",e)},expression:"newEntry.color"}}),a("q-input",{attrs:{label:t.entry_icon_msg},model:{value:t.newEntry.icon,callback:function(e){t.$set(t.newEntry,"icon",e)},expression:"newEntry.icon"}}),a("q-input",{attrs:{label:t.entry_description_msg},model:{value:t.newEntry.description,callback:function(e){t.$set(t.newEntry,"description",e)},expression:"newEntry.description"}}),a("q-input",{attrs:{filled:"",mask:t.newEntry.date,rules:["date"]},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{attrs:{breakpoint:600}},[a("q-date",{attrs:{filled:""},model:{value:t.newEntry.date,callback:function(e){t.$set(t.newEntry,"date",e)},expression:"newEntry.date"}})],1)],1)]},proxy:!0}]),model:{value:t.newEntry.date,callback:function(e){t.$set(t.newEntry,"date",e)},expression:"newEntry.date"}})],1),a("q-btn",{staticClass:"shadow-24",attrs:{fab:"",icon:"add",color:"cyan"},on:{click:function(e){return t.addEntry({entry:t.newEntry,index:t.roadmapIndex})}}})],1)},[],!1,null,"4b085baa",null).exports},data:function(){return{showRoadmap:!1,showAddRoadmap:!1,currentIndex:0,card:!1}},computed:{addRoadmap:function(){return this.showAddRoadmap}},methods:{toRoadmapHandler:function(t){this.currentIndex=t,this.showRoadmap=!0},closeRoadmapHandler:function(){this.showRoadmap=!1},showAddRoadmapHandler:function(){this.showAddRoadmap=!0,this.card=!0,console.log(this.showAddRoadmap)},closeAddRoadmapHandler:function(){this.showAddRoadmap=!1,console.log(this.showAddRoadmap)}}}),v=Object(c.a)(j,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",[a("div",{staticClass:"row justify-center q-pa-md"},[a("div",{staticClass:"col-12"},[a("app-table-projects",{on:{toRoadmap:t.toRoadmapHandler}}),a("transition",{attrs:{appear:"","enter-active-class":"animated fadeInDown","leave-active-class":"animated fadeOutUp"}},[t.showRoadmap?a("app-project-roadmap",{staticClass:"q-my-md",attrs:{roadmap:t.currentIndex},on:{showAddEntry:t.showAddRoadmapHandler,closeRoadmap:t.closeRoadmapHandler}}):t._e()],1),a("q-dialog",{model:{value:t.card,callback:function(e){t.card=e},expression:"card"}},[a("app-add-entry",{attrs:{"roadmap-index":t.currentIndex}})],1)],1)]),a("div",{staticClass:"row justify-between q-pa-md "},[a("div",{staticClass:"col-md-5 col-xs-12 q-my-lg"},[a("app-daily-scrum-meeting")],1),a("div",{staticClass:"col-md-5 col-xs-12 q-my-lg"},[a("app-add-new-project")],1)])])},[],!1,null,null,null);e.default=v.exports},"7c9d":function(t,e,a){},"932e":function(t,e,a){},ac55:function(t,e,a){},cb37:function(t,e,a){},d154:function(t,e,a){"use strict";var s=a("ac55");a.n(s).a},d25b:function(t,e,a){"use strict";var s=a("932e");a.n(s).a},fc76:function(t,e,a){"use strict";var s=a("4541");a.n(s).a}}]);
//# sourceMappingURL=7ef09aca.f28c00cc.js.map