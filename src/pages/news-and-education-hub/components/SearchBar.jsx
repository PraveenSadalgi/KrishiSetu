import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, placeholder = "Search news, tutorials, and guides..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchQuery);
  };

  const handleVoiceSearch = () => {
    setIsVoiceActive(true);
    // Mock voice search functionality
    setTimeout(() => {
      setIsVoiceActive(false);
      setSearchQuery("Weather forecast for wheat farming");
      onSearch("Weather forecast for wheat farming");
    }, 2000);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="relative">
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
        <Input
          type="search"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="pl-10 pr-20 h-12 bg-background border-border focus:border-primary"
        />
        
        {/* Voice Search Button */}
        <button
          type="button"
          onClick={handleVoiceSearch}
          disabled={isVoiceActive}
          className={`absolute right-12 top-1/2 transform -translate-y-1/2 p-2 rounded-full organic-transition ${
            isVoiceActive 
              ? 'bg-primary text-primary-foreground animate-pulse' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          <Icon name="Mic" size={16} />
        </button>

        {/* Clear Button */}
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground organic-transition"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
      {/* Voice Search Indicator */}
      {isVoiceActive && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm text-primary font-medium">Listening... Speak now</span>
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchBar;