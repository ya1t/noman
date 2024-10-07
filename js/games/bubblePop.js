const sound = "https://dl.sndup.net/k94y/bubblewrap%20(1).mp3";

document.addEventListener("DOMContentLoaded", init);

function init() {
  const wrapper = document.querySelector("#grid"),
        button = document.querySelector("button"),
        popSound = new Howl({
          src: [sound],
          autoplay: false,
          loop: false,
          volume: 0.85
        });

  let fresh = true;

  // Load the 1000 bubble wrap checkboxes
  for (let i = 0; i < 1000; i++) {
    const degrees = Math.floor(Math.random() * 361);
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = "input" + i;
    input.name = "input" + i;
    input.placeholder = "Input " + (i + 1);
    input.style.setProperty("--rotation-degrees", `${degrees}deg`);
    wrapper.appendChild(input);
  }

  // When sound has loaded, hide loading message
  popSound.once("load", () => {
    const loading = document.querySelector(".loading");
    if (loading) loading.classList.add("hide");
  });

  // When bubble container is clicked, play pop sound
  wrapper.addEventListener("click", (event) => {
    if (event.target.type === "checkbox" && event.target.checked) {
      popSound.play();
      if (fresh) button.classList.remove("hidden");
    }
  });

  // Reset bubbles on button click
  button &&
    button.addEventListener("click", () => {
      const bubs = document.querySelectorAll("input[type=checkbox]");
      bubs.forEach((bub) => {
        bub.checked = false;
        button.classList.add("hidden");
      });
    });
}
