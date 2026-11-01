import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Mail, Phone, MapPin, Copy, Check, Send, Download } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [needsActivation, setNeedsActivation] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openGmailComposer = (name?: string, userEmail?: string, message?: string) => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hi Prince,\n\n${message || ''}\n\n---\nSender: ${name || ''}\nEmail: ${userEmail || ''}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      personalInfo.email
    )}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setNeedsActivation(false);

    try {
      const response = await fetch('https://formsubmit.co/ajax/princeprince12631@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Message from ${formData.name}`,
          _replyto: formData.email,
          _captcha: 'false',
          _template: 'table',
        }),
      });

      const data = await response.json();

      if (data.success === 'true' || data.success === true) {
        setIsSubmitting(false);
        setSubmitted(true);
        setNeedsActivation(false);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 10000);
      } else if (data.message && data.message.toLowerCase().includes('activation')) {
        setIsSubmitting(false);
        setNeedsActivation(true);
      } else {
        throw new Error(data.message || 'Unable to deliver message.');
      }
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setIsSubmitting(false);
      setSubmitError(
        'Direct delivery encountered a network issue. You can send your message directly using the Gmail button below.'
      );
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 border-t border-white/10 bg-[#080c0e] text-white">
      <div className="max-w-[1180px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-start mb-12">
          <span className="font-montserrat text-[#d8b46a] text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase mb-2">
            Get In Touch
          </span>
          <h2 className="font-montserrat text-3xl sm:text-5xl font-black tracking-tight text-[#fffdf8]">
            Let's Build Something Impactful
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-2xl">
            Have an open role, project consultation, or want to connect? My inbox and phone are always open.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Direct Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Frontend & Next.js Roles
              </div>

              <h3 className="font-montserrat text-xl font-extrabold text-white mb-2">
                Direct Communication
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Reach out directly via email or call. I actively respond within 24 hours.
              </p>

              {/* Email Pill */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-2 shadow-xs mb-2">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-[#d8b46a] shrink-0" />
                  <span className="text-xs font-medium text-zinc-200 truncate">
                    {personalInfo.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy email address"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-[11px] text-emerald-400 font-medium mb-2">
                  Copied to clipboard!
                </p>
              )}

              {/* Direct Gmail Web Action */}
              <button
                type="button"
                onClick={() => openGmailComposer()}
                className="w-full mb-4 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#d8b46a]/10 hover:bg-[#d8b46a]/20 border border-[#d8b46a]/30 text-xs font-bold font-montserrat text-[#d8b46a] transition-all cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                Write via Gmail Web
              </button>

              {/* Phone Pill */}
              <a
                href={`tel:${personalInfo.phone}`}
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 shadow-xs mb-4 hover:border-white/20 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#d8b46a] shrink-0" />
                <span className="text-xs font-medium text-zinc-200">
                  {personalInfo.phone}
                </span>
              </a>

              {/* Resume download */}
              <a
                href={personalInfo.resumeUrl}
                download="Prince_T_Resume.pdf"
                className="w-full inline-flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/15 text-xs font-bold font-montserrat transition-all"
              >
                <Download className="w-4 h-4 text-[#d8b46a]" />
                Download Prince_T_Resume.pdf
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="text-xs text-zinc-500 block mb-1">Location</span>
              <span className="text-sm font-medium text-zinc-200 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#d8b46a]" />
                {personalInfo.location}
              </span>

              {/* Socials */}
              <div className="mt-4 flex items-center gap-2">
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10"
          >
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-montserrat text-xl font-bold text-white">Message Sent Successfully!</h4>
                <p className="mt-2 text-xs text-zinc-300 max-w-sm leading-relaxed">
                  Thank you! Your message has been dispatched directly to Prince at <strong className="text-[#d8b46a] font-mono">princeprince12631@gmail.com</strong>. Prince will respond to your email promptly.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-montserrat text-xs font-bold transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <button
                    onClick={() => openGmailComposer()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d8b46a]/15 border border-[#d8b46a]/30 text-[#d8b46a] font-montserrat text-xs font-bold hover:bg-[#d8b46a]/25 transition-all cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Write via Gmail Web
                  </button>
                </div>
              </div>
            ) : needsActivation ? (
              <div className="py-10 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 text-[#d8b46a] flex items-center justify-center mb-3">
                  <Mail className="w-6 h-6" />
                </div>
                <h4 className="font-montserrat text-xl font-bold text-white">1-Click Activation Email Sent</h4>
                <p className="mt-2 text-xs text-zinc-300 max-w-md leading-relaxed">
                  FormSubmit just sent a 1-time verification email to <strong className="text-[#d8b46a] font-mono">princeprince12631@gmail.com</strong>.
                </p>
                <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 text-left max-w-md">
                  <p className="font-bold mb-1">To start receiving emails directly:</p>
                  <ol className="list-decimal list-inside space-y-1 text-zinc-300">
                    <li>Open your Gmail inbox at <strong className="text-white">princeprince12631@gmail.com</strong> (or Spam folder).</li>
                    <li>Look for the email with subject: <strong className="text-white">FormSubmit: Activate form</strong>.</li>
                    <li>Click the green <strong className="text-emerald-400">"Activate Form"</strong> button inside it.</li>
                  </ol>
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="https://mail.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-primary-button text-xs py-2.5 px-5"
                  >
                    Open Gmail Inbox
                  </a>
                  <button
                    onClick={() => setNeedsActivation(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-montserrat text-xs font-bold transition-all cursor-pointer"
                  >
                    Back to Form
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name or company"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-hidden focus:border-[#d8b46a] focus:ring-1 focus:ring-[#d8b46a] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-hidden focus:border-[#d8b46a] focus:ring-1 focus:ring-[#d8b46a] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your project requirements, opportunity, or timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-hidden focus:border-[#d8b46a] focus:ring-1 focus:ring-[#d8b46a] transition-all resize-none"
                  />
                </div>

                {submitError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex flex-col gap-2">
                    <p>{submitError}</p>
                    <button
                      type="button"
                      onClick={() => openGmailComposer(formData.name, formData.email, formData.message)}
                      className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-semibold cursor-pointer transition-all"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Open in Gmail with prefilled message
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full hero-primary-button cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
