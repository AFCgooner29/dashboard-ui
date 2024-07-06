<template>
  <div :class="{ popular: isPopular, card: true }">
    <div v-if="props.option.popular" class="most-popular">Most Popular</div>
    <div class="price-header">
      <div class="price">
        <div class="dollar-sign">$</div>
        {{ props.option.price }}
        <div class="per-month">/mo</div>
      </div>
      <div class="plan-name">
        {{ props.option.title }}
      </div>
    </div>
    <div class="divider"></div>
    <div
      class="feature"
      v-for="(feature, index) in props.option.features"
      :key="index"
    >
      <div v-if="Object.values(feature)[0]">
        <img :src="YesLogo" alt="true" />{{ Object.keys(feature)[0] }}
      </div>
      <div v-else class="inactive-feature">
        <img :src="NoLogo" alt="true" />{{ Object.keys(feature)[0] }}
      </div>
    </div>
    <button :class="isPopularButton" >Start Today</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import YesLogo from "../assests/check-circle.svg";
import NoLogo from "../assests/x-square.svg";
const props = defineProps({
  option: {
    type: Object,
    required: true,
  },
});
const isPopular: boolean = props.option.popular;
const isPopularButton: Object = computed(()=>{
  return props.option.popular ?  "cta popular-btn" : "cta";
})

</script>

<style scoped>
:root {
  --acent-color: #641bff;
  --heading-font-family: "Poppins", sans-serif;
  --body-font-family: "Lato", sans-serif;
}
.card {
  background-color: white;
  box-shadow: 0 7px 30px rgba(52, 31, 97, 0.1);
  padding: 2rem;
  flex-grow: 1;
  flex-basis: 0;
  max-width: 350px;
  border-radius: 8px;
}
.popular {
  background-color: #641bff;
  box-shadow: 0 7px 30px rgba(52, 13, 135, 0.3);
  color: white;
  margin-top: -1.5rem;
  padding-top: 3.5rem;
  margin-bottom: -1.5rem;
  padding-bottom: 3.5rem;
}
.price-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
}
.price {
  font-size: 3.5rem;
  display: flex;
}
.dollar-sign {
  font-size: 1.5rem;
  margin-top: 0.5rem;
  margin-right: 0.25rem;
}
.per-month {
  font-size: 0.75rem;
  align-self: flex-end;
  margin-bottom: 1.1rem;
  text-transform: uppercase;
}
.plan-name {
  text-transform: uppercase;
  font-size: 0.9rem;
  margin-top: 1rem;
  margin-bottom: 0;
}
.divider {
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.popular .divider {
  background-color: rgba(255, 255, 255, 0.2);
}
.feature{
  display: flex;
  align-items: center;
  margin: .5rem;
}
.feature img{
  height: 1.1em;
  width: 1.1em;
  margin-right: .5rem;
}
.inactive-feature{
  color: #999;
  text-decoration-line: line-through;
}
.most-popular{
  position: absolute;
  top: 2.5rem;
  left: 2.5rem;
  right: 2.5rem;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
}
.cta{
  background-color: #641bff;
  color: white;
  width:100%;
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-family: var(--body-font-family);
  font-weight: bold;
  border-radius: 4px;
  margin-top: 3rem; 
  transition: 100ms;
  transform: scale(1);
}
.popular-btn{
  background-color: white;
  color: #641bff;

}
.cta:hover, .cta:focus{
  transform: scale(1.1);
}
</style>
