import type { ProfileConfig } from '../models/portfolio.models';
export const PROFILE: ProfileConfig = {
  name: 'Francis Ciril Arulsamy',
  initials: 'FC',
  designations: ['Front-End Architect', 'Angular Architect', 'UI Architect', 'Front-End Manager'],
  tagline:
    "I don't just build UI components. I architect scalable, reusable, high-performance enterprise frontend platforms.",
  summary: [
    'Front-End Architect with 18+ years of experience building scalable web architectures, UI design systems, and reusable UI components across Angular, React, and TypeScript ecosystems.',
    'Experienced in delivering enterprise applications for clients including Eurofins, Cisco, Intel, Visa, and Experian, translating complex business requirements into performant frontend architectures integrated with REST APIs and backend services.',
    'Experienced in setting frontend technology direction, establishing coding standards, conducting code reviews, mentoring engineering teams, and managing frontend development throughout the software delivery lifecycle.',
  ],
  // Leave empty to show the monogram avatar, or drop an image in /public/images and set e.g. '/images/profile.jpg'.
  photoUrl: '',
  // Drop your PDF at /public/documents/<resumeFileName> and it is served directly.
  // If the file is absent, a print-ready resume is generated from the portfolio data.
  resumeUrl: '/documents/Francis-Ciril-Arulsamy-Resume.pdf',
  resumeFileName: 'Francis-Ciril-Arulsamy-Resume.pdf',
  contact: {
    email: 'francis_jeni@yahoo.com', // e.g. 'name@example.com'
    phone: '+91 9738121911', // e.g. '+91 00000 00000'
    location: 'Bangalore, India, 560043',
  },
  social: [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      // Replace with the direct profile URL, e.g. https://www.linkedin.com/in/<handle>
      url: 'https://www.linkedin.com/in/francis-ciril/',
      icon: 'linkedin',
    },
    {
      id: 'github',
      label: 'GitHub',
      // Replace with the direct profile URL, e.g. https://github.com/<handle>
      url: 'https://github.com/cirilinfo-hub',
      icon: 'github',
    },
  ],
};
