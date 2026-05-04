import { useState } from 'react';
import { Link, useLocation, useRouter } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CONTACT_INFO } from '@/lib/constants';
import { getLocalizedPath, getLocalizedDistrictsPath, getLocalizedBundeslaenderPath } from '@/lib/urlMapping';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ServiceId, getLocalizedServicePath } from '@/data/services';
import { getAllDistricts } from '@/data/districts';
import { states } from '@/data/states';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { language, t } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'de' ? 'en' : 'de';
    const newPath = getLocalizedPath(location, newLanguage);
    setLocation(newPath);
  };

  const navItems = [
    { label: t.nav.home, path: language === 'de' ? '/' : '/en' },
    { label: t.nav.services, path: language === 'de' ? '/leistungen' : '/en/services' },
  ];

  const allDistricts = getAllDistricts();
  const allStates = states;

  const estatePurchaseServices = [
    { id: ServiceId.ERBSTUECKSANKAUF, label: t.estatePurchase.heirlooms },
    { id: ServiceId.GOLDANKAUF, label: t.estatePurchase.gold },
    { id: ServiceId.TEPPICHANKAUF, label: t.estatePurchase.carpets },
    { id: ServiceId.BILDERANKAUF, label: t.estatePurchase.paintings },
    { id: ServiceId.ANTIKWARENANKAUF, label: t.estatePurchase.antiques },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={language === 'de' ? '/' : '/en'} className="flex items-center gap-2" data-testid="link-logo">
            <div className="bg-[hsl(46,100%,50%)] px-5 py-3 rounded-sm flex items-center">
              <span className="text-black font-extrabold tracking-widest text-xl uppercase" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}>
                TRANSRAUM
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === item.path ? 'text-primary' : 'text-foreground'
                }`}
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium h-auto p-0 bg-transparent hover:bg-transparent" data-testid="menu-districts">
                    {t.nav.districts}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-64 gap-1 p-2 max-h-96 overflow-y-auto">
                      {allDistricts.map((district) => (
                        <li key={district.slug}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={getLocalizedDistrictsPath(language, district.slug)}
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm"
                              data-testid={`link-district-${district.slug}`}
                            >
                              {language === 'de' ? district.name : district.nameEn}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium h-auto p-0 bg-transparent hover:bg-transparent" data-testid="menu-states">
                    {t.nav.states}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-56 gap-1 p-2">
                      {allStates.map((state) => (
                        <li key={state.slug}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={getLocalizedBundeslaenderPath(language, state.slug)}
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm"
                              data-testid={`link-state-${state.slug}`}
                            >
                              {language === 'de' ? state.name : state.nameEn}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium h-auto p-0 bg-transparent hover:bg-transparent" data-testid="menu-estate-purchase">
                    {t.nav.estatePurchase}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-56 gap-1 p-2">
                      {estatePurchaseServices.map((service) => (
                        <li key={service.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={getLocalizedServicePath(service.id, language)}
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm"
                              data-testid={`link-estate-${service.id}`}
                            >
                              {service.label}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              href={language === 'de' ? '/kontakt' : '/en/contact'}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === (language === 'de' ? '/kontakt' : '/en/contact') ? 'text-primary' : 'text-foreground'
              }`}
              data-testid="link-nav-contact"
            >
              {t.nav.contact}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              data-testid="button-language-toggle"
              className="text-muted-foreground"
            >
              <Globe className="w-5 h-5" />
            </Button>
            <span className="text-sm font-medium">{language.toUpperCase()}</span>
            <a href={`tel:${CONTACT_INFO.phoneLink}`}>
              <Button variant="outline" size="sm" data-testid="button-call-desktop">
                <Phone className="w-4 h-4 mr-2" />
                {t.nav.callNow}
              </Button>
            </a>
            <a href="#kontakt">
              <Button variant="default" size="sm" data-testid="button-quote-desktop" className="bg-secondary text-secondary-foreground hover:bg-secondary">
                {t.nav.getQuote}
              </Button>
            </a>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block px-4 py-2 rounded-md text-sm font-medium ${
                  location === item.path ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="districts" className="border-none">
                <AccordionTrigger className="px-4 py-2 text-sm font-medium hover:no-underline hover:bg-accent rounded-md" data-testid="accordion-districts">
                  {t.nav.districts}
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="space-y-1 pl-4 pt-1 max-h-64 overflow-y-auto">
                    {allDistricts.map((district) => (
                      <Link
                        key={district.slug}
                        href={getLocalizedDistrictsPath(language, district.slug)}
                        className="block px-4 py-2 rounded-md text-sm hover:bg-accent"
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid={`link-mobile-district-${district.slug}`}
                      >
                        {language === 'de' ? district.name : district.nameEn}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="states" className="border-none">
                <AccordionTrigger className="px-4 py-2 text-sm font-medium hover:no-underline hover:bg-accent rounded-md" data-testid="accordion-states">
                  {t.nav.states}
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="space-y-1 pl-4 pt-1">
                    {allStates.map((state) => (
                      <Link
                        key={state.slug}
                        href={getLocalizedBundeslaenderPath(language, state.slug)}
                        className="block px-4 py-2 rounded-md text-sm hover:bg-accent"
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid={`link-mobile-state-${state.slug}`}
                      >
                        {language === 'de' ? state.name : state.nameEn}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="estate-purchase" className="border-none">
                <AccordionTrigger className="px-4 py-2 text-sm font-medium hover:no-underline hover:bg-accent rounded-md" data-testid="accordion-estate-purchase">
                  {t.nav.estatePurchase}
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="space-y-1 pl-4 pt-1">
                    {estatePurchaseServices.map((service) => (
                      <Link
                        key={service.id}
                        href={getLocalizedServicePath(service.id, language)}
                        className="block px-4 py-2 rounded-md text-sm hover:bg-accent"
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid={`link-mobile-estate-${service.id}`}
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link
              href={language === 'de' ? '/kontakt' : '/en/contact'}
              className={`block px-4 py-2 rounded-md text-sm font-medium ${
                location === (language === 'de' ? '/kontakt' : '/en/contact') ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
              }`}
              onClick={() => setMobileMenuOpen(false)}
              data-testid="link-mobile-contact"
            >
              {t.nav.contact}
            </Link>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                data-testid="button-language-mobile"
              >
                <Globe className="w-4 h-4 mr-2" />
                {language.toUpperCase()}
              </Button>
              <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                <Button variant="default" size="sm" data-testid="button-call-mobile">
                  <Phone className="w-4 h-4 mr-2" />
                  {t.nav.callNow}
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
