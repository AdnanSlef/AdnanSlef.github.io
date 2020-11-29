---
layout: default
title: Cybersecurity Senior Capstone Demonstration
description: Predicting randomly generated numbers to win the lottery
categories: []
tags: []
---

# Lotto

<script src='/assets/scripts/md5.js'></script>
<script src='/assets/scripts/weyl.js'></script>
<script>
var gen;
function show_one() {
    var para = document.createElement("p");
    var node = document.createTextNode(document.getElementById("last-win").innerText);
    para.appendChild(node);
    document.getElementById("outputs").prepend(para);
    document.getElementById("last-win").innerText = gen.nextRand().toString();
}
function init_lotto() {
    gen = new Weyl();
    gen.init_from_pwd(document.getElementById("pwd").value);
    document.getElementById('w').innerText  = "Initial W: " + gen.w.toString();
    document.getElementById('x').innerText  = "Initial X: " + gen.x.toString();
    document.getElementById('last-win').innerText = '...';
    document.getElementById('outputs').innerHTML = '';
}
</script>

<form onsubmit="return false;">
<input type="password" id="pwd" placeholder = "Governor's key">
<input type="submit" onClick="init_lotto()">
</form>

<p id='w' style="color:white;">Initial W: </p>
<p id='x' style="color:white;">Initial X: </p>

<form onsubmit="return false;">
<input type="submit" onClick="show_one()" value='Run Lotto'>
</form>

<p id='last-win' style="border:5px solid red; text-align:center; margin: auto; width:300px">...</p>

<p>Past Winners:</p>
<div id='outputs'>
    <!--Winning Numbers Generated Here-->
</div>