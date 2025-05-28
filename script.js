document.addEventListener('DOMContentLoaded', function() {
    // Dialogue system
    const dialogueText = document.getElementById('dialogue-text');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentPage = document.getElementById('current-page');
    const totalPages = document.getElementById('total-pages');
    
    // Array of dialogue messages
    const dialogues = [
        "Hey there! I have something special to tell you...",
        "We've known each other for a while now, and every moment has been amazing.",
        "I've been thinking about us a lot recently...",
        "And there's something I've wanted to ask you for a long time.",
        "Will you be mine? ❤️"
    ];
    
    // Set total pages in the UI
    totalPages.textContent = dialogues.length;
    
    // Current dialogue index
    let currentDialogueIndex = 0;
    
    // Update dialogue text with fade effect
    function updateDialogue(index) {
        // Fade out
        dialogueText.style.opacity = 0;
        
        setTimeout(() => {
            // Update text
            dialogueText.textContent = dialogues[index];
            // Update page counter
            currentPage.textContent = index + 1;
            // Update button states
            prevBtn.disabled = index === 0;
            nextBtn.disabled = index === dialogues.length - 1;
            // Fade in
            dialogueText.style.opacity = 1;
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
});
