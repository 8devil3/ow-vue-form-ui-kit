<template>
    <div class="relative">
        <button @click.stop="data.open = !data.open"
            class="flex items-center justify-between w-full text-sm leading-none text-left text-opacity-50 bg-transparent md:text-base focus:ring-2 focus:outline-none focus-visible:outline-none placeholder:text-placeholder disabled:placeholder-opacity-50 disabled:border-opacity-50"
            :class="[stateClasses.inputs.shapes['rounded'], stateClasses.inputs.mainColors['neutral1'], stateClasses.inputs.focusColors['primary']]"
        >
            {{ data.selectedDate.toLocaleDateString('it-IT', {year: 'numeric', month: props.monthStyle, day: '2-digit'}) }}

            <i class="text-xs md:text-sm fa-solid fa-calendar-days text-primary dark:text-primaryDark"></i>
        </button>

        <!-- overlay per click chiusura calendario -->
        <div v-if="data.open" @click="data.open = false" class="fixed inset-0 z-40 bg-transparent border-0"></div>
        <!-- / -->
    
        <div v-show="data.open" class="absolute left-0 z-50 flex items-stretch gap-4 px-4 pb-4 mt-2 origin-top-left border rounded-lg bg-neutral2 dark:bg-neutral2Dark border-primary top-full w-fit">
            <!-- calendario -->
            <div class="text-center">
                <div class="flex items-center justify-between h-12 px-1 border-b border-neutral1">
                    <button type="button" @click="prevMonth()" class="py-1 pr-2 focus:outline-none focus-visible:outline-none">
                        <i class="text-lg text-orange-500 fa-solid fa-chevron-left"></i>
                    </button>
    
                    <span class="font-semibold">
                        {{ months[data.newDate.getMonth()] }} {{ data.newDate.getFullYear() }}
                    </span>
                
                    <button type="button" @click="nextMonth()" class="py-1 pl-2 focus:outline-none focus-visible:outline-none">
                        <i class="text-lg text-primary fa-solid fa-chevron-right"></i>
                    </button>
                </div>
    
                <div class="grid grid-cols-7 pt-4 grid-rows-7 gap-0.5 place-items-center">
                    <span v-for="wd in weekdays" class="px-1 pb-1 font-medium">{{ wd }}</span>
                
                    <button
                        v-for="day in data.lastDayIndex()"
                        @click="selectDate(data.prevLastDay() - data.lastDayIndex() + day, data.newDate.getMonth() -1)"
                        :disabled="checkPast(data.prevLastDay() - data.lastDayIndex() + day, data.newDate.getMonth() -1)"
                        class="w-full p-1 font-normal rounded-full aspect-square opacity-40 focus:outline-none focus-visible:outline-none disabled:line-through disabled:hover:bg-transparent dark:disabled:hover:bg-transparent hover:bg-primary dark:hover:bg-primaryDark"
                        :class="[
                            todayClass(data.prevLastDay() - data.lastDayIndex() + day, data.newDate.getMonth() -1),
                            selectedDateClasses(data.prevLastDay() - data.lastDayIndex() + day, data.newDate.getMonth() -1)
                        ]"
                    >
                        {{ data.prevLastDay() - data.lastDayIndex() + day }}
                    </button>

                    <button
                        v-for="day in data.lastDay()"
                        @click="selectDate(day, data.newDate.getMonth())"
                        :disabled="checkPast(day, data.newDate.getMonth())"
                        class="w-full p-1 font-normal rounded-full aspect-square focus:outline-none focus-visible:outline-none disabled:line-through disabled:hover:bg-transparent dark:disabled:hover:bg-transparent hover:bg-primary dark:hover:bg-primaryDark disabled:opacity-40"
                        :class="[
                            todayClass(day, data.newDate.getMonth()),
                            selectedDateClasses(day, data.newDate.getMonth())
                        ]"
                    >
                        {{ day }}
                    </button>

                    <button
                        v-for="day in data.nextDays() +1"
                        @click="selectDate(day, data.newDate.getMonth() +1)"
                        :disabled="checkPast(day, data.newDate.getMonth() +1)"
                        class="w-full p-1 font-normal rounded-full aspect-square opacity-40 focus:outline-none focus-visible:outline-none disabled:line-through disabled:hover:bg-transparent dark:disabled:hover:bg-transparent hover:bg-primary dark:hover:bg-primaryDark"
                        :class="[
                            todayClass(day, data.newDate.getMonth() +1),
                            selectedDateClasses(day, data.newDate.getMonth() +1)
                        ]"
                    >
                        {{ day }}
                    </button>
                </div>
            </div>
            <!-- / -->
    
            <!-- orario -->
            <!-- <div class="flex flex-col h-full overflow-hidden text-center w-[60px] sm:w-[104px]">
                <div class="flex items-center justify-center font-semibold bg-gray-800 border-b border-gray-400 shrink-0 h-14">
                    Ora di inizio
                </div>
                <div class="my-2 overflow-y-auto noscrollbar">
                    <button v-for="hour in hours" class="block w-full p-2 transition-colors hover:bg-orange-500 hover:text-white hover:font-medium">{{ hour.text }}</button>
                </div>
            </div> -->
            <!-- / -->
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import stateClasses from './stateClasses.json';

