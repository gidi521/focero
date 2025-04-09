<script setup lang='ts'>
import { ref, reactive, onMounted, onUpdated, inject, computed, provide } from 'vue';
// components
import Timepiece from '../../components/Timepiece/index.vue'
import Header from '../../components/Header/index.vue'
// element
import { ElButton, ElMessage, ElDialog, ElInput, ElPopover } from 'element-plus'



onMounted(() => {
    let bgFlag = localStorage.getItem("backgroundItem") && JSON.parse(localStorage.getItem("backgroundItem"));
    if (bgFlag) {
        bgImg.value = bgFlag.bgSrc
    }

    Object.entries(import.meta.glob("../../assets/sound/*.{mp3,jpeg,gif,png}", { eager: true }))
        .map(([key, val]) => {
            let matched = key.match(/([A-Za-z0-9-_\s]+)\./i)[1];
            let newObj = {
                name: matched,
                soundSrc: val.default
            }
            soundUrlArr.value.push(newObj)
        })

    Object.entries(import.meta.glob("../../assets/sound/img/*.{jpg,png}", { eager: true }))
        .map(([key, val]) => {
            let matchName = key.match(/([A-Za-z0-9-_\s]+)\./i)[1];
            soundUrlArr.value.forEach(el => {
                if (el.name == matchName) el.imgUrl = val.default
                // 添加实例
                el.audio = new Audio(el.soundSrc);
                el.audio.addEventListener("ended", () => el.audio.play(), false);
                el.open = false;
            })
        })


    document.addEventListener('fullscreenchange', (e) => {
        if (document.fullscreenElement)  fullScreenFlag.value = false
        else fullScreenFlag.value = true
    });
})

// 
// onUpdated(()=>{
//     console.log('更新');

// })
/**
 * 白噪音
 */
const soundUrlArr = ref([])
const popoverFef = ref()
const clickCheck = (item) => {
    item.open = !item.open
    if (item.open) {  // 播放
        item.audio.look = true
        item.audio.play();
    } else {
        item.audio.pause()
    }
    // popoverFef.value.hide()
}
// reset
const onResetAudio = () => {
    soundUrlArr.value.map(el => {
        if (el.open) {
            el.open = false
            el.audio.pause()
        }
    })
}


//全屏
const fullScreen = inject('fullScreen');
const fullScreenFlag = ref(true)
const onFullScreen = () => {
    console.log('aaaonFullScreen');
    fullScreenFlag.value = false
    fullScreen()
}

const timepieceRef = ref()
const taskShow = ref(false)
const taskInp = ref('')
const onTask = () => {
    taskInp.value = ''
    taskShow.value = true
}
const onSubmit = () => {
    if (!taskInp.value) {
        return ElMessage({
            message: 'Warning, this is a warning message.',
            type: 'warning',
        })
    }
    timepieceRef.value.getTaskData(taskInp.value)
    taskShow.value = false
}


/**  
 * 背景
 * https://app.flocus.com/resources/images/themes/9fe35a4c509454b8f2a3.jpg
 */
