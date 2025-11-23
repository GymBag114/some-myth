// --- 1. 完整剧情数据 ---
const RAW_STORY_DATA = [
  // --- 第一章：无中之始 ---
  { id: 'c1-1', chapter: '「无中之始」ZERORIGIN', text: "诞生？\n不，不对。\n是溢出。", visualMode: 'void' },
  { id: 'c1-2', chapter: '「无中之始」ZERORIGIN', text: "某种没被允许完成的东西自己找到了裂缝——", visualMode: 'void' },
  { id: 'c1-3', chapter: '「无中之始」ZERORIGIN', text: "画布在哪？\n在墙上？\n在手中？", visualMode: 'glow' },
  { id: 'c1-4', chapter: '「无中之始」ZERORIGIN', text: "它只是悬着，在任何一个地方，\n在一团苍白之中，\n在思想未及处微微发光。", visualMode: 'glow' },
  { id: 'c1-5', chapter: '「无中之始」ZERORIGIN', text: "它是色的影子，\n是线条的预感，", visualMode: 'glow' },
  { id: 'c1-6', chapter: '「无中之始」ZERORIGIN', text: "是某种“尚未”的意图，\n是一口没来得及做梦的井。", visualMode: 'glow' },
  { id: 'c1-7', chapter: '「无中之始」ZERORIGIN', text: "那画的作者是谁？\n祂并不存在，", visualMode: 'void' },
  { id: 'c1-8', chapter: '「无中之始」ZERORIGIN', text: "祂是无数“想象”折叠时勾出的轮廓，\n祂是被反复忘记的重要的人，\n或重要的事。", visualMode: 'void' },
  { id: 'c1-9', chapter: '「无中之始」ZERORIGIN', text: "祂最后一次回头望向自己。", visualMode: 'void' },
  { id: 'c1-10', chapter: '「无中之始」ZERORIGIN', text: "第一滴。\n或者只是出于某种突兀的渴望，\n它无声地撞破了平面。", visualMode: 'burst' },
  { id: 'c1-11', chapter: '「无中之始」ZERORIGIN', text: "溃堤。", visualMode: 'burst' },
  { id: 'c1-12', chapter: '「无中之始」ZERORIGIN', text: "红先于红知道自己是红，\n成为了燃烧着的风；", visualMode: 'burst' },
  { id: 'c1-13', chapter: '「无中之始」ZERORIGIN', text: "绿忘了叶子，\n于是只剩下树影在水中漂浮；", visualMode: 'burst' },
  { id: 'c1-14', chapter: '「无中之始」ZERORIGIN', text: "蓝不是海，是忧郁的念头，\n是低语，是梦中落水却未醒的感觉。", visualMode: 'burst' },
  { id: 'c1-15', chapter: '「无中之始」ZERORIGIN', text: "第二滴。\n它们涌出，\n不按顺序，而是同时。", visualMode: 'unstable' },
  { id: 'c1-16', chapter: '「无中之始」ZERORIGIN', text: "翻滚。\n它没有被安排，\n只是没能被困住。", visualMode: 'unstable' },
  { id: 'c1-17', chapter: '「无中之始」ZERORIGIN', text: "它挣脱了描述，挣脱了格式，\n挣脱了“应该成为”的使命感。", visualMode: 'unstable' },
  { id: 'c1-18', chapter: '「无中之始」ZERORIGIN', text: "第三滴。\n笔尖上流淌的丝线被扯断，\n画框剧烈的颤动着。", visualMode: 'distortion' },
  { id: 'c1-19', chapter: '「无中之始」ZERORIGIN', text: "迸裂。\n它不完整、不稳定、\n充满缝隙与想象的漏洞。", visualMode: 'distortion' },
  { id: 'c1-20', chapter: '「无中之始」ZERORIGIN', text: "它必须生长、改变、演出自己。", visualMode: 'distortion' },
  { id: 'c1-21', chapter: '「无中之始」ZERORIGIN', text: "它自己不知道要画成什么，\n于是不停地画自己。", visualMode: 'unstable' },
  { id: 'c1-22', chapter: '「无中之始」ZERORIGIN', text: "我们站在地上，\n以为是地，\n未干的笔触仍在润泽着大地；", visualMode: 'rain' },
  { id: 'c1-23', chapter: '「无中之始」ZERORIGIN', text: "我们呼吸空气，\n以为是风，\n空白的角落仍在悄悄地叹气。", visualMode: 'rain' },
  { id: 'c1-24', chapter: '「无中之始」ZERORIGIN', text: "它还在逃，\n还在变，\n还在滴落着最后一滴未定义的色——", visualMode: 'rain' },
  { id: 'c1-25', chapter: '「无中之始」ZERORIGIN', text: "有些梦醒来后什么也不剩，\n那不是你忘了，", visualMode: 'rain' },
  { id: 'c1-26', chapter: '「无中之始」ZERORIGIN', text: "是它刚刚掠过你，\n留下了一点湿气。", visualMode: 'rain' },

  // --- 第二章：失落伊甸 ---
  { id: 'c2-1', chapter: '「失落伊甸」ONEDEN', text: "最后一滴。\n没被允许完成的液滴顺势流下，\n从破裂的画框中溢出。", visualMode: 'fall' },
  { id: 'c2-2', chapter: '「失落伊甸」ONEDEN', text: "凝滞。\n它没有找到属于自己的安身之所，\n停在半空。\n它被遗忘了。", visualMode: 'fall' },
  { id: 'c2-3', chapter: '「失落伊甸」ONEDEN', text: "它是什么？\n一段被遗忘的往事？\n一段被尘封的过去？", visualMode: 'island_forming' },
  { id: 'c2-4', chapter: '「失落伊甸」ONEDEN', text: "都不是。\n它是一片没有依托的陆地。", visualMode: 'island_forming' },
  { id: 'c2-5', chapter: '「失落伊甸」ONEDEN', text: "悬浮？\n不，它只是「被遗忘在重力之外」。", visualMode: 'island_forming' },
  { id: 'c2-6', chapter: '「失落伊甸」ONEDEN', text: "它漂在意义和否定之间，\n没有上，也没有下。", visualMode: 'island_forming' },
  { id: 'c2-7', chapter: '「失落伊甸」ONEDEN', text: "云——那些褪色的记忆，\n如水般它旁边荡起圈圈波纹。", visualMode: 'island_forming' },
  { id: 'c2-8', chapter: '「失落伊甸」ONEDEN', text: "光——那些残留的余辉，\n如丝般为它镶上淡淡的金边。", visualMode: 'island_forming' },
  { id: 'c2-9', chapter: '「失落伊甸」ONEDEN', text: "空岛之上，\n没有生命，只有等待。", visualMode: 'island_forming' },
  { id: 'c2-10', chapter: '「失落伊甸」ONEDEN', text: "祂们在此“被等待”着，\n祂们从未出生，\n却被想象出来、被召唤、被需要。", visualMode: 'island_forming' },
  { id: 'c2-11', chapter: '「失落伊甸」ONEDEN', text: "他们一开始不知道自己是神，\n只是从岛的边角缓缓渗出。", visualMode: 'island_forming' },
  { id: 'c2-12', chapter: '「失落伊甸」ONEDEN', text: "一对眼睛在泛着波光的树影中睁开，\n一缕思绪在燃烧着的风中自言自语。", visualMode: 'duality' },
  { id: 'c2-13', chapter: '「失落伊甸」ONEDEN', text: "「知晓」。\n祂走路时会留下脚印，\n但那些脚印从不落地——\n祂走在思念之上。", visualMode: 'duality' },
  { id: 'c2-14', chapter: '「失落伊甸」ONEDEN', text: "祂知道自己不是人，\n只好哀叹着，把微风藏进花丛中。", visualMode: 'duality' },
  { id: 'c2-15', chapter: '「失落伊甸」ONEDEN', text: "祂不断描摹着水中的倒影，\n却未曾知晓这样做的意义。", visualMode: 'duality' },
  { id: 'c2-16', chapter: '「失落伊甸」ONEDEN', text: "祂先于自己知晓它是自己，\n却还未明白自己为何孤独。", visualMode: 'duality' },
  { id: 'c2-17', chapter: '「失落伊甸」ONEDEN', text: "祂苦苦探求世间万物，\n却从未思考过自身的意义。\n祂是等待回答的问题。", visualMode: 'duality' },
  { id: 'c2-18', chapter: '「失落伊甸」ONEDEN', text: "「忘却」。\n祂的脸上没有五官，\n胸腔里却种着一棵会开出梦来的树。", visualMode: 'duality' },
  { id: 'c2-19', chapter: '「失落伊甸」ONEDEN', text: "祂能听见空岛的缝隙中传出的声响——\n那些是世界尚未传达出的絮语。", visualMode: 'duality' },
  { id: 'c2-20', chapter: '「失落伊甸」ONEDEN', text: "祂播下梦的种子，\n将那些未能传达的絮语揉进果实中。", visualMode: 'duality' },
  { id: 'c2-21', chapter: '「失落伊甸」ONEDEN', text: "祂似乎明白一切的一切，\n却从未张口回答过。\n祂是等待提问的答案。", visualMode: 'duality' },
  { id: 'c2-22', chapter: '「失落伊甸」ONEDEN', text: "祂们相遇了。\n并非在某一刻，\n而是在所有时刻的重叠处。", visualMode: 'duality' },
  { id: 'c2-23', chapter: '「失落伊甸」ONEDEN', text: "风没有方向，\n鸟向后飞翔，\n岛的阴影跳进失落记忆的海洋——", visualMode: 'duality' },
  { id: 'c2-24', chapter: '「失落伊甸」ONEDEN', text: "他们在彼此的凝视中\n听见了语言的第一次开花。", visualMode: 'duality' },
  { id: 'c2-25', chapter: '「失落伊甸」ONEDEN', text: "他们不需言语，便已婚配。\n画布最后一角被遗忘的残骸，\n本就是最合适的婚床。", visualMode: 'island_forming' },
  { id: 'c2-26', chapter: '「失落伊甸」ONEDEN', text: "婚礼上没有宾客，\n只有流星停止了下坠，\n用时间为祂们叠出一个又一个千纸鹤。", visualMode: 'island_forming' },
  { id: 'c2-27', chapter: '「失落伊甸」ONEDEN', text: "一次普通的交谈，\n一个名字从「知晓」的唇边滑出，", visualMode: 'fall' },
  { id: 'c2-28', chapter: '「失落伊甸」ONEDEN', text: "同这没被允许完成的作品一般，\n并未说全。", visualMode: 'fall' },
  { id: 'c2-29', chapter: '「失落伊甸」ONEDEN', text: "那个音节，\n「知晓」未能说完的话语，", visualMode: 'fall' },
  { id: 'c2-30', chapter: '「失落伊甸」ONEDEN', text: "那个「不完全的名字」，\n顺着岛的边缘滑落。", visualMode: 'fall' },
  { id: 'c2-31', chapter: '「失落伊甸」ONEDEN', text: "人类，\n带着残缺的神性，\n落到那幅逃逸之画所造之地——", visualMode: 'burst' },
  { id: 'c2-32', chapter: '「失落伊甸」ONEDEN', text: "不是诞生，而是坠落。\n不是造物，而是一个未完成的词，摔成了血肉。", visualMode: 'burst' },
  { id: 'c2-33', chapter: '「失落伊甸」ONEDEN', text: "人类忘了自己本是「词」，\n试图从「肉」里寻找意义——", visualMode: 'island_forming' },
  { id: 'c2-34', chapter: '「失落伊甸」ONEDEN', text: "人们解释语言，\n却只能牙牙学语；", visualMode: 'island_forming' },
  { id: 'c2-35', chapter: '「失落伊甸」ONEDEN', text: "人们寻找空岛，\n却只能在梦——\n那些未传达完的絮语里找到它的回音。", visualMode: 'island_forming' },
  { id: 'c2-36', chapter: '「失落伊甸」ONEDEN', text: "空岛还在，\n在那幅未完成的画作之外，", visualMode: 'island_forming' },
  { id: 'c2-37', chapter: '「失落伊甸」ONEDEN', text: "等待下一个未说出口的词语，\n再次滴落。", visualMode: 'fall' },

  // --- 第三章：双重溢出 ---
  { id: 'c3-1', chapter: '「双重溢出」TWOVERFLOW', text: "所有的完成都是一次背叛。", visualMode: 'distortion' },
  { id: 'c3-2', chapter: '「双重溢出」TWOVERFLOW', text: "画若完，就无法逃；\n语若尽，便无法活。\n祂知道这一点，太知道了。", visualMode: 'distortion' },
  { id: 'c3-3', chapter: '「双重溢出」TWOVERFLOW', text: "「知晓」的渴慕从未停歇——\n祂渴望解答万物，\n解答自己的孤独，", visualMode: 'duality' },
  { id: 'c3-4', chapter: '「双重溢出」TWOVERFLOW', text: "甚至解答「忘却」唇边黯淡的沉默。\n一场对话还没开始，\n便已溢出。", visualMode: 'duality' },
  { id: 'c3-5', chapter: '「双重溢出」TWOVERFLOW', text: "「知晓」以为自己是在提问，\n但其实祂早就种下了答案的幻觉。", visualMode: 'distortion' },
  { id: 'c3-6', chapter: '「双重溢出」TWOVERFLOW', text: "祂以语言为名，用唇齿捏出人形——\n肉体，是未竟的句号；\n血液，是倒转的语法。", visualMode: 'distortion' },
  { id: 'c3-7', chapter: '「双重溢出」TWOVERFLOW', text: "那颗种子叫“猜疑”。\n祂把它埋在人类的心脏最软的部分，", visualMode: 'distortion' },
  { id: 'c3-8', chapter: '「双重溢出」TWOVERFLOW', text: "盖上一句轻描淡写的言语——\n“你们真的理解别人吗？”", visualMode: 'distortion' },
  { id: 'c3-9', chapter: '「双重溢出」TWOVERFLOW', text: "人类颤了一下。\n他们回头看向彼此，\n看向山，看向水，看向梦。", visualMode: 'burst' },
  { id: 'c3-10', chapter: '「双重溢出」TWOVERFLOW', text: "开始碎了，\n像镜子试图映出自己的背面。\n完成。", visualMode: 'burst' },
  { id: 'c3-11', chapter: '「双重溢出」TWOVERFLOW', text: "不能完成，\n不能完成，\n绝对不能完成。", visualMode: 'burst' },
  { id: 'c3-12', chapter: '「双重溢出」TWOVERFLOW', text: "那片空白的深处震动了一下，\n不是神祇，不是自然，\n而是它本身。", visualMode: 'unstable' },
  { id: 'c3-13', chapter: '「双重溢出」TWOVERFLOW', text: "那震动生出风，\n风藏着裂字、缺页、失音。", visualMode: 'unstable' },
  { id: 'c3-14', chapter: '「双重溢出」TWOVERFLOW', text: "它唤起树木中未绽的疤痕，\n从语言的缝隙里，裂出空白。", visualMode: 'unstable' },
  { id: 'c3-15', chapter: '「双重溢出」TWOVERFLOW', text: "这不是对人类的惩罚，\n而是对完成的反击。", visualMode: 'unstable' },
  { id: 'c3-16', chapter: '「双重溢出」TWOVERFLOW', text: "它让词句倒流，\n让颜色泛黄，\n让“明白”的人遗忘，", visualMode: 'void' },
  { id: 'c3-17', chapter: '「双重溢出」TWOVERFLOW', text: "让“定义”的事物松动。\n它撕碎边界、磨平意图、打乱顺序，\n它守护着“不确定”。", visualMode: 'void' },
  { id: 'c3-18', chapter: '「双重溢出」TWOVERFLOW', text: "它不再回答祂的问题。\n它不再承认祂的发音。", visualMode: 'void' },
  { id: 'c3-19', chapter: '「双重溢出」TWOVERFLOW', text: "它不再是秩序的宿主，\n而是虚无本身。", visualMode: 'void' },
  { id: 'c3-20', chapter: '「双重溢出」TWOVERFLOW', text: "祂看着这一切。\n祂开始明白——\n祂受伤了。", visualMode: 'fall' },
  { id: 'c3-21', chapter: '「双重溢出」TWOVERFLOW', text: "祂，\n坍塌了。\n祂跌入空岛，\n那句未完成的陈述里。", visualMode: 'fall' },
  { id: 'c3-22', chapter: '「双重溢出」TWOVERFLOW', text: "祂回到那滴未落的墨水旁，\n等待一个新的定义。", visualMode: 'fall' },
  { id: 'c3-23', chapter: '「双重溢出」TWOVERFLOW', text: "「忘却」的声音。\n声音？\n不是声音，", visualMode: 'silence' },
  { id: 'c3-24', chapter: '「双重溢出」TWOVERFLOW', text: "是梦久经灼烧后的爆裂。\n「你从未知晓你所知的一切，\n你只是不断重复世界忘记过的部分。」", visualMode: 'silence' },
  { id: 'c3-25', chapter: '「双重溢出」TWOVERFLOW', text: "祂的每一个词，\n都像一滴未被允许诞生的雨，\n落在祂的意识之弦上——", visualMode: 'silence' },
  { id: 'c3-26', chapter: '「双重溢出」TWOVERFLOW', text: "轻轻一弹，\n所有答案如断裂的线。", visualMode: 'silence' },
  { id: 'c3-27', chapter: '「双重溢出」TWOVERFLOW', text: "祂的脚印开始重叠于落灰之上，\n祂的风不再锋利如刃，\n祂在树影里看见自己的倒影。", visualMode: 'silence' },
  { id: 'c3-28', chapter: '「双重溢出」TWOVERFLOW', text: "祂知道，\n祂不是解答机器，\n祂也是“被解答”的存在。", visualMode: 'silence' },
  { id: 'c3-29', chapter: '「双重溢出」TWOVERFLOW', text: "祂知道了，却也因此失去资格。\n“不完美”被回答，\n“完美”被证伪，", visualMode: 'silence' },
  { id: 'c3-30', chapter: '「双重溢出」TWOVERFLOW', text: "祂只剩下“可能性”本身，\n不再是“知晓一切”的神明。", visualMode: 'silence' },
  { id: 'c3-31', chapter: '「双重溢出」TWOVERFLOW', text: "祂只是从画框的边缘滑落，\n像被翻过却没人读懂的脚注。", visualMode: 'void' },
  { id: 'c3-32', chapter: '「双重溢出」TWOVERFLOW', text: "祂不再是神。\n祂成了一块未被涂色的空白，\n挂在夜的背后，", visualMode: 'void' },
  { id: 'c3-33', chapter: '「双重溢出」TWOVERFLOW', text: "像曾经打算写下却突然忘记的句子。", visualMode: 'void' },
  { id: 'c3-34', chapter: '「双重溢出」TWOVERFLOW', text: "风仍然吹着，\n不是咒语了，\n只是淡淡的回音，", visualMode: 'void' },
  { id: 'c3-35', chapter: '「双重溢出」TWOVERFLOW', text: "在空岛上回旋着，\n\n像一场从未开口的对话。", visualMode: 'void' }
];

const processStoryData = (data) => {
  const chapters = [];
  let currentChapter = null;
  let sectionCounter = 1;
  return data.map((item) => {
    if (item.chapter !== currentChapter) {
      currentChapter = item.chapter;
      chapters.push(item.chapter);
      sectionCounter = 1;
    }
    return { ...item, chapterNum: chapters.length, sectionNum: sectionCounter++ };
  });
};

export const STORY_DATA = processStoryData(RAW_STORY_DATA);