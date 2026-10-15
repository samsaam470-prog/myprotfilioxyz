import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Menu, X, ArrowUpRight, ArrowRight, Search, Globe, Zap,
  Code, Layout, Palette, TrendingUp, MessageCircle,
  Linkedin, Facebook, Twitter, Mail, ChevronDown,
  CheckCircle2, Users, Target, Map, FileText, PenTool, Rocket,
  Eye, Compass, MousePointer, Gauge, Brain
} from 'lucide-react';
import HeroScene from './components/HeroScene';

// WhatsApp links
const WHATSAPP_BASE = 'https://wa.me/923325564406';
const WHATSAPP_ANALYSIS = `${WHATSAPP_BASE}?text=${encodeURIComponent("Hi Abdullah, I'd like to request a free website analysis. My website is: [I'll add my website URL]. My main goal is: [I'll describe my goal].")}`;
const WHATSAPP_PROJECT = `${WHATSAPP_BASE}?text=${encodeURIComponent("Hi Abdullah, I'd like to discuss a website project. I need help with: [new website / redesign / improvement].")}`;
const WHATSAPP_COLLAB = `${WHATSAPP_BASE}?text=${encodeURIComponent("Hi Abdullah, I'm reaching out regarding a development collaboration. I represent an agency/team and need support with: [describe your needs].")}`;
const EMAIL = 'mailto:samsam470@gmail.com';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Search & AI', href: '#discovery' },
  { label: 'Contact', href: '#contact' },
];

const PROJECTS = [
  {
    id: 1, name: 'States Real Estate', category: 'Real Estate Website Concept',
    description: 'A real-estate website concept designed to present property information clearly and help visitors explore property opportunities with an intuitive browsing experience.',
    audience: 'Property seekers and real-estate businesses looking for a professional online presence.',
    implementation: 'Clean property listings, responsive grid layouts, detailed property pages, and a navigation structure designed for easy exploration.',
    link: 'https://states.edgeone.dev',
    image: 'https://image.qwenlm.ai/generated-images/d630d4ec-1d4b-40aa-84eb-8b8a57b1490a/_result.png',
  },
  {
    id: 2, name: 'Restaurant Demo', category: 'Restaurant Website Concept',
    description: 'A restaurant website concept focused on presenting the restaurant, food, atmosphere, useful information, and customer-facing actions in an inviting way.',
    audience: 'Restaurant owners and hospitality businesses seeking an engaging digital presence.',
    implementation: 'Visual-first design with menu presentation, location information, reservation guidance, and responsive layouts optimized for mobile diners.',
    link: 'https://restaurantdemo.edgeone.dev',
    image: 'https://image.qwenlm.ai/generated-images/4d075b19-571a-4b70-b812-9f7f2614ce1c/_result.png',
  },
  {
    id: 3, name: 'Demo Agency', category: 'Agency Website Concept',
    description: 'An influencer-marketing agency website concept intended to communicate services, establish a professional brand impression, and guide potential customers toward inquiries.',
    audience: 'Marketing agencies and creative studios looking for a polished web presence.',
    implementation: 'Professional content structure, service presentation, team showcase areas, and clear pathways for potential clients to initiate contact.',
    link: 'https://demoagency.edgeone.dev',
    image: 'https://image.qwenlm.ai/generated-images/cbe91363-7cfe-4b99-9097-3281e0c409f1/_result.png',
  },
  {
    id: 4, name: 'FlowPilot SaaS', category: 'SaaS Product Concept',
    description: 'A SaaS concept for a lead-management platform. "Turn every lead into a clear next step." — presenting a dashboard experience with animations and interactive elements.',
    audience: 'SaaS founders and product teams exploring dashboard and product interface design.',
    implementation: 'Interactive dashboard interface, data visualization concepts, smooth animations, and a product-focused layout that communicates the platform concept.',
    link: 'https://zxzzzzzzzzz.edgeone.dev',
    image: 'https://image.qwenlm.ai/generated-images/ca88fe53-4077-472c-a0dc-6809382517a7/_result.png',
  },
];

