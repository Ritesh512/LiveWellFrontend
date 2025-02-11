import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const ReviewSection = styled.section`
  padding: 4rem 5%;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  text-align: center;
`;

const ReviewsCarousel = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: hidden;
  padding: 1rem;
`;

const ReviewCard = styled.div`
  flex: 0 0 300px;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Rating = styled.div`
  color: #FFD700;
  margin-bottom: 0.5rem;
`;

const RenterReview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const reviews = [
    {
      name: "Sarah Johnson",
      image: "/assets/reviewer-1.jpg",
      rating: 5,
      review: "Amazing experience with LiveWell! Found my perfect apartment within days."
    },
    {
      name: "Mike Chen",
      image: "/assets/reviewer-2.jpg",
      rating: 5,
      review: "The team was incredibly helpful and responsive throughout the process."
    },
    {
      name: "Emma Davis",
      image: "/assets/reviewer-3.jpg",
      rating: 5,
      review: "Best rental platform I've used. Very transparent and professional."
    },
    {
      name: "John Smith",
      image: "/assets/reviewer-4.jpg",
      rating: 5,
      review: "Seamless experience from start to finish. Highly recommended!"
    }
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ReviewSection>
      <Title>Renter's Review</Title>
      <ReviewsCarousel style={{ transform: `translateX(-${currentSlide * 320}px)` }}>
        {reviews.map((review, index) => (
          <ReviewCard key={index}>
            <ReviewHeader>
              <img src={review.image} alt={review.name} />
              <div>
                <h4>{review.name}</h4>
                <Rating>{"⭐".repeat(review.rating)}</Rating>
              </div>
            </ReviewHeader>
            <p>{review.review}</p>
          </ReviewCard>
        ))}
      </ReviewsCarousel>
    </ReviewSection>
  );
};

export default RenterReview;