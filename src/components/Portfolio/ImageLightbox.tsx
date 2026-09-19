import React, { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Download from 'yet-another-react-lightbox/plugins/download';
import Captions from 'yet-another-react-lightbox/plugins/captions';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import './ImageLightbox.css';

export interface LightboxImageItem {
  src: string;
  label: string;
  categoryTag?: string;
}

export interface ImageLightboxProps {
  isOpen: boolean;
  images: LightboxImageItem[];
  currentIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onIndexChange,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Safe against SSR
  if (!mounted || !isOpen || images.length === 0) {
    return null;
  }

  const slides = images.map((img) => ({
    src: img.src,
    title: img.label,
    description: img.categoryTag ? `【${img.categoryTag}】支持鼠标拖拽平移、滚轮无级缩放、双击放大` : '支持鼠标拖拽平移、滚轮无级缩放、双击放大',
    download: `${img.label}.png`,
  }));

  return (
    <Lightbox
      open={isOpen}
      index={currentIndex}
      close={onClose}
      slides={slides}
      plugins={[Zoom, Thumbnails, Counter, Fullscreen, Download, Captions]}
      on={{
        view: ({ index }) => {
          onIndexChange(index);
        },
      }}
      animation={{ fade: 250, swipe: 300 }}
      carousel={{
        finite: false,
        preload: 2,
        padding: '16px',
        spacing: '100%',
      }}
      zoom={{
        maxZoomPixelRatio: 5,
        zoomInMultiplier: 2,
        scrollToZoom: true,
        pinchZoomV4: true,
      }}
      thumbnails={{
        position: 'bottom',
        width: 100,
        height: 68,
        border: 2,
        borderRadius: 8,
        padding: 2,
        gap: 12,
        vignette: true,
        showToggle: true,
      }}
      captions={{
        showToggle: true,
        descriptionTextAlign: 'center',
      }}
      labels={{
        Previous: '上一张',
        Next: '下一张',
        Close: '关闭相册 (ESC)',
        'Zoom in': '放大图片 (支持滚轮/拖拽平移)',
        'Zoom out': '缩小图片',
        'Enter Fullscreen': '全屏预览',
        'Exit Fullscreen': '退出全屏',
        Download: '下载原图',
        'Show thumbnails': '展开缩略图',
        'Hide thumbnails': '隐藏缩略图',
      }}
    />
  );
};

export default ImageLightbox;
