import Header from '@/components/customs/Header'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/clerk-react'
import { AtomIcon, Edit, Share2 } from 'lucide-react'
import React from 'react'

function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header />

      {/* HERO SECTION */}
      <section className="relative z-10 py-24 px-4 md:px-8 lg:px-16 text-center bg-gradient-to-b from-muted/30 to-background overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Build Your Resume <span className="text-accent">With Craftora</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground">
            Effortlessly craft a standout resume with our AI-powered Craftora.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full text-base font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              Get Started
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

          </div>

          {/* <div className="mt-14 opacity-70">
            <span className="text-sm font-semibold text-muted uppercase tracking-widest">FEATURED IN</span>
            <div className="flex justify-center mt-4 gap-6 text-muted-foreground text-sm">
              <span className="hover:text-foreground transition">Forbes</span>
              <span className="hover:text-foreground transition">TechCrunch</span>
              <span className="hover:text-foreground transition">Business Insider</span>
            </div>
          </div> */}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-white dark:bg-background py-24 px-4 md:px-8 lg:px-16 border-t border-muted">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">How it Works?</h2>
          <p className="mt-2 text-muted-foreground text-base">Create your professional resume in just 3 easy steps.</p>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-background border border-muted shadow hover:shadow-lg transition-all">
              <AtomIcon className="w-10 h-10 text-primary mx-auto" />
              <h3 className="mt-5 text-xl font-semibold">Write Prompt for Your Form</h3>
              <p className="mt-2 text-muted-foreground text-sm">Tell us your role & experience. Our AI generates the content.</p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-background border border-muted shadow hover:shadow-lg transition-all">
              <Edit className="w-10 h-10 text-primary mx-auto" />
              <h3 className="mt-5 text-xl font-semibold">Edit Your Form</h3>
              <p className="mt-2 text-muted-foreground text-sm">Tweak and polish it with our easy drag-and-drop editor.</p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-background border border-muted shadow hover:shadow-lg transition-all">
              <Share2 className="w-10 h-10 text-primary mx-auto" />
              <h3 className="mt-5 text-xl font-semibold">Share & Start Accepting Responses</h3>
              <p className="mt-2 text-muted-foreground text-sm">Download, print, or share your resume with one click.</p>
            </div>
          </div>

          <div className="mt-16">
            <a href="/dashboard">
              <Button size="lg" className="rounded-full px-8 text-base font-semibold shadow-md hover:scale-105 transition-transform">
                Get Started Today
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
