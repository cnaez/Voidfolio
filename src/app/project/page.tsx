'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import {
  ExternalLink,
  Calendar,
  Users,
  TrendingUp,
  Code,
  Palette,
  Smartphone,
  Globe,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Zap,
  ArrowLeft,
  Filter,
} from 'lucide-react'

interface Project {
  id: number
  title: string
  subtitle: string
  category: 'fintech' | 'ecommerce' | 'saas' | 'healthcare' | 'startup'
  image: string
  video?: string
  description: string
  challenge: string
  solution: string
  results: {
    metric: string
    value: string
    description: string
  }[]
  technologies: string[]
  timeline: string
  client: string
  testimonial?: {
    quote: string
    author: string
    position: string
  }
  link?: string
  stats: {
    revenue?: string
    users?: string
    growth?: string
    performance?: string
  }
}

const projects: Project[] = [
  {
    id: 1,
    title: 'TradePro Dashboard',
    subtitle: 'Real-time trading platform',
    category: 'fintech',
    image: '/images/project-tradepro.jpg',
    video: '/videos/project-tradepro.mp4',
    description:
      'A comprehensive trading platform that handles millions in daily volume with sub-100ms response times.',
    challenge:
      'Our client needed a platform that could handle high-frequency trading while maintaining perfect uptime during market hours.',
    solution:
      'Built a React-based dashboard with WebSocket connections, Redis caching, and microservices architecture for maximum performance.',
    results: [
      {
        metric: 'Daily Volume',
        value: '$50M+',
        description: 'Average daily trading volume',
      },
      {
        metric: 'Response Time',
        value: '<100ms',
        description: 'API response time',
      },
      { metric: 'Uptime', value: '99.9%', description: 'System availability' },
    ],
    technologies: [
      'React',
      'TypeScript',
      'WebSockets',
      'Redis',
      'Node.js',
      'PostgreSQL',
    ],
    timeline: '6 weeks',
    client: 'TradePro Financial',
    testimonial: {
      quote:
        'Void delivered a platform that exceeded our performance requirements. Our traders love the interface.',
      author: 'Michael Chen',
      position: 'CTO, TradePro Financial',
    },
    stats: {
      revenue: '$50M+ daily volume',
      users: '10K+ active traders',
      performance: '99.9% uptime',
    },
  },
  {
    id: 2,
    title: 'StyleHub Commerce',
    subtitle: 'Fashion e-commerce platform',
    category: 'ecommerce',
    image: '/images/project-stylehub.jpg',
    video: '/videos/project-stylehub.mp4',
    description:
      'A modern e-commerce platform that increased conversion rates by 340% and average order value by $127.',
    challenge:
      'The existing platform had poor UX, slow load times, and a 2.1% conversion rate that was bleeding revenue.',
    solution:
      'Complete redesign with focus on mobile-first experience, advanced filtering, and streamlined checkout process.',
    results: [
      {
        metric: 'Conversion Rate',
        value: '+340%',
        description: 'From 2.1% to 9.2%',
      },
      {
        metric: 'Average Order Value',
        value: '+$127',
        description: 'Increase per transaction',
      },
      {
        metric: 'Page Load Speed',
        value: '2.1s',
        description: 'From 8.3s to 2.1s',
      },
    ],
    technologies: [
      'Next.js',
      'Tailwind CSS',
      'Stripe',
      'Shopify API',
      'Vercel',
    ],
    timeline: '8 weeks',
    client: 'StyleHub Fashion',
    testimonial: {
      quote:
        'Our revenue tripled in the first quarter after launch. The new platform is incredible.',
      author: 'Sarah Williams',
      position: 'Founder, StyleHub Fashion',
    },
    stats: {
      revenue: '$100K+ monthly',
      users: '25K+ customers',
      growth: '340% conversion increase',
    },
  },
  {
    id: 3,
    title: 'MediConnect Platform',
    subtitle: 'Healthcare management system',
    category: 'healthcare',
    image: '/images/project-mediconnect.jpg',
    description:
      'HIPAA-compliant patient management system serving 50+ healthcare providers.',
    challenge:
      'Healthcare providers needed a secure, compliant system for managing patient data and appointments.',
    solution:
      'Built a comprehensive platform with encryption, audit trails, and seamless provider workflows.',
    results: [
      {
        metric: 'Providers',
        value: '50+',
        description: 'Healthcare facilities using the system',
      },
      {
        metric: 'Patients',
        value: '15K+',
        description: 'Active patient records',
      },
      {
        metric: 'Efficiency',
        value: '60%',
        description: 'Reduction in admin time',
      },
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Stripe', 'Twilio'],
    timeline: '12 weeks',
    client: 'MediConnect Health',
    stats: {
      users: '15K+ patients',
      performance: 'HIPAA compliant',
    },
  },
  {
    id: 4,
    title: 'GrowthAI Analytics',
    subtitle: 'AI-powered business intelligence',
    category: 'saas',
    image: '/images/project-growthai.jpg',
    description:
      'SaaS platform that helps businesses optimize their growth with AI-driven insights.',
    challenge:
      'Small businesses needed enterprise-level analytics without the complexity or cost.',
    solution:
      'Created an intuitive dashboard with machine learning models for predictive analytics.',
    results: [
      {
        metric: 'Customers',
        value: '1,000+',
        description: 'Paying subscribers in 4 months',
      },
      {
        metric: 'Revenue Growth',
        value: '285%',
        description: 'Average client improvement',
      },
      {
        metric: 'Retention Rate',
        value: '94%',
        description: 'Monthly customer retention',
      },
    ],
    technologies: ['React', 'Python', 'TensorFlow', 'PostgreSQL', 'Docker'],
    timeline: '10 weeks',
    client: 'GrowthAI Inc.',
    stats: {
      users: '1K+ subscribers',
      growth: '285% client growth',
      revenue: '$50K MRR',
    },
  },
  {
    id: 5,
    title: 'FoodieConnect App',
    subtitle: 'Social dining platform',
    category: 'startup',
    image: '/images/project-foodie.jpg',
    description:
      'Mobile app connecting food enthusiasts with local restaurants and events.',
    challenge:
      'Startup needed an MVP to validate their concept and attract investors.',
    solution:
      'Developed a full-featured mobile app with geolocation, social features, and restaurant integration.',
    results: [
      { metric: 'Downloads', value: '25K+', description: 'In first 3 months' },
      {
        metric: 'Restaurant Partners',
        value: '200+',
        description: 'Active partnerships',
      },
      {
        metric: 'User Engagement',
        value: '4.2/5',
        description: 'App store rating',
      },
    ],
    technologies: [
      'React Native',
      'Firebase',
      'Google Maps',
      'Stripe',
      'Node.js',
    ],
    timeline: '8 weeks',
    client: 'FoodieConnect Startup',
    stats: {
      users: '25K+ downloads',
      growth: '4.2/5 rating',
    },
  },
  {
    id: 6,
    title: 'CryptoVault Exchange',
    subtitle: 'Cryptocurrency trading platform',
    category: 'fintech',
    image: '/images/project-cryptovault.jpg',
    description:
      'Secure cryptocurrency exchange with advanced trading features and institutional-grade security.',
    challenge:
      'Client needed a trading platform that could compete with major exchanges while ensuring top-tier security.',
    solution:
      'Built a high-performance exchange with multi-layer security, real-time charts, and advanced order types.',
    results: [
      {
        metric: 'Trading Volume',
        value: '$2M+',
        description: 'Daily trading volume',
      },
      {
        metric: 'Security Score',
        value: '10/10',
        description: 'Third-party audit rating',
      },
      {
        metric: 'Load Time',
        value: '1.8s',
        description: 'Page load performance',
      },
    ],
    technologies: [
      'React',
      'WebSockets',
      'Redis',
      'PostgreSQL',
      'AWS',
      'Docker',
    ],
    timeline: '14 weeks',
    client: 'CryptoVault Ltd.',
    stats: {
      revenue: '$2M+ daily volume',
      performance: '10/10 security score',
    },
  },
]

const categories = [
  { id: 'all', name: 'All Projects', icon: Globe },
  { id: 'fintech', name: 'FinTech', icon: TrendingUp },
  { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart },
  { id: 'saas', name: 'SaaS', icon: BarChart3 },
  { id: 'healthcare', name: 'Healthcare', icon: Users },
  { id: 'startup', name: 'Startups', icon: Zap },
]

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedCategory)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const ProjectCard = useCallback(
    ({ project }: { project: Project }) => (
      <motion.div
        layout
        variants={fadeIn}
        className="group cursor-pointer"
        onClick={() => setSelectedProject(project)}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
          <div className="aspect-video relative">
            <img
              src={project.image}
              alt={`${project.title} - ${project.subtitle}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-purple-600/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                {categories.find((cat) => cat.id === project.category)?.name}
              </span>
            </div>

            {/* Stats overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex gap-4 text-white text-sm">
                {project.stats.revenue && (
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{project.stats.revenue}</span>
                  </div>
                )}
                {project.stats.users && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{project.stats.users}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-gray-400 mb-4">{project.subtitle}</p>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-gray-500 text-xs">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-400 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {project.timeline}
              </div>
              <ExternalLink className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
            </div>
          </div>
        </div>
      </motion.div>
    ),
    []
  )

  const ProjectModal = useCallback(() => {
    if (!selectedProject) return null

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {
                    categories.find(
                      (cat) => cat.id === selectedProject.category
                    )?.name
                  }
                </span>
                <span className="text-gray-400 text-sm">
                  {selectedProject.timeline}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-white mb-2">
                {selectedProject.title}
              </h2>
              <p className="text-xl text-gray-400 mb-6">
                {selectedProject.subtitle}
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Challenge
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedProject.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Solution
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedProject.results.map((result, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-purple-400 mb-1">
                        {result.value}
                      </div>
                      <div className="text-white font-medium mb-1">
                        {result.metric}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {result.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProject.testimonial && (
                <div className="bg-gray-800 p-6 rounded-xl">
                  <blockquote className="text-gray-300 italic mb-4">
                    "{selectedProject.testimonial.quote}"
                  </blockquote>
                  <div className="text-white font-medium">
                    {selectedProject.testimonial.author}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {selectedProject.testimonial.position}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }, [selectedProject])

  return (
    <>
      <Head>
        <title>Our Work - Void Creative Studio | $10M+ Revenue Generated</title>
        <meta
          name="description"
          content="See how we've helped 50+ clients build successful digital products. From FinTech platforms to e-commerce stores - real results, real revenue."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Portfolio - Void Creative Studio" />
        <meta
          property="og:description"
          content="50+ successful projects, $10M+ revenue generated. See our case studies."
        />
        <link rel="canonical" href="https://voidcreative.studio/portfolio" />
      </Head>

      <Header />

      <main className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-indigo-900/20" />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  onClick={() => window.history.back()}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Go back to previous page"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
              </div>

              <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Our Work
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                Real projects, real results. See how we've transformed ideas
                into profitable businesses.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-sm">Projects Completed</div>
                </div>
                <div className="w-px h-8 bg-gray-600" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">$10M+</div>
                  <div className="text-sm">Revenue Generated</div>
                </div>
                <div className="w-px h-8 bg-gray-600" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-sm">Client Satisfaction</div>
                </div>
              </div>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                )
              })}
            </motion.div>

            {/* Projects Grid */}
            <motion.div
              layout
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-purple-900/30 via-black to-indigo-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Join Our Success Stories?
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                Let's transform your idea into the next profitable business.
                Join 50+ successful founders who chose Void.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                <a
                  href="/start-project"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-12 py-6 rounded-full font-bold text-xl shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 hover:scale-105"
                >
                  Start Your Project
                </a>

                <a
                  href="/#contact"
                  className="border-2 border-white/30 text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200"
                >
                  Get Free Consultation
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <ProjectModal />
    </>
  )
}
