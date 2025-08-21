import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.component.html',
  styleUrls: ['./wardrobe.component.css']
})
export class WardrobeComponent implements OnInit {
  ngOnInit(): void {
    const allFilterItems = document.querySelectorAll('.filter-item');
    const allFilterBtns = document.querySelectorAll('.filter-btn');

    window.addEventListener('DOMContentLoaded', () => {
      if (allFilterBtns[0] instanceof HTMLElement) {
        allFilterBtns[0].classList.add('active-btn');
      }
    });

    allFilterBtns.forEach((btn) => {
      if (btn instanceof HTMLElement) {
        btn.addEventListener('click', () => {
          this.showFilteredContent(btn);
        });
      }
    });
  }

  showFilteredContent(btn: HTMLElement): void {
    const allFilterItems = document.querySelectorAll('.filter-item');

    allFilterItems.forEach((item) => {
      if (item instanceof HTMLElement && item.classList.contains(btn.id)) {
        this.resetActiveBtn();
        btn.classList.add('active-btn');
        item.style.display = 'block';
      } else {
        if (item instanceof HTMLElement) {
          item.style.display = 'none';
        }
      }
    });
  }

  resetActiveBtn(): void {
    const allFilterBtns = document.querySelectorAll('.filter-btn');

    allFilterBtns.forEach((btn) => {
      if (btn instanceof HTMLElement) {
        btn.classList.remove('active-btn');
      }
    });
  }
}
