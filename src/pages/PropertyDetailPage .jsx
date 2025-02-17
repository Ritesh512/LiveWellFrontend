import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Star, MapPin, Clock, Check, Camera, PlayCircle } from 'lucide-react';
import { FaStar, FaMapMarkerAlt, FaClock, FaParking, FaCheck, FaTimes, FaWifi, FaSwimmingPool, FaUtensils, FaDumbbell, FaTrash, FaHome } from 'react-icons/fa';
import { MdOutlineEdit, MdOutlineCleaningServices } from "react-icons/md";
import { FaKitchenSet } from "react-icons/fa6";
import { ImPowerCord } from "react-icons/im";
import PropertyGalleryModal from '../ui/PropertyGalleryModal';
import ReviewForm from '../components/ReviewForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

const TitleSection = styled.div`
  flex: 1;
`;

const PropertyName = styled.h1`
  font-size: 28px;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Stars = styled.div`
  display: flex;
  gap: 2px;
`;

const StarIcon = styled(Star)`
  width: 18px;
  height: 18px;
  fill: ${props => props.$filled ? '#FFD700' : '#E0E0E0'};
  stroke: #FFD700;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #0066cc;
  font-size: 14px;
  margin-top: 8px;
`;

const RatingSection = styled.div`
  text-align: right;
`;

const RatingBox = styled.div`
  background: #0066cc;
  color: white;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
`;

const RatingScore = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const RatingText = styled.div`
  font-size: 14px;
`;

// const ViewAllPhotos = styled.button`
//   position: absolute;
//   bottom: 24px;
//   right: 24px;
//   background: white;
//   border: none;
//   padding: 8px 16px;
//   border-radius: 4px;
//   font-weight: 500;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// `;

const MainContent = styled.div``;

const RoomCard = styled.div`
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
`;

const RoomTitle = styled.h2`
  font-size: 20px;
  margin: 0 0 16px 0;
`;

const RoomDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
`;

const BookButton = styled.button`
  background: #0066cc;
  color: white;
  border: none;
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #0052a3;
  }
`;

const ReviewSection = styled.div`
  margin-top: 48px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ReviewCard = styled.div`
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
`;

const ReviewUser = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;


const UserInfo = styled.div``;

const UserName = styled.div`
  font-weight: 500;
`;

const ReviewDate = styled.div`
  color: #666;
  font-size: 12px;
`;


const MainImage = styled.div`
  grid-row: ${props => props.$imageCount >= 3 ? 'span 2' : 'span 1'};
  background-size: cover;
  background-position: center;
  cursor: pointer;
  min-height: 200px;
`;

const SmallImage = styled.div`
  background-size: cover;
  background-position: center;
  cursor: pointer;
  min-height: 200px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  align-items: start; // This ensures the price section doesn't stretch
`;

const WriteReviewButton = styled.button`
  background: #0066cc;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0052a3;
  }
`;

const PropertyTypeTag = styled.span`
  background: #e3f2fd;
  color: #0066cc;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin: 24px 0;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 14px;
`;

const RoomInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const InfoItem = styled.div`
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  text-align: center;

  h4 {
    margin: 0 0 8px 0;
    color: #666;
    font-size: 14px;
  }

  p {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }
`;


const PriceSection = styled.div`
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 24px;
  position: sticky;
  top: 24px;
`;

const PriceDisplay = styled.div`
  margin-bottom: 16px;
`;

const PriceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const PriceInfo = styled.div`
  text-align: right;
`;

const OriginalPrice = styled.div`
  color: #666;
  text-decoration: line-through;
  font-size: 14px;
`;

const CurrentPrice = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #333;
`;

const TaxInfo = styled.div`
  color: #666;
  font-size: 12px;
`;

const PriceTag = styled.div`
  background: #e3f2fd;
  color: #0066cc;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
`;

const AmenityList = styled.div`
  margin: 16px 0;
  padding: 16px 0;
  border-top: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
