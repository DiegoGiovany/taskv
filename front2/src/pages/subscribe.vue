<script>
    import { mapState } from "vuex";
    export default {
      methods: {
        resetForm() {
             this.$store.commit('setSubscribeError', false);
         },
        submit() { 
            this.$store.dispatch('trySubscribe', { 
                email: this.email, 
                password: this.password, 
                confirm_password: this.confirm_password,
                name: this.name }); 
             this.$router.push('/login')
        }
      },
      computed: {
        ...mapState(["subscribeError","subscribeSuccess"])
      },
      watch: {
        subscribeError(newVal, oldVal) {},
        subscribeSuccess(newVal, oldVal) {
            this.$router.push('/login')
        },
      },
        data() {
          return {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
          }
        },
        beforeMount(){
           this.resetForm()
        }

  }
</script>

<template>
    <div class="min-h-full flex">
        <div class="hidden lg:block relative w-0 flex-1">
            <img class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                alt="" />
        </div>

        <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="mx-auto w-full max-w-sm lg:w-96">
                <div>
                    <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Subscribe</h2>
                </div>

                <div class="mt-20 mb-40">

                    <div class="mt-6">
                        <form action="#" method="POST" class="space-y-6">
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700"> Name </label>
                                <div class="mt-1">
                                    <input v-model=name id="name" name="name" type="name"  required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                            </div>
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700"> Email </label>
                                <div class="mt-1">
                                    <input v-model=email id="email" name="email" type="email" autocomplete="email" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                            </div>

                            <div class="space-y-1">
                                <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
                                <div class="mt-1">
                                    <input v-model=password id="password" name="password" type="password" 
                                        required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                            </div>
                            <div class="space-y-1">
                                <label for="password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <div class="mt-1">
                                    <input v-model=confirm_password id="confirm_password" name="confirm_password" type="confirm_password" 
                                        required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                            </div>

                <!--             <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                    <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Lembrar meu login </label>
                                </div>

                                <div class="text-sm">
                                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> Esqueceu sua senha? </a>
                                </div>
                            </div> -->
                            <div v-if=subscribeError class="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3" role="alert">
                                <p class="font-bold">Fail to Register</p>
                                <p class="text-sm">Please check your data and try again</p>
                            </div>
                            <div>
                                <button @click.stop.prevent="submit()" type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register New Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<style scoped>
a {
    color: #42b983;
}
</style>