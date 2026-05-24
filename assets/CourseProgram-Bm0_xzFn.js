import{x as p,r as g,a1 as u,j as e,S as b,O as v,P as w,m as a,s as f,e as y}from"./index-CYQC3tU4.js";import{u as j,M as N}from"./useGetCourses-DlyxTmbE.js";const C=(l,t)=>{const r=l.split(" ");return r.length<=t?l:r.slice(0,t).join(" ")+"..."},k=()=>e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:Array.from({length:6}).map((l,t)=>e.jsx("div",{className:"h-[360px] rounded-lg bg-white shadow-md overflow-hidden animate-pulse",children:e.jsxs("div",{className:"h-full p-6 flex flex-col",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("div",{className:"h-3 w-20 bg-gray-200 rounded"}),e.jsx("div",{className:"h-3 w-16 bg-gray-200 rounded"})]}),e.jsxs("div",{className:"mt-auto",children:[e.jsx("div",{className:"w-14 h-14 mb-4 rounded-full bg-gray-200"}),e.jsx("div",{className:"h-5 w-3/4 bg-gray-200 rounded"})]}),e.jsxs("div",{className:"mt-4 space-y-2",children:[e.jsx("div",{className:"h-3 w-full bg-gray-200 rounded"}),e.jsx("div",{className:"h-3 w-5/6 bg-gray-200 rounded"}),e.jsx("div",{className:"h-3 w-4/6 bg-gray-200 rounded"})]})]})},t))}),I=()=>e.jsx("div",{className:"w-full flex justify-center items-center py-8",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-700",children:"No courses available right now"}),e.jsx("p",{className:"text-gray-500 mt-2",children:"Please check back later. New courses will be added soon."})]})}),T=()=>{const{data:l,isLoading:t}=j(),r=l?.data??[],m=p(),[i,o]=g.useState("all"),{data:x}=u(),n=x?.data??[],d=s=>{m(`/${s.slug}`)},c=i==="all"?r:r.filter(s=>s.categoryId===i);return e.jsxs(e.Fragment,{children:[e.jsx(b,{title:"IT & Management Courses in Nepal | LBEF College",description:"Explore world-class IT and management courses at LBEF College Nepal. Undergraduate programs designed for global careers with experienced faculty.",url:`${v}/programs`}),e.jsxs("div",{className:"min-h-screen bg-gray-50",children:[e.jsx(w,{title:"World Class Courses Students Can Join With Us",highlightedText:"Courses",subtitle:"World Class Course Students Can Join With Us",badgeText:"Explore Our Academic Programs"}),t&&e.jsx("div",{className:"relative bg-gray-100 py-10 px-4",children:e.jsx("div",{className:"relative max-w-7xl mx-auto",children:e.jsx(k,{})})}),!t&&n.length>0&&e.jsx("div",{className:"container mx-auto px-4 sm:px-6 mb-10",children:e.jsxs(a.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.3},className:"relative",children:[e.jsx("div",{className:"absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-gray-50 to-transparent pointer-events-none z-10 md:hidden"}),e.jsx("div",{className:"absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-gray-50 to-transparent pointer-events-none z-10 md:hidden"}),e.jsx("div",{className:"overflow-x-auto pb-2 hide-scrollbar md:overflow-visible",children:e.jsxs("div",{className:"flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 md:gap-3 min-w-max md:min-w-0 px-4 md:px-0",children:[e.jsxs(a.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>o("all"),className:`
              relative px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm font-medium 
              transition-all duration-300 whitespace-nowrap
              ${i==="all"?"text-white shadow-lg shadow-blue-500/30":"text-gray-600 hover:text-blue-600 bg-white/80 hover:bg-white"}
              ${i==="all"?"bg-linear-to-r from-blue-600 to-indigo-600":"border border-gray-200 hover:border-blue-200"}
            `,children:[i==="all"&&e.jsx(a.div,{layoutId:"activeTab",className:"absolute inset-0 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 -z-10",transition:{type:"spring",bounce:.2,duration:.6}}),e.jsxs("span",{className:"relative z-10 flex items-center gap-2",children:[e.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})}),"All Programs"]})]}),n.map((s,h)=>e.jsxs(a.button,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.1*(h+1)},whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>o(s.id??0),className:`
                relative px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm font-medium 
                transition-all duration-300 whitespace-nowrap
                ${i===s.id?"text-white shadow-lg shadow-blue-500/30":"text-gray-600 hover:text-blue-600 bg-white/80 hover:bg-white"}
                ${i===s.id?"bg-linear-to-r from-blue-600 to-indigo-600":"border border-gray-200 hover:border-blue-200"}
              `,children:[i===s.id&&e.jsx(a.div,{layoutId:"activeTab",className:"absolute inset-0 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 -z-10",transition:{type:"spring",bounce:.2,duration:.6}}),e.jsx("span",{className:"relative z-10 flex items-center gap-2",children:s.name})]},s.id))]})}),e.jsx("div",{className:"hidden md:block absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-linear-to-r from-transparent via-blue-200 to-transparent"})]})}),e.jsx("style",{children:`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}),!t&&r.length===0&&e.jsx(I,{}),e.jsxs("div",{className:"container mx-auto px-6 py-10",children:[e.jsx(a.div,{variants:f,initial:"hidden",whileInView:"visible",viewport:{once:!0},className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto",children:!t&&c.length>0&&c.map(s=>e.jsxs(a.div,{onClick:()=>d(s),className:"group relative cursor-pointer overflow-hidden rounded-lg bg-white border-b-4 border-blue-600 shadow-md h-[360px]",children:[e.jsx(a.div,{initial:{scale:0},whileInView:{scale:1},viewport:{once:!0},transition:{type:"spring",stiffness:100,damping:10},className:"absolute inset-x-0 top-0 bottom-10 bg-no-repeat bg-center bg-size-[50%_50%]",style:{backgroundImage:`url(${y})`}}),e.jsx("div",{className:"card-bg absolute inset-0 bg-blue-600"}),e.jsxs("div",{className:"relative z-10 p-6 flex flex-col h-full",children:[e.jsxs(a.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{type:"spring",stiffness:120,damping:15},className:"flex justify-between",children:[e.jsx("p",{className:"text-xs uppercase text-blue-600 group-hover:text-white",children:s.degree}),e.jsxs("p",{className:"text-xs uppercase text-blue-600 group-hover:text-white",children:[s.duration," years"]})]}),e.jsxs("div",{className:"mt-auto",children:[e.jsx(a.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{type:"spring",stiffness:120,damping:15,delay:.1},className:"w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-blue-100 group-hover:opacity-0 transition",children:e.jsx(N,{className:"w-7 h-7 text-blue-600"})}),e.jsxs(a.h3,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{type:"spring",stiffness:120,damping:15,delay:.2},className:"text-xl font-bold group-hover:text-white",children:[s.prefix," ",s.title]})]}),e.jsxs("div",{className:"hover-reveal mt-4",children:[e.jsx("p",{className:"text-sm text-white",children:C(s.details??"",20)}),e.jsx("span",{className:"mt-5 block text-white font-semibold cursor-pointer",onClick:()=>d(s),children:"READ MORE"})]})]})]},s.id))}),e.jsx("style",{children:`
          .card-bg {
            transform: scaleY(0);
            transform-origin: bottom;
            transition: transform 0.5s ease;
          }

          .group:hover .card-bg {
            transform: scaleY(1);
          }

          .hover-reveal {
            max-height: 0;
            opacity: 0;
            transform: translateY(24px);
            overflow: hidden;
            transition:
              max-height 0.5s ease,
              opacity 0.4s ease,
              transform 0.5s ease;
          }

          .group:hover .hover-reveal {
            max-height: 200px;
            opacity: 1;
            transform: translateY(0);
          }
        `})]})]})]})};export{T as default};
