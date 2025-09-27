"use client";
// Add this component at the top of your file, after the imports
const TypewriterText = ({ text, delay = 0, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, currentIndex === 0 ? delay : speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, delay, speed]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <span>
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
    </span>
  );
};
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Code, Database, Cloud, FileText, ChevronDown, Menu, X, Calendar } from 'lucide-react';

// Framer Motion alternative using CSS animations and React state
const MotionDiv = ({ children, className, delay = 0, duration = 0.6, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`${className} transition-all ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`
      }}
      {...props}
    >
      {children}
    </div>
  );
};

const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  const getInitialTransform = () => {
    switch(direction) {
      case 'up': return 'translate-y-8';
      case 'down': return '-translate-y-8';
      case 'left': return 'translate-x-8';
      case 'right': return '-translate-x-8';
      default: return 'translate-y-8';
    }
  };

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0 translate-x-0' 
          : `opacity-0 ${getInitialTransform()}`
      } ${className}`}
    >
      {children}
    </div>
  );
};

const StaggerContainer = ({ children, staggerDelay = 0.1 }) => {
  return (
    <div>
      {React.Children.map(children, (child, index) => (
        <FadeIn delay={index * staggerDelay} key={index}>
          {child}
        </FadeIn>
      ))}
    </div>
  );
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
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
      tech: ['React', 'Next.js', 'Node.js', 'Firebase', 'AWS'],
      period: 'Jan 2024 – Present',
      description: 'A comprehensive roommate-matching platform designed specifically for students, featuring intelligent matching algorithms and real-time communication tools.',
      url: 'https://colocweb.com',
      achievements: [
        'Reduced flatmate search time by 50% through intelligent matching algorithms',
        'Implemented real-time chat system with WebSocket integration',
        'Built scalable cloud-native backend architecture on Firebase and AWS S3',
        'Increased successful matches by 30% through improved user experience'
      ],
      status: 'live',
      category: 'Full Stack',
      type: 'Personal Project'
    },
    {
      name: 'House of Gro',
      tech: ['Next.js', 'React', 'Node.js', 'Firebase', 'Tailwind CSS'],
      period: '2023 – 2024',
      description: 'Complete e-commerce solution for organic products featuring modern UI/UX, payment integration, and optimized performance.',
      url: 'https://thehouseofgro.com',
      achievements: [
        'Built full-stack e-commerce solution with comprehensive product catalog',
        'Implemented secure payment gateway and order management system',
        'Achieved excellent SEO performance with Next.js optimization',
        'Designed responsive interface following modern UI/UX principles'
      ],
      status: 'live',
      category: 'E-commerce',
      type: 'Freelance Project'
    },
    {
      name: 'iChat',
      tech: ['Express.js', 'Node.js', 'Socket.io', 'WebSockets'],
      period: 'Oct 2023',
      description: 'Real-time chat application built with WebSockets, featuring instant messaging, user authentication, and message routing.',
      achievements: [
        'Developed real-time messaging system using Socket.io and WebSockets',
        'Implemented user authentication and secure message routing',
        'Reduced message latency by 40% through optimized backend architecture',
        'Built scalable Express.js backend handling multiple concurrent users'
      ],
      status: 'completed',
      category: 'Real-time App',
      type: 'Personal Project'
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

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-x-hidden font-sans">
      {/* Background gradient */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-50 to-blue-50"></div>

      {/* Navigation */}
      <MotionDiv 
        className="fixed top-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-200 z-50 shadow-sm"
        delay={0}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <FadeIn delay={0.2} direction="left">
              <div className="text-2xl font-bold text-gray-900">
                Harsh Ahuja
              </div>
            </FadeIn>
            
            {/* Desktop Menu */}
            <FadeIn delay={0.4} direction="right">
              <div className="hidden md:flex space-x-8">
                {['About', 'Experience', 'Projects', 'Publications', 'Contact'].map((item, index) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium relative group"
                    style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </button>
                ))}
              </div>
            </FadeIn>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2 pt-4">
                {['About', 'Experience', 'Projects', 'Publications', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-left py-2 hover:bg-blue-50 rounded-lg px-3"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </MotionDiv>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
          <FadeIn delay={0.2}>
  <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
    <TypewriterText text="Full Stack" delay={500} speed={150} />
    <span className="block text-blue-600 font-bold">
      <TypewriterText text="Developer" delay={2000} speed={150} />
    </span>
  </h1>
</FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                Passionate about building scalable web applications with modern technologies. 
                Experienced in React, Next.js, Node.js, and cloud deployments.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.6}>
            <div className="flex justify-center space-x-6 mb-16">
              <a href="mailto:harshahuja1179@gmail.com" className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:scale-105">
                <Mail size={20} />
                <span>Contact Me</span>
              </a>
              <a href="https://github.com/veryharsh123/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium hover:scale-105">
                <Github size={20} />
                <span>GitHub</span>
              </a>
            </div>
          </FadeIn>

          <div className="grid grid-rows-3 gap-6">
            <StaggerContainer staggerDelay={0.2}>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <Code className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Frontend</h3>
                <p className="text-gray-600">React, Next.js, TypeScript, Tailwind CSS</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <Database className="w-12 h-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Backend</h3>
                <p className="text-gray-600">Node.js, Express.js, Prisma, MySQL</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <Cloud className="w-12 h-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cloud</h3>
                <p className="text-gray-600">AWS, Firebase, Docker, CI/CD</p>
              </div>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0.1}>
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">About Me</h2>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <FadeIn delay={0.2} direction="left">
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-2xl font-semibold text-blue-600 mb-4">Education</h3>
                  <div className="space-y-2">
                    <h4 className="text-gray-900 font-semibold">Bachelor of Technology in Computer Science</h4>
                    <p className="text-gray-700">Ajay Kumar Garg Engineering College, Delhi NCR</p>
                    <p className="text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Jul 2020 – Jul 2024
                    </p>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.3} direction="left">
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-2xl font-semibold text-blue-600 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 hover:text-blue-600 transition-colors">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <a href="mailto:harshahuja1179@gmail.com" className="text-gray-700 hover:text-blue-600 transition-colors">
                        harshahuja1179@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">+91-6394481765</span>
                    </div>
                    <div className="flex items-center space-x-3 hover:text-blue-600 transition-colors">
                      <Linkedin className="w-5 h-5 text-blue-600" />
                      <a href="https://www.linkedin.com/in/veryharsh/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">
                        LinkedIn Profile
                      </a>
                    </div>
                    <div className="flex items-center space-x-3 hover:text-blue-600 transition-colors">
                      <Github className="w-5 h-5 text-blue-600" />
                      <a href="https://github.com/veryharsh123/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">
                        GitHub Profile
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.4} direction="right">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Technical Skills</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-blue-600 font-semibold mb-3">Programming Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.languages.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200 hover:bg-blue-200 transition-colors duration-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-green-600 font-semibold mb-3">Frameworks & Libraries</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.frameworks.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200 hover:bg-green-200 transition-colors duration-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-purple-600 font-semibold mb-3">Cloud & DevOps</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.cloud.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium border border-purple-200 hover:bg-purple-200 transition-colors duration-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-orange-600 font-semibold mb-3">Other Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.other.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium border border-orange-200 hover:bg-orange-200 transition-colors duration-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0.1}>
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Experience</h2>
          </FadeIn>
          
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <FadeIn key={index} delay={0.2 + index * 0.1} direction="up">
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{exp.title}</h3>
                      <p className="text-xl text-blue-600 font-semibold mb-1">{exp.company}</p>
                      {exp.location && (
                        <p className="text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {exp.location}
                        </p>
                      )}
                    </div>
                    <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium mt-4 lg:mt-0 border border-green-200">
                      <Calendar className="w-4 h-4 mr-2" />
                      {exp.period}
                    </span>
                  </div>
                  
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-gray-700 flex items-start leading-relaxed hover:text-gray-900 transition-colors">
                        <span className="text-blue-600 mr-3 mt-1 text-lg">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Enhanced */}
      <section id="projects" className="relative z-10 py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0.1}>
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Featured Projects</h2>
          </FadeIn>
          
          <div className="space-y-12">
            {projects.map((project, index) => (
              <FadeIn key={index} delay={0.2 + index * 0.1} direction="up">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="p-8">
                    {/* Project Header */}
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className="text-3xl font-bold text-gray-900">{project.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            project.status === 'live' 
                              ? 'bg-green-100 text-green-700 border border-green-200' 
                              : project.status === 'ongoing'
                              ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                              : 'bg-blue-100 text-blue-700 border border-blue-200'
                          }`}>
                            {project.status === 'live' ? '🚀 Live' : project.status === 'ongoing' ? '🚧 In Progress' : '✅ Completed'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 mb-4">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                            {project.category}
                          </span>
                          <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                            project.type === 'Freelance Project'
                              ? 'bg-purple-100 text-purple-700 border border-purple-200'
                              : 'bg-blue-100 text-blue-700 border border-blue-200'
                          }`}>
                            {project.type}
                          </span>
                          <span className="text-gray-500 flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            {project.period}
                          </span>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">{project.description}</p>
                      </div>
                      
                      {project.url && (
                        <div className="lg:ml-8 mt-4 lg:mt-0">
                          <a 
                            href={project.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:scale-105"
                          >
                            <ExternalLink size={18} />
                            <span>View Project</span>
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Technology Stack */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Technology Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <span 
                            key={i} 
                            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium border border-gray-200 font-mono hover:bg-gray-200 transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Achievements</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {project.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            <span className="text-blue-600 mt-1">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span className="text-gray-700 text-sm leading-relaxed">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

{/* Publications Section */}
<section id="publications" className="relative z-10 py-20 px-6 bg-white">
<div className="max-w-6xl mx-auto">
<h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Publications</h2>

<div className="space-y-6">
{publications.map((pub, index) => (
<div key={index} className="bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
<div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
<div className="flex-1">
<h3 className="text-2xl font-semibold text-gray-900 mb-3">{pub.title}</h3>
<p className="text-gray-700 text-lg mb-2">{pub.venue}</p>
</div>
<div className="flex items-center space-x-4 mt-4 lg:mt-0">
<span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium border border-blue-200">
  <Calendar className="w-4 h-4 mr-2" />
  {pub.date}
</span>
<FileText className="w-6 h-6 text-gray-400" />
</div>
</div>
</div>
))}
</div>
</div>
</section>

{/* Contact Section */}
<section id="contact" className="relative z-10 py-20 px-6 bg-gray-50">
<div className="max-w-4xl mx-auto text-center">
<h2 className="text-4xl font-bold text-gray-900 mb-8">Let&apos;s Work Together</h2>
<p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
I&apos;m always interested in new opportunities and exciting projects. 
Feel free to reach out if you&apos;d like to collaborate!
</p>

<div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
<a 
href="mailto:harshahuja1179@gmail.com" 
className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
>
<Mail size={24} />
<span className="text-lg">Send Email</span>
</a>

<a 
href="https://www.linkedin.com/in/veryharsh/" 
target="_blank" 
rel="noopener noreferrer"
className="inline-flex items-center justify-center space-x-2 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-medium"
>
<Linkedin size={24} />
<span className="text-lg">LinkedIn</span>
</a>
</div>
</div>
</section>

{/* Footer */}
<footer className="relative z-10 py-8 px-6 border-t border-gray-200 bg-white">
<div className="max-w-6xl mx-auto text-center">
<p className="text-gray-600">
© 2025 Harsh Ahuja. Built with Next.js and deployed on Vercel.
</p>
</div>
</footer>
</div>
);
}