import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import decoration from '../../../assets/decoration.webp';
import { fadeUp } from '../../comp/animation';
import {
  Bot,
  Rocket,
  Calendar,
  Cpu,
  Activity,
  Shield
} from 'lucide-react';

const clubsData = [
  {
    id: 'ai-robotics',
    title: 'LBEF AI & Robotics Club',
    icon: Bot,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    content: {
      intro: 'The LBEF AI & Robotics Club empowers students to become leaders in AI, machine learning, robotics, and automation, fostering innovation to address real-world challenges. It provides a collaborative space for students to learn, innovate, and develop skills through projects, workshops, competitions, and industry engagement.',
      vision: 'To empower students as leaders in AI, machine learning, robotics, and automation, fostering innovation to address real-world challenges.',
      mission: 'To create a collaborative space for students to learn, innovate, and develop skills in AI and robotics through projects, workshops, competitions, and industry engagement.',
      leadership: [
        'President: Leads strategy, represents the club, and ensures alignment with goals.',
        'Vice President: Assists the president, handles internal coordination, and manages feedback.',
        'Secretary: Manages documentation, scheduling, and communications.',
        'Treasurer: Oversees budget, fundraising, and financial reporting.',
        'Graphic Designer: Creates visual content for promotions, events, and club branding.',
        'Public Relations Officer: Handles promotion, social media, and partnerships.',
        'Event Coordinator: Plans and executes events and competitions.'
      ],
      activities: [
        'Workshops: Introductory and advanced sessions on AI/ML tools and robotics.',
        'Projects: Group and capstone projects tackling real-world issues, with quarterly showcases.',
        'Competitions: Intra-club hackathons, coding challenges, and coordination for participation in external events.',
        'Guest Lectures & Industry Ties: Expert talks, site visits, and mentorship programs.',
        'Community Outreach: STEM workshops for schools, open-source contributions, and social impact initiatives.',
        'Networking: Peer mentorship and interdisciplinary collaborations.'
      ]
    }
  },
  {
    id: 'startup',
    title: 'LBEF Startup & Innovation Hub',
    icon: Rocket,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    content: {
      intro: 'The LBEF Startup & Innovation Hub inspires and empowers students to become innovative entrepreneurs and startup leaders, driving impactful solutions for global challenges through creativity and technology.',
      vision: 'To inspire and empower students to become innovative entrepreneurs and startup leaders, driving impactful solutions for global challenges through creativity and technology.',
      mission: 'To foster a dynamic ecosystem where students can ideate, develop, and launch startups by providing resources, mentorship, workshops, and networking opportunities.',
      leadership: [
        'President: Sets strategic vision, represents the hub, and ensures alignment with objectives.',
        'Vice President: Supports the president, coordinates internal activities, and manages member feedback.',
        'Secretary: Handles documentation, meeting schedules, and communications.',
        'Treasurer: Manages budget, secures funding, and provides financial transparency.',
        'Graphic Designer: Designs promotional materials, branding, and visual content for events.',
        'Public Relations Officer: Manages outreach, social media, and external partnerships.',
        'Event Coordinator: Organizes workshops, pitch events, and networking sessions.'
      ],
      activities: [
        'Workshops: Training on startup fundamentals, pitching, business modeling, and emerging technologies.',
        'Startup Projects: Collaborative and individual projects to develop prototypes and business plans.',
        'Mentorship & Industry Engagement: Guest lectures from entrepreneurs, industry visits, and one-on-one mentorship.',
        'Community Impact: Initiatives to support local startups, open-source projects, and social entrepreneurship.',
        'Networking: Events to connect with peers, alumni, investors, and industry professionals.'
      ]
    }
  },
  {
    id: 'eventos',
    title: 'LBEF EventOS & Impact Circle',
    icon: Calendar,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    content: {
      intro: 'The LBEF EventOS & Impact Circle creates a vibrant platform that inspires students to organize impactful events and drive positive change through community engagement, creativity, and collaboration.',
      vision: 'To create a vibrant platform that inspires students to organize impactful events and drive positive change through community engagement, creativity, and collaboration.',
      mission: 'To cultivate an inclusive environment where students can plan, execute, and participate in meaningful events, fostering leadership, social responsibility, and innovation.',
      leadership: [
        'President: Defines the strategic direction, oversees event execution, and represents the circle.',
        'Vice President: Assists the president, coordinates team efforts, and gathers member input.',
        'Secretary: Maintains records, manages event schedules, and handles internal communications.',
        'Treasurer: Oversees budgeting, secures funding, and ensures financial accountability.',
        'Graphic Designer: Creates event branding, promotional materials, and visual content.',
        'Public Relations Officer: Manages publicity, social media, and external collaborations.',
        'Event Coordinator: Plans and executes events, workshops, and community initiatives.'
      ],
      activities: [
        'Workshops: Training on event planning, logistics, marketing, and impact measurement.',
        'Signature Events: Organizing flagship events like cultural festivals, charity drives, and sustainability initiatives.',
        'Community Engagement: Projects to support local communities, environmental causes, and social impact programs.',
        'Mentorship & Industry Connect: Sessions with event management professionals, site visits, and mentorship opportunities.',
        'Networking: Events to connect with peers, alumni, and industry experts in event management.'
      ]
    }
  },
  {
    id: 'software',
    title: 'LBEF Software Architect Club',
    icon: Cpu,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    content: {
      intro: 'The LBEF Software Architect Club inspires and empowers students to design robust, scalable, and innovative software solutions, shaping the future of technology through architectural excellence.',
      vision: 'To inspire and empower students to design robust, scalable, and innovative software solutions, shaping the future of technology through architectural excellence.',
      mission: 'To foster a collaborative environment where students can learn, practice, and innovate in software architecture through workshops, projects, mentorship, and industry engagement.',
      leadership: [
        'President: Sets the strategic vision, represents the club, and ensures alignment with goals.',
        'Vice President: Supports the president, coordinates internal activities, and manages member feedback.',
        'Secretary: Handles documentation, meeting schedules, and communications.',
        'Treasurer: Manages budget, secures funding, and ensures financial transparency.',
        'Technical Lead: Guides technical workshops, project development, and architectural design reviews.',
        'Public Relations Officer: Manages outreach, social media, and partnerships with tech organizations.',
        'Event Coordinator: Organizes workshops, hackathons, and networking events.'
      ],
      activities: [
        'Workshops: Training on software design patterns, system architecture, cloud computing, microservices, and DevOps.',
        'Projects: Collaborative and individual projects to design and prototype software systems.',
        'Mentorship & Industry Engagement: Guest lectures from software architects, industry visits, and one-on-one mentorship.',
        'Community Impact: Initiatives to contribute to open-source projects and promote sustainable software practices.',
        'Networking: Events to connect with peers, alumni, industry professionals, and tech companies.'
      ]
    }
  },
  {
    id: 'fitbyte',
    title: 'LBEF FitByte Club',
    icon: Activity,
    color: 'from-teal-500 to-blue-500',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    content: {
      intro: 'The LBEF FitByte Club empowers students to lead healthier lives by integrating fitness, technology, and community engagement, fostering physical well-being and innovative health solutions.',
      vision: 'To empower students to lead healthier lives by integrating fitness, technology, and community engagement, fostering physical well-being and innovative health solutions.',
      mission: 'To create a dynamic platform where students can explore fitness, leverage technology for health tracking, and build a supportive community through activities, workshops, and collaborative projects.',
      leadership: [
        'President: Sets the strategic vision, leads initiatives, and represents the club.',
        'Vice President: Supports the president, coordinates activities, and collects member feedback.',
        'Secretary: Manages documentation, schedules, and internal communications.',
        'Treasurer: Handles budgeting, secures funding, and ensures financial transparency.',
        'Graphic Designer: Creates promotional materials, branding, and visuals for events and campaigns.',
        'Public Relations Officer: Manages outreach, social media, and partnerships with fitness and tech communities.',
        'Activity Coordinator: Organizes fitness challenges, workshops, and tech-driven health events.'
      ],
      activities: [
        'Workshops: Training on fitness routines, wearable tech, health apps, and nutrition planning.',
        'Fitness Challenges: Group activities like step challenges, yoga sessions, and virtual marathons using fitness trackers.',
        'Tech Projects: Collaborative projects to develop or test health apps, wearable devices, or data-driven fitness solutions.',
        'Mentorship & Industry Engagement: Guest talks from fitness experts, tech innovators, and health professionals.',
        'Community Impact: Initiatives to promote wellness in local communities and charity fitness events.'
      ]
    }
  },
  {
    id: 'cybersecurity',
    title: 'LBEF Cyber Security Club',
    icon: Shield,
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    content: {
      intro: 'The LBEF Cyber Security Club cultivates a community of skilled and ethical cybersecurity enthusiasts who protect digital ecosystems and drive innovative solutions to combat cyber threats.',
      vision: 'To cultivate a community of skilled and ethical cybersecurity enthusiasts who protect digital ecosystems and drive innovative solutions to combat cyber threats.',
      mission: 'To create a vibrant platform for students to learn, practice, and innovate in cybersecurity through hands-on activities, workshops, mentorship, and industry collaboration.',
      leadership: [
        'President: Defines the club\'s strategic direction, represents the club, and aligns activities with its vision.',
        'Vice President: Assists the president, oversees internal coordination, and gathers member feedback.',
        'Secretary: Manages documentation, meeting schedules, and internal/external communications.',
        'Treasurer: Oversees budgeting, secures funding, and ensures financial transparency.',
        'Technical Lead: Guides technical workshops, hackathons, and project development.',
        'Public Relations Officer: Handles outreach, social media, and partnerships with external organizations.',
        'Event Coordinator: Plans cybersecurity workshops, competitions, and networking events.'
      ],
      activities: [
        'Workshops: Training on ethical hacking, penetration testing, cryptography, network security, and incident response.',
        'Capture the Flag (CTF) Competitions: Team-based challenges to develop practical cybersecurity skills.',
        'Projects: Collaborative projects including building secure systems and analyzing vulnerabilities.',
        'Mentorship & Industry Engagement: Guest lectures from cybersecurity professionals and personalized mentorship.',
        'Community Impact: Initiatives to promote cybersecurity awareness and contribute to open-source security tools.',
        'Networking: Events to connect with peers, alumni, cybersecurity experts, and industry leaders.'
      ]
    }
  }
];

