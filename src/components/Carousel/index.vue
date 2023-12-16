<script>
// import Swiper core and required modules
import {
  A11y,
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade'

// Import Swiper styles
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    sliderPreview: {
      type: Number,
      default() {
        return 1
      },
    },
    space: {
      type: Number,
      default() {
        return 0
      },
    },

    carousels: {
      type: Array,
      default() {
        return []
      },
    },
  },

  setup() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade],
    }
  },
}
</script>

<template>
  <Swiper
    :modules="modules"
    :slides-per-view="sliderPreview"
    :space-between="space"
    navigation
    :pagination="{ clickable: true }"
    class="main-caro"
  >
    <SwiperSlide v-for="(item, i) in carousels" :key="i">
      <div
        class="single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px]"
        :style="{
          backgroundImage: `url(${item.img})`,
        }"
      >
        <div
          class="pt-20 container text-center px-4 slider-content h-full w-full min-h-[300px] rounded-md flex flex-col items-center justify-center text-white"
        >
          <div class="max-w-sm">
            <h2 v-if="item.title" class="text-xl font-medium text-white">
              {{ item.title }}
            </h2>
            <p v-if="item.description" class="text-sm">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style lang="scss">
.main-caro {
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-family: unset !important;
    @apply rtl:rotate-180;
  }
  .swiper-button-next:after {
    content: url("https://api.iconify.design/heroicons-outline/chevron-right.svg?color=white&width=24");
  }
  .swiper-button-prev:after {
    content: url("https://api.iconify.design/heroicons-outline/chevron-left.svg?color=white&width=24");
  }
  .swiper-pagination-bullet {
    height: 2px;
    width: 24px;
    @apply rounded-[1px] bg-white bg-opacity-70;
    &.swiper-pagination-bullet-active {
      @apply bg-opacity-100;
    }
  }
}
</style>
