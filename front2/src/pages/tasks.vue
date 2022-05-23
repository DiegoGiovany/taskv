<template>

  <!-- Background color split screen for large screens -->
  <div class="fixed top-0 left-0 w-1/2 h-full bg-white" aria-hidden="true" />
  <div class="fixed top-0 right-0 w-1/2 h-full bg-gray-50" aria-hidden="true" />
  <div class="relative min-h-full flex flex-col">
    <!-- Navbar -->
    <Disclosure as="nav" class="flex-shrink-0 bg-indigo-600" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <!-- Logo section -->
          <div class="flex items-center px-2 lg:px-0 xl:w-64">
            <div class="flex-shrink-0">
             TASKS FOR PROJECT {{ project_id }}
            </div>
          </div>

          <!-- Search section -->
          <div class="flex-1 flex justify-center lg:justify-end">
            <div class="w-full px-2 lg:px-6">
        
            </div>
          </div>
          <div class="flex lg:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-400 hover:text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
              <span class="sr-only">Open main menu</span>
              <MenuAlt1Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <!-- Links section -->
          <div class="hidden lg:block lg:w-80">
            <div class="flex items-center justify-end">
              <div class="flex">
            
              </div>
              <!-- Profile dropdown -->
              <Menu as="div" class="ml-4 relative flex-shrink-0">
                <div>
                  <MenuButton class=" flex text-sm  text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 ">
                    <span class="sr-only">Open user menu</span>
                    User
                  </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                      <a :href="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ item.name }}</a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel class="lg:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'text-white bg-indigo-800' : 'text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
        </div>
        <div class="pt-4 pb-3 border-t border-indigo-800">
          <div class="px-2 space-y-1">
            <DisclosureButton v-for="item in userNavigation" :key="item.name" as="a" :href="item.href" class="block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600">{{ item.name }}</DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <!-- 3 column wrapper -->
    <div class="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
      <!-- Left sidebar & main wrapper -->
      <div class="flex-1 min-w-0 bg-white xl:flex">
        <!-- Account profile -->
        <div class="xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-white">
          <div class="pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
            <div class="flex items-center justify-between">
              <div class="flex-1 space-y-8">
                <div class="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8">

                  <!-- Action buttons -->
                  <div class="flex flex-col sm:flex-row xl:flex-col">
                     <input v-model=taskName id="taskName" name="taskName" type="taskName" autocomplete="taskName" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-5" placeholder="Task Name" />

                    <button @click.stop.prevent="createTask()" type="button" class="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 xl:w-full">New Task</button>

                  </div>
                </div>
                <!-- Meta info -->
                <div class="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Projects List -->
        <div class="bg-white lg:min-w-0 lg:flex-1">
          <div class="pl-4 pr-6 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0">
            <div class="flex items-center">
              <h1 class="flex-1 text-lg font-medium">Tasks</h1>
              <Menu as="div" class="relative">
     <!--            <MenuButton class="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <SortAscendingIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Sort
                  <ChevronDownIcon class="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                </MenuButton> -->
                <MenuItems class="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Name</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Date modified</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Date created</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>
          <ul role="list" class="relative z-0 divide-y divide-gray-200 border-b border-gray-200">
            <li v-for="project in sortObjectByKeys(tasks)" :key="project._id" class="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6">
              <div class="flex items-center justify-between space-x-4">
                <!-- Repo name and link -->
                <div class="min-w-0 space-y-3">
                  <div class="flex items-center space-x-3">

                    <span class="block">
                      <h2 class="text-sm font-medium">
                        
                          <span class="absolute inset-0" aria-hidden="true" />
                         <label class="inline-flex items-center">
      <input type="checkbox" class="w-8 h-8 mr-5 rounded"  />
      {{ project.name }} </label> <span class="sr-only">{{ project.name ? 'Running' : 'Not running' }}</span>
                        
                      </h2>
                    </span>
                  </div>
                  
                </div>
                <div class="sm:hidden">
                  <ChevronRightIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <!-- Repo meta info -->
                <div class="hidden sm:flex flex-col flex-shrink-0 items-end space-y-3">
                    
                  <p class="flex text-gray-500 text-sm space-x-2">
                    <span>delete</span>
                    <span aria-hidden="true">&middot;</span>

                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
  BadgeCheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CollectionIcon,
  SearchIcon,
  SortAscendingIcon,
  StarIcon,
} from '@heroicons/vue/solid'
import { MenuAlt1Icon, XIcon } from '@heroicons/vue/outline'

const userNavigation = [
  { name: 'Sign out', href: '#' },
]

const activityItems = [
  { project: 'Workcation', commit: '2d89f0c8', environment: 'production', time: '1h' },
]
 import { mapState } from "vuex";
export default {
  props:
  [
    "project_id"
  ],
methods: {
     sortObjectByKeys(o) {
      if(o)
        return Object.keys(o).reverse().reduce((r, k) => (r[k] = o[k], r), {}) ;
      return {};
    },
    getTasks() {
        this.$socket.emit('getAllTasks', {project_id: this.project_id})
    },
    createTask() {
        this.$store.dispatch('createTask', { socket: this.$socket, projectId: this.project_id, taskName: this.taskName } ); 
    }
},
computed: {

        ...mapState(["tasks"])
      },
watch: {
        tasks(newVal, oldVal) {}
        },
data() {
          return {
            taskName: '',
          }
      },
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BadgeCheckIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CollectionIcon,
    MenuAlt1Icon,
    SearchIcon,
    SortAscendingIcon,
    StarIcon,
    XIcon,
  },
  beforeMount(){
    this.getTasks()
 },
  setup() {
    return {
      userNavigation,
      activityItems,
    }
  },
}
</script>