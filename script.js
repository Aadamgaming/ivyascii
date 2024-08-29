document.getElementById('fileInput').addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = function(e) {
        img.src = e.target.result;
    };

    reader.readAsDataURL(file);

    img.onload = function() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const asciiArt = convertToAscii(ctx, img.width, img.height);
        document.getElementById('ascii-art').textContent = asciiArt;
    };
}

function convertToAscii(ctx, width, height) {
    const asciiChars = "@%#*+=-:. ";
    const imgData = ctx.getImageData(0, 0, width, height);
    const pixels = imgData.data;

    let asciiArt = '';
    for (let y = 0; y < height; y += 6) { // Increase the step to scale down the image
        for (let x = 0; x < width; x += 3) { // Increase the step to scale down the image
            const index = (y * width + x) * 4;
            const r = pixels[index];
            const g = pixels[index + 1];
            const b = pixels[index + 2];
            const avg = (r + g + b) / 3;
            const charIndex = Math.floor(avg / 256 * asciiChars.length);
            asciiArt += asciiChars[charIndex];
        }
        asciiArt += '\n';
    }

    return asciiArt;
}
