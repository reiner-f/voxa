import React, { createContext, useContext, useState } from "react";

const translations = {
  ro: {
    nav: {
      home: "Acasă",
      about: "Despre",
      teachers: "Profesori",
      students: "Elevi",
      education: "Educație",
      login: "Autentificare",
      team: "Echipa"
    },
    hero: {
      title: "Democrația Digitală pentru Tineri",
      subtitle: "Simulări electorale interactive la Colegiul Național A.T. Laurian, Botoșani",
      teacherBtn: "Portal Profesori",
      studentBtn: "Intră în Clasă",
      learnBtn: "Descoperă Modulul Educativ"
    },
    features: {
      title: "Cum Funcționează",
      subtitle: "Platforma completă pentru simulări electorale",
      voting: {
        title: "Votare Anonimă",
        desc: "Simulări de vot sigure și anonime pentru fiecare clasă"
      },
      education: {
        title: "Educație Civică",
        desc: "Module interactive despre democrație și UE"
      },
      analytics: {
        title: "Statistici în Timp Real",
        desc: "Vizualizare imediată a rezultatelor demografice"
      },
      bilingual: {
        title: "Bilingv RO/FR",
        desc: "Conținut complet în română și franceză"
      }
    },
    stats: {
      schools: "Licee Participante",
      students: "Elevi Implicați",
      votes: "Voturi Simulate",
      sessions: "Sesiuni Active"
    },
    howItWorks: {
      title: "Procesul de Votare",
      subtitle: "Trei pași simpli pentru o experiență democratică autentică",
      step1: { title: "Primești Codul", desc: "Profesorul generează un cod unic pentru sesiunea de votare a clasei tale" },
      step2: { title: "Alegi Candidatul", desc: "Explorezi profilurile candidaților și platformele lor politice" },
      step3: { title: "Votezi Anonim", desc: "Exprimi votul în siguranță și vezi rezultatele agregate" }
    },
    cta: {
      title: "Pregătit să Transformi Educația Civică?",
      subtitle: "Creează prima ta sesiune de votare la Colegiul Național A.T. Laurian",
      button: "Începe Gratuit"
    },
    footer: {
      description: "Proiect educațional al Colegiului Național A.T. Laurian, Botoșani.",
      coordinator: "Proiect coordonat de Prof. Mangîr Gabriela",
      links: "Linkuri Rapide",
      contact: "Contact",
      legal: "Legal",
      privacy: "Confidențialitate",
      terms: "Termeni"
    },
    teacher: {
      dashboard: "Panou de Control",
      sessions: "Sesiunile Mele",
      createSession: "Sesiune Nouă",
      candidates: "Candidați",
      results: "Rezultate",
      settings: "Setări",
      activeStudents: "Elevi Activi",
      totalVotes: "Total Voturi",
      avgParticipation: "Participare Medie",
      recentActivity: "Activitate Recentă",
      sessionCode: "Cod Sesiune",
      status: "Status",
      active: "Activă",
      closed: "Închisă",
      pending: "În Așteptare",
      viewResults: "Vezi Rezultate",
      manageSession: "Gestionează",
      welcomeBack: "Bine ai revenit",
      sessionName: "Numele Sesiunii",
      selectClass: "Selectează clasa...",
      classLabel: "Clasa",
      candidatesSelected: "selectați",
      cancel: "Anulează",
      createBtn: "Creează Sesiunea",
      votes: "voturi"
    },
    student: {
      joinClass: "Intră în Clasă",
      enterCode: "Introdu Codul Clasei",
      codePlaceholder: "Ex: VOX-2026-A1",
      join: "Alătură-te",
      welcome: "Bine ai venit",
      selectCandidate: "Alege Candidatul Tău",
      vote: "Votează",
      confirmVote: "Confirmă Votul",
      voteSubmitted: "Vot Înregistrat!",
      thankYou: "Mulțumim pentru participare!",
      viewResults: "Vezi Rezultatele",
      backToEducation: "Modulul Educativ",
      enterCodeDesc: "Introdu codul primit de la profesor pentru a vota",
      howItWorks: "Cum funcționează?",
      step1: "Profesorul începe o sesiune de votare",
      step2: "Primești codul unic al clasei tale",
      step3: "Introduci codul și explorezi candidații",
      step4: "Votezi anonim și vezi rezultatele!",
      demoCode: "Demo: Încearcă codul",
      invalidCode: "Cod invalid sau sesiune inactivă. Încearcă: VOX-2026-A1",
      leaveSession: "Părăsește sesiunea",
      youSelected: "Ai selectat:",
      voteRecorded: "Votul tău a fost înregistrat în siguranță și anonim. Poți vedea statisticile oricând.",
      canReturn: "Poți reveni oricând la această pagină pentru a vedea statisticile actualizate",
      homePage: "Acasă",
      otherSession: "Altă sesiune"
    },
    stamp: {
      voted: "VOTAT",
      voteRegistered: "Vot Înregistrat!",
      thanksDemocracy: "Mulțumim pentru participare la procesul democratic!"
    },
    candidates: {
      profile: "Profil Politic",
      platform: "Platformă",
      values: "Valori",
      voteFor: "Votează pentru"
    },
    education: {
      title: "Modulul Educativ",
      subtitle: "Învață despre democrație și procesul electoral",
      democracy: "Ce este Democrația?",
      electoral: "Sistemul Electoral",
      eu: "Uniunea Europeană",
      rights: "Drepturile Cetățeanului",
      quiz: "Test de Cunoștințe",
      badges: "Insignele Tale",
      startQuiz: "Începe Testul",
      progress: "Progres",
      learnByDoing: "Învață prin Practică",
      backToModules: "Înapoi la Module",
      lesson: "Lecția",
      back: "Înapoi",
      continue: "Continuă",
      complete: "Finalizează",
      completed: "Completat",
      lessons: "lecții",
      review: "Revizuiește",
      start: "Începe",
      testKnowledge: "Testează-ți Cunoștințele!",
      testDesc: "Răspunde la întrebări și câștigă insigne pentru realizările tale"
    },
    quiz: {
      question: "Întrebarea",
      of: "din",
      next: "Următoarea",
      finish: "Finalizează",
      score: "Scorul Tău",
      correct: "Răspunsuri Corecte",
      badge: "Ai câștigat o insignă!",
      tryAgain: "Încearcă Din Nou",
      excellent: "Excelent!",
      good: "Bine!",
      needsWork: "Mai exersează!",
      backToEducation: "Înapoi la Educație",
      continueLearning: "Continuă Învățarea"
    },
    auth: {
      teacherLogin: "Autentificare Profesor",
      email: "Email",
      password: "Parolă",
      login: "Conectează-te",
      register: "Înregistrează-te",
      forgotPassword: "Ai uitat parola?",
      noAccount: "Nu ai cont?",
      hasAccount: "Ai deja cont?",
      name: "Nume Complet",
      school: "Liceu",
      invalidEmail: "Email invalid. Încearcă: profesor@liceu.ro",
      demoInfo: "Demo: profesor@liceu.ro (orice parolă)",
      backHome: "Înapoi acasă",
      coordInfo: "Coord. Prof. Mangîr Gabriela"
    },
    archetypes: {
      progressive: "Progresist",
      conservative: "Conservator",
      liberal: "Liberal",
      socialist: "Socialist",
      green: "Ecologist",
      populist: "Populist",
      centrist: "Centrist",
      nationalist: "Naționalist"
    },
    results: {
      title: "Rezultate",
      back: "Înapoi",
      home: "Acasă",
      otherSession: "Altă sesiune",
      totalVotes: "Total Voturi",
      candidatesLabel: "Candidați",
      winner: "Câștigător",
      perCandidate: "Rezultate per Candidat",
      distribution: "Distribuție Voturi",
      genderDist: "Distribuție Gen",
      ageDist: "Distribuție Vârstă",
      votesRegistered: "voturi înregistrate",
      exportBtn: "Export",
      shareBtn: "Partajează",
      votesLabel: "voturi",
      male: "Masculin",
      female: "Feminin",
      nonBinary: "Non-binar",
      years: "ani"
    },
    team: {
      title: "Echipa Noastră",
      subtitle: "Oamenii din spatele proiectului Vox Jeunesse",
      coordinator: "Coordonatoare Proiect",
      studentCoordinator: "Elev Coordonator"
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À Propos",
      teachers: "Enseignants",
      students: "Élèves",
      education: "Éducation",
      login: "Connexion",
      team: "Équipe"
    },
    hero: {
      title: "La Démocratie Numérique pour les Jeunes",
      subtitle: "Simulations électorales interactives au Collège National A.T. Laurian, Botoșani",
      teacherBtn: "Portail Enseignants",
      studentBtn: "Rejoindre la Classe",
      learnBtn: "Découvrir le Module Éducatif"
    },
    features: {
      title: "Comment Ça Marche",
      subtitle: "La plateforme complète pour les simulations électorales",
      voting: {
        title: "Vote Anonyme",
        desc: "Simulations de vote sécurisées et anonymes pour chaque classe"
      },
      education: {
        title: "Éducation Civique",
        desc: "Modules interactifs sur la démocratie et l'UE"
      },
      analytics: {
        title: "Statistiques en Temps Réel",
        desc: "Visualisation immédiate des résultats démographiques"
      },
      bilingual: {
        title: "Bilingue RO/FR",
        desc: "Contenu complet en roumain et français"
      }
    },
    stats: {
      schools: "Lycées Participants",
      students: "Élèves Impliqués",
      votes: "Votes Simulés",
      sessions: "Sessions Actives"
    },
    howItWorks: {
      title: "Le Processus de Vote",
      subtitle: "Trois étapes simples pour une expérience démocratique authentique",
      step1: { title: "Recevez le Code", desc: "L'enseignant génère un code unique pour la session de vote de votre classe" },
      step2: { title: "Choisissez le Candidat", desc: "Explorez les profils des candidats et leurs plateformes politiques" },
      step3: { title: "Votez Anonymement", desc: "Exprimez votre vote en toute sécurité et consultez les résultats agrégés" }
    },
    cta: {
      title: "Prêt à Transformer l'Éducation Civique?",
      subtitle: "Créez votre première session de vote au Collège National A.T. Laurian",
      button: "Commencer Gratuitement"
    },
    footer: {
      description: "Projet éducatif du Collège National A.T. Laurian, Botoșani.",
      coordinator: "Projet coordonné par Prof. Mangîr Gabriela",
      links: "Liens Rapides",
      contact: "Contact",
      legal: "Légal",
      privacy: "Confidentialité",
      terms: "Conditions"
    },
    teacher: {
      dashboard: "Tableau de Bord",
      sessions: "Mes Sessions",
      createSession: "Nouvelle Session",
      candidates: "Candidats",
      results: "Résultats",
      settings: "Paramètres",
      activeStudents: "Élèves Actifs",
      totalVotes: "Total Votes",
      avgParticipation: "Participation Moyenne",
      recentActivity: "Activité Récente",
      sessionCode: "Code Session",
      status: "Statut",
      active: "Active",
      closed: "Fermée",
      pending: "En Attente",
      viewResults: "Voir Résultats",
      manageSession: "Gérer",
      welcomeBack: "Bienvenue",
      sessionName: "Nom de la Session",
      selectClass: "Sélectionner la classe...",
      classLabel: "Classe",
      candidatesSelected: "sélectionnés",
      cancel: "Annuler",
      createBtn: "Créer la Session",
      votes: "votes"
    },
    student: {
      joinClass: "Rejoindre la Classe",
      enterCode: "Entrez le Code de Classe",
      codePlaceholder: "Ex: VOX-2026-A1",
      join: "Rejoindre",
      welcome: "Bienvenue",
      selectCandidate: "Choisissez Votre Candidat",
      vote: "Voter",
      confirmVote: "Confirmer le Vote",
      voteSubmitted: "Vote Enregistré!",
      thankYou: "Merci pour votre participation!",
      viewResults: "Voir les Résultats",
      backToEducation: "Module Éducatif",
      enterCodeDesc: "Entrez le code reçu de votre enseignant pour voter",
      howItWorks: "Comment ça marche?",
      step1: "L'enseignant démarre une session de vote",
      step2: "Vous recevez le code unique de votre classe",
      step3: "Entrez le code et explorez les candidats",
      step4: "Votez anonymement et consultez les résultats!",
      demoCode: "Démo: Essayez le code",
      invalidCode: "Code invalide ou session inactive. Essayez: VOX-2026-A1",
      leaveSession: "Quitter la session",
      youSelected: "Vous avez sélectionné:",
      voteRecorded: "Votre vote a été enregistré en toute sécurité et de manière anonyme.",
      canReturn: "Vous pouvez revenir à tout moment pour consulter les statistiques mises à jour",
      homePage: "Accueil",
      otherSession: "Autre session"
    },
    stamp: {
      voted: "VOTÉ",
      voteRegistered: "Vote Enregistré!",
      thanksDemocracy: "Merci pour votre participation au processus démocratique!"
    },
    candidates: {
      profile: "Profil Politique",
      platform: "Programme",
      values: "Valeurs",
      voteFor: "Voter pour"
    },
    education: {
      title: "Module Éducatif",
      subtitle: "Apprenez sur la démocratie et le processus électoral",
      democracy: "Qu'est-ce que la Démocratie?",
      electoral: "Le Système Électoral",
      eu: "L'Union Européenne",
      rights: "Les Droits du Citoyen",
      quiz: "Test de Connaissances",
      badges: "Vos Badges",
      startQuiz: "Commencer le Test",
      progress: "Progression",
      learnByDoing: "Apprendre par la Pratique",
      backToModules: "Retour aux Modules",
      lesson: "Leçon",
      back: "Précédent",
      continue: "Continuer",
      complete: "Terminer",
      completed: "Terminé",
      lessons: "leçons",
      review: "Réviser",
      start: "Commencer",
      testKnowledge: "Testez vos Connaissances!",
      testDesc: "Répondez aux questions et gagnez des badges pour vos réalisations"
    },
    quiz: {
      question: "Question",
      of: "sur",
      next: "Suivante",
      finish: "Terminer",
      score: "Votre Score",
      correct: "Réponses Correctes",
      badge: "Vous avez gagné un badge!",
      tryAgain: "Réessayer",
      excellent: "Excellent!",
      good: "Bien!",
      needsWork: "À améliorer!",
      backToEducation: "Retour à l'Éducation",
      continueLearning: "Continuer à Apprendre"
    },
    auth: {
      teacherLogin: "Connexion Enseignant",
      email: "Email",
      password: "Mot de passe",
      login: "Se Connecter",
      register: "S'inscrire",
      forgotPassword: "Mot de passe oublié?",
      noAccount: "Pas de compte?",
      hasAccount: "Déjà un compte?",
      name: "Nom Complet",
      school: "Lycée",
      invalidEmail: "Email invalide. Essayez: profesor@liceu.ro",
      demoInfo: "Démo: profesor@liceu.ro (n'importe quel mot de passe)",
      backHome: "Retour à l'accueil",
      coordInfo: "Coord. Prof. Mangîr Gabriela"
    },
    archetypes: {
      progressive: "Progressiste",
      conservative: "Conservateur",
      liberal: "Libéral",
      socialist: "Socialiste",
      green: "Écologiste",
      populist: "Populiste",
      centrist: "Centriste",
      nationalist: "Nationaliste"
    },
    results: {
      title: "Résultats",
      back: "Retour",
      home: "Accueil",
      otherSession: "Autre session",
      totalVotes: "Total Votes",
      candidatesLabel: "Candidats",
      winner: "Gagnant",
      perCandidate: "Résultats par Candidat",
      distribution: "Distribution des Votes",
      genderDist: "Distribution par Genre",
      ageDist: "Distribution par Âge",
      votesRegistered: "votes enregistrés",
      exportBtn: "Exporter",
      shareBtn: "Partager",
      votesLabel: "votes",
      male: "Masculin",
      female: "Féminin",
      nonBinary: "Non-binaire",
      years: "ans"
    },
    team: {
      title: "Notre Équipe",
      subtitle: "Les personnes derrière le projet Vox Jeunesse",
      coordinator: "Coordinatrice du Projet",
      studentCoordinator: "Élève Coordinateur"
    }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("ro");

  const t = (path) => {
    const keys = path.split(".");
    let result = translations[language];
    for (const key of keys) {
      result = result?.[key];
    }
    return result || path;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ro" ? "fr" : "ro"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}