const props = defineProps({
    locale: {
        type: String,
        default: 'it-IT'
    },
    modelValue: {
        type: Date,
        default: new Date()
    },
    pastDisabled: {
        type: Boolean,
        default: false
    },
    monthStyle: {
        type: String,
        default: '2-digit'
    }
});

const emits = defineEmits([
    'update:model-value'
])

const months = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
];

const weekdays = [
    'Mon',
    'Tue',
    'Wen',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
];

const data = reactive({
    newDate: new Date(),
    lastDay: ()=>{return new Date(data.newDate.getFullYear(), data.newDate.getMonth() +1, 0).getDate()},
    prevLastDay: ()=>{return new Date(data.newDate.getFullYear(), data.newDate.getMonth(), 0).getDate()},
    firstDayIndex: ()=>{return data.newDate.getDay()},
    lastDayIndex: ()=>{return new Date(data.newDate.getFullYear(), data.newDate.getMonth(), 0).getDay()},
    nextDays: ()=>{return 42 - data.lastDayIndex() - data.lastDay() -1},
    selectedDate: props.modelValue ? props.modelValue : new Date(),
    open: false
});

const nextMonth = () => {
   data.newDate = new Date(data.newDate.setMonth(data.newDate.getMonth() + 1));
}

const prevMonth = () => {
   data.newDate = new Date(data.newDate.setMonth(data.newDate.getMonth() - 1));
}

const selectDate = (day, month) => {
    data.selectedDate = new Date(data.newDate.getFullYear(), month, day);
    emits('update:model-value', new Date(data.selectedDate))
    // data.open = false;
}

const selectedDateClasses = (day, month) => {
    console.log(data.selectedDate, new Date(data.newDate.getFullYear(), month, day)) //TODO: data.selectedDate ritorna la data completa di ora e mmllisecondi, ma a me interessa solo la data...
    if(data.selectedDate === new Date(data.newDate.getFullYear(), month, day)){
        return 'border-2 border-primary dark:border-primaryDark bg-primary dark:bg-primaryDark';
    }
}

// const today = ()=>{
//    data.newDate = new Date();
// }

const todayClass = (day, month)=>{
    if(+new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) === +new Date(data.newDate.getFullYear(), month, day)){
        return 'rounded-full border-2 border-primary/50';
    }
}

const checkPast = (day, month) => {
    if(props.pastDisabled && (new Date(data.newDate.getFullYear(), month, day, 24) < new Date())){
        return true
    }
}

const hours = [
    {	
        text: '00:00'
    },
    {
        text: '00:30'
    },
    {
        text: '01:00'
    },
    {
        text: '01:30'
    },
    {
        text: '02:00'
    },
    {
        text: '02:30'
    },
    {
        text: '03:00'
    },
    {
        text: '03:30'
    },
    {
        text: '04:00'
    },
    {
        text: '04:30'
    },
    {
        text: '05:00'
    },
    {
        text: '05:30'
    },
    {
        text: '06:00'
    },
    {
        text: '06:30'
    },
    {
        text: '07:00'
    },
    {
        text: '07:30'
    },
    {
        text: '08:00'
    },
    {
        text: '08:30'
    },
    {
        text: '09:00'
    },
    {
        text: '09:30'
    },
    {
        text: '10:00'
    },
    {
        text: '10:30'
    },
    {
        text: '11:00'
    },
    {
        text: '11:30'
    },
    {
        text: '12:00'
    },
    {
        text: '12:30'
    },
    {
        text: '13:00'
    },
    {
        text: '13:30'
    },
    {
        text: '14:00'
    },
    {
        text: '14:30'
    },
    {
        text: '15:00'
    },
    {
        text: '15:30'
    },
    {
        text: '16:00'
    },
    {
        text: '16:30'
    },
    {
        text: '17:00'
    },
    {
        text: '17:30'
    },
    {
        text: '18:00'
    },
    {
        text: '18:30'
    },
    {
        text: '19:00'
    },
    {
        text: '19:30'
    },
    {
        text: '20:00'
    },
    {
        text: '20:30'
    },
    {
        text: '21:00'
    },
    {
        text: '21:30'
    },
    {
        text: '22:00'
    },
    {
        text: '22:30'
    },
    {
        text: '23:00'
    },
    {
        text: '23:30'
    },
]


// const x = new Date('2013-05-23');
// const y = new Date('2013-05-23');

// // less than, greater than is fine:
// console.log('x < y', x < y); // false
// console.log('x > y', x > y); // false
// console.log('x <= y', x <= y); // true
// console.log('x >= y', x >= y); // true
// console.log('x === y', x === y); // false, oops!

// // anything involving '==' or '===' should use the '+' prefix
// // it will then compare the dates' millisecond values

// console.log('+x === +y', +x === +y); // true

</script>


