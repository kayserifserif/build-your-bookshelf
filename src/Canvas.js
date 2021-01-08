import React, { useRef, useEffect } from 'react';

function Canvas(props) {

  const canvasRef = useRef(null);

  const draw = (ctx, frameCount, mode, data, colors, image) => {
    let maxWidth = 0;
    ctx.font = "16px serif";
    for (let word of data.title.split(" ")) {
      maxWidth = Math.max(maxWidth, ctx.measureText(word).width);
    }
    ctx.font = "12px serif";
    for (let word of data.author.split(" ")) {
      maxWidth = Math.max(maxWidth, ctx.measureText(word).width);
    }
    ctx.font = "11px serif";
    for (let word of data.publisher.split(" ")) {
      maxWidth = Math.max(maxWidth, ctx.measureText(word).width);
    }

    if (mode === "colourBlock") colourBlock(ctx, colors);
    else if (mode === "colourGradient") colourGradient(ctx, colors);
    else if (mode === "coverCrop") coverCrop(ctx, image);
    else if (mode === "coverBlur") coverBlur(ctx, image);

    text(ctx, data, maxWidth);
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

  const coverCrop = (ctx, image) => {

  }

  const coverBlur = (ctx, image) => {

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
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount++;
      draw(context, frameCount, props.mode, props.data, props.colors, props.image);
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