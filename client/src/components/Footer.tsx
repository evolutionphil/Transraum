import { Link } from 'wouter';
import { Phone, MapPin, Clock, BookOpen } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { useLanguage } from '@/contexts/LanguageContext';
import { CONTACT_INFO } from '@/lib/constants';
import { states } from '@/data/states';
import { getAllDistricts } from '@/data/districts';

export default function Footer() {
  const { t, language } = useLanguage();
  const servicesPath = language === 'de' ? '/leistungen' : '/en/services';
  const districtsPath = language === 'de' ? '/bezirke' : '/en/districts';
  const statesPath = language === 'de' ? '/bundeslaender' : '/en/federal-states';
  const privacyPath = language === 'de' ? '/datenschutz' : '/en/privacy-policy';
  const imprintPath = language === 'de' ? '/impressum' : '/en/imprint';
  const termsPath = language === 'de' ? '/agb' : '/en/terms';
  const faqPath = language === 'de' ? '/faq' : '/en/faq';
  const blogPath = language === 'de' ? '/de/blog' : '/en/blog';
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.phoneLink}?text=${encodeURIComponent(t.contact.whatsappMessage)}`;

  const allDistricts = getAllDistricts();
  const displayDistricts = allDistricts.slice(0, 8);
  const displayStates = states;

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div>
            <Link href={language === 'de' ? '/de' : '/en'} className="hover:opacity-80 transition-opacity">
              <h3 className="text-xl font-bold mb-4" data-testid="link-footer-home">Transraum</h3>
            </Link>
            <p className="text-sm text-primary-foreground/80 mb-4">
              {t.footer.companyDescription}
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4" data-testid="text-footer-services">
              {t.footer.services}
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href={servicesPath} className="hover:text-primary-foreground">{language === 'de' ? 'Wohnungsräumung' : 'Apartment Clearing'}</Link></li>
              <li><Link href={servicesPath} className="hover:text-primary-foreground">{language === 'de' ? 'Hausräumung' : 'House Clearing'}</Link></li>
              <li><Link href={servicesPath} className="hover:text-primary-foreground">{language === 'de' ? 'Verlassenschaft' : 'Estate Clearing'}</Link></li>
              <li><Link href={`${servicesPath}/${language === 'de' ? 'transportservice' : 'transport-service'}`} className="hover:text-primary-foreground">{language === 'de' ? 'Transportservice' : 'Transport Service'}</Link></li>
              <li className="pt-2 border-t border-primary-foreground/20">
                <Link href={language === 'de' ? '/de/pakete' : '/en/packages'} className="hover:text-primary-foreground">
                  {language === 'de' ? 'Pakete & Preise' : 'Packages & Prices'}
                </Link>
              </li>
              <li>
                <Link href={blogPath} className="hover:text-primary-foreground flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  {language === 'de' ? 'Blog & Ratgeber' : 'Blog & Guide'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4" data-testid="text-footer-districts">
              {t.footer.districts}
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {displayDistricts.map((district) => (
                <li key={district.slug}>
                  <Link href={`${districtsPath}/${district.slug}`} className="hover:text-primary-foreground">
                    {language === 'de' ? district.name : (district.nameEn || district.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4" data-testid="text-footer-states">
              {t.footer.states}
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {displayStates.map((state) => (
                <li key={state.slug}>
                  <Link href={`${statesPath}/${state.slug}`} className="hover:text-primary-foreground">
                    {language === 'de' ? state.name : state.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4" data-testid="text-footer-contact">
              {t.footer.contact}
            </h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <a href={`tel:${CONTACT_INFO.phoneLink}`} className="hover:text-primary-foreground font-semibold">{CONTACT_INFO.phone}</a>
              </li>
              <li className="flex items-start gap-2">
                <SiWhatsapp className="w-4 h-4 mt-0.5 shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground">WhatsApp</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{CONTACT_INFO.address.street}, {CONTACT_INFO.address.postalCode} {CONTACT_INFO.address.city}</span>
              </li>
              <li className="flex items-start gap-2 mt-4 pt-3 border-t border-primary-foreground/20">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="font-semibold">{t.contact.hours.weekdays}:</span>
                    <span>{t.contact.hours.weekdaysTime}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold">{t.contact.hours.saturday}:</span>
                    <span>{t.contact.hours.saturdayTime}</span>
                  </div>
                  <div className="mt-2 text-accent font-semibold">
                    {t.contact.hours.emergency}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/80">
          <p data-testid="text-footer-copyright">{t.footer.copyright}</p>
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
            <Link href={blogPath} className="hover:text-primary-foreground flex items-center gap-1" data-testid="link-footer-blog">
              <BookOpen className="w-3.5 h-3.5" />
              Blog
            </Link>
            <Link href={faqPath} className="hover:text-primary-foreground" data-testid="link-footer-faq">{t.footer.faq}</Link>
            <Link href={privacyPath} className="hover:text-primary-foreground" data-testid="link-footer-privacy">{t.footer.privacy}</Link>
            <Link href={imprintPath} className="hover:text-primary-foreground" data-testid="link-footer-imprint">{t.footer.imprint}</Link>
            <Link href={termsPath} className="hover:text-primary-foreground" data-testid="link-footer-terms">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
