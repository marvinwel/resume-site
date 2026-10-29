const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const sections = [...document.querySelectorAll('header[id], main section[id], footer[id]')];
const navAnchors = [...document.querySelectorAll('.nav-links a')];

const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach(s => spy.observe(s));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const projectData = {
  'ai-advisor': {
    title: 'UTA AI Advisor',
    summary: 'A generative AI academic advising assistant for UT Arlington Computer Science students. Students sign in and ask questions in plain English about courses, prerequisites, schedules, and degree planning. Answers are grounded in official advising documents through retrieval-augmented generation (RAG) and checked against each student\'s records.',
    bullets: [
      'Students reach the app through Route 53 and an Application Load Balancer, and sign in with Amazon Cognito.',
      'The Chat UI sends questions to a LangChain application through a FastAPI endpoint.',
      'LangChain calls Amazon Bedrock, using Gemma 3 27B for responses and Titan Embeddings V2 for semantic search.',
      'A RAG pipeline chunks and embeds advising documents into a vector database; student records in DynamoDB support eligibility checks.',
      'The Chat UI, LangChain app, and vector database run as Docker containers on EC2, with images in Amazon ECR, deployed by a GitHub Actions CI/CD pipeline.',
      'Tested with simulated student profiles to validate eligibility and advising answers.'
    ],
    stack: 'LangChain • Amazon Bedrock • Gemma 3 27B • Titan Embeddings V2 • RAG • ChromaDB • FastAPI • Streamlit • Cognito • DynamoDB • EC2 • Docker • ECR • ALB • Route 53 • GitHub Actions',
    image: 'assets/ai-advisor-architecture.png',
    screenshots: [
      { src: 'assets/ai-advisor-login.jpg', caption: 'Login page: secure student sign-in with Amazon Cognito' },
      { src: 'assets/ai-advisor-chat.jpg', caption: 'Chat UI: course details, prerequisites, and a personalized eligibility check' }
    ]
  },
  'geofence-edge': {
    title: 'Geofence-Aware Edge Deployment',
    summary: 'Location-based software management for edge devices on military vehicles using IBM Edge Application Manager (IEAM), built on Open Horizon. Each geographic zone is approved for a specific set of software, and the vehicles automatically run only what is allowed where they are.',
    bullets: [
      'Each vehicle runs an Open Horizon agent on its onboard edge device, managed from a central IEAM hub on OpenShift.',
      'Deployment policies tie each containerized service to the zones where it is approved.',
      'When a vehicle crosses a geofence, IEAM re-evaluates its policies and automatically removes or deploys services with no manual intervention.',
      'Agents pull from the hub over outbound connections and keep their approved workloads running when the vehicle is disconnected.'
    ],
    stack: 'IBM Edge Application Manager • Open Horizon • Geofencing • OpenShift • Docker • Edge Computing',
    image: 'assets/edge-fleet.svg'
  },
  'ai-inspector': {
    title: 'AI Inspector',
    summary: 'A cloud-based package inspection system that classifies packages as OK or damaged and streams results to a live dashboard.',
    bullets: [
      'Uses AWS services for image storage, inference, APIs, inspection records, and real-time updates.',
      'Designed around S3, Lambda, API Gateway, DynamoDB, SageMaker, and WebSockets.',
      'Dashboard displays historical inspection data, confidence, trends, images, and connected devices.'
    ],
    stack: 'AWS • SageMaker • Lambda • API Gateway • DynamoDB • S3 • WebSockets',
     image: 'assets/AI-inspection-architecture.png',
    github: 'https://github.com/marvinwel/AI_Inspection_CSE_4333_5333'
  },
  'cloud-lab': {
    title: 'Cloud Infrastructure Lab',
    summary: 'A hands-on infrastructure project focused on repeatable cloud environments and operational automation.',
    bullets: [
      'Uses Terraform to define and provision infrastructure.',
      'Explores container deployment patterns and cloud networking.',
      'Designed to demonstrate IaC, automation, and platform engineering practices.'
    ],
    stack: 'Terraform • AWS • Kubernetes • Docker • CI/CD'
  },
  'automation': {
    title: 'Automation Tools',
    summary: 'Reusable scripts and workflows that reduce manual work and make environments more consistent.',
    bullets: [
      'Python and shell automation for developer and infrastructure tasks.',
      'Ansible-based configuration and provisioning patterns.',
      'Git-centered workflows designed for repeatability and team use.'
    ],
    stack: 'Python • Bash • Ansible • Git • Linux',
    
  },
  'drone': {
    title: 'Drone Inspection — Matrice 210',
    summary: 'A Linux-based inspection workflow for drone-captured imagery running on an embedded Manifold computer.',
    bullets: [
      'Automates image capture, processing, and reporting.',
      'Containerizes an ML inference engine with Docker.',
      'Uses IBM Node-RED for workflow automation on the drone platform.'
    ],
    stack: 'Linux • Docker • ML Inference • Node-RED • IoT',
    image: 'assets/drone-inspection-architecture.png'
  }
};

const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');

function openProject(key) {
  const project = projectData[key];
  if (!project) return;
  modalContent.innerHTML = `
    <p class="eyebrow blue">PROJECT DETAIL</p>
    <h2>${project.title}</h2>
    <p>${project.summary}</p>
    <h3>Highlights</h3>
    <ul>${project.bullets.map(item => `<li>${item}</li>`).join('')}</ul>
    <p><strong>Technology:</strong> ${project.stack}</p>
    
    ${project.image ? `
      <div class="project-detail-image">
        <h3>System Architecture</h3>
        <img
          src="${project.image}"
          alt="${project.title} system architecture"
        >
      </div>
    ` : ''}

    ${project.screenshots ? `
      <div class="project-detail-image">
        <h3>Screenshots</h3>
        ${project.screenshots.map(shot => `
          <figure style="margin: 0 0 20px;">
            <img src="${shot.src}" alt="${project.title}: ${shot.caption}" loading="lazy" style="width: 100%; height: auto; border-radius: 12px; border: 1px solid rgba(0, 0, 0, 0.08);">
            <figcaption style="font-size: 13px; opacity: 0.7; margin-top: 6px; text-align: center;">${shot.caption}</figcaption>
          </figure>
        `).join('')}
      </div>
    ` : ''}



    ${project.github ? `
      <a
        href="${project.github}"
        target="_blank"
        rel="noopener noreferrer"
        class="github-link"
      >
        View Project on GitHub ↗
      </a>
    ` : ''}
  `;
  modal.showModal();
}

document.querySelectorAll('.project-card').forEach(card => {
  card.querySelector('.text-link')?.addEventListener('click', () => openProject(card.dataset.project));
  card.addEventListener('dblclick', () => openProject(card.dataset.project));
});

document.querySelector('.modal-close')?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', event => {
  const rect = modal.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outside) modal.close();
});