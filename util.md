---
layout: default
title: Utilities
permalink: /util/
description: Utilities for Adrian Self
---

# Utilities

<script src='/assets/scripts/md5.js'></script>
<script>
function compute() {
document.getElementById("o1").innerHTML = base64(md5(document.getElementById("i1").value+document.getElementById("i2").value))
document.getElementById("o2").innerHTML = base64(md5(document.getElementById("i1").value+document.getElementById("i2").value+'\n'))
}
</script>

<form onsubmit="return false;">
<input type="password" id="i1">
<input type="password" id="i2">
<input type="submit" onClick="compute()">
</form>

<p id='o1'>Uncomputed.</p>
<p id='o2'>Uncomputed.</p>