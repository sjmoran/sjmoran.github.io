---
layout: default
title: Research
permalink: /research/
---

<section style="max-width: var(--content-w); margin: 3rem auto;">

<span class="eyebrow">Research</span>
<h1>What I work on, and why.</h1>

<p class="hero-thesis" style="font-size:1.15rem;">
Four themes run through my published work and the systems I have built. They are the questions I have kept returning to, and the ones that have tended to matter most once a system has to operate in production.
</p>

<h2>Scalable retrieval and representation systems</h2>

<p>
How to build representations that let you find the right thing in a large collection — quickly and reliably. This was the topic of my PhD at <strong>EdinburghNLP</strong>, and it has remained relevant as systems have grown larger.
</p>

<p>
The hashing line — <em>Variable Bit Quantisation</em> (ACL 2013), <em>Neighbourhood-Preserving Quantisation</em> (SIGIR 2013), and a 2019 monograph — replaced heavy lookups with a few learned bits at comparable accuracy. In parallel, <em>Real-time Detection, Tracking, and Monitoring of Automatically Discovered Events in Social Media</em> (ACL 2014) and <em>Enhancing First Story Detection using Word Embeddings</em> (SIGIR 2016) applied related ideas to noisy text streams. <em>Sparse Kernel Learning for Image Annotation</em> (ICMR 2014, Best Student Paper) extended the work into multi-modal retrieval.
</p>

<p>
In production, the line has continued in code-to-code retrieval (<em>Senatus</em>, <em>De-Skew LSH</em>), source-code understanding via spatial representations, and federated secure vocabulary learning — variations on the same question at larger scale and under tighter constraints. Recent essays on the bits-over-random metric and on the limits of vector search for some RAG queries extend the same thinking into the LLM setting.
</p>

<h2>Operational GenAI in regulated environments</h2>

<p>
Much generative-AI research is evaluated on held-out benchmarks. A separate set of problems — the ones I spend most of my time on — concern the behaviour of those same models in regulated, audit-heavy, operationally complex settings: latency budgets, governance, hallucination control, model risk management, and the failure modes that surface only in production.
</p>

<p>
Published work in this area includes <em>SpamT5</em> (FinLLM @ IJCAI 2023) on few-shot LLM email-spam detection, <em>CodeQUEST</em> (ISSREW 2025) on iterative LLM-based code-quality evaluation, and a number of systems — <em>API-Miner</em>, <em>Senatus</em>, <em>Ledgit</em>, <em>DeepClean</em> — covering code intelligence, anomaly detection, federated training on sensitive data, and machine unlearning. The associated patents (25+ granted US patents to date) sit mostly in code intelligence, federated learning, and secure retrieval.
</p>

<h2>Efficient, interpretable architectures</h2>

<p>
A consistent preference in this work is for small, interpretable modules that recover most of the benefit of heavier networks. <em>DeepLPF</em> (CVPR 2020) introduced learnable local parametric filters for image enhancement. <em>CURL</em> (ICPR 2020) introduced neural curve layers — a differentiable colour-curve module that performed competitively with much larger image-enhancement networks on three benchmarks. <em>SIDGAN</em> (ECCV 2020) introduced a synthetic-data pipeline for training low-light video models where real labelled data is unavailable.
</p>

<p>
The throughline is to prefer the right inductive bias over additional scale, where the problem allows. This matters in deployment: smaller, interpretable modules tend to be easier to ship, audit, and operate under distribution shift.
</p>

<h2>Decision systems and infrastructure-aware ML</h2>

<p>
More recent work has concerned systems that make decisions under uncertainty: agents with calibrated self-evaluation, anomaly detection over network alarms and cryptocurrency transactions, biased sampling and graph-feedback methods for streaming classification, and calibrated code-quality scoring. The unifying question is how to engineer reliability into systems that are statistical by nature, with awareness of the infrastructure those systems actually run on.
</p>

<h2>How I operate</h2>

<ul>
<li><strong>A preference for systems that ship.</strong> Production work has made me cautious about evaluations that only cover held-out test sets. The most useful benchmarks tend to resemble the eventual deployment environment.</li>
<li><strong>Small, cross-functional teams.</strong> Much of the work I am proudest of has come from compact teams that combine research, engineering, and product judgment in the same room — not from organisational scale alone.</li>
<li><strong>Inductive bias before scale.</strong> <em>DeepLPF</em> and <em>CURL</em> are ~600-line modules. Several of the hashing papers replace a heavy lookup with a few learned bits. Where the problem rewards careful structure over more parameters, I prefer to take that route.</li>
<li><strong>Writing as a way of thinking.</strong> I publish technical essays on <em>Towards Data Science</em> and Medium because writing for practitioners is a reliable way to surface gaps in my own understanding.</li>
</ul>

<hr>

<p style="color: var(--fg-muted); font-size: .9rem;">
Full list of papers and patents on the <a href="/#publications">home page</a>. Some of the names that recur in the bibliography — Victor Lavrenko (originator of relevance models), Miles Osborne, Charles Sutton, Greg Slabaugh — shaped my thinking in different ways over the years.
</p>

</section>
