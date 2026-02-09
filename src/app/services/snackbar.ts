import { Injectable } from '@angular/core';

export interface SnackbarConfig {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackbarElement: HTMLDivElement | null = null;

  show(config: SnackbarConfig) {
    const { message, type = 'info', duration = 3000 } = config;
    
    // Remove existing snackbar if any
    if (this.snackbarElement) {
      this.snackbarElement.remove();
      this.snackbarElement = null;
    }

    // Create snackbar element
    this.snackbarElement = document.createElement('div');
    this.snackbarElement.style.cssText = this.getSnackbarStyles(type);
    this.snackbarElement.textContent = message;
    
    // Add to body
    document.body.appendChild(this.snackbarElement);

    // Trigger animation
    setTimeout(() => {
      if (this.snackbarElement) {
        this.snackbarElement.style.opacity = '1';
        this.snackbarElement.style.transform = 'translateY(0)';
      }
    }, 10);

    // Auto remove after duration
    setTimeout(() => {
      if (this.snackbarElement) {
        this.snackbarElement.style.opacity = '0';
        this.snackbarElement.style.transform = 'translateY(-20px)';
        setTimeout(() => {
          this.snackbarElement?.remove();
          this.snackbarElement = null;
        }, 300);
      }
    }, duration);
  }

  private getSnackbarStyles(type: string): string {
    const colors = {
      success: '#16a34a',
      error: '#dc2626',
      info: '#2563eb',
      warning: '#ca8a04'
    };
    
    const bgColor = colors[type as keyof typeof colors] || colors.info;
    
    return `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 24px;
      background-color: ${bgColor};
      color: white;
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      font-weight: 500;
      font-size: 14px;
      z-index: 9999;
      opacity: 0;
      transform: translateY(-20px);
      transition: all 0.3s ease;
      max-width: 400px;
      word-wrap: break-word;
    `;
  }
}
