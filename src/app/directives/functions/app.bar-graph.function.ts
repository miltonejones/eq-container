import { Observable } from "rxjs";
export const GLOBAL_BAR_FFT = 64;
export function drawBarGraph(
  analyser: AnalyserNode,
  audio: HTMLAudioElement,
  width = 400,
  thisHeight = 40,
  fftSize = GLOBAL_BAR_FFT,
  factor = 8,
  fillStyle = '#406172'
): Observable<string> {
  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  canvas.width = width;
  canvas.height = thisHeight;
  const ctx = canvas.getContext("2d");

  return new Observable(observer => {
    const run = () => {
      if (audio?.paused) {
         window.requestAnimationFrame(run);
         return;
      }
      analyser.fftSize = fftSize;
      const bufferLength = analyser.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      if (ctx) {
        ctx.font = "10px Arial";
        ctx.fillStyle = fillStyle;
        ctx.fillRect(0, 0, width, thisHeight);
        const coords = frequencyCoords(dataArray, bufferLength, width / bufferLength, factor);
        optimizeRender(coords, ctx, canvas.height);
      }
      observer.next(canvas.toDataURL());
      window.requestAnimationFrame(run);
    };
    window.requestAnimationFrame(run);
  });
}

export function statsBarGraph(
  analyser: AnalyserNode,
  audio: HTMLAudioElement,
  width = 400,
  fftSize = GLOBAL_BAR_FFT,
  factor = 8
): Observable<any> {

  return new Observable(observer => {
    const run = () => {
      if (audio?.paused) {
         window.requestAnimationFrame(run);
         return;
      }
      analyser.fftSize = fftSize;
      const bufferLength = analyser.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      const coords = frequencyCoords(dataArray, bufferLength, width / bufferLength, factor);
      observer.next(collateCoords(coords));
      window.requestAnimationFrame(run);
    };
    window.requestAnimationFrame(run);
  });
}

export function frequencyCoords(dataArray: Uint8Array, bufferLength: number, barWidth: number, factor: number): any[] {
  const coords: any = [];
  let barHeight;
  let x = 0;
  for (var index = 0; index < bufferLength; index++) {
    barHeight = dataArray[index];
    const actualHeight = barHeight / factor;
    const fillStyle = "rgb(" + (barHeight + 100) + ", " + (255 - barHeight) + ", 50)";
    coords.push({
      index,
      fillStyle,
      x,
      actualHeight,
      barWidth
    })
    x += barWidth + 1;
  }  
  return coords;
}

export function optimizeRender(c: any[], ctx: any, canvasHeight: number) {
  const coords = collateCoords(c);
  coords.map(coord => {
    ctx.fillStyle = coord.fillStyle;
    ctx.fillRect(coord.x, canvasHeight - coord.actualHeight, coord.barWidth, coord.actualHeight);
  })
} 

export function collateCoords(coords: any[]): any[] {
  const out: any[] = [];
  coords.map(c => out[c.index] = c);
  return out;
}
