// src/components/layout/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">SHOTOMORIYAMA.JP</h3>
            <p className="text-sm text-white/80">
              小さな想いも、丁寧なものづくりで、
              <br />
              大きな未来に変わる。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#service"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Service
                </Link>
              </li>
              <li>
                <Link
                  href="#works"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Works
                </Link>
              </li>
              <li>
                <Link
                  href="#how-to-order"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  How to Order
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://twitter.com/SOAR_C72"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>𝕏</span> Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/shotocodes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>💻</span> GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:0sdm0.moriyama@gmail.com"
                  className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>📧</span> Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-white/60">
              © {currentYear} Shoto Moriyama. All rights reserved.
            </p>

            {/* Additional Links */}
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/terms"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                利用規約
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
