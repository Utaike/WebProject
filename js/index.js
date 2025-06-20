  // Slider functionality
  const slider = document.getElementById('slider').querySelector('div');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const cards = document.querySelectorAll('#slider a');
  const cardWidth = cards[0].offsetWidth + 24; // width + margin

  nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  });
  