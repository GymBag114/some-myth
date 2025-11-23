import { motion, AnimatePresence } from 'framer-motion';

export default function ChapterTransition({ show, chapterData, onAnimationComplete, onDismiss }) {
  const themeConfig = {
    1: { // 无中之始
      bg: "bg-[#f5f5f5]",
      text: "text-black",
      sub: "text-black/50",
      line: "bg-black/20",
      glitch: false
    },
    2: { // 失落伊甸
      bg: "bg-[#050505]",
      text: "text-[#ffd700]",
      sub: "text-[#ffd700]/60",
      line: "bg-[#ffd700]/30",
      glitch: false
    },
    3: { // 双重溢出
      bg: "bg-[#000000]",
      text: "text-[#ff3333]",
      sub: "text-[#ff3333]/60",
      line: "bg-[#ff3333]/40",
      glitch: true
    }
  };

  const config = themeConfig[chapterData.chapterNum] || themeConfig[1];
  const chapterWords = ['ZERO', 'ONE', 'TWO'];
  const chapterWord = chapterWords[chapterData.chapterNum - 1] || 'NULL';
  const englishTitle = chapterData.chapter.split('」')[1] || chapterData.chapter;

  return (
    <AnimatePresence mode="wait" onExitComplete={onAnimationComplete}>
      {show && (
        <motion.div
          key="chapter-transition"
          onClick={onDismiss}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${config.bg} cursor-pointer`}
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(100% 0 0 0)" }}    
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* 装饰线条 */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
             <motion.div 
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
                className={`absolute top-1/2 left-0 w-full h-px ${config.line}`} 
             />
             <motion.div 
                initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
                className={`absolute top-0 left-1/2 h-full w-px ${config.line}`} 
             />
          </div>

          {/* 章节序号 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={`text-sm md:text-base font-mono tracking-[0.5em] mb-4 ${config.sub}`}
          >
            CHAPTER // {chapterWord}
          </motion.div>

          {/* 主标题 */}
          <motion.h1
            className={`text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter font-serif ${config.text} relative`}
            initial={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            animate={{ 
                opacity: 1, 
                scale: 1, 
                filter: "blur(0px)",
                x: config.glitch ? [0, -2, 2, -1, 0] : 0
            }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {englishTitle}
            {config.glitch && (
                <motion.span 
                    className="absolute inset-0 opacity-50 mix-blend-screen select-none"
                    animate={{ x: [-2, 2, -3, 0], opacity: [0.5, 0.8, 0.3] }}
                    transition={{ repeat: Infinity, duration: 0.1 }}
                >
                    {englishTitle}
                </motion.span>
            )}
          </motion.h1>

          {/* 跳过提示 */}
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.8 }}
             className={`absolute bottom-12 text-[10px] tracking-[1em] uppercase ${config.sub}`}
          >
             Reflecting Infinity
          </motion.div>
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.5 }}
             transition={{ delay: 2.5 }}
             className={`absolute bottom-4 text-[8px] tracking-widest uppercase ${config.sub}`}
          >
             [ Click to Skip ]
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
