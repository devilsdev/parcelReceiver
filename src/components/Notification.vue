<template>
	<div
		class="notification is-warning parcel-notification"
	> {{ infotext }}</div>
</template>

<script>
export default {
  name: 'Notification',
  props: ['infotext']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.parcel-notification {
    position: fixed; 
    bottom: 0; 
    margin-bottom: 20px;
    width: 100%;
}
</style>
