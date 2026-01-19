import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { data } from '../services/data';
import type { PhotoHuman, TiltConfig } from '../types';
import { useToast } from '../context/ToastContext';

// --- Types ---
interface HomeScreenProps {
  onViewAlbum: (album: PhotoHuman) => void;
}

// --- Horizontal Reel Item ---
const ReelItem: React.FC<{ image: Blob; onClick: () => void }> = ({ image, onClick }) => {
  const src = useMemo(() => URL.createObjectURL(image), [image]);
  useEffect(() => () => URL.revokeObjectURL(src), [src]);

  return (
    <div 
      onClick={onClick}
      className="flex-shrink-0 w-24 h-36 rounded-xl overflow-hidden border border-white/10 bg-secondary relative cursor-pointer hover:scale-105 transition-transform"
    >
      <img src={src} className="w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
};

// --- Tilt Card Component ---
const TiltCard: React.FC<{ 
  collection: PhotoHuman; 
  onView: () => void;
}> = ({ collection, onView }) => {
  const { addToast } = useToast();
  const [isEditingTilt, setIsEditingTilt] = useState(false);
  const [tilt, setTilt] = useState<TiltConfig>(collection.tiltConfig || { x: 0, y: 0, z: 0 });
  const thumbUrl = useMemo(() => URL.createObjectURL(collection.thumbnail), [collection.thumbnail]);

  useEffect(() => () => URL.revokeObjectURL(thumbUrl), [thumbUrl]);

  const saveTilt = async () => {
    if (collection.id) {
      await data.photoHumans.update(collection.id, { tiltConfig: tilt });
      setIsEditingTilt(false);
      addToast('3D View Saved', 'success');
    }
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0, z: 0 });
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the card
    if (window.confirm(`Are you sure you want to delete "${collection.name}"? This action cannot be undone.`)) {
      try {
        if (collection.id) {
          await data.photoHumans.delete(collection.id);
          addToast('Collection deleted', 'success');
        }
      } catch (error) {
        console.error("Delete failed:", error);
        addToast('Failed to delete collection', 'error');
      }
    }
  };

  return (
    <div className="mb-12 relative group perspective-1000">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-3 px-1">
        <div>
           <h3 className="font-bold text-lg text-white leading-tight">{collection.name}</h3>
           {collection.description && <p className="text-xs text-gray-400">{collection.description}</p>}
        </div>
        
        <div className="flex items-center gap-2">
            {/* Delete Button */}
            <button
                onClick={handleDelete}
                className="p-2 rounded-full bg-white/5 text-gray-400 hover:bg-red-500/20 hover:text-red-500 transition-colors"
                title="Delete Collection"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>

            {/* Tilt Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); setIsEditingTilt(!isEditingTilt); }}
              className={`p-2 rounded-full transition-colors ${isEditingTilt ? 'bg-accent text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
              title="3D Tilt"
            >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
               </svg>
            </button>
        </div>
      </div>

      {/* 3D Container */}
      <div 
        className="relative w-full aspect-[4/3] preserve-3d transition-transform duration-500 ease-out cursor-pointer"
        style={{ 
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) rotateZ(${tilt.z}deg)`,
        }}
        onClick={onView}
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-secondary border border-white/10 card-glare">
           <img src={thumbUrl} className="w-full h-full object-cover" loading="lazy" />
           <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
           
           {/* View More Button Overlay */}
           <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
             <span className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg">View Gallery</span>
           </div>
        </div>
        
        {/* Fake Depth Layers for "VR" feel */}
        <div 
            className="absolute inset-0 rounded-2xl bg-white/5 -z-10"
            style={{ transform: 'translateZ(-20px) scale(0.95)' }}
        />
        <div 
            className="absolute inset-0 rounded-2xl bg-white/5 -z-20"
            style={{ transform: 'translateZ(-40px) scale(0.9)' }}
        />
      </div>

      {/* Tilt Controls */}
      {isEditingTilt && (
        <div className="mt-4 p-4 bg-secondary/80 backdrop-blur rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-2">
            <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase text-accent tracking-widest">Adjust 3D Angle</span>
                <button onClick={resetTilt} className="text-[10px] text-gray-400 hover:text-white">Reset</button>
            </div>
            
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <span className="text-xs w-4 text-gray-500">X</span>
                    <input 
                        type="range" min="-30" max="30" 
                        value={tilt.x} 
                        onChange={(e) => setTilt({...tilt, x: Number(e.target.value)})}
                        className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none accent-white"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs w-4 text-gray-500">Y</span>
                    <input 
                        type="range" min="-30" max="30" 
                        value={tilt.y} 
                        onChange={(e) => setTilt({...tilt, y: Number(e.target.value)})}
                        className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none accent-white"
                    />
                </div>
            </div>
            
            <button 
                onClick={saveTilt}
                className="w-full mt-4 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
                Done
            </button>
        </div>
      )}
    </div>
  );
};

// --- Main Home Screen ---
const HomeScreen: React.FC<HomeScreenProps> = ({ onViewAlbum }) => {
  const collections = useLiveQuery(() => data.photoHumans.orderBy('createdAt').reverse().toArray(), []);

  // Aggregate random images for the "Shorts/Reels" section
  const reelImages = useMemo(() => {
    if (!collections) return [];
    const allImages: { blob: Blob; album: PhotoHuman }[] = [];
    collections.forEach(col => {
       // Take up to 3 random images from each collection
       const shuffled = [...col.images].sort(() => 0.5 - Math.random()).slice(0, 3);
       shuffled.forEach(img => allImages.push({ blob: img, album: col }));
    });
    // Shuffle the whole reel
    return allImages.sort(() => 0.5 - Math.random()).slice(0, 15);
  }, [collections]);

  if (!collections) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="w-full h-full overflow-y-auto pb-24 pt-20 px-4 bg-primary no-scrollbar">
      
      {/* Top Reel Section */}
      {reelImages.length > 0 && (
          <div className="mb-10">
            <h2 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest pl-1">Highlights</h2>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
                {reelImages.map((item, idx) => (
                    <ReelItem 
                        key={idx} 
                        image={item.blob} 
                        onClick={() => onViewAlbum(item.album)} 
                    />
                ))}
            </div>
          </div>
      )}

      {/* Vertical Collections */}
      <div className="max-w-xl mx-auto">
        <h2 className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-widest pl-1">Collections</h2>
        
        {collections.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-3xl">
                <span className="text-4xl block mb-4 grayscale opacity-20">📸</span>
                <p className="text-gray-500">No collections yet.</p>
                <p className="text-gray-600 text-xs mt-1">Tap + to create one.</p>
            </div>
        ) : (
            collections.map(col => (
                <TiltCard 
                    key={col.id} 
                    collection={col} 
                    onView={() => onViewAlbum(col)} 
                />
            ))
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
