---
layout: default
title: Research
permalink: /research/
---

<section style="max-width: var(--content-w); margin: 3rem auto;">

<span class="eyebrow">Research</span>
<h1>What I work on, and why.</h1>

<p class="hero-thesis" style="font-size:1.15rem;">
Four enduring themes run through my published work and the systems I have shipped. They are less "fields I happen to have papers in" and more the questions I keep returning to — usually because, in production, they turn out to be the questions that actually decide whether a system survives contact with the real world.
</p>

<h2>Scalable retrieval and representation systems</h2>

<p>
How do you build representations that let you find the right thing in a very large collection — quickly, cheaply, and reliably? This is the question I started on as a PhD student at <strong>EdinburghNLP</strong> and the one I still find most useful as systems scale into the LLM era.
</p>

<p>
The hashing line — <em>Variable Bit Quantisation</em> (ACL 2013), <em>Neighbourhood-Preserving Quantisation</em> (SIGIR 2013), and a 2019 monograph — was about replacing heavy lookups with a few learned bits without losing accuracy. In parallel, <em>Real-time Detection, Tracking, and Monitoring of Automatically Discovered Events in Social Media</em> (ACL 2014) and <em>Enhancing First Story Detection using Word Embeddings</em> (SIGIR 2016) applied the same ideas to noisy, high-velocity streams. <em>Sparse Kernel Learning for Image Annotation</em> (ICMR 2014, Best Student Paper) extended this into multi-modal retrieval.
</p>

<p>
In production, the work has continued in code-to-code retrieval (<em>Senatus</em>, <em>De-Skew LSH</em>), source-code understanding via spatial representations, and federated secure vocabulary learning — all of them basically the same question asked of bigger data and harder constraints. My recent essays on the bits-over-random metric and on why some RAG queries cannot be solved by vector search alone are extensions of the same thinking into the LLM era.
</p>

<h2>Operational GenAI in regulated environments</h2>

<p>
Most generative-AI research lives or dies on a held-out benchmark. The harder problem — and the one I spend most of my time on — is making the same models behave in regulated, audit-heavy, operationally complex environments. Latency budgets, governance, hallucination control, model risk management, and the long tail of production failure modes that never appear in any benchmark.
</p>

<p>
Published work from this strand includes <em>SpamT5</em> (FinLLM @ IJCAI 2023) on few-shot LLM email-spam detection, <em>CodeQUEST</em> (ISSREW 2025) on iterative LLM-based code quality evaluation, and a portfolio of systems work — <em>API-Miner</em>, <em>Senatus</em>, <em>Ledgit</em>, <em>DeepClean</em> — covering code intelligence, anomaly detection, federated training on sensitive data, and machine unlearning. The patent portfolio is the residue of that effort: 25+ granted US patents, mostly in code intelligence, federated learning, and secure retrieval.
</p>

<h2>Efficient, interpretable architectures</h2>

<p>
The third strand is a preference: small, interpretable modules that get most of the benefit of much heavier networks. <em>DeepLPF</em> (CVPR 2020) introduced learnable local parametric filters for image enhancement. <em>CURL</em> (ICPR 2020) introduced neural curve layers — a differentiable colour-curve module that beat much larger image-enhancement networks on three benchmarks. <em>SIDGAN</em> (ECCV 2020) introduced a synthetic-data pipeline for training low-light video models where real labelled data does not exist.
</p>

<p>
The throughline: where possible, make the inductive bias right rather than throwing scale at it. This matters in production — small interpretable modules ship, audit cleanly, and degrade gracefully when distributions shift.
</p>

<h2>Decision systems and infrastructure-aware ML</h2>

<p>
Recent work has moved into the harder territory of systems that have to make decisions under uncertainty — agents that know when they are wrong, anomaly detection over network alarms and cryptocurrency transactions, biased sampling and graph-feedback approaches to streaming classification, and calibrated code-quality scoring. The unifying question is how to engineer reliability into systems that are statistical by nature, and how to do it with awareness of the infrastructure those systems actually run on.
</p>

<h2>How I operate</h2>

<ul>
<li><strong>Bias toward systems that ship.</strong> I have spent enough time near production to mistrust research that only works on a held-out test set. The interesting benchmarks resemble the deployment environment.</li>
<li><strong>Small teams, high leverage.</strong> Most of my best work has come from elite, cross-functional teams that combine research, engineering, and product judgment in the same room — not from organisational scale alone.</li>
<li><strong>Inductive bias before scale.</strong> <em>DeepLPF</em> and <em>CURL</em> are ~600-line modules. Several of the hashing papers replace a heavy lookup with a few learned bits. Where I can buy capability with the right structure rather than parameters, I prefer to.</li>
<li><strong>Writing as thinking.</strong> I publish technical essays on <em>Towards Data Science</em> and Medium because writing for practitioners surfaces gaps in my own understanding faster than anything else.</li>
</ul>

<hr>

<p style="color: var(--fg-muted); font-size: .9rem;">
Full list of papers and patents on the <a href="/#publications">home page</a>. Some of the names that shaped my thinking — Victor Lavrenko (inventor of relevance models), Miles Osborne, Charles Sutton, Greg Slabaugh — appear repeatedly in the bibliography.
</p>

</section>
