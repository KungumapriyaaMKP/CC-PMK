import React from 'react';
import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';

const galleryData: GalleryItem[] = [
  {
    common: '11M Views: Dubai Real Estate',
    binomial: 'Invest With Banu - Viral Peak Reel',
    photo: {
      url: '/assets/reel-dubai.jpg',
      text: 'Dubai Real Estate Viral Reel',
      pos: '47% 35%',
      by: 'Invest With Banu'
    }
  },
  {
    common: '7M Views: Chronic Pain Science',
    binomial: 'Resilio The Pain Clinic - Healthcare Education',
    photo: {
      url: '/assets/reel-healthcare.jpg',
      text: 'Healthcare Clinical Reel',
      pos: '75% 65%',
      by: 'Resilio Pain Clinic'
    }
  },
  {
    common: 'Luxury Space Transformation',
    binomial: 'Space By KV - Architectural Walkthrough',
    photo: {
      url: '/assets/reel-interior.jpg',
      text: 'Interior Architecture Reel',
      pos: '53% 43%',
      by: 'Space By KV'
    }
  },
  {
    common: 'Modern Modesty Styling',
    binomial: 'Eighteen Modesty - Lifestyle Brand',
    photo: {
      url: '/assets/reel-fashion.jpg',
      text: 'Modest Wear Fashion Reel',
      pos: '65% 65%',
      by: 'Eighteen Modesty'
    }
  }
];

const CircularGalleryDemo = () => {
  return (
    <div className="w-full bg-background text-foreground py-16">
      <div className="w-full h-[600px] flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">High Reach Reels Gallery</h1>
          <p className="text-muted-foreground">Scroll or drag to rotate the gallery</p>
        </div>
        <div className="w-full h-full">
          <CircularGallery items={galleryData} radius={500} />
        </div>
      </div>
    </div>
  );
};

export default CircularGalleryDemo;
