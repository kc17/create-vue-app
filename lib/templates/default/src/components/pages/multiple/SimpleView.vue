<template lang="html">
  <div>
    SimpleVeiw
    <button @click="$emit('changeView', 'ComplexView')">
      changeView
    </button>
  </div>
</template>
