export default class Sprite {
  private path: string;
  private width: number;
  private height: number;

  private anim = 0;
  private animSpeed = 28;
  private maxAnim = 10;
  private texture: HTMLImageElement[] = [];
  private leftShadowTexture: HTMLImageElement[] = [];
  private rightShadowTexture: HTMLImageElement[] = [];

  private textureNames = ["stand", "walk"];

  // 0: stand
  // 1: walk
  private state = 0;
  private side = 0;

  private x = 100;
  private y = 100;

  private xSpeed = 0;
  private ySpeed = 0;

  private moveSpeed = 2;

  constructor(path: string, w: number, h: number) {
    this.width = w;
    this.height = h;
    this.path = path;
  }

  public load(): Promise<void[]> {
    const promises: Promise<void>[] = [];

    for (const name of this.textureNames) {
      let path = `/assets/sprites/${this.path}/${name}.png`;
      let res = new Promise<void>((resolve, reject) => {
        const newTexture = new Image();
        newTexture.onload = () => resolve();
        newTexture.onerror = reject;
        newTexture.src = path;
        promises.push(res);
        this.texture.push(newTexture);
      });

      path = `/assets/sprites/${this.path}/${name}_leftshadow.png`;
      res = new Promise<void>((resolve, reject) => {
        const newTexture = new Image();
        newTexture.onload = () => resolve();
        newTexture.onerror = reject;
        newTexture.src = path;
        promises.push(res);
        this.leftShadowTexture.push(newTexture);
      });

      path = `/assets/sprites/${this.path}/${name}_rightshadow.png`;
      res = new Promise<void>((resolve, reject) => {
        const newTexture = new Image();
        newTexture.onload = () => resolve();
        newTexture.onerror = reject;
        newTexture.src = path;
        promises.push(res);
        this.rightShadowTexture.push(newTexture);
      });
    }

    const resultArray = Promise.all(promises);
    return resultArray;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    let shadow = this.rightShadowTexture[this.state];
    if (this.side === 1) {
      shadow = this.leftShadowTexture[this.state];
    }

    ctx.drawImage(
      shadow,
      Math.floor(this.anim) * this.width,
      0,
      this.width,
      this.height,
      this.x + 3,
      this.y - 3,
      this.width,
      this.height
    );

    ctx.save();

    let w = this.width;
    let x = this.x;
    if (this.side === 1) {
      ctx.scale(-1, 1);
      w *= -1;
      x *= -1;
    } else {
      ctx.scale(1, 1);
    }

    ctx.drawImage(
      this.texture[this.state],
      Math.floor(this.anim) * this.width,
      0,
      this.width,
      this.height,
      x,
      this.y,
      w,
      this.height
    );
    ctx.restore();
  }

  public act() {
    this.anim += 0.3;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.anim >= this.maxAnim) {
      this.anim = 0;
    }
  }

  public goLeft() {
    this.side = 1;
    this.xSpeed = -this.moveSpeed;
    this.state = 1;
  }

  public goRight() {
    this.side = 0;
    this.xSpeed = this.moveSpeed;
    this.state = 1;
  }

  public goUp() {
    this.ySpeed = -this.moveSpeed;
    this.state = 1;
  }

  public goDown() {
    this.ySpeed = this.moveSpeed;
    this.state = 1;
  }

  public stop() {
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.state = 0;
  }
}
