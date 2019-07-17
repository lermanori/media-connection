<template>
    <q-card borderd>
            <q-linear-progress stripe rounded style="height: 10px" :value="0.8" color="error" class="q-mt-sm" />
            <q-linear-progress stripe rounded style="height: 10px" :value="0.5" color="success" class="q-mt-sm" />
    </q-card>
</template>

<script>
export default {
    props:['args'],
}
</script>

<style scoped>

</style>
