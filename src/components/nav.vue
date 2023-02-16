<template>
    <div class="nav-container flex" ref="nav__">
        <div class="nav flex column" ref="nav" onselectstart="return false;">
            <div class="title-box">
                <el-icon>
                    <Operation />
                </el-icon>
                <span class="nav-title">导航栏</span>
            </div>
            <div class="nav-content">
                <div class="nav-content-item flex column" v-for="(item, index) in routes_" :key="index">
                    <div class="nav-content-item-title flex" @click="showChildren($event,index as unknown as number)"
                        :style="{ 'color': $route.params.parent === item.path ? '#73CCFF' : '' }"
                        v-show-select="$route.params.parent === item.path ? index : -1">
                        <span class="flex-1">{{ item.meta.title }}</span>
                        <el-icon ref="icon">
                            <ArrowRightBold />
                        </el-icon>
                    </div>

                    <!-- 子内容 -->
                    <div class="children-box" ref="children">
                        <div class="children-item" v-for="children, index in item.children" :key="index"
                            @click="jump(item.path, children.path)"
                            :style="{ 'color': $route.params.child === children.path ? '#73CCFF' : '' }">{{
                                children.meta.title
                            }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 隐藏侧边按钮 -->
        <div class="hideNav flex center" ref="hide" @click="leave" v-if="hideButton">
            <el-icon>
                <DArrowLeft />
            </el-icon>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, onMounted, Directive } from 'vue'
import { useUserStore } from '@/store'
import { Router_interface } from '@/types/interfaces'
import router from '@/router';

defineProps({
    hideButton: {
        type: Boolean,
        default: false
    }
})

// 获取dom
const nav__ = ref()

// 获取store中的值
let userStore = useUserStore()
let routes_: Router_interface = userStore.routes as Router_interface;

// 获取nav的dom
let nav = ref()
// 获取hideNav的dom
let hide = ref()
// 通过emit给父组件传值
const emit = defineEmits<{
    (event: 'hideNav'): void,
    (event: 'style_', value: HTMLElement): void
}>()


// 渲染后
onMounted(() => {
    // console.log(nav.value);
    setTimeout(() => {
        nav.value.style.transform = "translateX(0)"
        // hide.value.style.transform = "translateX(0)"
    }, 200)

    // 返回dom元素给父元素
    emit('style_', nav__.value)




})


// 鼠标移出nav区域
const leave = function (event: unknown) {
    // 执行动画
    // console.log(nav.value.style)
    nav.value.style.transform = "translateX(-100%)"
    hide.value.style.transform = "translateX(-300px)"
    setTimeout(() => {
        // 执行父组件的方法
        emit('hideNav');
    }, 200)
}

// 当渲染时执行指令
const vShowSelect: Directive<HTMLElement, number> = (el, bingding) => {
    if(bingding.value !== -1){
        showChildren("",bingding.value)
    }
}

/**
 * 下拉才当动画
 */
// 获取子项的总box的dom
let children = ref();
// 是否有子项已经展出，-1表示没有菜单展出
let ifShowChildren = ref(-1);
// 获取子项的实际高度
let height = ref(0)
// 箭头旋转动画
let icon = ref()
// 点击导航栏项，弹出子项
const showChildren = function (event:any,index:number) {
    console.log(event);
    if(!event && ifShowChildren.value !== -1){
        console.log("没有点击父元素");
        return
    }

    // 如果点击的是展开了的item则收起
    if (ifShowChildren.value === index) {
        hideChildren(ifShowChildren.value);
        return;
    }

    // 如果是点击其他的item则收起展出的
    if (ifShowChildren.value !== -1) {
        hideChildren(ifShowChildren.value);
    }
    ifShowChildren.value = index
    children.value[index].style.display = 'block';
    // 保存原始的高度
    height.value = children.value[index].clientHeight;
    children.value[index].style.height = 0;
    // 箭头旋转
    // console.log(icon.value[index].$el);

    icon.value[index].$el.style.transform = 'rotate(90deg)'
    // 记录帧数
    let _height = 0;
    let time = setInterval(() => {
        _height += 10
        children.value[index].style.height = _height + 'px'
        // console.log(height.value);
        if (_height >= height.value) {
            clearInterval(time)
        }
    }, 2)
}

// 收回以展出的菜单
const hideChildren = function (index: number) {
    children.value[index].style.height = 0
    // 保存idnex变量到内存
    let _index = index
    // 等待回收菜单栏动画执行完毕
    setTimeout(() => {
        children.value[_index].style.height = ''
        children.value[_index].style.display = 'none'
    }, 500)
    // 箭头旋转
    icon.value[index].$el.style.transform = ""
    ifShowChildren.value = -1

}

// 跳转页面
const jump = function (parent: string, child: string) {
    router.push({ name: child, params: { parent, child } });
}


</script>
<style lang='less' scoped>
@color: white;
@background: #545C64;

.nav-container::-webkit-scrollbar {
    width: 0;
}

.nav-container {
    overflow-y: scroll;
    background-color: @background;
    z-index: 1;

    .nav {
        cursor: pointer;
        padding-top: 20px;
        font-size: 18px;
        font-family: "楷体";
        position: relative;
        width: 250px;
        transform: translateX(-100%);
        transition: all 0.2s linear;

        .title-box {
            padding-top: 30px;
            padding-bottom: 10px;
            padding-left: 20px;
            padding-right: 20px;
            color: @color;
            border-bottom: 1px solid @color;

            .nav-title {
                margin-left: 10px;
            }
        }


        // 导航栏内容
        .nav-content {
            color: @color;

            // 每个主item
            .nav-content-item {
                position: relative;
                // padding: 10px 0;
                border-bottom: 1px solid @color;

                .nav-content-item-title {
                    padding: 10px 20px;

                    .el-icon {
                        transition: all .2s linear;
                    }
                }

                .children-box {
                    // position: relative;
                    top: 100%;
                    display: none;
                    transition: all .5s linear;
                    // background-color: #545C64;
                    // border: 1px solid red;
                    overflow: hidden;

                    .children-item {
                        border-bottom: 1px solid yellowgreen;
                        padding: 10px 0;
                        padding-left: 30%;
                    }

                    .children-item:first-child {
                        border-top: 1px solid yellowgreen;
                    }

                    .children-item:last-child {
                        border-bottom: none;
                    }
                }
            }
        }
    }

    .hideNav {
        width: 20px;
        position: absolute;
        height: 30px;
        top: 130px;
        left: 250px;
        color: white;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        background-color: #545C64;
        transform: translateX(-300px);
        transition: all 0.2s linear;
    }
}

// 导航栏移入样式
@keyframes displayNav {
    0% {
        transform: translateX(-100px);
    }

    100% {
        transform: translateX(0);
    }
}

// 导航栏移出样式
@keyframes hideNav {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-100px);
    }
}
</style>
