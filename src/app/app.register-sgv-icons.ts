import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export function registerSvgIcons() {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) return;

  const iconRegistry = inject(MatIconRegistry);
  const sanitizer = inject(DomSanitizer);

  const baseUrl = window.location.origin; // Agora o host é dinâmico!

  const icons = ['user', 'home', 'logout']; // coloque seus ícones aqui
  icons.forEach(icon => {
    iconRegistry.addSvgIcon(
      icon,
      sanitizer.bypassSecurityTrustResourceUrl(`${baseUrl}/assets/icons/${icon}.svg`)
    );
  });
}
