---
layout: default
title: Research
permalink: /research/
---

<article class="research-page">
  <header class="page-header">
    <h1>Research</h1>
    <p>My work is organised around three recurring problems.</p>
  </header>

  <section class="research-theme" aria-labelledby="retrieval-heading">
    <h2 id="retrieval-heading">Information retrieval and representation</h2>
    <p>My PhD research studied compact representations for large-scale retrieval: how to preserve useful neighbourhoods while replacing expensive comparisons with a small number of learned bits. I have since applied related ideas to text streams, cross-modal search, source code, and modern embedding systems.</p>
    <ul class="evidence-list">
      <li><span>2025</span><a href="http://arxiv.org/abs/2510.04127" target="_blank" rel="noopener">Projection and Quantisation: from random projections to the RAG era</a></li>
      <li><span>2019</span><a href="https://www.nowpublishers.com/article/Details/INR-066" target="_blank" rel="noopener">Learning to Hash for Large-Scale Information Retrieval</a></li>
      <li><span>ACL 2014</span><a href="/pdfs/acl14a.pdf">Real-time detection and tracking of events in social media</a></li>
      <li><span>SIGIR 2013</span><a href="/pdfs/npq_sigir.pdf">Neighbourhood-Preserving Quantisation</a></li>
    </ul>
  </section>

  <section class="research-theme" aria-labelledby="reliability-heading">
    <h2 id="reliability-heading">Reliable AI systems</h2>
    <p>I work on AI systems that operate under constraints which are often absent from benchmark evaluations: sensitive data, audit requirements, changing distributions, latency limits, and costly failures. This includes code intelligence, anomaly detection, federated learning, machine unlearning, and evaluation methods for language-model systems.</p>
    <ul class="evidence-list">
      <li><span>ISSREW 2025</span><a href="https://ieeexplore.ieee.org/abstract/document/11262341" target="_blank" rel="noopener">CodeQUEST: evaluation and improvement of code quality using LLMs</a></li>
      <li><span>TMLR 2024</span><a href="https://arxiv.org/abs/2305.15016" target="_blank" rel="noopener">Estimating dataset separability for LLM fine-tuning</a></li>
      <li><span>FinLLM 2023</span><a href="https://arxiv.org/abs/2304.01238" target="_blank" rel="noopener">SpamT5: few-shot email-spam detection</a></li>
      <li><span>DMKD 2024</span><a href="https://rdcu.be/dZ9Wv" target="_blank" rel="noopener">Probabilistic API contract specification retrieval</a></li>
    </ul>
  </section>

  <section class="research-theme" aria-labelledby="efficient-heading">
    <h2 id="efficient-heading">Efficient and interpretable learning</h2>
    <p>A separate line of work asks when a well-chosen operator can replace a larger, less interpretable model. DeepLPF learns local parametric filters, CURL turns colour curves into differentiable layers, and SIDGAN generates training data where paired low-light video is unavailable.</p>
    <ul class="evidence-list">
      <li><span>CVPR 2020</span><a href="https://arxiv.org/abs/2003.13985" target="_blank" rel="noopener">DeepLPF: Deep Local Parametric Filters for Image Enhancement</a></li>
      <li><span>ICPR 2020</span><a href="https://arxiv.org/abs/1911.13175" target="_blank" rel="noopener">CURL: Neural Curve Layers for Global Image Enhancement</a></li>
      <li><span>ECCV 2020</span><a href="https://arxiv.org/abs/2007.09187" target="_blank" rel="noopener">Low-light video enhancement using synthetic data</a></li>
      <li><span>WACV 2024</span><a href="https://arxiv.org/abs/2204.12495" target="_blank" rel="noopener">Privacy against inversion attacks in federated learning</a></li>
    </ul>
  </section>

  <nav class="research-next" aria-label="Research links">
    <a href="/publications/">All publications</a>
    <a href="/patents/">Patents</a>
    <a href="https://github.com/{{ site.github_username }}" target="_blank" rel="noopener">GitHub</a>
    <a href="{{ site.scholar_url }}" target="_blank" rel="noopener">Google Scholar</a>
  </nav>
</article>
