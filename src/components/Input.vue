<template>
    <div class="relative" :class="{'pt-4' : props.shape === 'linear'}">
        <label
            v-if="props.shape === 'linear'"
            :for="props.id"
            class="absolute left-0 text-sm block transition-transform origin-top-left md:text-base leading-none"
            :class="[data.labelclasses, {'text-opacity-50' : props.disabled}]"
        >
            {{ props.label }} 

            <span v-show="props.required" class="text-danger">*</span>
        </label>

        <label
            v-else
            :for="props.id"
            class="text-xs md:text-sm leading-none text-label block dark:text-labelDark px-2 mb-1"
            :class="[{'text-opacity-50' : props.disabled}, {'px-3 md:px-4' : props.shape === 'pill'}]"
        >
            {{ props.label }} 

            <span v-show="props.required" class="text-danger">*</span>
        </label>
        
        <div class="relative">
            <input
                :type="props.type" 
                :id="props.id"
                :name="props.name"
                :autocomplete="props.autocomplete"
                :min="props.type === 'number' ? props.min : null"
                :max="props.type === 'number' ? props.max : null"
                :disabled="props.disabled"
                :pattern="props.pattern"
                :required="props.required"
                :autofocus="props.autofocus"
                :placeholder="props.shape === 'linear' ? null : props.placeholder"
                ref="input"
                :value="props.modelValue"
                @input="labelClasses($event.target.value), emits('update:model-value', $event.target.value)"
                class="w-full text-sm bg-transparent md:text-base focus:ring-2 focus:outline-none focus-visible:outline-none placeholder:text-placeholder disabled:placeholder-opacity-50 disabled:border-opacity-50 leading-none text-opacity-50"
                :class="[{'pr-6 md:pr-8' : props.icon}, stateClasses.inputs.shapes[props.shape], stateClasses.inputs.mainColors[props.mainColor], stateClasses.inputs.focusColors[props.focusColor]]"
                :aria-label="props.label"
                :aria-placeholder="props.placeholder"
                :aria-required="props.required"
            />
    
            <i
                class="text-xs md:text-sm absolute top-1/2 -translate-y-1/2"
                :class="[props.shape === 'linear' ? 'right-2' : 'right-4', props.icon, props.iconColor.charAt(0) === '#' ? 'iconColor' : props.iconColor], {'text-opacity-50' : props.disabled}"></i>
        </div>

        <div class="flex items-start justify-between mt-1 px-2" :class="{'px-3 md:px-4' : props.shape === 'pill'}">
            <span v-if="props.errorMsg" class="text-xs md:text-sm font-normal text-left text-danger">
                {{ props.errorMsg }}
            </span>
    
            <span
                v-if="props.charsCounter"
                class="text-[10px] text-right ml-auto"
                :class="props.modelValue && props.modelValue.length > props.charsCounter ? 'text-danger font-bold' : 'text-label dark:text-labelDark font-normal'"
            >
                {{ props.modelValue ? props.modelValue.length + '/' + props.charsCounter : '0/' + props.charsCounter }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import stateClasses from './stateClasses.json';

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: null
    },
    shape: {
        type: String,
        default: 'linear'
    },
    label: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null
    },
    mainColor: {
        type: String,
        default: 'neutral1'
    },
    focusColor: {
        type: String,
        default: 'primary'
    },
    placeholder: {
        type: String,
        default: null,
    },
    type: {
        type: String,
        default: 'text',
    },
    id: {
        type: String,
        default: null
    },
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: 100
    },
    autocomplete: {
        type: String,
        default: 'on'
    },
    autofocus: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String,
        default: null
    },
    iconColor: {
        type: String,
        default: 'text-success'
    },
    required: {
        type: Boolean,
        default: false
    },
    errorMsg: {
        type: String,
        default: null
    },
    disabled: {
        type: Boolean,
        default: false
    },
    charsCounter: {
        type: Number,
        default: null
    },
    pattern: {
        type: String,
        default: null
    }
})

const emits = defineEmits(['update:model-value']);

const data = reactive({
    labelclasses: 'top-5 md:top-4 text-placeholder',
})

const input = ref(null);

const labelClasses = (event) => {
    if(event === null || event === ''){
        data.labelclasses = 'top-5 md:top-4 text-placeholder'
    } else {
        data.labelclasses = 'scale-75 -translate-y-4 top-5 md:top-4 text-label dark:text-labelDark'
    }
}

onMounted(() => {
    labelClasses(props.modelValue);

    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

</script>

<style scoped>
.iconColor {
    color: v-bind(iconColor)
}
</style>
 