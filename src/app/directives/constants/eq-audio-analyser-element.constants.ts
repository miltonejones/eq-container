import { Observable } from "rxjs";
export const fullGrid = (color = '#406172'): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 40;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    for (let y = 0; y < canvas.height; y += 4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    ctx.font = "10px Rubik";
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText(APP_NAME, canvas.width - 48, canvas.height - 4);
  }
  return canvas.toDataURL();
};
export const setStyle = (el: HTMLElement, styles: { [p: string]: string }) => {
  for (var n in styles) el.style[n as any] = styles[n];
}
export const createElement = (name: string, styles: { [p: string]: string }): HTMLElement => {
  const el = document.createElement(name);
  for (var n in styles) el.style[n as any] = styles[n];
  return el;
}
export const stopWatch = (ob: Observable<any>): Observable<any> => {
  return new Observable(observer => {
    const then = new Date().getTime();
    ob.subscribe((data: any) => {
      observer.next({
        elapsed: new Date().getTime() - then,
        data
      })
    })
  })
}
export const APP_NAME = 'Amplify!';
export const EQ_ELEMENT_CSS = {
  position: 'relative',
  backgroundImage: 'none',
  overflow: 'hidden'
};
export const GRID_MASK_CSS = {
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '400px',
  height: '40px',
  color: 'white',
  padding: '4px'
};