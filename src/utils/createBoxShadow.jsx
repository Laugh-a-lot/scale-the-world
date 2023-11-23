import React from "react";

function createBoxShadow(
  context,
  path,
  shadowColor = "rgba(255, 0, 0, 1)",
  glowColor = "255, 0, 0",
  glowAmount = 2,
  shadowBlur = 5,
  shadowOffsetX = 0,
  shadowOffsetY = 0
) {
  context.save();

  for (let i = 0; i < glowAmount; i++) {
    const alpha = 1 - (i + 1) / glowAmount;

    // context.fill(path);
    context.beginPath(),
      path(),
      (context.shadowOffsetY = shadowOffsetY),
      (context.shadowOffsetX = shadowOffsetX),
      (context.shadowBlur = shadowBlur * (i + 1)),
      (context.shadowColor = shadowColor),
      (context.fillStyle = shadowColor),
      // (context.fillStyle = "#f00"),
      context.fill();
  }

  context.restore();
}

export default createBoxShadow;
