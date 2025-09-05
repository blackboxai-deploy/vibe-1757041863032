import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-800 bg-black/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              FF Tournament Hub
            </h3>
            <p className="text-sm text-gray-400">
              The ultimate platform for Free Fire esports competitions and tournaments.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/tournaments" className="block text-sm text-gray-400 hover:text-orange-500 transition-colors">
                Browse Tournaments
              </Link>
              <Link href="/teams" className="block text-sm text-gray-400 hover:text-orange-500 transition-colors">
                Find Teams
              </Link>
              <Link href="/leaderboard" className="block text-sm text-gray-400 hover:text-orange-500 transition-colors">
                Leaderboards
              </Link>
              <Link href="/matches" className="block text-sm text-gray-400 hover:text-orange-500 transition-colors">
                Live Matches
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Support</h4>
            <div className="space-y-2">
              <Link href="/help" className="block text-sm text-gray-400 hover:text-orange-500 transition-colors">
                Help Center
              </Link>
              <Link href="/rules" className="block text-sm text-gray-400 hover:text-orange-500 transition-colors">
                Tournament Rules
              </Link>
              <Link href="/contact" className="block text-sm text-gray-400 hover:text-orange-500 transition-colors">
                Contact Us
              </Link>
              <Link href="/report" className="block text-sm text-gray-400 hover:text-orange-500 transition-colors">
                Report Issue
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Legal</h4>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-sm text-gray-400 hover:text-orange-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-sm text-gray-400 hover:text-orange-500 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="block text-sm text-gray-400 hover:text-orange-500 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} FF Tournament Hub. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              Not affiliated with Garena Free Fire. All trademarks belong to their respective owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}