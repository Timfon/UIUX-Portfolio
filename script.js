document.addEventListener("DOMContentLoaded", () => {
  // Pixel cursor effect
  const cursor = document.createElement("div")
  cursor.classList.add("pixel-cursor")
  document.body.appendChild(cursor)

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"
  })

  // Animate stat bars on scroll
  const statBars = document.querySelectorAll(".stat-fill")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.style.width || entry.target.getAttribute("style").split(":")[1].trim()
        } else {
          entry.target.style.width = "0%"
        }
      })
    },
    { threshold: 0.5 },
  )

  statBars.forEach((bar) => {
    observer.observe(bar)
  })

  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        })
      }
    })
  })

  // Start button animation
  const startButton = document.querySelector(".start-button")
  if (startButton) {
    startButton.addEventListener("click", () => {
      document.querySelector("#projects").scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
  }

  // Add pixel dust effect on hover for project cards
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", createPixelDust)
  })

  function createPixelDust(e) {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()

    for (let i = 0; i < 10; i++) {
      const pixel = document.createElement("div")
      pixel.classList.add("pixel-dust")

      const size = Math.random() * 5 + 2
      const x = Math.random() * rect.width
      const y = rect.height

      pixel.style.width = `${size}px`
      pixel.style.height = `${size}px`
      pixel.style.left = `${x}px`
      pixel.style.bottom = "0px"
      pixel.style.backgroundColor = getRandomColor()

      card.appendChild(pixel)

      // Animate and remove
      setTimeout(() => {
        pixel.style.transform = `translateY(-${Math.random() * 50 + 20}px)`
        pixel.style.opacity = "0"

        setTimeout(() => {
          pixel.remove()
        }, 1000)
      }, i * 50)
    }
  }

  function getRandomColor() {
    const colors = ["var(--primary-color)", "var(--secondary-color)", "var(--accent-color)", "var(--success-color)"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Add form submission handling
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simulate form submission
      const submitButton = this.querySelector(".submit-button")
      const originalText = submitButton.textContent

      submitButton.textContent = "SENDING..."
      submitButton.disabled = true

      setTimeout(() => {
        submitButton.textContent = "SENT!"
        submitButton.style.backgroundColor = "var(--success-color)"

        // Reset form
        contactForm.reset()

        // Reset button after delay
        setTimeout(() => {
          submitButton.textContent = originalText
          submitButton.style.backgroundColor = ""
          submitButton.disabled = false
        }, 3000)
      }, 1500)
    })
  }
})

// Add this to your CSS
document.head.insertAdjacentHTML(
  "beforeend",
  `
  <style>
    .pixel-cursor {
      position: fixed;
      width: 15px;
      height: 15px;
      background-color: var(--accent-color);
      border-radius: 0;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: transform 0.1s ease;
    }
    
    .pixel-dust {
      position: absolute;
      border-radius: 0;
      pointer-events: none;
      transition: transform 1s ease, opacity 1s ease;
    }
      
  </style>
`,
)
