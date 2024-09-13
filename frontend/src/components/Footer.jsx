const Footer = () => {
  const handleGithubRedirect = () => {
    window.open('https://github.com/Abhishek-Devanda', '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="max-w-screen-xl mx-auto px-6 text-center">
        <span>Made with <span className="text-red-500">❤</span> by </span>
        <button 
          onClick={handleGithubRedirect} 
          className="text-white hover:text-blue-400 underline focus:outline-none"
        >
          Abhishek Devanda
        </button>
      </div>
    </footer>
  );
};

export default Footer;
