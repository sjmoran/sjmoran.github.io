---
layout: default
title: Research
permalink: /research/
---

<section style="max-width: var(--content-w); margin: 3rem auto;">

<span class="eyebrow">Research</span>
<h1>Topics I work on.</h1>

<p class="hero-thesis" style="font-size:1.15rem;">
A short tour of the threads that run through my published work — what I find interesting, what I keep returning to, and the older papers behind the more recent ones.
</p>

<h2>Retrieval and representation learning</h2>

<p>
My PhD at <strong>EdinburghNLP</strong> with <strong>Victor Lavrenko</strong> — the inventor of <em>relevance models</em>, one of the foundational ideas in modern information retrieval — was on hash codes for large-scale image retrieval — the line of work that became
<em>Variable Bit Quantisation</em> (ACL 2013),
<em>Neighbourhood-Preserving Quantisation</em> (SIGIR 2013),
and a 2019 monograph on the field.
In parallel I worked on streaming retrieval over Twitter — <em>Real-time Detection, Tracking, and Monitoring of Automatically Discovered Events in Social Media</em> (ACL 2014) and <em>Enhancing First Story Detection using Word Embeddings</em> (SIGIR 2016) — applying the same hashing-and-retrieval ideas to noisy, high-velocity text.
<em>Sparse Kernel Learning for Image Annotation</em> (ICMR 2014) won Best Student Paper.
The throughline is the same question I still find interesting: how do you build representations that let you find the right thing in a huge collection, fast.
</p>

<p>
Alongside Victor I was lucky to work closely with <strong>Charles Sutton</strong> — now a Principal Research Scientist at <strong>Google DeepMind</strong>, known for foundational work on graphical models and structured prediction and, later, the program-synthesis and code-generation research behind Google's <em>AlphaCode</em>-era efforts — and <strong>Miles Osborne</strong>, now a Senior Research Scientist at <strong>Bloomberg</strong>, whose earlier work on large-scale statistical machine translation and first-story detection on Twitter shaped how I think about streaming retrieval over noisy text.
</p>

<p>
Some of my recent essays — on the bits-over-random metric, on why some RAG queries can't be solved by vector search alone — are extensions of that thinking into the LLM era.
</p>

<h2>Image enhancement and small interpretable components</h2>

<p>
A second strand is photo-quality image enhancement.
<em>DeepLPF</em> (CVPR 2020) introduced learnable parametric filters,
<em>CURL</em> (ICPR 2020) introduced neural curve layers,
and <em>SIDGAN</em> (ECCV 2020) introduced a synthetic-data pipeline for low-light video.
The shared idea: small, interpretable modules that get most of the benefit of much heavier networks.
</p>

<h2>Applied AI in regulated environments</h2>

<p>
For the last several years I have been part of <strong>JPMorgan's AI Research</strong> group, working on the deployment of generative AI in one of the most regulated computing environments out there. Published work from that period —
<em>SpamT5</em> (FinLLM @ IJCAI 2023),
<em>CodeQUEST</em> (ISSREW 2025),
<em>API-Miner</em>, <em>Senatus</em>, <em>Ledgit</em>, <em>DeepClean</em> —
is mostly about making large models do real, audited work: code-quality evaluation, anomaly detection, federated training on sensitive data, machine unlearning. The patent portfolio is the residue of that effort.
</p>

<h2>How I tend to work</h2>

<ul>
<li><strong>Bias toward problems that ship.</strong> I have spent enough time near production systems to mistrust research that only works on a held-out test set. I prefer benchmarks that resemble the deployment environment.</li>
<li><strong>Small, interpretable components.</strong> DeepLPF and CURL are 600-line modules, not 100M-parameter monoliths. Many of the hashing papers replace a heavy lookup with a few learned bits. Where possible I'd rather make the inductive bias right than throw scale at it.</li>
<li><strong>Writing as thinking.</strong> I publish technical essays on <em>Towards Data Science</em> and Medium because the act of writing for practitioners surfaces gaps in my own understanding.</li>
</ul>

<hr>

<p style="color: var(--fg-muted); font-size: .9rem;">
Full list of papers and patents on the <a href="/#publications">home page</a>.
</p>

</section>
