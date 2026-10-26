/* IFRS Play — short Duolingo-style lessons built from learn/*.json and questions/*.json (see site/build.py). */
(function(){
"use strict";
var UNITS = (window.PLAY_DATA || {units: []}).units;
var COLORS = [["#2ec27e","#22985f"],["#1cb0f6","#1899d6"],["#ce82ff","#a568cc"],["#ff9600","#cc7800"],["#ff4b4b","#d93a3a"],["#00cd9c","#00a47d"],["#2b70c9","#1f569c"]];
var MAX_HEARTS = 5, REFILL_MIN = 30, PER_LESSON = 9;
var app = document.getElementById("app");

/* ---------- state ---------- */
var KEY = "ifrsplay-v1";
var S = load();
function fresh(){ return {xp:0, hearts:MAX_HEARTS, heartAt:Date.now(), streak:0, lastDay:"", days:{}, goal:20, prog:{}, mistakes:[], sound:true,
  seen:{}, lessons:0, perfect:0, correct:0, answered:0, words:{}, theme:"", tab:"learn"}; }
function load(){ var s = fresh(); try{ var raw = JSON.parse(localStorage.getItem(KEY) || "null"); if(raw) for(var k in raw) s[k] = raw[k]; }catch(e){} return s; }
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }
function today(d){ d = d || new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function yesterday(){ var d = new Date(); d.setDate(d.getDate()-1); return today(d); }
function refill(){
  if(S.hearts >= MAX_HEARTS){ S.heartAt = Date.now(); return; }
  var n = Math.floor((Date.now() - S.heartAt) / (REFILL_MIN*60000));
  if(n > 0){ S.hearts = Math.min(MAX_HEARTS, S.hearts + n); S.heartAt += n*REFILL_MIN*60000; save(); }
}
function streakNow(){ return (S.lastDay === today() || S.lastDay === yesterday()) ? S.streak : 0; }
function applyTheme(){ if(S.theme) document.documentElement.setAttribute("data-theme", S.theme); else document.documentElement.removeAttribute("data-theme"); }

/* ---------- helpers ---------- */
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
function md(s){ return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"); }
function rng(seed){ var x = 0; for(var i=0;i<seed.length;i++) x = (x*31 + seed.charCodeAt(i)) | 0; return function(){ x = (x*1103515245 + 12345) & 0x7fffffff; return x/0x7fffffff; }; }
function shuffle(a, r){ a = a.slice(); r = r || Math.random; for(var i=a.length-1;i>0;i--){ var j = Math.floor(r()*(i+1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function $(s, el){ return (el || document).querySelector(s); }
function $$(s, el){ return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
function toast(msg){ var t = document.createElement("div"); t.className = "toast"; t.textContent = msg; document.body.appendChild(t); setTimeout(function(){ t.remove(); }, 2200); }
function color(ui){ return COLORS[ui % COLORS.length]; }

/* ---------- sound ---------- */
var AC = null;
function tone(freqs, dur, type){
  if(!S.sound) return;
  try{
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if(AC.state === "suspended") AC.resume();
    freqs.forEach(function(f, i){
      var o = AC.createOscillator(), g = AC.createGain(), t0 = AC.currentTime + i*dur*0.8;
      o.type = type || "sine"; o.frequency.value = f; o.connect(g); g.connect(AC.destination);
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.18, t0+0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0+dur);
      o.start(t0); o.stop(t0+dur+0.05);
    });
  }catch(e){}
}
var sfx = { ok:function(){ tone([660,880],0.13); }, bad:function(){ tone([220,180],0.18,"square"); }, win:function(){ tone([523,659,784,1047],0.16,"triangle"); }, tap:function(){ tone([520],0.05); } };

/* ---------- exercises ---------- */
function unitExercises(u){
  var out = [], ui = UNITS.indexOf(u);
  u.pairs.forEach(function(p, i){ out.push({t:"word", u:ui, key:u.standard+"|w"+i, p:p, rev:i%2===1, lvl:0}); });
  for(var i=0;i<u.pairs.length;i+=4) out.push({t:"match", u:ui, key:u.standard+"|m"+i, pairs:u.pairs.slice(i, i+4), lvl:0.5});
  u.tf.forEach(function(x, i){ out.push({t:"tf", u:ui, key:u.standard+"|t"+i, x:x, lvl:1}); });
  u.fill.forEach(function(x, i){ out.push({t:"fill", u:ui, key:u.standard+"|f"+i, x:x, lvl:1.5}); });
  u.mcq.forEach(function(q){ out.push({t:"mcq", u:ui, key:q.id, q:q, lvl:{easy:2, medium:3, hard:4}[q.difficulty] || 3}); });
  return out;
}
var LESSONS = UNITS.map(function(u){
  var all = unitExercises(u).sort(function(a, b){ return a.lvl - b.lvl; });
  var n = Math.max(3, Math.min(6, Math.ceil(all.length / PER_LESSON))), size = Math.ceil(all.length / n), ls = [];
  for(var i=0;i<n;i++) ls.push(shuffle(all.slice(i*size, (i+1)*size), rng(u.standard+i)));
  return {all:all, lessons:ls.filter(function(l){ return l.length; })};
});
function findEx(key){ for(var i=0;i<LESSONS.length;i++) for(var j=0;j<LESSONS[i].all.length;j++) if(LESSONS[i].all[j].key === key) return LESSONS[i].all[j]; return null; }
function nodeCount(ui){ return LESSONS[ui].lessons.length + 1; } /* + unit review */
function done(ui){ return S.prog[UNITS[ui].standard] || 0; }
function unitDone(ui){ return done(ui) >= nodeCount(ui); }
function unitOpen(ui){ return ui === 0 || unitDone(ui-1); }

/* ---------- top bar & nav ---------- */
function topBar(){
  refill();
  var st = streakNow();
  return '<div class="top"><span class="brand">IFRS Play</span>'+
    '<span class="stat fire'+(S.lastDay===today()?"":" off")+'">🔥 '+st+'</span>'+
    '<span class="stat xp">⚡ '+S.xp+'</span>'+
    '<button class="stat heart" id="heartBtn">❤️ '+S.hearts+'</button></div>';
}
function nav(){
  var tabs = [["learn","🏠","تعلّم"],["practice","🏋️","تدريب"],["words","📖","مصطلحات"],["profile","👤","حسابي"]];
  return '<nav class="nav"><div>'+tabs.map(function(t){ return '<button data-tab="'+t[0]+'" class="'+(S.tab===t[0]?"on":"")+'"><b>'+t[1]+"</b>"+t[2]+"</button>"; }).join("")+
    '<a href="../" title="المرجع"><b>📚</b>المرجع</a></div></nav>';
}
function bindShell(){
  $$(".nav [data-tab]").forEach(function(b){ b.onclick = function(){ S.tab = b.dataset.tab; save(); home(); window.scrollTo(0,0); }; });
  var hb = $("#heartBtn"); if(hb) hb.onclick = heartsSheet;
}
function heartsSheet(){
  refill();
  var mins = S.hearts >= MAX_HEARTS ? 0 : Math.max(1, Math.ceil((S.heartAt + REFILL_MIN*60000 - Date.now())/60000));
  sheet('<h2>❤️ القلوب: '+S.hearts+' / '+MAX_HEARTS+'</h2><p class="muted">كل غلطة في الدرس بتاخد قلب. القلب بيرجع كل '+REFILL_MIN+' دقيقة'+(mins?' (القلب الجاي بعد '+mins+' دقيقة)':'')+'، أو اكسب قلب بالتدريب.</p>'+
    '<button class="btn blue" id="shPractice">🏋️ تدرّب واكسب قلب</button><button class="btn ghost" id="shClose">تمام</button>', function(bg){
    $("#shPractice", bg).onclick = function(){ bg.remove(); startPractice("mix"); };
  });
}
function sheet(html, bind){
  var bg = document.createElement("div"); bg.className = "sheet-bg"; bg.innerHTML = '<div class="sheet">'+html+"</div>";
  bg.onclick = function(e){ if(e.target === bg) bg.remove(); };
  document.body.appendChild(bg);
  var c = $("#shClose", bg); if(c) c.onclick = function(){ bg.remove(); };
  if(bind) bind(bg);
}

/* ---------- home tabs ---------- */
function home(){
  applyTheme();
  var body = {learn:viewPath, practice:viewPractice, words:viewWords, profile:viewProfile}[S.tab] || viewPath;
  app.innerHTML = topBar() + '<div class="scroll">'+body()+"</div>" + nav();
  bindShell();
  if(S.tab === "learn") bindPath(); else if(S.tab === "practice") bindPractice(); else if(S.tab === "profile") bindProfile(); else if(S.tab === "words") bindWords();
}

function viewPath(){
  var h = "", curFound = false;
  UNITS.forEach(function(u, ui){
    var c = color(ui), open = unitOpen(ui), n = nodeCount(ui), d = done(ui);
    h += '<div class="unit-head'+(open?"":" locked")+'" style="background:'+c[0]+';box-shadow:0 4px 0 '+c[1]+'">'+
      '<div><small>الوحدة '+(ui+1)+' · <span class="ltr">'+esc(u.standard+(u.also.length?" / "+u.also.join(" / "):""))+'</span></small><h2>'+u.icon+" "+esc(u.title_ar)+"</h2></div>"+
      '<button class="guide" data-guide="'+ui+'">📘 الدليل</button></div>';
    if(!open) h += '<button class="jump" data-jump="'+ui+'">⏩ اختبار القفز لهذه الوحدة</button>';
    h += '<div class="path">';
    for(var k=0;k<n;k++){
      var isReview = k === n-1, state = !open || k > d ? "locked" : (k < d ? "done" : "current");
      if(state === "current"){ if(curFound) state = "locked"; else curFound = true; }
      var x = Math.round(Math.sin(k*1.15) * 70);
      var icon = state === "done" ? (isReview ? "🏆" : "✓") : (isReview ? "🏆" : (state === "locked" ? "🔒" : "★"));
      h += '<div class="node-wrap" style="transform:translateX('+x+'px)">'+
        (state === "current" ? '<div class="bubble" style="--c:'+c[0]+'">'+(d===0&&ui===0?"ابدأ":(isReview?"مراجعة":"ابدأ"))+"</div>" : "")+
        '<button class="node '+state+'" style="--c:'+c[0]+';--cd:'+c[1]+'" data-u="'+ui+'" data-k="'+k+'" aria-label="'+(isReview?"مراجعة الوحدة":"درس "+(k+1))+'">'+icon+"</button>"+
        (k === 1 ? '<span class="mascot" style="'+(x>0?"left":"right")+':-110px">'+(ui%2?"🧮":"📊")+"</span>" : "")+
        "</div>";
    }
    h += "</div>";
  });
  h += '<p class="foot-note">المحتوى للتعلم والمراجعة، راجع النص الرسمي للمعيار في القرارات المهمة.</p>';
  return h;
}
function bindPath(){
  $$(".node").forEach(function(b){ b.onclick = function(){
    var ui = +b.dataset.u, k = +b.dataset.k;
    if(b.classList.contains("locked")){ toast(unitOpen(ui) ? "خلّص الدرس اللي قبله الأول 🔒" : "خلّص الوحدة اللي قبلها أو اعمل اختبار القفز"); return; }
    lessonSheet(ui, k);
  }; });
  $$("[data-guide]").forEach(function(b){ b.onclick = function(){ guide(+b.dataset.guide); }; });
  $$("[data-jump]").forEach(function(b){ b.onclick = function(){
    var ui = +b.dataset.jump;
    sheet("<h2>⏩ اختبار القفز</h2><p class='muted'>جاوب على 10 أسئلة من وحدة "+esc(UNITS[ui].title_ar)+" بـ 3 قلوب. لو نجحت، هتفتح الوحدة دي وكل اللي قبلها.</p><button class='btn' id='goJump'>ابدأ الاختبار</button><button class='btn ghost' id='shClose'>مش دلوقتي</button>", function(bg){
      $("#goJump", bg).onclick = function(){ bg.remove(); startLesson({mode:"jump", ui:ui, items:shuffle(LESSONS[ui].all).slice(0, 10), hearts:3}); };
    });
  }; });
  var cur = $(".node.current"); if(cur && S.tab === "learn") setTimeout(function(){ cur.scrollIntoView({block:"center"}); }, 30);
}
function guide(ui){
  var u = UNITS[ui];
  sheet("<h2>"+u.icon+" "+esc(u.title_ar)+'</h2><p class="muted ltr">'+esc(u.standard)+" — "+esc(u.title)+'</p><div class="tips">'+u.intro.map(function(t){ return '<div class="card">'+md(t)+"</div>"; }).join("")+
    '</div><h3>المصطلحات</h3><div class="card">'+u.pairs.map(function(p){ return '<div class="switch"><span class="ltr">'+esc(p.en)+"</span><span>"+esc(p.ar)+"</span></div>"; }).join("")+
    '</div><button class="btn ghost" id="shClose">تمام</button>');
}
function lessonSheet(ui, k){
  var u = UNITS[ui], n = nodeCount(ui), isReview = k === n-1, again = k < done(ui);
  refill();
  sheet("<h2>"+u.icon+" "+(isReview ? "مراجعة الوحدة 🏆" : "الدرس "+(k+1)+" من "+(n-1))+'</h2><p class="muted">'+esc(u.title_ar)+' · <span class="ltr">'+esc(u.standard)+"</span>"+(again?" · إعادة للتقوية":"")+"</p>"+
    (S.hearts > 0 ? '<button class="btn" id="goL">ابدأ +'+(isReview?15:10)+' XP</button>' : '<p>❤️ خلصت القلوب. تدرّب عشان تكسب قلب أو استنى شوية.</p><button class="btn blue" id="goP">🏋️ تدرّب واكسب قلب</button>')+
    '<button class="btn ghost" id="shGuide">📘 الدليل</button>', function(bg){
    var g = $("#goL", bg); if(g) g.onclick = function(){
      bg.remove();
      var items = isReview ? shuffle(LESSONS[ui].all).slice(0, 10) : LESSONS[ui].lessons[k];
      var o = {mode:isReview?"review":"lesson", ui:ui, k:k, items:items};
      if(!isReview && k === 0 && !S.seen[u.standard]) tipsScreen(ui, function(){ S.seen[u.standard] = 1; save(); startLesson(o); });
      else startLesson(o);
    };
    var p = $("#goP", bg); if(p) p.onclick = function(){ bg.remove(); startPractice("mix"); };
    $("#shGuide", bg).onclick = function(){ bg.remove(); guide(ui); };
  });
}
function tipsScreen(ui, next){
  var u = UNITS[ui];
  app.innerHTML = '<div class="lesson"><div class="lbar"><button class="x" id="x">✕</button><div class="prog"><i style="width:0"></i></div></div>'+
    '<div class="lbody"><div class="tag">قبل ما تبدأ</div><div class="kind">'+u.icon+" "+esc(u.title_ar)+'</div><div class="tips">'+u.intro.map(function(t){ return '<div class="card">'+md(t)+"</div>"; }).join("")+
    '</div></div><div class="lfoot"><button class="btn" id="go">يلا نبدأ</button></div></div>';
  $("#x").onclick = home; $("#go").onclick = next;
}

function practicePool(){ var a = []; UNITS.forEach(function(u, ui){ if(unitOpen(ui) && (done(ui) > 0 || ui === 0)) a = a.concat(LESSONS[ui].all); }); return a; }
function viewPractice(){
  var m = S.mistakes.length;
  return "<h1>🏋️ تدريب</h1><p class='muted'>التدريب مش بياخد قلوب، وكل تدريب بيكسبك قلب ❤️ و5 XP.</p>"+
    '<button class="card row" style="width:100%" data-p="mistakes"><span class="ic">🎯</span><span style="flex:1;text-align:start"><b>تدريب الأخطاء</b><small>'+(m?m+" سؤال غلطت فيهم قبل كده":"مفيش أخطاء محفوظة لسه 👏")+"</small></span></button>"+
    '<button class="card row" style="width:100%" data-p="mix"><span class="ic">⚡</span><span style="flex:1;text-align:start"><b>تدريب سريع</b><small>10 أسئلة عشوائية من الوحدات المفتوحة</small></span></button>'+
    '<button class="card row" style="width:100%" data-p="words"><span class="ic">🔤</span><span style="flex:1;text-align:start"><b>توصيل المصطلحات</b><small>إنجليزي ↔ عربي</small></span></button>'+
    '<button class="card row" style="width:100%" data-p="hard"><span class="ic">🧠</span><span style="flex:1;text-align:start"><b>أسئلة امتحان</b><small>اختيار من متعدد فقط (متوسط وصعب)</small></span></button>';
}
function bindPractice(){ $$("[data-p]").forEach(function(b){ b.onclick = function(){ startPractice(b.dataset.p); }; }); }
function startPractice(kind){
  var pool = practicePool(), items;
  if(kind === "mistakes"){ items = S.mistakes.map(findEx).filter(Boolean); if(!items.length){ toast("مفيش أخطاء محفوظة 👏"); return; } items = shuffle(items).slice(0, 12); }
  else if(kind === "words"){ items = shuffle(pool.filter(function(e){ return e.t === "match" || e.t === "word"; })).slice(0, 8); }
  else if(kind === "hard"){ items = shuffle(pool.filter(function(e){ return e.t === "mcq" && e.lvl >= 3; })).slice(0, 8); if(items.length < 3) items = shuffle(pool.filter(function(e){ return e.t === "mcq"; })).slice(0, 8); }
  else items = shuffle(pool).slice(0, 10);
  if(!items.length){ toast("افتح وحدة الأول"); return; }
  startLesson({mode:"practice", kind:kind, items:items});
}

function viewWords(){
  var h = "<h1>📖 المصطلحات</h1><p class='muted'>كل المصطلحات بالإنجليزي والعربي. ✓ = اتعلمته في الدروس.</p>";
  UNITS.forEach(function(u){
    h += '<div class="card"><b>'+u.icon+" "+esc(u.title_ar)+' <span class="muted ltr">'+esc(u.standard)+"</span></b>"+
      u.pairs.map(function(p){ return '<div class="switch"><span class="ltr">'+(S.words[p.en]?"✓ ":"")+esc(p.en)+"</span><span>"+esc(p.ar)+"</span></div>"; }).join("")+"</div>";
  });
  return h;
}
function bindWords(){}

var BADGES = [
  ["🌱","أول درس",function(){ return S.lessons >= 1; }],
  ["🔥","3 أيام ورا بعض",function(){ return S.best >= 3 || streakNow() >= 3; }],
  ["🗓️","7 أيام ورا بعض",function(){ return S.best >= 7 || streakNow() >= 7; }],
  ["⚡","100 XP",function(){ return S.xp >= 100; }],
  ["💎","500 XP",function(){ return S.xp >= 500; }],
  ["🎯","5 دروس بدون غلط",function(){ return S.perfect >= 5; }],
  ["🏆","خلصت وحدة",function(){ return UNITS.some(function(u, i){ return unitDone(i); }); }],
  ["📚","50 مصطلح",function(){ return Object.keys(S.words).length >= 50; }],
  ["👑","خلصت كل الوحدات",function(){ return UNITS.length && UNITS.every(function(u, i){ return unitDone(i); }); }]
];
function viewProfile(){
  var dx = S.days[today()] || 0, units = UNITS.filter(function(u, i){ return unitDone(i); }).length;
  var acc = S.answered ? Math.round(100*S.correct/S.answered) : 0;
  return "<h1>👤 حسابي</h1>"+
    '<div class="card"><div class="row" style="justify-content:space-between"><b>🎯 هدف اليوم</b><span class="muted ltr">'+Math.min(dx, S.goal)+" / "+S.goal+' XP</span></div><div class="meter" style="margin-top:8px"><i style="width:'+Math.min(100, Math.round(100*dx/S.goal))+'%"></i></div>'+
    '<div class="goal" style="margin-top:12px">'+[[10,"خفيف"],[20,"عادي"],[30,"جاد"],[50,"مكثف"]].map(function(g){ return '<button data-goal="'+g[0]+'" class="'+(S.goal===g[0]?"on":"")+'">'+g[1]+"<br><small>"+g[0]+" XP</small></button>"; }).join("")+"</div></div>"+
    '<div class="grid2"><div class="card"><b>🔥 '+streakNow()+'</b>يوم متواصل</div><div class="card"><b>⚡ '+S.xp+'</b>إجمالي XP</div><div class="card"><b>📘 '+S.lessons+'</b>درس</div><div class="card"><b>🏆 '+units+" / "+UNITS.length+'</b>وحدة</div>'+
    '<div class="card"><b>🔤 '+Object.keys(S.words).length+'</b>مصطلح</div><div class="card"><b>✅ '+acc+'%</b>دقة الإجابات</div></div>'+
    "<h2>🏅 الإنجازات</h2><div>"+BADGES.map(function(b){ return '<span class="badge'+(b[2]()?"":" off")+'"><b>'+b[0]+"</b>"+b[1]+"</span>"; }).join("")+"</div>"+
    '<h2>⚙️ الإعدادات</h2><div class="card">'+
    '<div class="switch"><span>🔊 الصوت</span><button id="sndBtn">'+(S.sound?"شغال":"مقفول")+"</button></div>"+
    '<div class="switch"><span>🌓 المظهر</span><button id="thBtn">'+({"":"تلقائي","light":"فاتح","dark":"غامق"}[S.theme])+"</button></div>"+
    '<div class="switch"><span>🗑️ مسح التقدم</span><button id="rstBtn" style="color:var(--red)">مسح</button></div></div>'+
    '<p class="foot-note">التقدم محفوظ على الجهاز ده بس (في المتصفح).</p>';
}
function bindProfile(){
  $$("[data-goal]").forEach(function(b){ b.onclick = function(){ S.goal = +b.dataset.goal; save(); home(); }; });
  $("#sndBtn").onclick = function(){ S.sound = !S.sound; save(); home(); sfx.tap(); };
  $("#thBtn").onclick = function(){ S.theme = {"":"light","light":"dark","dark":""}[S.theme]; save(); home(); };
  $("#rstBtn").onclick = function(){ if(confirm("متأكد إنك عايز تمسح كل التقدم؟")){ S = fresh(); save(); home(); } };
}

/* ---------- lesson engine ---------- */
var L = null;
function startLesson(o){
  refill();
  L = {o:o, queue:o.items.slice(), total:o.items.length, okCount:0, mistakes:0, retried:{}, start:Date.now(),
       practice:o.mode === "practice", hearts:o.hearts || null};
  if(!L.practice && !L.hearts && S.hearts <= 0){ heartsSheet(); return; }
  nextEx();
}
function heartsLeft(){ return L.practice ? Infinity : (L.hearts != null ? L.hearts : S.hearts); }
function lessonShell(inner, footer){
  var pct = Math.round(100*L.okCount/L.total), hl = heartsLeft();
  app.innerHTML = '<div class="lesson"><div class="lbar"><button class="x" id="quit" aria-label="خروج">✕</button><div class="prog"><i style="width:'+pct+'%"></i></div>'+
    '<span class="stat heart">'+(hl === Infinity ? "♾️" : "❤️ "+hl)+'</span></div><div class="lbody">'+inner+'</div><div class="lfoot" id="foot">'+footer+"</div></div>";
  $("#quit").onclick = function(){ if(confirm("لو خرجت دلوقتي هتضيع نتيجة الدرس ده.")){ L = null; home(); } };
}
function nextEx(){
  if(!L.queue.length) return finish();
  var ex = L.queue[0];
  ({word:exWord, match:exMatch, tf:exTF, fill:exFill, mcq:exMCQ})[ex.t](ex);
}
function checkFooter(){ return '<button class="btn" id="check" disabled>تحقق</button>'; }

function answered(ex, ok, correctHtml, explain){
  S.answered++; if(ok) S.correct++;
  var foot = $("#foot");
  if(ok){
    sfx.ok(); L.okCount++; L.queue.shift();
    var mi = S.mistakes.indexOf(ex.key); if(mi >= 0 && L.practice) S.mistakes.splice(mi, 1);
    var cheers = ["أحسنت! 🎉","ممتاز! 👏","برافو! ✨","صح كده! 💪","رائع! 🌟"];
    foot.className = "lfoot ok";
    foot.innerHTML = "<h3>"+cheers[Math.floor(Math.random()*cheers.length)]+"</h3>"+(explain?'<p dir="auto">'+explain+"</p>":"")+'<button class="btn" id="cont">متابعة</button>';
  }else{
    sfx.bad(); L.mistakes++;
    if(S.mistakes.indexOf(ex.key) < 0) S.mistakes.push(ex.key);
    if(!L.practice){ if(L.hearts != null) L.hearts--; else { if(S.hearts >= MAX_HEARTS) S.heartAt = Date.now(); S.hearts = Math.max(0, S.hearts-1); } }
    L.queue.shift(); L.queue.push(ex); /* Duolingo-style: wrong answers come back at the end */
    foot.className = "lfoot bad";
    foot.innerHTML = '<h3>الإجابة الصحيحة:</h3><p><span class="ans" dir="auto">'+correctHtml+"</span>"+(explain?'<br><span dir="auto">'+explain+"</span>":"")+'</p><button class="btn bad" id="cont">فهمت</button>';
    var hs = $(".lbar .stat"); if(hs) hs.textContent = heartsLeft() === Infinity ? "♾️" : "❤️ "+heartsLeft();
  }
  $(".prog i").style.width = Math.round(100*L.okCount/L.total)+"%";
  save();
  $("#cont").onclick = function(){ if(heartsLeft() <= 0) return outOfHearts(); nextEx(); };
}
function selectable(sel, onPick){
  $$(sel).forEach(function(b){ b.onclick = function(){ $$(sel).forEach(function(x){ x.classList.remove("sel"); }); b.classList.add("sel"); sfx.tap(); onPick(b); $("#check").disabled = false; }; });
}
function lock(){ $$(".lbody button").forEach(function(b){ b.disabled = true; b.classList.remove("sel"); }); }

function exWord(ex){
  var u = UNITS[ex.u], others = [];
  UNITS.forEach(function(x){ x.pairs.forEach(function(p){ if(p.en !== ex.p.en) others.push(p); }); });
  var same = u.pairs.filter(function(p){ return p.en !== ex.p.en; });
  var distract = shuffle(same).slice(0, 3); if(distract.length < 3) distract = distract.concat(shuffle(others).slice(0, 3-distract.length));
  var opts = shuffle([ex.p].concat(distract)), ask = ex.rev ? ex.p.ar : ex.p.en, side = ex.rev ? "en" : "ar", pick = null;
  lessonShell('<div class="tag">مصطلح جديد</div><div class="kind">'+(ex.rev?"إيه المصطلح بالإنجليزي؟":"إيه معنى المصطلح ده؟")+'</div><div class="term'+(ex.rev?"":" ltr")+'" style="text-align:center">'+esc(ask)+'</div><div class="opts">'+
    opts.map(function(p, i){ return '<button class="opt'+(side==="en"?" ltr":"")+'" data-i="'+i+'"><span class="n">'+(i+1)+"</span>"+esc(p[side])+"</button>"; }).join("")+"</div>", checkFooter());
  selectable(".opt", function(b){ pick = +b.dataset.i; });
  $("#check").onclick = function(){
    var ok = opts[pick].en === ex.p.en; lock();
    $$(".opt").forEach(function(b, i){ if(opts[i].en === ex.p.en) b.classList.add("ok"); else if(i === pick) b.classList.add("bad"); });
    if(ok) S.words[ex.p.en] = 1;
    answered(ex, ok, esc(ex.p.en)+" = "+esc(ex.p.ar));
  };
}
function exMatch(ex){
  var left = shuffle(ex.pairs), right = shuffle(ex.pairs), selL = null, selR = null, left2 = ex.pairs.length, errs = 0;
  lessonShell('<div class="kind">وصّل كل مصطلح بمعناه</div><div class="match"><div class="col">'+
    left.map(function(p){ return '<button class="opt ltr" data-side="l" data-en="'+esc(p.en)+'">'+esc(p.en)+"</button>"; }).join("")+'</div><div class="col">'+
    right.map(function(p){ return '<button class="opt" data-side="r" data-en="'+esc(p.en)+'">'+esc(p.ar)+"</button>"; }).join("")+"</div></div>", '<p class="muted" style="text-align:center;margin:0">اضغط على المصطلح وبعدين على معناه</p>');
  $$(".match .opt").forEach(function(b){ b.onclick = function(){
    if(b.classList.contains("gone")) return;
    var side = b.dataset.side;
    $$('.match .opt[data-side="'+side+'"]').forEach(function(x){ x.classList.remove("sel"); });
    b.classList.add("sel"); if(side === "l") selL = b; else selR = b; sfx.tap();
    if(selL && selR){
      var a = selL, c = selR; selL = selR = null;
      if(a.dataset.en === c.dataset.en){
        [a, c].forEach(function(x){ x.classList.remove("sel"); x.classList.add("ok"); setTimeout(function(){ x.classList.remove("ok"); x.classList.add("gone"); x.disabled = true; }, 250); });
        S.words[a.dataset.en] = 1; sfx.ok();
        if(--left2 === 0) setTimeout(function(){ S.answered++; S.correct++; L.okCount++; L.queue.shift(); save(); $(".prog i").style.width = Math.round(100*L.okCount/L.total)+"%";
          var f = $("#foot"); f.className = "lfoot ok"; f.innerHTML = "<h3>"+(errs?"خلصت التوصيل 👍":"توصيل كامل بدون غلط! 🎉")+'</h3><button class="btn" id="cont">متابعة</button>'; $("#cont").onclick = nextEx; }, 350);
      }else{
        errs++; sfx.bad();
        [a, c].forEach(function(x){ x.classList.remove("sel"); x.classList.add("bad", "shake"); setTimeout(function(){ x.classList.remove("bad", "shake"); }, 450); });
      }
    }
  }; });
}
function exTF(ex){
  var pick = null;
  lessonShell('<div class="tag">صح ولا غلط؟</div><div class="kind">العبارة دي صح ولا غلط؟</div><div class="prompt"><span class="who">🧮</span><div class="say ltr">'+esc(ex.x.s)+'</div></div><div class="tfrow">'+
    '<button class="opt" data-v="1">✓ صح</button><button class="opt" data-v="0">✗ غلط</button></div>', checkFooter());
  selectable(".opt", function(b){ pick = b.dataset.v === "1"; });
  $("#check").onclick = function(){
    var ok = pick === ex.x.a; lock();
    $$(".opt").forEach(function(b){ var v = b.dataset.v === "1"; if(v === ex.x.a) b.classList.add("ok"); else if(v === pick) b.classList.add("bad"); });
    answered(ex, ok, ex.x.a ? "صح ✓" : "غلط ✗", '<span class="ltr" style="display:block">'+esc(ex.x.why)+"</span>");
  };
}
function exFill(ex){
  var parts = ex.x.s.split("___"), opts = shuffle(ex.x.opts), pick = null;
  lessonShell('<div class="tag">أكمل الفراغ</div><div class="kind">اختار الكلمة الناقصة</div><div class="sentence ltr">'+esc(parts[0])+'<span class="slot" id="slot">&nbsp;</span>'+esc(parts[1] || "")+'</div><div class="chips">'+
    opts.map(function(o, i){ return '<button class="opt ltr" data-i="'+i+'">'+esc(o)+"</button>"; }).join("")+"</div>", checkFooter());
  $$(".chips .opt").forEach(function(b){ b.onclick = function(){
    $$(".chips .opt").forEach(function(x){ x.classList.remove("used"); }); b.classList.add("used");
    pick = opts[+b.dataset.i]; var s = $("#slot"); s.textContent = pick; s.classList.add("filled"); sfx.tap(); $("#check").disabled = false;
  }; });
  $("#slot").onclick = function(){ if(pick == null) return; pick = null; this.innerHTML = "&nbsp;"; this.classList.remove("filled"); $$(".chips .opt").forEach(function(x){ x.classList.remove("used"); }); $("#check").disabled = true; };
  $("#check").onclick = function(){
    var ok = pick === ex.x.a; lock();
    var s = $("#slot"); s.style.borderColor = ok ? "var(--green)" : "var(--red)"; s.style.color = ok ? "var(--green-text)" : "var(--red-text)";
    answered(ex, ok, '<span class="ltr">'+esc(ex.x.s.replace("___", ex.x.a))+"</span>");
  };
}
function exMCQ(ex){
  var q = ex.q, order = shuffle([0,1,2,3]), pick = null;
  lessonShell('<div class="tag">'+({easy:"سؤال سهل",medium:"سؤال متوسط",hard:"سؤال صعب 🔥"}[q.difficulty] || "سؤال")+' · <span class="ltr">'+esc(q.standard)+'</span></div><div class="prompt"><span class="who">📊</span><div class="say ltr">'+esc(q.question)+'</div></div><div class="opts">'+
    order.map(function(oi, i){ return '<button class="opt ltr" data-o="'+oi+'"><span class="n">'+(i+1)+"</span>"+esc(q.options[oi])+"</button>"; }).join("")+"</div>", checkFooter());
  selectable(".opt", function(b){ pick = +b.dataset.o; });
  $("#check").onclick = function(){
    var ok = pick === q.answer; lock();
    $$(".opt").forEach(function(b){ var o = +b.dataset.o; if(o === q.answer) b.classList.add("ok"); else if(o === pick) b.classList.add("bad"); });
    var why = !ok && q.why_wrong && q.why_wrong[pick] ? "<br><b>ليه اختيارك غلط:</b> "+esc(q.why_wrong[pick]) : "";
    answered(ex, ok, '<span class="ltr">'+esc(q.options[q.answer])+"</span>", '<span class="ltr" style="display:block">'+esc(q.explanation)+"</span>"+why);
  };
}

function outOfHearts(){
  var jump = L.o.mode === "jump";
  app.innerHTML = '<div class="lesson"><div class="result"><div class="big">💔</div><h1 style="color:var(--red)">'+(jump?"الاختبار ماعداش":"خلصت القلوب")+"</h1><p class='muted'>"+
    (jump?"كمّل الوحدات بالترتيب، أو جرب تاني بعد شوية.":"القلب بيرجع كل "+REFILL_MIN+" دقيقة. أو تدرّب دلوقتي واكسب قلب.")+'</p><div style="width:100%;margin-top:20px">'+
    (jump?"":'<button class="btn blue" id="pr">🏋️ تدرّب واكسب قلب</button>')+'<button class="btn ghost" id="hm">رجوع</button></div></div></div>';
  var pr = $("#pr"); if(pr) pr.onclick = function(){ startPractice("mix"); };
  $("#hm").onclick = function(){ L = null; home(); };
}

function finish(){
  var o = L.o, perfect = L.mistakes === 0, xp;
  if(o.mode === "practice"){ xp = 5; if(S.hearts < MAX_HEARTS){ S.hearts++; if(S.hearts >= MAX_HEARTS) S.heartAt = Date.now(); } }
  else if(o.mode === "review" || o.mode === "jump") xp = 15 + (perfect ? 5 : 0);
  else xp = 10 + (perfect ? 5 : 0);
  var std = o.ui != null ? UNITS[o.ui].standard : null;
  if(o.mode === "lesson" && o.k >= done(o.ui)) S.prog[std] = o.k + 1;
  if(o.mode === "review") S.prog[std] = nodeCount(o.ui);
  if(o.mode === "jump") for(var i=0;i<=o.ui;i++) S.prog[UNITS[i].standard] = Math.max(done(i), i < o.ui ? nodeCount(i) : 0);
  if(o.mode !== "practice"){ S.lessons++; if(perfect) S.perfect++; }
  /* streak + daily XP */
  var d = today(), before = S.days[d] || 0;
  if(S.lastDay !== d){ S.streak = S.lastDay === yesterday() ? S.streak + 1 : 1; S.lastDay = d; }
  S.best = Math.max(S.best || 0, S.streak);
  S.xp += xp; S.days[d] = before + xp;
  var goalHit = before < S.goal && S.days[d] >= S.goal;
  save(); sfx.win(); confetti();
  var secs = Math.round((Date.now() - L.start)/1000), acc = Math.round(100*L.total/(L.total + L.mistakes));
  var title = o.mode === "jump" ? "عدّيت اختبار القفز! 🚀" : o.mode === "review" ? "خلصت الوحدة! 🏆" : o.mode === "practice" ? "تدريب ممتاز! ❤️ +1" : (perfect ? "درس بدون أي غلطة! 🎯" : "خلصت الدرس! 🎉");
  app.innerHTML = '<div class="lesson"><div class="result"><div class="big">'+(o.mode==="review"||o.mode==="jump"?"🏆":perfect?"🌟":"🎉")+"</div><h1>"+title+"</h1>"+
    (goalHit ? '<p style="color:var(--orange);font-weight:800">🎯 حققت هدف اليوم!</p>' : "")+
    '<p class="muted">🔥 '+S.streak+" يوم متواصل</p>"+
    '<div class="boxes"><div style="--c:var(--gold)"><small>XP</small><b>⚡ '+xp+'</b></div><div style="--c:var(--green)"><small>الدقة</small><b>🎯 '+acc+'%</b></div><div style="--c:var(--blue)"><small>الوقت</small><b>⏱ '+Math.floor(secs/60)+":"+String(secs%60).padStart(2,"0")+"</b></div></div>"+
    '<div style="width:100%"><button class="btn" id="cont">متابعة</button></div></div></div>';
  $("#cont").onclick = function(){ L = null; home(); };
}
function confetti(){
  var c = document.createElement("div"); c.className = "confetti";
  var cols = ["#2ec27e","#1cb0f6","#ffc800","#ff4b4b","#ce82ff","#ff9600"];
  for(var i=0;i<60;i++){ var p = document.createElement("i"); p.style.left = Math.random()*100+"%"; p.style.background = cols[i%cols.length];
    p.style.animationDuration = (1.6 + Math.random()*1.6)+"s"; p.style.animationDelay = (Math.random()*0.4)+"s"; c.appendChild(p); }
  document.body.appendChild(c); setTimeout(function(){ c.remove(); }, 3800);
}

if(!UNITS.length){ app.innerHTML = "<p style='padding:20px'>No content. Run python3 site/build.py</p>"; return; }
home();
})();
