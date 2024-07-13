// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", () => {
  const likeGlyphs = document.querySelectorAll(".like-glyph");
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");

  // Add event listeners for each heart icon
  likeGlyphs.forEach(likeGlyph => {
    likeGlyph.addEventListener("click", () => {
      mimicServerCall()
        .then(() => {
          // On success
          likeGlyph.classList.add("activated-heart");
          likeGlyph.textContent = FULL_HEART;
        })
        .catch((error) => {
          // On failure
          modal.classList.remove("hidden");
          modalMessage.textContent = error;
          setTimeout(() => {
            modal.classList.add("hidden");
          }, 3000); // Hide modal after 3 seconds
        });
    });
  });

  // Function to handle click on full heart to revert
  likeGlyphs.forEach(likeGlyph => {
    likeGlyph.addEventListener("click", () => {
      if (likeGlyph.classList.contains("activated-heart")) {
        mimicServerCall()
          .then(() => {
            // On success
            likeGlyph.classList.remove("activated-heart");
            likeGlyph.textContent = EMPTY_HEART;
          })
          .catch((error) => {
            // On failure
            modal.classList.remove("hidden");
            modalMessage.textContent = error;
            setTimeout(() => {
              modal.classList.add("hidden");
            }, 3000); // Hide modal after 3 seconds
          });
      }
    });
  });


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
});
