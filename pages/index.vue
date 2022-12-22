<template>
  <div class="container">
    <canvas ref="canvas" width="600" height="600"></canvas>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Sprite from "@/assets/ts/sprite";
import Controller from "@/assets/ts/controller";

export default Vue.extend({
  data() {
    return {
      bomber: new Sprite("bomber", 158, 130),
      loaded: false,
      oldTimestamp: 0,
      lastTick: 0,
      frameDelay: 1000 / 60
    };
  },

  async mounted() {
    await this.init();
  },

  methods: {
    async init(): Promise<void> {
      await this.bomber.load();
      this.loaded = true;
      window.requestAnimationFrame(this.loop);
      const controller = new Controller(this.bomber);
      controller.init();
    },

    draw(): void {
      const canvas: any = this.$refs.canvas;
      const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
      if (canvas) {
        ctx.fillStyle = "#ccc";
        ctx.fillRect(0, 0, 600, 600); // effacer le canvas
        this.bomber.draw(ctx);
      }
    },

    act() {
      this.bomber.act();
    },

    loop(time: number) {
      const delta = time - this.oldTimestamp;
      this.oldTimestamp = time;

      this.lastTick += delta;
      if (this.lastTick >= this.frameDelay) {
        this.lastTick = 0;
        this.act();
        this.draw();
      }

      window.requestAnimationFrame(this.loop);
    }
  }
});
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
