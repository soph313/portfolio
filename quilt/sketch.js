const sketch1 = (p) => {
    let img = [];
    let patternColors = [
        "/assets/GreenFabric.png", 
        "/assets/Orange1Fabric.png", 
        "/assets/Orange2Fabric.png", 
        "/assets/Red1Fabric.png",  
        "/assets/Yellow1Fabric.png", 
        "/assets/Yellow2Fabric.png", 
        "/assets/Yellow3Fabric.png"
    ];
    let backgroundImg;
    const squareSize = 50; // Fixed size for squares
    let cols, rows; // Declare cols and rows

    p.preload = () => {
        for (let i = 0; i < patternColors.length; i++) {
            img[i] = p.loadImage(patternColors[i]);
        }
        backgroundImg = p.loadImage("/assets/quiltBackground.jpg");
    };

    p.setup = () => {
        console.log("Setup sketch1");
        let height = p.windowHeight / 100 * 58 * 0.90;
        let width = p.windowWidth / 100 * 50 * 1.2;
        let myCanvas1 = p.createCanvas(width, height);
        myCanvas1.parent('quiltPatternDiv');
        myCanvas1.id('quiltPattern1');
        
        // Initialize cols and rows after the canvas is created
        cols = Math.floor(width / squareSize) + 10;
        rows = Math.floor(height / squareSize) + 1;

        p.frameRate(10);
    };

    p.draw = () => {
        p.image(backgroundImg, 0, 0, p.width, p.height);
        let centerOffsetX = (p.width - cols * squareSize) / 2 - 50;

        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows + 1; row++) {
                let halfDrop = col % 2 === 0 ? 0 : squareSize / 2;
                let y = (row - 1) * squareSize + halfDrop;

                if (y < p.height && y >= -squareSize) {
                    let imageIndex = p.floor(p.random(0, img.length));
                    if (img[imageIndex]) {
                        let imgWidth = img[imageIndex].width;
                        let imgHeight = img[imageIndex].height;
                        let scaleFactor = squareSize / p.min(imgWidth, imgHeight);

                        let newWidth = imgWidth * scaleFactor;
                        let newHeight = imgHeight * scaleFactor;

                        let x = centerOffsetX + col * squareSize;
                        let yAdjusted = y - (newHeight - squareSize) / 2;

                        p.image(img[imageIndex], x, yAdjusted, newWidth, newHeight);
                    }
                }
            }
        }
    };
};

const sketch2 = (p) => {
    let img2 = [];
    let patternColors2 = [
        "/assets/GreenFabric.png", 
        "/assets/Orange1Fabric.png", 
        "/assets/Orange2Fabric.png", 
        "/assets/Red1Fabric.png",  
        "/assets/Yellow1Fabric.png", 
        "/assets/Yellow2Fabric.png", 
        "/assets/Yellow3Fabric.png"
    ];
    let backgroundImg2;
    const squareSize2 = 50; // Fixed size for squares
    let cols2, rows2; // Declare cols and rows

    p.preload = () => {
        for (let i = 0; i < patternColors2.length; i++) {
            img2[i] = p.loadImage(patternColors2[i]);
        }
        backgroundImg2 = p.loadImage("/assets/quiltBackground.jpg");
    };

    p.setup = () => {
        console.log("Setup sketch2");
        let width = p.windowHeight / 100 * 58 * 0.95;
        let height = p.windowWidth / 100 * 50 * 1.2;
        let myCanvas2 = p.createCanvas(width, height);
        myCanvas2.parent('quiltPatternDiv2');
        myCanvas2.id('quiltPattern2');

        cols2 = Math.floor(width / squareSize2) + 10;
        rows2 = Math.floor(height / squareSize2) + 1;

        p.noLoop();
    };

    p.draw = () => {
        p.image(backgroundImg2, 0, 0, p.width, p.height);
        let centerOffsetX = (p.width - cols2 * squareSize2) / 2 - 50;

        for (let col = 0; col < cols2; col++) {
            for (let row = 0; row < rows2 + 1; row++) {
                let halfDrop = col % 2 === 0 ? 0 : squareSize2 / 2;
                let y = (row - 1) * squareSize2 + halfDrop;

                if (y < p.height && y >= -squareSize2) {
                    let imageIndex = p.floor(p.random(0, img2.length));
                    if (img2[imageIndex]) {
                        let img2Width = img2[imageIndex].width;
                        let img2Height = img2[imageIndex].height;
                        let scaleFactor = squareSize2 / p.min(img2Width, img2Height);

                        let newWidth = img2Width * scaleFactor;
                        let newHeight = img2Height * scaleFactor;

                        let x = centerOffsetX + col * squareSize2;
                        let yAdjusted = y - (newHeight - squareSize2) / 2;

                        p.push();
                        p.translate(x + squareSize2 / 2, yAdjusted + squareSize2 / 2);
                        p.rotate(p.HALF_PI);
                        p.image(img2[imageIndex], -newWidth / 2, -newHeight / 2, newWidth, newHeight);
                        p.pop();
                    }
                }
            }
        }
    };
};

// Create instances of both sketches
new p5(sketch1, 'quiltPatternDiv');
new p5(sketch2, 'quiltPatternDiv2');
