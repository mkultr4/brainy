import { animation, style, animate, trigger, state, transition, useAnimation } from '@angular/animations';



export let fadeAnimation = animation(
  [
    style({ opacity: '{{ from }}' }),
    animate('{{ time }}', style({ opacity: '{{ to }}' }))
  ]
);

export let fadeLeftAnimation = animation(
  [
    style({ opacity: '0', transform: 'translateX({{from}})' }),
    animate('{{ time }}', style({ opacity: '1', transform: 'translateX({{from}})' }))
  ]
);

export const modalInvitationAnimation =
  trigger('modalInvitationAnimation', [
    state('visible', style({ opacity: 1 })),
    state('hidden', style({ opacity: 0, visibility: 'hidden' })),
    transition('visible => hidden', [

      useAnimation(fadeAnimation, { params: { from: 1, to: 0, time: '300ms 300ms' } }),
    ]),
    transition('hidden => visible', [
      style({ opacity: 0, visibility: 'visible' }),
      useAnimation(fadeAnimation, { params: { from: 0, to: 1, time: '300ms' } }),
    ])
  ]);

export const modalFadeAnimation =
  trigger('modalFadeAnimation', [
    state('visible', style({ opacity: 1 })),
    state('hidden', style({ opacity: 0, visibility: 'hidden' })),
    transition('visible => hidden', [

      useAnimation(fadeAnimation, { params: { from: 1, to: 0, time: '300ms 300ms' } }),
    ]),
    transition('hidden => visible', [
      style({ opacity: 0, visibility: 'visible' }),
      useAnimation(fadeAnimation, { params: { from: 0, to: 1, time: '300ms' } }),
    ])
  ]);

export const modalShareAnimation =
  trigger('modalShareAnimation', [
    state('visible', style({ opacity: 1 })),
    state('hidden', style({ opacity: 0, visibility: 'hidden' })),
    transition('visible => hidden', [

      useAnimation(fadeAnimation, { params: { from: 1, to: 0, time: '300ms 300ms' } }),
    ]),
    transition('hidden => visible', [
      style({ opacity: 0, visibility: 'visible' }),
      useAnimation(fadeAnimation, { params: { from: 0, to: 1, time: '300ms' } }),
    ])
  ]);

export const tourCarouselAnimation = trigger('tourCarouselAnimation',
  [
    state('*', style({ opacity: 1 })),
    state('void', style({ opacity: 0 })),
    transition('* => void', [
      useAnimation(fadeAnimation, { params: { from: 1, to: 0, time: '300ms 300ms' } }),
    ]),
    transition('void => *', [
      useAnimation(fadeAnimation, { params: { from: 0, to: 1, time: '300ms 300ms' } }),
    ])
  ]);