`;

const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  font-size: 14px;
  color: ${props => props.$isAvailable ? '#333' : '#666'};

  svg {
    color: ${props => props.$isAvailable ? '#4CAF50' : '#666'};
  }
`;

const ImportantInfo = styled.div`
  margin: 16px 0;
  font-size: 14px;
  color: #666;

  h4 {
    color: #333;
    margin: 0 0 8px 0;
    font-size: 16px;
  }
`;

const SaleTag = styled.div`
  background: #fef0f0;
  color: #e53935;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  margin-bottom: 16px;
  display: inline-block;
`;

const ConfirmationOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ConfirmationContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  text-align: center;
`;

const ConfirmationTitle = styled.h2`
  margin-bottom: 16px;
`;

const ConfirmationButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 24px;
`;

const ConfirmationButton = styled.button`
  background: ${props => props.cancel ? '#ccc' : '#e53935'};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${props => props.cancel ? '#bbb' : '#d32f2f'};
  }
`;

const getFeatureIcon = (feature) => {
  switch (feature.toLowerCase()) {
    case 'wifi': return <FaWifi size={20} />;
    case 'swimming pool': return <FaSwimmingPool size={20} />;
    case 'restaurant': return <FaUtensils size={20} />;
    case 'gym': return <FaDumbbell size={20} />;
    case 'furnished room': return <FaHome size={20} />;
    case 'kitchen and cooking': return <FaKitchenSet size={20} />;
    case 'parking': return <FaParking size={20} />;
    case 'housekeeping and cleaning': return <MdOutlineCleaningServices size={20} />;
    case 'power backup': return <ImPowerCord size={20} />;
    default: return <FaCheck size={20} />;
  }
};


const GalleryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const RemainingCount = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 8px;
`;

const MediaBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ViewAllPhotos = styled.button`
  position: absolute;
  bottom: 24px;
  right: 24px;
  background: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-1px);
  }
`;

const Gallery = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: ${props => props.$imageCount >= 3 ? '2fr 1fr 1fr' : props.$imageCount === 2 ? '1fr 1fr' : '1fr'};
  grid-template-rows: ${props => props.$imageCount >= 3 ? '200px 200px' : '400px'};
  gap: 8px;
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
`;

