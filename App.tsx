
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import RegistrationForm from './components/RegistrationForm';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(reveal => observer.observe(reveal));

    return () => observer.disconnect();
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  return (
    <Layout onRegisterClick={() => setIsModalOpen(true)}>
      <div className="flex flex-col">
        <Hero onRegisterClick={() => setIsModalOpen(true)} />
        
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setIsModalOpen(false)}
            />
            <div className="relative w-full max-w-xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-500 ease-out">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-12 right-0 md:-right-12 text-zinc-500 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
              <RegistrationForm />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
