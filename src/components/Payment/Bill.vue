<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import logo from '~/assets/images/logo.png'
</script>

<template>
  <div class="w-80 flex flex-col justify-center items-center">
    <Logo :image="logo" class="w-3/4 max-w-[384px]" />
    <div class="flex flex-col justify-center items-center gap-2">
      <h4 class="font-semibold">
        Business Name
      </h4>
    </div>
    <div class="flex flex-col gap-3 border-b py-6 text-md">
      <p class="flex justify-between">
        <span class="text-gray-400">Receipt No.:</span>
        <span>#5033</span>
      </p>
      <p class="flex justify-between">
        <span class="text-gray-400">Order Number:</span>
        <span>Dine-in</span>
      </p>
      <p class="flex justify-between">
        <span class="text-gray-400">Customer:</span>
        <span>John Doe</span>
      </p>
    </div>
    <div class="flex flex-col gap-3 pb-6 pt-2 text-md">
      <table class="w-full text-left">
        <thead>
          <tr class="flex">
            <th class="w-full py-2">
              Product
            </th>
            <th class="min-w-[44px] py-2">
              QTY
            </th>
            <th class="min-w-[44px] py-2">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="flex">
            <td class="flex-1 py-1">
              Plan
            </td>
            <td class="min-w-[44px]">
              1
            </td>
            <td class="min-w-[44px]">
              $12
            </td>
          </tr>
        </tbody>
      </table>
      <div class=" border-b border border-dashed" />
      <div class="py-4 justify-center items-center flex flex-col gap-2">
        <p class="flex gap-2">
          info@example.com
        </p>
        <p class="flex gap-2">
          +234XXXXXXXX
        </p>
      </div>
    </div>
  </div>
</template>
