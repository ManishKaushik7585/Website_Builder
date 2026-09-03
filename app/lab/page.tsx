import { QAReportUI } from '@/components/qa/QAReport';
import { GenerationOrchestrator } from '@/components/generation/GenerationOrchestrator';
import { MediaSlot } from '@/components/media/MediaSlot';
import { Reveal } from '@/components/motion/Reveal';

import { Split } from '@/components/patterns/Split';
import { BentoGrid } from '@/components/patterns/BentoGrid';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';

import React from 'react';
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import { Inline } from '@/components/layout/Inline';
import { Grid } from '@/components/layout/Grid';
import { Spacer } from '@/components/layout/Spacer';
import { Box } from '@/components/layout/Box';

import { Text } from '@/components/typography/Text';
import { Heading } from '@/components/typography/Heading';
import { Display } from '@/components/typography/Display';

import { Button } from '@/components/ui/Button';

import { LandingPageTemplate } from '@/components/templates/LandingPageTemplate';

import { Link } from '@/components/ui/Link';
import { Badge } from '@/components/ui/Badge';

import { Field } from '@/components/forms/Field';
import { Input } from '@/components/forms/Input';


// Composites
import { FeatureCard } from '@/components/composites/content/FeatureCard';
import { MediaCard } from '@/components/composites/content/MediaCard';
import { TestimonialCard } from '@/components/composites/content/TestimonialCard';
import { Metric } from '@/components/composites/content/Metric';

import { PricingCard } from '@/components/composites/commerce/PricingCard';
import { ProductCard } from '@/components/composites/commerce/ProductCard';
import { Price } from '@/components/composites/commerce/Price';

import { Toggle } from '@/components/composites/interaction/Toggle';
import { AccordionItem } from '@/components/composites/interaction/AccordionItem';
import { Tabs, TabList, Tab, TabPanel } from '@/components/composites/interaction/Tabs';

import { Breadcrumb } from '@/components/composites/navigation/Breadcrumb';
import { NavigationGroup } from '@/components/composites/navigation/NavigationGroup';

import { ImageWithCaption } from '@/components/composites/media/ImageWithCaption';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Stack gap="lg" className="py-12 border-b border-gray-200">
    <Heading level={2}>{title}</Heading>
    <Stack gap="md">{children}</Stack>
  </Stack>
);

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Stack gap="sm">
    <Heading level={3} size={5} className="text-gray-500 uppercase tracking-widest">{title}</Heading>
    {children}
  </Stack>
);

const samplePageConfig = {
  template: 'landing' as const,
  metadata: {
    title: 'Lab Mock Page',
    description: 'Testing the PageRenderer.'
  },
  sections: [
    {
      id: 'lab-hero',
      type: 'hero',
      props: {
        variant: 'centered',
        eyebrow: 'Registry Rendered',
        title: 'Dynamic Hero',
        description: 'This section was rendered by looking up "hero" in the Section Registry.',
      }
    },
    {
      id: 'lab-features',
      type: 'features',
      props: {
        title: 'Dynamic Features',
        description: 'Also rendered via registry.',
        children: <div className="text-gray-500 text-center">Injected via props</div>
      }
    },
    {
      id: 'lab-unknown',
      type: 'unknown',
      props: {}
    }
  ]
};

