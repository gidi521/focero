<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed, ref, watch, inject, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
// element-puls
import { ElNotification } from 'element-plus'
// i18n
import { i18n } from '../../plugins/i18n/index'

onMounted(() => {
    setCountdownTime()

    // 效验权限
    if (Notification.permission === 'default') {
        Notification.requestPermission();
    } else if (Notification.permission === 'denied') {
        ElNotification({
            title: i18n.global.t('settings.notifTitle'),
            message: i18n.global.t('settings.notifContent'),
            type: 'warning',
        })
    }
})

// 设置时间
let setAct = ref(0)
const setDateArr = ref([25, 5, 10, 1])
const setCountdownTime = (type = 0) => {
    pauseCountdown()
    setAct.value = type
    totalSeconds.value = setDateArr.value[type] * 60
}


/**
 * 倒计时
 */
let timer
// 当前倒计时时间（以秒为单位）
const totalSeconds = ref(0)
const isRunning = ref(false);
// 格式化显示的时间
const formattedTime = computed(() => {
    const hours = Math.floor(totalSeconds.value / 3600);
    const minutes = Math.floor((totalSeconds.value % 3600) / 60);
    const seconds = totalSeconds.value % 60;
    // ${String(hours).padStart(2, '0')}:
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

function notify($title, $options) {
    var notification = new Notification($title, $options);
    notification.onshow = function (event) { console.log('show : ', event); }
    notification.onclose = function (event) { console.log('close : ', event); }
    notification.onclick = function (event) {
        notification.close();
    }
}

// clickInit 
const startCountdown = () => {
    if (!isRunning.value) {
        isRunning.value = true;
        // playSound()
        // playSound('start'); // 播放开始音效
        timer = setInterval(() => {
            if (totalSeconds.value > 0) {
                totalSeconds.value -= 1;
            } else {
                playSound()
                notify(i18n.global.t('countDown.popupTitle'), { body: i18n.global.t('countDown.popupContent'), sticky: 'true' });//发起通知
                pauseCountdown();

                totalSeconds.value = setDateArr.value[setAct.value] * 60
            }
        }, 1000);
    } else {
        pauseCountdown();
    }
}
// pause
const pauseCountdown = () => {
    isRunning.value = false;
    // playSound('pause'); // 播放暂停音效
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
};
// 重新开始倒计时
let resetFlag = ref(false)  // 动画
const restartCountdown = () => {
    resetFlag.value = true
    setTimeout(() => {
        resetFlag.value = false
        pauseCountdown();
        totalSeconds.value = setDateArr.value[setAct.value] * 60
        // initializeCountdown();
        // playSound('reset'); // 播放重置音效
        // startCountdown();
    }, 600)
};

//  end-Audio
const playSound = () => {
    const audio = new Audio(new URL(`../../assets/sound/soundTime/finish.mp3`, import.meta.url).href);
    audio.play();
}

const inpRef = ref()
const taskFlag = ref(false)
const taskInpFlag = ref(false)
const contentTask = ref('')
const onBlur = (e) => {
    contentTask.value = e.target.value
    taskInpFlag.value = false
    if (contentTask.value == '') {
        taskFlag.value = false
    }
}
const onClickInp = async () => {
    taskInpFlag.value = true

    await nextTick;
    inpRef.value.focus()
}

const getTaskData = (data) => {
    contentTask.value = data
    taskFlag.value = true
}
defineExpose({
    getTaskData
});
</script>

<template>
    <div class="content-clock">
        <div class="task-cont" v-if="taskFlag">
            <div class="task-inp">
                <input v-if="taskInpFlag" v-model="contentTask" ref="inpRef" type="text" @blur="onBlur">
                <div v-else class="task-txt">{{ contentTask }}</div>
            </div>
            <div @click="onClickInp" class="iconfont icon-bianji1"></div>
        </div>
        <div class="pomodoro-durations">
            <div class="form-check" :class="[setAct == 0 ? 'act-check' : '']" @click="setCountdownTime(0)"
                v-t="'countDown.opt1'">
            </div>
            <div class="form-check" :class="[setAct == 1 ? 'act-check' : '']" @click="setCountdownTime(1)"
                v-t="'countDown.opt2'"></div>
            <div class="form-check" :class="[setAct == 2 ? 'act-check' : '']" @click="setCountdownTime(2)"
                v-t="'countDown.opt3'"></div>
        </div>
        <div class="pomodoro-timer">{{ formattedTime }}</div>
        <div class="pomodoro-clock-actions">
            <button class="pomodoro-start" @click="startCountdown">{{ isRunning ?
                $t('countDown.switch2') : $t('countDown.switch1')
            }}</button>
            <button class="pomodoro-stop" @click="restartCountdown">
                <span :class="[resetFlag ? 'action-rotate' : '']" class="iconfont icon-zhongxinjiazai"></span>
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@media screen and (max-width: 600px) and (min-width: 300px) {
    .content-clock {
        .pomodoro-durations {
            .form-check {
                padding: 6px 12px !important;
                font-size: 16px !important;
            }
        }

        .pomodoro-timer {
            font-size: 80px !important;
        }

        .pomodoro-clock-actions {
            .pomodoro-start {
                min-width: 100px !important;
                font-size: 19px !important;
                padding: 4px 20px !important;
            }
            .iconfont {
            font-size: 30px !important;
        }

            .pomodoro-stop {}
        }
    }
}

.content-clock {
    position: relative;
    left: 50%;
    top: 49%;
    transform: translate(-50%, -50%);

    .task-cont {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 24px;
        color: #fff;

        .task-inp {
            display: flex;

            input {
                flex: 1;
                color: #fff;
                border: 0;
                text-align: center;
                padding: 6px 0;
                min-width: 100px;
                font-size: 20px;
                width: auto !important;
                border-bottom: 1px solid #fff;
                background-color: rgba(0, 0, 0, 0);
            }

            .task-txt {
                font-size: 24px;
            }
        }

        .iconfont {
            font-size: 24px;
            margin-left: 10px;
        }
    }

    .pomodoro-durations {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;

        .form-check {
            margin-right: 18px;
            display: inline-block;
            color: #fff;
            text-align: center;
            vertical-align: middle;
            user-select: none;
            background-color: rgba(0, 0, 0, 0);
            border: 1px solid #fff;
            border-radius: 500px;
            transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
            padding: 12px 20px;
            font-size: 20px;
            // text-transform:capitalize

            &:hover {
                color: #000;
                text-decoration: none;
                background-color: #fff;
            }

            &:last-child {
                margin: 0;
            }
        }

        .act-check {
            color: #000;
            text-decoration: none;
            background-color: #fff;
        }
    }

    .pomodoro-timer {
        font-size: 130px;
        display: flex;
        justify-content: center;
        color: #fff;
    }

    .pomodoro-clock-actions {
        display: flex;
        justify-content: center;

        .pomodoro-start {
            display: inline-block;
            text-align: center;
            vertical-align: middle;
            user-select: none;
            background-color: #fff;
            border: 1px solid #fff;
            border-radius: 500px;
            transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
            padding: 10px 20px;
            font-size: 22px;
            letter-spacing: 1px;
            // text-transform: lowercase;
            min-width: 130px;

            &:hover {
                color: #fff;
                text-decoration: none;
                background-color: rgba(0, 0, 0, 0);
            }
        }

        .iconfont {
            color: #fff;
            font-size: 40px;
        }

        @keyframes spin {
            from {
                transform: rotate(0deg);
            }

            /* to动画的结束位置 也可以使⽤100%*/
            to {
                transform: rotate(360deg);
            }
        }



        .pomodoro-stop {
            display: block;
            margin: 0 20px;
        }

        .action-rotate {
            display: block;
            animation-name: spin;
            transform-origin: center;
            animation-duration: 1s;
            animation-fill-mode: forwards;
            animation-direction: normal;
        }

        .pomodoro-setting {}
    }
}
</style>
