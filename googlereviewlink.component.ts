/// <reference types="google.maps" />

import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
  inject,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { GoogleMapsModule } from '@angular/google-maps';
import { isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import QRCode from 'qrcode';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-googlereviewlink',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    GoogleMapsModule,
    ClipboardModule,
    MatSnackBarModule,
  ],
  templateUrl: './googlereviewlink.component.html',
  styleUrl: './googlereviewlink.component.scss',
})
export class GooglereviewlinkComponent implements AfterViewInit {

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  @ViewChild('canvas', { static: false }) canvas!: ElementRef; // Make it non-static

  placeId: string = '';
  qrData: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private titleService: Title,
    private metaService: Meta,
    private renderer: Renderer2
    ) {
      this.setSEO();
    }

  ngAfterViewInit() {
    this.addJsonLd();

    // Ensure it's running in the browser before accessing window
    if (
      isPlatformBrowser(this.platformId) &&
      window.google &&
      window.google.maps
    ) {
      const input = this.searchInput.nativeElement;
      const autocomplete = new google.maps.places.Autocomplete(input, {
        fields: ['place_id', 'geometry', 'formatted_address', 'name'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        this.getPlaceId(place);
      });
    } else {
      console.warn('Google Maps API not available on the server');
    }
  }

  getPlaceId(place: google.maps.places.PlaceResult) {
    if (place.place_id) {
      this.placeId = place.place_id;
    }
  }

  generate() {
    if (
      isPlatformBrowser(this.platformId) &&
      window.google &&
      window.google.maps
    ) {
      const input = this.searchInput.nativeElement;
      const autocomplete = new google.maps.places.Autocomplete(input, {
        fields: ['place_id', 'geometry', 'formatted_address', 'name'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        this.getPlaceId(place);
      });
    } else {
      console.warn('Google Maps API not available on the server');
    }
  }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  generateQRCode() {
    if (!this.placeId) return;

    this.qrData = `http://search.google.com/local/writereview?placeid=${this.placeId}`;

    // Ensure the canvas exists before trying to use it
    setTimeout(() => {
      if (this.canvas) {
        const canvasElement = this.canvas.nativeElement;
        QRCode.toCanvas(canvasElement, this.qrData, { width: 800 }, (error: any) => {
          if (error) console.error(error);
        });
      } else {
        console.warn('Canvas element not found');
      }
    }, 0);
  }

  downloadQRCode() {
    if (this.canvas) {
      const canvasElement = this.canvas.nativeElement;
      const image = canvasElement.toDataURL('image/png');
  
      // Create a temporary anchor element to trigger the download
      const link = document.createElement('a');
      link.href = image;
      link.download = 'qrcode.png';
      link.click();
    } else {
      console.warn('Canvas element not found');
    }
  }

  private setSEO() {
    this.titleService.setTitle('Google Review Link Generator | Create Shareable Links & QR Codes');
    this.metaService.addTags([
      { name: 'description', content: 'Easily generate a shareable Google Review link and QR code for your business. Help customers leave reviews quickly by scanning a QR code or clicking a link.' },
      { name: 'keywords', content: 'Google Review Link Generator, Shareable Review Link, Google Reviews, QR Code for Reviews, Customer Feedback Link' },
      { property: 'og:title', content: 'Google Review Link Generator' },
      { property: 'og:description', content: 'Generate a Google Review link and QR code for your business to collect customer feedback effortlessly.' },
      { property: 'og:image', content: 'https://toolteeno.com/assets/tools/google_reviews.svg' },
      { property: 'og:url', content: 'https://toolteeno.com/googlereviewlink' }
    ]);
  }

  private addJsonLd() {
    if (isPlatformBrowser(this.platformId)) {

      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Google Review Link Generator",
        "description": "Generate a shareable Google Review link and QR code for your business to collect customer feedback.",
        "url": "https://toolteeno.com/googlereviewlink",
        "potentialAction": {
          "@type": "ReviewAction",
          "target": "https://toolteeno.com/googlereviewlink"
        }
      };
  
      const script = this.renderer.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      this.renderer.appendChild(document.head, script);

    }
    
  }
}
