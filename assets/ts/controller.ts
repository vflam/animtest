import Sprite from "./sprite";

export default class Controller {
  private sprite: Sprite;

  private down(event: KeyboardEvent) {
    if (event.keyCode === 37) {
      this.sprite.goLeft();
    }
  }

  private up(event: KeyboardEvent) {
    if (event.keyCode === 37) {
      this.sprite.stop();
    }
  }

  constructor(sprite: Sprite) {
    this.sprite = sprite;
  }

  public init(): void {
    window.addEventListener(
      "keydown",
      event => {
        if (event.keyCode === 37) {
          this.sprite.goLeft();
        }

        if (event.keyCode === 39) {
          this.sprite.goRight();
        }

        if (event.keyCode === 38) {
          this.sprite.goUp();
        }

        if (event.keyCode === 40) {
          this.sprite.goDown();
        }
      },
      false
    );
    window.addEventListener(
      "keyup",
      () => {
        this.sprite.stop();
      },
      false
    );
  }
}
