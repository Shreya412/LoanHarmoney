# LoanHarmoney 🚀

A gamified peer-to-peer lending platform that reimagines how borrowers and lenders connect through trust-building mechanisms and engaging user experience.

## 🌟 Features

- **Dual User Perspectives**: Seamlessly switch between lender and borrower views
- **Karma System**: Gamified trust-building through community participation
- **Smart Filtering**: Advanced loan request filtering by amount, duration, and credit score
- **Story Integration**: Borrowers can share personal stories with their loan requests
- **Interactive Dashboard**: Real-time analytics and performance metrics
- **Trust Score**: Dynamic scoring based on user activity and karma

## 🛠️ Tech Stack

- **Frontend**: React 18+ with Hooks
- **Styling**: Tailwind CSS
- **Icons**: Lucide-react
- **Charts**: Recharts
- **State Management**: React useState (MVP)

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Shreya412/LoanHarmoney.git
cd LoanHarmoney

cd loanharmoney

# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at `http://localhost:3000`

## 📦 Project Structure

```
loan-harmony/
├── src/
│   ├── App.js           # Main application component
│   ├── App.css          # Global styles
│   ├── index.js         # Application entry point
│   └── index.css        # Tailwind CSS imports
├── public/
│   └── index.html
├── package.json
├── README.md
└── tailwind.config.js
```

## 🎮 Usage

### As a Borrower:
1. Click "Switch to Borrower" in the navigation
2. Go to "New Request" tab
3. Fill out loan details (amount, purpose, duration, credit score)
4. Add an optional story to connect with lenders
5. Submit and track interest from lenders

### As a Lender:
1. Browse loan requests in "Browse Requests" tab
2. Use filters to find suitable loans
3. Read borrower stories and details
4. Click "Express Interest" to connect
5. Earn karma for active participation


## 🔄 Innovations
1. **Karma System**: 
- Borrowers and lenders earn karma points for positive interactions
- Karma affects visibility and trustworthiness
- Rewards responsible borrowing behavior
2. **Trust Score Dashboard**: 
- Real-time trust metrics based on payment history and karma
- Transparent scoring system visible to all users
- Gamified progression system
3. **Smart Matching Algorithm**:
- Filters requests by amount, duration, and credit score
- Future: AI-powered matching based on risk profiles
4. **Story Based Engagement**:
- Borrowers can share personal stories with loan requests
- Creates emotional connection while maintaining anonymity
- Lenders can read stories before expressing interest
5. **Visual Analytics**:
- Real-time request trends graph
- Performance metrics dashboard
- Interactive data visualization

## 🔄 Key Interactions
- **Express Interest**: Lenders can show interest in loan requests
- **Karma Rewards**: Users earn karma for positive actions
- **Trust Score**: Automatically calculated based on activity
- **Real-time Analytics**: Track trends and performance metrics

## 🔮 Future Roadmap

### Phase 1 (MVP - Complete)
- [x] Basic matching interface
- [x] Karma system
- [x] Trust score dashboard
- [x] Request filtering
- [x] Analytics visualization

### Phase 2 (Planned)
- [ ] Django backend integration
- [ ] User authentication
- [ ] Payment processing
- [ ] AI-powered matching

### Phase 3 (Future)
- [ ] Mobile app
- [ ] Advanced risk assessment
- [ ] Real-time messaging
- [ ] International support

## 🚧 Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

### Tailwind CSS Setup

Ensure your `tailwind.config.js` includes:

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

And your `src/index.css` has:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Acknowledgments

- React community for excellent documentation
- Tailwind CSS for rapid styling
- Lucide-react for beautiful icons
- Recharts for data visualization
