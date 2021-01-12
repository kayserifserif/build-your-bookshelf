import React, { useRef, useEffect } from 'react';

const INCH_PER_PAGE = 1 / 92.0;
const PIXELS_PER_INCH = 36.0;

// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

function SpineCanvas(props) {

  const canvasRef = useRef(null);

  const draw = (ctx, canvas, mode, data, colors, img) => {
    // max width
    let maxWidth = 0;
    for (let pair of [["16px serif", data.title], ["12px serif", data.author_name[0]], ["11px serif", data.publisher[0]]]) {
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
      coverCrop(ctx, img);
    } else if (mode === "coverBlur") {
      coverBlur(ctx, img);
      text(ctx, data, maxWidth);
    }
  }

  const colourBlock = (ctx, colors) => {
    if (colors && colors.hasOwnProperty("darkVibrant")) {
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

  const coverCrop = (ctx, img) => {
    ctx.drawImage(img, -(img.width - ctx.canvas.width) * 0.5, 0);
  }

  const coverBlur = (ctx, img) => {
    ctx.filter = "blur(4px)";
    ctx.drawImage(img, -(img.width - ctx.canvas.width) * 0.5, 0);
    ctx.filter = "none";
  }

  const text = (ctx, data, maxWidth) => {
    // const vertical = (maxWidth > data.details.number_of_pages * 0.3);
    const vertical = (maxWidth > 200 * 0.3);

    ctx.fillStyle = "#ffffff";

    if (vertical) {
      ctx.save();
      ctx.translate(ctx.canvas.width * 0.5, ctx.canvas.height * 0.5);
      ctx.rotate((Math.PI / 180) * 90);
      ctx.textBaseline = "middle";

      ctx.font = "16px serif";
      ctx.textAlign = "left";
      ctx.fillText(data.title, -ctx.canvas.height * 0.5 + 20, 0);

      ctx.font = "12px serif";
      ctx.textAlign = "right";
      ctx.fillText(data.author_name[0], ctx.canvas.height * 0.5 - 50, 0);

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
      let _author = data.author_name[0].split(" ");
      for (let i = 0; i < _author.length; i++) {
        ctx.fillText(_author[_author.length - 1 - i],
          ctx.canvas.width * 0.5, ctx.canvas.height - 60 - 12 * i);
      }
    }

    ctx.font = "11px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(data.publisher[0], ctx.canvas.width * 0.5, ctx.canvas.height - 20);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // let frameCount = 0;
    let animationFrameId;

    let img = new Image();
    img.src = props.cover_url;
    img.onload = () => {
      let height = img.height;
      // let thickness = props.data.details.number_of_pages * INCH_PER_PAGE * PIXELS_PER_INCH;
      let thickness = 200 * INCH_PER_PAGE * PIXELS_PER_INCH;
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
    <canvas ref={canvasRef} {...props} onClick={props.handleAdd}></canvas>
  );
}

export default SpineCanvas;