
        const wishes = [
            "Dearest Mom, your boundless love lights up my world. Thank you for every sacrifice and smile you share with me.",
            "Mom, your strength is my inspiration. May your life overflow with joy, love, and endless happiness.",
            "You've shaped me into a woman of courage and grace. My love for you is eternal, Mom.",
            "May every day bring you the blessings you deserve, Mom, for being my heart's guiding star."
        ];
        let currentWishIndex = 0;
        let clickCount = 0;

        // Handle audio autoplay
        window.onload = function() {
            const audio = document.querySelector('audio');
            audio.volume = 0.3;
            audio.muted = true;
            audio.play().catch(e => console.log('Audio autoplay prevented:', e));
            setTimeout(() => {
                audio.muted = false;
            }, 100);

            setTimeout(() => {
                document.getElementById('wishCounter').textContent = 
                    `Wish 1 of ${wishes.length}`;
                document.getElementById('message').innerHTML = wishes[0];
                document.getElementById('message').classList.add('show', 'wish0');
                currentWishIndex = 1;
            }, 1000);
            
           
            createFloatingElements();
           
            setInterval(createFloatingElements, 3000);
        };

        function animateHeader() {
            const header = document.querySelector('h1');
            header.style.animation = 'none';
            void header.offsetWidth; 
            header.style.animation = 'colorChange 8s infinite alternate, pulse 0.5s ease, shake 0.5s ease';
            
            setTimeout(() => {
                header.style.animation = 'fadeIn 1s ease forwards, pulse 2s infinite, colorChange 8s infinite alternate, floatHeader 4s ease-in-out infinite';
            }, 500);
        }

        function togglePolygon(img) {
            img.classList.toggle('polygon');
            
            if (img.classList.contains('polygon')) {
                
                createHeartsAroundImage(img);
            }
        }

        function createHeartsAroundImage(img) {
            const rect = img.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const radius = rect.width * 0.8;
            const colors = ['pink', 'red', 'purple', 'orange'];
            
            for (let i = 0; i < 12; i++) {
                const angle = (i * 30) * Math.PI / 180;
                const x = centerX + radius * Math.cos(angle) - 10;
                const y = centerY + radius * Math.sin(angle) - 10;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                const heart = document.createElement('div');
                heart.className = `heart ${color}`;
                heart.style.position = 'fixed';
                heart.style.left = `${x}px`;
                heart.style.top = `${y}px`;
                heart.style.animation = `float 3s ease-out forwards`;
                heart.style.zIndex = '1000';
                heart.style.transform = 'rotate(-45deg)';
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 3000);
            }
        }

        function createFloatingElements() {
            const container = document.querySelector('.floating-elements');
            const heartColors = ['pink', 'red', 'purple', 'orange'];
            const flowerColors = ['pink', 'red', 'purple', 'yellow'];
            
            
            for (let i = 0; i < 10; i++) {
                const heart = document.createElement('div');
                heart.className = `heart ${heartColors[Math.floor(Math.random() * heartColors.length)]}`;
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDuration = Math.random() * 3 + 3 + 's';
                heart.style.opacity = Math.random() * 0.5 + 0.3;
                heart.style.transform = `rotate(-45deg) scale(${Math.random() * 0.5 + 0.7})`;
                container.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 6000);
            }
            
           
            for (let i = 0; i < 7; i++) {
                const flowerColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
                const flower = document.createElement('div');
                flower.className = `flower ${flowerColor}`;
                flower.style.left = Math.random() * 100 + 'vw';
                flower.style.animationDuration = Math.random() * 4 + 4 + 's';
                flower.style.opacity = Math.random() * 0.5 + 0.3;
                flower.style.transform = `scale(${Math.random() * 0.5 + 0.7})`;
                
                const center = document.createElement('div');
                center.className = `flower-center ${flowerColor}`;
                const petal1 = document.createElement('div');
                petal1.className = 'petal1';
                const petal2 = document.createElement('div');
                petal2.className = 'petal2';
                
                flower.appendChild(center);
                flower.appendChild(petal1);
                flower.appendChild(petal2);
                container.appendChild(flower);
                
                setTimeout(() => {
                    flower.remove();
                }, 8000);
            }
        }

        function createConfetti() {
            const container = document.querySelector('.floating-elements');
            const colors = ['#e75480', '#d65db1', '#ff6b8b', '#ffb6c1', '#ffd700'];
            
            for (let i = 0; i < 60; i++) {
                setTimeout(() => {
                    const isHeart = Math.random() > 0.6;
                    const confetti = document.createElement('div');
                    confetti.className = isHeart ? 'confetti-heart' : 'confetti';
                    
                    if (!isHeart) {
                        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    }
                    
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
                    confetti.style.width = Math.random() * 10 + 8 + 'px';
                    confetti.style.height = isHeart ? 'auto' : Math.random() * 10 + 8 + 'px';
                    confetti.style.animationDelay = Math.random() * 0.5 + 's';
                    
                    container.appendChild(confetti);
                    
                    setTimeout(() => {
                        confetti.remove();
                    }, 3000);
                }, i * 50);
            }
        }

        function showNextWish() {
            clickCount++;
            const message = document.getElementById('message');
            message.classList.remove('show', 'wish0', 'wish1', 'wish2', 'wish3');
            
            document.getElementById('wishCounter').textContent = 
                `Wish ${currentWishIndex + 1} of ${wishes.length}`;
            
            setTimeout(() => {
                message.innerHTML = wishes[currentWishIndex];
                message.classList.add('show', `wish${currentWishIndex}`);
                currentWishIndex = (currentWishIndex + 1) % wishes.length;
                
                if (clickCount === 3) {
                    createConfetti();
                    setTimeout(() => {
                        alert("Ale, you're my forever hero! 💖");
                    }, 500);
                }
            }, 300);
        }
