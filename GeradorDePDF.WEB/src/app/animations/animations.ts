import { animate, state, style, transition, trigger } from '@angular/animations';

export const rotateAnimation = trigger('rotateAnimation', [
  state('open', style({
    transform: 'rotate(180deg)'
  })),
  state('closed', style({
    transform: 'rotate(0deg)'
  })),
  transition('open <=> closed', [
    animate('0.5s')
  ])
]);
