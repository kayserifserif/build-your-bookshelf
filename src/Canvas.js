import React, { useRef, useEffect } from 'react';

const INCH_PER_PAGE = 1 / 92.0;
const PIXELS_PER_INCH = 36.0;

// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

function Canvas(props) {

  const canvasRef = useRef(null);

  const draw = (ctx, canvas, mode, data, colors, img) => {
    // max width
    let maxWidth = 0;
    for (let pair of [["16px serif", data.title], ["12px serif", data.author], ["11px serif", data.publisher]]) {
      ctx.font = pair[0];
      for (let word of pair[1].split(" ")) {
        maxWidth = Math.max(maxWidth, ctx.measureText(word).width);
      }
    }

    if (mode === "colourBlock") {
      colourBlock(ctx, colors);
      text(ctx, data, maxWidth);
    } else if (mode === "colourGradient") {
      colourGradient(ctx, colors);
      text(ctx, data, maxWidth);
    } else if (mode === "coverCrop") {
      coverCrop(ctx, img, canvas.width);
    } else if (mode === "coverBlur") {
      coverBlur(ctx, img, canvas.width);
      text(ctx, data, maxWidth);
    }
  }

  const colourBlock = (ctx, colors) => {
    if (colors && colors.hasOwnProperty("vibrant")) {
      ctx.fillStyle = colors.darkVibrant;
    }
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  const colourGradient = (ctx, colors) => {
    let grad = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (colors && colors.hasOwnProperty("darkVibrant")) {
      grad.addColorStop(0, colors.darkVibrant);
      grad.addColorStop(1, colors.lightVibrant);
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  const coverCrop = (ctx, img, canvasWidth) => {
    ctx.drawImage(img, -(img.width - canvasWidth) * 0.5, 0);
  }

  const coverBlur = (ctx, img, canvasWidth) => {
    ctx.filter = "blur(4px)";
    ctx.drawImage(img, -(img.width - canvasWidth) * 0.5, 0);
    ctx.filter = "none";
  }

  const text = (ctx, data, maxWidth) => {
    const vertical = (maxWidth > data.pages * 0.3);

    ctx.fillStyle = "#ffffff";

    if (vertical) {
      ctx.textBaseline = "middle";

      ctx.save();
      ctx.font = "16px serif";
      ctx.translate(ctx.canvas.width * 0.5, ctx.canvas.height * 0.5);
      ctx.rotate((Math.PI / 180) * 90);
      ctx.textAlign = "left";
      ctx.fillText(data.title, -ctx.canvas.height * 0.5 + 20, 0);
      ctx.font = "12px serif";
      ctx.textAlign = "right";
      ctx.fillText(data.author, ctx.canvas.height * 0.5 - 50, 0);
      ctx.restore();
    } else {
      ctx.textAlign = "center";

      ctx.font = "16px serif";
      ctx.textBaseline = "top";
      let _title = data.title.split(" ");
      for (let i = 0; i < _title.length; i++) {
        ctx.fillText(_title[i], ctx.canvas.width * 0.5, 40 + 16 * i);
      }
      ctx.font = "12px serif";
      ctx.textBaseline = "bottom";
      let _author = data.author.split(" ");
      for (let i = 0; i < _author.length; i++) {
        ctx.fillText(_author[_author.length - 1 - i],
          ctx.canvas.width * 0.5, ctx.canvas.height - 60 - 12 * i);
      }
    }

    ctx.font = "11px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(data.publisher, ctx.canvas.width * 0.5, ctx.canvas.height - 20);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // let frameCount = 0;
    let animationFrameId;

    let img = new Image();
    img.src = props.data.path;
    img.onload = () => {
      let height = img.height;
      let thickness = props.data.pages * INCH_PER_PAGE * PIXELS_PER_INCH;
      canvas.height = height;
      canvas.width = thickness;
    }

    const render = () => {
      // frameCount++;
      draw(context, canvas, props.mode, props.data, props.colors, img);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [draw]);

  return (
    <canvas ref={canvasRef} {...props}></canvas>
  );
}

export default Canvas;