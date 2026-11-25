---
title: "ここにタイトル"
date: {{ .Date }}
report_cat: ["研究会活動"]
report_year: ["{{ now.Format "2006" }}"]
thumbnail: ""
---
（文責：幹事　）

本文をここに書きます。

{{ "{{<" }} file "/uploads/{{ now.Format "2006/01" }}/xxx.pdf" {{ ">}}" }}1．講演資料のタイトル{{ "{{<" }} /file {{ ">}}" }}
