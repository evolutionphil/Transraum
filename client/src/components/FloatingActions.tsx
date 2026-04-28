import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { CONTACT_INFO } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FloatingActions() {
  const { t } = useLanguage();
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.phoneLink}?text=${encodeURIComponent(t.contact.whatsappMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <Button
          className="h-14 rounded-full shadow-xl bg-green-500 hover:bg-green-600 text-white pl-4 pr-5 gap-2"
          data-testid="button-float-whatsapp"
        >
          <SiWhatsapp className="w-6 h-6 shrink-0" />
          <span className="hidden sm:inline font-semibold text-sm">WhatsApp</span>
        </Button>
      </a>
      <a href={`tel:${CONTACT_INFO.phoneLink}`}>
        <Button
          className="h-14 rounded-full shadow-xl bg-secondary text-secondary-foreground hover:bg-secondary pl-4 pr-5 gap-2"
          data-testid="button-float-phone"
        >
          <Phone className="w-6 h-6 shrink-0" />
          <span className="hidden sm:inline font-bold text-sm">{CONTACT_INFO.phone}</span>
        </Button>
      </a>
    </div>
  );
}
