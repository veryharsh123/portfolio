"use client";
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Code, Database, Cloud, FileText, ChevronDown, Menu, X } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = {
    languages: ['JavaScript (ES6+)', 'TypeScript', 'C', 'SQL (MySQL)', 'HTML/CSS'],
    frameworks: ['Next.js', 'React', 'Node.js', 'Express.js', 'Redux', 'Prisma', 'REST APIs', 'Tailwind CSS', 'Bootstrap'],
    cloud: ['AWS (EC2, S3, Lambda)', 'Firebase', 'Docker', 'Git/GitHub', 'CI/CD (GitHub Actions)'],
    other: ['WordPress', 'ArcGIS', 'Google Maps API', 'MongoDB', 'Postman']
  };

  const experience = [
    {
      title: 'Full Stack Web Developer',
      company: 'Botgo by Globtier Infotech',
      location: 'Noida',
      period: 'Jan 2025 – Apr 2025',
      achievements: [
        'Built and optimized scalable web applications using React, Node.js, TypeScript, Prisma, and MySQL, improving response time by 35%',
        'Redesigned database schemas with Prisma ORM, achieving 20% faster queries and smoother relational mappings',
        'Integrated third-party APIs and microservices, improving data retrieval efficiency by 25%',
        'Deployed services to AWS EC2/S3, ensuring scalability, fault tolerance, and long-term data durability',
        'Collaborated with product teams to design reusable UI components in TypeScript + Next.js, reducing frontend dev time by 15%'
      ]
    },
    {
      title: 'Software Engineer Intern',
      company: 'Vensysco Technologies Ltd.',
      location: 'Noida',
      period: 'Jul 2023 – Sep 2023',
      achievements: [
        'Developed backend services for an OTT platform, integrating payment gateways and CMS, boosting efficiency by 30%',
        'Implemented GIS/GPS-based solutions using Google Maps API + ArcGIS, improving data accuracy and visualization by 40%',
        'Delivered 100% on-time milestones, adapting quickly to agile development workflows'
      ]
    },
    {
      title: 'Freelance Web Developer',
      company: 'Remote',
      location: '',
      period: '2022 – Present',
      achievements: [
        'Delivered custom full-stack projects for small businesses using Next.js, React, Node.js, and Firebase',
        'Built responsive websites and dashboards with optimized SEO, increasing client engagement by 25%+',
        'Integrated payment systems, APIs, and cloud deployments, showcasing versatility in end-to-end solutions'
      ]
    }
  ];

  const projects = [
    {
      name: 'Coloc',
      tech: 'React (transitioning to Next.js), Node.js, Firebase, AWS',
      period: 'Jan 2024 – Present',
      description: 'Roommate-matching platform for students',
      url: 'https://colocweb.com',
      achievements: [
        'Launched a platform cutting flatmate search time by 50%',
        'Implemented real-time chat, match algorithms, and cloud-native backend',
        'Increased successful matches by 30%',
        'Deployed scalable architecture on Firebase + AWS S3'
      ],
      status: 'live'
    },
    {
      name: 'House of Gro',
      tech: 'Next.js, React, Node.js, Firebase, Tailwind CSS',
      period: '2023 – 2024',
      description: 'E-commerce platform for organic products',
      url: 'https://thehouseofgro.com',
      achievements: [
        'Built full-stack e-commerce solution with product catalog and cart functionality',
        'Implemented responsive design with modern UI/UX principles',
        'Integrated payment gateway and order management system',
        'Optimized for SEO and performance with Next.js'
      ],
      status: 'live'
    },
    {
      name: 'iChat',
      tech: 'Express.js, Node.js, Socket.io',
      period: 'Oct 2023',
      description: 'Real-time chat application with WebSockets',
      achievements: [
        'Built real-time chat app with WebSockets + Socket.io',
        'Reduced latency and improved user engagement by 40%',
        'Integrated Express backend for authentication and message routing',
        'Achieved 25% faster responses'
      ],
      status: 'completed'
    }
  ];

  const publications = [
    {
      title: 'Multimodal Dataset of Breast Cancer Diagnosis Using Deep Learning Techniques',
      venue: 'International Conference on AI and IoT in Management, Science and Technology',
      date: 'Dec 2024'
    },
    {
      title: 'Enhancing Twitter Tweet Topic Understanding through Ensemble Learning',
      venue: 'International Journal of Innovative Technology and Exploring Engineering (IJITEE)',
      date: 'Dec 2023'
    }
  ];

  const scrollTo = (elementId) => {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Animated text component
  const AnimatedText = ({ text, delay = 0 }) => {
    const [displayText, setDisplayText] = useState('');
    
    useEffect(() => {
      if (!isVisible) return;
      
      const timer = setTimeout(() => {
        let i = 0;
        const interval = setInterval(() => {
          setDisplayText(text.slice(0, i));
          i++;
          if (i > text.length) {
            clearInterval(interval);
          }
        }, 100);
        return () => clearInterval(interval);
      }, delay);
      
      return () => clearTimeout(timer);
    }, [text, delay, isVisible]);
    
    return <span>{displayText}</span>;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Animated background with moving particles */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        {/* Interactive glow effect */}
        <div 
          className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl transition-all duration-500 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-lg border-b border-cyan-500/30 z-50 shadow-lg shadow-cyan-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold glow-text">
              Harsh Ahuja
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['About', 'Experience', 'Projects', 'Publications', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-cyan-400 p-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-cyan-500/30">
              <div className="flex flex-col space-y-2 pt-4">
                {['About', 'Experience', 'Projects', 'Publications', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-left py-2 hover:bg-cyan-500/10 rounded-lg px-3"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with animations */}
      <section id="hero" className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`transition-all duration-1500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <AnimatedText text="Full Stack" delay={500} />
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400 glow-text animate-pulse">
                  <AnimatedText text="Developer" delay={1500} />
                </span>
              </h1>
              <div className={`transition-all duration-1000 delay-2000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Passionate about building scalable web applications with modern technologies. 
                  Experienced in React, Next.js, Node.js, and cloud deployments.
                </p>
              </div>
            </div>

            <div className={`flex justify-center space-x-6 mb-16 transition-all duration-1000 delay-2500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <a href="mailto:harshahuja1179@gmail.com" className="neon-button group">
                <Mail size={20} />
                <span>Contact Me</span>
              </a>
              <a href="https://github.com/veryharsh123/" target="_blank" rel="noopener noreferrer" className="neon-button-secondary group">
                <Github size={20} />
                <span>GitHub</span>
              </a>
            </div>

            <div className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 delay-3000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="neon-card group">
                <Code className="w-12 h-12 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-2">Frontend</h3>
                <p className="text-gray-400">React, Next.js, TypeScript, Tailwind CSS</p>
              </div>
              <div className="neon-card group">
                <Database className="w-12 h-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-2">Backend</h3>
                <p className="text-gray-400">Node.js, Express.js, Prisma, MySQL</p>
              </div>
              <div className="neon-card group">
                <Cloud className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-2">Cloud</h3>
                <p className="text-gray-400">AWS, Firebase, Docker, CI/CD</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-cyan-400 text-center mb-16 glow-text">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="neon-card">
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Education</h3>
                <div className="space-y-2">
                  <h4 className="text-green-400 font-medium">Bachelor of Technology in Computer Science</h4>
                  <p className="text-gray-300">Ajay Kumar Garg Engineering College, Delhi NCR</p>
                  <p className="text-gray-400">Jul 2020 – Jul 2024</p>
                </div>
              </div>
              
              <div className="mt-8 neon-card">
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <a href="mailto:harshahuja1179@gmail.com" className="text-gray-300 hover:text-cyan-400 transition-colors">
                      harshahuja1179@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300">+91-6394481765</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Linkedin className="w-5 h-5 text-cyan-400" />
                    <a href="https://www.linkedin.com/in/veryharsh/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors">
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Github className="w-5 h-5 text-cyan-400" />
                    <a href="https://github.com/veryharsh123/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors">
                      GitHub Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-cyan-400 mb-6">Technical Skills</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-cyan-400 font-medium mb-3">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.languages.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-green-400 font-medium mb-3">Frameworks & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.frameworks.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-blue-400 font-medium mb-3">Cloud & DevOps</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.cloud.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-yellow-400 font-medium mb-3">Other Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.other.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-cyan-400 text-center mb-16 glow-text">Experience</h2>
          
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="neon-card group hover:scale-[1.02] transition-all duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-cyan-400 mb-2">{exp.title}</h3>
                    <p className="text-xl text-white mb-1">{exp.company}</p>
                    {exp.location && <p className="text-gray-400">{exp.location}</p>}
                  </div>
                  <span className="text-green-400 font-medium mt-2 md:mt-0 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                    {exp.period}
                  </span>
                </div>
                
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-300 flex items-start">
                      <span className="text-cyan-400 mr-3 mt-2 text-sm">▸</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-cyan-400 text-center mb-16 glow-text">Projects</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="neon-card group hover:scale-105 transition-all duration-300 relative">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-semibold text-cyan-400 group-hover:text-green-400 transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {project.url && (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-cyan-400 hover:text-white hover:bg-cyan-500/20 rounded-lg transition-all"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'live' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : project.status === 'ongoing'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {project.status === 'live' ? 'Live' : project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-400 mb-2 text-sm">{project.period}</p>
                <p className="text-green-400 font-medium mb-4 text-sm">{project.tech}</p>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <ul className="space-y-2">
                  {project.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-400 flex items-start text-sm">
                      <span className="text-cyan-400 mr-2 mt-1 text-xs">▸</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-cyan-400 text-center mb-16 glow-text">Publications</h2>
          
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <div key={index} className="neon-card hover:scale-[1.02] transition-all duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-cyan-400 mb-2">{pub.title}</h3>
                    <p className="text-gray-300 mb-1">{pub.venue}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <span className="text-green-400 font-medium px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                      {pub.date}
                    </span>
                    <FileText className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-cyan-400 mb-8 glow-text">Let's Work Together</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. 
            Feel free to reach out if you'd like to collaborate!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href="mailto:harshahuja1179@gmail.com" 
              className="neon-button group"
            >
              <Mail size={24} />
              <span className="text-lg font-medium">Send Email</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/veryharsh/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="neon-button-secondary group"
            >
              <Linkedin size={24} />
              <span className="text-lg font-medium">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-cyan-500/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Harsh Ahuja. Built with Next.js and deployed on Vercel.
          </p>
        </div>
      </footer>
    </div> 
  )};