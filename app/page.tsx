import { getProductByHandle } from "../lib/shopify";
import { CartProvider } from "../components/CartContext";
import { CartDrawer } from "../components/CartDrawer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { TrustStrip } from "../components/TrustStrip";
import { ProblemSection } from "../components/ProblemSection";
import { SolutionSection } from "../components/SolutionSection";
import { AthleteProof } from "../components/AthleteProof";
import { LifestyleGrid } from "../components/LifestyleGrid";
import { BuyModule } from "../components/BuyModule";
import { FaqSection } from "../components/FaqSection";
import { FinalCta } from "../components/FinalCta";
import { StickyBuyBar } from "../components/StickyBuyBar";

export default async function HomePage() {
  const product = await getProductByHandle();

  return (
    <CartProvider>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <ProblemSection />
        <SolutionSection />
        <AthleteProof />
        <LifestyleGrid />
        {product ? (
          <>
            <BuyModule product={product} />
            <StickyBuyBar product={product} />
          </>
        ) : (
          <section id="buy" className="section-pad">
            <div className="mx-auto max-w-4xl rounded-2xl border border-line bg-paper p-8 shadow-soft">
              <h2 className="text-2xl font-semibold uppercase tracking-[0.3em]">
                PRODUCT UNAVAILABLE
              </h2>
              <p className="mt-3 text-sm text-mute">
                Connect Shopify Storefront API credentials to load product data.
              </p>
            </div>
          </section>
        )}
        <FaqSection />
        <FinalCta />
      </main>
      <CartDrawer />
    </CartProvider>
  );
}
