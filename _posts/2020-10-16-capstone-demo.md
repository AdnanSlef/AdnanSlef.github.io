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
function show_one(gen) {
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
    /*
    document.getElementById("o0").innerHTML = gen.nextRand().toString();
    document.getElementById("o1").innerHTML = gen.nextRand().toString();
    document.getElementById("o2").innerHTML = gen.nextRand().toString();
    document.getElementById("o3").innerHTML = gen.nextRand().toString();
    document.getElementById("o4").innerHTML = gen.nextRand().toString();
    document.getElementById("o5").innerHTML = gen.nextRand().toString();
    document.getElementById("o6").innerHTML = gen.nextRand().toString();
    document.getElementById("o7").innerHTML = gen.nextRand().toString();
    document.getElementById("o8").innerHTML = gen.nextRand().toString();
    document.getElementById("o9").innerHTML = gen.nextRand().toString();
    */
}
</script>

<form onsubmit="return false;">
<input type="password" id="pwd" placeholder = "Governor's key">
<input type="submit" onClick="run_lotto()">
</form>

<p id='w'>Initial W: </p>
<p id='x'>Initial X: </p>

<div id='outputs'>
    <p id='o0'>Uncomputed</p>
    <p id='o1'>Uncomputed</p>
    <p id='o2'>Uncomputed</p>
    <p id='o3'>Uncomputed</p>
    <p id='o4'>Uncomputed</p>
    <p id='o5'>Uncomputed</p>
    <p id='o6'>Uncomputed</p>
    <p id='o7'>Uncomputed</p>
    <p id='o8'>Uncomputed</p>
    <p id='o9'>Uncomputed</p>
</div>


<script>
run_lotto();
</script>