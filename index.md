---
layout: default
title: Sean Moran
---

<article class="home-page">
  <h1 class="visually-hidden">Sean Moran</h1>
  <div class="intro">
    <p>I lead forward-deployed AI engineering in London. As Managing Director and Head of AI (UK) at Vergence AI, the Palantir–TWG Global joint venture, I hired and run a team that works on site with clients in insurance, financial services, healthcare and sport, taking LLM and ML systems from prototype to production.</p>

    <p>Coding agents write most of our code. The engineers own the specs, the evaluation sets that gate each release, and the relationship with the people who own the decision. I still write production code, including the extraction pipeline, the evaluation harness and shared agent tooling.</p>

    <p>Before that I spent five years at <a href="https://www.jpmorganchase.com/" target="_blank" rel="noopener">J.P. Morgan</a>, where I co-founded the CTO Applied Research group and founded a production-AI team that grew to 45+ people, shipping LLM and ML systems through model-risk, security and audit review. Earlier: senior research scientist at Huawei's London lab, first ML hire at a gene-therapy startup, and software engineer on Deutsche Bank's commodities desk. PhD from the <a href="https://www.ed.ac.uk/" target="_blank" rel="noopener">University of Edinburgh</a> (<a href="https://edinburghnlp.inf.ed.ac.uk/" target="_blank" rel="noopener">EdinburghNLP</a>); 40+ papers and 20+ granted US patents (<a href="{{ site.scholar_url }}" target="_blank" rel="noopener">Scholar</a>, <a href="https://patents.google.com/?inventor=Sean+Moran" target="_blank" rel="noopener">Patents</a>).</p>
  </div>

  <section class="content-section" aria-labelledby="deployed-work">
    <h2 id="deployed-work">Deployed work</h2>
    <ul class="plain-list">
      <li><strong>Vergence AI, 2025–present.</strong> Dozens of client projects at once, several in business production: fraud detection, pricing, customer analytics and document-heavy workflows. We build on Palantir Foundry/AIP with its Ontology, so the agents act on the client's operational records. Every engagement agrees evaluation gates and a human escalation path before production.</li>
      <li><strong>Multi-agent document processing.</strong> Designed the decomposition (extraction, tool contracts, human review, evaluation gates), shipped an MVP and a paid second phase, then handed the system to the client's own team.</li>
      <li><strong>Pre-sales.</strong> Ran discovery workshops and built working prototypes in front of prospective clients; these became paid engagements.</li>
      <li><strong>J.P. Morgan, 2020–2025.</strong> Shipped LLM and ML systems used across the bank, including an assistant with 50k+ users, incident analysis and vulnerability triage. Set the release gates a model or agent had to pass: offline quality, usefulness judged by domain experts, latency, controls and post-launch outcomes.</li>
    </ul>
    <p class="more-link">Client names withheld. <a href="{{ site.cv_pdf }}">CV (PDF)</a></p>
  </section>

  <section class="content-section" aria-labelledby="selected-research">
    <h2 id="selected-research">Selected research</h2>

    <ol class="selected-list">
      <li class="selected-entry">
        <h3><a href="https://ieeexplore.ieee.org/abstract/document/11262341" target="_blank" rel="noopener">CodeQUEST: Evaluation and Improvement of Code Quality Using LLMs</a></h3>
        <p>R. Liu, A. Frade, A. Vaidya, M. Labonne, M. Kaiser, B. Chakrabarti, S. Moran. <em>ISSREW, 2025.</em></p>
        <p class="entry-links"><a href="https://github.com/jpmorganchase/codequest" target="_blank" rel="noopener">code</a></p>
      </li>


      <li class="selected-entry">
        <h3><a href="https://arxiv.org/abs/2304.01238" target="_blank" rel="noopener">Spam-T5: Benchmarking LLMs for Few-Shot Email Spam Detection</a></h3>
        <p>M. Labonne, S. Moran. <em>FinLLM at IJCAI, 2023.</em></p>
        <p class="entry-links"><a href="https://github.com/jpmorganchase/llm-email-spam-detection" target="_blank" rel="noopener">code</a></p>
      </li>

      <li class="selected-entry">
        <h3><a href="https://arxiv.org/abs/2111.04473" target="_blank" rel="noopener">Senatus: A Fast and Accurate Code-to-Code Recommendation Engine</a></h3>
        <p>F. Silavong, S. Moran, A. Georgiadis, R. Saphal, R. Otter. <em>MSR, 2022.</em></p>
      </li>

      <li class="selected-entry">
        <h3><a href="https://arxiv.org/abs/2003.13985" target="_blank" rel="noopener">DeepLPF: Deep Local Parametric Filters for Image Enhancement</a></h3>
        <p>S. Moran, P. Marza, S. McDonagh, S. Parisot, G. Slabaugh. <em>CVPR, 2020.</em></p>
        <p class="entry-links"><a href="https://github.com/sjmoran/deep_local_parametric_filters" target="_blank" rel="noopener">code</a><a href="https://www.youtube.com/watch?v=Sxach3FM6FY" target="_blank" rel="noopener">video</a></p>
      </li>


      <li class="selected-entry">
        <h3><a href="/pdfs/acmicmr2014.pdf">Sparse Kernel Learning for Image Annotation</a></h3>
        <p>S. Moran, V. Lavrenko. <em>ICMR, 2014. Best Student Paper.</em></p>
        <p class="entry-links"><a href="https://github.com/sjmoran/SKLCRM" target="_blank" rel="noopener">code</a></p>
      </li>

    </ol>

    <p class="more-link"><a href="/publications/">All publications</a></p>
  </section>

  <section class="content-section" aria-labelledby="systems-code">
    <h2 id="systems-code">Systems and code</h2>
    <ul class="plain-list">
      <li><a href="https://sjmoran.github.io/bitbudget/" target="_blank" rel="noopener"><strong>BitBudget</strong></a> — a benchmark for measuring embedding retrieval quality per byte. <a href="https://github.com/sjmoran/bitbudget" target="_blank" rel="noopener">Code</a>.</li>
      <li><a href="https://huggingface.co/spaces/sjmoran/the-corpus-is-the-model" target="_blank" rel="noopener"><strong>The Corpus is the Model</strong></a> — a training-free image tagger whose predictions can be traced to examples in the corpus.</li>
      <li><a href="https://github.com/jpmorganchase/api-miner" target="_blank" rel="noopener"><strong>API-Miner</strong></a> — probabilistic retrieval of related API specifications.</li>
      <li><a href="https://github.com/jpmorganchase/cv4code" target="_blank" rel="noopener"><strong>CV4Code</strong></a> — source-code understanding through spatial representations.</li>
    </ul>
    <p class="more-link"><a href="/talks/">Talks, code, and datasets</a></p>
  </section>

  <section class="content-section" aria-labelledby="recent-writing">
    <h2 id="recent-writing">Recent writing</h2>
    <ul class="plain-list">
      <li><a href="https://aiadvances.org/what-anthropics-workforce-data-says-about-ai-at-work-67103329c989" target="_blank" rel="noopener">What Anthropic's Workforce Data Says About AI at Work</a></li>
      <li><a href="https://medium.com/@sean.j.moran/ai-has-made-research-cheap-understanding-is-still-expensive-ae36da3f5205" target="_blank" rel="noopener">AI Has Made Research Cheap. Understanding Is Still Expensive.</a></li>
      <li><a href="https://medium.com/@sean.j.moran/the-retrieval-mistake-most-rag-teams-havent-understood-8b864c034ee7" target="_blank" rel="noopener">Why Some RAG Queries Cannot Be Solved by Vector Search Alone</a></li>
      <li><a href="https://medium.com/@sean.j.moran/ai-agents-need-more-than-job-orchestration-43e493bb4749" target="_blank" rel="noopener">AI Agents Need More Than Job Orchestration</a></li>
      <li><a href="https://towardsdatascience.com/what-the-bits-over-random-metric-changed-in-how-i-think-about-rag-and-agents/" target="_blank" rel="noopener">What Bits-over-Random Changed in How I Think About RAG and Agents</a></li>
    </ul>
    <p class="more-link"><a href="/writing/">All writing</a></p>
  </section>
</article>
