import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

import Swiper from 'swiper';
import 'swiper/css';

import axios from 'axios';

const sendButton = document.querySelector('.button-send');
const overlay = document.querySelector('.work__overlay');
const closeBtn = document.querySelector('.work__modal-btn');

function openModal() {
	overlay.classList.remove('visually-hidden');
	document.documentElement.classList.add('is-lock');
}

function closeModal() {
	overlay.classList.add('visually-hidden');
	document.documentElement.classList.remove('is-lock');
}

closeBtn.addEventListener('click', closeModal);

overlay.addEventListener('click', event => {
	if (event.target === overlay) {
		closeModal();
	}
});

document.addEventListener('keydown', event => {
	if (
		event.key === 'Escape' &&
		!overlay.classList.contains('visually-hidden')
	) {
		closeModal();
	}
});

document
	.getElementById('work-form')
	.addEventListener('submit', async function (event) {
		event.preventDefault();

		const emailInput = document.querySelector('.work__form-email');
		const commentInput = document.querySelector('.work__form-comment');

		const formData = {
			email: emailInput.value,
			comment: commentInput.value,
		};

		try {
			const response = await axios.post(
				'https://portfolio-js.b.goit.study/api/requests',
				formData,
				{
					headers: {
						'Content-Type': 'application/json',
					},
					timeout: 10000,
				}
			);

			openModal();
			this.reset();
		} catch (error) {
			const serviceUnavailable =
				!error.response || error.response.status >= 500;
			if (serviceUnavailable) {
				alert(
					'Sorry, the request service is temporarily unavailable, so your application could not be sent. Your message has been kept in the form — please try again later.'
				);
				console.warn('Request API unavailable:', error);
				return;
			}

			let errorMessage =
				'Error sending application. Please check the entered data and try again.';
			errorMessage += ` Error code: ${error.response.status}`;
			alert(errorMessage);
			console.error('Error:', error);
		}
	});
