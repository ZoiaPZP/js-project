import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';
import axios from 'axios';
import savedReviews from '../data/reviews.json';

const API_TIMEOUT = 8000;

// Fallback copy of the API reviews; avatars are stored in src/public/reviews/
const fallbackReviews = savedReviews.map(review => ({
	...review,
	avatar_url: `${import.meta.env.BASE_URL}${review.avatar_url}`,
}));

const swiper = new Swiper('.reviews-swiper', {
	modules: [Navigation, Pagination, Keyboard],
	slidesPerView: 1,
	spaceBetween: 16,
	breakpoints: {
		768: { slidesPerView: 2 },
		1440: { slidesPerView: 4 },
	},
	navigation: {
		nextEl: '[data-btn="next"]',
		prevEl: '[data-btn="prev"]',
	},
	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},
});

async function fetchReviews() {
	try {
		const response = await axios.get(
			'https://portfolio-js.b.goit.study/api/reviews',
			{ timeout: API_TIMEOUT }
		);
		if (Array.isArray(response.data) && response.data.length > 0) {
			return response.data;
		}
		console.warn('Reviews API returned no reviews, using saved reviews');
		return fallbackReviews;
	} catch (error) {
		console.warn('Reviews API unavailable, using saved reviews', error);
		return fallbackReviews;
	}
}

async function renderReviews() {
	const reviews = await fetchReviews();
	const reviewsContainer = document.querySelector('[data-swiper="reviews"]');

	if (!reviewsContainer) return;

	reviewsContainer.innerHTML = '';

	reviews.forEach(review => {
		const reviewItem = `
            <li class="swiper-slide swiper-id">
                <img class="swiper-avatar_url" src="${review.avatar_url}" width="48" height="48" alt="${review.author}">
                <h3 class="swiper-author">${review.author}</h3>
                <p class="swiper-review">${review.review}</p>
            </li>
        `;
		reviewsContainer.insertAdjacentHTML('beforeend', reviewItem);
	});

	swiper.update();
}

document.addEventListener('DOMContentLoaded', renderReviews);