const MediaContainer = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  
  &:hover {
    img {
      transform: scale(1.05);
    }
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;


const PropertyDetailPage = () => {
  const { flatId } = useParams();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const navigate = useNavigate();


  const showRoomDetails = property?.type === 'Flat';
  const showRoomSharing = ['Hostel', 'PG'].includes(property?.type);
  const userId = JSON.parse(localStorage.getItem('user'))._id;
  const role = JSON.parse(localStorage.getItem('user')).role;
  const email = JSON.parse(localStorage.getItem('user')).email;

  const handleDeleteFlat = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/flat/delete/${flatId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        toast.success('Flat deleted successfully!');
        navigate(`/profile/${userId}`); // Redirect to home page or another appropriate page
      } else {
        toast.error('Failed to delete flat');
      }
    } catch (error) {
      console.error('Error deleting flat:', error);
      toast.error('Error deleting flat');
    }
  };

  const confirmDeleteFlat = () => {
    console.log("clicking confirm")
    setIsConfirmationOpen(true);
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/people/feedback/flat/${flatId}`);
      const data = await response.json();
      const reviewsWithFullPhotoUrl = data.map(review => ({
        ...review,
        photoUrl: `http://localhost:3000${review.photoUrl}`
      }));
      setReviews(reviewsWithFullPhotoUrl);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchPropertyDetails = async () => {
    try {
      console.log(flatId);
      const response = await fetch(`http://localhost:3000/api/flat/${flatId}`);
      const data = await response.json();
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property details:', error);
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
    fetchReviews();
  }, [flatId]);

  const addUserBooking = async (bookingData) => {
    try {
      const response = await fetch('http://localhost:3000/api/userBook/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error('Failed to add booking');
      }

      const data = await response.json();
      console.log('Booking added:', data);
      toast.success('Booking added successfully!');
    } catch (error) {
      console.error('Error adding booking:', error);
      toast.error('Failed to add booking');
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      // const userId = JSON.parse(localStorage.getItem('user'))._id;
      const photoUrl = JSON.parse(localStorage.getItem('user')).photo;

      const response = await axios.post('http://localhost:3000/api/people/feedback', {
        flatId: property._id,
        ownerId: property.ownerId,
        userId,
        photoUrl,
        ...reviewData
      });
      console.log('Review submitted:', response.data);
      // Optionally, refresh the reviews list
      fetchPropertyDetails();
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  const initPay = (data) => {
    // const email = localStorage.getItem('email') || 'ritesh.prajapati20@vit.edu';

    const options = {
      key: "rzp_test_zfG2bjGJ5XlCJ2",
      amount: data.amount,
      currency: data.currency,
      name: property.name,
      description: "Test",
      image: `http://localhost:3000${property.images[0]}`,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyURL = "http://localhost:3000/api/payment/verify";
          const verifyResponse = await fetch(verifyURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ...response,
              email,
              // userId,
              // flatId: property._id,
              // ownerId: property.ownerId,
              // type: property.type,
              // ownerMobile: property.ownerMobile
            })
          });
          const verifyData = await verifyResponse.json();
          console.log(verifyData);
          const bookingData = {
            userId,
            flatId: property._id,
            ownerId: property.ownerId,
            ownerMobile: property.ownerMobile,
            type: property.type,
            cost: property.cost,
            paymentHistory: [
              {
                paymentId: response.razorpay_payment_id,
                amount: property.cost,
                paymentDate: new Date().toISOString(),
                isSuccessful: true
              }
            ],
            isDeleted: false
          };
          addUserBooking(bookingData);

        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePay = async () => {
    try {
      const orderURL = "http://localhost:3000/api/payment/orders";
      const response = await fetch(orderURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: property.cost })
      });
      const data = await response.json();
      console.log(data);
      initPay(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderPriceSection = () => {
    if (!property) return null;

    const {
      isOnSale = false,
      isRefundable = false,
      isAC = false,
      originalCost = 0,
      cost = 0,
      taxes = 0,
      type = 'Property',
      totalRooms = 0,
      availableRooms = 0
    } = property;

    return (
      <PriceSection>
        <PriceHeader>
          <PriceTag>
            Per Month
            {/* {type === 'Flat' ? 'Per Month' : 'Per Night'} */}
          </PriceTag>
          {isOnSale && <SaleTag>Limited Time Sale!</SaleTag>}
        </PriceHeader>

        <PriceDisplay>
          <PriceInfo>
            {originalCost > cost && (
              <OriginalPrice>₹ {originalCost.toLocaleString()}</OriginalPrice>
            )}
            <CurrentPrice>₹ {cost.toLocaleString()}</CurrentPrice>
            {taxes > 0 && (
              <TaxInfo>+ ₹ {taxes.toLocaleString()} taxes & fees</TaxInfo>
            )}
          </PriceInfo>
        </PriceDisplay>

        <AmenityList>
          <AmenityItem $isAvailable={isAC}>
            {isAC ? <FaCheck size={16} /> : <FaTimes size={16} />}
            {isAC ? 'AC Room Available' : 'Non-AC Room'}
          </AmenityItem>
          <AmenityItem $isAvailable={isRefundable}>
            {isRefundable ? <FaCheck size={16} /> : <FaTimes size={16} />}
            {isRefundable ? 'Refundable' : 'Non-Refundable'}
          </AmenityItem>
          {totalRooms > 0 && (
            <AmenityItem $isAvailable={availableRooms > 0}>
              <FaCheck size={16} />
              {availableRooms} of {totalRooms} rooms available
            </AmenityItem>
          )}
        </AmenityList>

        <ImportantInfo>
          <h4>Important Information</h4>
          <ul>
            {!isRefundable && (
              <li>This booking cannot be cancelled or refunded</li>
            )}
            {type === 'Flat' && (
              <li>Security deposit and maintenance charges may apply</li>
            )}
            {['PG', 'Hostel'].includes(type) && (
              <li>Monthly and quarterly payment options available</li>
            )}
          </ul>
        </ImportantInfo>

        <BookButton onClick={handlePay}>
          {availableRooms > 0 ? 'Book Now' : 'Join Waitlist'}
        </BookButton>
      </PriceSection>
    );
  };

  const renderGallery = () => {
    if (!property) return null;

    const totalMedia = [
      ...(property.images || []),
      ...(property.videos || [])
    ];
    const displayLimit = 5;
    const hasMoreMedia = totalMedia.length > displayLimit;
    const displayMedia = totalMedia.slice(0, displayLimit);

    const isVideo = (item) => item && (item.endsWith('.mp4') || item.endsWith('.webm'));

    return (
      <Gallery $imageCount={displayMedia.length}>
        {/* Main Image/Video */}
        {displayMedia[0] && (
          <MediaContainer
            style={{ gridRow: displayMedia.length >= 3 ? 'span 2' : 'span 1' }}
            onClick={() => setIsGalleryOpen(true)}
          >
            {isVideo(displayMedia[0]) ? (
              <>
                <StyledImage
                  src={`http://localhost:3000${displayMedia[0]}?thumb=true`}
                  alt="Video thumbnail"
                />
                <MediaBadge>
                  <PlayCircle size={16} />
                  Video
                </MediaBadge>
              </>
            ) : (
              <StyledImage src={`http://localhost:3000${displayMedia[0]}`} alt="Property" />
            )}
          </MediaContainer>
        )}

        {/* Additional Media */}
        {displayMedia.slice(1).map((item, index) => (
          <MediaContainer key={index} onClick={() => setIsGalleryOpen(true)}>
            <StyledImage
              src={isVideo(item) ? `http://localhost:3000${item}?thumb=true` : `http://localhost:3000${item}`}
              alt={isVideo(item) ? "Video thumbnail" : "Property"}
            />
            {isVideo(item) && (
              <MediaBadge>
                <PlayCircle size={16} />
                Video
              </MediaBadge>
            )}
            {/* Overlay for last visible item if there are more */}
            {index === displayMedia.length - 2 && hasMoreMedia && (
              <GalleryOverlay>
                <Camera size={24} />
                <RemainingCount>
                  +{totalMedia.length - displayLimit} more
                </RemainingCount>
              </GalleryOverlay>
            )}
          </MediaContainer>
        ))}

        <ViewAllPhotos onClick={() => setIsGalleryOpen(true)}>
          <Camera size={16} />
          View all media ({totalMedia.length})
        </ViewAllPhotos>
      </Gallery>
    );
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/people/feedback/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        toast.success('Review deleted successfully!');
        window.location.reload();
      } else {
        toast.warn('Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Error deleting review');
    }
  };

  return (
    <PageContainer>
      <Header>
        <TitleSection>
          <PropertyName>
            {property?.name}
            <PropertyTypeTag>{property?.type}</PropertyTypeTag>
            {role === 'owner' && userId === property?.ownerId && (
              <>
                <MdOutlineEdit
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/flat/update/${flatId}`)}
                />
                <FaTrash
                  style={{ cursor: 'pointer', marginLeft: '8px' }}
                  onClick={confirmDeleteFlat}
                />
              </>
            )}
          </PropertyName>
          <Stars>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon key={star} $filled={star <= Math.floor(property?.rating)} />
            ))}
          </Stars>
          <Location>
            <MapPin size={16} />
            {property?.street}, {property?.city}, {property?.state}
          </Location>
        </TitleSection>

        <RatingSection>
          <RatingBox>
            <RatingScore>{Math.floor(property?.rating) / 5}</RatingScore>
            <RatingText>{property?.totalRating}+ ratings</RatingText>
          </RatingBox>
        </RatingSection>
      </Header>

      {renderGallery()}

      <ContentGrid>
        <MainContent>
          <RoomCard>
            <RoomTitle>{property?.roomTitle}</RoomTitle>

            {showRoomDetails && (
              <RoomInfo>
                <InfoItem>
                  <h4>Bedrooms</h4>
                  <p>{property?.bedrooms}</p>
                </InfoItem>
                <InfoItem>
                  <h4>Bathrooms</h4>
                  <p>{property?.bathrooms}</p>
                </InfoItem>
                <InfoItem>
                  <h4>Living Rooms</h4>
                  <p>{property?.livingRooms}</p>
                </InfoItem>
                <InfoItem>
                  <h4>Kitchens</h4>
                  <p>{property?.kitchens}</p>
                </InfoItem>
              </RoomInfo>
            )}

            {showRoomSharing && (
              <RoomInfo>
                <InfoItem>
                  <h4>Room Sharing</h4>
                  <p>{property?.roomSharingForPg} Person</p>
                </InfoItem>
              </RoomInfo>
            )}

            <RoomDetails>
              <DetailItem>
                <Check size={16} />
                Fits {property?.fits} {property?.fits > 1 ? 'Adults' : 'Adult'}
              </DetailItem>
              <DetailItem>
                <Clock size={16} />
                Morning Timing: {property?.checkInTime}
              </DetailItem>
              <DetailItem>
                <Clock size={16} />
                Evening Timing: {property?.checkOutTime}
              </DetailItem>
            </RoomDetails>

            <FeaturesGrid>
              {property?.features?.map((feature, index) => (
                <FeatureItem key={index}>
                  {getFeatureIcon(feature)}
                  {feature}
                </FeatureItem>
              ))}
            </FeaturesGrid>
          </RoomCard>

          <ReviewSection>
            <ReviewHeader>
              <h2>Guest Reviews </h2>
              {userId !== property?.ownerId && (
                <WriteReviewButton onClick={() => setIsReviewFormOpen(true)}>
                  Write a Review
                </WriteReviewButton>
              )}
            </ReviewHeader>

            {reviews.map((review) => (
              <ReviewCard key={review._id}>
                {review.userId === userId && (
                  <FaTrash
                    style={{ cursor: 'pointer', float: 'right' }}
                    onClick={() => handleDeleteReview(review._id)}
                  />
                )}
                <ReviewUser>
                  <UserAvatar>
                    <AvatarImage src={review.photoUrl} alt={review.userName} />
                  </UserAvatar>
                  <UserInfo>
                    <UserName>{review.userName}</UserName>
                    <ReviewDate>{new Date(review.createdAt).toLocaleDateString()}</ReviewDate>
                  </UserInfo>
                </ReviewUser>
                <Stars>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      $filled={star <= Math.floor(review.rating)}
                    />
                  ))}
                </Stars>
                <p>{review.context}</p>
              </ReviewCard>
            ))}
          </ReviewSection>
        </MainContent>
        {renderPriceSection()}
      </ContentGrid>

      <PropertyGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={property?.images}
        videoUrl={property?.videos}
      />

      <ReviewForm
        isOpen={isReviewFormOpen}
        onClose={() => setIsReviewFormOpen(false)}
        onSubmit={handleReviewSubmit}
        flatId={property?._id}
        ownerId={property?.ownerId}
      />

      {isConfirmationOpen && (
        <ConfirmationOverlay>
          <ConfirmationContainer>
            <ConfirmationTitle>Are you sure you want to delete this flat?</ConfirmationTitle>
            <ConfirmationButtons>
              <ConfirmationButton cancel onClick={() => setIsConfirmationOpen(false)}>Cancel</ConfirmationButton>
              <ConfirmationButton onClick={handleDeleteFlat}>Delete</ConfirmationButton>
            </ConfirmationButtons>
          </ConfirmationContainer>
        </ConfirmationOverlay>
      )}

    </PageContainer>
  );
};

export default PropertyDetailPage;