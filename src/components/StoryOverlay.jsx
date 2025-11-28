import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function StoryOverlay({ currentData, onNext, onPrev, progress, total, showTransition }) {
  const isLightMode = currentData.visualMode === 'void';
  const textColorClass = isLightMode ? 'text-gray-900' : 'text-white';
  const subTextColorClass = isLightMode ? 'text-gray-500' : 'text-white/60';

  const CHAPTER_WORDS = ['ZERO', 'ONE', 'TWO'];
  const chapterWord = CHAPTER_WORDS[currentData.chapterNum - 1] || 'NULL';

  let sectionDisplay = String(currentData.sectionNum).padStart(2, '0');
  if (currentData.chapterNum === 1 && currentData.sectionNum === 1) sectionDisplay = 'ORIGIN';
  else if (currentData.chapterNum === 2 && currentData.sectionNum === 5) sectionDisplay = 'EDEN';
  else if (currentData.chapterNum === 3 && currentData.sectionNum === 15) sectionDisplay = 'OVERFLOW';

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 md:p-12 pb-28 md:pb-12 z-10">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        key={`header-${currentData.chapter}`}
        className="w-full flex justify-between items-start relative z-20"
      >
        <div className="flex flex-col">
            <h2 className={`text-[10px] md:text-xs tracking-[0.3em] uppercase font-medium mb-1 ${textColorClass}`}>
            {currentData.chapter}
            </h2>
            <div className="h-px w-8 md:w-12 bg-current opacity-30"/>
        </div>
        
        <div className={`text-[10px] font-mono tracking-widest ${subTextColorClass} flex gap-2`}>
           <span>{chapterWord}</span>
           <span className="opacity-50">//</span>
           <motion.span 
             key={`${currentData.chapterNum}-${currentData.sectionNum}`}
             initial={{ opacity: 0, x: 5 }}
             animate={{ opacity: 1, x: 0 }}
             className={sectionDisplay.length > 2 ? "font-bold text-current" : ""}
           >
             {sectionDisplay}
           </motion.span>
        </div>
      </motion.div>

      {/* Center Text - 3D Stagger Animation */}
      <div className="absolute inset-0 flex justify-center items-center text-center px-6 z-10 pointer-events-none -translate-y-4 md:translate-y-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentData.id}
            className="max-w-3xl w-full perspective-[1000px]"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.1 }
              },
              exit: {
                opacity: 0,
                transition: { duration: 0.4, ease: "easeInOut" }
              }
            }}
          >
            {currentData.text.split('\n').map((line, i) => (
              <motion.p 
                key={i} 
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 20, 
                    rotateX: 90, 
                    filter: 'blur(12px)' 
                  },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    rotateX: 0, 
                    filter: 'blur(0px)', 
                    transition: { type: "spring", damping: 18, stiffness: 80 }
                  },
                  exit: { opacity: 0, y: -10, filter: 'blur(8px)', transition: { duration: 0.3 } }
                }}
                className={`mb-4 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-light leading-normal md:leading-relaxed font-serif tracking-wide ${textColorClass}`}
                style={{ 
                    textShadow: currentData.visualMode === 'void' 
                        ? '0 0 10px rgba(255,255,255,0.8), 0 0 2px rgba(255,255,255,1)' 
                        : '0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)',
                    transformStyle: 'preserve-3d'
                }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Controls */}
      <div className="w-full flex justify-center items-center gap-8 md:gap-12 pointer-events-auto relative z-20">
        <button 
          onClick={onPrev} 
          disabled={progress === 0 || showTransition}
            className={`group p-4 md:p-2 transition-all duration-300 active:scale-90 ${progress === 0 ? 'opacity-0' : 'opacity-50 hover:opacity-100'} ${showTransition ? 'cursor-not-allowed opacity-20' : ''}`}
        >
          <ChevronLeft className={`w-6 h-6 ${textColorClass}`} />
        </button>

        <button 
            onClick={onNext}
            disabled={showTransition}
            className={`group relative px-8 py-3 md:px-8 md:py-3 overflow-hidden rounded-full transition-all duration-500 active:scale-95 ${showTransition ? 'cursor-not-allowed opacity-50' : ''} ${currentData.visualMode === 'void' ? 'bg-black text-white shadow-lg' : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.15)]'}`}
         >
            <span className="relative z-10 flex items-center gap-3 text-xs tracking-[0.2em] uppercase pl-1">
               {progress === total - 1 ? '再次轮回' : '继续探求'} 
               {progress !== total - 1 && <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />}
            </span>
         </button>
      </div>
    </div>
  );
}