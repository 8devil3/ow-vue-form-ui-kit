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
            v-else-if="props.shape !== 'linear' && props.label"
            :for="props.id"
            class="text-xs md:text-sm leading-none text-label block dark:text-labelDark px-2 mb-1"
            :class="[{'text-opacity-50' : props.disabled}, {'pl-3 md:pl-4' : props.shape === 'pill'}]"
        >
            {{ props.label }} 

            <span v-show="props.required" class="text-danger">*</span>
        </label>

        <input type="text" :value="props.modelValue ? props.modelValue : props.defaultOption" :name="props.name" hidden>

        <div class="relative" :class="props.shape === 'linear' ? 'h-6 md:h-[29px]' : 'h-8 md:h-[38px]'">

            <button
                @click.stop="data.open = !data.open"
                class="w-full text-left z-10 absolute inset-0 appearance-none text-sm bg-transparent md:text-base focus:ring-2 focus:outline-none focus-visible:outline-none placeholder:text-placeholder disabled:placeholder-opacity-50 disabled:border-opacity-50 leading-none text-opacity-50 cursor-pointer pr-6 md:pr-8"
                :class="[stateClasses.inputs.shapes[props.shape], stateClasses.inputs.mainColors[props.mainColor], stateClasses.inputs.focusColors[props.focusColor]]"
                :aria-label="props.label"
                :aria-placeholder="props.defaultOption"
                :aria-required="props.required"
                ref="select"
            >
                {{ props.modelValue ? props.modelValue : props.defaultOption }}
            </button>

            <i
                class="text-xs md:text-sm absolute top-1/2 -translate-y-1/2 fa-solid fa-chevron-down text-primary dark:text-primaryDark"
                :class="[props.shape === 'linear' ? 'right-2' : 'right-4', {'text-opacity-50' : props.disabled}]"
            ></i>
    
            <Transition
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
            <div
                v-if="data.open"
                class="transition-opacity z-50 overflow-hidden absolute inset-x-0 shadow-lg border border-primary dark:border-primaryDark"
                :class="[stateClasses.inputs.listColors[props.listColor], props.shape !== 'linear' ? 'top-10 rounded-md' : 'top-8 rounded-none']"
            >
                <ul class="py-1 overflow-y-auto overscroll-contain max-h-80">
                    <li v-for="option in props.options">
                        <button
                            @click="emits('update:model-value', option), data.open = false, data.selectedValue = option"
                            class="w-full flex items-center justify-between text-left px-4 py-1 hover:bg-primary dark:hover:bg-primaryDark"
                        >
                            {{ option }}
                        </button>
                    </li>
                </ul>
            </div>
            </Transition>
        </div>

        <span v-if="props.errorMsg"
            class="mt-1 text-xs md:text-sm font-normal text-left text-danger"
            :class="[{'px-2' : props.shape === 'rounded'}, {'px-3 md:px-4' : props.shape === 'pill'}]"
        >
            {{ props.errorMsg }}
        </span>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import stateClasses from './stateClasses.json';


const props = defineProps({
    modelValue: [String, Number],
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
    labelColor: {
        type: String,
        default: 'label'
    },
    mainColor: {
        type: String,
        default: 'neutral1'
    },
    focusColor: {
        type: String,
        default: 'primary'
    },
    listColor: {
        type: String,
        default: 'neutral2'
    },
    defaultOption: {
        type: String,
        default: null,
    },
    options: {
        type: Array,
        default: null,
    },
    id: {
        type: String,
        default: null
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
})

const emits = defineEmits(['update:model-value']);

const data = reactive({
    labelclasses: 'top-5 md:top-4 text-label dark:text-labelDark',
    selectedValue: props.modelValue ? props.modelValue : props.defaultOption,
    open: false
})

const select = ref(null);

document.addEventListener('click', ()=>{data.open = false})

const labelClasses = (event) => {
    if(event === null || event === '' || props.defaultOption === null){
        data.labelclasses = 'top-5 md:top-4 text-label dark:text-labelDark'
    } else {
        data.labelclasses = 'scale-75 -translate-y-4 top-5 md:top-4 text-placeholder dark:text-placeholderDark'
    }
}

onMounted(() => {
    labelClasses(data.selectedValue);

    if (select.value.hasAttribute('autofocus')) {
        select.value.focus();
    }
});
</script>
 