const bgImg = ref('')
const backgroundStyle = computed(() => ({
    background: `url(${bgImg.value}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
}));

const handleBgCut = (item) => {
    localStorage.setItem('backgroundItem', JSON.stringify(item))
    bgImg.value = item.bgSrc
}
provide('bgCutFun', handleBgCut)
</script>

<template>
    <Header v-if="fullScreenFlag" msg="我的"></Header>

    <div>
        <!-- background: bgImg -->
        <div :style="backgroundStyle" class="container-fluid content-bg">
            <Timepiece :class="[fullScreenFlag?'':'fullScreenTime']" ref="timepieceRef"></Timepiece>

            <div class="footer-handle" v-if="fullScreenFlag">
                <div class="enter-cont">
                    <el-popover popper-style="background-color:rgba(48, 49, 51,.95);border-radius:20px;height:50vh;overflow: scroll;" placement="top"
                        effect="dark" :width="550" ref="popoverFef" trigger="click">
                        <template #reference>
                            <div class="handle-btn">
                                <span class="iconfont icon-a-5Jyinboyinpin"></span>
                            </div>
                        </template>
                        <template #default>
                            <div class="popover-content">
                                <div class="popover-head">
                                    Sounds
                                    <div @click="onResetAudio">
                                        <span class="iconfont icon-zhongxinjiazai"></span>
                                    </div>
                                </div>
                                <div class="popover-main">
                                    <div :class="[item.open ? 'actOpen' : '']" class="popover-box"
                                        @click="clickCheck(item)" v-for="(item, i) in soundUrlArr" :key="i">
                                        <img class="icon" :src="item.imgUrl" alt="">
                                        <div>{{ item.name }}</div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-popover>
                    <div class="handle-btn" @click="onTask">
                        <span class="iconfont icon-task2"></span>
                    </div>
                </div>
                <div class="enter-cont">
                    <div class="handle-btn" @click="onFullScreen">
                        <span class="iconfont icon-quanping"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="content-static">
            <section>
                <h1 v-t="'intro.HeroHeading'"></h1>
                <h3 v-t="'intro.Subheadline'"></h3>
            </section>
            <section>
                <h2 v-t="'intro.one.title'">What is the Nesto Timer?</h2>
                <p v-t="'intro.one.content'">
                    Nesto is a convenient Pomodoro timer with embedded music, tasks and notifications for desktop and
                    mobile devices. Save your tasks by signing up. "This app enables you to deeply focus on your tasks,
                    be it
                    creating, studying or working.
                    Uninterrupted music allows you to get in the “state of flow” even in a noisy environment."
                </p>
            </section>
            <section>
                <h2 v-t="'intro.two.title'">Features</h2>
                <ul>
                    <li v-t="'intro.two.list.li1'">Login to save progress</li>
                    <li v-t="'intro.two.list.li2'">Task list to track Pomodoros by task</li>
                    <li v-t="'intro.two.list.li3'">Support for mobile and desktop devices</li>
                    <li v-t="'intro.two.list.li4'">Background music during the Pomodoro phase</li>
                </ul>
            </section>
            <section>
                <h2 v-t="'intro.three.title'">Features</h2>
                <ul>
                    <li v-t="'intro.three.list.li1'">Login to save progress</li>
                    <li v-t="'intro.three.list.li2'">Task list to track Pomodoros by task</li>
                    <li v-t="'intro.three.list.li3'">Support for mobile and desktop devices</li>
                    <li v-t="'intro.three.list.li4'">Background music during the Pomodoro phase</li>
                </ul>
            </section>
            <section>
                <h2 v-t="'intro.four.title'">What is the Nesto Timer?</h2>
                <p v-t="'intro.four.content'"></p>
                <span v-t="'intro.four.content2'"></span>
                <ol>
                    <li v-t="'intro.four.list.li1'">Login to save progress</li>
                    <li v-t="'intro.four.list.li2'">Task list to track Pomodoros by task</li>
                    <li v-t="'intro.four.list.li3'">Support for mobile and desktop devices</li>
                    <li v-t="'intro.four.list.li4'">Background music during the Pomodoro phase</li>
                    <li v-t="'intro.four.list.li5'">Background music during the Pomodoro phase</li>

                    <li v-t="'intro.four.list.li6'">Background music during the Pomodoro phase</li>
                    <li v-t="'intro.four.list.li7'">Background music during the Pomodoro phase</li>

                </ol>
            </section>
            <section>
                <h2 v-t="'intro.five.title'"></h2>
                <p v-t="'intro.five.content'"></p>
            </section>
            <section>
                <h2 v-t="'intro.six.title'"></h2>
                <p v-t="'intro.six.content'"></p>
            </section>
            <section>
                <h2 v-t="'intro.seven.title'"></h2>
                <ol>
                    <li v-t="'intro.seven.list.li1'"></li>
                    <li v-t="'intro.seven.list.li2'"></li>
                    <li v-t="'intro.seven.list.li3'"></li>
                    <li v-t="'intro.seven.list.li4'"></li>
                    <li v-t="'intro.seven.list.li5'"></li>
                </ol>
            </section>
            <section>
                <h2 v-t="'intro.eight.title'"></h2>
                <span v-t="'intro.eight.content'"></span>
                <ol>
                    <li v-t="'intro.eight.list.li1'"></li>
                    <li v-t="'intro.eight.list.li2'"></li>
                </ol>
            </section>

        </div>
    </div>

    <el-dialog style="background-color: rgba(48, 49, 51, 0.95);" v-model="taskShow" width="500">
        <template #header>
            <div style="color: #fff;" v-t="'task.taskTitle'">Set Your Task</div>
        </template>
        <div class="dialog-inp">
            <el-input size="large" v-model="taskInp" style="margin-top: 16px"
                :placeholder="$t('task.inpPlaceholder')" />
        </div>
        <template #footer>
            <div class="dialog-footer">
                <div class="dialog-btn" @click="onSubmit" v-t="'confirm'"></div>
            </div>
        </template>
    </el-dialog>
</template>

<style lang='scss' scoped>
.fullScreenTime{
    &:deep(.pomodoro-durations){
        transform: scale(1.3);
        .form-check{
            padding: 6px 24px;
        }
    }
    &:deep(.pomodoro-timer){
        transform: scale(1.3);
        margin-top: 30px;
        margin-bottom: 30px;
    }
    &:deep(.pomodoro-clock-actions){
        transform: scale(1.3);
        .pomodoro-start{
            padding: 6px 20px;
        }
    }
}
.content-bg {
    height: 100vh;
    position: relative;
    transition: all .5s ease-in-out;
    background-color: rgba(48, 49, 51, 0.95) !important;
}

.content-static {
    padding: 100px 0px;
    line-height: 2;
    font-weight: 400;
    color: rgb(34, 34, 34);
    width: 80%;
    margin: 0 auto;
    max-width: 960px;
    box-sizing: border-box;
    user-select: text; /* Standard syntax */
    -webkit-user-select: text; /* Safari */
    -moz-user-select: text; /* Firefox */
    -ms-user-select: text; /* Internet Explorer/Edge */

    section {
        h1{
            // margin-bottom: 54px;
            font-weight: 300;
            font-size: 35px;
        }
        h3{
            font-weight: 300;
            font-size: 20px;
            margin-bottom: 54px;
        }
        h2 {
            // margin-bottom: 3rem;
            margin-bottom: 54px;
            font-weight: 300;
            font-size: 35px;
            position: relative;

            &::before {
                content: "";
                position: absolute;
                left: 0px;
                bottom: -25px;
                width: 50px;
                height: 4px;
                border-radius: 3px;
                background-color: rgb(30, 174, 219);
            }
        }

        h5 {
            padding-bottom: 54px;
        }

        p {
            padding-bottom: 45px;
        }
        span{
            display: inline-block;
            padding-bottom: 20px;
        }

        ol {
            margin-left: 16px;

            li {
                padding-bottom: 18px;
            }
        }

        ul {
            list-style: inside circle;

            li {
                padding-bottom: 18px;
            }
        }
    }
}

.footer-handle {
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px;

    .enter-cont {
        display: flex;
        align-items: center;

        .handle-btn {
            height: 40px;
            width: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            background-color: #2E2446;
            margin-left: 16px;
            transition: all 175ms ease-in-out;

            &:hover {
                background-color: #7432ff;
            }

            &:first-child {
                margin-left: 0;
            }

            .iconfont {
                font-size: 24px;
                color: #fff;
            }
        }


    }
}

.dialog-inp {
    :deep(.el-input__wrapper) {
        background-color: rgba(48, 49, 51, 0);

        input {
            color: #fff;
        }
    }
}

.dialog-footer {
    .dialog-btn {
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        user-select: none;
        // background-color: #fff;
        border: 1px solid #fff;
        border-radius: 500px;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        padding: 8px 10px;
        font-size: 16px;
        letter-spacing: 1px;
        min-width: 100px;
        cursor: pointer;
        color: #fff;

        &:hover {
            color: #fff;
            text-decoration: none;
            background-color: rgba(0, 0, 0, 0);
        }
    }
}

.popover-content {
    padding: 0 16px;
    box-sizing: border-box;

    .popover-head {
        font-weight: bold;
        padding: 20px 0;
        padding-top: 10px;
        font-size: 24px;
        border-bottom: 1px solid #666;
        display: flex;
        align-items: center;

        div {
            margin-left: 10px;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            opacity: .9;
            background-color: #7432ff;

            span {
                font-size: 16px;
                font-weight: 300;
            }
        }
    }

    .popover-main {
        display: flex;
        flex-wrap: wrap;

        .popover-box {
            width: 120px;
            padding: 20px 0;
            opacity: .6;

            // border: 1px solid red;
            &:hover {
                img {
                    transform: scale(1.15);
                }

                div {
                    transform: scale(1.15);
                }
            }

            img {
                object-fit: cover;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                display: block;
                margin: 0 auto;
                transition: all .2s 0s linear;
            }

            div {
                text-align: center;
                font-size: 14px;
                margin-top: 6px;
                transition: all .2s 0s linear;
            }
        }

        .actOpen {
            opacity: 1;
        }
    }
}
</style>