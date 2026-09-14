import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ExternalLink,
  Github,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Sun,
  X
} from 'lucide-react'
import { projects } from './data/projects'

const reveal = {
  hidden: {
    opacity: 0,
    y: 24
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const staggerItem = {
  hidden: {
    opacity: 0,
    y: 16
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const navItems = [
  ['About', 'about'],
  ['Skills', 'skills'],
  ['Work', 'work'],
  ['Contact', 'contact']
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const [lightMode, setLightMode] = useState(
    () => localStorage.getItem('drashti-theme') === 'light'
  )

  /* ---------------------------------------------
     Scroll tracking
  --------------------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight

      setScrollProgress(
        maxScroll > 0
          ? (window.scrollY / maxScroll) * 100
          : 0
      )
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true
    })

    window.addEventListener('resize', handleScroll, {
      passive: true
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  /* ---------------------------------------------
     Light / Dark mode
  --------------------------------------------- */
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      lightMode ? 'light' : 'dark'
    )

    localStorage.setItem(
      'drashti-theme',
      lightMode ? 'light' : 'dark'
    )
  }, [lightMode])

  /* ---------------------------------------------
     Smooth section navigation
  --------------------------------------------- */
  const go = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: 'smooth'
      })

    setMenuOpen(false)
  }

  return (
    <div className="site-shell">

      {/* Scroll progress */}
      <div className="scroll-progress">
        <span
          style={{
            transform: `scaleX(${scrollProgress / 100})`
          }}
        />
      </div>

      {/* Ambient background */}
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* ---------------------------------------------
          NAVBAR
      --------------------------------------------- */}
      <header
        className={`navbar ${
          scrolled ? 'navbar-scrolled' : ''
        }`}
      >

        {/* Brand */}
        <button
          className="brand"
          onClick={() => go('home')}
          aria-label="Home"
        >
          <span className="brand-mark">
            D
          </span>

          <span>
            Drashti
            <span className="brand-dot">
              .
            </span>
          </span>
        </button>

        {/* Desktop navigation */}
        <nav className="desktop-nav">
          {navItems.map(([label, id]) => (
            <button
              key={id}
              onClick={() => go(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Navbar actions */}
        <div className="nav-actions">

          {/* Theme toggle */}
          <button
            className="theme-toggle"
            onClick={() =>
              setLightMode((value) => !value)
            }
            aria-label={
              lightMode
                ? 'Switch to dark mode'
                : 'Switch to light mode'
            }
            title={
              lightMode
                ? 'Dark mode'
                : 'Light mode'
            }
          >
            {lightMode ? (
              <Moon size={16} />
            ) : (
              <Sun size={16} />
            )}
          </button>

          {/* Resume */}
          <a
            className="nav-resume"
            href="/resume.html"
            target="_blank"
            rel="noreferrer"
          >
            Resume
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile menu */}
          <button
            className="menu-button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Menu"
          >
            {menuOpen ? (
              <X />
            ) : (
              <Menu />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{
                opacity: 0,
                y: -8
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -8
              }}
            >

              {navItems.map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => go(id)}
                >
                  {label}
                </button>
              ))}

              <a
                href="/resume.html"
                target="_blank"
                rel="noreferrer"
              >
                Resume
              </a>

              <button
                className="mobile-theme"
                onClick={() =>
                  setLightMode((value) => !value)
                }
              >
                {lightMode ? (
                  <>
                    <Moon size={15} />
                    Dark mode
                  </>
                ) : (
                  <>
                    <Sun size={15} />
                    Light mode
                  </>
                )}
              </button>

            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ---------------------------------------------
          MAIN
      --------------------------------------------- */}
      <main>

        {/* ---------------------------------------------
            HERO
        --------------------------------------------- */}
        <section
          id="home"
          className="hero section-pad"
        >
          <div className="hero-grid">

            {/* Hero text */}
            <motion.div
              variants={reveal}
              initial="hidden"
              animate="show"
              className="hero-copy"
            >

              <div className="eyebrow">
                <span className="status-dot" />
                Available for frontend opportunities
              </div>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 18
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                I build digital{' '}
                <span className="gradient-text">
                  experiences
                </span>{' '}
                people remember.
              </motion.h1>

              <motion.p
                className="hero-lead"
                initial={{
                  opacity: 0,
                  y: 14
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.22,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                I’m{' '}
                <strong>
                  Drashti Dudhat
                </strong>
                , a Frontend Developer focused on
                polished, responsive React interfaces
                with thoughtful interactions and clean
                architecture.
              </motion.p>

              {/* Hero buttons */}
              <motion.div
                className="hero-actions"
                initial={{
                  opacity: 0,
                  y: 12
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.55,
                  delay: 0.32,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <button
                  className="primary-btn"
                  onClick={() => go('work')}
                >
                  View selected work
                  <ArrowDownRight size={18} />
                </button>

                <button
                  className="text-btn"
                  onClick={() => go('contact')}
                >
                  Let’s connect
                  <ArrowUpRight size={17} />
                </button>
              </motion.div>

              {/* Tech stack */}
              <motion.div
                className="hero-stack"
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.42
                }}
              >
                <span>React</span>
                <i />

                <span>JavaScript</span>
                <i />

                <span>Tailwind CSS</span>
                <i />

                <span>Node.js</span>
              </motion.div>

            </motion.div>

            {/* -----------------------------------------
                HERO VISUAL
            ----------------------------------------- */}
            <motion.div
              variants={reveal}
              initial="hidden"
              animate="show"
              className="hero-visual"
            >

              <motion.div
                className="hero-card"
                whileHover={{
                  y: -5,
                  rotate: 0
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >

                {/* Only FRONTEND — 01 removed */}
                <div className="card-topline">
                  <span>
                    FRONTEND
                  </span>
                </div>

                {/* Animated orb */}
                <motion.div
                  className="hero-orb"
                  animate={{
                    rotate: [
                      0,
                      2,
                      0,
                      -2,
                      0
                    ],
                    scale: [
                      1,
                      1.025,
                      1
                    ]
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <div className="orb-core">
                    D
                  </div>
                </motion.div>

                <div className="hero-card-bottom">
                  <span>
                    React Developer
                  </span>
                </div>

              </motion.div>

            </motion.div>

          </div>
        </section>

        {/* ---------------------------------------------
            ABOUT
        --------------------------------------------- */}
        <section
          id="about"
          className="section-pad about-section"
        >
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.2
            }}
            className="about-grid"
          >

            <div>
              <span className="section-kicker">
                About
              </span>

              <h2>
                Design sensitivity.
                <br />
                <em>
                  Engineering discipline.
                </em>
              </h2>
            </div>

            <div className="about-copy">

              <p className="large-copy">
                I enjoy turning ideas into interfaces
                that feel simple, intentional and
                genuinely useful.
              </p>

              <p>
                I’m a fresher focused on frontend
                development with React and modern
                JavaScript. I care about the details
                users notice: spacing, hierarchy,
                states, responsiveness, feedback
                and performance.
              </p>

              <p>
                My goal is straightforward — build
                interfaces that look premium, work
                reliably and make the product easier
                to understand.
              </p>

              <div className="principles">
                {[
                  'Clarity over clutter',
                  'Responsive by default',
                  'Accessible interactions',
                  'Reusable components'
                ].map((item) => (
                  <div key={item}>
                    <Check size={16} />
                    {item}
                  </div>
                ))}
              </div>

            </div>

          </motion.div>
        </section>

        {/* ---------------------------------------------
            SKILLS
        --------------------------------------------- */}
        <section
          id="skills"
          className="section-pad skills-section"
        >

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.2
            }}
            className="section-heading"
          >

            <div>
              <span className="section-kicker">
                Technical skills
              </span>

              <h2>
                Tools I use
                <br />
                <em>
                  to build.
                </em>
              </h2>
            </div>

            <p>
              My core technologies, shown clearly
              and individually so recruiters can
              quickly see the tools I work with.
            </p>

          </motion.div>

          <div className="skills-grid">

            {[
              ['01', 'React.js'],
              ['02', 'JavaScript'],
              ['03', 'HTML5'],
              ['04', 'CSS3'],
              ['05', 'Tailwind CSS'],
              ['06', 'Node.js'],
              ['07', 'MongoDB'],
              ['08', 'Vite'],
              ['09', 'Git / GitHub']
            ].map(([number, title], index) => (

              <motion.div
                className="skill-card"
                key={title}
                variants={staggerItem}
                initial="hidden"
                whileInView="show"
                viewport={{
                  once: true,
                  amount: 0.15
                }}
                whileHover={{
                  y: -7,
                  scale: 1.015
                }}
                transition={{
                  duration: 0.28,
                  delay: index * 0.055,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <span>
                  {number}
                </span>

                <h3>
                  {title}
                </h3>
              </motion.div>

            ))}

          </div>
        </section>

        {/* ---------------------------------------------
            WORK / PROJECTS
        --------------------------------------------- */}
        <section
          id="work"
          className="section-pad work-section"
        >

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.2
            }}
            className="section-heading"
          >

            <div>
              <span className="section-kicker">
                Selected work
              </span>

              <h2>
                Small list.
                <em>
                  Strong proof.
                </em>
              </h2>
            </div>

            <p>
              Two focused projects that show how I
              approach product interfaces, interaction
              and frontend execution.
            </p>

          </motion.div>

          <div className="projects-list">

            {projects.map((project) => (

              <motion.article
                key={project.id}
                className={`project-card ${project.gradient}`}
                variants={reveal}
                whileHover={{
                  y: -8,
                  scale: 1.005
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1]
                }}
                initial="hidden"
                whileInView="show"
                viewport={{
                  once: true,
                  amount: 0.18
                }}
              >

                {/* Project preview */}
                <div className="project-preview">

                  <motion.div
                    className="preview-window"
                    whileHover={{
                      scale: 1.015,
                      rotate: 0
                    }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >

                    <div className="window-bar">
                      <span />
                      <span />
                      <span />

                      <b>
                        {project.name}
                      </b>
                    </div>

                    <div className="mock-layout">

                      <div className="mock-sidebar" />

                      <div className="mock-content">

                        <div className="mock-title" />

                        <div className="mock-line" />

                        <div className="mock-grid">
                          <span />
                          <span />
                          <span />
                        </div>

                      </div>

                    </div>

                  </motion.div>

                  <div className="preview-label">
                    {project.number}
                  </div>

                </div>

                {/* Project information */}
                <div className="project-info">

                  <div className="project-meta">
                    <span>
                      {project.category}
                    </span>

                    <span>
                      {project.year}
                    </span>
                  </div>

                  <h3>
                    {project.name}
                  </h3>

                  <p>
                    {project.description}
                  </p>

                  <div className="tag-row">
                    {project.stack.map((stack) => (
                      <span key={stack}>
                        {stack}
                      </span>
                    ))}
                  </div>

                  <div className="project-actions">

                    <a
                      href={project.live}
                      target={
                        project.live === '#'
                          ? undefined
                          : '_blank'
                      }
                      rel="noreferrer"
                      className="project-link"
                    >
                      Live project
                      <ExternalLink size={16} />
                    </a>

                    <button
                      className="case-link"
                      onClick={() =>
                        setActiveProject(project)
                      }
                    >
                      View case study
                      <ArrowUpRight size={16} />
                    </button>

                  </div>

                </div>

              </motion.article>

            ))}

          </div>
        </section>

        {/* ---------------------------------------------
            PROCESS
        --------------------------------------------- */}
        <section className="process-section">

          <div className="section-pad">

            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{
                once: true,
                amount: 0.2
              }}
              className="process-inner"
            >

              <div>

                <span className="section-kicker">
                  How I work
                </span>

                <h2>
                  From first idea
                  <br />
                  <em>
                    to shipped interface.
                  </em>
                </h2>

              </div>

              <div className="process-list">

                {[
                  [
                    '01',
                    'Understand',
                    'Clarify the user, goal and product context.'
                  ],
                  [
                    '02',
                    'Structure',
                    'Turn requirements into a clean, scalable interface system.'
                  ],
                  [
                    '03',
                    'Build',
                    'Develop responsive components with reusable patterns.'
                  ],
                  [
                    '04',
                    'Refine',
                    'Polish states, accessibility, performance and visual details.'
                  ]
                ].map(([number, title, description]) => (

                  <div
                    className="process-row"
                    key={number}
                  >

                    <span>
                      {number}
                    </span>

                    <strong>
                      {title}
                    </strong>

                    <p>
                      {description}
                    </p>

                  </div>

                ))}

              </div>

            </motion.div>

          </div>

        </section>

        {/* ---------------------------------------------
            CONTACT
        --------------------------------------------- */}
        <section
          id="contact"
          className="section-pad contact-section"
        >

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.2
            }}
            className="contact-card"
          >

            <div className="contact-glow" />

            <span className="section-kicker">
              Contact
            </span>

            <h2>
              Have a product
              <br />
              <em>
                worth building?
              </em>
            </h2>

            <p>
              I’m open to frontend developer
              opportunities, internships and
              interesting product work.
            </p>

            <a
              className="primary-btn contact-btn"
              href="mailto:dudhatdrashti28@gmail.com"
            >
              Start a conversation
              <Mail size={18} />
            </a>

            <div className="socials">

              <a
                href="https://github.com/dudhatdrashti"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={18} />
                GitHub
              </a>

              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>

              <a
                href="mailto:dudhatdrashti28@gmail.com"
              >
                <Mail size={18} />
                Email
              </a>

            </div>

          </motion.div>

        </section>

      </main>

      {/* ---------------------------------------------
          FOOTER
      --------------------------------------------- */}
      <footer className="footer">

        <span>
          © {new Date().getFullYear()} Drashti Dudhat
        </span>

        <span>
          Built with React & care.
        </span>

      </footer>

      {/* ---------------------------------------------
          CASE STUDY MODAL
      --------------------------------------------- */}
      <AnimatePresence>

        {activeProject && (

          <motion.div
            className="modal-backdrop"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            onClick={() =>
              setActiveProject(null)
            }
          >

            <motion.div
              className="case-modal"
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: 20
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <button
                className="close-modal"
                onClick={() =>
                  setActiveProject(null)
                }
                aria-label="Close"
              >
                <X />
              </button>

              <span className="section-kicker">
                {activeProject.category}
              </span>

              <h2>
                {activeProject.name}
              </h2>

              <p className="modal-lead">
                {activeProject.longDescription}
              </p>

              <div className="modal-highlights">

                {activeProject.highlights.map(
                  (highlight) => (
                    <div key={highlight}>
                      <Check size={16} />
                      {highlight}
                    </div>
                  )
                )}

              </div>

              <div className="tag-row modal-tags">

                {activeProject.stack.map(
                  (stack) => (
                    <span key={stack}>
                      {stack}
                    </span>
                  )
                )}

              </div>

              <div className="modal-links">

                <a
                  href={activeProject.live}
                  target={
                    activeProject.live === '#'
                      ? undefined
                      : '_blank'
                  }
                  rel="noreferrer"
                >
                  Open live project
                  <ExternalLink size={16} />
                </a>

                <a
                  href={activeProject.github}
                  target={
                    activeProject.github === '#'
                      ? undefined
                      : '_blank'
                  }
                  rel="noreferrer"
                >
                  View GitHub
                  <Github size={16} />
                </a>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  )
}