'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import {
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Zap,
  Calendar,
  MessageSquare,
  Rocket,
  Shield,
  Star,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

const projectTypes = [
  {
    id: 'mvp',
    title: 'MVP Launch',
    description: 'Get your idea to market fast',
    timeline: '2-4 weeks',
    price: '$5K - $15K',
    features: [
      'Landing page',
      'Core features',
      'Basic integrations',
      'Mobile responsive',
    ],
    icon: Rocket,
  },
  {
    id: 'full-product',
    title: 'Full Product',
    description: 'Complete digital experience',
    timeline: '4-8 weeks',
    price: '$15K - $50K',
    features: [
      'Custom design system',
      'Advanced features',
      'API integrations',
      'Analytics',
    ],
    icon: Zap,
    popular: true,
  },
  {
    id: 'enterprise',
    title: 'Enterprise Solution',
    description: 'Scalable, enterprise-grade',
    timeline: '8-16 weeks',
    price: '$50K - $150K',
    features: [
      'Complex integrations',
      'Custom architecture',
      'Team training',
      'Ongoing support',
    ],
    icon: Shield,
  },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    company: 'TechFlow',
    role: 'Founder',
    quote:
      'Void took our rough idea and turned it into a $2M business in 8 months.',
    avatar: '/images/testimonial-sarah.jpg',
  },
  {
    name: 'Marcus Rodriguez',
    company: 'DataSync',
    role: 'CEO',
    quote: 'Working with Void feels like having a world-class team in-house.',
    avatar: '/images/testimonial-marcus.jpg',
  },
]

