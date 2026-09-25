// ============================================================
// Diccionario de traducciones (client-side i18n)
// ------------------------------------------------------------
// Idioma por defecto: español ('es'). El selector del Navbar
// permite cambiar a inglés ('en') y guarda la preferencia en
// localStorage bajo la clave definida en STORAGE_KEY.
//
// Uso en el HTML:
//   <span data-i18n="nav.capacidades">Capacidades</span>
//   <input data-i18n-placeholder="form.email" />
//   <button data-i18n-aria-label="nav.menu">...</button>
//
// El texto que se escribe en el .astro debe estar SIEMPRE en
// español (es el fallback y lo que ven los buscadores).
// ============================================================

export const STORAGE_KEY = "ccd-lang";
export const defaultLang = "es";

export const languages = {
  es: "Español",
  en: "English",
};

export const translations = {
  es: {
    // --- Selector de idioma ---
    "lang.label": "Idioma",

    // --- Navbar: enlaces principales ---
    "nav.capacidades": "Capacidades",
    "nav.industrias": "Industrias",
    "nav.paises": "Países",
    "nav.carreras": "Carreras",
    "nav.nosotros": "Nosotros",
    "nav.contacto": "Contacto",
    "nav.milink": "MiLinkCCD",
    "nav.menu": "Abrir menú",

    // --- Navbar: descripciones de los mega-menús ---
    "nav.capacidades.desc":
      "Soluciones integrales para transformar territorios y generar valor sostenible.",
    "nav.industrias.desc":
      "Aportamos experiencia estratégica en múltiples sectores económicos, potenciando la competitividad y el crecimiento económico.",
    "nav.nosotros.desc": "Promover el desarrollo y la prosperidad.",

    // --- Navbar: sub-enlaces "Nosotros" ---
    "nav.vision": "Visión",
    "nav.historia": "Historia",
    "nav.equipo": "Nuestro Equipo",
    "nav.enfoque": "Enfoque de trabajo",
    "nav.visionHistoria": "Visión e Historia",
    "nav.equipoMobile": "Equipo",

    // --- Navbar: items de "Capacidades" ---
    "cap.competitividad": "Competitividad",
    "cap.corredores": "Corredores Económicos Territoriales",
    "cap.desarrollo": "Desarrollo",
    "cap.estudios": "Estudios Económicos",
    "cap.evaluacion": "Evaluación de Proyectos",
    "cap.fondosSociales": "Fondos Sociales",
    "cap.fortalecimiento": "Fortalecimiento de Capacidades",
    "cap.ia": "Inteligencia Artificial y Analítica",
    "cap.inversiones": "Inversiones y Proyectos",
    "cap.legal": "Legal",
    "cap.riesgos": "Mecanismos Reductores de Riesgos",
    "cap.politica": "Política Fiscal",

    // --- Navbar: items de "Industrias" ---
    "ind.agropecuario": "Agropecuario",
    "ind.agroexportacion": "Agroexportación",
    "ind.educacion": "Educación",
    "ind.hidrocarburos": "Hidrocarburos",
    "ind.infraestructura": "Infraestructura y Construcción",
    "ind.ia": "Inteligencia Artificial",
    "ind.manufactura": "Manufactura",
    "ind.mineria": "Minería",
    "ind.seguridad": "Seguridad Ciudadana",
    "ind.publico": "Sector Público",
    "ind.portuarios": "Servicios Portuarios",
    "ind.financiero": "Sistema Financiero",
    "ind.tecnologia": "Tecnología",

    // --- Página principal: Hero ---
    "home.hero.l1": "Pasión por nuestro trabajo,",
    "home.hero.l2a": "creamos verdaderas historias de",
    "home.hero.and": "y",
    "home.hero.competitividad": "Competitividad",
    "home.hero.desarrollo": "Desarrollo",

    // --- Página principal: categorías de las tarjetas ---
    "home.cat.capacidades": "Capacidades",
    "home.cat.experiencia": "Experiencia",
    "home.cat.industrias": "Industrias",
    "home.cat.cobertura": "Cobertura Global",
    "home.cat.metodologia": "Metodología",

    // --- Página principal: títulos de las tarjetas ---
    "home.card.competitividad": "Competitividad",
    "home.card.desarrollo": "Desarrollo",
    "home.card.industrias": "Industrias",
    "home.card.mineria": "Minería",
    "home.card.hidrocarburos": "Hidrocarburos",
    "home.card.agropecuario": "Agropecuario",
    "home.card.ia": "Inteligencia Artificial",
    "home.card.paises": "Países",
    "home.card.enfoque": "Enfoque de trabajo",

    // --- Página principal: Visión ---
    "home.vision.label": "Visión",
    "home.vision.text":
      "Promover la competitividad y el desarrollo para alcanzar la prosperidad con oportunidades y alta calidad de vida de la población nacional, regional, provincial, distrital y comunal",

    // --- Página principal: contadores de impacto ---
    "home.stats.years": "Años de Experiencia",
    "home.stats.consultants": "Consultores",
    "home.stats.projects": "Proyectos Ejecutados",
    "home.stats.level": "Nivel",
    "home.stats.countries": "Países",
    "home.stats.regions": "Regiones",
    "home.stats.provinces": "Provincias",
    "home.stats.districts": "Distritos",
    "home.stats.communities": "Comunidades",

    // --- Página principal: bloque Capacidades ---
    "home.cap.title": "Capacidades",
    "home.cap.text":
      "Ofrecemos soluciones integrales en competitividad, desarrollo territorial, inversión y evaluación de proyectos. Nuestro enfoque multidisciplinario transforma comunidades y genera impacto sostenible a largo plazo.",
    "home.cap.cta": "Ver Capacidades",

    // --- Página principal: bloque Industrias ---
    "home.ind.title": "Industrias",
    "home.ind.text":
      "Aportamos experiencia estratégica en múltiples sectores económicos, potenciando el crecimiento, la innovación y la competitividad de industrias clave dentro del territorio.",
    "home.ind.cta": "Ver Industrias",

    // --- Página principal: bloque Equipo ---
    "home.team.title": "Nuestro Equipo",
    "home.team.text":
      "Líderes especializados con amplia experiencia en competitividad y desarrollo, con alcance comunal, distrital, provincial, regional y nacional.",
    "home.team.cta": "Ver Equipo CCD",

    // --- Página principal: SEO y alt de imágenes ---
    "home.meta.title": "CCD - Centro para la Competitividad y el Desarrollo",
    "home.meta.desc":
      "Promovemos el desarrollo territorial sostenible a través de soluciones integrales en competitividad, inversión y evaluación de proyectos.",
    "home.alt.hero": "Comunidades y territorios donde trabajamos",
    "home.alt.cap": "Nuestras Capacidades",
    "home.alt.ind": "Nuestras Industrias",

    // --- Tarjeta de equipo ---
    "team.photoOf": "Foto de {name}",
    "team.linkedinOf": "LinkedIn de {name}",
    "role.Director": "Director",
    "role.Directora": "Directora",
    "role.Estudios Económicos": "Estudios Económicos",
    "role.Tecnología para la Competitividad y el Desarrollo":
      "Tecnología para la Competitividad y el Desarrollo",
    "role.Competitividad, Desarrollo e Inteligencia Artificial":
      "Competitividad, Desarrollo e Inteligencia Artificial",
    "role.Competitividad, Desarrollo y Evaluación de Proyectos":
      "Competitividad, Desarrollo y Evaluación de Proyectos",
    "role.Competitividad, Desarrollo y Manufactura":
      "Competitividad, Desarrollo y Manufactura",
    "role.Competitividad, Desarrollo y Proyectos Sociales":
      "Competitividad, Desarrollo y Proyectos Sociales",
    "role.Competitividad, Desarrollo, Agropecuario e Inversiones":
      "Competitividad, Desarrollo, Agropecuario e Inversiones",
    "role.Competitividad, Desarrollo, Evaluación Sectorial y Proyectos de Inversión":
      "Competitividad, Desarrollo, Evaluación Sectorial y Proyectos de Inversión",
    "role.Competitividad, Desarrollo, Infraestructura y Construcción":
      "Competitividad, Desarrollo, Infraestructura y Construcción",

    // --- Formulario de contacto ---
    "contact.title": "Contáctanos",
    "contact.text":
      "Para obtener más información sobre el CCD y los servicios de la organización completar el siguiente formulario, un integrante del equipo CCD se pondrá en contacto con usted lo antes posible.",
    "contact.privacy":
      "La información brindada se mantendrá en todo momento estrictamente confidencial.",
    "contact.name": "Nombre",
    "contact.lastname": "Apellido",
    "contact.phone": "Celular",
    "contact.email": "Correo",
    "contact.message": "Mensaje",
    "contact.messagePlaceholder": "Escribe tu mensaje aquí...",
    "contact.send": "Enviar",
    "contact.sending": "Enviando...",
    "contact.success":
      "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.",
    "contact.error":
      "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.",

    // --- Footer ---
    "footer.copyright": "Centro para la Competitividad y el Desarrollo",

    // --- Nosotros: visión e historia, equipo, enfoque ---
    "vh.meta.title":
      "Visión e Historia - CCD",
    "vh.title":
      "Visión",
    "vh.desc":
      "Promover el desarrollo y la prosperidad con oportunidades y alta calidad de vida de la población nacional, regional, provincial, distrital y comunal.",
    "vh.history":
      "Nuestra Historia",
    "vh.founding.title":
      "Fundación",
    "vh.founding.text":
      "El Centro para la Competitividad y el Desarrollo (CCD) se constituye con un equipo de profesionales con experiencia principalmente en el Ministerio de Economía y Finanzas (MEF) del Perú, en el Banco Central de Reserva del Perú (BCRP), en el Fondo Monetario Internacional (FMI), en empresas del sector privado, así como en la academia nacional e internacional.",
    "vh.consolidation.title":
      "Consolidación",
    "vh.consolidation.text":
      "El Centro para la Competitividad y el Desarrollo (CCD) se consolida como una institución líder y altamente especializada en competitividad y desarrollo a escalas nacional, regional, local y comunal.",
    "vh.global.title":
      "Expansión Global",
    "vh.global.text":
      "El Centro para la Competitividad y el Desarrollo (CCD) comienza a realizar actividades y proyectos sobre competitividad y desarrollo con empresas globales.",
    "vh.today.title":
      "Presente",
    "vh.today.text":
      "El Centro para la Competitividad y el Desarrollo (CCD) se encuentra en un proceso de intensificar I+D para mejorar los servicios sobre desarrollo, competitividad y productividad, así como en la automatización y aplicación de tecnologías virtuales en todos sus servicios, procesos y actividades.",
    "team.meta.title":
      "Nuestro Equipo - CCD",
    "team.desc":
      "Profesionales altamente especializados y comprometidos con impulsar la competitividad y desarrollo comunal, local, regional y nacional.",
    "approach.meta.title":
      "Enfoque de Trabajo - CCD",
    "approach.title":
      "Enfoque de Trabajo",
    "approach.desc":
      "Promover la competitividad y desarrollo con principios de libertad, persuasión, análisis integral y procesos metodológicos.",
    "approach.workflow":
      "Flujo de Trabajo",
    "approach.img1":
      "/enfoque-trabajo.svg",
    "approach.img1.alt":
      "Gráfico circular de enfoque: Diagnóstico, Intervenciones, Visión, etc.",
    "approach.img2":
      "/flujo-trabajo.svg",
    "approach.img2.alt":
      "Diagrama de flujo de trabajo: Planificación, Gestión, Fortalecimiento...",

    // --- Carreras: mensajes del formulario ---
    "careers.fileTooBig":
      "El archivo es muy grande. Por favor sube un archivo menor a 10MB",
    "careers.fileSelected":
      "Archivo seleccionado: {name} ({size}MB)",
    "careers.sending":
      "Enviando, por favor espera...",
    "careers.success":
      "¡Gracias por tu candidatura! Nos pondremos en contacto pronto.",
    "careers.errorPrefix":
      "Error: ",
    "careers.errorForm":
      "Error al enviar el formulario.",
    "careers.errorGeneric":
      "Ocurrió un error al enviar el CV. Inténtalo de nuevo más tarde.",
  },

  en: {
    // --- Language selector ---
    "lang.label": "Language",

    // --- Navbar: main links ---
    "nav.capacidades": "Capabilities",
    "nav.industrias": "Industries",
    "nav.paises": "Countries",
    "nav.carreras": "Careers",
    "nav.nosotros": "About Us",
    "nav.contacto": "Contact",
    "nav.milink": "MiLinkCCD",
    "nav.menu": "Open menu",

    // --- Navbar: mega-menu descriptions ---
    "nav.capacidades.desc":
      "Comprehensive solutions to transform territories and generate sustainable value.",
    "nav.industrias.desc":
      "We bring strategic expertise across multiple economic sectors, boosting competitiveness and economic growth.",
    "nav.nosotros.desc": "Advancing development and prosperity.",

    // --- Navbar: "About Us" sub-links ---
    "nav.vision": "Vision",
    "nav.historia": "History",
    "nav.equipo": "Our Team",
    "nav.enfoque": "Our Approach",
    "nav.visionHistoria": "Vision & History",
    "nav.equipoMobile": "Team",

    // --- Navbar: "Capabilities" items ---
    "cap.competitividad": "Competitiveness",
    "cap.corredores": "Territorial Economic Corridors",
    "cap.desarrollo": "Development",
    "cap.estudios": "Economic Studies",
    "cap.evaluacion": "Project Evaluation",
    "cap.fondosSociales": "Social Funds",
    "cap.fortalecimiento": "Capacity Building",
    "cap.ia": "Artificial Intelligence & Analytics",
    "cap.inversiones": "Investments & Projects",
    "cap.legal": "Legal",
    "cap.riesgos": "Risk Mitigation Mechanisms",
    "cap.politica": "Fiscal Policy",

    // --- Navbar: "Industries" items ---
    "ind.agropecuario": "Agriculture & Livestock",
    "ind.agroexportacion": "Agro-export",
    "ind.educacion": "Education",
    "ind.hidrocarburos": "Hydrocarbons",
    "ind.infraestructura": "Infrastructure & Construction",
    "ind.ia": "Artificial Intelligence",
    "ind.manufactura": "Manufacturing",
    "ind.mineria": "Mining",
    "ind.seguridad": "Citizen Security",
    "ind.publico": "Public Sector",
    "ind.portuarios": "Port Services",
    "ind.financiero": "Financial System",
    "ind.tecnologia": "Technology",

    // --- Home page: Hero ---
    "home.hero.l1": "Passion for our work,",
    "home.hero.l2a": "we create true stories of",
    "home.hero.and": "and",
    "home.hero.competitividad": "Competitiveness",
    "home.hero.desarrollo": "Development",

    // --- Home page: card categories ---
    "home.cat.capacidades": "Capabilities",
    "home.cat.experiencia": "Experience",
    "home.cat.industrias": "Industries",
    "home.cat.cobertura": "Global Coverage",
    "home.cat.metodologia": "Methodology",

    // --- Home page: card titles ---
    "home.card.competitividad": "Competitiveness",
    "home.card.desarrollo": "Development",
    "home.card.industrias": "Industries",
    "home.card.mineria": "Mining",
    "home.card.hidrocarburos": "Hydrocarbons",
    "home.card.agropecuario": "Agriculture & Livestock",
    "home.card.ia": "Artificial Intelligence",
    "home.card.paises": "Countries",
    "home.card.enfoque": "Our Approach",

    // --- Home page: Vision ---
    "home.vision.label": "Vision",
    "home.vision.text":
      "To promote competitiveness and development to achieve prosperity, with opportunities and a high quality of life for the population at the national, regional, provincial, district and community levels.",

    // --- Home page: impact counters ---
    "home.stats.years": "Years of Experience",
    "home.stats.consultants": "Consultants",
    "home.stats.projects": "Projects Delivered",
    "home.stats.level": "Level",
    "home.stats.countries": "Countries",
    "home.stats.regions": "Regions",
    "home.stats.provinces": "Provinces",
    "home.stats.districts": "Districts",
    "home.stats.communities": "Communities",

    // --- Home page: Capabilities block ---
    "home.cap.title": "Capabilities",
    "home.cap.text":
      "We deliver comprehensive solutions in competitiveness, territorial development, investment and project evaluation. Our multidisciplinary approach transforms communities and generates sustainable long-term impact.",
    "home.cap.cta": "View Capabilities",

    // --- Home page: Industries block ---
    "home.ind.title": "Industries",
    "home.ind.text":
      "We bring strategic expertise across multiple economic sectors, boosting growth, innovation and the competitiveness of key industries within the territory.",
    "home.ind.cta": "View Industries",

    // --- Home page: Team block ---
    "home.team.title": "Our Team",
    "home.team.text":
      "Specialized leaders with broad experience in competitiveness and development, reaching the community, district, provincial, regional and national levels.",
    "home.team.cta": "View CCD Team",

    // --- Home page: SEO and image alts ---
    "home.meta.title": "CCD - Center for Competitiveness and Development",
    "home.meta.desc":
      "We promote sustainable territorial development through comprehensive solutions in competitiveness, investment and project evaluation.",
    "home.alt.hero": "Communities and territories where we work",
    "home.alt.cap": "Our Capabilities",
    "home.alt.ind": "Our Industries",

    // --- Team card ---
    "team.photoOf": "Photo of {name}",
    "team.linkedinOf": "{name}'s LinkedIn",
    "role.Director": "Director",
    "role.Directora": "Director",
    "role.Estudios Económicos": "Economic Studies",
    "role.Tecnología para la Competitividad y el Desarrollo":
      "Technology for Competitiveness and Development",
    "role.Competitividad, Desarrollo e Inteligencia Artificial":
      "Competitiveness, Development and Artificial Intelligence",
    "role.Competitividad, Desarrollo y Evaluación de Proyectos":
      "Competitiveness, Development and Project Evaluation",
    "role.Competitividad, Desarrollo y Manufactura":
      "Competitiveness, Development and Manufacturing",
    "role.Competitividad, Desarrollo y Proyectos Sociales":
      "Competitiveness, Development and Social Projects",
    "role.Competitividad, Desarrollo, Agropecuario e Inversiones":
      "Competitiveness, Development, Agriculture and Investments",
    "role.Competitividad, Desarrollo, Evaluación Sectorial y Proyectos de Inversión":
      "Competitiveness, Development, Sector Evaluation and Investment Projects",
    "role.Competitividad, Desarrollo, Infraestructura y Construcción":
      "Competitiveness, Development, Infrastructure and Construction",

    // --- Contact form ---
    "contact.title": "Contact Us",
    "contact.text":
      "To learn more about CCD and the organization's services, please complete the form below and a member of the CCD team will contact you as soon as possible.",
    "contact.privacy":
      "The information provided will be kept strictly confidential at all times.",
    "contact.name": "First name",
    "contact.lastname": "Last name",
    "contact.phone": "Mobile",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Write your message here...",
    "contact.send": "Send",
    "contact.sending": "Sending...",
    "contact.success":
      "Message sent successfully! We will get in touch soon.",
    "contact.error":
      "There was an error sending your message. Please try again.",

    // --- Footer ---
    "footer.copyright": "Center for Competitiveness and Development",

    // --- Nosotros: visión e historia, equipo, enfoque ---
    "vh.meta.title":
      "Vision & History - CCD",
    "vh.title":
      "Vision",
    "vh.desc":
      "To promote development and prosperity, with opportunities and a high quality of life for the population at the national, regional, provincial, district and community levels.",
    "vh.history":
      "Our History",
    "vh.founding.title":
      "Founding",
    "vh.founding.text":
      "The Center for Competitiveness and Development (CCD) was established by a team of professionals with experience primarily at Peru's Ministry of Economy and Finance (MEF), the Central Reserve Bank of Peru (BCRP) and the International Monetary Fund (IMF), as well as in the private sector and in national and international academia.",
    "vh.consolidation.title":
      "Consolidation",
    "vh.consolidation.text":
      "The Center for Competitiveness and Development (CCD) has consolidated its position as a leading, highly specialized institution in competitiveness and development at the national, regional, local and community levels.",
    "vh.global.title":
      "Global Expansion",
    "vh.global.text":
      "The Center for Competitiveness and Development (CCD) begins delivering activities and projects on competitiveness and development with global companies.",
    "vh.today.title":
      "Today",
    "vh.today.text":
      "The Center for Competitiveness and Development (CCD) is stepping up R&D to enhance its services on development, competitiveness and productivity, and is automating and applying digital technologies across all its services, processes and activities.",
    "team.meta.title":
      "Our Team - CCD",
    "team.desc":
      "Highly specialized professionals committed to advancing competitiveness and development at the community, local, regional and national levels.",
    "approach.meta.title":
      "Our Approach - CCD",
    "approach.title":
      "Our Approach",
    "approach.desc":
      "Promoting competitiveness and development guided by the principles of freedom, persuasion, comprehensive analysis and methodological processes.",
    "approach.workflow":
      "Our Process",
    "approach.img1":
      "/enfoque-trabajo.svg",
    "approach.img1.alt":
      "Circular diagram of our approach: Diagnosis, Interventions, Vision, etc.",
    "approach.img2":
      "/flujo-trabajo.svg",
    "approach.img2.alt":
      "Workflow diagram: Planning, Management, Capacity Building...",

    // --- Carreras: mensajes del formulario ---
    "careers.fileTooBig":
      "The file is too large. Please upload a file smaller than 10MB.",
    "careers.fileSelected":
      "Selected file: {name} ({size}MB)",
    "careers.sending":
      "Sending, please wait...",
    "careers.success":
      "Thank you for your application! We will be in touch soon.",
    "careers.errorPrefix":
      "Error: ",
    "careers.errorForm":
      "Error submitting the form.",
    "careers.errorGeneric":
      "An error occurred while submitting your CV. Please try again later.",
  },
};

/** Devuelve la traducción de `key` para `lang`, con fallback al idioma por defecto. */
export function t(lang, key) {
  const dict = translations[lang] || translations[defaultLang];
  if (dict[key] != null) return dict[key];
  if (translations[defaultLang][key] != null) return translations[defaultLang][key];
  return key;
}