function Section({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section id={id} ref={ref} className={`relative ${className}`}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
        {children}
      </motion.div>
    </section>
  );
}

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-dark/90 backdrop-blur-xl border-b border-border/50' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <a href="#home" className="font-display text-xl font-semibold tracking-tight text-primary hover:text-accent transition-colors">Abdullah</a>
            <div className="hidden lg:flex items-center gap-8">
              {NAV_ITEMS.map(item => (
                <a key={item.href} href={item.href} className="nav-link text-sm text-muted hover:text-primary">{item.label}</a>
              ))}
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <a href={WHATSAPP_ANALYSIS} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-medium bg-accent text-dark rounded-full hover:bg-accent-light transition-colors">Free Website Analysis</a>
            </div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-primary" aria-label="Toggle menu">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu fixed inset-0 z-40 bg-dark/98 backdrop-blur-xl ${mobileOpen ? 'open' : ''}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_ITEMS.map(item => (
            <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="text-2xl font-light text-primary hover:text-accent transition-colors">{item.label}</a>
          ))}
          <a href={WHATSAPP_ANALYSIS} target="_blank" rel="noopener noreferrer" className="mt-4 px-6 py-3 text-base font-medium bg-accent text-dark rounded-full">Free Website Analysis</a>
        </div>
      </div>
    </>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden hero-mesh">
      <div className="absolute inset-0">
        <div className="ambient-gradient w-[600px] h-[600px] -top-40 -right-40 bg-amber-500/5" />
        <div className="ambient-gradient w-[400px] h-[400px] bottom-20 -left-20 bg-amber-600/3" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div style={{ opacity, y }} className="order-2 lg:order-1">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-accent text-sm font-medium tracking-widest uppercase mb-6">
              Web Developer · Islamabad, Pakistan
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] mb-6">
              Your website should do more than <span className="gradient-text italic">exist.</span><br />
              It should help your business <span className="gradient-text italic">grow.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="text-muted text-lg lg:text-xl leading-relaxed max-w-xl mb-8">
              A website needs to communicate value clearly, establish trust, provide a smooth experience, and guide visitors toward meaningful next steps. I build websites with those objectives in mind.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }} className="flex flex-col sm:flex-row gap-4">
              <a href={WHATSAPP_ANALYSIS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-dark font-medium rounded-full hover:bg-accent-light transition-all hover:shadow-lg hover:shadow-accent/20">
                Get a Free Website Analysis <ArrowUpRight size={18} />
              </a>
              <a href={WHATSAPP_PROJECT} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-border text-primary font-medium rounded-full hover:border-accent/50 hover:text-accent transition-all">
                Discuss a Website Project <ArrowRight size={18} />
              </a>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1 }} className="order-1 lg:order-2 h-[350px] sm:h-[450px] lg:h-[550px]">
            <HeroScene />
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-muted tracking-wider uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown size={16} className="text-muted" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const problems = [
    { icon: <Eye size={20} />, text: 'Visitors struggle to understand what the business offers' },
    { icon: <Compass size={20} />, text: 'Important information is difficult to find' },
    { icon: <Layout size={20} />, text: 'The website feels outdated or untrustworthy' },
    { icon: <Globe size={20} />, text: 'The mobile experience is frustrating' },
    { icon: <Gauge size={20} />, text: 'Pages load slowly or interactions feel unreliable' },
    { icon: <MousePointer size={20} />, text: 'Calls to action are unclear or poorly positioned' },
    { icon: <Search size={20} />, text: 'Content and technical structure make search discovery harder' },
  ];
  return (
    <Section id="problems" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">The Problem</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
              Your website might be losing opportunities <span className="gradient-text italic">without you realizing it.</span>
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              These are potential issues worth investigating — not every website has all of them. But even one unresolved problem can affect how visitors perceive your business and whether they take the next step.
            </p>
            <a href={WHATSAPP_ANALYSIS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors font-medium">
              Get a free analysis of your website <ArrowRight size={16} />
            </a>
          </div>
          <div className="space-y-4">
            {problems.map((problem, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="flex items-start gap-4 p-4 rounded-xl border border-border/50 bg-dark-card/50 hover:border-accent/20 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">{problem.icon}</div>
                <p className="text-primary/90 leading-relaxed pt-2">{problem.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function ApproachSection() {
  const steps = [
    { icon: <Users size={22} />, title: 'Understand the business and its goals', desc: 'Learn what the business does, who it serves, and what success looks like.' },
    { icon: <Target size={22} />, title: 'Identify the audience and its needs', desc: 'Map who visits the website and what they need to find or do.' },
    { icon: <Map size={22} />, title: 'Map the important visitor journey', desc: 'Define the paths visitors should take and the decisions they need to make.' },
    { icon: <FileText size={22} />, title: 'Plan content, structure, and functionality', desc: 'Organize information and features to support the visitor journey.' },
    { icon: <PenTool size={22} />, title: 'Design and develop the solution', desc: 'Build the appropriate interface with attention to usability and performance.' },
    { icon: <Rocket size={22} />, title: 'Test, optimize, and prepare for launch', desc: 'Ensure quality, responsiveness, and readiness before going live.' },
  ];
  return (
    <Section id="approach" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">My Approach</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
            Good development starts with <span className="gradient-text italic">understanding the problem.</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Before writing any code, I take time to understand the business, its audience, its objectives, and the role the website should play. This ensures the solution fits the actual need.
          </p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent -translate-y-1/2" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }} className="relative p-6 rounded-xl border border-border/50 bg-dark-card/30 hover:border-accent/20 transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">{step.icon}</div>
                  <span className="text-accent/60 text-sm font-mono">0{i + 1}</span>
                </div>
                <h3 className="text-primary font-medium mb-2">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function ServicesSection() {
  const services = [
    { icon: <Code size={24} />, title: 'Full Website Development', desc: 'Modern, responsive websites designed around the business, its audience, and its objectives.' },
    { icon: <Layout size={24} />, title: 'Website Redesign', desc: 'Improve outdated layouts, confusing messaging, usability, mobile experiences, and the overall presentation of an existing website.' },
    { icon: <Palette size={24} />, title: 'Frontend & Contract Development', desc: 'Help agencies and development teams implement designs, create polished interfaces, develop interactive components, and manage overflow work.' },
    { icon: <TrendingUp size={24} />, title: 'UX & Conversion Improvements', desc: 'Improve information hierarchy, navigation, calls to action, and visitor journeys so users can understand the offering and find the appropriate next step.' },
    { icon: <Zap size={24} />, title: 'Performance & Technical Optimization', desc: 'Focus on loading performance, Core Web Vitals, responsive behavior, technical quality, and maintainability.' },
    { icon: <Search size={24} />, title: 'Search & AI Discovery', desc: 'Improve the technical and content foundations that help websites become discoverable through search engines, answer-oriented experiences, and generative AI systems.' },
  ];
  return (
    <Section id="services" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">Services</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
            What I can help you <span className="gradient-text italic">build and improve.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="service-card p-6 lg:p-8 rounded-xl border border-border/50 bg-dark-card/30">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-5">{service.icon}</div>
              <h3 className="text-lg font-medium text-primary mb-3">{service.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function WorkSection() {
  return (
    <Section id="work" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">Selected Work</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
            Selected work and <span className="gradient-text italic">concepts.</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            These are demo and concept projects that demonstrate approach, implementation quality, and design thinking. They are not client engagements.
          </p>
        </div>
        <div className="space-y-12 lg:space-y-20">
          {PROJECTS.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7 }} className="project-card grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className={`relative overflow-hidden rounded-2xl border border-border/50 aspect-video lg:aspect-[4/3] ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img src={project.image} alt={`${project.name} - ${project.category} preview`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-dark/70 backdrop-blur-sm">
                  <span className="px-6 py-3 bg-accent text-dark font-medium rounded-full flex items-center gap-2">View Live Demo <ArrowUpRight size={16} /></span>
                </a>
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium mb-4">{project.category}</span>
                <h3 className="font-display text-2xl lg:text-3xl font-semibold mb-4">{project.name}</h3>
                <p className="text-muted leading-relaxed mb-4">{project.description}</p>
                <p className="text-muted/80 text-sm mb-2"><span className="text-primary/70 font-medium">Intended audience:</span> {project.audience}</p>
                <p className="text-muted/80 text-sm mb-6"><span className="text-primary/70 font-medium">Implementation:</span> {project.implementation}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors font-medium">
                  Visit Live Demo <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function DiscoverySection() {
  const pillars = [
    { icon: <Globe size={24} />, title: 'SEO', subtitle: 'Search Engine Optimization', desc: 'Help search engines understand website pages through useful content, semantic structure, appropriate metadata, crawlability, internal linking, and technical foundations.' },
    { icon: <Brain size={24} />, title: 'AEO', subtitle: 'Answer Engine Optimization', desc: 'Organize useful information so it can be understood and potentially surfaced in answer-oriented search experiences.' },
    { icon: <Zap size={24} />, title: 'GEO', subtitle: 'Generative Engine Optimization', desc: 'Improve content clarity, relevance, structure, and accessibility to support potential discovery in generative AI experiences.' },
  ];
  const practices = ['Semantic HTML structure', 'Technical SEO foundations', 'Clear page titles and descriptions', 'Useful content structure', 'Structured data where appropriate', 'Internal linking and crawlability', 'Mobile usability and performance', 'Accessible, understandable content'];
  return (
    <Section id="discovery" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">Search & AI Discovery</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
            Build for more than <span className="gradient-text italic">a search result.</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            How a website is built affects whether it can be found and understood — by search engines, by answer-oriented systems, and by generative AI. These foundations matter.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }} className="p-6 lg:p-8 rounded-xl border border-border/50 bg-dark-card/30 hover:border-accent/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-5">{pillar.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-1">{pillar.title}</h3>
              <p className="text-accent/70 text-sm mb-4">{pillar.subtitle}</p>
              <p className="text-muted text-sm leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-display text-2xl font-semibold mb-6">Relevant practices include:</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {practices.map((practice, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-accent flex-shrink-0" />
                  <span className="text-muted text-sm">{practice}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="p-8 rounded-2xl border border-border/50 bg-dark-card/20">
            <p className="text-muted leading-relaxed text-sm">
              <span className="text-primary font-medium">Important note:</span> These practices improve the foundations that support discoverability. They do not guarantee specific rankings, traffic levels, or AI recommendations. Results depend on many factors including competition, content quality, and the overall authority of the website.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ProcessSection() {
  const steps = [
    { title: 'Research', desc: 'Understand the business, audience, competitors, and objectives.' },
    { title: 'Strategy', desc: 'Define the approach, structure, and priorities for the project.' },
    { title: 'Design & Build', desc: 'Create the interface and develop the functional website.' },
    { title: 'Optimize', desc: 'Refine performance, responsiveness, and technical quality.' },
    { title: 'Test', desc: 'Verify functionality across devices, browsers, and use cases.' },
    { title: 'Launch', desc: 'Deploy the website and prepare for ongoing improvement.' },
  ];
  return (
    <Section id="process" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">Development Process</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
            From the first idea to a <span className="gradient-text italic">finished experience.</span>
          </h2>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent lg:-translate-x-px" />
          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className={`relative flex items-start gap-6 lg:gap-12 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                <div className="absolute left-6 lg:left-1/2 w-3 h-3 rounded-full bg-accent border-2 border-dark -translate-x-1/2 mt-2 z-10" />
                <div className={`ml-14 lg:ml-0 lg:w-1/2 ${i % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                  <span className="text-accent/60 text-xs font-mono mb-2 block">Step 0{i + 1}</span>
                  <h3 className="text-lg font-semibold text-primary mb-2">{step.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function AgencySection() {
  const capabilities = ['Responsive frontend implementation', 'Translating design files into working interfaces', 'React and Next.js development', 'Interactive components and animations', 'Marketing websites and landing pages', 'Overflow development work', 'Collaborating with existing teams'];
  return (
    <Section id="agency" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">Agency Collaboration</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
              Need an extra pair of <span className="gradient-text italic">development hands?</span>
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              I work with agencies and development teams who need reliable frontend support. Whether it's implementing designs, building interactive components, or handling overflow work — I can help your team deliver great results.
            </p>
            <a href={WHATSAPP_COLLAB} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-dark font-medium rounded-full hover:bg-accent-light transition-all hover:shadow-lg hover:shadow-accent/20">
              Discuss a Collaboration <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="space-y-3">
            {capabilities.map((cap, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }} className="flex items-center gap-3 p-3 rounded-lg">
                <CheckCircle2 size={18} className="text-accent flex-shrink-0" />
                <span className="text-primary/90">{cap}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function AnalysisSection() {
  const reviewAreas = ['Messaging and value proposition', 'Navigation and usability', 'Mobile experience', 'Calls to action and visitor journey', 'Performance and technical foundations', 'Basic SEO and discoverability'];
  return (
    <Section id="analysis" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-dark-card to-dark-lighter p-8 lg:p-16">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-accent/5 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">Free Website Analysis</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight mb-6">
                Not sure what's holding your website <span className="gradient-text italic">back?</span>
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-6">
                If you already have a website, I can provide a free initial analysis to identify potential areas for improvement. This is an assessment to help you understand what might be affecting your website's effectiveness — not a promise of specific business results.
              </p>
              <p className="text-muted/80 text-sm mb-8">Don't have a website yet? We can discuss building one from scratch instead.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={WHATSAPP_ANALYSIS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-dark font-medium rounded-full hover:bg-accent-light transition-all hover:shadow-lg hover:shadow-accent/20">
                  Request Your Free Website Analysis <ArrowUpRight size={18} />
                </a>
                <a href={WHATSAPP_PROJECT} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-border text-primary font-medium rounded-full hover:border-accent/50 hover:text-accent transition-all">
                  Discuss a New Website <ArrowRight size={18} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">The review may cover:</h3>
              <div className="space-y-3">
                {reviewAreas.map((area, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-accent flex-shrink-0" />
                    <span className="text-muted">{area}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ContactSection() {
  return (
    <Section id="contact" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">Contact</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
            Let's talk about <span className="gradient-text italic">what you need.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl border border-border/50 bg-dark-card/30 hover:border-accent/20 transition-all">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-5"><Target size={24} /></div>
            <h3 className="text-xl font-semibold mb-3">For Business Owners</h3>
            <p className="text-muted mb-6">I want to build or improve my business website.</p>
            <a href={WHATSAPP_PROJECT} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-dark font-medium rounded-full hover:bg-accent-light transition-all text-sm">
              Discuss Your Website <ArrowUpRight size={16} />
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-8 rounded-2xl border border-border/50 bg-dark-card/30 hover:border-accent/20 transition-all">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-5"><Users size={24} /></div>
            <h3 className="text-xl font-semibold mb-3">For Agencies & Teams</h3>
            <p className="text-muted mb-6">I need a developer to support my team.</p>
            <a href={WHATSAPP_COLLAB} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-dark font-medium rounded-full hover:bg-accent-light transition-all text-sm">
              Discuss a Collaboration <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a href={EMAIL} className="flex items-center gap-2 text-muted hover:text-accent transition-colors"><Mail size={16} /><span className="text-sm">samsam470@gmail.com</span></a>
            <a href={WHATSAPP_BASE} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted hover:text-accent transition-colors"><MessageCircle size={16} /><span className="text-sm">+92 332 556 4406</span></a>
            <span className="flex items-center gap-2 text-muted"><Globe size={16} /><span className="text-sm">Islamabad, Pakistan</span></span>
          </div>
          <div className="flex justify-center gap-4">
            <a href="https://www.linkedin.com/in/muhammed-abdullah-441883438" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted hover:text-accent hover:border-accent/50 transition-all" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="https://www.facebook.com/share/18Xjfse1J9/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted hover:text-accent hover:border-accent/50 transition-all" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="https://x.com/officialabdawan" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted hover:text-accent hover:border-accent/50 transition-all" aria-label="X (Twitter)"><Twitter size={18} /></a>
            <a href="https://www.threads.net/@the.abdullahawan" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted hover:text-accent hover:border-accent/50 transition-all" aria-label="Threads">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">© {new Date().getFullYear()} Abdullah. Web Developer.</p>
          <p className="text-muted/60 text-xs">Built with care in Islamabad, Pakistan.</p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a href={`${WHATSAPP_BASE}?text=${encodeURIComponent("Hi Abdullah, I visited your website and would like to get in touch.")}`} target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Contact on WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

export default function App() {
  return (
    <div className="relative grid-pattern">
      <div className="noise-overlay" />
      <Navigation />
      <main>
        <HeroSection />
        <ProblemSection />
        <ApproachSection />
        <ServicesSection />
        <WorkSection />
        <DiscoverySection />
        <ProcessSection />
        <AgencySection />
        <AnalysisSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
