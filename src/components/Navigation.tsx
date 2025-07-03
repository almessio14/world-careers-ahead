
interface NavigationProps {
  activeTab: 'quiz' | 'careers' | 'universities';
  onTabChange: (tab: 'quiz' | 'careers' | 'universities') => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8">
          <button
            onClick={() => onTabChange('quiz')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'quiz'
                ? 'border-[#14213d] text-[#14213d]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Quiz di Orientamento
          </button>
          <button
            onClick={() => onTabChange('careers')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'careers'
                ? 'border-[#14213d] text-[#14213d]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Esplora Carriere
          </button>
          <button
            onClick={() => onTabChange('universities')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'universities'
                ? 'border-[#14213d] text-[#14213d]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Università nel Mondo
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
