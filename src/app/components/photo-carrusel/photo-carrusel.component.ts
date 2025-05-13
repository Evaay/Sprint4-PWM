import { Component } from '@angular/core';

@Component({
  selector: 'app-photo-carrusel',
  templateUrl: './photo-carrusel.component.html',
  styleUrls: ['./photo-carrusel.component.scss'],
})
export class PhotoCarruselComponent {
  currentSlide = 0;

  images = [
    {
      src: 'https://media.istockphoto.com/id/1332486323/photo/big-secret-young-arab-man-sharing-news-with-his-excited-girlfriend.jpg?s=612x612&w=0&k=20&c=akWDGr3R82lMglE7dCkIMbwVH9BQzu9wTxC5mZ0yB8k=',
      alt: 'Imagen 1'
    },
    {
      src: 'https://www.shutterstock.com/image-photo/young-couple-two-friends-family-600nw-2296745393.jpg',
      alt: 'Imagen 2'
    },
    {
      src: 'https://www.shutterstock.com/image-photo/portrait-optimistic-girl-wavy-hairstyle-600nw-2461362537.jpg',
      alt: 'Imagen 3'
    }
  ];
  $index: any;

  showSlide(index: number): void {
    this.currentSlide = index;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }
}
