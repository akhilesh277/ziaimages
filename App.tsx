
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './components/HomeScreen';
import CreateScreen from './components/CreateScreen';
import GalleryViewer from './components/GalleryViewer';
import PromptsScreen from './components/PromptsScreen';
import FeedScreen from './components/FeedScreen';
import SideMenu from './components/SideMenu';
import type { PhotoHuman } from './types';
import { data } from './services/data';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './context/ToastContext';
import { PWAProvider } from './context/PWAContext';

// Updated View type to remove unused pages
type View = 'home' | 'feed' | 'create' | 'prompts';

function AppContent() {
  const [view, setView] = useState<View>('home');
  const [selectedAlbum, setSelectedAlbum] = useState<PhotoHuman | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCreateAlbum = async (album: Omit<PhotoHuman, 'createdAt' | 'id'>) => {
    try {
      await data.photoHumans.add({
        ...album,
        createdAt: new Date(),
        schemaVersion: 1, // Set initial schema version
        metadata: {} 
      });
      setView('home');
    } catch (error) {
      console.error("Failed to save album:", error);
      alert("Error: Could not save the album. Please ensure you have enough storage space and try again.");
    }
  };

  const handleViewAlbum = (album: PhotoHuman) => {
    setSelectedAlbum(album);
  };
  
  const handleCloseGallery = () => {
    setSelectedAlbum(null);
  };

  return (
    <div className="h-full w-full bg-primary text-text-main flex flex-col font-sans antialiased overflow-hidden transition-colors duration-300">
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="flex-1 overflow-hidden relative">
        {view === 'home' && <HomeScreen onViewAlbum={handleViewAlbum} />}
        {view === 'feed' && <FeedScreen />}
        {view === 'create' && <CreateScreen onSave={handleCreateAlbum} onCancel={() => setView('home')} />}
        {view === 'prompts' && <PromptsScreen />}
      </main>
      <Footer currentView={view} setView={setView} />

      {selectedAlbum && (
        <GalleryViewer album={selectedAlbum} onClose={handleCloseGallery} />
      )}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <PWAProvider>
        <ThemeProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </ThemeProvider>
      </PWAProvider>
    </ErrorBoundary>
  );
}

export default App;
