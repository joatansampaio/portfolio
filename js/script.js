const textElement = document.getElementById('typing_effect');
const sentences = [
  "Software Engineer.",
  "Computer Science Student."
];

let writtingSpeed = 40;
let deletingSpeed = 20;
let timeout = 2500;
let sentenceIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentSentence = sentences[sentenceIndex];
  if (isDeleting) {
    textElement.textContent = currentSentence.substring(0, charIndex - 1);
    charIndex--;
  } else {
    textElement.textContent = currentSentence.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentSentence.length) {
    isDeleting = true;
    setTimeout(type, timeout);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    sentenceIndex = (sentenceIndex + 1) % sentences.length;
    setTimeout(type, 200);
  } else {
    setTimeout(type, isDeleting ? deletingSpeed : writtingSpeed);
  }
}

type();
