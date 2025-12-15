import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Star, DollarSign, Crown, Gem } from 'lucide-react';
import { Order } from '@/data/mockData';

interface SummaryCardsProps {
  orders: Order[];
}

export default function SummaryCards({ orders }: SummaryCardsProps) {
  const totalRevenue = orders
    .filter(order => order.status === 'Successful')
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const totalOrders = orders.length;
  
  const averageRating = orders.length > 0 
    ? orders.reduce((sum, order) => sum + order.rating, 0) / orders.length 
    : 0;

  const successRate = orders.length > 0 
    ? (orders.filter(order => order.status === 'Successful').length / orders.length) * 100 
    : 0;

  const cards = [
    {
      title: 'Royal Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: Crown,
      gradient: 'from-amber-500 to-orange-600',
      bgGradient: 'from-amber-50 to-orange-100',
      borderColor: 'border-amber-300',
      iconBg: 'from-amber-400 to-orange-500',
      emoji: '💰'
    },
    {
      title: 'Majestic Orders',
      value: totalOrders.toString(),
      icon: Users,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-100',
      borderColor: 'border-emerald-300',
      iconBg: 'from-emerald-400 to-teal-500',
      emoji: '📋'
    },
    {
      title: 'Imperial Rating',
      value: averageRating.toFixed(1),
      icon: Star,
      gradient: 'from-yellow-500 to-amber-600',
      bgGradient: 'from-yellow-50 to-amber-100',
      borderColor: 'border-yellow-300',
      iconBg: 'from-yellow-400 to-amber-500',
      emoji: '⭐'
    },
    {
      title: 'Success Dynasty',
      value: `${successRate.toFixed(1)}%`,
      icon: Gem,
      gradient: 'from-purple-500 to-indigo-600',
      bgGradient: 'from-purple-50 to-indigo-100',
      borderColor: 'border-purple-300',
      iconBg: 'from-purple-400 to-indigo-500',
      emoji: '👑'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {cards.map((card, index) => (
        <Card 
          key={index} 
          className={`bg-gradient-to-br ${card.bgGradient} border-3 ${card.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group`}
        >
          {/* Royal Pattern Overlay */}
          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.3'%3E%3Cpath d='M10 10c0-5.523 4.477-10 10-10v20c-5.523 0-10-4.477-10-10zM0 10c0 5.523 4.477 10 10 10V0C4.477 0 0 4.477 0 10z'/%3E%3C/g%3E%3C/svg%3E")`,
                 backgroundSize: '20px 20px'
               }}
          />
          
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 right-0 w-8 h-8 border-l-2 border-b-2 border-white/30 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-r-2 border-t-2 border-white/30 opacity-50"></div>
          
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className={`text-sm font-medium bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent font-serif flex items-center space-x-2`}>
              <span>{card.emoji}</span>
              <span className="hidden sm:inline">{card.title}</span>
              <span className="sm:hidden">{card.title.split(' ')[0]}</span>
            </CardTitle>
            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${card.iconBg} rounded-xl flex items-center justify-center shadow-lg border-2 border-white/30 group-hover:scale-110 transition-transform duration-300`}>
              <card.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-md" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent font-serif`}>
              {card.value}
            </div>
            <p className="text-xs text-gray-600 mt-1 font-medium">
              {index === 0 && 'Total earnings from successful orders'}
              {index === 1 && 'Total number of orders placed'}
              {index === 2 && 'Average customer satisfaction'}
              {index === 3 && 'Percentage of successful orders'}
            </p>
          </CardContent>
          
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
        </Card>
      ))}
    </div>
  );
}