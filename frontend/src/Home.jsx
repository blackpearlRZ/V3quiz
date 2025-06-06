import CTASection from "./components/home/CTASection"
import FeatureSection from "./components/home/FeatureSection"
import HeroSection from "./components/home/HeroSections"
import LanguageSection from "./components/home/LanguagesSection"
import TestimonialSection from "./components/home/TestimonialSection"

HeroSection
export default function Home() {
  return (
    <div>
      <HeroSection/> 
      <LanguageSection/> 
      <FeatureSection/> 
      <TestimonialSection/> 
      <CTASection/> 
    </div>
  )
}
