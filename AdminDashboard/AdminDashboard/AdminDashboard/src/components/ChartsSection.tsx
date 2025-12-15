import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Order, revenueByTime } from '@/data/mockData';

interface ChartsSectionProps {
  orders: Order[];
  onDishSelect?: (dishName: string) => void;
  selectedDish?: string | null;
  ratingFilter: number[];
  onRatingFilterChange: (ratingFilter: number[]) => void;
}

interface ProductRevenueData {
  name: string;
  revenue: number;
}

export default function ChartsSection({ 
  orders, 
  onDishSelect, 
  selectedDish,
  ratingFilter,
  onRatingFilterChange 
}: ChartsSectionProps) {

  // Revenue by Product Data
  const revenueByProduct = (() => {
    const productRevenue: { [key: string]: number } = {};
    
    orders.filter(order => order.status === 'Successful').forEach(order => {
      order.items.forEach(item => {
        if (productRevenue[item.name]) {
          productRevenue[item.name] += item.price * item.quantity;
        } else {
          productRevenue[item.name] = item.price * item.quantity;
        }
      });
    });
    
    return Object.entries(productRevenue)
      .map(([name, revenue]) => ({ name, revenue }))
      .sort((a, b) => b.revenue - a.revenue);
  })();

  // Order Status Data for Donut Chart
  const orderStatusData = (() => {
    const statusCount = orders.reduce((acc, order) => {
      const status = order.status === 'Successful' ? 'Completed' : order.status === 'Failed' ? 'Failed' : 'Cancelled';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
    
    return Object.entries(statusCount).map(([name, value]) => ({ name, value }));
  })();

  // Ratings Table Data
  const ratingsTableData = (() => {
    const productRatings: { [key: string]: number[] } = {};
    
    orders.filter(order => order.status === 'Successful').forEach(order => {
      order.items.forEach(item => {
        if (!productRatings[item.name]) {
          productRatings[item.name] = [];
        }
        productRatings[item.name].push(order.rating);
      });
    });
    
    return Object.entries(productRatings)
      .map(([name, ratings]) => ({
        name,
        averageRating: (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1)
      }))
      .sort((a, b) => parseFloat(b.averageRating) - parseFloat(a.averageRating));
  })();

  const COLORS = ['#10B981', '#EF4444', '#6B7280'];

  const handleBarClick = (data: ProductRevenueData) => {
    if (onDishSelect) {
      onDishSelect(data.name);
    }
  };

  return (
    <div className="space-y-8">
      {/* Rating Slicer */}
      <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-purple-900 flex items-center space-x-2">
            <span>⭐</span>
            <span>Rating Filter</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Rating Range: {ratingFilter[0]} - {ratingFilter[1]} stars</span>
              <span>{orders.length} orders</span>
            </div>
            <Slider
              value={ratingFilter}
              onValueChange={onRatingFilterChange}
              max={5}
              min={1}
              step={0.1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Cluster Bar Chart - Revenue by Product */}
        <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              📊 Revenue by Product (Click to Filter)
            </CardTitle>
            {selectedDish && (
              <p className="text-sm text-blue-600">Currently filtering by: {selectedDish}</p>
            )}
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByProduct}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`₹${value}`, 'Revenue']}
                  labelFormatter={(label) => `${label} (Click to filter)`}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                  onClick={handleBarClick}
                  style={{ cursor: 'pointer' }}
                />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 mt-2 text-center">
              💡 Click on any bar to filter the entire dashboard by that dish
            </p>
          </CardContent>
        </Card>

        {/* Donut Chart - Order Status */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              🍩 Order Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {orderStatusData.map((entry, index) => (
                <div key={entry.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-gray-600">
                    {entry.name} ({entry.value})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ratings Table */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent">
              ⭐ Product Ratings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {ratingsTableData.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between items-center p-3 rounded-lg transition-all duration-200 cursor-pointer hover:shadow-md ${
                    selectedDish === item.name 
                      ? 'bg-amber-100 border-2 border-amber-300' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => onDishSelect && onDishSelect(item.name)}
                >
                  <span className="font-medium">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-yellow-600">{item.averageRating}</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(parseFloat(item.averageRating))
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              💡 Click on any product to filter the dashboard
            </p>
          </CardContent>
        </Card>

        {/* Time Hierarchy Chart */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
              📈 Revenue Trend (Monthly)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueByTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6366F1" 
                  strokeWidth={3}
                  dot={{ fill: '#6366F1', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#6366F1', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}