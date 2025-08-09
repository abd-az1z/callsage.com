# CallSage - Modern Call Management Platform

![CallSage Logo](https://via.placeholder.com/150x50?text=CallSage)  
*Streamline your communication with AI-powered call management*

## 🚀 Features

- **AI-Powered Call Management** - Intelligent call handling and routing
- **Video Conferencing** - Built-in video call capabilities
- **Real-time Chat** - Integrated chat functionality for seamless communication
- **Meeting Scheduling** - Easy scheduling and management of calls and meetings
- **Analytics Dashboard** - Track and analyze call metrics and performance
- **Premium Features** - Advanced capabilities for professional users

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **State Management**: TanStack Query, React Hook Form
- **Real-time**: Stream Chat, WebRTC
- **Database**: NeonDB (PostgreSQL)
- **Backend**: Next.js API Routes, tRPC
- **Authentication**: Custom auth solution
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
- PostgreSQL database (local or remote)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abd-az1z/callsage.com.git
   cd callsage.com
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   DATABASE_URL=your_database_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Set up the database:
   ```bash
   npx drizzle-kit push
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
src/
├── app/                  # App router pages and layouts
├── components/           # Reusable UI components
├── lib/                  # Utility functions and configurations
├── modules/              # Feature modules
│   ├── agents/           # Agent management
│   ├── call/             # Call functionality
│   ├── dashboard/        # Dashboard views
│   ├── meetings/         # Meeting management
│   └── premium/          # Premium features
├── public/               # Static assets
└── styles/               # Global styles
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

Please make sure to update tests as appropriate and follow the existing code style.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

- **GitHub Issues**: [https://github.com/abd-az1z/callsage.com/issues](https://github.com/abd-az1z/callsage.com/issues)
- **Email**: [your-email@example.com](mailto:your-email@example.com)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [tRPC](https://trpc.io/) - End-to-end typesafe APIs
- [Stream](https://getstream.io/) - Chat and video API
- [OpenAI](https://openai.com/) - AI models and APIs
