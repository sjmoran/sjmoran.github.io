---
layout: default
title: Research
permalink: /research/
---

<article class="research-page">
  <header class="page-intro research-intro">
    <span class="eyebrow">Research</span>
    <h1>AI systems that retrieve, decide, and explain.</h1>
    <p>I work on methods that have to survive contact with real systems: large collections, scarce labels, changing data, sensitive information, and decisions that need to be inspected after the fact.</p>
  </header>

  <section class="research-theme" aria-labelledby="retrieval-heading">
    <p class="theme-index">01 · Retrieval and representation</p>
    <div class="theme-body">
      <h2 id="retrieval-heading">Find the right information with less machinery.</h2>
      <p>My PhD work at EdinburghNLP studied compact representations for large-scale retrieval. The core idea was simple: learn a small number of useful bits, preserve neighbourhoods, and avoid expensive lookup without giving up much accuracy.</p>
      <p>That line now extends to embedding compression, event detection in noisy streams, code-to-code retrieval, and the cases where vector similarity is the wrong tool for a RAG query.</p>
      <ul class="evidence-list">
        <li><span>2025</span><a href="http://arxiv.org/abs/2510.04127" target="_blank" rel="noopener">Projection and Quantisation: from random projections to the RAG era</a></li>
        <li><span>2019</span><a href="https://www.nowpublishers.com/article/Details/INR-066" target="_blank" rel="noopener">Learning to Hash for Large-Scale Information Retrieval</a></li>
        <li><span>ACL 2014</span><a href="/pdfs/acl14a.pdf">Real-time detection and tracking of events in social media</a></li>
        <li><span>SIGIR 2013</span><a href="/pdfs/npq_sigir.pdf">Neighbourhood-Preserving Quantisation</a></li>
      </ul>
    </div>
  </section>

  <section class="research-theme" aria-labelledby="reliability-heading">
    <p class="theme-index">02 · Reliable AI for software and operations</p>
    <div class="theme-body">
      <h2 id="reliability-heading">Treat deployment constraints as part of the research problem.</h2>
      <p>In regulated environments, a benchmark score is only the beginning. Latency, audit trails, privacy, model risk, and recovery from failure often determine whether a method is useful at all.</p>
      <p>This work covers code-quality evaluation, API retrieval, anomaly detection, language models trained with few examples, federated learning, and machine unlearning.</p>
      <ul class="evidence-list">
        <li><span>ISSREW 2025</span><a href="https://ieeexplore.ieee.org/abstract/document/11262341" target="_blank" rel="noopener">CodeQUEST: evaluation and improvement of code quality using LLMs</a></li>
        <li><span>TMLR 2024</span><a href="https://arxiv.org/abs/2305.15016" target="_blank" rel="noopener">Estimating dataset separability for LLM fine-tuning</a></li>
        <li><span>FinLLM 2023</span><a href="https://arxiv.org/abs/2304.01238" target="_blank" rel="noopener">SpamT5: few-shot email-spam detection</a></li>
        <li><span>DMKD 2024</span><a href="https://rdcu.be/dZ9Wv" target="_blank" rel="noopener">Probabilistic API contract specification retrieval</a></li>
      </ul>
    </div>
  </section>

  <section class="research-theme" aria-labelledby="structure-heading">
    <p class="theme-index">03 · Efficient and auditable learning</p>
    <div class="theme-body">
      <h2 id="structure-heading">Use the right inductive bias before adding scale.</h2>
      <p>Some problems reward a carefully chosen operator more than a larger network. DeepLPF learns local parametric filters; CURL makes colour curves differentiable; SIDGAN creates training data when paired low-light video is unavailable.</p>
      <p>The same preference appears in privacy-preserving and federated systems: keep the mechanism small enough to inspect, test, and operate under distribution shift.</p>
      <ul class="evidence-list">
        <li><span>CVPR 2020</span><a href="https://arxiv.org/abs/2003.13985" target="_blank" rel="noopener">DeepLPF: Deep Local Parametric Filters for Image Enhancement</a></li>
        <li><span>ICPR 2020</span><a href="https://arxiv.org/abs/1911.13175" target="_blank" rel="noopener">CURL: Neural Curve Layers for Global Image Enhancement</a></li>
        <li><span>ECCV 2020</span><a href="https://arxiv.org/abs/2007.09187" target="_blank" rel="noopener">SIDGAN: low-light video enhancement with synthetic data</a></li>
        <li><span>WACV 2024</span><a href="https://arxiv.org/abs/2204.12495" target="_blank" rel="noopener">Privacy against inversion attacks in federated learning</a></li>
      </ul>
    </div>
  </section>

  <section class="research-constraints" aria-labelledby="constraints-heading">
    <span class="eyebrow">Method</span>
    <h2 id="constraints-heading">Three constraints on the work.</h2>
    <ul>
      <li><strong>Evaluation that resembles deployment.</strong> Test the failure modes, costs, and data conditions the system will actually face.</li>
      <li><strong>Inspection over mystery.</strong> Prefer mechanisms whose behaviour can be traced, challenged, and corrected.</li>
      <li><strong>Useful simplicity.</strong> Add parameters only when structure and better problem formulation stop paying.</li>
    </ul>
  </section>

  <nav class="research-next" aria-label="Research links">
    <a href="/publications/">All publications <span aria-hidden="true">→</span></a>
    <a href="/patents/">Patent record <span aria-hidden="true">→</span></a>
    <a href="https://github.com/{{ site.github_username }}" target="_blank" rel="noopener">Code on GitHub <span aria-hidden="true">↗</span></a>
    <a href="{{ site.scholar_url }}" target="_blank" rel="noopener">Google Scholar <span aria-hidden="true">↗</span></a>
  </nav>
</article>
