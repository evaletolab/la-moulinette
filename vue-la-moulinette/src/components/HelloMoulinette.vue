<template>
    <h1 v-if="visible">hello {{name}} </h1>
</template>


<script>
export default {
    name: 'HelloMoulinette',
    props: {
        name: String,
        visible: Boolean
    }
}
</script>