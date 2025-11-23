import { useLanguage } from '@/hooks/useLanguage';
import { SEO } from '@/components/SEO';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Linkedin, Github, Globe, Award, BookOpen, Heart } from 'lucide-react';

export default function AuthorBio() {
  const { language, isRTL } = useLanguage();

  const content = {
    fr: {
      title: "À propos de l'auteur",
      name: "BENTALBA ZAKARIA",
      role: "Fondateur & Développeur de TAAWIDATY",
      bio: `Bonjour, je m'appelle Zakaria BENTALBA. J'ai créé TAAWIDATY après avoir vécu personnellement les difficultés à comprendre les remboursements de médicaments au Maroc.

**Mon parcours :**
- Développeur web full-stack avec 5+ ans d'expérience
- Bénéficiaire de l'assurance maladie
- Passionné par la transparence des données de santé publique

**Pourquoi TAAWIDATY ?**
En 2024, j'ai été confronté à une situation où je devais acheter un médicament coûteux. À la pharmacie, j'ai découvert que le montant du remboursement était beaucoup plus bas que ce que j'avais estimé. Cette expérience m'a motivé à créer un outil qui donne aux Marocains la transparence qu'ils méritent.

**Ma mission :**
Rendre les informations sur les remboursements de médicaments accessibles, gratuites et faciles à comprendre pour tous les citoyens marocains.`,
      credentials: ["Développement Web", "Assurance Santé", "Analyse de Données Publiques"],
      contact: "bentalba@taawidaty.ma",
      connect: "Me contacter",
      sections: {
        background: "Mon Parcours",
        story: "L'Histoire de TAAWIDATY",
        mission: "Ma Mission"
      }
    },
    ar: {
      title: "عن المؤلف",
      name: "بنطالبة زكرياء",
      role: "مؤسس ومطور تعويضاتي",
      bio: `مرحباً، اسمي زكرياء بنطالبة. قمت بإنشاء تعويضاتي بعد أن واجهت شخصياً صعوبات في فهم استرداد تكاليف الأدوية في المغرب.

**مساري المهني:**
- مطور ويب شامل بخبرة تزيد عن 5 سنوات
- مستفيد من التأمين الصحي
- شغوف بشفافية البيانات الصحية العامة

**لماذا تعويضاتي؟**
في عام 2024، واجهت موقفاً اضطررت فيه لشراء دواء باهظ الثمن. في الصيدلية، اكتشفت أن مبلغ الاسترداد كان أقل بكثير مما كنت أتوقعه. هذه التجربة دفعتني لإنشاء أداة تمنح المغاربة الشفافية التي يستحقونها.

**مهمتي:**
جعل المعلومات حول استرداد الأدوية متاحة ومجانية وسهلة الفهم لجميع المواطنين المغاربة.`,
      credentials: ["تطوير الويب", "التأمين الصحي", "تحليل البيانات العامة"],
      contact: "bentalba@taawidaty.ma",
      connect: "تواصل معي",
      sections: {
        background: "مساري المهني",
        story: "قصة تعويضاتي",
        mission: "مهمتي"
      }
    }
  };

  const t = content[language];

  // Parse bio into sections for better display
  const bioSections = t.bio.split('\n\n');

  return (
    <>
      <SEO 
        title={`${t.title} - ${t.name} | Taawidaty`}
        description={`Découvrez le parcours de ${t.name}, fondateur de Taawidaty.`}
        keywords="Zakaria Bentalba, Taawidaty, auteur, développeur, assurance maladie maroc"
        canonical="https://taawidaty.ma/author"
        lang={language}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "BENTALBA ZAKARIA",
            "jobTitle": "Founder & Developer",
            "url": "https://taawidaty.ma/author",
            "sameAs": [
              "https://linkedin.com/in/zakaria-bentalba",
              "https://github.com/zakaria-bentalba"
            ],
            "worksFor": {
              "@type": "Organization",
              "name": "Taawidaty"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-none shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
            <CardContent className="relative pt-0 pb-8 px-6 sm:px-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-6 gap-6">
                <Avatar className="w-32 h-32 border-4 border-white dark:border-slate-900 shadow-lg">
                  <AvatarImage src="/logos/author-avatar.png" alt={t.name} />
                  <AvatarFallback className="text-2xl font-bold bg-slate-200 text-slate-700">ZB</AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left flex-1 pb-2">
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{t.name}</h1>
                  <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">{t.role}</p>
                </div>
                <div className="flex gap-2 pb-2">
                  <Button variant="outline" size="icon" asChild>
                    <a href="mailto:bentalba@taawidaty.ma" aria-label="Email">
                      <Mail className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="md:col-span-2 space-y-6">
                  {bioSections.map((section, index) => {
                    if (section.startsWith('**')) {
                      const title = section.match(/\*\*(.*?)\*\*/)?.[1];
                      const content = section.replace(/\*\*.*?\*\*/, '').trim();
                      return (
                        <div key={index} className="prose dark:prose-invert max-w-none">
                          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                            {index === 1 && <Award className="w-5 h-5 text-blue-500" />}
                            {index === 2 && <Heart className="w-5 h-5 text-red-500" />}
                            {index === 3 && <Globe className="w-5 h-5 text-green-500" />}
                            {title}
                          </h3>
                          <div className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                            {content}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <p key={index} className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                        {section}
                      </p>
                    );
                  })}
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      {language === 'fr' ? 'Expertise' : 'الخبرة'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {t.credentials.map((cred, i) => (
                        <Badge key={i} variant="secondary" className="bg-white dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 transition-colors">
                          {cred}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
                    <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                      {language === 'fr' ? 'Contactez-moi' : 'تواصل معي'}
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                      {language === 'fr' 
                        ? "Une question sur le projet ou une suggestion ?" 
                        : "هل لديك سؤال حول المشروع أو اقتراح؟"}
                    </p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Mail className="w-4 h-4 mr-2" />
                      {t.contact}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
