export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h1 className="text-6xl font-bold mb-8">Apps</h1>
        <p className="text-xl text-gray-400 mb-12">
          Experimental projects and demos
        </p>
        
        <div className="grid gap-6">
          <a 
            href="/mmmaaaaarrrk" 
            className="block p-6 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <h2 className="text-2xl font-bold mb-2">MARK</h2>
            <p className="text-gray-400">
              An attention-grabbing microsite with AI-generated animations
            </p>
          </a>
          
          <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-700 border-dashed">
            <h2 className="text-xl font-bold mb-2 text-gray-500">More apps coming soon...</h2>
            <p className="text-gray-600">
              This space reserved for future experiments
            </p>
          </div>
        </div>
        
        <footer className="text-sm text-gray-600 pt-12">
          <p>Built by <a href="https://chrismerchant.work" className="hover:text-white transition-colors">Chris Merchant</a></p>
        </footer>
      </div>
    </div>
  );
}