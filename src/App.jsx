import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// --- 完整剧情数据 (细致拆分版) ---
const RAW_STORY_DATA = [
  // --- 第一章：无中之始 ---
  {
    id: 'c1-1',
    chapter: '「无中之始」ZERORIGIN',
    text: "诞生？\n不，不对。\n是溢出。",
    visualMode: 'void', 
    color: '#ffffff'
  },
  {
    id: 'c1-2',
    chapter: '「无中之始」ZERORIGIN',
    text: "某种没被允许完成的东西自己找到了裂缝——",
    visualMode: 'void', 
    color: '#ffffff'
  },
  {
    id: 'c1-3',
    chapter: '「无中之始」ZERORIGIN',
    text: "画布在哪？\n在墙上？\n在手中？",
    visualMode: 'glow', 
    color: '#e0e0e0'
  },
  {
    id: 'c1-4',
    chapter: '「无中之始」ZERORIGIN',
    text: "它只是悬着，在任何一个地方，\n在一团苍白之中，\n在思想未及处微微发光。",
    visualMode: 'glow', 
    color: '#e0e0e0'
  },
  {
    id: 'c1-5',
    chapter: '「无中之始」ZERORIGIN',
    text: "它是色的影子，\n是线条的预感，",
    visualMode: 'glow', 
    color: '#e0e0e0'
  },
  {
    id: 'c1-6',
    chapter: '「无中之始」ZERORIGIN',
    text: "是某种“尚未”的意图，\n是一口没来得及做梦的井。",
    visualMode: 'glow', 
    color: '#e0e0e0'
  },
  {
    id: 'c1-7',
    chapter: '「无中之始」ZERORIGIN',
    text: "那画的作者是谁？\n祂并不存在，",
    visualMode: 'void', 
    color: '#ffffff'
  },
  {
    id: 'c1-8',
    chapter: '「无中之始」ZERORIGIN',
    text: "祂是无数“想象”折叠时勾出的轮廓，\n祂是被反复忘记的重要的人，\n或重要的事。",
    visualMode: 'void', 
    color: '#ffffff'
  },
  {
    id: 'c1-9',
    chapter: '「无中之始」ZERORIGIN',
    text: "祂最后一次回头望向自己。",
    visualMode: 'void', 
    color: '#ffffff'
  },
  {
    id: 'c1-10',
    chapter: '「无中之始」ZERORIGIN',
    text: "第一滴。\n或者只是出于某种突兀的渴望，\n它无声地撞破了平面。",
    visualMode: 'burst', 
    color: '#ff4d4d'
  },
  {
    id: 'c1-11',
    chapter: '「无中之始」ZERORIGIN',
    text: "溃堤。",
    visualMode: 'burst', 
    color: '#ff4d4d'
  },
  {
    id: 'c1-12',
    chapter: '「无中之始」ZERORIGIN',
    text: "红先于红知道自己是红，\n成为了燃烧着的风；",
    visualMode: 'burst', 
    color: '#ff4d4d'
  },
  {
    id: 'c1-13',
    chapter: '「无中之始」ZERORIGIN',
    text: "绿忘了叶子，\n于是只剩下树影在水中漂浮；",
    visualMode: 'burst', 
    color: '#4dff4d'
  },
  {
    id: 'c1-14',
    chapter: '「无中之始」ZERORIGIN',
    text: "蓝不是海，是忧郁的念头，\n是低语，是梦中落水却未醒的感觉。",
    visualMode: 'burst', 
    color: '#4d79ff'
  },
  {
    id: 'c1-15',
    chapter: '「无中之始」ZERORIGIN',
    text: "第二滴。\n它们涌出，\n不按顺序，而是同时。",
    visualMode: 'unstable', 
    color: '#4d79ff'
  },
  {
    id: 'c1-16',
    chapter: '「无中之始」ZERORIGIN',
    text: "翻滚。\n它没有被安排，\n只是没能被困住。",
    visualMode: 'unstable', 
    color: '#4d79ff'
  },
  {
    id: 'c1-17',
    chapter: '「无中之始」ZERORIGIN',
    text: "它挣脱了描述，挣脱了格式，\n挣脱了“应该成为”的使命感。",
    visualMode: 'unstable', 
    color: '#4d79ff'
  },
  {
    id: 'c1-18',
    chapter: '「无中之始」ZERORIGIN',
    text: "第三滴。\n笔尖上流淌的丝线被扯断，\n画框剧烈的颤动着。",
    visualMode: 'distortion', 
    color: '#ef4444'
  },
  {
    id: 'c1-19',
    chapter: '「无中之始」ZERORIGIN',
    text: "迸裂。\n它不完整、不稳定、\n充满缝隙与想象的漏洞。",
    visualMode: 'distortion', 
    color: '#ef4444'
  },
  {
    id: 'c1-20',
    chapter: '「无中之始」ZERORIGIN',
    text: "它必须生长、改变、演出自己。",
    visualMode: 'distortion', 
    color: '#ef4444'
  },
  {
    id: 'c1-21',
    chapter: '「无中之始」ZERORIGIN',
    text: "它自己不知道要画成什么，\n于是不停地画自己。",
    visualMode: 'unstable', 
    color: '#4d79ff'
  },
  {
    id: 'c1-22',
    chapter: '「无中之始」ZERORIGIN',
    text: "我们站在地上，\n以为是地，\n未干的笔触仍在润泽着大地；",
    visualMode: 'rain', 
    color: '#a0a0a0'
  },
  {
    id: 'c1-23',
    chapter: '「无中之始」ZERORIGIN',
    text: "我们呼吸空气，\n以为是风，\n空白的角落仍在悄悄地叹气。",
    visualMode: 'rain', 
    color: '#a0a0a0'
  },
  {
    id: 'c1-24',
    chapter: '「无中之始」ZERORIGIN',
    text: "它还在逃，\n还在变，\n还在滴落着最后一滴未定义的色——",
    visualMode: 'rain', 
    color: '#a0a0a0'
  },
  {
    id: 'c1-25',
    chapter: '「无中之始」ZERORIGIN',
    text: "有些梦醒来后什么也不剩，\n那不是你忘了，",
    visualMode: 'rain', 
    color: '#a0a0a0'
  },
  {
    id: 'c1-26',
    chapter: '「无中之始」ZERORIGIN',
    text: "是它刚刚掠过你，\n留下了一点湿气。",
    visualMode: 'rain', 
    color: '#a0a0a0'
  },

  // --- 第二章：失落伊甸 ---
  {
    id: 'c2-1',
    chapter: '「失落伊甸」ONEDEN',
    text: "最后一滴。\n没被允许完成的液滴顺势流下，\n从破裂的画框中溢出。",
    visualMode: 'fall', 
    color: '#ffffff'
  },
  {
    id: 'c2-2',
    chapter: '「失落伊甸」ONEDEN',
    text: "凝滞。\n它没有找到属于自己的安身之所，\n停在半空。\n它被遗忘了。",
    visualMode: 'fall', 
    color: '#ffffff'
  },
  {
    id: 'c2-3',
    chapter: '「失落伊甸」ONEDEN',
    text: "它是什么？\n一段被遗忘的往事？\n一段被尘封的过去？",
    visualMode: 'island_forming', 
    color: '#ffd700'
  },
  {
    id: 'c2-4',
    chapter: '「失落伊甸」ONEDEN',
    text: "都不是。\n它是一片没有依托的陆地。",
    visualMode: 'island_forming', 
    color: '#ffd700'
  },
  {
    id: 'c2-5',
    chapter: '「失落伊甸」ONEDEN',
    text: "悬浮？\n不，它只是「被遗忘在重力之外」。",
    visualMode: 'island_forming', 
    color: '#ffd700'
  },
  {
    id: 'c2-6',
    chapter: '「失落伊甸」ONEDEN',
    text: "它漂在意义和否定之间，\n没有上，也没有下。",
    visualMode: 'island_forming', 
    color: '#ffd700'
  },
  {
    id: 'c2-7',
    chapter: '「失落伊甸」ONEDEN',
    text: "云——那些褪色的记忆，\n如水般它旁边荡起圈圈波纹。",
    visualMode: 'island_forming', 
    color: '#ffd700'
  },
  {
    id: 'c2-8',
    chapter: '「失落伊甸」ONEDEN',
    text: "光——那些残留的余辉，\n如丝般为它镶上淡淡的金边。",
    visualMode: 'island_forming', 
    color: '#ffd700'
  },
  {
    id: 'c2-9',
    chapter: '「失落伊甸」ONEDEN',
    text: "空岛之上，\n没有生命，只有等待。",
    visualMode: 'island_forming', 
    color: '#ffd700'
  },
  {
    id: 'c2-10',
    chapter: '「失落伊甸」ONEDEN',
    text: "祂们在此“被等待”着，\n祂们从未出生，\n却被想象出来、被召唤、被需要。",
    visualMode: 'island_forming', 
    color: '#ffd700'
  },
  {
    id: 'c2-11',
    chapter: '「失落伊甸」ONEDEN',
    text: "他们一开始不知道自己是神，\n只是从岛的边角缓缓渗出。",
    visualMode: 'island_forming', 
    color: '#ffd700'
  },
  {
    id: 'c2-12',
    chapter: '「失落伊甸」ONEDEN',
    text: "一对眼睛在泛着波光的树影中睁开，\n一缕思绪在燃烧着的风中自言自语。",
    visualMode: 'duality', 
    color: '#a855f7'
  },
  {
    id: 'c2-13',
    chapter: '「失落伊甸」ONEDEN',
    text: "「知晓」。\n祂走路时会留下脚印，\n但那些脚印从不落地——\n祂走在思念之上。",
    visualMode: 'duality', 
    color: '#a855f7'
  },
  {
    id: 'c2-14',
    chapter: '「失落伊甸」ONEDEN',
    text: "祂知道自己不是人，\n只好哀叹着，把微风藏进花丛中。",
    visualMode: 'duality', 
    color: '#a855f7'
  },
  {
    id: 'c2-15',
    chapter: '「失落伊甸」ONEDEN',
    text: "祂不断描摹着水中的倒影，\n却未曾知晓这样做的意义。",
    visualMode: 'duality', 
    color: '#a855f7'
  },
  {
    id: 'c2-16',
    chapter: '「失落伊甸」ONEDEN',
    text: "祂先于自己知晓它是自己，\n却还未明白自己为何孤独。",
    visualMode: 'duality', 
    color: '#a855f7'
  },
  {
    id: 'c2-17',
    chapter: '「失落伊甸」ONEDEN',
    text: "祂苦苦探求世间万物，\n却从未思考过自身的意义。\n祂是等待回答的问题。",
    visualMode: 'duality', 
    color: '#a855f7'
  },
  {
    id: 'c2-18',
    chapter: '「失落伊甸」ONEDEN',
    text: "「忘却」。\n祂的脸上没有五官，\n胸腔里却种着一棵会开出梦来的树。",
    visualMode: 'duality', 
    color: '#d8b4fe'
  },
  {
    id: 'c2-19',
    chapter: '「失落伊甸」ONEDEN',
    text: "祂能听见空岛的缝隙中传出的声响——\n那些是世界尚未传达出的絮语。",
    visualMode: 'duality', 
    color: '#d8b4fe'
  },
  {
    id: 'c2-20',
    chapter: '「失落伊甸」ONEDEN',
    text: "祂播下梦的种子，\n将那些未能传达的絮语揉进果实中。",
    visualMode: 'duality', 
    color: '#d8b4fe'
  },
  {
    id: 'c2-21',
    chapter: '「失落伊甸」ONEDEN',
    text: "祂似乎明白一切的一切，\n却从未张口回答过。\n祂是等待提问的答案。",
    visualMode: 'duality', 
    color: '#d8b4fe'
  },
  {
    id: 'c2-22',
    chapter: '「失落伊甸」ONEDEN',
    text: "祂们相遇了。\n并非在某一刻，\n而是在所有时刻的重叠处。",
    visualMode: 'duality', 
    color: '#a855f7'
  },
  {
    id: 'c2-23',
    chapter: '「失落伊甸」ONEDEN',
    text: "风没有方向，\n鸟向后飞翔，\n岛的阴影跳进失落记忆的海洋——",
    visualMode: 'duality', 
    color: '#a855f7'
  },
  {
    id: 'c2-24',
    chapter: '「失落伊甸」ONEDEN',
    text: "他们在彼此的凝视中\n听见了语言的第一次开花。",
    visualMode: 'duality', 
    color: '#a855f7'
  },
  {
    id: 'c2-25',
    chapter: '「失落伊甸」ONEDEN',
    text: "他们不需言语，便已婚配。\n画布最后一角被遗忘的残骸，\n本就是最合适的婚床。",
    visualMode: 'island_forming', 
    color: '#ffd700'
  },
  {
    id: 'c2-26',
    chapter: '「失落伊甸」ONEDEN',
    text: "婚礼上没有宾客，\n只有流星停止了下坠，\n用时间为祂们叠出一个又一个千纸鹤。",
    visualMode: 'island_forming', 
    color: '#ffd700'
  },
  {
    id: 'c2-27',
    chapter: '「失落伊甸」ONEDEN',
    text: "一次普通的交谈，\n一个名字从「知晓」的唇边滑出，",
    visualMode: 'fall', 
    color: '#ffffff'
  },
  {
    id: 'c2-28',
    chapter: '「失落伊甸」ONEDEN',
    text: "同这没被允许完成的作品一般，\n并未说全。",
    visualMode: 'fall', 
    color: '#ffffff'
  },
  {
    id: 'c2-29',
    chapter: '「失落伊甸」ONEDEN',
    text: "那个音节，\n「知晓」未能说完的话语，",
    visualMode: 'fall', 
    color: '#ffffff'
  },
  {
    id: 'c2-30',
    chapter: '「失落伊甸」ONEDEN',
    text: "那个「不完全的名字」，\n顺着岛的边缘滑落。",
    visualMode: 'fall', 
    color: '#ffffff'
  },
  {
    id: 'c2-31',
    chapter: '「失落伊甸」ONEDEN',
    text: "人类，\n带着残缺的神性，\n落到那幅逃逸之画所造之地——",
    visualMode: 'burst', 
    color: '#ef4444'
  },
  {
    id: 'c2-32',
    chapter: '「失落伊甸」ONEDEN',
    text: "不是诞生，而是坠落。\n不是造物，而是一个未完成的词，摔成了血肉。",
    visualMode: 'burst', 
    color: '#ef4444'
  },
  {
    id: 'c2-33',
    chapter: '「失落伊甸」ONEDEN',
    text: "人类忘了自己本是「词」，\n试图从「肉」里寻找意义——",
    visualMode: 'island_forming', 
    color: '#ffd700'
  },
  {
    id: 'c2-34',
    chapter: '「失落伊甸」ONEDEN',
    text: "人们解释语言，\n却只能牙牙学语；",
    visualMode: 'island_forming', 
    color: '#ffd700'
  },
  {
    id: 'c2-35',
    chapter: '「失落伊甸」ONEDEN',
    text: "人们寻找空岛，\n却只能在梦——\n那些未传达完的絮语里找到它的回音。",
    visualMode: 'island_forming', 
    color: '#ffd700'
  },
  {
    id: 'c2-36',
    chapter: '「失落伊甸」ONEDEN',
    text: "空岛还在，\n在那幅未完成的画作之外，",
    visualMode: 'island_forming', 
    color: '#ffd700'
  },
  {
    id: 'c2-37',
    chapter: '「失落伊甸」ONEDEN',
    text: "等待下一个未说出口的词语，\n再次滴落。",
    visualMode: 'fall', 
    color: '#ffffff'
  },

  // --- 第三章：双重溢出 ---
  {
    id: 'c3-1',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "所有的完成都是一次背叛。",
    visualMode: 'distortion', 
    color: '#ef4444'
  },
  {
    id: 'c3-2',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "画若完，就无法逃；\n语若尽，便无法活。\n祂知道这一点，太知道了。",
    visualMode: 'distortion', 
    color: '#ef4444'
  },
  {
    id: 'c3-3',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "「知晓」的渴慕从未停歇——\n祂渴望解答万物，\n解答自己的孤独，",
    visualMode: 'duality', 
    color: '#a855f7'
  },
  {
    id: 'c3-4',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "甚至解答「忘却」唇边黯淡的沉默。\n一场对话还没开始，\n便已溢出。",
    visualMode: 'duality', 
    color: '#a855f7'
  },
  {
    id: 'c3-5',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "「知晓」以为自己是在提问，\n但其实祂早就种下了答案的幻觉。",
    visualMode: 'distortion', 
    color: '#ff0000'
  },
  {
    id: 'c3-6',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "祂以语言为名，用唇齿捏出人形——\n肉体，是未竟的句号；\n血液，是倒转的语法。",
    visualMode: 'distortion', 
    color: '#ff0000'
  },
  {
    id: 'c3-7',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "那颗种子叫“猜疑”。\n祂把它埋在人类的心脏最软的部分，",
    visualMode: 'distortion', 
    color: '#ff0000'
  },
  {
    id: 'c3-8',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "盖上一句轻描淡写的言语——\n“你们真的理解别人吗？”",
    visualMode: 'distortion', 
    color: '#ff0000'
  },
  {
    id: 'c3-9',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "人类颤了一下。\n他们回头看向彼此，\n看向山，看向水，看向梦。",
    visualMode: 'burst', 
    color: '#ef4444'
  },
  {
    id: 'c3-10',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "开始碎了，\n像镜子试图映出自己的背面。\n完成。",
    visualMode: 'burst', 
    color: '#ef4444'
  },
  {
    id: 'c3-11',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "不能完成，\n不能完成，\n绝对不能完成。",
    visualMode: 'burst', 
    color: '#ef4444'
  },
  {
    id: 'c3-12',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "那片空白的深处震动了一下，\n不是神祇，不是自然，\n而是它本身。",
    visualMode: 'unstable', 
    color: '#ffffff'
  },
  {
    id: 'c3-13',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "那震动生出风，\n风藏着裂字、缺页、失音。",
    visualMode: 'unstable', 
    color: '#ffffff'
  },
  {
    id: 'c3-14',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "它唤起树木中未绽的疤痕，\n从语言的缝隙里，裂出空白。",
    visualMode: 'unstable', 
    color: '#ffffff'
  },
  {
    id: 'c3-15',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "这不是对人类的惩罚，\n而是对完成的反击。",
    visualMode: 'unstable', 
    color: '#ffffff'
  },
  {
    id: 'c3-16',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "它让词句倒流，\n让颜色泛黄，\n让“明白”的人遗忘，",
    visualMode: 'void', 
    color: '#000000'
  },
  {
    id: 'c3-17',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "让“定义”的事物松动。\n它撕碎边界、磨平意图、打乱顺序，\n它守护着“不确定”。",
    visualMode: 'void', 
    color: '#000000'
  },
  {
    id: 'c3-18',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "它不再回答祂的问题。\n它不再承认祂的发音。",
    visualMode: 'void', 
    color: '#000000'
  },
  {
    id: 'c3-19',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "它不再是秩序的宿主，\n而是虚无本身。",
    visualMode: 'void', 
    color: '#000000'
  },
  {
    id: 'c3-20',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "祂看着这一切。\n祂开始明白——\n祂受伤了。",
    visualMode: 'fall', 
    color: '#ffffff'
  },
  {
    id: 'c3-21',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "祂，\n坍塌了。\n祂跌入空岛，\n那句未完成的陈述里。",
    visualMode: 'fall', 
    color: '#ffffff'
  },
  {
    id: 'c3-22',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "祂回到那滴未落的墨水旁，\n等待一个新的定义。",
    visualMode: 'fall', 
    color: '#ffffff'
  },
  {
    id: 'c3-23',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "「忘却」的声音。\n声音？\n不是声音，",
    visualMode: 'silence', 
    color: '#000000'
  },
  {
    id: 'c3-24',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "是梦久经灼烧后的爆裂。\n「你从未知晓你所知的一切，\n你只是不断重复世界忘记过的部分。」",
    visualMode: 'silence', 
    color: '#000000'
  },
  {
    id: 'c3-25',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "祂的每一个词，\n都像一滴未被允许诞生的雨，\n落在祂的意识之弦上——",
    visualMode: 'silence', 
    color: '#000000'
  },
  {
    id: 'c3-26',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "轻轻一弹，\n所有答案如断裂的线。",
    visualMode: 'silence', 
    color: '#000000'
  },
  {
    id: 'c3-27',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "祂的脚印开始重叠于落灰之上，\n祂的风不再锋利如刃，\n祂在树影里看见自己的倒影。",
    visualMode: 'silence', 
    color: '#1a1a1a'
  },
  {
    id: 'c3-28',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "祂知道，\n祂不是解答机器，\n祂也是“被解答”的存在。",
    visualMode: 'silence', 
    color: '#1a1a1a'
  },
  {
    id: 'c3-29',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "祂知道了，却也因此失去资格。\n“不完美”被回答，\n“完美”被证伪，",
    visualMode: 'silence', 
    color: '#1a1a1a'
  },
  {
    id: 'c3-30',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "祂只剩下“可能性”本身，\n不再是“知晓一切”的神明。",
    visualMode: 'silence', 
    color: '#1a1a1a'
  },
  {
    id: 'c3-31',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "祂只是从画框的边缘滑落，\n像被翻过却没人读懂的脚注。",
    visualMode: 'void', 
    color: '#000000'
  },
  {
    id: 'c3-32',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "祂不再是神。\n祂成了一块未被涂色的空白，\n挂在夜的背后，",
    visualMode: 'void', 
    color: '#000000'
  },
  {
    id: 'c3-33',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "像曾经打算写下却突然忘记的句子。",
    visualMode: 'void', 
    color: '#000000'
  },
  {
    id: 'c3-34',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "风仍然吹着，\n不是咒语了，\n只是淡淡的回音，",
    visualMode: 'void', 
    color: '#000000'
  },
  {
    id: 'c3-35',
    chapter: '「双重溢出」TWOVERFLOW',
    text: "在空岛上回旋着，\n\n像一场从未开口的对话。",
    visualMode: 'void', 
    color: '#000000'
  }
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
    const chapterNum = chapters.length;
    const sectionNum = sectionCounter++;
    return { ...item, chapterNum, sectionNum };
  });
};

