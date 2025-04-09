<script setup lang='ts'>
import { ref, reactive, computed, onMounted, inject } from 'vue';
import { useRoute, useRouter } from "vue-router";
// element
import { ElDrawer } from 'element-plus'
// i18n
import { messagesData } from '../../../plugins/i18n/index'

const bgArr = ref([])
onMounted(() => {
    Object.entries(import.meta.glob("../../../assets/image/background/*.{png,jpg,gif}", { eager: true }))
        .map(([key, val]) => {
            let matched = key.match(/([A-Za-z0-9-_\s]+)\./i)[1];
            let newObj = {
                name: matched,
                bgSrc: val.default
            }
            bgArr.value.push(newObj)
        })
    let bgCache = localStorage.getItem("backgroundItem");
    if (!bgCache) localStorage.setItem('backgroundItem', JSON.stringify(bgArr.value[0]))


    // 语言包缓存
    let langFlag = localStorage.getItem("languageKey");
    console.log('langFlag',langFlag);
    
    if (langFlag) langIndex.value = langFlag
    else langIndex.value = 'en'
})


// 语言包切换
const langIndex = ref()
const onLanguage = (item: any, key: any) => {
    if (langIndex.value != key) {
        langIndex.value = key
        localStorage.setItem("languageKey", key)
        window.location.reload()
    }
}


const drawer = ref(false)
const bgCutFun = inject('bgCutFun');
const onBgCut = (item) => {
    bgCutFun(item)
}

</script>

<template>
    <div class="d-flex justify-content-end align-items-center actions">
        <div class="icon-box ">
            <span class="iconfont icon-duoyuyanyingwen"></span>
            <transition name="dropdown">
                <div class="skin-cont">
                    <div class="skin" :class="[langIndex == key ? 'act-skin' : '']" v-for="(item, key) in messagesData"
                        :key="key" @click="onLanguage(item, key)">
                        <span>{{ item.langName }}</span>
                    </div>
                </div>
            </transition>

        </div>
        <div class="icon-box " @click="drawer = true">
            <span class="iconfont icon-shezhitubiao1"></span>
        </div>
        <el-drawer style="background-color: rgba(48, 49, 51, 0.95);" v-model="drawer" :append-to-body="true"
            size="420px" header-class="aa">
            <template #header>
                <div style="color: #fff;">{{ $t('bg.bgTitle') }}</div>
            </template>
            <div class="content-theme">
                <div class="theme-cont">
                    <div class="theme-item" @click="onBgCut(item)" v-for="(item, i) in bgArr" :key="i">
                        <img :src="item.bgSrc" alt="">
                        <div>{{ item.name }}</div>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<style lang='scss' scoped>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.3s ease;
    border: 1px solid red;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    border: 1px solid red;
    transform: translateY(20px);
}


.actions {
    .icon-box {
        height: 80px;
        display: inline-block;
        margin: 0 10px;
        color: $nav-color;
        position: relative;

        &:hover {
            .skin-cont {
                display: block;
            }
        }

        .iconfont {
            color: #fff;
            font-size: $icon-size;
            line-height: 80px;
            text-shadow: 2px 1px 2px rgba(0, 0, 0, 0.3);
        }

        //
        .skin-cont {
            position: absolute;
            top: 70px;
            left: -30px;
            z-index: 1000;
            display: none;
            min-width: 80px;
            padding: 10px 0;
            color: #212529;
            list-style: none;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid rgba(0, 0, 0, 0.15);
            border-radius: 10px;

            &::before {
                content: "";
                position: absolute;
                top: -7px;
                left: 50%;
                margin-left: -8px;
                width: 14px;
                height: 14px;
                background-color: #fff;
                transform: rotate(45deg);
                border: 1px solid rgba(0, 0, 0, 0.2);
                border-bottom: transparent;
                border-right: transparent;
            }

            .skin {
                display: block;
                font-size: 14px;
                padding: 10px 10px;
                color: #34495e;
                text-align: center;
                border-radius: 4px;

                &:hover {
                    transition: all 0.2s linear 0s;
                    background-color: $background;

                    span {
                        display: inline-block;
                        transform: scale(1.1);
                        transition: all 0.2s linear 0s;
                    }
                }
            }
        }

        // 选中
        .act-skin {
            color: #aaa !important;
            background-color: transparent !important;

            span {
                transform: scale(1) !important;
            }
        }
    }


}


.content-theme {
    .theme-cont {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;

        .theme-item {
            padding-bottom: 30px;
            box-sizing: border-box;

            &:hover {
                img {
                    border: 2px solid #fff;
                }
            }

            img {
                width: 180px;
                height: 100px;
                object-fit: cover;
                border-radius: 10px;
                transition: all .2s ease-in-out;
            }

            div {
                width: 180px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                color: #fff;
                margin-top: 10px;
                text-align: center;
            }
        }
    }
}
</style>