import Link from "next/link";
import { Wrench, Phone } from "lucide-react";
import { COMPANY, SERVICES } from "@/lib/constants";
import { DFW_CITIES } from "@/lib/cities";

export function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-400 overflow-hidden">
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Branding */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Wrench className="size-5 text-blue-400" />
              <span className="text-lg font-bold text-white">
                {COMPANY.name}
              </span>
            </Link>
            <p className="text-sm mb-4">{COMPANY.tagline}</p>
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Phone className="size-4" />
              {COMPANY.phone}
            </a>
          </div>

          {/* Column 2: Service Areas */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-3">
              Service Areas
            </h3>
            <ul className="space-y-2">
              {DFW_CITIES.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${city.slug}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-3">
              Services
            </h3>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/#${service.slug}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-3">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={COMPANY.phoneHref}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Phone className="size-4" />
                  {COMPANY.phone}
                </a>
              </li>
              <li className="text-sm">
                Email:{" "}
                <a
                  href="mailto:info@aquatorqueplumbing.com"
                  className="hover:text-white transition-colors"
                >
                  info@aquatorqueplumbing.com
                </a>
              </li>
              <li className="text-sm font-medium text-green-400">
                Available 24/7
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <Link href="/privacy" className="hover:text-slate-400 transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
