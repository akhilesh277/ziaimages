
import React, { useState, useEffect, useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { data } from '../services/data';
import type { PhotoHuman } from '../types';

interface HomeScreenProps {
  onViewAlbum: (album: PhotoHuman) => void;
}

const AlbumReel: React.FC<{ album: PhotoHuman; onViewAlbum: (album: PhotoHuman) => void; isVisible: boolean }> = ({ album, onViewAlbum, isVisible }) => {
  const [hasError, setHasError] = useState(false);

  // Randomly select a cover image from the album's images on mount
  const randomCoverBlob = useMemo(() => {
    if (album.images && album.images.length > 0) {
        const idx = Math.floor(Math.random() * album.images.length);
        return album.images[idx];
    }
    return album.thumbnail;
  }, [album]);

  const thumbnailUrl = useMemo(() => {
    if (hasError) return '';
    return isVisible ? URL.createObjectURL(randomCoverBlob) : '';
  }, [randomCoverBlob, isVisible, hasError]);

  useEffect(() => {
    return () => {
      if (thumbnailUrl) {
        URL.revokeObjectURL(thumbnailUrl);
      }
    };
  }, [thumbnailUrl]);
  
  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <div className="w-screen h-screen relative flex-shrink-0 snap-start snap-always bg-primary">
      {isVisible && !hasError && (
         <img
            src={thumbnailUrl}
            alt={album.name}
            className="w-full h-full object-cover opacity-100" // Ensure full opacity for quality
            loading="lazy"
            onError={handleImageError}
         />
      )}
      {hasError && (
        <div className="w-full h-full bg-secondary flex items-center justify-center">
            <p className="text-text-sub font-mono text-xs">Image failed to load</p>
        </div>
      )}
      {/* Subtle Gradient at bottom only */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent pointer-events-none" />
      
      {/* Increased bottom padding to clear the footer (bottom-28) */}
      <div className="absolute bottom-28 left-6 right-6 text-text-main p-2 z-10">
        <h2 className="text-3xl font-bold tracking-tight mb-2 leading-tight uppercase drop-shadow-lg">{album.name}</h2>
        {album.description && <p className="text-sm text-text-main/80 font-medium leading-relaxed max-w-lg mb-6 line-clamp-2 drop-shadow-md">{album.description}</p>}
        <button
          onClick={() => onViewAlbum(album)}
          className="bg-accent text-primary hover:bg-accent-hover font-bold py-3 px-8 rounded-full transition-all duration-300 uppercase tracking-widest text-xs shadow-xl hover:scale-105"
        >
          Open Collection
        </button>
      </div>
    </div>
  );
};

const HomeScreen: React.FC<HomeScreenProps> = ({ onViewAlbum }) => {
  const albums = useLiveQuery(() => data.photoHumans.orderBy('createdAt').reverse().toArray(), []);
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    if (!albums) return;
    const options = {
      root: document.getElementById('reel-container'),
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          setVisibleIndex(index);
        }
      });
    }, options);
    
    const reels = document.querySelectorAll('.snap-start');
    if (reels.length > 0) {
      reels.forEach(reel => observer.observe(reel));
    }
    
    return () => {
       if (reels.length > 0) {
        reels.forEach(reel => observer.unobserve(reel));
       }
    };
  }, [albums]);

  if (!albums) {
    return <div className="w-full h-full flex items-center justify-center bg-primary text-text-sub">Loading albums...</div>;
  }

  if (albums.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-primary">
        <h2 className="text-4xl font-black mb-4 text-text-main tracking-tighter uppercase">ZIA.AI</h2>
        <p className="text-text-sub max-w-xs mx-auto mb-10 font-medium">Your local creative sanctuary.<br/>Start building your visual legacy.</p>
        <div className="w-24 h-1.5 bg-border-base rounded-full"></div>
      </div>
    );
  }

  return (
    <div id="reel-container" className="w-full h-full snap-y snap-mandatory overflow-y-scroll overflow-x-hidden bg-primary">
      {albums.map((album, index) => (
        <div key={album.id} data-index={index}>
          <AlbumReel 
            album={album} 
            onViewAlbum={onViewAlbum} 
            isVisible={index >= visibleIndex - 1 && index <= visibleIndex + 1} // Preload next and prev
          />
        </div>
      ))}
    </div>
  );
};

export default HomeScreen;
