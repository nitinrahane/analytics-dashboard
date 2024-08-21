import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Masonry from 'react-masonry-css';
import { styled } from '@mui/material/styles';
import './ResponsiveImages.scss';

const Image = styled('img')({
  width: '100%',
  height: 'auto',
  display: 'block',
  transition: 'opacity 0.3s',
  opacity: 0,
});

const ResponsiveImages: React.FC = () => {
  const [images, setImages] = useState<{ id: string, url: string, width: number, height: number }[]>([]);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchImages = useCallback(() => {
    setLoading(true);
    axios.get(`https://api.unsplash.com/photos?page=${page}&per_page=20&client_id=j27BxWT0i4MsfVPKP_elpNQ29Um_9r8eP9gLG3i7N28`)
      .then(response => {
        const imageData = response.data.map((img: { id: string, urls: { regular: string }, width: number, height: number }) => ({
          id: img.id,
          url: img.urls.regular,
          width: img.width,
          height: img.height
        }));
        setImages(prevImages => [...prevImages, ...imageData]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src!;
            img.onload = () => {
              setLoadedImages((prev) => [...prev, img.dataset.id!]);
              img.style.opacity = '1';
            };
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '0px 0px 200px 0px' }
    );

    const images = containerRef.current?.querySelectorAll('img');
    images?.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, [images]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <Box ref={containerRef} className="responsive-images" sx={{width:"100%"}}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image) => (
          <Box key={image.id} position="relative" sx={{ m: 2 }}>
            {!loadedImages.includes(image.id) && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
            <Image
              data-id={image.id}
              data-src={image.url}
              alt={`Responsive ${image.id}`}
              sx={{ width: '100%', height: 'auto' }}
            />
          </Box>
        ))}
      </Masonry>
      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ResponsiveImages;
