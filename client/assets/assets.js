// Import all images here
import ai_gen_img_1 from "./ai_gen_img_1.png";
import ai_gen_img_2 from "./ai_gen_img_2.png";
import ai_gen_img_3 from "./ai_gen_img_3.png";
import AI from "./AI.png";
import arrow_icon from "./arrow_icon.svg";
import favicon from "./favicon.svg";
import gradientBackground from "./gradientBackground.png";
import logo from "./logo.svg";
import profile_img_1 from "./profile_img_1.png";
import star_dull_icon from "./star_dull_icon.svg";
import star_icon from "./star_icon.svg";
import user_group from "./user_group.png";

export const assets = {
  ai_gen_img_1,
  ai_gen_img_2,
  ai_gen_img_3,
  AI,
  arrow_icon,
  favicon,
  gradientBackground,
  logo,
  profile_img_1,
  star_dull_icon,
  star_icon,
  user_group,
};

import {
  SquarePen,
  Hash,
  Image as ImageIcon,
  Eraser,
  Scissors,
  FileText,
  Video
} from 'lucide-react';



// AI Tools data
export const AiToolsData = [
  {
    title: 'AI Article Writer',
    description: 'Effortlessly craft engaging, high-quality articles on any topic in seconds with AI-powered writing.',
    Icon: FileText,
    bg: { from: '#6366F1', to: '#3B82F6' },
    path: '/write-article'
  },
  {
    title: 'Video Generator',
    description: 'Transform your ideas into stunning videos using advanced AI video generation technology.',
    Icon: Video,
    bg: { from: '#EC4899', to: '#F43F5E' },
    path: '/video-gen'
  },
  {
    title: 'AI Image Generation',
    description: 'Bring your imagination to life by generating realistic, creative images from text prompts.',
    Icon: ImageIcon,
    bg: { from: '#22C55E', to: '#16A34A' },
    path: '/generate-image'
  },
  {
    title: 'Background Removal',
    description: 'Instantly remove image backgrounds with precise AI-powered background detection.',
    Icon: Eraser,
    bg: { from: '#F97316', to: '#EA580C' },
    path: '/remove-background'
  },
  {
    title: 'Object Removal',
    description: 'Easily erase unwanted objects from images while preserving natural surroundings.',
    Icon: Scissors,
    bg: { from: '#8B5CF6', to: '#6D28D9' },
    path: '/remove-object'
  }
];



export const dummyTestimonialData = [
    {
        image: assets.profile_img_1,
        name: 'John Doe',
        title: 'Marketing Director, TechCorp',
        content: 'ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.',
        rating: 4,
    },
    {
        image: assets.profile_img_1,
        name: 'Jane Smith',
        title: 'Content Creator, TechCorp',
        content: 'ContentAI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.',
        rating: 5,
    },
    {
        image: assets.profile_img_1,
        name: 'David Lee',
        title: 'Content Writer, TechCorp',
        content: 'ContentAI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.',
        rating: 4,
    },
]


