const section = document.querySelector("section");
const logos = document.querySelectorAll(".photo");
const FPS = 60;
console.log("audio joué");
section.style.height = window.innerHeight + "px";
section.style.width = window.innerWidth + "px";

		const audio = new Audio('./music.mp3'); 

		document.getElementById('playButton').addEventListener('click', () => {
			audio.play().catch(error => {
				console.log("Erreur lors de la lecture de l'audio : ", error);
			});


		});

let logosData = Array.from(logos).map((logo, index) => {
	return {
		xPosition: index === 0 ? Math.floor(Math.random() * ((window.innerWidth/2)-200)) + 200 - logo.clientWidth : Math.floor(Math.random() * window.innerWidth/2) + window.innerWidth/2 - logo.clientWidth,
		yPosition: index === 0 ? Math.floor(Math.random() * (window.innerHeight/2)) + 200 - logo.clientWidth : Math.floor(Math.random() * window.innerHeight/2) + window.innerHeight/2 - logo.clientWidth,
		xSpeed: index === 0 ? -3 : 3,
		ySpeed: index === 0 ? 3 : -3
		
	};
});

function updateLogo(logo, data) {
	logo.style.left = data.xPosition + "px";
	logo.style.top = data.yPosition + "px";
}


setInterval(() => {
	let logos = document.querySelectorAll('.photo');
	logos.forEach((logo, index) => {
		const data = logosData[index];
		if (data.xPosition + logo.clientWidth >= window.innerWidth || data.xPosition <= 0) {
			data.xSpeed = -data.xSpeed;
		}
		if (data.yPosition + logo.clientHeight >= window.innerHeight || data.yPosition <= 0) {
			data.ySpeed = -data.ySpeed;
		}
		data.xPosition += data.xSpeed;
		data.yPosition += data.ySpeed;
		updateLogo(logo, data);
		if (index == 3)
		{
			console.log(data);
		}
	});

	const logo1 = logosData[0];
	const logo2 = logosData[1];
	const logo1Width = logos[0].clientWidth;
	const logo1Height = logos[0].clientHeight;
	const logo2Width = logos[1].clientWidth;
	const logo2Height = logos[1].clientHeight;
	

	if (
		logo1.xPosition < logo2.xPosition + logo2Width &&
		logo1.xPosition + logo1Width > logo2.xPosition &&
		logo1.yPosition < logo2.yPosition + logo2Height &&
		logo1.yPosition + logo1Height > logo2.yPosition
	) {

		const deltaX = logo1.xPosition - logo2.xPosition;
		const deltaY = logo1.yPosition - logo2.yPosition;

		if (Math.abs(deltaX) > Math.abs(deltaY)) {
			logo1.xSpeed = -logo1.xSpeed;
			logo2.xSpeed = -logo2.xSpeed;
		} else {
			logo1.ySpeed = -logo1.ySpeed;
			logo2.ySpeed = -logo2.ySpeed;
		}
		const coeur = document.createElement('div');
coeur.classList.add('photo');
coeur.appendChild(Object.assign(document.createElement('img'), { src: 'coeur.png', alt: 'Coeur', style: 'width:100%; height:100%; border-radius: 50%;' }));
section.appendChild(coeur);


		logosData.push({
			xPosition: logo1.xPosition,
			yPosition: logo1.yPosition,
			xSpeed: Math.floor(Math.random() * (2))+1, 
			ySpeed: Math.floor(Math.random() * (2))+1 
		});
		

		logo1.xPosition += logo1.xSpeed;
		logo1.yPosition += logo1.ySpeed;
		logo2.xPosition += logo2.xSpeed;
		logo2.yPosition += logo2.ySpeed;


		logos.forEach((logo, index) => {
			const data = logosData[index];
			updateLogo(logo, data);
		});
	}
	

}, 1000 / FPS);

window.addEventListener("resize", () => {
	logosData.forEach((data, index) => {
		data.xPosition = index === 0 ? 10 : window.innerWidth - logos[index].clientWidth - 10;
		data.yPosition = 10;
	});

	section.style.height = window.innerHeight + "px";
	section.style.width = window.innerWidth + "px";
});



