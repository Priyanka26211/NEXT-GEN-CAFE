import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Trophy, Medal, Gem } from 'lucide-react';
import { Order } from '@/data/mockData';

interface TopDishesProps {
  orders: Order[];
}

export default function TopDishes({ orders }: TopDishesProps) {
  // Calculate top dishes by revenue
  const dishStats = orders
    .filter(order => order.status === 'Successful')
    .reduce((acc, order) => {
      order.items.forEach(item => {
        if (acc[item.name]) {
          acc[item.name].revenue += item.price * item.quantity;
          acc[item.name].quantity += item.quantity;
        } else {
          acc[item.name] = {
            name: item.name,
            revenue: item.price * item.quantity,
            quantity: item.quantity,
            image: item.image
          };
        }
      });
      return acc;
    }, {} as { [key: string]: { name: string; revenue: number; quantity: number; image: string } });

  const topDishes = Object.values(dishStats)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />;
      case 1:
        return <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />;
      case 2:
        return <Medal className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />;
      default:
        return <Gem className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />;
    }
  };

  const getRankGradient = (index: number) => {
    switch (index) {
      case 0:
        return 'from-amber-400 via-yellow-500 to-orange-500';
      case 1:
        return 'from-gray-300 via-gray-400 to-gray-500';
      case 2:
        return 'from-amber-500 via-orange-600 to-red-500';
      default:
        return 'from-purple-400 via-purple-500 to-purple-600';
    }
  };

  const getRankBorder = (index: number) => {
    switch (index) {
      case 0:
        return 'border-amber-300';
      case 1:
        return 'border-gray-300';
      case 2:
        return 'border-orange-300';
      default:
        return 'border-purple-300';
    }
  };

  const getRankBg = (index: number) => {
    switch (index) {
      case 0:
        return 'from-amber-50 via-yellow-50 to-orange-50';
      case 1:
        return 'from-gray-50 via-slate-50 to-gray-100';
      case 2:
        return 'from-orange-50 via-red-50 to-amber-50';
      default:
        return 'from-purple-50 via-indigo-50 to-purple-100';
    }
  };

  const getRankTitle = (index: number) => {
    switch (index) {
      case 0:
        return '👑 Royal Champion';
      case 1:
        return '🥈 Noble Runner-up';
      case 2:
        return '🥉 Distinguished Third';
      default:
        return '💎 Precious Gem';
    }
  };

  if (topDishes.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-white via-amber-50 to-orange-50 border-4 border-amber-200 shadow-2xl">
        <CardContent className="p-6 sm:p-8 text-center">
          <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">No royal dishes to display yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-2xl shadow-2xl p-4 sm:p-6 border-4 border-amber-200 relative overflow-hidden">
      {/* Royal Background Pattern */}
      <div className="absolute inset-0 opacity-5" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d97706' fill-opacity='0.3'%3E%3Cpath d='M25 25c0-13.807 11.193-25 25-25v50c-13.807 0-25-11.193-25-25zM0 25c0 13.807 11.193 25 25 25V0C11.193 0 0 11.193 0 25z'/%3E%3C/g%3E%3C/svg%3E")`,
             backgroundSize: '50px 50px'
           }}
      />
      
      {/* Decorative Corner Elements */}
      <div className="absolute top-0 left-0 w-16 h-16 border-r-4 border-b-4 border-amber-300 opacity-30"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-l-4 border-b-4 border-orange-300 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-r-4 border-t-4 border-red-300 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-l-4 border-t-4 border-amber-300 opacity-30"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-r from-amber-800 via-orange-700 to-red-800 bg-clip-text text-transparent font-serif flex items-center justify-center space-x-2">
            <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />
            <span>🏆 Royal Court of Top Dishes 🏆</span>
            <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-medium">Behold the most majestic culinary creations by revenue</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {topDishes.map((dish, index) => (
            <Card 
              key={dish.name} 
              className={`bg-gradient-to-br ${getRankBg(index)} border-4 ${getRankBorder(index)} shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group`}
            >
              {/* Royal Pattern Overlay */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300" 
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.2'%3E%3Cpath d='M15 15c0-8.284 6.716-15 15-15v30c-8.284 0-15-6.716-15-15zM0 15c0 8.284 6.716 15 15 15V0C6.716 0 0 6.716 0 15z'/%3E%3C/g%3E%3C/svg%3E")`,
                     backgroundSize: '30px 30px'
                   }}
              />
              
              {/* Rank Badge */}
              <div className="absolute -top-2 -right-2 z-20">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${getRankGradient(index)} rounded-full flex items-center justify-center shadow-xl border-4 border-white transform rotate-12 group-hover:rotate-0 transition-transform duration-300`}>
                  {getRankIcon(index)}
                </div>
              </div>
              
              {/* Decorative Corner */}
              <div className="absolute top-0 left-0 w-8 h-8 border-r-2 border-b-2 border-white/40 opacity-60"></div>
              
              <CardHeader className="pb-2 sm:pb-4 relative z-10">
                <div className="flex items-center justify-between">
                  <Badge className={`bg-gradient-to-r ${getRankGradient(index)} text-white border-0 text-xs sm:text-sm font-bold px-2 py-1`}>
                    {getRankTitle(index)}
                  </Badge>
                </div>
                <CardTitle className="text-base sm:text-lg font-bold text-gray-800 font-serif mt-2 group-hover:text-amber-800 transition-colors duration-300">
                  {dish.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="space-y-3 sm:space-y-4">
                  {/* Dish Image Placeholder with Royal Styling */}
                  <div className="w-full h-24 sm:h-32 bg-gradient-to-br from-amber-100 to-orange-200 rounded-xl flex items-center justify-center border-3 border-amber-200 shadow-inner relative overflow-hidden group-hover:shadow-lg transition-shadow duration-300">
                    <div className="text-4xl sm:text-6xl opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                      {dish.name.includes('Pizza') ? '🍕' :
                       dish.name.includes('Cake') ? '🍰' :
                       dish.name.includes('Burger') ? '🍔' :
                       dish.name.includes('Pasta') ? '🍝' :
                       dish.name.includes('Sandwich') ? '🥪' :
                       dish.name.includes('Latte') ? '☕' :
                       dish.name.includes('Donut') ? '🍩' :
                       dish.name.includes('Croissant') ? '🥐' : '🍽️'}
                    </div>
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                  </div>
                  
                  {/* Stats with Royal Styling */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="text-center p-2 sm:p-3 bg-gradient-to-r from-white/80 to-amber-50/80 rounded-lg border border-amber-200 shadow-sm">
                      <div className={`text-lg sm:text-xl font-bold bg-gradient-to-r ${getRankGradient(index)} bg-clip-text text-transparent`}>
                        ₹{dish.revenue.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">Royal Revenue</div>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-gradient-to-r from-white/80 to-orange-50/80 rounded-lg border border-orange-200 shadow-sm">
                      <div className={`text-lg sm:text-xl font-bold bg-gradient-to-r ${getRankGradient(index)} bg-clip-text text-transparent`}>
                        {dish.quantity}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">Orders Served</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getRankGradient(index)} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`}></div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-xs sm:text-sm text-gray-500 font-medium bg-gradient-to-r from-white/80 to-amber-50/80 rounded-full px-4 py-2 inline-block border border-amber-200">
            💫 These royal dishes reign supreme in our majestic kingdom 💫
          </p>
        </div>
      </div>
    </div>
  );
}