export default function StartProject() {
  const [selectedType, setSelectedType] = useState('full-product')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: 'full-product',
    timeline: '',
    budget: '',
    description: '',
    goals: '',
    currentSituation: '',
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [showFAQ, setShowFAQ] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleInputChange = (
    e: React.TargetEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl text-center"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            We Got Your Message!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Our team will review your project and get back to you within 24
            hours with a detailed proposal and next steps.
          </p>
          <div className="bg-purple-600/20 border border-purple-600/30 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-lg mb-2">What happens next?</h3>
            <ul className="text-left space-y-2 text-gray-300">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                We'll analyze your requirements
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                Schedule a strategy call within 24 hours
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                Present a detailed project proposal
              </li>
            </ul>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = '/')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold"
          >
            Back to Home
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Head>
        <title>Start Your Project - Void Creative Studio</title>
        <meta
          name="description"
          content="Transform your idea into a profitable digital product. Get started with Void Creative Studio today."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-indigo-900/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <span className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
              Let's Build Something Amazing
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            Turn Your Idea Into Reality
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            Join 50+ successful founders who've transformed their ideas into
            profitable businesses with our proven process.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                2-6 Weeks
              </div>
              <div className="text-gray-400">Average Launch Time</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                $10M+
              </div>
              <div className="text-gray-400">Client Revenue Generated</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">98%</div>
              <div className="text-gray-400">Client Satisfaction</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Project Types */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Choose Your Path to Success
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projectTypes.map((type) => {
              const IconComponent = type.icon
              return (
                <motion.div
                  key={type.id}
                  variants={fadeInUp}
                  className={`relative p-8 rounded-2xl border-2 transition-all cursor-pointer ${
                    selectedType === type.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-700 bg-gray-900/50 hover:border-purple-400'
                  }`}
                  onClick={() => {
                    setSelectedType(type.id)
                    setFormData((prev) => ({ ...prev, projectType: type.id }))
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {type.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{type.title}</h3>
                      <p className="text-gray-400">{type.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-300">
                      <Clock className="w-4 h-4 mr-2 text-purple-400" />
                      {type.timeline}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <DollarSign className="w-4 h-4 mr-2 text-purple-400" />
                      {type.price}
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-300"
                      >
                        <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Let's Discuss Your Project
            </h2>
            <p className="text-xl text-gray-300">
              Fill out the form below and we'll get back to you within 24 hours
              with a detailed proposal.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-black/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Your Company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Preferred Timeline
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                >
                  <option value="">Select timeline</option>
                  <option value="asap">ASAP (Rush project)</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="2-3-months">2-3 months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                >
                  <option value="">Select budget</option>
                  <option value="5k-15k">$5K - $15K</option>
                  <option value="15k-50k">$15K - $50K</option>
                  <option value="50k-150k">$50K - $150K</option>
                  <option value="150k+">$150K+</option>
                </select>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">
                Project Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Tell us about your project. What are you looking to build?"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">
                Main Goals
              </label>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="What do you want to achieve with this project?"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Send Project Details</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            <p className="text-center text-gray-400 text-sm mt-4">
              We'll respond within 24 hours with a detailed proposal and next
              steps.
            </p>
          </motion.form>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            What Our Clients Say
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400">
                      {testimonial.role} @ {testimonial.company}
                    </p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <blockquote className="text-lg text-gray-300 italic">
                  "{testimonial.quote}"
                </blockquote>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                question: 'How long does a typical project take?',
                answer:
                  'Most projects take 2-8 weeks depending on complexity. MVPs can be delivered in 2-4 weeks, while full products typically take 4-8 weeks. We provide detailed timelines during our initial consultation.',
              },
              {
                question: "What's included in your service?",
                answer:
                  'We provide end-to-end service including strategy, design, development, testing, and deployment. You also get ongoing support, training, and documentation to ensure your success.',
              },
              {
                question:
                  'Do you work with startups or only established companies?',
                answer:
                  'We work with both! From pre-seed startups to established enterprises. Our process and pricing are designed to accommodate different stages of business growth.',
              },
              {
                question:
                  'What if I need changes after the project is complete?',
                answer:
                  'All projects include 30 days of free revisions and bug fixes. We also offer ongoing maintenance packages and can implement new features as your business grows.',
              },
              {
                question: 'How do you ensure project success?',
                answer:
                  "We use a proven process with weekly check-ins, regular demos, and milestone approvals. Our transparent communication and iterative approach ensures you're involved every step of the way.",
              },
              {
                question: 'What technologies do you use?',
                answer:
                  'We use modern, scalable technologies including React, Next.js, TypeScript, Node.js, and cloud platforms like Vercel and AWS. We choose the best tech stack for your specific needs.',
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-black/30 backdrop-blur-xl rounded-xl border border-gray-700 overflow-hidden"
              >
                <button
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors"
                  onClick={() => setShowFAQ(showFAQ === idx ? null : idx)}
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  {showFAQ === idx ? (
                    <ChevronUp className="w-5 h-5 text-purple-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-purple-400" />
                  )}
                </button>

                <AnimatePresence>
                  {showFAQ === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pb-6"
                    >
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-900/30 via-black to-indigo-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Idea?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join the ranks of successful founders who've built profitable
              businesses with our proven process.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-medium">No Upfront Costs</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-medium">
                  100% Satisfaction Guarantee
                </span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-medium">24hr Response Time</span>
              </div>
            </div>

            <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4">
                🚀 Limited Time: $5,000 Off Your First Project
              </h3>
              <p className="text-gray-300 mb-4">
                Book your free strategy call this week and save $5,000 on your
                project. Only 2 spots available for Q4 2025.
              </p>
              <div className="text-sm text-yellow-400 font-medium">
                Offer expires in 7 days
              </div>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 items-center justify-center"
              whileHover={{ scale: 1.02 }}
            >
              <a
                href="#contact-form"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-12 py-6 rounded-full font-bold text-xl shadow-2xl hover:shadow-purple-500/30 transition-all flex items-center space-x-3"
                onClick={(e) => {
                  e.preventDefault()
                  document
                    .querySelector('#contact-form')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <MessageSquare className="w-6 h-6" />
                <span>Claim Your Free Strategy Call</span>
                <ArrowRight className="w-6 h-6" />
              </a>
            </motion.div>

            <p className="text-gray-400 text-sm mt-6">
              * Free 30-minute strategy session • No commitment required •
              Instant calendar booking
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 opacity-60"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center space-x-2"
            >
              <Shield className="w-5 h-5 text-purple-400" />
              <span className="text-sm">SSL Secured</span>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="flex items-center space-x-2"
            >
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm">GDPR Compliant</span>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="flex items-center space-x-2"
            >
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-sm">50+ Happy Clients</span>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="flex items-center space-x-2"
            >
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">4.9/5 Rating</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
