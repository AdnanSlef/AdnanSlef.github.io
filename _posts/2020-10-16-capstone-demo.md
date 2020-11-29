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
    var para = document.createElement("p")
    var node = document.createTextNode(gen.nextRand().toString());
    para.appendChild(node);
    document.getElementById("outputs").appendChild(para);
}
function init_lotto() {
    gen = new Weyl();
    gen.init_from_pwd(document.getElementById("pwd").value);
    document.getElementById('w').innerHTML  = "Initial W: " + gen.w.toString();
    document.getElementById('x').innerHTML  = "Initial X: " + gen.x.toString();
    document.getElementById('outputs').innerHTML = '<p>Winning Numbers:</p>'
}
</script>

<form onsubmit="return false;">
<input type="password" id="pwd" placeholder = "Governor's key">
<input type="submit" onClick="init_lotto()">
</form>

<br>

<p id='w' style="color:white;">Initial W: </p>
<p id='x' style="color:white;">Initial X: </p>

<form onsubmit="return false;">
<input type="submit" onClick="show_one()" value='Run Lotto'>
</form>

<div id='outputs'>
    <!--Winning Numbers Generated Here-->
    <p>Winning Numbers:</p>
</div>