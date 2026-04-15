import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      work: "Work",
      contact: "Contact"
    },
    hero: {
      greeting: "Hi, I'm",
      name: "Oussama",
      subtitle: "Building modern, high-performance",
      subtitleBr: "applications for web, mobile, and desktop",
      viewProjects: "View Projects",
      contactMe: "Contact Me"
    },
    about: {
      intro: "Introduction",
      title1: "Designing ",
      title2: "Experiences.",
      description: "I am a full-stack developer with experience in web, mobile, and desktop applications. I specialize in creating high-performance, scalable, and modern software solutions. My work includes enterprise-level POS systems, wholesale marketplaces, and interactive applications for multiple platforms.",
      services: {
        web: "Web Development",
        mobile: "Mobile Development",
        desktop: "Desktop Applications",
        fullstack: "Full Stack Solutions"
      }
    },
    skills: {
      subtitle: "Technical Expertise",
      title: "Skills.",
      categories: {
        frontend: "Frontend",
        backend: "Backend",
        mobile: "Mobile & Desktop"
      }
    },
    experience: {
      subtitle: "What I have done so far",
      title: "Work Experience.",
      items: {
        item1: {
          title: "Full-stack Developer",
          company: "AgroAlim POS System",
          date: "Enterprise Project",
          points: [
            "Built cross-platform web and desktop applications for wholesale inventory management.",
            "Integrated complex backend APIs with Firebase for real-time data synchronization.",
            "Automated critical business workflows, improving efficiency for enterprise-level operations.",
            "Optimized system performance for handling large-scale POS transactions."
          ]
        },
        item2: {
          title: "Full-stack Developer",
          company: "Wholesale Marketplace Platform",
          date: "E-commerce Project",
          points: [
            "Developed a robust web platform using React and Laravel for wholesale product distribution.",
            "Created a high-performance mobile application using Flutter for remote buyers.",
            "Implemented seamless payment gateways and order tracking systems.",
            "Ensured multi-platform synchronization and high-availability architecture."
          ]
        },
        item3: {
          title: "Freelance Developer",
          company: "Self-Employed",
          date: "Past - Present",
          points: [
            "Developed numerous interactive web applications and portfolio experiments using Three.js.",
            "Built custom desktop applications for niche business needs using Electron and Tauri.",
            "Collaborated with clients to deliver high-performance, modern software solutions."
          ]
        }
      }
    },
    works: {
      subtitle: "My work",
      title: "Projects.",
      description: "Following projects showcases my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos in it. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.",
      items: {
        proj1: {
          name: "AgroAlim POS System",
          desc: "A complete enterprise wholesale management suite featuring a web dashboard, desktop POS application, and mobile stock tracking."
        },
        proj2: {
          name: "Wholesale Marketplace",
          desc: "A multi-platform marketplace connecting wholesale distributors with remote buyers, featuring real-time inventory and Flutter mobile app."
        },
        proj3: {
          name: "Portfolio Experiments",
          desc: "A collection of interactive 3D web apps and Three.js demos showcasing advanced animation and UI techniques."
        }
      }
    },
    contact: {
      subtitle: "Get in touch",
      title: "Contact.",
      nameLabel: "Your Name",
      namePlaceholder: "What's your good name?",
      emailLabel: "Your email",
      emailPlaceholder: "What's your web address?",
      messageLabel: "Your Message",
      messagePlaceholder: "What do you want to say?",
      send: "Send",
      sending: "Sending...",
      success: "Thank you. I will get back to you as soon as possible.",
      error: "Something went wrong. Please try again."
    }
  },
  fr: {
    nav: {
      about: "À propos",
      skills: "Compétences",
      experience: "Expérience",
      projects: "Projets",
      work: "Projets",
      contact: "Contact"
    },
    hero: {
      greeting: "Bonjour, je suis",
      name: "Oussama",
      subtitle: "Création d'applications modernes et",
      subtitleBr: "performantes pour web, mobile et bureau",
      viewProjects: "Voir les projets",
      contactMe: "Contactez-moi"
    },
    about: {
      intro: "Introduction",
      title1: "Conception d'",
      title2: "Expériences.",
      description: "Je suis un développeur full-stack avec de l'expérience dans les applications web, mobiles et de bureau. Je me spécialise dans la création de solutions logicielles modernes, évolutives et performantes. Mon travail comprend des systèmes de point de vente d'entreprise, des places de marché de gros et des applications interactives multiplateformes.",
      services: {
        web: "Développement Web",
        mobile: "Développement Mobile",
        desktop: "Applications de Bureau",
        fullstack: "Solutions Full Stack"
      }
    },
    skills: {
      subtitle: "Expertise Technique",
      title: "Compétences.",
      categories: {
        frontend: "Frontend",
        backend: "Backend",
        mobile: "Mobile & Bureau"
      }
    },
    experience: {
      subtitle: "Ce que j'ai fait jusqu'à présent",
      title: "Expérience Pro.",
      items: {
        item1: {
          title: "Développeur Full-stack",
          company: "Système POS AgroAlim",
          date: "Projet d'Entreprise",
          points: [
            "Création d'applications web et de bureau multiplateformes pour la gestion des stocks en gros.",
            "Intégration d'API backend complexes avec Firebase pour la synchronisation des données en temps réel.",
            "Automatisation de flux de travail commerciaux critiques, améliorant l'efficacité des opérations.",
            "Optimisation des performances du système pour le traitement à grande échelle."
          ]
        },
        item2: {
          title: "Développeur Full-stack",
          company: "Place de Marché de Gros",
          date: "Projet E-commerce",
          points: [
            "Développement d'une plateforme web robuste utilisant React et Laravel pour la distribution de produits de gros.",
            "Création d'une application mobile haute performance utilisant Flutter pour les acheteurs à distance.",
            "Mise en œuvre de passerelles de paiement transparentes et de systèmes de suivi des commandes.",
            "Assurance de la synchronisation multiplateforme et de l'architecture haute disponibilité."
          ]
        },
        item3: {
          title: "Développeur Indépendant",
          company: "Indépendant",
          date: "Passé - Présent",
          points: [
            "Développement de nombreuses applications web interactives et expériences de portfolio utilisant Three.js.",
            "Création d'applications de bureau personnalisées pour des besoins spécifiques en utilisant Electron et Tauri.",
            "Collaboration avec les clients pour fournir des solutions logicielles modernes et performantes."
          ]
        }
      }
    },
    works: {
      subtitle: "Mon travail",
      title: "Projets.",
      description: "Les projets suivants illustrent mes compétences et mon expérience à travers des exemples concrets de mon travail. Chaque projet est brièvement décrit avec des liens vers les dépôts de code et des démos en direct. Cela reflète ma capacité à résoudre des problèmes complexes et à gérer des projets efficacement.",
      items: {
        proj1: {
          name: "Système POS AgroAlim",
          desc: "Suite complète de gestion de gros d'entreprise comprenant un tableau de bord web, une application de bureau POS et un suivi des stocks mobile."
        },
        proj2: {
          name: "Place de Marché de Gros",
          desc: "Place de marché multiplateforme reliant les distributeurs en gros aux acheteurs, avec inventaire en temps réel et application mobile Flutter."
        },
        proj3: {
          name: "Expériences Portfolio",
          desc: "Une collection d'applications web 3D interactives et de démos Three.js illustrant des techniques avancées d'animation et d'UI."
        }
      }
    },
    contact: {
      subtitle: "Gardons le contact",
      title: "Contact.",
      nameLabel: "Votre Nom",
      namePlaceholder: "Quel est votre nom ?",
      emailLabel: "Votre Adresse Email",
      emailPlaceholder: "Quelle est votre adresse web ?",
      messageLabel: "Votre Message",
      messagePlaceholder: "Que voulez-vous dire ?",
      send: "Envoyer",
      sending: "Envoi en cours...",
      success: "Merci. Je vous répondrai dans les plus brefs délais.",
      error: "Quelque chose s'est mal passé. Veuillez réessayer."
    }
  },
  ar: {
    nav: {
      about: "نبذة",
      skills: "المهارات",
      experience: "الخبرات",
      projects: "المشاريع",
      work: "الأعمال",
      contact: "تواصل"
    },
    hero: {
      greeting: "مرحباً، أنا",
      name: "أسامة",
      subtitle: "بناء تطبيقات حديثة وعالية الأداء",
      subtitleBr: "للويب والموبايل وسطح المكتب",
      viewProjects: "عرض المشاريع",
      contactMe: "تواصل معي"
    },
    about: {
      intro: "مقدمة",
      title1: "تصميم ",
      title2: "التجارب.",
      description: "أنا مطور ويب شامل لدي خبرة في تطبيقات الويب والموبايل وسطح المكتب. أتخصص في إنشاء حلول برمجية حديثة وقابلة للتطوير وعالية الأداء. يتضمن عملي أنظمة نقاط البيع للمؤسسات، والأسواق بالجملة، والتطبيقات التفاعلية للمنصات المتعددة.",
      services: {
        web: "تطوير الويب",
        mobile: "تطوير الموبايل",
        desktop: "تطبيقات سطح المكتب",
        fullstack: "حلول برمجية شاملة"
      }
    },
    skills: {
      subtitle: "الخبرة التقنية",
      title: "المهارات.",
      categories: {
        frontend: "واجهة المستخدم",
        backend: "الواجهة الخلفية",
        mobile: "الموبايل وسطح المكتب"
      }
    },
    experience: {
      subtitle: "ما أنجزته حتى الآن",
      title: "الخبرات المهنية.",
      items: {
        item1: {
          title: "مطور شامل",
          company: "نظام AgroAlim نقاط البيع",
          date: "مشروع مؤسسي",
          points: [
            "بناء تطبيقات الويب وسطح المكتب متعددة المنصات لإدارة المخزون بالجملة.",
            "دمج واجهات برمجة خلفية معقدة مع Firebase لمزامنة البيانات في الوقت الفعلي.",
            "أتمتة سير العمل التجاري المهم، مما أدى إلى تحسين الكفاءة للعمليات على مستوى المؤسسة.",
            "تحسين أداء النظام للتعامل مع المعاملات واسعة النطاق لنقاط البيع."
          ]
        },
        item2: {
          title: "مطور شامل",
          company: "منصة سوق الجملة",
          date: "مشروع التجارة الإلكترونية",
          points: [
            "تطوير منصة ويب قوية باستخدام React و Laravel لتوزيع المنتجات بالجملة.",
            "إنشاء تطبيق موبايل عالي الأداء باستخدام Flutter للمشترين عن بعد.",
            "تنفيذ بوابات دفع سلسة وأنظمة تتبع للطلبات.",
            "ضمان المزامنة متعددة المنصات والبنية التحتية عالية التوفر."
          ]
        },
        item3: {
          title: "مطور حر",
          company: "عمل حر",
          date: "الماضي - الحاضر",
          points: [
            "تطوير العديد من تطبيقات الويب التفاعلية وتجارب معارض الأعمال باستخدام Three.js.",
            "بناء تطبيقات سطح مكتب مخصصة لاحتياجات الأعمال باستخدام Electron و Tauri.",
            "التعاون مع العملاء لتقديم حلول برمجية حديثة وعالية الأداء."
          ]
        }
      }
    },
    works: {
      subtitle: "أعمالي",
      title: "المشاريع.",
      description: "تعرض المشاريع التالية مهاراتي وخبراتي من خلال أمثلة واقعية لعملي. يتم وصف كل مشروع باختصار مع روابط لمستودعات التعليمات البرمجية والعروض التوضيحية الحية. إنه يعكس قدرتي على حل المشكلات المعقدة، والعمل مع تقنيات مختلفة، وإدارة المشاريع بشكل فعال.",
      items: {
        proj1: {
          name: "نظام AgroAlim نقاط البيع",
          desc: "مجموعة متكاملة لإدارة البيع بالجملة تتميز بلوحة تحكم ويب وتطبيق سطح مكتب وتتبع مخزون عبر الموبايل."
        },
        proj2: {
          name: "سوق الجملة",
          desc: "سوق متعدد المنصات يربط موزعي الجملة بالمشترين عن بعد، ويتميز بمخزون في الوقت الفعلي وتطبيق موبايل Flutter."
        },
        proj3: {
          name: "تجارب معرض الأعمال",
          desc: "مجموعة من تطبيقات الويب التفاعلية 3D وعروض Three.js التي تبرز الرسوم المتحركة المتقدمة وتقنيات واجهة المستخدم."
        }
      }
    },
    contact: {
      subtitle: "ابق على تواصل",
      title: "اتصل.",
      nameLabel: "اسمك",
      namePlaceholder: "ما هو اسمك الكريم؟",
      emailLabel: "بريدك الإلكتروني",
      emailPlaceholder: "ما هو عنوان بريدك الإلكتروني؟",
      messageLabel: "رسالتك",
      messagePlaceholder: "ماذا تريد أن تقول؟",
      send: "إرسال",
      sending: "جاري الإرسال...",
      success: "شكراً لك. سأرد عليك في أقرب وقت ممكن.",
      error: "حدث خطأ ما. يرجى المحاولة مرة أخرى."
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('appLang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('appLang', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.body.style.transition = 'opacity 0.3s ease-in-out';
  }, [language]);

  const changeLanguage = (newLang) => {
    if (newLang === language) return;
    document.body.style.opacity = '0';
    setTimeout(() => {
      setLanguage(newLang);
      document.body.style.opacity = '1';
    }, 300);
  };

  const t = (keyString) => {
    const keys = keyString.split('.');
    let result = translations[language];
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        return keyString; 
      }
    }
    return result;
  };

  const isRtl = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
