// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { useParams } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Container = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 2rem;
// `;

// const FormWrapper = styled.form`
//   background: white;
//   padding: 2rem;
//   border-radius: 12px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// `;

// const Title = styled.h1`
//   color: #2c3e50;
//   margin-bottom: 2rem;
//   text-align: center;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 1rem;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 0.5rem;
//   color: #2c3e50;
//   font-weight: 500;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   font-size: 1.5rem;

//   &:focus {
//     outline: none;
//     border-color: #3498db;
//     box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
//   }
// `;

// const Button = styled.button`
//   background-color: #3498db;
//   color: white;
//   padding: 1rem 2rem;
//   border: none;
//   border-radius: 4px;
//   font-size: 1.5rem;
//   cursor: pointer;
//   width: 100%;
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: #2980b9;
//   }
// `;

// const Spinner = styled.div`
//   border: 4px solid rgba(0, 0, 0, 0.1);
//   border-left-color: #3498db;
//   border-radius: 50%;
//   width: 36px;
//   height: 36px;
//   animation: spin 1s linear infinite;

//   @keyframes spin {
//     to {
//       transform: rotate(360deg);
//     }
//   }
// `;

// const UploadMedia = () => {
//   const { id } = useParams();
//   const [images, setImages] = useState([]);
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleVideoChange = (e) => {
//     setVideo(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     images.forEach((image) => formData.append('images', image));

//     try {
//       const response = await fetch(`http://localhost:3000/api/flats/upload/images/${id}`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         toast.success('Images uploaded successfully!');
//       } else {
//         toast.error('Failed to upload images');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Error uploading images');
//     }

//     setLoading(false);

//     if (video) {
//       console.log('Video upload functionality will be added later.');
//     }
//   };

//   return (
//     <Container>
//       <FormWrapper onSubmit={handleSubmit}>
//         <Title>Upload Images and Videos</Title>
//         <FormGroup>
//           <Label>Upload Images (Max 5 at a time)</Label>
//           <Input type="file" multiple accept="image/*" onChange={handleImageChange} />
//         </FormGroup>
//         <FormGroup>
//           <Label>Upload Video (Max 1)</Label>
//           <Input type="file" accept="video/*" onChange={handleVideoChange} />
//         </FormGroup>
//         <Button type="submit" disabled={loading}>
//           {loading ? <Spinner /> : 'Upload'}
//         </Button>
//       </FormWrapper>
//     </Container>
//   );
// };

// export default UploadMedia;