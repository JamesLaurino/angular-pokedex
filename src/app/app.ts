import {Component, computed, signal} from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone:true
})
export class App {

  name = signal("PiKachu");
  lives = signal(21);
  size = computed(() => {
    return this.lives() <= 15 ? "Petit" : this.lives() < 25 ? "Moyen" : "Grand"
  })

  incrementLive() {
    this.lives.update(n => n + 1);
  }

  decrementLive() {
    this.lives.update(n => n - 1);
  }
}
