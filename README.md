# Google Review Link Generator

This is a standalone Angular component that generates shareable Google Review links and QR codes for businesses. It helps customers easily leave reviews by clicking a link or scanning a QR code.

## Features

- **Generate Google Review Links**: Find your business and generate a review link.
- **QR Code Generation**: Convert your review link into a scannable QR code.
- **Download as PNG**: Save the QR code as an image file.
- **Google Places Autocomplete**: Easily search and select your business.
- **SEO Optimized**: Meta tags and JSON-LD schema for better search engine visibility.

## Installation

1. Navigate to your Angular project's `src` folder:
   ```sh
   cd path/to/your-angular-project/src
   ```
2. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/google-review-link-generator.git
   ```
3. Import the component in `app.module.ts`:
   ```typescript
   import { GooglereviewlinkComponent } from './google-review-link/googlereviewlink.component';
   ```
4. Go to the root of your angular project and install the required dependencies:
   ```sh
   npm install @angular/common @angular/core @angular/forms @angular/platform-browser @angular/material @angular/google-maps @angular/cdk qrcode
   ```

## Usage

### Using the Component

Include it in your template:

```html
<app-googlereviewlink></app-googlereviewlink>
```

## How It Works

1. Search for your business in the input field.
2. Select your business from the autocomplete suggestions.
3. Click the **Generate Link** button to get your Google Review link.
4. Click the **Generate QR Code** button to create a scannable QR code.
5. Click **Download** to save the QR code as a PNG file.

## Technologies Used

- **Angular** (Standalone Component)
- **Google Maps API** (Places Autocomplete)
- **Angular Material** (UI Components)
- **QRCode.js** (QR Code Generation)
- **TypeScript**
- **SEO Optimization** (Meta tags & JSON-LD schema)

## SEO Optimization

The component sets dynamic metadata for better visibility on search engines:

- **Title & Description**
- **Open Graph Meta Tags** (for social sharing)
- **JSON-LD Schema** (for structured data)

## Demo

![Google Review Link Generator](https://toolteeno.com/assets/tools/google_reviews.svg)
https://toolteeno.com/google-review-link-generator


## License

This project is licensed under the MIT License.

---

Feel free to contribute by submitting pull requests or issues!

