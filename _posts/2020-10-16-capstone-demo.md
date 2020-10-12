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
function run_lotto() {
    gen = new Weyl();
    gen.init_from_pwd(document.getElementById("pwd").value);
    document.getElementById('w').innerHTML  = "Initial W: " + gen.w.toString();
    document.getElementById('x').innerHTML  = "Initial X: " + gen.x.toString();
    for(var iter=0;iter<10;iter++) {
        show_one(gen)
    }
}
</script>

<form onsubmit="return false;">
<input type="password" id="pwd" placeholder = "Governor's key">
<input type="submit" onClick="run_lotto()">
</form>

<form onsubmit="return false;">
<input type="submit" onClick="show_one()" text='Run Lotto'>
</form>

<p id='w'>Initial W: </p>
<p id='x'>Initial X: </p>

<div id='outputs'>
    <!--Winning Numbers Generated Here-->
    <p>Winning Numbers:</p>
</div>


<script>
run_lotto();
</script>