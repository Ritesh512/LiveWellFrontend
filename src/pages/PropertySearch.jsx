import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaHome, FaFilter, FaStar, FaMapMarkerAlt, FaRupeeSign, FaBed, FaUsers } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';
import dummyData from '../utils/dummydata';


// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const SearchContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: white;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  background: ${props => props.variant === 'clear' ? '#f44336' : '#2196f3'};
  color: white;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.7 : 1};
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    opacity: 0.9;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const PropertyCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`;

const PropertyImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PropertyInfo = styled.div`
  padding: 16px;
`;

const PropertyName = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333;
`;

const PropertyStats = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
  color: #666;
`;

const PropertyFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const Feature = styled.span`
  background: #e3f2fd;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #2196f3;
`;

const PropertySearch = () => {
  const [filters, setFilters] = useState({
    state: '',
    city: '',
    pincode: '',
    type: '',
    priceRange: '5000-10000'
  });

  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [bhkFilter, setBhkFilter] = useState('');
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

  const priceRanges = [
    '5000-10000',
    '10000-15000',
    '15000-20000',
    '20000-25000'
  ];

  useEffect(() => {
    setIsSearchEnabled(filters.state && filters.city && filters.type);
  }, [filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Simulate API call with dummy data
    setSearchResults(dummyData);
  };

  const handleClear = () => {
    setFilters({
      state: '',
      city: '',
      pincode: '',
      type: '',
      priceRange: '5000-10000'
    });
    setSortBy('');
    setBhkFilter('');
    setSearchResults([]);
  };

  const getFilteredAndSortedResults = () => {
    let results = [...searchResults];

    if (bhkFilter && filters.type === 'Flat') {
      results = results.filter(property => property.bhk === parseInt(bhkFilter));
    }

    if (sortBy === 'price-asc') {
      results.sort((a, b) => a.cost - b.cost);
    } else if (sortBy === 'price-desc') {
      results.sort((a, b) => b.cost - a.cost);
    }

    return results;
  };

  return (
    <Container>
      <SearchContainer>
        <SearchForm onSubmit={handleSearch}>
          <Select 
            value={filters.state}
            onChange={(e) => setFilters({...filters, state: e.target.value})}
            required
          >
            <option value="">Select State</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Maharashtra">Maharashtra</option>
          </Select>

          <Select
            value={filters.city}
            onChange={(e) => setFilters({...filters, city: e.target.value})}
            required
          >
            <option value="">Select City</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
          </Select>

          <Input
            placeholder="Pincode (optional)"
            value={filters.pincode}
            onChange={(e) => setFilters({...filters, pincode: e.target.value})}
          />

          <Select
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
            required
          >
            <option value="">Select Type</option>
            <option value="Flat">Flat</option>
            <option value="PG">PG</option>
            <option value="Hostel">Hostel</option>
          </Select>

          <Select
            value={filters.priceRange}
            onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
          >
            {priceRanges.map(range => (
              <option key={range} value={range}>₹{range}</option>
            ))}
          </Select>

          <Button type="submit" disabled={!isSearchEnabled}>
            <FaSearch /> Search
          </Button>

          <Button type="button" variant="clear" onClick={handleClear}>
            <MdClear /> Clear
          </Button>
        </SearchForm>
      </SearchContainer>

      {searchResults.length > 0 && (
        <FiltersContainer>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort by Price</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </Select>

          {filters.type === 'Flat' && (
            <Select value={bhkFilter} onChange={(e) => setBhkFilter(e.target.value)}>
              <option value="">Select BHK</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
            </Select>
          )}
        </FiltersContainer>
      )}

      <ResultsGrid>
        {getFilteredAndSortedResults().map(property => (
          <PropertyCard key={property.id}>
            <PropertyImage src={property.images[0]} alt={property.name} />
            <PropertyInfo>
              <PropertyName>{property.name}</PropertyName>
              <PropertyStats>
                <span><FaRupeeSign />{property.cost}/month</span>
                {property.type === 'Flat' && <span><FaBed />{property.bhk} BHK</span>}
                <span><FaUsers />{property.availableRooms} available</span>
              </PropertyStats>
              <PropertyStats>
                <span><FaStar style={{color: '#ffc107'}} />{property.rating}</span>
                <span><FaMapMarkerAlt />{property.city}, {property.state}</span>
              </PropertyStats>
              <PropertyFeatures>
                {property.features.map(feature => (
                  <Feature key={feature}>{feature}</Feature>
                ))}
              </PropertyFeatures>
            </PropertyInfo>
          </PropertyCard>
        ))}
      </ResultsGrid>
    </Container>
  );
};

export default PropertySearch;