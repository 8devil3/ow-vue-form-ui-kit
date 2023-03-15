<template>
    <div class="inline-block" :class="{'opacity-40' : props.disabled}">
        <input type="checkbox"
            :id="props.id"
            :name="props.name"
            :required="props.required"
            v-model="data.checkbox"
            hidden
            class="w-0 h-0 opacity-0"
        >
        
        <button type="button"
            @click="toggle()"
            class="relative w-8 h-4 transition-colors rounded-full focus:outline-none focus-visible:outline-none shadow-[inset_0px_0px_4px_rgba(0,0,0,0.5)]"
            :class="data.checkbox ? stateClasses.toggle.mainColors[props.mainColor] : 'bg-placeholder dark:bg-placeholderDark'"
            :disabled="props.disabled"
        >
            <div
                class="absolute w-5 h-5 transition-transform -translate-y-1/2 bg-white rounded-full top-1/2 shadow-[0px_0px_4px_rgba(0,0,0,0.75)]"
                :class="data.checkbox ? 'translate-x-4' : '-left-1'"
            >
            </div>
        </button>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import stateClasses from './stateClasses.json';

const props = defineProps({
    id: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null 
    },
    mainColor: {
        type: String,
        default: 'primary'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    required: {
        type: Boolean,
        default: true
    }
})

const data = reactive({
    checkbox: false
})

const toggle = () => {
    data.checkbox = !data.checkbox
}
</script>
