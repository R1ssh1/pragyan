import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PageWrapper } from "./components/layout/PageWrapper";
import { ScrollToTopButton } from "./components/ui/ScrollToTopButton";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { OrganizationSchema, LocalBusinessSchema } from "./seo/StructuredData";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home").then(m => ({ default: m.Home })));
const About = lazy(() => import("./pages/About").then(m => ({ default: m.About })));
const QualityPolicy = lazy(() => import("./pages/QualityPolicy").then(m => ({ default: m.QualityPolicy })));
const Certificates = lazy(() => import("./pages/Certificates").then(m => ({ default: m.Certificates })));
const Contact = lazy(() => import("./pages/Contact").then(m => ({ default: m.Contact })));
const ProductsOverview = lazy(() => import("./pages/products/ProductsOverview").then(m => ({ default: m.ProductsOverview })));
const DivisionPage = lazy(() => import("./pages/products/DivisionPage").then(m => ({ default: m.DivisionPage })));
const ProductDetailPage = lazy(() => import("./pages/products/ProductDetailPage").then(m => ({ default: m.ProductDetailPage })));
const Blogs = lazy(() => import("./pages/Blogs").then(m => ({ default: m.Blogs })));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage").then(m => ({ default: m.BlogPostPage })));
const SanityStudioPage = lazy(() => import("./pages/SanityStudioPage").then(m => ({ default: m.SanityStudioPage })));

// Loading spinner for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-12 h-12 border-4 border-prayag-red border-t-transparent rounded-full animate-spin"></div>
  </div>
);

/**
 * App — root router. PageWrapper adds Navbar + Footer to every route.
 * OrganizationSchema is rendered site-wide via Helmet.
 */
function App() {
  return (
    <>
      {/* Site-wide JSON-LD */}
      <OrganizationSchema />
      <LocalBusinessSchema />
      <ScrollToTop />
      <ScrollToTopButton />

      {/* Sanity Studio — full-screen, no Navbar/Footer */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/studio/*" element={<SanityStudioPage />} />

          {/* Public site wrapped in Navbar + Footer */}
          <Route
            path="/*"
            element={
              <PageWrapper>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/quality-policy" element={<QualityPolicy />} />
                    <Route path="/products" element={<ProductsOverview />} />
                    <Route path="/products/:division" element={<DivisionPage />} />
                    <Route path="/products/:division/:slug" element={<ProductDetailPage />} />
                    <Route path="/certificates" element={<Certificates />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/blogs/:slug" element={<BlogPostPage />} />
                    <Route path="/contact" element={<Contact />} />
                    {/* 404 catch-all */}
                    <Route
                      path="*"
                      element={
                        <div className="min-h-[60vh] flex items-center justify-center px-4">
                          <div className="text-center">
                            <p className="font-heading font-black text-8xl text-prayag-red mb-4">404</p>
                            <h1 className="font-heading font-black text-3xl uppercase text-prayag-black mb-3">
                              Page Not Found
                            </h1>
                            <a
                              href="/"
                              className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-lg bg-prayag-red text-white font-heading font-bold uppercase tracking-wide text-sm hover:bg-red-700 transition-colors"
                            >
                              ← Back to Home
                            </a>
                          </div>
                        </div>
                      }
                    />
                  </Routes>
                </Suspense>
              </PageWrapper>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
