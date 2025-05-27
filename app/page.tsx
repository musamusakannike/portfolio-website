"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Code, Smartphone, Server, Globe, ChevronDown, X, Calendar, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import projectsData from "@/data/projects.json"
import blogsData from "@/data/blogs.json"
import { Mail, Send, User, MessageSquare, Star, Quote, Code2, Database, SmartphoneIcon, Globe2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Project = {
  id: string
  title: string
  description: string
  githubRepo: string
  siteUrl: string
  toolsUsed: string[]
  imageUrl: string
  category: string
  featured: boolean
  completionDate: string
  challenges: string
}

type BlogPost = {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedDate: string
  readTime: string
  tags: string[]
  imageUrl: string
  featured: boolean
  category: string
}

type Testimonial = {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

type Skill = {
  name: string
  level: number
  category: string
  icon: React.ComponentType<{ className?: string }>
}

type ProjectCategory = "all" | "frontend" | "backend" | "mobile" | "fullstack"

const categories = [
  { id: "all", label: "All Projects", icon: Globe },
  { id: "frontend", label: "Frontend", icon: Code },
  { id: "backend", label: "Backend", icon: Server },
  { id: "mobile", label: "Mobile", icon: Smartphone },
  { id: "fullstack", label: "Full Stack", icon: Globe },
]

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp Inc.",
    content:
      "Working with codiac was an absolute pleasure. His attention to detail and ability to translate complex requirements into elegant solutions is remarkable. The mobile app he developed exceeded our expectations.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CTO",
    company: "StartupXYZ",
    content:
      "codiac delivered a full-stack solution that was both scalable and maintainable. His expertise in React and Node.js helped us launch our product ahead of schedule. Highly recommended!",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Design Lead",
    company: "Creative Agency",
    content:
      "The collaboration with codiac was seamless. He perfectly implemented our designs with pixel-perfect precision and added thoughtful animations that enhanced the user experience.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "4",
    name: "David Thompson",
    role: "Founder",
    company: "E-commerce Platform",
    content:
      "codiac's full-stack development skills are exceptional. He built our entire e-commerce platform from scratch, handling everything from the React frontend to the Node.js backend with MongoDB.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

const skills: Skill[] = [
  { name: "React", level: 95, category: "Frontend", icon: Code2 },
  { name: "React Native", level: 90, category: "Mobile", icon: SmartphoneIcon },
  { name: "Next.js", level: 92, category: "Frontend", icon: Globe2 },
  { name: "TypeScript", level: 88, category: "Frontend", icon: Code2 },
  { name: "Node.js", level: 90, category: "Backend", icon: Server },
  { name: "Express", level: 85, category: "Backend", icon: Server },
  { name: "MongoDB", level: 87, category: "Backend", icon: Database },
  { name: "Tailwind CSS", level: 93, category: "Frontend", icon: Code2 },
  { name: "JavaScript", level: 95, category: "Frontend", icon: Code2 },
  { name: "HTML/CSS", level: 96, category: "Frontend", icon: Code2 },
  { name: "Git", level: 89, category: "Tools", icon: Code2 },
  { name: "REST APIs", level: 91, category: "Backend", icon: Server },
]

const FloatingIcon = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      className="absolute text-blue-300/20 text-2xl"
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: [0, 1, 0],
        y: [-100, -200, -300],
        x: [0, 50, -30, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    >
      {children}
    </motion.div>
  )
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null)

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const getAllProjects = (): Project[] => {
    return [...projectsData.frontend, ...projectsData.backend, ...projectsData.mobile, ...projectsData.fullstack]
  }

  const getFilteredProjects = (): Project[] => {
    if (activeCategory === "all") {
      return getAllProjects()
    }
    return projectsData[activeCategory] || []
  }

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setContactForm({ name: "", email: "", message: "" })
    setIsSubmitting(false)

    // You can integrate with your preferred email service here
    alert("Thank you for your message! I'll get back to you soon.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-black"></div>
        {/* Floating Icons */}
        {isLoaded && (
          <>
            <FloatingIcon delay={0}>🚀</FloatingIcon>
            <FloatingIcon delay={1}>⭐</FloatingIcon>
            <FloatingIcon delay={2}>🛸</FloatingIcon>
            <FloatingIcon delay={3}>💫</FloatingIcon>
            <FloatingIcon delay={4}>🌟</FloatingIcon>
            <FloatingIcon delay={5}>{"</>"}</FloatingIcon>
            <FloatingIcon delay={6}>{"{ }"}</FloatingIcon>
            <FloatingIcon delay={7}>🔧</FloatingIcon>
          </>
        )}
      </div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative z-10 min-h-screen flex items-center justify-center px-4"
        style={{ y, opacity }}
      >
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold font-['Poppins'] mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              codiac
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-['Poppins'] mb-2">Musa Musa Kannike</p>
            <p className="text-lg md:text-xl text-gray-400 font-mono">Fullstack Web & Mobile Developer</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mb-12"
          >
            <p className="text-lg md:text-xl text-gray-300 font-['Poppins'] leading-relaxed max-w-3xl mx-auto">
              Crafting digital experiences across web and mobile platforms with modern technologies. Specializing in
              React, React Native, Next.js, Node.js, and MongoDB.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {["HTML", "CSS", "Tailwind CSS", "React", "React Native", "Next.js", "Node.js", "Express", "MongoDB"].map(
              (tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                >
                  <Badge
                    variant="outline"
                    className="px-4 py-2 text-sm font-mono border-purple-400/50 text-purple-300 hover:bg-purple-400/10 transition-colors"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ),
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <Button
              onClick={scrollToProjects}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-['Poppins'] px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Explore My Work
              <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-['Poppins'] mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              My Projects
            </h2>
            <p className="text-xl text-gray-300 font-['Poppins'] max-w-2xl mx-auto">
              A showcase of my work across different technologies and platforms
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as ProjectCategory)}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={`px-6 py-3 font-['Poppins'] transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "border-purple-400/50 text-purple-300 hover:bg-purple-400/10"
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {category.label}
                </Button>
              )
            })}
          </motion.div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {getFilteredProjects().map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <Card className="bg-slate-800/50 border-purple-400/20 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300 overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {project.featured && (
                        <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold font-['Poppins'] mb-3 text-white group-hover:text-purple-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 font-['Poppins'] mb-4 line-clamp-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.toolsUsed.slice(0, 3).map((tool) => (
                          <Badge
                            key={tool}
                            variant="outline"
                            className="text-xs font-mono border-blue-400/50 text-blue-300"
                          >
                            {tool}
                          </Badge>
                        ))}
                        {project.toolsUsed.length > 3 && (
                          <Badge variant="outline" className="text-xs font-mono border-gray-400/50 text-gray-400">
                            +{project.toolsUsed.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-3">
                        {project.githubRepo !== "private" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-purple-400/50 text-purple-300 hover:bg-purple-400/10"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(project.githubRepo, "_blank")
                            }}
                          >
                            <Github className="h-4 w-4 mr-1" />
                            Code
                          </Button>
                        )}
                        {project.siteUrl !== "private" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-400/50 text-blue-300 hover:bg-blue-400/10"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(project.siteUrl, "_blank")
                            }}
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Live
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative z-10 py-20 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-['Poppins'] mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <p className="text-xl text-gray-300 font-['Poppins'] max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-purple-400/20 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <Icon className="h-6 w-6 text-purple-400 mr-3" />
                    <h3 className="text-lg font-semibold font-['Poppins'] text-white">{skill.name}</h3>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                      <span className="font-mono">{skill.category}</span>
                      <span className="font-mono">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-['Poppins'] mb-6 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              Latest Blog Posts
            </h2>
            <p className="text-xl text-gray-300 font-['Poppins'] max-w-2xl mx-auto">
              Sharing knowledge and insights from my development journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogsData.posts.slice(0, 6).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => setSelectedBlog(post)}
              >
                <Card className="bg-slate-800/50 border-orange-400/20 backdrop-blur-sm hover:border-orange-400/50 transition-all duration-300 overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.imageUrl || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {post.featured && (
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold">
                        Featured
                      </Badge>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <Badge
                        variant="outline"
                        className="bg-black/50 border-orange-400/50 text-orange-300 font-mono text-xs"
                      >
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold font-['Poppins'] mb-3 text-white group-hover:text-orange-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 font-['Poppins'] mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs font-mono border-blue-400/50 text-blue-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-400 font-mono">
                      <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-['Poppins'] mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Client Testimonials
            </h2>
            <p className="text-xl text-gray-300 font-['Poppins'] max-w-2xl mx-auto">
              What clients say about working with me
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="bg-slate-800/50 border-yellow-400/20 backdrop-blur-sm hover:border-yellow-400/50 transition-all duration-300 p-6 h-full">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <Quote className="h-8 w-8 text-yellow-400 mr-3" />
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 font-['Poppins'] mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 border-2 border-yellow-400/30"
                      />
                      <div>
                        <h4 className="text-white font-semibold font-['Poppins']">{testimonial.name}</h4>
                        <p className="text-gray-400 font-mono text-sm">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-['Poppins'] mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 font-['Poppins'] max-w-2xl mx-auto">
              Ready to start your next project? Let's discuss how we can work together to bring your ideas to life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-800/50 border-cyan-400/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 font-['Poppins']">Your Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="pl-10 bg-slate-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 font-['Poppins']"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 font-['Poppins']">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="pl-10 bg-slate-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 font-['Poppins']"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 font-['Poppins']">Message</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Textarea
                        required
                        rows={6}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="pl-10 bg-slate-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 font-['Poppins'] resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-['Poppins'] px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
                <div className="mt-8 pt-8 border-t border-gray-600 text-center">
                  <p className="text-gray-300 font-['Poppins'] mb-2">Or reach me directly at:</p>
                  <a
                    href="mailto:musamusakannike@gmail.com"
                    className="text-cyan-400 hover:text-cyan-300 font-mono text-lg transition-colors"
                  >
                    musamusakannike@gmail.com
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-purple-400/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.imageUrl || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-4 right-4 bg-black/50 border-white/20 text-white hover:bg-black/70"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                {selectedProject.featured && (
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold">
                    Featured Project
                  </Badge>
                )}
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-bold font-['Poppins'] mb-4 text-white">{selectedProject.title}</h2>

                <p className="text-gray-300 font-['Poppins'] text-lg leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold font-['Poppins'] mb-3 text-purple-300 flex items-center">
                      <Wrench className="mr-2 h-5 w-5" />
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.toolsUsed.map((tool) => (
                        <Badge key={tool} variant="outline" className="font-mono border-blue-400/50 text-blue-300">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold font-['Poppins'] mb-3 text-purple-300 flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      Project Details
                    </h3>
                    <p className="text-gray-300 font-mono text-sm mb-2">
                      Completed: {new Date(selectedProject.completionDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-300 font-mono text-sm">Category: {selectedProject.category}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold font-['Poppins'] mb-3 text-purple-300">
                    Challenges & Solutions
                  </h3>
                  <p className="text-gray-300 font-['Poppins'] leading-relaxed">{selectedProject.challenges}</p>
                </div>

                <div className="flex gap-4">
                  {selectedProject.githubRepo !== "private" && (
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-['Poppins']"
                      onClick={() => window.open(selectedProject.githubRepo, "_blank")}
                    >
                      <Github className="mr-2 h-5 w-5" />
                      View Code
                    </Button>
                  )}
                  {selectedProject.siteUrl !== "private" && (
                    <Button
                      variant="outline"
                      className="border-blue-400/50 text-blue-300 hover:bg-blue-400/10 font-['Poppins']"
                      onClick={() => window.open(selectedProject.siteUrl, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog Detail Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-orange-400/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedBlog.imageUrl || "/placeholder.svg"}
                  alt={selectedBlog.title}
                  className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-4 right-4 bg-black/50 border-white/20 text-white hover:bg-black/70"
                  onClick={() => setSelectedBlog(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                {selectedBlog.featured && (
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold">
                    Featured Post
                  </Badge>
                )}
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Badge variant="outline" className="border-orange-400/50 text-orange-300 font-mono">
                    {selectedBlog.category}
                  </Badge>
                  <span className="text-gray-400 font-mono text-sm">
                    {new Date(selectedBlog.publishedDate).toLocaleDateString()}
                  </span>
                  <span className="text-gray-400 font-mono text-sm">{selectedBlog.readTime}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold font-['Poppins'] mb-6 text-white">
                  {selectedBlog.title}
                </h1>

                <p className="text-gray-300 font-['Poppins'] text-lg leading-relaxed mb-6">{selectedBlog.excerpt}</p>

                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 font-['Poppins'] leading-relaxed whitespace-pre-line">
                    {selectedBlog.content}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-600">
                  <h3 className="text-lg font-semibold font-['Poppins'] mb-4 text-orange-300">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBlog.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-blue-400/50 text-blue-300 font-mono">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-purple-400/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold font-['Poppins'] mb-4 text-white">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-gray-300 font-['Poppins'] mb-6">
              Ready to bring your ideas to life? Let's connect and create something extraordinary.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                className="border-purple-400/50 text-purple-300 hover:bg-purple-400/10 font-['Poppins']"
                onClick={() => window.open("mailto:codiac@example.com", "_blank")}
              >
                Get In Touch
              </Button>
              <Button
                variant="outline"
                className="border-blue-400/50 text-blue-300 hover:bg-blue-400/10 font-['Poppins']"
                onClick={() => window.open("https://github.com/codiac", "_blank")}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
