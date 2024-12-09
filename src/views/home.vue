<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-orange-600 text-white py-20 px-10">
      <div class="container mx-auto text-center">
        <h2 class="text-4xl font-bold mb-6">Enhance Your Skills with Our Courses</h2>
        <p class="text-lg mb-8">
          Choose from a wide range of courses,
          take quizzes, and pass final exams to earn certificates!
        </p>
        <a
          href="#courses"
          class="bg-white text-orange-600 px-8 py-3 rounded-full shadow hover:bg-gray-100"
        >
          Explore Courses
        </a>
      </div>
    </section>
    <!-- Features Section -->
    <section class="container mx-auto py-16">
      <div class="grid md:grid-cols-3 gap-8 text-center">
        <div>
          <svg class="w-12 h-12 mx-auto text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v8m4-4H8" />
          </svg>
          <h3 class="text-xl font-semibold mt-4">Modular Learning</h3>
          <p class="mt-2 text-gray-600">
            Courses are divided into easy-to-digest modules for step-by-step learning.</p>
        </div>
        <div>
          <svg class="w-12 h-12 mx-auto text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2" d="M12 14l6.16-3.422M6.84 10.578L12 14l-5.16 2.844" />
          </svg>
          <h3 class="text-xl font-semibold mt-4">Quizzes & Exams</h3>
          <p class="mt-2 text-gray-600">
            Test your knowledge with quizzes and final exams at the end of each module.</p>
        </div>
        <div>
          <svg class="w-12 h-12 mx-auto text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
          </svg>
          <h3 class="text-xl font-semibold mt-4">Certificates</h3>
          <p class="mt-2 text-gray-600">
            Earn certificates for completing courses and share them with potential employers.</p>
        </div>
      </div>
    </section>
    <!-- Courses Section -->
    <section id="courses" class="bg-gray-100 py-16">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">Available Courses</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Course Card -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-xl font-semibold mb-4">Web Development</h3>
            <p class="text-gray-600 mb-4">
              Learn HTML, CSS, and JavaScript to build modern web applications.</p>
            <a href="#" class="bg-orange-600 text-white px-4 py-2 rounded">Enroll Now</a>
          </div>
          <!-- Course Card -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-xl font-semibold mb-4">Data Science</h3>
            <p class="text-gray-600 mb-4">
              Master Python, data analysis, and machine learning techniques.</p>
            <a href="#" class="bg-orange-600 text-white px-4 py-2 rounded">Enroll Now</a>
          </div>
          <!-- Course Card -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-xl font-semibold mb-4">Digital Marketing</h3>
            <p class="text-gray-600 mb-4">
              Explore SEO, social media, and content marketing strategies.</p>
            <a href="#" class="bg-orange-600 text-white px-4 py-2 rounded">Enroll Now</a>
          </div>
        </div>
      </div>
    </section>
    <!-- Teacher Section -->
    <section class="container mx-auto py-16">
      <div class="bg-orange-600 text-white p-12 rounded-lg text-center">
        <h2 class="text-3xl font-bold mb-6">Are You a Teacher?</h2>
        <p class="text-lg mb-8">
          Create and manage your courses easily with our teacher interface.
          Share your knowledge with thousands of students!</p>
        <a
          href="#"
          class="bg-white text-orange-600 px-8 py-3 rounded-full shadow hover:bg-gray-100"
        >Start Creating</a>
      </div>
    </section>
  </div>
</template>
