import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: 'Dashboard',
      mentors: 'Mentors',
      bookings: 'Bookings',
      profile: 'Profile',
      login: 'Login',
      logout: 'Logout',
      register: 'Register',
      
      // Home
      'hero.title': 'Mentor Connect - The Best Way to Get Mentored',
      'hero.subtitle': 'Connect with industry experts and accelerate your career growth',
      getStarted: 'Get Started',
      
      // Features
      'features.title': 'Why Choose Mentor Connect?',
      'features.matching.title': 'Smart Matching',
      'features.matching.description': 'AI-powered algorithm matches you with the perfect mentor',
      'features.scheduling.title': 'Easy Scheduling',
      'features.scheduling.description': 'Automated calendar booking system for seamless appointments',
      'features.video.title': 'Video Calls',
      'features.video.description': 'Built-in video conferencing for virtual mentoring sessions',
      'features.rating.title': 'Quality Assurance',
      'features.rating.description': 'Rate and review mentors to maintain high quality standards',
      
      // Common
      email: 'Email',
      password: 'Password',
      name: 'Name',
      role: 'Role',
      mentee: 'Mentee',
      mentor: 'Mentor',
      loading: 'Loading',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      search: 'Search',
      filters: 'Filters',
      optional: 'Optional',
      send: 'Send',
      chat: 'Chat',
      
      // Profile
      bio: 'Bio',
      industry: 'Industry',
      skills: 'Skills',
      experience: 'Experience',
      years: 'years',
      rating: 'Rating',
      reviews: 'reviews',
      pricePerHour: 'Price per Hour',
      calendlyUrl: 'Calendly URL',
      commaSeparated: 'Comma separated',
      
      // Booking
      bookSession: 'Book Session',
      startTime: 'Start Time',
      endTime: 'End Time',
      notes: 'Notes',
      addNotes: 'Add notes for your mentor',
      book: 'Book',
      booking: 'Booking',
      bookingFailed: 'Booking failed. Please try again.',
      upcomingBookings: 'Upcoming Bookings',
      noBookings: 'No bookings found',
      confirm: 'Confirm',
      joinMeeting: 'Join Meeting',
      
      // Mentor
      viewProfile: 'View Profile',
      suggestedMentors: 'Suggested Mentors',
      noSuggestions: 'No mentor suggestions available',
      noMentorsFound: 'No mentors found',
      mentorNotFound: 'Mentor not found',
      searchIndustry: 'Search by industry',
      searchSkills: 'Search by skills',
      minRating: 'Minimum Rating',
      noReviews: 'No reviews yet',
      
      // Auth
      noAccount: "Don't have an account?",
      haveAccount: 'Already have an account?',
      
      // Dashboard
      welcome: 'Welcome',
      
      // Meeting
      typeMessage: 'Type a message...',
      
      // Status
      status: 'Status',
      
      // Rating
      rateSession: 'Rate Session',
      ratingFailed: 'Failed to submit rating',
      shareFeedback: 'Share your feedback about this session',
      submit: 'Submit',
      submitting: 'Submitting',
      feedback: 'Feedback'
    }
  },
  es: {
    translation: {
      dashboard: 'Panel',
      mentors: 'Mentores',
      bookings: 'Reservas',
      profile: 'Perfil',
      login: 'Iniciar sesión',
      logout: 'Cerrar sesión',
      register: 'Registrarse',
      'hero.title': 'Mentor Connect - La Mejor Forma de Ser Mentorizado',
      'hero.subtitle': 'Conéctate con expertos de la industria y acelera tu crecimiento profesional',
      getStarted: 'Comenzar',
      email: 'Correo electrónico',
      password: 'Contraseña',
      name: 'Nombre',
      role: 'Rol',
      mentee: 'Aprendiz',
      mentor: 'Mentor',
      loading: 'Cargando',
      save: 'Guardar',
      cancel: 'Cancelar',
      edit: 'Editar',
      send: 'Enviar',
      chat: 'Chat',
      bio: 'Biografía',
      industry: 'Industria',
      skills: 'Habilidades',
      experience: 'Experiencia',
      years: 'años',
      rating: 'Calificación',
      reviews: 'reseñas',
      bookSession: 'Reservar Sesión',
      startTime: 'Hora de inicio',
      endTime: 'Hora de finalización',
      notes: 'Notas',
      book: 'Reservar',
      upcomingBookings: 'Próximas Reservas',
      noBookings: 'No se encontraron reservas',
      confirm: 'Confirmar',
      joinMeeting: 'Unirse a la Reunión',
      viewProfile: 'Ver Perfil',
      suggestedMentors: 'Mentores Sugeridos',
      welcome: 'Bienvenido',
      typeMessage: 'Escribe un mensaje...',
      status: 'Estado'
    }
  },
  fr: {
    translation: {
      dashboard: 'Tableau de bord',
      mentors: 'Mentors',
      bookings: 'Réservations',
      profile: 'Profil',
      login: 'Connexion',
      logout: 'Déconnexion',
      register: "S'inscrire",
      'hero.title': 'Mentor Connect - La Meilleure Façon d\'Être Mentoré',
      'hero.subtitle': 'Connectez-vous avec des experts de l\'industrie et accélérez votre croissance professionnelle',
      getStarted: 'Commencer',
      email: 'E-mail',
      password: 'Mot de passe',
      name: 'Nom',
      role: 'Rôle',
      mentee: 'Mentoré',
      mentor: 'Mentor',
      loading: 'Chargement',
      save: 'Enregistrer',
      cancel: 'Annuler',
      edit: 'Modifier',
      send: 'Envoyer',
      chat: 'Chat',
      bio: 'Biographie',
      industry: 'Industrie',
      skills: 'Compétences',
      experience: 'Expérience',
      years: 'années',
      rating: 'Note',
      reviews: 'avis',
      bookSession: 'Réserver une Session',
      startTime: 'Heure de début',
      endTime: 'Heure de fin',
      notes: 'Notes',
      book: 'Réserver',
      upcomingBookings: 'Réservations à venir',
      noBookings: 'Aucune réservation trouvée',
      confirm: 'Confirmer',
      joinMeeting: 'Rejoindre la Réunion',
      viewProfile: 'Voir le Profil',
      suggestedMentors: 'Mentors Suggérés',
      welcome: 'Bienvenue',
      typeMessage: 'Tapez un message...',
      status: 'Statut'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

