---
layout: default
title: Cybersecurity Senior Capstone Demonstration
description: Predicting randomly generated numbers to win the lottery
categories: []
tags: []
---

# Lotto

<script src='/assets/scripts/weyl.js'></script>
<script>
gen = new Weyl();
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
</script>

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