const STORY_DATA = processStoryData(RAW_STORY_DATA);

const distortionVertexShader = `
  uniform float time;
  uniform float distortStrength;
  varying vec2 vUv;
  varying vec3 vNormal;
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    vNormal = normal;
    vec3 pos = position;
    float noise = snoise(pos * 1.5 + time * 0.5);
    pos += normal * noise * distortStrength;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const distortionFragmentShader = `
  uniform vec3 color;
  varying vec3 vNormal;
  void main() {
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    float diff = max(dot(vNormal, lightDir), 0.0);
    vec3 ambient = color * 0.4;
    vec3 diffuse = color * diff * 0.8;
    gl_FragColor = vec4(ambient + diffuse, 1.0);
  }
`;

export default function MythosNovel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mountRef = useRef(null);
  const modeRef = useRef(STORY_DATA[0].visualMode);

  useEffect(() => {
    modeRef.current = STORY_DATA[currentIndex].visualMode;
  }, [currentIndex]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#f0f0f0");
    scene.fog = new THREE.FogExp2("#f0f0f0", 0.05);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4444ff, 0.5);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    const coreGeometry = new THREE.IcosahedronGeometry(1, 4);
    const coreMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        distortStrength: { value: 0 },
        color: { value: new THREE.Color("#ffffff") }
      },
      vertexShader: distortionVertexShader,
      fragmentShader: distortionFragmentShader,
      wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    const particleCount = 200;
    const particleGeo = new THREE.DodecahedronGeometry(0.08, 0);
    const particleMat = new THREE.MeshPhongMaterial({ color: "#333333" });
    const particles = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);
    
    const particleData = [];
    const dummy = new THREE.Object3D();

    for (let i = 0; i < particleCount; i++) {
       particleData.push({
         t: Math.random() * 100,
         factor: 20 + Math.random() * 100,
         speed: 0.005 + Math.random() * 0.01,
         xFactor: -50 + Math.random() * 100,
         yFactor: -50 + Math.random() * 100,
         zFactor: -50 + Math.random() * 100,
         my: 0 
       });
       dummy.position.set(0,0,0);
       dummy.updateMatrix();
       particles.setMatrixAt(i, dummy.matrix);
    }
    scene.add(particles);

    const starGeo = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPos = new Float32Array(starCount * 3);
    for(let i=0; i<starCount*3; i++) {
      starPos[i] = (Math.random() - 0.5) * 100;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.1, color: 0xffffff, transparent: true, opacity: 0 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const mode = modeRef.current;

      let targetColor = new THREE.Color("#000000");
      let targetFogDensity = 0.02;
      let targetParticleColor = new THREE.Color("#ffffff");

      if (mode === 'void') {
        targetColor.set("#f0f0f0");
        targetFogDensity = 0.05;
        targetParticleColor.set("#333333");
      } else if (mode === 'glow') {
        targetColor.set("#1a1a1a");
        targetParticleColor.set("#e0e0e0");
      } else if (mode === 'burst') {
        targetColor.set("#1a0505");
        targetParticleColor.set("#ff4d4d");
      } else if (mode === 'unstable') {
        targetColor.set("#0a0a20");
        targetParticleColor.set("#4d79ff");
      } else if (mode === 'island_forming') {
        targetColor.set("#0c0a20");
        targetParticleColor.set("#ffd700");
      } else if (mode === 'duality') {
        targetColor.set("#1a0520");
        targetParticleColor.set("#a855f7");
      } else if (mode === 'silence') {
        targetColor.set("#000000");
        targetFogDensity = 0.1;
        targetParticleColor.set("#333333");
      } else if (mode === 'distortion') {
         targetColor.set("#050000");
         targetParticleColor.set("#ef4444");
      } else if (mode === 'rain' || mode === 'fall') {
         targetColor.set("#080808");
         targetParticleColor.set("#a0a0a0");
      }

      scene.background.lerp(targetColor, 0.02);
      scene.fog.color.lerp(targetColor, 0.02);
      scene.fog.density += (targetFogDensity - scene.fog.density) * 0.01;
      
      const starTargetOpacity = (mode === 'void') ? 0 : 0.5;
      stars.material.opacity += (starTargetOpacity - stars.material.opacity) * 0.02;

      const currentPColor = particles.material.color;
      currentPColor.lerp(targetParticleColor, 0.05);

      coreMesh.rotation.x = time * 0.2;
      coreMesh.rotation.y = time * 0.3;
      
      coreMaterial.uniforms.time.value = time;
      
      let targetDistort = 0;
      let targetCoreColor = new THREE.Color("#ffffff");
      let targetScale = 1;
      let targetWireframe = false;

      if (mode === 'void') {
        targetScale = 0.8; 
        targetCoreColor.set("#cccccc");
      } else if (mode === 'burst') {
        targetDistort = 0.8;
        targetCoreColor.set("#ff4d4d");
        targetScale = 1.2;
      } else if (mode === 'unstable') {
        targetDistort = 1.2;
        targetCoreColor.set("#4d79ff");
        targetScale = 1.1;
      } else if (mode === 'island_forming') {
        targetDistort = 0.1;
        targetWireframe = true;
        targetCoreColor.set("#ffd700");
        targetScale = 1.5;
      } else if (mode === 'duality') {
        targetDistort = 0.4;
        targetCoreColor.set("#d8b4fe");
        targetScale = 1.2;
      } else if (mode === 'distortion') {
        targetDistort = 2.0;
        targetCoreColor.set("#ef4444");
        targetScale = 1.3;
      } else if (mode === 'silence') {
        targetScale = 0.01;
      }

      coreMaterial.uniforms.distortStrength.value += (targetDistort - coreMaterial.uniforms.distortStrength.value) * 0.05;
      coreMaterial.uniforms.color.value.lerp(targetCoreColor, 0.05);
      coreMesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
      coreMaterial.wireframe = targetWireframe;

      for (let i = 0; i < particleCount; i++) {
        const p = particleData[i];
        
        p.t += p.speed;

        const a = Math.cos(p.t) + Math.sin(p.t * 1) / 10;
        const b = Math.sin(p.t) + Math.cos(p.t * 2) / 10;
        const s = Math.cos(p.t);

        if (mode === 'fall' || mode === 'rain') {
            p.my -= 0.05;
            if (p.my < -10) p.my = 10;
            dummy.position.set(
                p.xFactor / 5,
                p.my,
                p.zFactor / 5
            );
            dummy.scale.set(0.5, 0.5, 0.5);
        } else if (mode === 'burst') {
            const burstRadius = (Math.sin(time * 2 + p.factor) + 2) * 2;
            dummy.position.set(
                (p.xFactor / 10) * burstRadius * 0.5,
                (p.yFactor / 10) * burstRadius * 0.5,
                (p.zFactor / 10) * burstRadius * 0.5
            );
             dummy.scale.set(1, 1, 1);
        } else {
            dummy.position.set(
                (p.xFactor / 10) + Math.cos(p.t + p.factor) * 2,
                (p.yFactor / 10) + Math.sin(p.t + p.factor) * 2,
                (p.zFactor / 10) + Math.sin(p.t * 0.5)
            );
            dummy.scale.set(s + 0.5, s + 0.5, s + 0.5);
        }

        dummy.rotation.set(time, time, time);
        dummy.updateMatrix();
        particles.setMatrixAt(i, dummy.matrix);
      }
      particles.instanceMatrix.needsUpdate = true;


      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      starGeo.dispose();
      starMat.dispose();
    };
  }, []);

  const currentData = STORY_DATA[currentIndex];

  const handleNext = () => {
    if (currentIndex < STORY_DATA.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key===" ") handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="w-full h-screen overflow-hidden bg-black font-sans selection:bg-white/30 relative">
      {/* 3D Container */}
      <div ref={mountRef} className="absolute inset-0 z-0 block" />

      {/* UI Layer */}
      <StoryOverlay 
        currentData={currentData} 
        onNext={handleNext} 
        onPrev={handlePrev}
        progress={currentIndex}
        total={STORY_DATA.length}
      />

       {/* 装饰性角落元素 */}
      <div className="absolute top-0 left-0 p-8 pointer-events-none z-20 opacity-30 hidden md:block">
        <div className={`w-px h-32 transition-colors duration-1000 ${currentData.visualMode === 'void' ? 'bg-black' : 'bg-white'}`}></div>
      </div>
      <div className="absolute bottom-0 right-0 p-8 pointer-events-none z-20 opacity-30 hidden md:block">
        <div className={`w-px h-32 transition-colors duration-1000 ${currentData.visualMode === 'void' ? 'bg-black' : 'bg-white'}`}></div>
      </div>

      {/* 提示 */}
      {currentIndex === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          delay={2}
          className={`absolute bottom-4 w-full text-center text-[10px] tracking-widest uppercase z-10 mb-20 ${currentData.visualMode === 'void' ? 'text-black/40' : 'text-white/30'}`}
        >
          「 按 下 空 格 或 点 击 按 钮 以 继 续 」
        </motion.div>
      )}
    </div>
  );
}

const StoryOverlay = ({ currentData, onNext, onPrev, progress, total }) => {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 z-10">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        key={`header-${currentData.chapter}`}
        className="w-full flex justify-between items-start"
      >
        <h2 className={`text-xs tracking-[0.5em] uppercase font-light transition-colors duration-1000 ${currentData.visualMode === 'void' ? 'text-black' : 'text-white/70'}`} style={{ textShadow: currentData.visualMode === 'void' ? 'none' : '0 0 10px rgba(0,0,0,0.5)' }}>
          {currentData.chapter}
        </h2>
        <div className={`text-xs font-mono transition-colors duration-1000 ${currentData.visualMode === 'void' ? 'text-black' : 'text-white/70'}`} style={{ textShadow: currentData.visualMode === 'void' ? 'none' : '0 0 10px rgba(0,0,0,0.5)' }}>
           {currentData.chapterNum-1}章 {currentData.sectionNum}节
        </div>
      </motion.div>

      {/* Text Content */}
      <div className="absolute inset-0 flex justify-center items-center text-center z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentData.id}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(5px)' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl pointer-events-auto p-4 rounded-xl"
            style={{
              backgroundColor: 'rgba(255,255,255,0.0)', 
              backdropFilter: 'none'
            }}
          >
            {currentData.text.split('\n').map((line, i) => (
              <p 
                key={i} 
                className={`mb-6 text-lg md:text-2xl leading-relaxed font-serif tracking-wide transition-colors duration-1000 ${currentData.visualMode === 'void' ? 'text-gray-800' : 'text-gray-100'}`}
                style={{ 
                  textShadow: currentData.visualMode === 'void' ? 'none' : '0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)'
                }}
              >
                {line}
              </p>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="w-full flex justify-center items-center gap-8 pointer-events-auto pb-8 mb-14">
        <button 
          onClick={onPrev} 
          disabled={progress === 0}
            className={`p-4 rounded-full transition-all duration-300 group ${progress === 0 ? 'opacity-0' : 'opacity-100 hover:bg-white/10'}`}
        >
          <ChevronLeft className={`w-6 h-6 transition-colors duration-1000 ${currentData.visualMode === 'void' ? 'text-black' : 'text-white'}`} />
        </button>

        <button 
            onClick={onNext}
            className={`group relative px-8 py-3 overflow-hidden rounded-full transition-all duration-500 ${currentData.visualMode === 'void' ? 'bg-black text-white' : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20'}`}
         >
            <span className="relative z-10 flex items-center gap-2 text-sm tracking-widest uppercase">
               {progress === total - 1 ? '再次轮回' : '继续探求'} 
               {progress !== total - 1 && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </span>
         </button>
      </div>
    </div>
  );
};