# Energy Insight App

A modern, responsive web application built with Next.js that visualizes and analyzes household energy consumption data. The dashboard provides interactive charts, detailed usage tables, and comprehensive analytics to help users understand their energy consumption patterns.

## 🚀 Features

### 📊 **Interactive Data Visualization**
- **Bar Chart View**: Daily energy consumption with color-coded bars
  - 🟢 Green: Below daily average consumption
  - 🔵 Blue: Above daily average consumption  
  - 🔴 Red: High usage (1.5x above average)
- **Responsive Charts**: Built with Recharts for smooth interactions
- **Date Range Filtering**: Interactive slider to focus on specific time periods

### 📋 **Detailed Data Table**
- **Sortable Columns**: Click any column header to sort data
- **Comprehensive Metrics**: Daily totals, hourly averages, peak usage, and peak times
- **Visual Indicators**: Color-coded chips for peak usage alerts
- **Responsive Design**: Optimized for desktop and mobile viewing

### 📈 **Summary Analytics**
- **Total Energy Usage**: Complete consumption for selected period
- **Daily Average**: Average daily kWh consumption
- **Date Range**: Clear period indicators
- **Day Count**: Number of days in current selection

### 🎛️ **User Controls**
- **Date Range Slider**: Easily adjust the viewing period
- **Tab Navigation**: Switch between chart and table views
- **Real-time Updates**: Instant recalculation when changing date ranges

## 🛠️ Technology Stack

- **Frontend**: React 19, Next.js 15
- **UI Library**: Material-UI (MUI) v6
- **Charts**: Recharts
- **Language**: TypeScript
- **Styling**: Emotion (CSS-in-JS)
- **Testing**: Jest
- **Build Tool**: Next.js with Turbopack

## 🏗️ Architecture

```
src/
├── components/          # Reusable UI components
│   ├── Chart.tsx       # Interactive bar chart component
│   ├── DataTable.tsx   # Sortable data table with filtering
│   ├── DateRangeSlider.tsx # Date range selection component
│   ├── Summary.tsx     # Summary statistics card
│   └── UIStates.tsx    # Loading and error state components
├── hooks/              # Custom React hooks
│   ├── useEnergyData.tsx    # Data fetching hook
│   ├── useFilteredData.tsx  # Data filtering logic
│   └── useTableSort.tsx     # Table sorting functionality
├── pages/              # Next.js pages and API routes
│   ├── index.tsx       # Main dashboard page
│   ├── api/usage.ts    # Energy data API endpoint
│   ├── _app.tsx        # App configuration
│   └── _document.tsx   # Document structure
├── server/             # Server-side utilities
│   ├── loadUsage.ts    # CSV data processing
│   ├── config.ts       # Server configuration
│   └── data/          # Sample energy data files
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   ├── chartUtils.ts   # Chart helper functions
│   └── dateTimeUtils.ts # Date formatting utilities
└── tests/              # Test suites
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd energy-usage-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build optimized production bundle
npm start           # Start production server

# Quality Assurance
npm run test        # Run test suites
npm run lint        # Run ESLint for code quality
```

## 📊 Data Format

The application processes CSV energy usage data with the following structure:
- **Date**: Daily consumption records
- **48 Time Intervals**: Half-hourly energy readings (30-minute intervals)
- **Automatic Processing**: Converts raw CSV data to structured JSON format

### Sample Data Structure
```typescript
interface DailyUsage {
  date: string;              // ISO date format (YYYY-MM-DD)
  totalKwh: number;          // Total daily consumption
  averageHourlyKwh: number;  // Average hourly consumption  
  usagePeak: {
    hour: string;            // Time of peak usage (HH:MM)
    kw: number;              // Peak power consumption
  }
}
```

## 🧪 Testing

The application includes comprehensive test coverage:

```bash
npm run test
```

**Test Suites:**
- **API Tests**: Verify data endpoint functionality
- **Utility Tests**: Date formatting and chart calculations
- **Data Processing Tests**: CSV parsing and data transformation

## 🎨 Design Features

### Color Scheme
- **Primary**: Material-UI default blue palette
- **Success**: Green for below-average usage
- **Warning**: Blue for above-average usage  
- **Error**: Red for high usage alerts

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Desktop Enhanced**: Rich interactions on larger screens
- **Flexible Layouts**: Adapts to various screen sizes

## 🔧 Configuration

### Environment Variables
No environment variables required for basic operation.

### Customization
- **Date Range**: Modify initial date range in `src/pages/index.tsx`
- **Color Thresholds**: Adjust usage thresholds in `src/utils/chartUtils.ts`
- **Data Source**: Update CSV file path in `src/server/config.ts`

## 📈 Performance

- **Optimized Rendering**: React.memo for component optimization
- **Efficient Data Processing**: Memoized calculations with useMemo
- **Lazy Loading**: Components load only when needed
- **Bundle Optimization**: Next.js automatic code splitting

## 🐛 Troubleshooting

### Common Issues

**Build Errors:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Data Loading Issues:**
- Verify CSV file exists in `src/server/data/`
- Check file permissions and format

**Port Conflicts:**
```bash
npm run dev -- -p 3001  # Use different port
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is part of a coding challenge and is intended for demonstration purposes.

## 🏆 Key Achievements

- ✅ **Clean Architecture**: Modular, maintainable codebase
- ✅ **Type Safety**: Full TypeScript implementation
- ✅ **Performance**: Optimized React patterns
- ✅ **Responsive**: Works on all device sizes
- ✅ **Tested**: Comprehensive test coverage
- ✅ **Modern**: Latest React and Next.js features

---

**Built with ❤️ using React, Next.js, and Material-UI**