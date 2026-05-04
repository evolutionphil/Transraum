import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingActions from "@/components/FloatingActions";
import Home from "@/pages/Home";
import Districts from "@/pages/Districts";
import DistrictPage from "@/pages/DistrictPage";
import Bundeslaender from "@/pages/Bundeslaender";
import BundeslandPage from "@/pages/BundeslandPage";
import CityPage from "@/pages/CityPage";
import Services from "@/pages/Services";
import ServicePage from "@/pages/ServicePage";
import Contact from "@/pages/Contact";
import Datenschutz from "@/pages/Datenschutz";
import Impressum from "@/pages/Impressum";
import AGB from "@/pages/AGB";
import FAQ from "@/pages/FAQ";
import ServiceRegionPage from "@/pages/ServiceRegionPage";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Shop from "@/pages/Shop";
import ShopProduct from "@/pages/ShopProduct";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        
        <Route path="/de" component={Home} />
        <Route path="/de/bezirke" component={Districts} />
        <Route path="/de/bezirke/:slug" component={DistrictPage} />
        <Route path="/de/bundeslaender" component={Bundeslaender} />
        <Route path="/de/bundeslaender/:bundesland/:city" component={CityPage} />
        <Route path="/de/bundeslaender/:slug" component={BundeslandPage} />
        <Route path="/de/leistungen" component={Services} />
        <Route path="/de/leistungen/:serviceSlug/:regionType/:regionSlug" component={ServiceRegionPage} />
        <Route path="/de/leistungen/:slug" component={ServicePage} />
        <Route path="/de/kontakt" component={Contact} />
        <Route path="/de/datenschutz" component={Datenschutz} />
        <Route path="/de/impressum" component={Impressum} />
        <Route path="/de/agb" component={AGB} />
        <Route path="/de/faq" component={FAQ} />
        <Route path="/de/blog" component={Blog} />
        <Route path="/de/blog/:slug" component={BlogPost} />
        <Route path="/de/pakete" component={Shop} />
        <Route path="/de/pakete/:slug" component={ShopProduct} />
        
        <Route path="/bezirke" component={Districts} />
        <Route path="/bezirke/:slug" component={DistrictPage} />
        <Route path="/bundeslaender" component={Bundeslaender} />
        <Route path="/bundeslaender/:bundesland/:city" component={CityPage} />
        <Route path="/bundeslaender/:slug" component={BundeslandPage} />
        <Route path="/leistungen" component={Services} />
        <Route path="/leistungen/:serviceSlug/:regionType/:regionSlug" component={ServiceRegionPage} />
        <Route path="/leistungen/:slug" component={ServicePage} />
        <Route path="/kontakt" component={Contact} />
        <Route path="/datenschutz" component={Datenschutz} />
        <Route path="/impressum" component={Impressum} />
        <Route path="/agb" component={AGB} />
        <Route path="/faq" component={FAQ} />
        
        <Route path="/en" component={Home} />
        <Route path="/en/districts" component={Districts} />
        <Route path="/en/districts/:slug" component={DistrictPage} />
        <Route path="/en/federal-states" component={Bundeslaender} />
        <Route path="/en/federal-states/:bundesland/:city" component={CityPage} />
        <Route path="/en/federal-states/:slug" component={BundeslandPage} />
        <Route path="/en/services" component={Services} />
        <Route path="/en/services/:serviceSlug/:regionType/:regionSlug" component={ServiceRegionPage} />
        <Route path="/en/services/:slug" component={ServicePage} />
        <Route path="/en/contact" component={Contact} />
        <Route path="/en/privacy-policy" component={Datenschutz} />
        <Route path="/en/imprint" component={Impressum} />
        <Route path="/en/terms" component={AGB} />
        <Route path="/en/faq" component={FAQ} />
        <Route path="/en/blog" component={Blog} />
        <Route path="/en/blog/:slug" component={BlogPost} />
        <Route path="/en/packages" component={Shop} />
        <Route path="/en/packages/:slug" component={ShopProduct} />
        <Route path="/pakete" component={Shop} />
        <Route path="/pakete/:slug" component={ShopProduct} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <FloatingActions />
          <Router />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
