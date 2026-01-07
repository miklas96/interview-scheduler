import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'interviews-scheduler',
        appId: '1:502700716450:web:a6f6aba55c5b48d94542fb',
        storageBucket: 'interviews-scheduler.firebasestorage.app',
        apiKey: 'AIzaSyAHJCJpFK4hW5ndmtrne1Sz-YR9uGy5rps',
        authDomain: 'interviews-scheduler.firebaseapp.com',
        messagingSenderId: '502700716450',
        measurementId: 'G-0XJBH1J4KW',
      })
    ),
    provideFirestore(() => getFirestore()),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
};
