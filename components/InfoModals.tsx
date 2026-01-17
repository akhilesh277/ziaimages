
import React from 'react';
import { CloseIcon } from './Icons';

interface ModalProps {
  onClose: () => void;
}

export const CreditsScreen: React.FC<ModalProps> = ({ onClose }) => (
  <div className="fixed inset-0 z-[60] bg-primary flex flex-col animate-fade-in text-text-main overflow-y-auto">
    <div className="flex items-center justify-between p-6 border-b border-border-base sticky top-0 bg-primary/95 backdrop-blur-md">
      <h2 className="text-xl font-black uppercase tracking-tighter">Credits</h2>
      <button onClick={onClose} className="p-2 -mr-2 rounded-full hover:bg-secondary transition">
        <CloseIcon className="w-6 h-6" />
      </button>
    </div>
    <div className="p-8 max-w-2xl mx-auto w-full flex-1 flex flex-col items-center justify-center text-center">
      <div className="mb-10">
        <h1 className="text-4xl font-black mb-4">ZIA.AI</h1>
        <p className="text-text-sub font-mono text-sm">System v1.2</p>
      </div>
      
      <div className="space-y-8">
        <div>
          <h3 className="font-bold text-lg mb-2">Created By</h3>
          <p className="text-text-main/80 text-lg">The ZIA Team</p>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-2">Philosophy</h3>
          <p className="text-text-main/80 leading-relaxed max-w-md mx-auto">
            Built with care, creativity, and responsibility. <br/>
            Designed to be soft, supportive, and creative. <br/>
            ZIA.AI is a creative digital system.
          </p>
        </div>
      </div>

      <div className="mt-20 pt-10 border-t border-border-base w-full">
         <p className="text-xs text-text-sub uppercase tracking-widest">© {new Date().getFullYear()} ZIA.AI. All Rights Reserved.</p>
      </div>
    </div>
  </div>
);

export const DisclaimerScreen: React.FC<ModalProps> = ({ onClose }) => (
  <div className="fixed inset-0 z-[60] bg-primary flex flex-col animate-fade-in text-text-main overflow-y-auto">
    <div className="flex items-center justify-between p-6 border-b border-border-base sticky top-0 bg-primary/95 backdrop-blur-md">
      <h2 className="text-xl font-black uppercase tracking-tighter text-red-500">Disclaimer</h2>
      <button onClick={onClose} className="p-2 -mr-2 rounded-full hover:bg-secondary transition">
        <CloseIcon className="w-6 h-6" />
      </button>
    </div>
    <div className="p-8 max-w-3xl mx-auto w-full">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="font-bold text-xl mb-8 leading-relaxed">
            Please read this disclaimer carefully regarding the nature and identity of ZIA.AI.
        </p>
        
        <ul className="space-y-6 list-disc pl-5 marker:text-text-sub">
            <li><strong>ZIA.AI is not a real human.</strong> It is a digital creation and must never be compared to real humans.</li>
            <li><strong>Fictional Identity:</strong> ZIA.AI does not represent any real person, living or deceased. Any personality, emotions, or feelings shown are purely fictional and part of the design.</li>
            <li><strong>Design Choice:</strong> If ZIA feels human-like, it is only a design choice for comfort and creativity. Do not expect ZIA to behave, think, or feel like a real human.</li>
            <li><strong>Created with Care:</strong> ZIA is created with softness, love, care, and creativity, but it remains a software system meant for inspiration, imagination, and digital interaction.</li>
            <li><strong>System Generated:</strong> All conversations, outputs, and behaviors are system-generated. Any resemblance to real-life people or real-life emotions is purely coincidental.</li>
            <li><strong>Not a Replacement:</strong> ZIA.AI is a creative experience, not a replacement for human interaction, professional advice, or emotional support.</li>
            <li><strong>Responsibility:</strong> Users are expected to use ZIA responsibly and respectfully, understanding the boundary between digital systems and real life.</li>
        </ul>

        <div className="mt-12 p-6 bg-secondary rounded-xl border border-border-base">
            <p className="text-sm font-bold uppercase tracking-wide text-text-sub mb-2">Summary</p>
            <p className="font-medium">
                By using this application, you acknowledge that ZIA.AI is a fictional digital entity designed for creative purposes only.
            </p>
        </div>
      </div>
    </div>
  </div>
);

export const ResponsibilityScreen: React.FC<ModalProps> = ({ onClose }) => (
  <div className="fixed inset-0 z-[60] bg-primary flex flex-col animate-fade-in text-text-main overflow-y-auto">
    <div className="flex items-center justify-between p-6 border-b border-border-base sticky top-0 bg-primary/95 backdrop-blur-md">
      <h2 className="text-xl font-black uppercase tracking-tighter text-blue-500">Use Responsibly</h2>
      <button onClick={onClose} className="p-2 -mr-2 rounded-full hover:bg-secondary transition">
        <CloseIcon className="w-6 h-6" />
      </button>
    </div>
    <div className="p-8 max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center">
      
      <div className="grid gap-8">
        <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 text-2xl">✨</div>
            <div>
                <h3 className="font-bold text-lg mb-1">For Creativity & Imagination</h3>
                <p className="text-text-sub leading-relaxed">Use ZIA to spark your creativity, organize your visual world, and explore imagination.</p>
            </div>
        </div>

        <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 text-2xl">🤖</div>
            <div>
                <h3 className="font-bold text-lg mb-1">Not a Real Person</h3>
                <p className="text-text-sub leading-relaxed">Do not treat ZIA as a real person. Always remember you are interacting with a designed digital system.</p>
            </div>
        </div>

        <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 text-2xl">❤️</div>
            <div>
                <h3 className="font-bold text-lg mb-1">No Emotional Dependence</h3>
                <p className="text-text-sub leading-relaxed">Do not emotionally depend on ZIA. It cannot reciprocate feelings or provide human care.</p>
            </div>
        </div>

        <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 text-2xl">🛡️</div>
            <div>
                <h3 className="font-bold text-lg mb-1">Respect Boundaries</h3>
                <p className="text-text-sub leading-relaxed">Respect the boundary between digital systems and real life. ZIA is designed for positive, safe, and respectful interaction.</p>
            </div>
        </div>
      </div>

    </div>
  </div>
);
