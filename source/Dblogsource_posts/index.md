---
title: Image-2角色设定提示词生成器
date: 2026-11-06
layout: page
---

{% raw %}
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>角色设定表提示词生成器 | Image-2</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui, sans-serif}
body{background:#f4f7fa;padding:20px;color:#222;max-width:1200px;margin:0 auto}
h1{font-size:22px;margin-bottom:16px;color:#1f2937}
.box{background:#fff;border-radius:10px;padding:18px;margin-bottom:16px;box-shadow:0 2px 8px #00000012}
.grid{display:grid;grid-template-columns:repeat(auto-fill, minmax(260px,1fr));gap:12px;margin-bottom:12px}
label{display:block;margin-bottom:4px;font-size:14px;color:#374151}
input,textarea,select{width:100%;padding:8px 10px;border:1px solid #d1d5db;border-radius:6px;font-size:14px}
textarea{min-height:70px;resize:vertical}
.check-group{display:grid;grid-template-columns:repeat(auto-fill, minmax(180px,1fr));gap:8px;margin:10px 0}
.check-item{display:flex;align-items:center;gap:6px}
.btns{display:flex;gap:10px;margin:14px 0;flex-wrap:wrap}
button{padding:9px 16px;border:none;border-radius:6px;background:#2563eb;color:#fff;cursor:pointer;font-size:14px}
button.secondary{background:#6b7280}
button.success{background:#10b981}
#result{width:100%;min-height:320px;font-family:Consolas,monospace;background:#111827;color:#e5e7eb;padding:14px;border-radius:8px;white-space:pre-wrap;line-height:1.5}
.tip{color:#666;font-size:13px;margin:6px 0}
</style>
</head>
<body>
<h1>Image-2 角色设定表提示词生成器</h1>

<div class="box">
  <h3>模块选择（按需勾选）</h3>
  <div class="check-group">
    <div class="check-item"><input type="checkbox" id="mod_main" checked><label for="mod_main">全身转体&比例标尺</label></div>
    <div class="check-item"><input type="checkbox" id="mod_head" checked><label for="mod_head">头部多视角细节</label></div>
    <div class="check-item"><input type="checkbox" id="mod_color" checked><label for="mod_color">色板色卡</label></div>
    <div class="check-item"><input type="checkbox" id="mod_cloth" checked><label for="mod_cloth">服装配饰拆解</label></div>
    <div class="check-item"><input type="checkbox" id="mod_note" checked><label for="mod_note">备注栏</label></div>
    <div class="check-item"><input type="checkbox" id="mod_close" checked><label for="mod_close">电影特写镜头</label></div>
    <div class="check-item"><input type="checkbox" id="mod_sign" checked><label for="mod_sign">右下角签名</label></div>
  </div>
</div>

<div class="box">
  <h3>角色基础信息</h3>
  <div class="grid">
    <div><label>姓名</label><input id="char_name" placeholder="{{character_name}}"></div>
    <div><label>别名</label><input id="char_alias" placeholder="{{alias}}"></div>
    <div><label>性别</label><input id="char_gender" placeholder="{{gender}}"></div>
    <div><label>年龄</label><input id="char_age" placeholder="{{age}}"></div>
    <div><label>身高</label><input id="char_height" placeholder="{{height}}"></div>
    <div><label>体型</label><input id="char_body" placeholder="{{body_type}}"></div>
    <div><label>种族</label><input id="char_eth" placeholder="{{ethnicity}}"></div>
    <div><label>角色定位</label><input id="char_role" placeholder="{{role}}"></div>
    <div><label>原型</label><input id="char_arche" placeholder="{{archetype}}"></div>
  </div>
  <div class="grid">
    <div><label>性格</label><input id="char_person" placeholder="{{personality_traits}}"></div>
    <div><label>核心主题</label><input id="char_theme" placeholder="{{core_theme}}"></div>
    <div><label>情感范围</label><input id="char_emotion" placeholder="{{emotional_range}}"></div>
    <div><label>行为记录</label><input id="char_behavior" placeholder="{{behavior_notes}}"></div>
    <div><label>说话风格/口音</label><input id="char_speech" placeholder="{{speech_style}}"></div>
  </div>
</div>

<div class="box">
  <h3>外观设定</h3>
  <div class="grid">
    <div><label>默认整套服装描述</label><textarea id="outfit_all" placeholder="{{default_outfit_description}}"></textarea></div>
    <div><label>上衣</label><input id="top" placeholder="{{top_description}}"></div>
    <div><label>下装</label><input id="bottom" placeholder="{{bottom_description}}"></div>
    <div><label>鞋子</label><input id="shoes" placeholder="{{shoes_description}}"></div>
    <div><label>配饰</label><textarea id="access" placeholder="{{accessories}}"></textarea></div>
    <div><label>可选道具</label><textarea id="props" placeholder="{{props}}"></textarea></div>
    <div><label>色板描述</label><textarea id="colorpal" placeholder="{{color_palette}}"></textarea></div>
    <div><label>备注文字</label><textarea id="notes" placeholder="{{notes_list}}"></textarea></div>
    <div><label>自定义签名</label><input id="sign_text" placeholder="魔扣Ai生图工具:mokouai.com" value="魔扣Ai生图工具:mokouai.com"></div>
  </div>
</div>

<div class="box">
  <h3>语言选择</h3>
  <select id="lang">
    <option value="zh">中文版提示词</option>
    <option value="en">英文版提示词</option>
  </select>
  <div class="btns">
    <button onclick="generate()">生成提示词</button>
    <button class="secondary" onclick="copyResult()">复制提示词</button>
    <button class="secondary" onclick="copyNeg()">复制负面提示词</button>
    <button class="success" onclick="resetAll()">清空表单</button>
  </div>
  <div class="tip">负面提示词（固定）：<span id="neg_text"></span></div>
  <textarea id="result" readonly></textarea>
</div>

<script>
const negZh = "畸形，五官错乱，换脸，多个不同人物，扭曲肢体，比例崩坏，杂乱背景，水印，大字logo，文字遮挡主体，模糊，低画质，手绘卡通，二次元，油画，多余肢体，多手指，脸型变化";
const negEn = "deformed, distorted face, face swap, different person, inconsistent face, broken proportion, messy background, big watermark, large logo, text covering character, blurry, cartoon, anime, extra limbs, extra fingers";
document.getElementById('neg_text').innerText = negZh;

function getV(id){return document.getElementById(id).value.trim()}
function getCk(id){return document.getElementById(id).checked}

function generate(){
  const lang = document.getElementById('lang').value;
  const name = getV('char_name')||'{{character_name}}';
  const alias = getV('char_alias')||'{{alias}}';
  const gender = getV('char_gender')||'{{gender}}';
  const age = getV('char_age')||'{{age}}';
  const height = getV('char_height')||'{{height}}';
  const body = getV('char_body')||'{{body_type}}';
  const eth = getV('char_eth')||'{{ethnicity}}';
  const role = getV('char_role')||'{{role}}';
  const arche = getV('char_arche')||'{{archetype}}';
  const person = getV('char_person')||'{{personality_traits}}';
  const theme = getV('char_theme')||'{{core_theme}}';
  const emotion = getV('char_emotion')||'{{emotional_range}}';
  const behavior = getV('char_behavior')||'{{behavior_notes}}';
  const speech = getV('char_speech')||'{{speech_style}}';
  const outfitAll = getV('outfit_all')||'{{default_outfit_description}}';
  const top = getV('top')||'{{top_description}}';
  const bottom = getV('bottom')||'{{bottom_description}}';
  const shoes = getV('shoes')||'{{shoes_description}}';
  const access = getV('access')||'{{accessories}}';
  const props = getV('props')||'{{props}}';
  const colorpal = getV('colorpal')||'{{color_palette}}';
  const notes = getV('notes')||'{{notes_list}}';
  const signText = getV('sign_text');

  let out = "";
  if(lang==='zh'){
    out += "电影角色概念设定集，写实照片级角色转体图，纯白背景\n";
    out += "高度精细专业角色设定稿，影视游戏工业标准模型设定表，干净工作室网格排版\n";
    out += "【身份锁定，最高优先级】以参考图角色为唯一身份锚点，严格锁定脸型轮廓、下颌线、颧骨、下巴形状、眼型、眉形、鼻梁鼻翼、嘴唇厚薄、嘴角形态、年龄气质；发际线、发型尽量保持一致。仅限同一个角色，严禁换脸、五官变形、五官漂移、脸型走样。\n\n";
    out += `角色核心信息\n姓名：${name}\n别名：${alias}\n性别：${gender}\n年龄：${age}\n身高：${height}\n体型：${body}\n种族：${eth}\n角色：${role}\n原型：${arche}\n\n`;
    out += `性格与特质\n性格：${person}\n核心主题：${theme}\n情感范围：${emotion}\n行为记录：${behavior}\n说话风格/口音：${speech}\n\n`;
    if(getCk('mod_main')) out += `【主视图&比例区】全身角色转视图，正面、四分之三侧面、正侧面、背面，统一服装${outfitAll}，中性站姿，比例统一，轮廓清晰，人物侧边附带垂直身高标尺（厘米）\n\n`;
    if(getCk('mod_head')) out += `【头部细节区】多视角头部特写：正面、侧面、四分之三侧面、俯视、低角度、动态角度，重点保证头发结构、面部比例、耳朵下颌对齐\n\n`;
    if(getCk('mod_color')) out += `【色板区】带标注色卡${colorpal}，包含肤色、发色、服装主色、点缀色\n\n`;
    if(getCk('mod_cloth')) out += `【服装配饰拆解】上衣：${top}，下装：${bottom}，鞋子：${shoes}，配饰：${access}，道具：${props}\n\n`;
    if(getCk('mod_note')) out += `【备注栏】小字注释：${notes}\n\n`;
    if(getCk('mod_close')) out += `【电影感特写区】一张角色情绪特写，柔和光影，氛围感，故事感\n\n`;
    out += "排版规范：规整网格布局，分区标题清晰，间距均匀，背景干净无杂物，专业原画设定稿，所有标注文字清晰可读\n";
    if(getCk('mod_sign')) out += `画布右下角留白区域，极细小横排艺术家署名：${signText}，细字体，低调不抢主体，不是水印\n`;
  }else{
    out += "Cinematic character concept art sheet, photorealistic character turnaround sheet, pure white background\n";
    out += "Industrial standard game & film character model sheet, ultra-detailed professional art sheet, clean grid studio layout\n";
    out += "TOP PRIORITY: identity locked to reference image, strictly preserve facial contour, jawline, cheekbones, chin shape, eye shape, eyebrow shape, nose bridge and alae, lip thickness, mouth shape, age and temperament; hairline and hairstyle consistent. Same character only, NO face swap, facial distortion, facial feature drift.\n\n";
    out += `CHARACTER CORE INFO\nName: ${name}\nAlias: ${alias}\nGender: ${gender}\nAge: ${age}\nHeight: ${height}\nBody Type: ${body}\nEthnicity: ${eth}\nRole: ${role}\nArchetype: ${arche}\n\n`;
    out += `PERSONALITY & TRAITS\nPersonality: ${person}\nCore Theme: ${theme}\nEmotional Range: ${emotion}\nBehavior Notes: ${behavior}\nSpeech Style / Accent: ${speech}\n\n`;
    if(getCk('mod_main')) out += `MAIN VIEW & SCALE: full body turnaround, front view, 3/4 view, side view, back view, wearing ${outfitAll}, neutral pose, consistent proportions, clean silhouette, vertical height ruler (cm) next to character\n\n`;
    if(getCk('mod_head')) out += `HEAD DETAIL PANEL: multi-angle head shots, front, side, 3/4, top-down, low angle, dynamic angle, consistent hair structure, facial proportion, jaw and ear alignment\n\n`;
    if(getCk('mod_color')) out += `COLOR PALETTE: labeled color swatches ${colorpal}, skin tone, hair color, clothing color, accent colors\n\n`;
    if(getCk('mod_cloth')) out += `WARDROBE & ACCESSORIES: Top: ${top}, Bottom: ${bottom}, Shoes: ${shoes}, Accessories: ${access}, Props: ${props}\n\n`;
    if(getCk('mod_note')) out += `NOTES PANEL: small text annotations ${notes}\n\n`;
    if(getCk('mod_close')) out += `CLOSEUP SHOT: one cinematic emotional closeup, soft lighting, storytelling vibe\n\n`;
    out += "Layout rules: neat grid layout, clear section headers, balanced spacing, empty clean background, professional concept sheet, all labels legible\n";
    if(getCk('mod_sign')) out += `Tiny subtle artist signature at bottom right blank space: ${signText}, thin font, low visibility, not watermark\n`;
  }
  document.getElementById('result').value = out;
  document.getElementById('neg_text').innerText = lang==='zh' ? negZh : negEn;
}

function copyResult(){
  const t = document.getElementById('result');
  t.select();
  navigator.clipboard.writeText(t.value).then(()=>alert('✅ 提示词已复制'));
}
function copyNeg(){
  const lang = document.getElementById('lang').value;
  const txt = lang==='zh' ? negZh : negEn;
  navigator.clipboard.writeText(txt).then(()=>alert('✅ 负面提示词已复制'));
}
function resetAll(){
  document.querySelectorAll('input,textarea').forEach(el=>el.value='');
  document.querySelectorAll('input[type="checkbox"]').forEach(cb=>cb.checked=true);
  document.getElementById('result').value='';
  document.getElementById('lang').value='zh';
  document.getElementById('neg_text').innerText = negZh;
  document.getElementById('sign_text').value='魔扣Ai生图工具:mokouai.com';
}
</script>
</body>
</html>
{% endraw %}
