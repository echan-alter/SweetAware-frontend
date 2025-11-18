<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black opacity-50"></div>

    <!-- Modal -->
    <div class="flex items-center justify-center min-h-screen p-4">
      <div
        class="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full mx-auto p-6"
      >
        <!-- Close Button -->
        <button
          @click="$emit('close')"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <i class="fas fa-times text-xl"></i>
        </button>

        <div class="text-center">
          <div
            class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <i class="fas fa-lock text-purple-600 dark:text-purple-400 text-xl"></i>
          </div>

          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Authentication Required
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Please log in or create an account to {{ action }}.
          </p>

          <div class="flex flex-col space-y-4">
            <router-link
              to="/login"
              class="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              @click="$emit('close')"
            >
              Sign In
            </router-link>

            <router-link
              to="/register"
              class="px-6 py-3 border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900 font-medium rounded-lg transition-colors"
              @click="$emit('close')"
            >
              Create Account
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthRequiredModal',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  emits: ['close'],
}
</script>
