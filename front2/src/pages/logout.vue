<script>
    import { mapState } from "vuex";
    export default {
      methods: {
            logout() {
                 this.$store.dispatch('tryLogout')
                 this.$router.push('/login')
            }
        },

    beforeMount(){
        this.logout()
    },

  }
</script>

<template>
    <div class="min-h-full flex">
    </div>
</template>