export default function ComponentLab() {
  return (
    <Container className="py-16">
      <Stack gap="none">
        <Display>Component Lab</Display>
        <Text variant="muted" className="mt-4 max-w-2xl">
          A development environment for inspecting the foundational primitives and composite architecture.
        </Text>
      </Stack>

      {/* COMPOSITES: CONTENT */}
      <Section title="Composites: Content">
        <SubSection title="FeatureCard">
          <Grid columns={3} gap="lg">
            <FeatureCard title="Lightning Fast" description="Optimized for speed and performance." icon={<span className="text-2xl">⚡</span>} />
            <FeatureCard title="Accessible" description="Built with ARIA standards in mind." icon={<span className="text-2xl">♿</span>} />
            <FeatureCard title="Responsive" description="Looks great on all devices." icon={<span className="text-2xl">📱</span>} />
          </Grid>
        </SubSection>
        <SubSection title="MediaCard">
          <MediaCard 
            title="Design System v2.0" 
            description="Explore our newly released comprehensive design system architecture."
            media={<Box className="w-full h-full bg-blue-100 flex items-center justify-center">Media</Box>}
          />
        </SubSection>
        <SubSection title="TestimonialCard">
          <Grid columns={2} gap="lg">
            <TestimonialCard 
              quote="This engine completely transformed our workflow." 
              authorName="Jane Doe" 
              authorTitle="Lead Engineer"
              avatar={<Box className="w-full h-full bg-gray-300" />}
            />
          </Grid>
        </SubSection>
        <SubSection title="Metric">
          <Inline gap="lg">
            <Metric value="99.9%" label="Uptime" />
            <Metric value="1M+" label="Active Users" />
            <Metric value="$4.2M" label="Revenue" />
          </Inline>
        </SubSection>
      </Section>

      {/* COMPOSITES: COMMERCE */}
      <Section title="Composites: Commerce">
        <SubSection title="Price">
          <Price amount={49} period="mo" />
        </SubSection>
        <SubSection title="PricingCard">
          <Grid columns={3} gap="lg">
            <PricingCard 
              tierName="Basic" 
              amount={19} 
              period="mo"
              description="For individuals" 
              ctaLabel="Start Basic" 
              features={['1 User', '5 Projects', 'Community Support']} 
            />
            <PricingCard 
              tierName="Pro" 
              amount={49} 
              period="mo"
              description="For professionals" 
              ctaLabel="Start Pro" 
              features={['5 Users', 'Unlimited Projects', 'Priority Support']}
              highlighted
            />
            <PricingCard 
              tierName="Enterprise" 
              amount={199} 
              period="mo"
              description="For large teams" 
              ctaLabel="Contact Sales" 
              features={['Unlimited Users', 'Unlimited Projects', '24/7 Phone Support']} 
            />
          </Grid>
        </SubSection>
        <SubSection title="ProductCard">
          <Grid columns={4} gap="lg">
            <ProductCard 
              title="Wireless Headphones" 
              description="Noise-cancelling over-ear headphones with 30-hour battery life." 
              price={299} 
              image={<Box className="w-full h-full bg-gray-200" />} 
            />
          </Grid>
        </SubSection>
      </Section>

      {/* COMPOSITES: INTERACTION */}
      <Section title="Composites: Interaction">
        <SubSection title="Toggle">
          <Stack gap="md">
            <Toggle id="marketing" label="Receive marketing emails" />
            <Toggle id="annual" label="Annual billing (Save 20%)" defaultChecked />
          </Stack>
        </SubSection>
        <SubSection title="Accordion">
          <Box className="max-w-2xl bg-white p-6 rounded-[var(--radius-card)] shadow-[var(--shadow-card-elevation)]">
            <AccordionItem id="faq-1" title="What is the refund policy?">
              <Text variant="muted">You can request a full refund within 30 days of your purchase.</Text>
            </AccordionItem>
            <AccordionItem id="faq-2" title="Do you offer technical support?">
              <Text variant="muted">Yes, our Pro and Enterprise plans include priority technical support.</Text>
            </AccordionItem>
          </Box>
        </SubSection>
        <SubSection title="Tabs">
          <Box className="max-w-2xl bg-white p-6 rounded-[var(--radius-card)] shadow-[var(--shadow-card-elevation)]">
            <Tabs defaultValue="account">
              <TabList ariaLabel="Settings">
                <Tab value="account">Account</Tab>
                <Tab value="password">Password</Tab>
                <Tab value="notifications">Notifications</Tab>
              </TabList>
              <TabPanel value="account">
                <Text>Make changes to your account here.</Text>
              </TabPanel>
              <TabPanel value="password">
                <Text>Change your password here.</Text>
              </TabPanel>
              <TabPanel value="notifications">
                <Text>Update your notification preferences here.</Text>
              </TabPanel>
            </Tabs>
          </Box>
        </SubSection>
      </Section>

      {/* COMPOSITES: NAVIGATION */}
      <Section title="Composites: Navigation">
        <SubSection title="Breadcrumb">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Wireless Headphones' }
          ]} />
        </SubSection>
        <SubSection title="NavigationGroup">
          <Inline gap="lg" align="start">
            <NavigationGroup title="Company">
              <Link href="#">About Us</Link>
              <Link href="#">Careers</Link>
              <Link href="#">Contact</Link>
            </NavigationGroup>
            <NavigationGroup title="Legal">
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
            </NavigationGroup>
          </Inline>
        </SubSection>
      </Section>

      {/* COMPOSITES: MEDIA */}
      <Section title="Composites: Media">
        <SubSection title="ImageWithCaption">
          <Grid columns={2}>
            <ImageWithCaption 
              image={<Box className="w-full aspect-video bg-gray-200 flex items-center justify-center">Image</Box>} 
              caption="Fig 1. Architectural Diagram" 
            />
          </Grid>
        </SubSection>
      </Section>

      {/* PRIMITIVES SUMMARY */}
      <Section title="Primitives (Phase 3A)">
        <SubSection title="Typography">
          <Stack gap="sm">
            <Heading level={1}>Heading 1</Heading>
            <Text variant="body">Body text.</Text>
          </Stack>
        </SubSection>
        <SubSection title="UI & Forms">
          <Inline gap="md">
            <Button>Button</Button>
            <Badge>Badge</Badge>
          </Inline>
          <Spacer size="md" />
          <Field id="email" label="Email">
            <Input id="email" type="email" />
          </Field>
        </SubSection>
      </Section>


      {/* ------------------------------------------------------------------ */}
      {/* PHASE 3C: MOTION LAB                                                */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Motion Lab (Phase 3C)">
        <SubSection title="Entrance (Reveal)">
          <Stack gap="md">
            <Reveal direction="up" duration="base" distance="md" delay="none" className="bg-gray-100 p-4 border border-gray-200">
              <Text>Revealed from bottom (up)</Text>
            </Reveal>
            <Reveal direction="down" duration="base" distance="md" delay="short" className="bg-gray-100 p-4 border border-gray-200">
              <Text>Revealed from top (down)</Text>
            </Reveal>
            <Reveal direction="left" duration="base" distance="md" delay="medium" className="bg-gray-100 p-4 border border-gray-200">
              <Text>Revealed from right (left)</Text>
            </Reveal>
            <Reveal direction="right" duration="base" distance="md" className="bg-gray-100 p-4 border border-gray-200">
              <Text>Revealed from left (right)</Text>
            </Reveal>
          </Stack>
        </SubSection>
        <SubSection title="Stagger / Opacity Fade">
          <Grid columns={3} gap="sm">
            <Reveal direction="none" delay="none"><Box className="h-16 bg-blue-100" /></Reveal>
            <Reveal direction="none" delay="short"><Box className="h-16 bg-blue-200" /></Reveal>
            <Reveal direction="none" delay="medium"><Box className="h-16 bg-blue-300" /></Reveal>
          </Grid>
        </SubSection>
        <SubSection title="Interaction (Hover / Press / Focus)">
          <Stack gap="md">
            <Text variant="small" className="text-gray-500">
              These rely purely on CSS hover variants and our CSS motion variables. No JS required.
            </Text>
            <button className="px-6 py-3 bg-black text-white cursor-pointer transform transition-all hover:-translate-y-1 hover:shadow-lg active:scale-95 active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black" style={{ transitionDuration: 'var(--motion-duration-fast)', transitionTimingFunction: 'var(--motion-ease-standard)' }}>
              Interactive Button
            </button>
          </Stack>
        </SubSection>
      </Section>


      {/* ------------------------------------------------------------------ */}
      {/* PHASE 4A: PATTERN & SECTION LAB                                     */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Pattern Lab (Phase 4A)">
        <SubSection title="Layout: Split (6/6 Desktop, Stack Mobile)">
          <Split 
            ratio="6/6"
            content={<div className="bg-gray-100 p-8 h-full flex items-center justify-center">Content Slot</div>}
            media={<div className="bg-gray-800 text-white p-8 h-48 md:h-full flex items-center justify-center">Arbitrary Media Slot (e.g. Canvas)</div>}
          />
        </SubSection>
        <SubSection title="Bento Grid">
          <BentoGrid>
            <div className="bg-gray-100 p-6 md:col-span-2 md:row-span-2 rounded-xl">Bento Hero Span</div>
            <div className="bg-gray-200 p-6 rounded-xl">Bento Standard</div>
            <div className="bg-gray-200 p-6 rounded-xl">Bento Standard</div>
            <div className="bg-gray-300 p-6 md:col-span-2 rounded-xl">Bento Wide</div>
          </BentoGrid>
        </SubSection>
      </Section>

      <Section title="Section Lab (Phase 4A)">
        <SubSection title="Hero Section (Split Variant)">
          <HeroSection 
            variant="split"
            eyebrow="New Architecture"
            title="Premium Sections"
            description="Sections compose patterns, primitives, tokens, and motion structurally without bloat."
            actions={<Button size="lg">Get Started</Button>}
            media={<div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center">Generic ReactNode Media</div>}
          />
        </SubSection>
        
        <SubSection title="Features Section">
          <FeaturesSection title="Built for scale" description="Our architecture is decoupled.">
            <BentoGrid>
               <div className="bg-gray-100 p-6 md:col-span-4 rounded-xl text-center">Feature A</div>
            </BentoGrid>
          </FeaturesSection>
        </SubSection>

        <SubSection title="Social Proof Section">
          <SocialProofSection 
            logos={<div className="bg-gray-100 p-8 text-center text-gray-500 rounded-xl">Logo Wall Pattern Goes Here</div>}
            testimonials={<div className="bg-gray-100 p-8 text-center text-gray-500 rounded-xl mt-4">Testimonial Grid Pattern Goes Here</div>}
          />
        </SubSection>

      </Section>


      {/* ------------------------------------------------------------------ */}
      {/* PHASE 5B: VISUAL INTELLIGENCE LAB                                   */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Visual Intelligence Lab (Phase 5B)">
        <SubSection title="Art Direction Modes & Density">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Technical / Balanced */}
            <div className="p-6 border border-gray-200 rounded-lg space-y-4">
              <div className="text-sm font-bold uppercase tracking-wider text-gray-500">Mode: Technical | Density: Balanced</div>
              <h3 className="text-2xl font-semibold">Structured Data Emphasis</h3>
              <p className="text-gray-600 leading-relaxed">
                Precise grid alignments, functional typography, and clear metric separation.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded border border-gray-100">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-xs text-gray-500 uppercase mt-1">Uptime</div>
                </div>
                <div className="bg-gray-50 p-4 rounded border border-gray-100">
                  <div className="text-2xl font-bold">&lt;10ms</div>
                  <div className="text-xs text-gray-500 uppercase mt-1">Latency</div>
                </div>
              </div>
            </div>

            {/* Editorial / Sparse */}
            <div className="p-12 border border-gray-200 rounded-lg space-y-8">
              <div className="text-sm font-bold uppercase tracking-wider text-gray-500">Mode: Editorial | Density: Sparse</div>
              <h3 className="text-4xl font-serif tracking-tight">The Art of Spacing</h3>
              <p className="text-gray-500 text-lg leading-loose max-w-md">
                Asymmetric compositions, generous whitespace, and typography-led design decisions that breathe.
              </p>
            </div>
            
            {/* Expressive / Flat Surface */}
            <div className="p-8 bg-black text-white rounded-lg space-y-6">
              <div className="text-sm font-bold uppercase tracking-wider text-gray-400">Mode: Expressive | Surface: Flat</div>
              <h3 className="text-5xl font-black tracking-tighter uppercase leading-none">Bold<br/>Moves</h3>
              <p className="text-gray-300 text-xl font-medium">Strong scale contrast and dramatic typography.</p>
            </div>
            
            {/* Restrained / Elevated Surface */}
            <div className="p-8 bg-white shadow-xl rounded-2xl border border-gray-100 space-y-4 max-w-sm mx-auto w-full">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 text-center">Mode: Restrained | Surface: Elevated</div>
              <h3 className="text-xl font-medium text-center">Minimal Elevation</h3>
              <p className="text-gray-500 text-sm text-center">Subtle surfaces and high compositional clarity.</p>
              <div className="flex justify-center mt-6">
                <button className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium">Action</button>
              </div>
            </div>
          </div>
        </SubSection>
      </Section>

      
      
      
      
      
      
      
      
      
      
      {/* ------------------------------------------------------------------ */}
      {/* PHASE 6G: LIVE AI AGENT LAB                                        */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Live AI Agent Lab (Phase 6G)">
        <SubSection title="API Boundary Simulation">
          <div className="p-4 border border-gray-800 rounded text-sm text-gray-300">
            <strong>Endpoint:</strong> /api/agent<br/>
            <strong>Status:</strong> Active<br/>
            <strong>Live Credentials:</strong> Unavailable (Deferred to environment)<br/>
            <strong>Result:</strong> Request securely routed through mock fallback safely.
          </div>
        </SubSection>
        <SubSection title="Security Rejections">
           <div className="p-4 border border-gray-800 rounded text-sm text-red-400">
            <strong>Payload:</strong> {JSON.stringify({ code: '<div className="x"></div>' })}<br/>
            <strong>Validator:</strong> REJECTED - AI_SECURITY_REJECTION: JSX output detected
          </div>
        </SubSection>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* PHASE 6F: AI AGENT RUNTIME LAB                                     */}
      {/* ------------------------------------------------------------------ */}
      <Section title="AI Agent Runtime Lab (Phase 6F)">
        <SubSection title="Scenario A — Successful Generation">
          <div className="p-4 border border-gray-800 rounded text-sm text-gray-300">
            <strong>Brief:</strong> &quot;Create a modern SaaS homepage&quot;<br/>
            <strong>Provider:</strong> mock-provider<br/>
            <strong>Validation:</strong> SUCCESS<br/>
            <strong>Result:</strong> PageConfig generated successfully.
          </div>
        </SubSection>
        <SubSection title="Scenario B — Invalid AI Output">
           <div className="p-4 border border-gray-800 rounded text-sm text-red-400">
            <strong>Provider Output:</strong> {JSON.stringify({ unauthorizedJSX: true })}<br/>
            <strong>Validator:</strong> REJECTED - Forbidden code injection detected<br/>
            <strong>Recovery:</strong> Retried successfully.
          </div>
        </SubSection>
        <SubSection title="Scenario C — Provider Failure & Fallback">
           <div className="p-4 border border-gray-800 rounded text-sm text-yellow-400">
            <strong>Primary Provider:</strong> FAILED (Timeout)<br/>
            <strong>Fallback Provider:</strong> SUCCESS<br/>
            <strong>Result:</strong> State maintained securely.
          </div>
        </SubSection>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* PHASE 6E: AUTONOMOUS GENERATION LAB                                */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Autonomous Generation Lab (Phase 6E)">
        <SubSection title="Scenario A — Healthy Page">
          <div className="p-4 border border-gray-800 rounded text-sm text-gray-300">
            <strong>Run State:</strong> CONVERGED<br/>
            <strong>Final Decision:</strong> CONVERGED<br/>
            <strong>Iterations:</strong> 1<br/>
            <strong>Observations:</strong> 0 Critical, 0 Major
          </div>
        </SubSection>
        <SubSection title="Scenario B — Mobile Overflow">
           <div className="p-4 border border-gray-800 rounded text-sm text-gray-300">
            <strong>Run State:</strong> CONVERGED<br/>
            <strong>Final Decision:</strong> CONVERGED<br/>
            <strong>Iterations:</strong> 2<br/>
            <strong>Journey:</strong> Mobile Overflow (Iter 1, CONDITIONAL) -{'>'} Refined -{'>'} Healthy (Iter 2, CONVERGED)
          </div>
        </SubSection>
        <SubSection title="Scenario C — Dense Content">
           <div className="p-4 border border-gray-800 rounded text-sm text-gray-300">
            <strong>Run State:</strong> CONVERGED<br/>
            <strong>Final Decision:</strong> CONVERGED<br/>
            <strong>Iterations:</strong> 2<br/>
            <strong>Journey:</strong> Content Density (Iter 1, CONDITIONAL) -{'>'} Refined -{'>'} Healthy (Iter 2, CONVERGED)
          </div>
        </SubSection>
        <SubSection title="Scenario D — Vision Hierarchy Failure">
           <div className="p-4 border border-gray-800 rounded text-sm text-gray-300">
            <strong>Run State:</strong> CONVERGED<br/>
            <strong>Final Decision:</strong> CONVERGED<br/>
            <strong>Iterations:</strong> 3<br/>
            <strong>Journey:</strong> WEAK_VISUAL_HIERARCHY (Iter 1, REJECT) -{'>'} CONDITIONAL (Iter 2) -{'>'} CONVERGED (Iter 3)
          </div>
        </SubSection>
        <SubSection title="Scenario E — Non-Converging Page">
           <div className="p-4 border border-gray-800 rounded text-sm text-red-400">
            <strong>Run State:</strong> FAILED<br/>
            <strong>Final Decision:</strong> ITERATION_BUDGET_EXCEEDED<br/>
            <strong>Iterations:</strong> 5 (Max Reached)<br/>
            <strong>Journey:</strong> Repeated unchanged output terminated safely.
          </div>
        </SubSection>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* PHASE 6D: AI VISION INTELLIGENCE LAB                               */}
      {/* ------------------------------------------------------------------ */}
      <Section title="AI Vision Intelligence Lab (Phase 6D)">
        <SubSection title="Scenario A — Healthy Page">
          <QAReportUI report={{
            iteration: 1,
            result: { score: 100, status: 'PASS', observations: [] },
            diagnoses: [],
            refinements: []
          }} />
        </SubSection>
        <SubSection title="Scenario B — Weak Hero Hierarchy">
          <QAReportUI report={{
            iteration: 1,
            result: { score: 65, status: 'CONDITIONAL', observations: [
              { id: 'obs-v1', category: 'hierarchy', severity: 'major', target: 'hero', description: 'Weak focal hierarchy', confidence: 0.95 }
            ] },
            diagnoses: [
              { observationId: 'obs-v1', cause: 'WEAK_VISUAL_HIERARCHY', impact: 'Medium', recommendedLayer: 'pattern' }
            ],
            refinements: [
              { target: 'pattern', currentState: 'flat', desiredState: 'strengthenHeroHierarchy', reason: 'Fixing WEAK_VISUAL_HIERARCHY', sourceIssue: 'obs-v1' }
            ]
          }} />
        </SubSection>
        <SubSection title="Scenario C — Dense Feature Section">
          <QAReportUI report={{
            iteration: 1,
            result: { score: 70, status: 'CONDITIONAL', observations: [
              { id: 'obs-v2', category: 'density', severity: 'major', target: 'features', description: 'Text-heavy section', confidence: 0.9 }
            ] },
            diagnoses: [
              { observationId: 'obs-v2', cause: 'CONTENT_DENSITY_MISMATCH', impact: 'Medium', recommendedLayer: 'content' }
            ],
            refinements: [
              { target: 'content', currentState: 'dense', desiredState: 'reduceFeatureContentDensity', reason: 'Fixing CONTENT_DENSITY_MISMATCH', sourceIssue: 'obs-v2' }
            ]
          }} />
        </SubSection>
        <SubSection title="Scenario D — Mobile Breakdown">
          <QAReportUI report={{
            iteration: 1,
            result: { score: 40, status: 'REJECT', observations: [
              { id: 'obs-v3', category: 'responsive', severity: 'critical', target: 'document', description: 'Mobile clipping', confidence: 0.98 }
            ] },
            diagnoses: [
              { observationId: 'obs-v3', cause: 'RESPONSIVE_LAYOUT_BREAKDOWN', impact: 'High', recommendedLayer: 'pattern' }
            ],
            refinements: [
              { target: 'pattern', currentState: 'clipped', desiredState: 'contained', reason: 'Fixing RESPONSIVE_LAYOUT_BREAKDOWN', sourceIssue: 'obs-v3' }
            ]
          }} />
        </SubSection>
        <SubSection title="Scenario E — Visual Slop">
          <QAReportUI report={{
            iteration: 1,
            result: { score: 60, status: 'CONDITIONAL', observations: [
              { id: 'obs-v4', category: 'layout', severity: 'major', target: 'hero', description: 'Excessive decoration and unnecessary gradients', confidence: 0.99 }
            ] },
            diagnoses: [
              { observationId: 'obs-v4', cause: 'EXCESSIVE_DECORATION', impact: 'Medium', recommendedLayer: 'pattern' }
            ],
            refinements: [
              { target: 'pattern', currentState: 'sloppy', desiredState: 'minimal', reason: 'Fixing EXCESSIVE_DECORATION', sourceIssue: 'obs-v4' }
            ]
          }} />
        </SubSection>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* PHASE 6C: BROWSER VISUAL INTELLIGENCE LAB                          */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Browser Visual Intelligence Lab (Phase 6C)">
        <SubSection title="Scenario A — Healthy Page">
          <QAReportUI report={{
            iteration: 1,
            result: { score: 100, status: 'PASS', observations: [] },
            diagnoses: [],
            refinements: []
          }} />
        </SubSection>
        <SubSection title="Scenario B — Horizontal Overflow">
          <QAReportUI report={{
            iteration: 1,
            result: { score: 40, status: 'REJECT', observations: [
              { id: 'obs-b1', category: 'responsive', severity: 'critical', target: 'document', description: 'Horizontal overflow detected in document', confidence: 0.99 }
            ] },
            diagnoses: [
              { observationId: 'obs-b1', cause: 'RESPONSIVE_LAYOUT_BREAKDOWN', impact: 'High', recommendedLayer: 'pattern' }
            ],
            refinements: [
              { target: 'pattern', currentState: 'overflowing', desiredState: 'contained', reason: 'Fixing RESPONSIVE_LAYOUT_BREAKDOWN', sourceIssue: 'obs-b1' }
            ]
          }} />
        </SubSection>
        <SubSection title="Scenario C — Excessive Typography">
          <QAReportUI report={{
            iteration: 1,
            result: { score: 65, status: 'CONDITIONAL', observations: [
              { id: 'obs-c1', category: 'typography', severity: 'major', target: 'hero-heading', description: 'Headline wraps excessively (4 lines)', confidence: 0.9 }
            ] },
            diagnoses: [
              { observationId: 'obs-c1', cause: 'TYPOGRAPHY_HIERARCHY', impact: 'Medium', recommendedLayer: 'typography' }
            ],
            refinements: [
              { target: 'typography', currentState: 'h1-jumbo', desiredState: 'h1', reason: 'Fixing TYPOGRAPHY_HIERARCHY', sourceIssue: 'obs-c1' }
            ]
          }} />
        </SubSection>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* PHASE 6B: AI VISUAL QA LAB                                         */}
      {/* ------------------------------------------------------------------ */}
      <Section title="AI Visual QA Lab (Phase 6B)">
        <SubSection title="Scenario A — Healthy Page">
          <QAReportUI report={{
            iteration: 1,
            result: { score: 100, status: 'PASS', observations: [] },
            diagnoses: [],
            refinements: []
          }} />
        </SubSection>
        <SubSection title="Scenario B — Dense Page">
          <QAReportUI report={{
            iteration: 1,
            result: { score: 75, status: 'CONDITIONAL', observations: [
              { id: 'obs-1', category: 'density', severity: 'moderate', target: 'page', description: 'Minimal visual mode with dense content', confidence: 0.9 }
            ] },
            diagnoses: [
              { observationId: 'obs-1', cause: 'CONTENT_DENSITY', impact: 'Medium', recommendedLayer: 'content' }
            ],
            refinements: [
              { target: 'content', currentState: 'dense', desiredState: 'balanced', reason: 'Fixing CONTENT_DENSITY', sourceIssue: 'obs-1' }
            ]
          }} />
        </SubSection>
        <SubSection title="Scenario E — Motion Slop">
          <QAReportUI report={{
            iteration: 1,
            result: { score: 60, status: 'REJECT', observations: [
              { id: 'obs-2', category: 'motion', severity: 'major', target: 'page', description: 'Motion intensity is excessive without justification', confidence: 0.95 }
            ] },
            diagnoses: [
              { observationId: 'obs-2', cause: 'MOTION_SLOP', impact: 'High', recommendedLayer: 'motion' }
            ],
            refinements: [
              { target: 'motion', currentState: 'excessive', desiredState: 'restrained', reason: 'Fixing MOTION_SLOP', sourceIssue: 'obs-2' }
            ]
          }} />
        </SubSection>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* PHASE 6A: AI GENERATION LAB                                        */}
      {/* ------------------------------------------------------------------ */}
      <Section title="AI Generation Lab (Phase 6A)">
        <SubSection title="Example A — Technical SaaS">
          <GenerationOrchestrator plan={{
            brief: { projectName: 'SaaS Tech', description: 'Technical SaaS landing page' },
            objective: 'Inform and convert CTOs',
            contentIntent: { density: 'balanced' },
            visualIntent: { mode: 'technical' },
            artDirection: {}, assetPlan: {}, motionPlan: {},
            sections: [
              { id: 'hero-primary', section: 'hero', pattern: 'split' },
              { id: 'features-core', section: 'features' }
            ]
          }} />
        </SubSection>
        <SubSection title="Example B — Editorial Brand">
          <GenerationOrchestrator plan={{
            brief: { projectName: 'Studio Arch', description: 'Editorial website for architecture studio' },
            objective: 'Showcase design portfolio',
            contentIntent: { density: 'minimal' },
            visualIntent: { mode: 'editorial' },
            artDirection: {}, assetPlan: {}, motionPlan: {},
            sections: [
              { id: 'hero-editorial', section: 'hero', pattern: 'centered' },
              { id: 'work-grid', section: 'bentoGrid' }
            ]
          }} />
        </SubSection>
        <SubSection title="Example C — Consumer Brand">
          <GenerationOrchestrator plan={{
            brief: { projectName: 'Gen Z Lifestyle', description: 'Modern lifestyle brand website' },
            objective: 'Engage and convert Gen Z',
            contentIntent: { density: 'minimal' },
            visualIntent: { mode: 'expressive' },
            artDirection: {}, assetPlan: {}, motionPlan: {},
            sections: [
              { id: 'hero-consumer', section: 'hero', pattern: 'fullbleed' }
            ]
          }} />
        </SubSection>
        <SubSection title="Validation Failure Handling">
          <GenerationOrchestrator plan={{
            brief: { projectName: 'Invalid Plan', description: 'Missing objective' },
            objective: '', // Invalid
            contentIntent: {}, visualIntent: {}, artDirection: {}, assetPlan: {}, motionPlan: {},
            sections: [] // Invalid
          }} />
        </SubSection>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* PHASE 5E: FULL SYSTEM GENERATION LAB                               */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Full System Generation Lab (Phase 5E)">
        <SubSection title="Scenario A: Technical SaaS Landing Page">
          <div className="w-full rounded-xl overflow-hidden bg-gray-50 border border-gray-200 p-6 flex flex-col gap-4">
             <div className="flex gap-2">
               <span className="text-xs font-bold px-2 py-1 bg-black text-white rounded">Objective: Inform</span>
               <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-800 rounded">Visual: Technical</span>
               <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-800 rounded">Content: Balanced</span>
             </div>
             <div className="h-[200px] w-full bg-white border border-gray-100 rounded-lg shadow-sm flex items-center justify-center text-sm font-mono text-gray-500">
               [PageRenderer: Technical Template Simulated]
             </div>
          </div>
        </SubSection>
        <SubSection title="Scenario E: Creative/Expressive Campaign">
          <div className="w-full rounded-xl overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 p-6 flex flex-col gap-4">
             <div className="flex gap-2">
               <span className="text-xs font-bold px-2 py-1 bg-indigo-600 text-white rounded">Objective: Convert</span>
               <span className="text-xs font-bold px-2 py-1 bg-purple-200 text-purple-900 rounded">Visual: Expressive</span>
               <span className="text-xs font-bold px-2 py-1 bg-pink-100 text-pink-800 rounded">Tone: Playful</span>
             </div>
             <div className="h-[200px] w-full bg-white/50 backdrop-blur-sm border border-white rounded-lg shadow-sm flex items-center justify-center text-sm font-serif text-indigo-900">
               [PageRenderer: Expressive Template Simulated]
             </div>
          </div>
        </SubSection>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* PHASE 5D: CONTENT INTELLIGENCE LAB                                  */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Content Intelligence Lab (Phase 5D)">
        <SubSection title="Tone Modes & Density">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <h4 className="text-sm font-bold text-gray-500 mb-2">Technical / Minimal</h4>
              <h3 className="text-xl font-semibold mb-2">Engineered for AI</h3>
              <p className="text-gray-600 text-sm">A structured website engine where design intelligence, reusable components, and responsive patterns work together.</p>
              <div className="mt-4"><button className="text-sm font-semibold bg-black text-white px-4 py-2 rounded-md">View Architecture</button></div>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <h4 className="text-sm font-bold text-gray-400 mb-2">Editorial / Dense</h4>
              <h3 className="text-2xl font-serif mb-2 tracking-tight">The Foundation of Digital Experience</h3>
              <p className="text-gray-700 leading-relaxed">
                By uniting design intelligence with strict structural hierarchies, the engine eliminates the need for arbitrary decisions. 
                Every pixel serves the content, and every word serves the intent.
              </p>
              <div className="mt-4"><button className="text-sm font-medium border-b border-black pb-1 hover:text-gray-600 transition-colors">Read the philosophy</button></div>
            </div>
          </div>
        </SubSection>
        <SubSection title="Anti-Slop Guidelines (Specificity > Hype)">
          <div className="w-full rounded-xl overflow-hidden bg-red-50 border border-red-100 p-4 mb-4">
             <div className="text-xs font-bold text-red-500 mb-1">REJECTED (HYPE)</div>
             <div className="font-semibold text-red-900">Unlock your potential with our revolutionary next-generation tool that empowers seamless synergy.</div>
          </div>
          <div className="w-full rounded-xl overflow-hidden bg-green-50 border border-green-100 p-4">
             <div className="text-xs font-bold text-green-600 mb-1">APPROVED (SPECIFICITY)</div>
             <div className="font-semibold text-green-900">A structured engine that prevents generic AI copy through deterministic intent configuration.</div>
          </div>
        </SubSection>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* PHASE 5C: ASSET INTELLIGENCE LAB                                    */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Asset Intelligence Lab (Phase 5C)">
        <SubSection title="Media Slot with Registered Asset">
          <div className="w-full h-64 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
            <MediaSlot asset="engine-hero" />
          </div>
        </SubSection>
        <SubSection title="Unknown Asset Fallback">
          <div className="w-full h-24 rounded-xl overflow-hidden bg-red-50 border border-red-200 flex items-center justify-center text-red-500 text-sm">
            <MediaSlot asset="unknown-asset-id" />
            Unknown asset should not crash the page.
          </div>
        </SubSection>
        <SubSection title="Focal Point Strategy">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="aspect-square bg-gray-100 rounded-xl relative overflow-hidden flex items-center justify-center">Center</div>
             <div className="aspect-square bg-gray-100 rounded-xl relative overflow-hidden flex items-start justify-start p-4">Top Left</div>
             <div className="aspect-square bg-gray-100 rounded-xl relative overflow-hidden flex items-end justify-end p-4">Bottom Right</div>
             <div className="aspect-portrait bg-gray-100 rounded-xl relative overflow-hidden flex items-center justify-center p-4">Portrait Aspect</div>
          </div>
        </SubSection>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* PHASE 4B: PAGE COMPOSITION LAB                                      */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Page Composition Lab (Phase 4B)">
        <SubSection title="Full Site Template Render">
          <div className="border border-gray-300 rounded-xl overflow-hidden h-[600px] overflow-y-auto w-full relative">
            <LandingPageTemplate config={samplePageConfig} />
          </div>
        </SubSection>
      </Section>

      <Spacer size="xl" />
    </Container>
  );
}
