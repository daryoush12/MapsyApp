<template>
    <div class = "header-div"><h1 class="header-title">{{title}}</h1></div>
</template>
<script>
export default {
    name: "Header",
    props: {
        title: String,
    }
}
</script>
<style>

.header-div {
    height: 50px;
    width: 100%;
    background-color:#eee;
}

.header-title {
    
}

</style>