(function(){
"use strict";
var D = window.IFRS_DATA || {pages:[],questions:[],flashcards:[],traps:[],review:[],standards:[]};

/* ---------- storage (safe) ---------- */
var mem = {};
function load(k, def){ try{ var v = localStorage.getItem("ifrs."+k); return v ? JSON.parse(v) : def; }catch(e){ return k in mem ? mem[k] : def; } }
function save(k, v){ mem[k] = v; try{ localStorage.setItem("ifrs."+k, JSON.stringify(v)); }catch(e){} }
var S = {
  lang: load("lang","ar"), theme: load("theme",""), bookmarks: load("bookmarks",[]),
  read: load("read",[]), open: load("open",{}), qstat: load("qstat",{}), fc: load("fc",{})
};

/* ---------- i18n ---------- */
var T = {
  home:["الرئيسية","Home"], ifrs:["معايير IFRS","IFRS Standards"], ias:["معايير IAS","IAS Standards"],
  concepts:["المفاهيم","Concepts"], comparisons:["المقارنات","Comparisons"], calculations:["الحسابات","Calculations"],
  "journal-entries":["القيود اليومية","Journal Entries"], "case-studies":["دراسات الحالة","Case Studies"],
  practice:["أسئلة الممارسة","Practice Questions"], flashcards:["البطاقات","Flashcards"], traps:["فخاخ الامتحان","Exam Traps"],
  "rapid-review":["مراجعة سريعة","Quick Review"], glossary:["المصطلحات","Glossary"], sources:["المصادر والخريطة","Sources & Map"],
  bookmarks:["المحفوظات","Bookmarks"],
  search:["ابحث…","Search…"], prev:["السابق","Previous"], next:["التالي","Next"], toc:["محتويات الصفحة","On this page"],
  mark:["تمت المراجعة","Mark as reviewed"], marked:["تمت المراجعة ✓","Reviewed ✓"], bm:["حفظ","Bookmark"], bmOn:["محفوظة ★","Saved ★"],
  none:["لا يوجد محتوى بعد في هذا القسم.","No content in this section yet."],
  progress:["تقدمك","Your progress"], pagesRev:["صفحات تمت مراجعتها","pages reviewed"], qAns:["أسئلة أُجيب عنها","questions answered"],
  qOk:["إجابات صحيحة","correct"], fcKnown:["بطاقات محفوظة","cards known"],
  coverage:["حالة تغطية المعايير","Standards coverage"], ready:["جاهز","Ready"], planned:["مخطط","Planned"],
  wave:["الموجة","Wave"], std:["المعيار","Standard"], chapter:["الفصل / المصدر","Chapter / source"], status:["الحالة","Status"],
  all:["الكل","All"], diff:["الصعوبة","Difficulty"], easy:["سهل","easy"], medium:["متوسط","medium"], hard:["صعب","hard"],
  start:["ابدأ","Start"], check:["تحقق","Check"], nextQ:["السؤال التالي","Next question"], restart:["إعادة","Restart"],
  score:["النتيجة","Score"], correct:["صحيح ✓","Correct ✓"], incorrect:["خطأ ✗","Incorrect ✗"], why:["لماذا الإجابات الأخرى خطأ","Why the others are wrong"],
  source:["المصدر","Source"], tapFlip:["اضغط لقلب البطاقة","Tap to flip"], know:["أعرفها","I know it"], again:["أراجعها","Review again"],
  front:["السؤال","Question"], back:["الإجابة","Answer"], resetProg:["مسح التقدم","Reset progress"],
  noResults:["لا نتائج","No results"], openPage:["فتح الصفحة","Open page"], fromPage:["من صفحة","From"],
  trapsIntro:["كل ما كُتب تحت عناوين الأخطاء الشائعة / فخاخ الامتحان في صفحات المعايير، مجمّعاً في مكان واحد.","Everything written under Common mistakes / Exam traps in the standard pages, collected in one place."],
  reviewIntro:["ملخصات المراجعة السريعة من صفحات المعايير.","Quick-review summaries from the standard pages."],
  homeLead:["مرجع عملي للمراجعة الخارجية والتحضير لامتحان IFRS (DipIFR) يونيو 2027.","A working reference for external audit and DipIFR (June 2027) preparation."],
  note:["ملاحظة المصدر","Source note"],
  tabExplain:["الشرح والأمثلة","Explanation & examples"], tabQ:["أسئلة","Questions"], tabF:["بطاقات","Flashcards"],
  soon:["قريباً","Coming soon"], partial:["جزئي","Partial"], stdList:["قائمة المعايير","Standards"],
  plannedMsg:["لم تُكتب صفحة هذا المعيار بعد. مكانه في الكتب:","This standard's page is not written yet. Where it sits in the books:"],
  kitQs:["أسئلة الـ Kit المرتبطة","Related Kit questions"], noQ:["لا توجد أسئلة لهذا المعيار بعد.","No questions for this standard yet."],
  hideMenu:["إخفاء/إظهار القائمة","Show/hide menu"], ready2:["جاهز","Ready"],
  noteText:["المحتوى مبني على كتابي BPP (Study Text وKit) لامتحانات ديسمبر 2025 ويونيو 2026. يجب مطابقته مع قائمة المعايير المقررة ليونيو 2027 من ACCA.","Content is built on the BPP Study Text and Kit for Dec 2025 / Jun 2026. It must be checked against ACCA's June 2027 examinable-documents list."]
};
function t(k){ var v = T[k]; return v ? (S.lang==="ar" ? v[0] : v[1]) : k; }
function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }


/* ---------- visual blocks ---------- */
function bdir(text){ var m = String(text).match(/[A-Za-z\u0600-\u06FF]/); return m && /[\u0600-\u06FF]/.test(m[0]) ? "rtl" : "ltr"; }
function splitKV(line, sep){ var k = line.indexOf(sep); return k<0 ? [line.trim(), ""] : [line.slice(0,k).trim(), line.slice(k+sep.length).trim()]; }
function num(x){ var n = parseFloat(String(x).replace(/[^0-9.\-]/g,"")); return isNaN(n) ? 0 : n; }
function fmt(n){ return n.toLocaleString("en-US",{maximumFractionDigits:2}); }
function box(cls, buf){
  var title = "", body = buf.slice();
  if(body.length && /^#\s+/.test(body[0])){ title = body.shift().replace(/^#\s+/,""); }
  return '<div class="vbox '+cls+'">'+(title?'<div class="vt" dir="auto">'+inline(title)+"</div>":"")+'<div class="vb md">'+renderMD(body.join("\n"))+"</div></div>";
}
var VIS = {
  tip:function(b){ return box("tip", b); }, warn:function(b){ return box("warn", b); }, trap:function(b){ return box("trap", b); },
  example:function(b){ return box("example", b); }, keyterm:function(b){ return box("keyterm", b); }, summary:function(b){ return box("summary", b); },
  flow:function(b){
    var h = '<div class="flow" dir="'+bdir(b.join(" "))+'">', n = 0;
    b.filter(function(x){ return x.trim(); }).forEach(function(x, idx, arr){
      var kv = splitKV(x, "::"); n++;
      h += '<div class="fstep"><span class="fn">'+n+'</span><b dir="auto">'+inline(kv[0])+"</b>"+(kv[1]?'<small dir="auto">'+inline(kv[1])+"</small>":"")+"</div>";
      if(idx < arr.length-1) h += '<span class="farrow" aria-hidden="true">➜</span>';
    });
    return h + "</div>";
  },
  timeline:function(b){
    return '<div class="timeline" dir="'+bdir(b.join(" "))+'">'+b.filter(function(x){return x.trim();}).map(function(x){ var kv = splitKV(x,"::"); return '<div class="tl"><i></i><div><b dir="auto">'+inline(kv[0])+'</b><span dir="auto">'+inline(kv[1])+"</span></div></div>"; }).join("")+"</div>";
  },
  journal:function(b){
    var title = "", rows = "", note = "";
    b.forEach(function(x){
      x = x.trim(); if(!x) return;
      if(/^#\s+/.test(x)){ title = x.replace(/^#\s+/,""); return; }
      if(/^note:/i.test(x)){ note = x.replace(/^note:\s*/i,""); return; }
      var kv = splitKV(x,"|"), m = kv[0].match(/^(Dr|Cr)\s+(.*)$/i);
      if(!m) return;
      var dr = m[1].toLowerCase()==="dr";
      rows += '<tr class="'+(dr?"dr":"cr")+'"><td dir="auto" style="padding-inline-start:'+(dr?"6px":"28px")+'">'+(dr?"":"")+inline(m[2])+"</td><td>"+(dr?esc(kv[1]):"")+"</td><td>"+(dr?"":esc(kv[1]))+"</td></tr>";
    });
    return '<div class="journal" dir="'+bdir(b.join(" "))+'">'+(title?'<div class="vt" dir="auto">'+inline(title)+"</div>":"")+'<table><thead><tr><th>'+(S.lang==="ar"?"الحساب":"Account")+"</th><th>"+(S.lang==="ar"?"مدين":"Debit")+"</th><th>"+(S.lang==="ar"?"دائن":"Credit")+"</th></tr></thead><tbody>"+rows+"</tbody></table>"+(note?'<div class="jn" dir="auto">'+inline(note)+"</div>":"")+"</div>";
  },
  bars:function(b){
    var title = "", unit = "", items = [];
    b.forEach(function(x){ x = x.trim(); if(!x) return; if(/^title:/i.test(x)) title = x.replace(/^title:\s*/i,""); else if(/^unit:/i.test(x)) unit = x.replace(/^unit:\s*/i,""); else { var kv = splitKV(x,"|"); items.push({l:kv[0], v:num(kv[1])}); } });
    var max = Math.max.apply(null, items.map(function(i){ return Math.abs(i.v); }).concat([1]));
    return '<div class="bars" dir="'+bdir(b.join(" "))+'">'+(title?'<div class="vt" dir="auto">'+inline(title)+"</div>":"")+items.map(function(i){ return '<div class="brow"><span class="bl" dir="auto">'+inline(i.l)+'</span><span class="bt"><i class="'+(i.v<0?"neg":"")+'" style="width:'+Math.max(2,Math.round(100*Math.abs(i.v)/max))+'%"></i></span><span class="bv">'+esc((i.v<0?"-":"")+fmt(Math.abs(i.v))+(unit?" "+unit:""))+"</span></div>"; }).join("")+"</div>";
  },
  split:function(b){
    var title = "", items = [];
    b.forEach(function(x){ x = x.trim(); if(!x) return; if(/^title:/i.test(x)) title = x.replace(/^title:\s*/i,""); else { var kv = splitKV(x,"|"); items.push({l:kv[0], v:num(kv[1])}); } });
    var tot = items.reduce(function(a,i){ return a+i.v; },0) || 1;
    return '<div class="split" dir="'+bdir(b.join(" "))+'">'+(title?'<div class="vt" dir="auto">'+inline(title)+"</div>":"")+'<div class="sbar">'+items.map(function(i,k){ return '<i class="c'+(k%6)+'" style="width:'+(100*i.v/tot)+'%" title="'+esc(i.l)+'">'+(100*i.v/tot>=9?Math.round(100*i.v/tot)+"%":"")+"</i>"; }).join("")+'</div><div class="slg">'+items.map(function(i,k){ return '<span dir="auto"><i class="c'+(k%6)+'"></i>'+inline(i.l)+": <b>"+fmt(i.v)+"</b> ("+(100*i.v/tot).toFixed(1)+"%)</span>"; }).join("")+"</div></div>";
  },
  tree:function(b){
    var root = {c:[]}, stack = [{d:-1,n:root}];
    b.filter(function(x){ return x.trim(); }).forEach(function(x){
      var d = Math.floor(x.match(/^\s*/)[0].length/2), node = {t:x.trim(), c:[]};
      while(stack.length>1 && stack[stack.length-1].d >= d) stack.pop();
      stack[stack.length-1].n.c.push(node); stack.push({d:d,n:node});
    });
    function R(list){
      if(!list.length) return "";
      return "<ul>"+list.map(function(n){
        var m = n.t.match(/^(Y|N|نعم|لا):\s*(.*)$/), tag = "", txt = n.t;
        if(m){ var y = /^(Y|نعم)$/.test(m[1]); tag = '<em class="'+(y?"y":"n")+'">'+(y?(S.lang==="ar"?"نعم":"Yes"):(S.lang==="ar"?"لا":"No"))+"</em>"; txt = m[2]; }
        return "<li>"+tag+'<span class="tn" dir="auto">'+inline(txt)+"</span>"+R(n.c)+"</li>";
      }).join("")+"</ul>";
    }
    return '<div class="tree" dir="'+bdir(b.join(" "))+'">'+R(root.c)+"</div>";
  }
};

/* ---------- markdown ---------- */
function slug(s){ return s.toLowerCase().replace(/<[^>]+>/g,"").replace(/[^\w؀-ۿ]+/g,"-").replace(/^-+|-+$/g,"") || "h"; }
function inline(s){
  s = esc(s);
  s = s.replace(/`([^`]+)`/g,"<code>$1</code>");
  s = s.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>");
  s = s.replace(/(^|[\s(])\*([^*\s][^*]*)\*/g,"$1<em>$2</em>");
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,function(m,a,u){ return /^(https?:|#|\/)/.test(u) ? '<a href="'+u+'">'+a+'</a>' : a; });
  return s;
}
function renderMD(md){
  var lines = md.replace(/\r/g,"").split("\n"), out = [], i = 0, ids = {};
  function hid(txt){ var b = slug(txt), id = b, n = 1; while(ids[id]){ id = b+"-"+(++n); } ids[id] = 1; return id; }
  while(i < lines.length){
    var l = lines[i];
    if(/^```/.test(l)){ var lang=l.replace(/^```\s*/,"").trim().toLowerCase(), buf=[]; i++; while(i<lines.length && !/^```/.test(lines[i])){ buf.push(lines[i]); i++; } i++; out.push(VIS[lang] ? VIS[lang](buf) : "<pre><code>"+esc(buf.join("\n"))+"</code></pre>"); continue; }
    var h = l.match(/^(#{1,6})\s+(.*)$/);
    if(h){ var n = h[1].length, id = hid(h[2]); out.push("<h"+n+' id="'+id+'" dir="auto">'+inline(h[2])+"</h"+n+">"); i++; continue; }
    if(/^\s*(-{3,}|\*{3,})\s*$/.test(l)){ out.push("<hr>"); i++; continue; }
    if(/^\|.*\|\s*$/.test(l) && i+1<lines.length && /^\|?\s*:?-{2,}/.test(lines[i+1])){
      var rows = [];
      while(i<lines.length && /^\|.*\|\s*$/.test(lines[i])){ rows.push(lines[i]); i++; }
      var cells = function(r){ return r.replace(/^\||\|\s*$/g,"").split(/(?<!\\)\|/).map(function(c){ return c.trim().replace(/\\\|/g,"|"); }); };
      var head = cells(rows[0]), body = rows.slice(2).map(cells);
      out.push('<table dir="'+bdir(rows.join(" "))+'"><thead><tr>'+head.map(function(c){return '<th dir="auto">'+inline(c)+"</th>";}).join("")+"</tr></thead><tbody>"+
        body.map(function(r){ return "<tr>"+r.map(function(c){return '<td dir="auto">'+inline(c)+"</td>";}).join("")+"</tr>"; }).join("")+"</tbody></table>");
      continue;
    }
    if(/^>\s?/.test(l)){ var q=[]; while(i<lines.length && /^>\s?/.test(lines[i])){ q.push(lines[i].replace(/^>\s?/,"")); i++; } out.push('<blockquote dir="auto">'+inline(q.join(" "))+"</blockquote>"); continue; }
    if(/^\s*([-*]|\d+\.)\s+/.test(l)){
      var items = [];
      while(i<lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])){
        var m = lines[i].match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
        items.push({d: Math.floor(m[1].length/2), ord: /\d/.test(m[2]), t: m[3]}); i++;
        while(i<lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*([-*]|\d+\.)\s+/.test(lines[i])){ items[items.length-1].t += " "+lines[i].trim(); i++; }
      }
      var html = "", stack = [];
      items.forEach(function(it){
        var want = Math.min(it.d + 1, stack.length + 1);
        if(stack.length === 0 || want > stack.length){ stack.push(it.ord?"ol":"ul"); html += "<"+stack[stack.length-1]+' dir="auto">'; }
        else { while(stack.length > want){ html += "</li></"+stack.pop()+">"; } html += "</li>"; }
        html += "<li>"+inline(it.t);
      });
      while(stack.length){ html += "</li></"+stack.pop()+">"; }
      out.push(html); continue;
    }
    if(!l.trim()){ i++; continue; }
    var p = [l]; i++;
    while(i<lines.length && lines[i].trim() && !/^(#{1,6}\s|```|>|\||\s*([-*]|\d+\.)\s+|\s*(-{3,}|\*{3,})\s*$)/.test(lines[i])){ p.push(lines[i]); i++; }
    out.push('<p dir="auto">'+inline(p.join(" "))+"</p>");
  }
  return out.join("\n");
}

/* ---------- data helpers ---------- */
var NAV = ["home","ifrs","ias","concepts","comparisons","calculations","journal-entries","case-studies","practice","flashcards","traps","rapid-review","glossary","sources","bookmarks"];
var SECTION_PAGES = ["ifrs","ias","concepts","comparisons","calculations","journal-entries","case-studies","glossary","sources","rapid-review"];
function pagesIn(sec){ return D.pages.filter(function(p){ return p.section===sec; }); }
function pageById(id){ return D.pages.filter(function(p){ return p.id===id; })[0]; }
function count(k){
  if(SECTION_PAGES.indexOf(k)>=0) return pagesIn(k).length;
  if(k==="practice") return D.questions.length; if(k==="flashcards") return D.flashcards.length;
  if(k==="traps") return D.traps.length; if(k==="bookmarks") return S.bookmarks.length; return "";
}
function allOrder(){ var o=[]; ["ifrs","ias","concepts","comparisons","calculations","journal-entries","case-studies","rapid-review","glossary","sources"].forEach(function(s){ pagesIn(s).forEach(function(p){ o.push(p); }); }); return o; }
function toggle(arr, v){ var i = arr.indexOf(v); if(i>=0) arr.splice(i,1); else arr.push(v); }

/* ---------- shell ---------- */
var $ = function(s){ return document.querySelector(s); };
var main = $("#main"), sidebar = $("#sidebar"), toc = $("#toc");
function applyShell(){
  document.documentElement.lang = S.lang; document.documentElement.dir = S.lang==="ar" ? "rtl" : "ltr";
  if(S.theme) document.documentElement.setAttribute("data-theme", S.theme); else document.documentElement.removeAttribute("data-theme");
  $("#langBtn").textContent = S.lang==="ar" ? "EN" : "ع";
  $("#search").placeholder = t("search");
}
function stdSlug(e){ return e.id.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); }
function stdsOf(kind){ return D.standards.filter(function(e){ return e.kind===kind; }); }
function stdHref(e){ return e.ready ? "#/page/"+e.page : "#/std/"+e.kind+"/"+stdSlug(e); }
function renderSidebar(route){
  var html = "";
  NAV.forEach(function(k){
    var c = count(k), active = route.key===k, isGroup = (k==="ifrs"||k==="ias");
    if(isGroup){
      var open = (S.open[k] !== false) && (S.open[k] === true || route.key===k || route.kind===k);
      var list = stdsOf(k);
      html += '<div class="grp"><div class="grow'+(active?" active":"")+'"><a href="#/'+k+'">'+esc(t(k))+'</a><span class="count">'+list.length+'</span><button class="chev" data-g="'+k+'" aria-expanded="'+open+'" aria-label="toggle">'+(open?"▾":"▸")+"</button></div>";
      if(open) html += '<div class="sub">'+list.map(function(e){ var cur = route.page===e.page || route.std===k+"/"+stdSlug(e); return '<a href="'+stdHref(e)+'" class="'+(cur?"active":"")+'" dir="ltr"><span>'+esc(e.id)+'</span><i class="dot '+(e.ready?(e.partial?"part":"ok"):"")+'" title="'+esc(e.ready?(e.partial?t("partial"):t("ready")):t("soon"))+'"></i></a>'; }).join("")+"</div>";
      html += "</div>";
      return;
    }
    html += '<a href="#/'+(k==="home"?"home":k)+'" class="'+(active?"active":"")+'"><span>'+esc(t(k))+"</span>"+(c!==""?'<span class="count">'+c+"</span>":"")+"</a>";
    if(active && SECTION_PAGES.indexOf(k)>=0){
      html += '<div class="sub">'+pagesIn(k).map(function(p){ return '<a href="#/page/'+p.id+'" class="'+(route.page===p.id?"active":"")+'">'+esc(shortTitle(p))+"</a>"; }).join("")+"</div>";
    }
  });
  sidebar.innerHTML = html;
  sidebar.querySelectorAll(".chev").forEach(function(btn){ btn.onclick = function(){ var g = btn.dataset.g, cur = btn.getAttribute("aria-expanded")==="true"; S.open[g] = !cur; save("open",S.open); renderSidebar(parse2()); }; });
}
function parse2(){ var r = parse(); if(r.page) r.key = r.sec; return r; }
function shortTitle(p){ return p.title.length>46 ? p.title.slice(0,44)+"…" : p.title; }

/* ---------- views ---------- */
function viewHome(){
  var rd = S.read.length, tp = allOrder().length;
  var ans = Object.keys(S.qstat).length, ok = Object.keys(S.qstat).filter(function(k){ return S.qstat[k]; }).length;
  var fk = Object.keys(S.fc).filter(function(k){ return S.fc[k]==="know"; }).length;
  var h = "<h1>IFRS Study — "+(S.lang==="ar"?"مرجع IFRS":"IFRS Reference")+"</h1><p dir=auto>"+esc(t("homeLead"))+"</p>";
  h += '<div class="card" style="margin:14px 0"><strong>'+esc(t("note"))+":</strong> "+esc(t("noteText"))+"</div>";
  h += "<h2>"+esc(t("progress"))+'</h2><div class="stats"><div class="card"><b>'+rd+"/"+tp+"</b>"+esc(t("pagesRev"))+'</div><div class="card"><b>'+ans+"/"+D.questions.length+"</b>"+esc(t("qAns"))+'</div><div class="card"><b>'+ok+"</b>"+esc(t("qOk"))+'</div><div class="card"><b>'+fk+"/"+D.flashcards.length+"</b>"+esc(t("fcKnown"))+"</div></div>";
  h += '<div class="bar" style="margin-top:12px"><i style="width:'+(tp?Math.round(100*rd/tp):0)+'%"></i></div>';
  h += '<div class="actions"><button class="btn" id="resetBtn">'+esc(t("resetProg"))+"</button></div>";
  h += "<h2>"+esc(t("coverage"))+'</h2><div class="md"><table class="plain"><thead><tr><th>'+esc(t("wave"))+"</th><th>"+esc(t("std"))+"</th><th>"+esc(t("chapter"))+"</th><th>"+esc(t("status"))+"</th></tr></thead><tbody>";
  D.standards.forEach(function(s){ h += "<tr><td>"+(s.wave||"—")+"</td><td dir=auto><strong>"+esc(s.id)+"</strong><br><small>"+esc(s.title)+"</small></td><td dir=auto>"+esc(s.chapter)+'</td><td><span class="badge '+s.status+'">'+esc(t(s.status))+"</span></td></tr>"; });
  h += "</tbody></table></div><h2>"+(S.lang==="ar"?"الأقسام":"Sections")+'</h2><div class="grid">';
  NAV.slice(1).forEach(function(k){ h += '<a class="card" href="#/'+k+'"><strong>'+esc(t(k))+"</strong><br><small>"+count(k)+"</small></a>"; });
  h += "</div>";
  main.innerHTML = h; toc.innerHTML = "";
  $("#resetBtn").onclick = function(){ if(confirm(S.lang==="ar"?"مسح كل التقدم؟":"Reset all progress?")){ S.read=[]; S.qstat={}; S.fc={}; save("read",[]); save("qstat",{}); save("fc",{}); route(); } };
}
function viewList(sec){
  var h = "<h1>"+esc(t(sec))+"</h1>";
  if(sec==="ifrs" || sec==="ias"){
    var L = stdsOf(sec);
    h += '<div class="grid">'+L.map(function(e){ return '<a class="card" href="'+stdHref(e)+'"><strong dir="ltr">'+esc(e.id)+'</strong><br><span dir="auto">'+esc(e.name)+'</span><br><span class="badge '+(e.ready?"ready":"planned")+'">'+esc(e.ready?(e.partial?t("partial"):t("ready")):t("soon"))+"</span></a>"; }).join("")+"</div>";
    main.innerHTML = h; toc.innerHTML = ""; return;
  }
  var ps = pagesIn(sec);
  if(!ps.length) h += '<div class="empty">'+esc(t("none"))+"</div>";
  else { h += '<div class="grid">'; ps.forEach(function(p){ h += '<a class="card" href="#/page/'+p.id+'"><strong dir=auto>'+esc(p.title)+"</strong><br>"+(p.standard?'<span class="badge">'+esc(p.standard)+"</span>":"")+(S.read.indexOf(p.id)>=0?'<span class="badge ready">✓</span>':"")+"</a>"; }); h += "</div>"; }
  main.innerHTML = h; toc.innerHTML = "";
}
function viewStd(kind, slug){
  var e = D.standards.filter(function(x){ return x.kind===kind && stdSlug(x)===slug; })[0];
  if(!e){ main.innerHTML = '<div class="empty">404</div>'; toc.innerHTML = ""; return; }
  var qs = D.questions.filter(function(q){ return q.standard===e.id; });
  var h = '<h1 dir="auto">'+esc(e.id)+" — "+esc(e.name)+'</h1><div class="meta"><span class="badge planned">'+esc(t("soon"))+'</span></div>'+
    '<div class="card"><p dir="auto"><strong>'+esc(t("plannedMsg"))+'</strong></p><p dir="auto">'+esc(e.chapter)+'</p><p dir="auto"><strong>'+esc(t("kitQs"))+':</strong> '+esc(e.kit)+"</p></div>";
  main.innerHTML = h; toc.innerHTML = "";
}
var TAB = {id:"", tab:"explain"};
function viewPage(id){
  var p = pageById(id);
  if(!p){ main.innerHTML = '<div class="empty">404</div>'; toc.innerHTML=""; return; }
  if(TAB.id !== id){ TAB = {id:id, tab:"explain"}; }
  var ids = D.standards.filter(function(e){ return e.page===id; }).map(function(e){ return e.id; });
  var qs = D.questions.filter(function(q){ return ids.indexOf(q.standard)>=0; });
  var fcs = D.flashcards.filter(function(c){ return ids.indexOf(c.standard)>=0; });
  var order = allOrder(), idx = order.indexOf(p), prev = order[idx-1], next = order[idx+1];
  var h = '<div class="actions"><button class="btn'+(S.bookmarks.indexOf(id)>=0?" on":"")+'" id="bmBtn">'+esc(t(S.bookmarks.indexOf(id)>=0?"bmOn":"bm"))+'</button><button class="btn'+(S.read.indexOf(id)>=0?" on":"")+'" id="rdBtn">'+esc(t(S.read.indexOf(id)>=0?"marked":"mark"))+"</button></div>";
  h += '<div class="meta">'+[["standard",p.standard],["version",p.version],["effective",p.effective_date]].filter(function(x){return x[1];}).map(function(x){ return '<span class="badge" dir=auto>'+esc(x[0])+": "+esc(x[1])+"</span>"; }).join("")+"</div>";
  if(ids.length){
    h += '<div class="tabs" role="tablist">'+[["explain",t("tabExplain")],["q",t("tabQ")+" ("+qs.length+")"],["f",t("tabF")+" ("+fcs.length+")"]].map(function(x){ return '<button class="tab'+(TAB.tab===x[0]?" on":"")+'" data-tab="'+x[0]+'" role="tab">'+esc(x[1])+"</button>"; }).join("")+"</div>";
  }
  if(TAB.tab==="q" && ids.length){ h += '<div id="tabq">'+(qs.length?"":'<div class="empty">'+esc(t("noQ"))+"</div>")+"</div>"; }
  else if(TAB.tab==="f" && ids.length){ h += '<div id="tabf">'+(fcs.length?"":'<div class="empty">'+esc(t("noQ"))+"</div>")+"</div>"; }
  else {
    h += '<article class="md">'+renderMD(p.body)+"</article>";
    h += '<div class="pager">'+(prev?'<a href="#/page/'+prev.id+'"><small>'+esc(t("prev"))+'</small><span dir=auto>'+esc(shortTitle(prev))+"</span></a>":"<span></span>")+(next?'<a href="#/page/'+next.id+'"><small>'+esc(t("next"))+'</small><span dir=auto>'+esc(shortTitle(next))+"</span></a>":"<span></span>")+"</div>";
  }
  main.innerHTML = h;
  if(TAB.tab==="q" && qs.length) mountQuiz($("#tabq"), qs, false);
  if(TAB.tab==="f" && fcs.length) mountCards($("#tabf"), fcs, false);
  main.querySelectorAll(".tab").forEach(function(b2){ b2.onclick = function(){ TAB.tab = b2.dataset.tab; viewPage(id); watchToc(); window.scrollTo(0,0); }; });
  var hs = main.querySelectorAll("article h1, article h2, article h3");
  toc.innerHTML = hs.length ? "<h4>"+esc(t("toc"))+"</h4>"+Array.prototype.map.call(hs,function(e){ return '<a class="'+(e.tagName==="H3"?"l3":(e.tagName==="H1"?"l1":""))+'" href="#/page/'+id+'~'+e.id+'" data-h="'+e.id+'" dir=auto>'+esc(e.textContent)+"</a>"; }).join("") : "";
  $("#bmBtn").onclick = function(){ toggle(S.bookmarks,id); save("bookmarks",S.bookmarks); TAB.id = id; viewPage(id); };
  $("#rdBtn").onclick = function(){ toggle(S.read,id); save("read",S.read); viewPage(id); };
  document.title = p.title+" — IFRS Study";
}
function viewBookmarks(){
  var h = "<h1>"+esc(t("bookmarks"))+"</h1>";
  var ps = S.bookmarks.map(pageById).filter(Boolean);
  if(!ps.length) h += '<div class="empty">'+esc(t("none"))+"</div>";
  else { h += '<div class="grid">'+ps.map(function(p){ return '<a class="card" href="#/page/'+p.id+'"><strong dir=auto>'+esc(p.title)+"</strong></a>"; }).join("")+"</div>"; }
  main.innerHTML = h; toc.innerHTML = "";
}
function viewBlocks(key, list, intro){
  var h = "<h1>"+esc(t(key))+"</h1><p dir=auto>"+esc(t(intro))+"</p>";
  if(!list.length) h += '<div class="empty">'+esc(t("none"))+"</div>";
  list.forEach(function(x){ h += '<div class="card" style="margin:12px 0"><div class="meta"><a href="#/page/'+x.page+'" dir=auto>'+esc(t("fromPage"))+": "+esc(x.title)+'</a></div><div class="md">'+renderMD("### "+x.heading+"\n\n"+x.text)+"</div></div>"; });
  main.innerHTML = h; toc.innerHTML = "";
}

/* quiz + cards engines (mountable) */
function stdOptions(items){ var m = {}; items.forEach(function(x){ m[x.standard]=1; }); return Object.keys(m).sort(); }
function shuffle(a){ a = a.slice(); for(var k=a.length-1;k>0;k--){ var j=Math.floor(Math.random()*(k+1)), x=a[k]; a[k]=a[j]; a[j]=x; } return a; }
function mountQuiz(root, base, withFilters){
  var st = {pool:[], i:0, right:0};
  var h = "";
  if(withFilters){
    h += '<div class="filters"><select class="fStd"><option value="">'+esc(t("std"))+": "+esc(t("all"))+"</option>"+stdOptions(base).map(function(x){return "<option>"+esc(x)+"</option>";}).join("")+'</select><select class="fDiff"><option value="">'+esc(t("diff"))+": "+esc(t("all"))+'</option><option value="easy">'+esc(t("easy"))+'</option><option value="medium">'+esc(t("medium"))+'</option><option value="hard">'+esc(t("hard"))+'</option></select><button class="btn primary goQ">'+esc(t("start"))+"</button></div>";
  } else {
    h += '<div class="filters"><select class="fDiff"><option value="">'+esc(t("diff"))+": "+esc(t("all"))+'</option><option value="easy">'+esc(t("easy"))+'</option><option value="medium">'+esc(t("medium"))+'</option><option value="hard">'+esc(t("hard"))+'</option></select><button class="btn primary goQ">'+esc(t("start"))+"</button></div>";
  }
  root.innerHTML = h + '<div class="qbox"></div>';
  var box = root.querySelector(".qbox");
  function start(){
    var sEl = root.querySelector(".fStd"), s0 = sEl ? sEl.value : "", d = root.querySelector(".fDiff").value;
    st.pool = shuffle(base.filter(function(q){ return (!s0||q.standard===s0) && (!d||q.difficulty===d); })); st.i = 0; st.right = 0; show();
  }
  function show(){
    if(!st.pool.length){ box.innerHTML = '<div class="empty">'+esc(t("none"))+"</div>"; return; }
    if(st.i >= st.pool.length){ box.innerHTML = '<div class="card"><h2 style="margin-top:0">'+esc(t("score"))+": "+st.right+" / "+st.pool.length+'</h2><button class="btn primary again">'+esc(t("restart"))+"</button></div>"; box.querySelector(".again").onclick = start; return; }
    var q = st.pool[st.i], L = ["A","B","C","D"];
    var h = '<div class="card"><div class="meta"><span class="badge">'+(st.i+1)+"/"+st.pool.length+'</span><span class="badge" dir="auto">'+esc(q.standard)+'</span><span class="badge">'+esc(t(q.difficulty))+"</span>"+(q.topic?'<span class="badge" dir="auto">'+esc(q.topic)+"</span>":"")+'</div><p dir="auto" style="font-size:1.08rem">'+inline(q.question)+"</p>";
    q.options.forEach(function(o,k){ h += '<button class="opt" data-k="'+k+'" dir="auto"><strong>'+L[k]+".</strong> "+inline(o)+"</button>"; });
    box.innerHTML = h + '<div class="fb"></div></div>';
    box.querySelectorAll(".opt").forEach(function(btn){ btn.onclick = function(){
      var k = +btn.dataset.k, ok = k===q.answer;
      box.querySelectorAll(".opt").forEach(function(x){ x.disabled = true; if(+x.dataset.k===q.answer) x.classList.add("right"); });
      if(!ok) btn.classList.add("wrong");
      S.qstat[q.id] = ok; save("qstat",S.qstat); if(ok) st.right++;
      var why = ""; q.why_wrong.forEach(function(w,j){ if(w) why += "<li dir=auto><strong>"+L[j]+".</strong> "+inline(w)+"</li>"; });
      box.querySelector(".fb").innerHTML = '<div class="explain"><strong>'+esc(t(ok?"correct":"incorrect"))+"</strong><p dir=auto>"+inline(q.explanation)+"</p><strong>"+esc(t("why"))+"</strong><ul>"+why+"</ul><small dir=auto>"+esc(t("source"))+": "+esc(q.source)+'</small></div><div class="actions"><button class="btn primary nq">'+esc(t("nextQ"))+"</button></div>";
      box.querySelector(".nq").onclick = function(){ st.i++; show(); };
    }; });
  }
  root.querySelector(".goQ").onclick = start; start();
}
function mountCards(root, base, withFilters){
  var st = {pool:[], i:0, flip:false};
  var h = '<div class="filters">'+(withFilters?'<select class="fcStd"><option value="">'+esc(t("std"))+": "+esc(t("all"))+"</option>"+stdOptions(base).map(function(x){return "<option>"+esc(x)+"</option>";}).join("")+"</select>":"")+'<select class="fcMode"><option value="all">'+esc(t("all"))+'</option><option value="todo">'+esc(t("again"))+"</option></select></div>";
  root.innerHTML = h + '<div class="fbox"></div>';
  var box = root.querySelector(".fbox");
  function build(){ var sEl = root.querySelector(".fcStd"), s0 = sEl ? sEl.value : "", m = root.querySelector(".fcMode").value;
    st.pool = base.filter(function(c){ return (!s0||c.standard===s0) && (m==="all" || S.fc[c.id]!=="know"); }); st.i = 0; st.flip = false; draw(); }
  function draw(){
    if(!st.pool.length){ box.innerHTML = '<div class="empty">'+esc(t("none"))+"</div>"; return; }
    if(st.i >= st.pool.length) st.i = 0;
    var c = st.pool[st.i];
    box.innerHTML = '<div class="meta"><span class="badge">'+(st.i+1)+"/"+st.pool.length+'</span><span class="badge" dir="auto">'+esc(c.standard)+"</span></div>"+
     '<div class="card flash" dir="auto"><div>'+(st.flip?"<strong>"+esc(t("back"))+"</strong><br>"+inline(c.a)+"<small>"+esc(t("source"))+": "+esc(c.source)+"</small>":"<strong>"+esc(t("front"))+"</strong><br>"+inline(c.q)+"<small>"+esc(t("tapFlip"))+"</small>")+"</div></div>"+
     '<div class="actions"><button class="btn fK">'+esc(t("know"))+'</button><button class="btn fA">'+esc(t("again"))+'</button><button class="btn fN">'+esc(t("next"))+"</button></div>";
    box.querySelector(".flash").onclick = function(){ st.flip = !st.flip; draw(); };
    box.querySelector(".fK").onclick = function(){ S.fc[c.id]="know"; save("fc",S.fc); st.i++; st.flip=false; draw(); };
    box.querySelector(".fA").onclick = function(){ S.fc[c.id]="again"; save("fc",S.fc); st.i++; st.flip=false; draw(); };
    box.querySelector(".fN").onclick = function(){ st.i++; st.flip=false; draw(); };
  }
  var e1 = root.querySelector(".fcStd"); if(e1) e1.onchange = build; root.querySelector(".fcMode").onchange = build; build();
}
function viewPractice(){
  toc.innerHTML = "";
  if(!D.questions.length){ main.innerHTML = "<h1>"+esc(t("practice"))+'</h1><div class="empty">'+esc(t("none"))+"</div>"; return; }
  main.innerHTML = "<h1>"+esc(t("practice"))+'</h1><div id="qroot"></div>'; mountQuiz($("#qroot"), D.questions, true);
}
function viewFlash(){
  toc.innerHTML = "";
  if(!D.flashcards.length){ main.innerHTML = "<h1>"+esc(t("flashcards"))+'</h1><div class="empty">'+esc(t("none"))+"</div>"; return; }
  main.innerHTML = "<h1>"+esc(t("flashcards"))+'</h1><div id="froot"></div>'; mountCards($("#froot"), D.flashcards, true);
}

/* ---------- search ---------- */
var INDEX = null;
function buildIndex(){
  INDEX = [];
  D.pages.forEach(function(p){ INDEX.push({url:"#/page/"+p.id, title:p.title, kind:t(p.section), text:(p.title+" "+p.standard+" "+p.body).toLowerCase(), raw:p.body}); });
  D.questions.forEach(function(q){ INDEX.push({url:"#/practice", title:q.question.slice(0,80), kind:t("practice"), text:(q.question+" "+q.options.join(" ")+" "+q.explanation).toLowerCase(), raw:q.explanation}); });
  D.flashcards.forEach(function(c){ INDEX.push({url:"#/flashcards", title:c.q.slice(0,80), kind:t("flashcards"), text:(c.q+" "+c.a).toLowerCase(), raw:c.a}); });
}
function doSearch(q){
  var box = $("#searchResults"); q = q.trim().toLowerCase();
  if(q.length<2){ box.hidden = true; return; }
  if(!INDEX) buildIndex();
  var words = q.split(/\s+/), res = [];
  INDEX.forEach(function(e){
    var sc = 0; for(var i=0;i<words.length;i++){ var at = e.text.indexOf(words[i]); if(at<0){ sc=-1; break; } sc += 1 + (e.title.toLowerCase().indexOf(words[i])>=0 ? 5 : 0); }
    if(sc>0){ var pos = e.raw.toLowerCase().indexOf(words[0]); var sn = pos>=0 ? e.raw.slice(Math.max(0,pos-40),pos+90).replace(/[#*|`>\n]+/g," ") : ""; res.push({e:e,s:sc,sn:sn}); }
  });
  res.sort(function(a,b){ return b.s-a.s; });
  box.innerHTML = res.length ? res.slice(0,12).map(function(r){ return '<a href="'+r.e.url+'" dir=auto>'+esc(r.e.title)+"<small>"+esc(r.e.kind)+(r.sn?" · …"+esc(r.sn)+"…":"")+"</small></a>"; }).join("") : '<div class="empty">'+esc(t("noResults"))+"</div>";
  box.hidden = false;
}

/* ---------- router ---------- */
function parse(){
  var h = location.hash.replace(/^#\/?/,"") || "home", anchor = "";
  if(h.indexOf("~")>0){ anchor = h.split("~")[1]; h = h.split("~")[0]; }
  if(h.indexOf("std/")===0){ var sp = h.split("/"); return {key:sp[1], page:null, std:sp[1]+"/"+sp[2], kind:sp[1], anchor:""}; }
  if(h.indexOf("page/")===0) return {key:null, page:h.slice(5), anchor:anchor, sec:(h.slice(5).split("/")[0])};
  return {key:h, page:null, anchor:anchor};
}
function route(){
  var r = parse();
  if(r.page){ r.key = r.sec; }
  applyShell(); renderSidebar(r);
  $("#sidebar").classList.remove("open"); $("#scrim").hidden = true;
  if(r.page) viewPage(r.page);
  else if(r.std) viewStd(r.kind, r.std.split("/")[1]);
  else if(r.key==="home") viewHome();
  else if(SECTION_PAGES.indexOf(r.key)>=0) viewList(r.key);
  else if(r.key==="practice") viewPractice();
  else if(r.key==="flashcards") viewFlash();
  else if(r.key==="traps") viewBlocks("traps", D.traps, "trapsIntro");
  else if(r.key==="bookmarks") viewBookmarks();
  else viewHome();
  if(r.page && r.anchor){ var el = document.getElementById(r.anchor); if(el) el.scrollIntoView(); } else if(!r.anchor) window.scrollTo(0,0);
  if(r.key==="rapid-review" && !r.page) { /* list view already shows pages */ }
  watchToc();
}
function watchToc(){
  var links = toc.querySelectorAll("a[data-h]"); if(!links.length) return;
  var onScroll = function(){
    var cur = null;
    links.forEach(function(a){ var e = document.getElementById(a.dataset.h); if(e && e.getBoundingClientRect().top < 120) cur = a; });
    links.forEach(function(a){ a.classList.toggle("on", a===cur); });
  };
  window.onscroll = onScroll; onScroll();
}
window.addEventListener("hashchange", route);
$("#langBtn").onclick = function(){ S.lang = S.lang==="ar"?"en":"ar"; save("lang",S.lang); INDEX = null; route(); };
$("#themeBtn").onclick = function(){
  var dark = S.theme==="dark" || (!S.theme && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  S.theme = dark ? "light" : "dark"; save("theme",S.theme); applyShell();
};
$("#menuBtn").onclick = function(){
  if(window.innerWidth > 760){ document.body.classList.toggle("nomenu"); try{ localStorage.setItem("ifrs.nomenu", document.body.classList.contains("nomenu")?"1":""); }catch(e){} return; }
  var o = sidebar.classList.toggle("open"); $("#scrim").hidden = !o;
};
try{ if(localStorage.getItem("ifrs.nomenu")) document.body.classList.add("nomenu"); }catch(e){}
$("#scrim").onclick = function(){ sidebar.classList.remove("open"); $("#scrim").hidden = true; };
$("#search").addEventListener("input", function(e){ doSearch(e.target.value); });
document.addEventListener("click", function(e){ if(!e.target.closest(".search-wrap")) $("#searchResults").hidden = true; else if(e.target.closest("#searchResults a")){ $("#searchResults").hidden = true; $("#search").value=""; } });
route();
})();
