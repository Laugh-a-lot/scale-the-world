export default function generateColorPalette(color1, color2, steps) {
    const interpolateColor = (color1, color2, factor) => (
      color1.map((channel, index) => Math.round(channel + factor * (color2[index] - channel)))
    );
  
    const hexToRgb = color => [
      parseInt(color.substring(1, 3), 16),
      parseInt(color.substring(3, 5), 16),
      parseInt(color.substring(5, 7), 16)
    ];
  
    const rgbToHex = rgb => `#${rgb.map(channel => (`0${channel.toString(16)}`).slice(-2)).join('')}`;
  
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
  
    const colorPalette = [];
    for (let i = 1; i <= steps; i++) {
      const factor = i / (steps + 1);
      const interpolatedColor = interpolateColor(rgb1, rgb2, factor);
      colorPalette.push(rgbToHex(interpolatedColor));
    }
  
    return [color1, ...colorPalette, color2];
  }
  


  