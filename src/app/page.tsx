"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { 
  Trophy, 
  Users, 
  Gamepad2, 
  Calendar,
  Crown,
  Target,
  Shield,
  Clock,
  DollarSign
} from 'lucide-react'

export default function HomePage() {
  // Mock data for featured tournaments
  const featuredTournaments = [
    {
      id: '1',
      name: 'Free Fire Championship 2024',
      description: 'The biggest Free Fire tournament of the year with massive prizes!',
      prizePool: 50000,
      maxParticipants: 64,
      registeredCount: 45,
      format: 'SQUAD',
      gameMode: 'BR',
      status: 'REGISTRATION',
      startDate: '2024-01-15',
      image: 'https://placehold.co/800x400?text=Free+Fire+Championship+2024+Tournament+Battle+Royale+Competition'
    },
    {
      id: '2', 
      name: 'Clash Squad Masters',
      description: 'Intense 4v4 battles for the ultimate Clash Squad supremacy',
      prizePool: 25000,
      maxParticipants: 32,
      registeredCount: 28,
      format: 'SQUAD',
      gameMode: 'CS',
      status: 'REGISTRATION',
      startDate: '2024-01-12',
      image: 'https://placehold.co/800x400?text=Clash+Squad+Masters+4v4+Battle+Arena+Competition'
    },
    {
      id: '3',
      name: 'Solo Warriors',
      description: 'Prove your individual skills in this intense solo battle royale',
      prizePool: 15000,
      maxParticipants: 48,
      registeredCount: 32,
      format: 'SOLO',
      gameMode: 'BR',
      status: 'LIVE',
      startDate: '2024-01-10',
      image: 'https://placehold.co/800x400?text=Solo+Warriors+Individual+Battle+Royale+Tournament'
    }
  ]

  const stats = [
    { label: 'Active Tournaments', value: '24', icon: Trophy },
    { label: 'Registered Players', value: '2,847', icon: Users },
    { label: 'Teams Formed', value: '456', icon: Shield },
    { label: 'Matches Played', value: '1,234', icon: Gamepad2 }
  ]

  const features = [
    {
      icon: Trophy,
      title: 'Tournament Management',
      description: 'Create and manage tournaments with automated brackets and real-time updates'
    },
    {
      icon: Users,
      title: 'Team Formation',
      description: 'Find teammates, create teams, and manage your squad for upcoming tournaments'
    },
    {
      icon: Calendar,
      title: 'Match Scheduling',
      description: 'Automated match scheduling with room codes and live tracking'
    },
    {
      icon: Crown,
      title: 'Leaderboards',
      description: 'Track your performance and climb the competitive rankings'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-8">
            <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
              🔥 Free Fire Tournaments
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
              Dominate the Arena
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join the ultimate Free Fire tournament platform. Compete in tournaments, form teams, 
              climb leaderboards, and earn your place among the legends.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold px-8 py-3">
                <Trophy className="w-5 h-5 mr-2" />
                Browse Tournaments
              </Button>
              <Button variant="outline" size="lg" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3">
                <Users className="w-5 h-5 mr-2" />
                Find Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 border-orange-500/20 text-center">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-2">
                      <div className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-gray-400">{stat.label}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Tournaments */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Tournaments
            </h2>
            <p className="text-gray-400 text-lg">
              Join the hottest tournaments and compete for amazing prizes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTournaments.map((tournament) => (
              <Card key={tournament.id} className="bg-gradient-to-br from-slate-800 to-slate-900 border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={tournament.image}
                    alt={tournament.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge 
                    className={`absolute top-3 right-3 ${
                      tournament.status === 'LIVE' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-orange-500 text-white'
                    }`}
                  >
                    {tournament.status === 'LIVE' ? '🔴 LIVE' : '📝 REGISTRATION'}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-white group-hover:text-orange-500 transition-colors">
                    {tournament.name}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {tournament.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-green-500 font-semibold">
                        ${tournament.prizePool.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-300">
                        {tournament.registeredCount}/{tournament.maxParticipants}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-purple-500" />
                      <span className="text-gray-300">
                        {tournament.format} • {tournament.gameMode}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="text-gray-300">
                        {tournament.startDate}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                    {tournament.status === 'LIVE' ? 'View Live' : 'Register Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/tournaments">
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                View All Tournaments
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need for competitive Free Fire gaming
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 border-orange-500/20 text-center hover:border-orange-500/40 transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-to-r from-orange-500/20 to-red-600/20 border-orange-500/30">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Become a Champion?
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Join thousands of players competing in Free Fire tournaments
              </p>
              <div className="space-x-4">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                  Start Competing
                </Button>
                <Button variant="outline" size="lg" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}