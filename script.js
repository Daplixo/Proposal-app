document.addEventListener('DOMContentLoaded', function() {
    // Background audio setup
    const backgroundMusic = document.getElementById('background-music');
    
    // Function to play background music (must be triggered by user interaction due to browser policies)
    function playBackgroundMusic() {
        backgroundMusic.volume = 0.5; // Set volume to 50%
        backgroundMusic.play().catch(e => {
            console.log('Audio playback failed:', e);
        });
    }
    
    // Create audio controls
    const audioControlDiv = document.createElement('div');
    audioControlDiv.className = 'audio-control';
    audioControlDiv.innerHTML = '<button id="audio-toggle">🔇</button>';
    document.querySelector('.proposal-app').appendChild(audioControlDiv);
    
    // Add event listener to toggle button
    const audioToggle = document.getElementById('audio-toggle');
    audioToggle.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            playBackgroundMusic();
            audioToggle.textContent = '🔊';
        } else {
            backgroundMusic.pause();
            audioToggle.textContent = '🔇';
        }
    });
    
    // Auto-play attempt (may not work due to browser policies)
    document.body.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            playBackgroundMusic();
            audioToggle.textContent = '🔊';
        }
    }, { once: true });
    
    // Dialogue system
    const dialogueText = document.getElementById('dialogue-text');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentPage = document.getElementById('current-page');
    const totalPages = document.getElementById('total-pages');
    const character = document.querySelector('.character');
    
    // Array of dialogue messages
    const dialogues = [
        "Hey there… 👀",
        "Yeah, I know, this is probably the last thing you expected to find.",
        "Don’t worry, it’s not some weird thing. This is just... me ",
        "reaching out in my own way.",
        "I’ve been building this page quietly for a while now.",
        "Not because I had to. But because I wanted to.",
        "Every line, every animation, every little thing here is a piece of me.",
        "I know it’s not perfect, but it’s real. It’s genuine.",
        "This isn’t just some random project. It’s a story. A memory. A journey.",
        "And if you’re still with me… ",
        "then we’ve got a little walk down memory lane to take.",
        "So yeah… welcome to this little world I built.",
        "Let’s begin from the beginning, shall we?"
    ];
    
    // Array of character images for each dialogue
    const characterImages = [
        "assets/character.jpg", // For dialogue 1
        "assets/characterSmiling.jpg", // For dialogue 2
        "assets/character.jpg", // For dialogue 3
        "assets/characterBlush.jpg", // For dialogue 4
        "assets/characterBlush.jpg", // For dialogue 5
        "assets/characterBlush.jpg", // For dialogue 6
        "assets/characterBlush.jpg", // For dialogue 7
        "assets/character.jpg", // For dialogue 8
        "assets/character.jpg", // For dialogue 9
        "assets/character.jpg", // For dialogue 10
        "assets/characterSmiling.jpg", // For dialogue 11
        "assets/character.jpg", // For dialogue 12
        "assets/characterBlush.jpg"  // For dialogue 13
    ];
    
    // Set total pages in the UI
    totalPages.textContent = dialogues.length;
    
    // Current dialogue index
    let currentDialogueIndex = 0;
    
    // Typewriter effect function
    function typeText(element, text, speed = 30, onComplete = null) {
        element.textContent = '';
        let i = 0;
        
        // Disable navigation during typing
        nextBtn.disabled = true;
        prevBtn.disabled = true;
        
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                // Re-enable buttons when typing is done
                prevBtn.disabled = currentDialogueIndex === 0;
                nextBtn.disabled = currentDialogueIndex === dialogues.length - 1;
                
                if (onComplete) onComplete();
            }
        }, speed);
    }
    
    // Function to update character image based on dialogue index
    function updateCharacterImage(index) {
        // Get current image path from style or use empty string if not set
        const currentImageStyle = character.style.backgroundImage;
        const newImagePath = `url('${characterImages[index]}')`;
        
        // Check if this is the initial image (index 0) or if the image is changing
        if (index === 0 || currentImageStyle === '') {
            // For first image or if no image is set yet, just set it without animation
            character.style.backgroundImage = newImagePath;
            character.style.opacity = 1;
        } else if (currentImageStyle !== newImagePath) {
            // Only animate if the image is actually changing
            // Fade out character
            character.style.opacity = 0;
            
            // Change image after fade out
            setTimeout(() => {
                character.style.backgroundImage = newImagePath;
                // Fade in with new image
                character.style.opacity = 1;
            }, 300);
        }
        // If the image is not changing, do nothing to avoid unnecessary transitions
    }
    
    // Set initial character image
    if (characterImages[0]) {
        character.style.backgroundImage = `url('${characterImages[0]}')`;
    }
    
    // Update dialogue text with typewriter effect and character image
    function updateDialogue(index) {
        // Fade out
        dialogueText.style.opacity = 0;
        
        setTimeout(() => {
            // Update page counter
            currentPage.textContent = index + 1;
            
            // Update character image
            updateCharacterImage(index);
            
            // Fade in (empty)
            dialogueText.style.opacity = 1;
            
            // Start typewriter effect
            typeText(dialogueText, dialogues[index]);
        }, 300);
    }
    
    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', function() {
        if (currentDialogueIndex < dialogues.length - 1) {
            currentDialogueIndex++;
            updateDialogue(currentDialogueIndex);
        }
    });
    
    prevBtn.addEventListener('click', function() {
        if (currentDialogueIndex > 0) {
            currentDialogueIndex--;
            updateDialogue(currentDialogueIndex);
        }
    });
    
    // Initialize the first dialogue with typewriter effect
    // This ensures the first text also has the typewriter effect
    typeText(dialogueText, dialogues[0]);
    
    // Set initial character image
    updateCharacterImage(0);
});
