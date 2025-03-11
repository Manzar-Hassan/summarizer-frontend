
# 🚀 Briefly Frontend

A modern web application built with Next.js that transforms meeting transcripts into concise, actionable summaries.

## ✨ Features

- 📤 File upload support for .vtt transcripts
- 📝 Real-time meeting summarization
- 👀 Preview mode for summaries
- 📋 Copy to clipboard functionality
- 💾 Download summaries as text files
- 🌓 Dark/Light theme support
- 📱 Responsive design

## 🛠 Tech Stack

- **Framework**: Next.js 15.2
- **UI Library**: React 19.0
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **HTTP Client**: Axios
- **Animations**: Motion
- **Tooltips**: React Tooltip

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone <repository-url>
cd briefly-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file:
```env
NEXT_PUBLIC_MEETING_SUMMARY_URL=http://localhost:8000
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
briefly-frontend/
├── app/                # Next.js app directory
│   ├── layout.js      # Root layout
│   ├── page.jsx       # Main page component
│   └── globals.css    # Global styles
├── components/        # Reusable components
├── public/           # Static assets
├── services/         # API services
└── context/         # React context providers
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Theme Customization

The application supports both light and dark themes. Theme variables are defined in `globals.css`:

- Light theme colors optimized for readability
- Dark theme with reduced eye strain
- Smooth transitions between themes

## 📦 Dependencies

Core dependencies include:
- next: ^15.2.1
- react: ^19.0.0
- axios: ^1.8.1
- react-icons: ^5.5.0
- react-tooltip: ^5.28.0

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.