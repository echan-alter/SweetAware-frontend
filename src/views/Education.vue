<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Hero Section -->
      <div class="text-center mb-16 pt-12" data-aos="fade-down">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Diabetes Education Center
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Your comprehensive resource for understanding diabetes, its prevention, and management.
        </p>
      </div>

      <!-- Quick Links Section -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <button
          v-for="(section, index) in quickLinks"
          :key="index"
          @click="scrollToSection(section.id)"
          class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 border-2 hover:border-purple-500"
          :data-aos="'fade-right'"
          :data-aos-delay="100 * (index + 1)"
        >
          <i :class="section.icon + ' text-purple-600'"></i>
          <span class="font-medium text-gray-900 dark:text-white">{{ section.title }}</span>
        </button>
      </div>

      <!-- Interactive Tools Section -->
      <div id="interactive-tools" class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8" data-aos="fade-up">
          Interactive Tools
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Carbohydrate Counter
            </h3>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 mb-2">Select Food Item:</label>
              <select v-model="selectedFood" class="w-full p-2 border rounded-md dark:bg-gray-700">
                <option v-for="food in foodItems" :key="food.id" :value="food">
                  {{ food.name }}
                </option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 mb-2"
                >Portion Size (grams):</label
              >
              <input
                type="number"
                v-model="portionSize"
                class="w-full p-2 border rounded-md dark:bg-gray-700"
              />
            </div>
            <div class="bg-purple-100 dark:bg-purple-900 p-4 rounded-md">
              <p class="text-purple-800 dark:text-purple-200">
                Total Carbs: {{ calculateCarbs }} g
              </p>
            </div>
          </div>

          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Blood Sugar Log
            </h3>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 mb-2">Blood Sugar Level:</label>
              <input
                type="number"
                v-model="bloodSugar"
                class="w-full p-2 border rounded-md dark:bg-gray-700"
                placeholder="mg/dL"
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 mb-2">Time:</label>
              <select
                v-model="measurementTime"
                class="w-full p-2 border rounded-md dark:bg-gray-700"
              >
                <option value="before-breakfast">Before Breakfast</option>
                <option value="after-breakfast">After Breakfast</option>
                <option value="before-lunch">Before Lunch</option>
                <option value="after-lunch">After Lunch</option>
                <option value="before-dinner">Before Dinner</option>
                <option value="after-dinner">After Dinner</option>
                <option value="bedtime">Bedtime</option>
              </select>
            </div>
            <button
              @click="logBloodSugar"
              class="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Log Reading
            </button>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div id="faq" class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8" data-aos="fade-up">
          Frequently Asked Questions
        </h2>
        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            :data-aos="'fade-up'"
            :data-aos-delay="50 * (index + 1)"
          >
            <button
              @click="faq.isOpen = !faq.isOpen"
              class="w-full px-6 py-4 text-left flex justify-between items-center"
            >
              <span class="font-medium text-gray-900 dark:text-white">{{ faq.question }}</span>
              <i
                :class="[
                  'fas',
                  faq.isOpen ? 'fa-chevron-up' : 'fa-chevron-down',
                  'text-purple-600',
                ]"
              ></i>
            </button>
            <div v-show="faq.isOpen" class="px-6 pb-4">
              <p class="text-gray-600 dark:text-gray-400">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'Education',
  setup() {
    const quickLinks = [
      { id: 'interactive-tools', title: 'Interactive Tools', icon: 'fas fa-tools' },
      { id: 'faq', title: 'FAQ', icon: 'fas fa-question-circle' },
    ]

    const faqs = ref([
      {
        question: 'What are the early signs of diabetes?',
        answer:
          'Early signs include increased thirst, frequent urination, unexplained weight loss, extreme hunger, blurred vision, fatigue, and slow-healing sores.',
        isOpen: false,
      },
      {
        question: 'How often should I check my blood sugar?',
        answer:
          'The frequency depends on your type of diabetes and treatment plan. Typically, Type 1 diabetics check 4-10 times daily, while Type 2 diabetics might check less frequently.',
        isOpen: false,
      },
      {
        question: 'What foods should I avoid with diabetes?',
        answer:
          'Generally, limit sugary foods, refined carbohydrates, sweetened beverages, and foods high in saturated fats. Always consult your healthcare provider for personalized advice.',
        isOpen: false,
      },
      {
        question: 'Can diabetes be prevented?',
        answer:
          'Type 2 diabetes can often be prevented or delayed through healthy lifestyle choices including maintaining a healthy weight, regular physical activity, and a balanced diet.',
        isOpen: false,
      },
      {
        question: 'What is a normal blood sugar level?',
        answer:
          'Normal fasting blood sugar is less than 100 mg/dL. Two hours after eating, it should be less than 140 mg/dL. However, target ranges may vary based on individual circumstances.',
        isOpen: false,
      },
    ])

    // Interactive Tools Data
    const selectedFood = ref(null)
    const portionSize = ref(100)
    const foodItems = [
      { id: 1, name: 'White Rice', carbsPer100g: 28 },
      { id: 2, name: 'Apple', carbsPer100g: 14 },
      { id: 3, name: 'Bread', carbsPer100g: 49 },
      { id: 4, name: 'Potato', carbsPer100g: 17 },
      { id: 5, name: 'Banana', carbsPer100g: 23 },
      { id: 6, name: 'Pasta', carbsPer100g: 31 },
      { id: 7, name: 'Oatmeal', carbsPer100g: 12 },
    ]

    const calculateCarbs = computed(() => {
      if (!selectedFood.value) return 0
      return ((selectedFood.value.carbsPer100g * portionSize.value) / 100).toFixed(1)
    })

    const bloodSugar = ref('')
    const measurementTime = ref('before-breakfast')

    const logBloodSugar = () => {
      if (!bloodSugar.value) {
        alert('Please enter a blood sugar level')
        return
      }

      console.log('Logging blood sugar:', {
        level: bloodSugar.value,
        time: measurementTime.value,
        date: new Date(),
      })

      alert(`Blood sugar logged: ${bloodSugar.value} mg/dL at ${measurementTime.value}`)

      // Reset form
      bloodSugar.value = ''
      measurementTime.value = 'before-breakfast'
    }

    const scrollToSection = (id) => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }

    return {
      quickLinks,
      faqs,
      selectedFood,
      portionSize,
      foodItems,
      calculateCarbs,
      bloodSugar,
      measurementTime,
      logBloodSugar,
      scrollToSection,
    }
  },
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>