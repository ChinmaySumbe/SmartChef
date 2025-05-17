import React, { useState, useEffect } from 'react';
import { ChefHat, Heart, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';

interface HeaderProps {
  onFavoritesClick: () => void;
  hasGeneratedRecipes: boolean;
  currentView: 'home' | 'detail' | 'favorites';
}

export const Header: React.FC<HeaderProps> = ({ onFavoritesClick, hasGeneratedRecipes, currentView }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 left-0 right-0 z-10 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2 text-primary-600">
          <ChefHat size={28} className="text-primary-600" />
          <span className="font-display font-bold text-xl">SmartChef</span>
        </a>
        
        <div className="flex items-center space-x-2">
          {hasGeneratedRecipes && currentView !== 'favorites' && (
            <Button 
              variant="outline"
              iconLeft={<Heart size={18} />}
              onClick={onFavoritesClick}
              className="hidden sm:flex"
            >
              Favorites
            </Button>
          )}
          
          <Button 
            variant={currentView === 'favorites' ? 'primary' : 'outline'}
            iconLeft={currentView === 'favorites' ? <Sparkles size={18} /> : <Heart size={18} />}
            onClick={onFavoritesClick}
            className="sm:hidden"
            aria-label={currentView === 'favorites' ? 'New Recipe' : 'Favorites'}
          >
            {currentView === 'favorites' ? '' : ''}
          </Button>
        </div>
      </div>
    </header>
  );
};