import { Observable } from "rxjs";

export function drawLineGraph(
  analyser: AnalyserNode,
  audio: HTMLAudioElement,
  fillStyle = '#406172',
  width = 400,
  height = 40,
  fftSize = 1024
): Observable<string> {
  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  console.log('fillStyle = "%s"', fillStyle);
  return new Observable(observer => {
    const clear = () => {
      if (ctx) {
        ctx.fillStyle = fillStyle;
        ctx.fillRect(0, 0, width, height);
        window.requestAnimationFrame(run);
      }
    }
    const run = () => {
      if (audio?.paused) {
         window.requestAnimationFrame(clear);
         return;
      }
      analyser.fftSize = fftSize;
      analyser.getByteTimeDomainData(dataArray);
      const colors = ["yellow", "orange", "lime", "white"];
      if (ctx) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillStyle = fillStyle;
        ctx.fillRect(0, 0, width, height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.beginPath();

        const sliceWidth = (width * 1.0) / bufferLength;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
      }
      observer.next(canvas.toDataURL());
      window.requestAnimationFrame(run);
    };
    window.requestAnimationFrame(run);
  });
}
