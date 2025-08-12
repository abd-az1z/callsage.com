"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BotIcon,
  SearchIcon,
  CreditCardIcon,
  FileTextIcon,
} from "lucide-react";

export const HomeView = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-24">
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 items-center gap-10 md:gap-10">
            <div className="w-full mt-8 md:mt-0">
              <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs">
                New • AI agents join your calls live
              </span>
              <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
                Meet <span className="text-primary">CallSage</span> — real‑time
                video calls with AI agents that <em>listen</em>, <em>assist</em>
                , and <em>summarize</em>.
              </h1>
              <p className="mt-4 text-muted-foreground">
                Schedule meetings, have agents participate in real time, and get
                instant transcripts, summaries, and searchable insights.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/agents">Start your first meeting</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/upgrade">View pricing</Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href="https://github.com/abd-az1z/callsage.com">
                    GitHub
                  </Link>
                </Button>
              </div>
            </div>

            {/* Centered logo with gradient background, always visible */}
            <div className="relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-xl py-6 sm:py-10 overflow-hidden rounded-2xl border bg-card shadow-sm flex items-center justify-center bg-gradient-to-br from-sidebar-accent/20 to-sidebar/20">
              <Image
                src="/logo.svg"
                alt="CallSage logo"
                width={320}
                height={320}
                className="h-32 w-32 sm:h-48 sm:w-48 object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold">Built for real work</h2>
          <p className="mt-2 text-base sm:text-lg text-muted-foreground">
            From live assistance to post‑call analysis, CallSage handles your
            end‑to‑end meeting workflow.
          </p>
        </div>

        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            title="Live AI Agents"
            desc="Agents join the call to answer questions, take notes, and guide the agenda."
            icon={<BotIcon className="h-10 w-10" />}
          />
          <Feature
            title="Auto Transcripts & Summaries"
            desc="Inngest jobs process your calls to generate high‑quality transcripts and TL;DRs."
            icon={<FileTextIcon className="h-10 w-10" />}
          />
          <Feature
            title="Search + AI Q&A"
            desc="Ask questions across past meetings. Get precise answers with sources."
            icon={<SearchIcon className="h-10 w-10" />}
          />
          <Feature
            title="SaaS Billing"
            desc="Free trial, upgrade flows, and usage limits handled by Polar."
            icon={<CreditCardIcon className="h-10 w-10" />}
          />
        </div>
      </section>

      {/* How it works */}
      <section className="border-t bg-muted/20">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <h3 className="text-center text-xl sm:text-2xl font-semibold">How it works</h3>
          <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <Step
              n={1}
              title="Create an agent"
              desc="Configure voice, knowledge, and behavior. Connect to Stream video."
            />
            <Step
              n={2}
              title="Start a meeting"
              desc="Invite participants. Your agent joins live and keeps the conversation moving."
            />
            <Step
              n={3}
              title="Get insights"
              desc="Receive transcripts, summaries, and an AI chat over the recording."
            />
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid items-center gap-8 rounded-2xl border bg-card p-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold">
              Simple pricing that scales
            </h3>
            <p className="mt-2 text-muted-foreground">
              Start free. Upgrade for higher limits, multi‑agent rooms, and
              longer recordings.
            </p>
            <div className="mt-6 flex gap-3">
              <Button asChild size="lg">
                <Link href="/upgrade">See plans</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/agents">Try it now</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/summary.png"
              alt="Transcript & summary preview"
              width={900}
              height={640}
              className="h-48 sm:h-auto w-full rounded-xl border object-cover"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground">
          <p className="text-center sm:text-left w-full sm:w-auto">© {new Date().getFullYear()} CallSage</p>
          <nav className="flex flex-col sm:flex-row gap-2 sm:gap-6 w-full sm:w-auto justify-center sm:justify-end">
            <p className="text-center sm:text-left"><span className="hidden sm:inline">• </span>Docs</p>
            <p className="text-center sm:text-left">
              <Link href="https://github.com/abd-az1z/callsage.com">
                GitHub
              </Link>
            </p>
            <p className="text-center sm:text-left">Privacy</p>
            <p className="text-center sm:text-left">Terms</p>
          </nav>
        </div>
      </footer>
    </main>
  );
};

function Feature({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="h-full">
      <CardHeader className="space-y-2">
        <div className="h-10 w-10">{icon}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground">{desc}</CardContent>
    </Card>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm">
        {n}
      </div>
      <h4 className="text-lg font-medium">{title}</h4>
      <p className="mt-1 text-muted-foreground">{desc}</p>
    </div>
  );
}