const AcademicClub = () => {
  const [activeClub, setActiveClub] = useState(clubsData[0]);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="container mx-auto sm:px-6 lg:px-8 py-4 md:py-12 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100"
            >
              <motion.span
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut" as const
                }}
              />
              <span className="text-blue-600 font-medium text-sm">
                Academic Clubs
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              <span className="text-gray-900">Academic </span>
              <span className="relative inline-block">
                <span className="text-blue-600 relative z-10">Clubs</span>
                <motion.img
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  src={decoration}
                  alt="Decoration"
                  className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:bottom-0 w-full h-2 md:h-3"
                />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Explore our diverse range of academic clubs and programs designed to enhance your learning experience, foster collaboration, and develop essential skills for your future career.
            </motion.p>
          </motion.div>
        </div>

        {/* Club Tabs */}
        <div className="max-w-7xl mx-auto">
          <div className="w-full overflow-x-auto pb-2 mb-8">
            <div className="flex flex-nowrap gap-2 min-w-max px-4">
              {clubsData.map((club, index) => {
                const Icon = club.icon;
                return (
                  <motion.button
                    key={club.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => setActiveClub(club)}
                    className={`shrink-0 flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 ${activeClub.id === club.id
                      ? `${club.bgColor} border-2 ${club.borderColor} shadow-lg scale-[1.02]`
                      : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                  >
                    <div className={`p-1.5 rounded-md bg-linear-to-br ${club.color}`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className={`font-medium text-xs md:text-sm ${activeClub.id === club.id ? 'text-gray-900' : 'text-gray-600'}`}>
                      {club.title.split(' ').slice(0, 3).join(' ')}
                      <br />
                      {club.title.split(' ').slice(3).join(' ')}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Club Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeClub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            >
              {/* Club Header with Join Button */}
              <div className={`p-8 ${activeClub.bgColor} border-b ${activeClub.borderColor}`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-linear-to-br ${activeClub.color}`}>
                      <activeClub.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-3xl font-bold text-gray-900">{activeClub.title}</h2>
                      <div className="h-1 w-20 mt-2 rounded-full bg-linear-to-r from-gray-300 to-transparent" />
                    </div>
                  </div>

                  {/* Join Button on Right Side */}
                  <a
                    href="https://forms.office.com/r/m8Y6kiAF9d"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
                  >
                    <span>Join Club</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {activeClub.content.intro}
                </p>
              </div>

              {/* Club Content */}
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className={`w-2 h-6 rounded-full bg-linear-to-b ${activeClub.color}`} />
                        Vision
                      </h4>
                      <p className="text-gray-600 leading-relaxed pl-4">
                        {activeClub.content.vision}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className={`w-2 h-6 rounded-full bg-linear-to-b ${activeClub.color}`} />
                        Mission
                      </h4>
                      <p className="text-gray-600 leading-relaxed pl-4">
                        {activeClub.content.mission}
                      </p>
                    </div>

                    {/* Three Cards Below Mission */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 pt-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                        <div className={`text-lg font-bold bg-gradient-to-r ${activeClub.color} bg-clip-text text-transparent mb-2`}>
                          Membership
                        </div>
                        <p className="text-gray-600 text-xs">
                          Open to all LBEF students with flexible participation requirements
                        </p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                        <div className={`text-lg font-bold bg-gradient-to-r ${activeClub.color} bg-clip-text text-transparent mb-2`}>
                          Activities
                        </div>
                        <p className="text-gray-600 text-xs">
                          Regular workshops, projects, and networking events
                        </p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                        <div className={`text-lg font-bold bg-gradient-to-r ${activeClub.color} bg-clip-text text-transparent mb-2`}>
                          Leadership
                        </div>
                        <p className="text-gray-600 text-xs">
                          Elected student leadership with faculty guidance
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className={`w-2 h-6 rounded-full bg-gradient-to-b ${activeClub.color}`} />
                        Leadership Team
                      </h4>
                      <ul className="space-y-2 pl-4">
                        {activeClub.content.leadership.map((item, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-start gap-3 text-gray-600"
                          >
                            <div className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-r ${activeClub.color}`} />
                            <span className="text-sm">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className={`w-2 h-6 rounded-full bg-gradient-to-b ${activeClub.color}`} />
                        Key Activities
                      </h4>
                      <ul className="space-y-2 pl-4">
                        {activeClub.content.activities.map((item, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-start gap-3 text-gray-600"
                          >
                            <div className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-r ${activeClub.color}`} />
                            <span className="text-sm">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AcademicClub;