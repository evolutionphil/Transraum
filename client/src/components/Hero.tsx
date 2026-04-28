import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Clock, Briefcase, Zap, BadgeCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CONTACT_INFO } from '@/lib/constants';
import heroImage from '@assets/generated_images/Moving_service_Vienna_8eeb3795.png';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-br from-primary to-primary/90 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" data-testid="text-hero-title">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-white/90" data-testid="text-hero-subtitle">
              {t.hero.subtitle}
            </p>
            <p className="text-lg text-white/80" data-testid="text-hero-description">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                <Button
                  size="lg"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary w-full sm:w-auto text-base font-bold"
                  data-testid="button-hero-call"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  {CONTACT_INFO.phone}
                </Button>
              </a>
              <a href="#kontakt">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm w-full sm:w-auto"
                  data-testid="button-hero-quote"
                >
                  {t.hero.cta1}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Transraum Team"
                className="w-full h-auto"
                data-testid="img-hero"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground rounded-lg p-6 shadow-xl">
              <div className="text-4xl font-bold">26+</div>
              <div className="text-sm font-medium">{t.trust.experience}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-white/10 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: t.trust.available, Icon: Clock },
              { label: t.trust.freeVisit, Icon: Briefcase },
              { label: t.trust.fastService, Icon: Zap },
              { label: 'Transparente Preise', Icon: BadgeCheck },
            ].map((item, i) => (
              <div key={i} className="text-center" data-testid={`trust-indicator-${i}`}>
                <div className="flex justify-center mb-2">
                  <item.Icon className="w-7 h-7 text-secondary" />
                </div>
                <div className="text-sm font-medium text-white">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
