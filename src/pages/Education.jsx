import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  BookOpen,
  Vote,
  Globe,
  Scale,
  Award,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Badge from "../components/Badge";
import BrandWatermark from "../components/BrandWatermark";
import { useLanguage } from "../context/LanguageContext";
import { mockBadges } from "../data/mockData";

export default function Education() {
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [completedModules, setCompletedModules] = useState([]);
  const { t, language } = useLanguage();

  useEffect(() => {
    const badges = JSON.parse(localStorage.getItem("voxBadges") || "[]");
    setEarnedBadges(badges);
    const completed = JSON.parse(localStorage.getItem("voxCompletedModules") || "[]");
    setCompletedModules(completed);
  }, []);

  const modules = [
    {
      id: "democracy",
      icon: BookOpen,
      title: t("education.democracy"),
      description: language === "ro"
        ? "Principiile fundamentale ale democrației și importanța participării civice"
        : "Les principes fondamentaux de la démocratie et l'importance de la participation civique",
      color: "from-royal-700 to-royal-600",
      lessons: 4
    },
    {
      id: "electoral",
      icon: Vote,
      title: t("education.electoral"),
      description: language === "ro"
        ? "Cum funcționează alegerile, sistemele de vot și dreptul la vot"
        : "Comment fonctionnent les élections, les systèmes de vote et le droit de vote",
      color: "from-gold-500 to-gold-600",
      lessons: 3
    },
    {
      id: "eu",
      icon: Globe,
      title: t("education.eu"),
      description: language === "ro"
        ? "Instituțiile UE, procesul de decizie și cetățenia europeană"
        : "Les institutions de l'UE, le processus décisionnel et la citoyenneté européenne",
      color: "from-blue-500 to-blue-600",
      lessons: 5
    },
    {
      id: "rights",
      icon: Scale,
      title: t("education.rights"),
      description: language === "ro"
        ? "Carta Drepturilor Fundamentale și protecția libertăților"
        : "La Charte des droits fondamentaux et la protection des libertés",
      color: "from-purple-500 to-purple-600",
      lessons: 4
    }
  ];

  const moduleContent = {
    democracy: {
      ro: [
        { title: "Ce este Democrația?", content: "Democrația este un sistem de guvernare în care puterea aparține poporului. Cuvântul vine din greacă: demos (popor) și kratos (putere). În democrație, cetățenii au dreptul să participe la procesul de luare a deciziilor, fie direct, fie prin reprezentanți aleși." },
        { title: "Principiile Democrației", content: "Principalele principii democratice includ: suveranitatea poporului, egalitatea în fața legii, libertatea de exprimare, dreptul la vot, separarea puterilor în stat și protecția drepturilor minorităților." },
        { title: "Tipuri de Democrație", content: "Există mai multe tipuri de democrație: directă (cetățenii votează direct pe legi), reprezentativă (cetățenii aleg reprezentanți) și participativă (combină elemente din ambele)." },
        { title: "De Ce Contează Participarea?", content: "Participarea civică este esențială pentru o democrație sănătoasă. Când cetățenii se implică, guvernul reflectă mai bine nevoile populației și deciziile sunt mai legitime." }
      ],
      fr: [
        { title: "Qu'est-ce que la Démocratie?", content: "La démocratie est un système de gouvernement où le pouvoir appartient au peuple. Le mot vient du grec: demos (peuple) et kratos (pouvoir). En démocratie, les citoyens ont le droit de participer au processus décisionnel, directement ou par des représentants élus." },
        { title: "Les Principes de la Démocratie", content: "Les principaux principes démocratiques comprennent: la souveraineté du peuple, l'égalité devant la loi, la liberté d'expression, le droit de vote, la séparation des pouvoirs et la protection des droits des minorités." },
        { title: "Types de Démocratie", content: "Il existe plusieurs types de démocratie: directe (les citoyens votent directement sur les lois), représentative (les citoyens élisent des représentants) et participative (combine des éléments des deux)." },
        { title: "Pourquoi la Participation Compte?", content: "La participation civique est essentielle pour une démocratie saine. Quand les citoyens s'impliquent, le gouvernement reflète mieux les besoins de la population et les décisions sont plus légitimes." }
      ]
    },
    electoral: {
      ro: [
        { title: "Ce sunt Alegerile?", content: "Alegerile sunt procesul prin care cetățenii își aleg reprezentanții. Acestea pot fi locale, parlamentare, prezidențiale sau europene. Fiecare tip de alegeri are reguli și proceduri specifice." },
        { title: "Sistemele de Vot", content: "Există mai multe sisteme electorale: majoritar (câștigătorul ia totul), proporțional (locurile sunt distribuite proporțional cu voturile) și mixt (combină ambele sisteme). Fiecare are avantaje și dezavantaje." },
        { title: "Dreptul la Vot", content: "Dreptul la vot este un drept fundamental al cetățeanului. În România, cetățenii pot vota de la 18 ani. Votul este universal, egal, direct, secret și liber exprimat." }
      ],
      fr: [
        { title: "Que sont les Élections?", content: "Les élections sont le processus par lequel les citoyens choisissent leurs représentants. Elles peuvent être locales, parlementaires, présidentielles ou européennes. Chaque type d'élection a des règles et des procédures spécifiques." },
        { title: "Les Systèmes de Vote", content: "Il existe plusieurs systèmes électoraux: majoritaire (le gagnant prend tout), proportionnel (les sièges sont distribués proportionnellement aux votes) et mixte (combine les deux systèmes). Chacun a ses avantages et inconvénients." },
        { title: "Le Droit de Vote", content: "Le droit de vote est un droit fondamental du citoyen. En France, les citoyens peuvent voter dès 18 ans. Le vote est universel, égal, direct, secret et librement exprimé." }
      ]
    },
    eu: {
      ro: [
        { title: "Ce este Uniunea Europeană?", content: "Uniunea Europeană este o uniune politică și economică formată din 27 de state membre. A fost fondată pentru a promova pacea, stabilitatea și prosperitatea în Europa." },
        { title: "Instituțiile UE", content: "Principalele instituții ale UE sunt: Parlamentul European (ales direct de cetățeni), Consiliul European, Consiliul UE, Comisia Europeană și Curtea de Justiție." },
        { title: "Parlamentul European", content: "Parlamentul European este singura instituție a UE aleasă direct de cetățenii europeni. Are putere legislativă, bugetară și de control. Deputații europeni reprezintă interesele cetățenilor." },
        { title: "Cetățenia Europeană", content: "Fiecare cetățean al unui stat membru este automat cetățean european. Cetățenia europeană oferă drepturi precum libera circulație, dreptul de vot la alegerile europene și protecție consulară." },
        { title: "Valorile UE", content: "Uniunea Europeană se bazează pe valorile demnității umane, libertății, democrației, egalității, statului de drept și respectării drepturilor omului, inclusiv drepturile persoanelor aparținând minorităților." }
      ],
      fr: [
        { title: "Qu'est-ce que l'Union Européenne?", content: "L'Union européenne est une union politique et économique composée de 27 États membres. Elle a été fondée pour promouvoir la paix, la stabilité et la prospérité en Europe." },
        { title: "Les Institutions de l'UE", content: "Les principales institutions de l'UE sont: le Parlement européen (élu directement par les citoyens), le Conseil européen, le Conseil de l'UE, la Commission européenne et la Cour de justice." },
        { title: "Le Parlement Européen", content: "Le Parlement européen est la seule institution de l'UE élue directement par les citoyens européens. Il a un pouvoir législatif, budgétaire et de contrôle. Les députés européens représentent les intérêts des citoyens." },
        { title: "La Citoyenneté Européenne", content: "Tout citoyen d'un État membre est automatiquement citoyen européen. La citoyenneté européenne offre des droits tels que la libre circulation, le droit de vote aux élections européennes et la protection consulaire." },
        { title: "Les Valeurs de l'UE", content: "L'Union européenne est fondée sur les valeurs de dignité humaine, de liberté, de démocratie, d'égalité, de l'état de droit et du respect des droits de l'homme, y compris les droits des minorités." }
      ]
    },
    rights: {
      ro: [
        { title: "Carta Drepturilor Fundamentale", content: "Carta Drepturilor Fundamentale a UE reunește într-un singur document toate drepturile civile, politice, economice și sociale ale cetățenilor și rezidenților UE." },
        { title: "Libertatea de Exprimare", content: "Libertatea de exprimare permite comunicarea liberă a ideilor fără cenzură prealabilă. Este un pilon al democrației, dar vine și cu responsabilitatea de a respecta drepturile celorlalți." },
        { title: "Dreptul la Educație", content: "Fiecare persoană are dreptul la educație și la acces la formare profesională și perfecționare. Educația obligatorie trebuie să fie gratuită." },
        { title: "Protecția Drepturilor", content: "Drepturile fundamentale sunt protejate prin mecanisme juridice naționale și europene. Curtea Europeană a Drepturilor Omului și Curtea de Justiție a UE veghează la respectarea lor." }
      ],
      fr: [
        { title: "La Charte des Droits Fondamentaux", content: "La Charte des droits fondamentaux de l'UE réunit dans un seul document tous les droits civils, politiques, économiques et sociaux des citoyens et résidents de l'UE." },
        { title: "La Liberté d'Expression", content: "La liberté d'expression permet la communication libre des idées sans censure préalable. C'est un pilier de la démocratie, mais elle s'accompagne de la responsabilité de respecter les droits des autres." },
        { title: "Le Droit à l'Éducation", content: "Toute personne a droit à l'éducation et à l'accès à la formation professionnelle et au perfectionnement. L'enseignement obligatoire doit être gratuit." },
        { title: "La Protection des Droits", content: "Les droits fondamentaux sont protégés par des mécanismes juridiques nationaux et européens. La Cour européenne des droits de l'homme et la Cour de justice de l'UE veillent à leur respect." }
      ]
    }
  };

  const [selectedModule, setSelectedModule] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);

  const handleStartModule = (moduleId) => {
    setSelectedModule(moduleId);
    setCurrentLesson(0);
  };

  const handleCompleteModule = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      const updated = [...completedModules, moduleId];
      setCompletedModules(updated);
      localStorage.setItem("voxCompletedModules", JSON.stringify(updated));
      const badgeMap = { democracy: "democracy-master", electoral: "electoral-expert", eu: "eu-citizen", rights: "rights-defender" };
      const badgeId = badgeMap[moduleId];
      if (badgeId && !earnedBadges.includes(badgeId)) {
        const updatedBadges = [...earnedBadges, badgeId];
        setEarnedBadges(updatedBadges);
        localStorage.setItem("voxBadges", JSON.stringify(updatedBadges));
      }
    }
    setSelectedModule(null);
  };

  const isModuleCompleted = (moduleId) => completedModules.includes(moduleId);

  return (
    <div id="education-page" className="min-h-screen bg-surface-500 relative">
      <BrandWatermark size="lg" position="top-right" />
      <Navbar />

      <section id="education-hero" className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-royal-700/10 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-gold-500/10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
        </div>
        <div className="max-w-[2400px] mx-auto relative z-10">
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10 text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/20 text-gold-400 text-lg font-extralight mb-6">
                  <BookOpen className="w-5 h-5" />
                  {t("education.learnByDoing")}
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6">{t("education.title")}</h1>
                <p className="text-xl font-extralight text-white/60 max-w-2xl mx-auto">{t("education.subtitle")}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {selectedModule && moduleContent[selectedModule] ? (
        <section id="education-lesson" className="py-16">
          <div className="max-w-[2400px] mx-auto">
            <div className="grid grid-cols-12">
              <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
                <button onClick={() => setSelectedModule(null)} className="flex items-center gap-2 text-lg font-extralight text-white/60 hover:text-white mb-8 transition-colors">
                  ← {t("education.backToModules")}
                </button>
                <div className="bg-surface-400/50 rounded-md border border-white/10 overflow-hidden">
                  <div className="bg-gradient-to-r from-royal-700 to-royal-600 p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="font-display text-2xl font-medium text-white">{modules.find((m) => m.id === selectedModule)?.title}</h2>
                      <span className="text-lg font-extralight text-white/80">{t("education.lesson")} {currentLesson + 1} / {moduleContent[selectedModule][language].length}</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <motion.div key={currentLesson} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <h3 className="font-display text-2xl font-medium text-white mb-6">{moduleContent[selectedModule][language][currentLesson].title}</h3>
                      <p className="text-xl font-extralight text-white/70 leading-relaxed mb-8">{moduleContent[selectedModule][language][currentLesson].content}</p>
                    </motion.div>
                    <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                      {currentLesson > 0 && (
                        <button onClick={() => setCurrentLesson((prev) => prev - 1)} className="px-6 py-3 rounded-md border border-white/20 text-white text-lg font-extralight hover:bg-white/5 transition-colors">
                          ← {t("education.back")}
                        </button>
                      )}
                      <div className="flex-1" />
                      {currentLesson < moduleContent[selectedModule][language].length - 1 ? (
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setCurrentLesson((prev) => prev + 1)} className="px-6 py-3 rounded-md bg-gradient-to-r from-royal-700 to-royal-600 text-white font-display font-medium text-lg flex items-center gap-2">
                          {t("education.continue")}
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      ) : (
                        <div className="flex gap-3">
                          <Link to={`/quiz/${selectedModule}`}>
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-6 py-3 rounded-md bg-gradient-to-r from-gold-500 to-gold-600 text-surface-900 font-display font-medium text-lg flex items-center gap-2">
                              {t("education.startQuiz")}
                              <ArrowRight className="w-5 h-5" />
                            </motion.button>
                          </Link>
                          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleCompleteModule(selectedModule)} className="px-6 py-3 rounded-md bg-green-500 text-white font-display font-medium text-lg flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            {t("education.complete")}
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section id="education-modules" className="py-16">
            <div className="max-w-[2400px] mx-auto">
              <div className="grid grid-cols-12">
                <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {modules.map((module, idx) => (
                      <motion.div key={module.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -8 }} className={`bg-surface-400/50 rounded-md overflow-hidden border transition-all ${isModuleCompleted(module.id) ? "border-green-500/30" : "border-white/10 hover:border-royal-600/50"}`}>
                        <div className={`h-2 bg-gradient-to-r ${module.color}`} />
                        <div className="p-8">
                          <div className="flex items-start justify-between mb-6">
                            <div className={`w-14 h-14 rounded-md bg-gradient-to-br ${module.color} flex items-center justify-center`}>
                              <module.icon className="w-7 h-7 text-white" />
                            </div>
                            {isModuleCompleted(module.id) && (
                              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-lg font-extralight">
                                <CheckCircle className="w-4 h-4" />
                                {t("education.completed")}
                              </span>
                            )}
                          </div>
                          <h3 className="font-display text-2xl font-medium text-white mb-3">{module.title}</h3>
                          <p className="text-lg font-extralight text-white/60 mb-6 leading-relaxed">{module.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-extralight text-white/40">{module.lessons} {t("education.lessons")}</span>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} onClick={() => handleStartModule(module.id)} className={`px-5 py-2 rounded-lg font-display font-medium text-lg flex items-center gap-2 transition-colors ${isModuleCompleted(module.id) ? "bg-green-500/20 text-green-400" : "bg-royal-700 text-white hover:bg-royal-600"}`}>
                              {isModuleCompleted(module.id) ? t("education.review") : t("education.start")}
                              <ArrowRight className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="education-badges" className="py-16 bg-surface-400/30">
            <div className="max-w-[2400px] mx-auto">
              <div className="grid grid-cols-12">
                <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
                  <div className="flex items-center gap-4 mb-8">
                    <Award className="w-8 h-8 text-gold-400" />
                    <h2 className="font-display text-3xl font-medium text-white">{t("education.badges")}</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {mockBadges.map((badge) => (
                      <Badge key={badge.id} badge={badge} earned={earnedBadges.includes(badge.id)} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="education-cta" className="py-24">
            <div className="max-w-[2400px] mx-auto">
              <div className="grid grid-cols-12">
                <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
                  <div className="bg-gradient-to-r from-royal-800 to-royal-900 rounded-md p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] border border-gold-400/30 rounded-full" />
                    </div>
                    <div className="relative z-10">
                      <Award className="w-16 h-16 text-gold-400 mx-auto mb-6" />
                      <h2 className="font-display text-3xl md:text-4xl font-medium text-white mb-4">{t("education.testKnowledge")}</h2>
                      <p className="text-xl font-extralight text-white/70 mb-8 max-w-xl mx-auto">{t("education.testDesc")}</p>
                      <Link to="/quiz/democracy">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="px-10 py-4 rounded-md bg-gradient-to-r from-gold-400 to-gold-500 text-surface-900 font-display font-medium text-xl shadow-lg shadow-gold-500/30">
                          {t("education.startQuiz")}
                          <ArrowRight className="inline-block ml-3 w-5 h-5" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}