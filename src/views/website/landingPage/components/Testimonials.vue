<template>
    <div class="testimonials-section">
      <h2>What Our Customers Say</h2>
      <va-carousel :items="testimonials" class="carousel" autoscroll infinite :autoscroll-interval="3000">
        <template #default="{ item }">
          <div class="testimonial">
            <!-- <img :src="item.icon" alt="User Icon" class="testimonial-icon" /> -->
             <VaAvatar class="mr-6">
              {{ item.initials }}
             </VaAvatar>
            <p>"{{ item.feedback }}"</p>
            <strong>- {{ item.name }}</strong>
          </div>
        </template>
      </va-carousel>
    </div>
  </template>
  
  <script>

  export default {
    data() {
      return {
        testimonials: [
          {
            name: 'John Doe',
            feedback: 'This platform changed the way we work!',
            icon: 'https://via.placeholder.com/50', // Replace with actual icon URLs
            initials: "JD"
          },
          {
            name: 'Jane Smith',
            feedback: 'Amazing experience, highly recommend it!',
            icon: 'https://via.placeholder.com/50', // Replace with actual icon URLs
            initials: "JS"
          },
          {
            name: 'Alice Johnson',
            feedback: 'Easy to use and fantastic support!',
            icon: 'https://via.placeholder.com/50', // Replace with actual icon URLs
            initials: "AJ"
          },
        ],
      };
    },
  };
  </script>
  
  <style>
  .testimonials-section {
    padding: 50px 20px;
    background: white;
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  
  .testimonial {
    font-size: 1.2rem;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .testimonial-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .carousel {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    .testimonials-section {
      padding: 30px 10px;
    }
    .testimonial {
      font-size: 1rem;
    }
    .testimonial-icon {
      width: 40px;
      height: 40px;
    }
  }
  
  @media (max-width: 480px) {
    .testimonials-section {
      padding: 20px 5px;
    }
    .testimonial {
      font-size: 0.9rem;
    }
    .testimonial-icon {
      width: 30px;
      height: 30px;
    }
  }
  </style>
  