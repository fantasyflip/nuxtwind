<template>
  <div>
    <Navbar />
    <div class="prevent-full-width mx-auto pt-16">
      <slot class="mx-2" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
$width-1: 550px;
$width-2: 650px;
$width-3: 700px;
$width-4: 800px;
$width-5: 900px;
$width-6: 1000px;

$breakpoint-width-1: 600px;
$breakpoint-width-2: 800px;
$breakpoint-width-3: 1200px;
$breakpoint-width-4: 1400px;
$breakpoint-width-5: 1604px;
$breakpoint-width-6: 1904px;

.prevent-full-width {
  width: 100%;
  @media (min-width: $breakpoint-width-1) {
    width: $width-1;
  }
  @media (min-width: $breakpoint-width-2) {
    width: $width-2;
  }
  @media (min-width: $breakpoint-width-3) {
    width: $width-3;
  }
  @media (min-width: $breakpoint-width-4) {
    width: $width-4;
  }
  @media (min-width: $breakpoint-width-5) {
    width: $width-5;
  }
  @media (min-width: $breakpoint-width-6) {
    width: $width-6;
  }
}
</style>
