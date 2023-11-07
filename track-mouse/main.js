const cursorTrail = document.querySelector("#cursor-trace");

document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Update the cursor-trace position
  cursorTrail.style.left = mouseX + "px";
  cursorTrail.style.top = mouseY + "px";

  // Create a new trail element
  const trailElement = document.createElement("div");
  trailElement.className = "trail-particle";
  trailElement.style.left = mouseX + "px";
  trailElement.style.top = mouseY + "px";

  // Add the trail element to the body
  document.body.appendChild(trailElement);

  // Remove the trail element after a short delay
  setTimeout(() => {
    document.body.removeChild(trailElement);
  }, 1000);
});
