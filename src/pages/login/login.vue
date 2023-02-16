<template>
    <div class="container flex center" :style="{'height':userStore.systemValue.height}">
        <!-- onselectstart="return false;表示双击无法选中文字 -->
        <div class="content flex center" onselectstart="return false;">
            <el-form ref="ruleFormRef" :model="user" :rules="rules" class="demo-ruleForm">
                <el-form-item label-width="100px" class="login_label center" label="用户名：" prop="userName">
                    <el-input class="input" v-model="user.userName" placeholder="请输入用户名" type="text" />
                </el-form-item>
                <el-form-item label-width="100px" class="login_label center" label="密码：" prop="password">
                    <el-input class="input" v-model="user.password" placeholder="请输入密码"
                        :type="inputType ? 'password' : 'text'" @keyup.enter="submitForm(ruleFormRef)"/>
                    <View class="iconView" :style="{ 'color': inputType ? 'rgba(165, 165, 165, 0.733)' : '#409EFF' }"
                        @click="inputType = !inputType"></View>
                </el-form-item>
                <!-- <el-form-item label="Age" prop="age">
      <el-input v-model.number="ruleForm.age" />
    </el-form-item> -->
                <el-form-item class="login_label" @click="submitForm(ruleFormRef)">
                    <el-button type="primary" class="login-button">
                        <el-icon v-if="isLoading">
                            <Loading class="loading" />
                        </el-icon>
                        <p v-else>登录</p>
                    </el-button>
                    <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, reactive } from 'vue'
import { FormRules, FormInstance, ElMessage } from 'element-plus'
import { Loading, View } from '@element-plus/icons-vue'
import { login } from "../../request/api"
import router, { addRouter, formmtinoMeta } from '@/router'
import { RouterArray, Router_interface } from "@/types/interfaces"
import { useUserStore } from "@/store"
// 获取表单dom
let ruleFormRef = ref()
// 登录信息
const user = reactive({
    userName: "",
    password: ""
})
// 判断是否登录中
let isLoading = ref(false);
// 设置密码框的type
let inputType = ref(true);

// 手动检验密码方法
// value：校验框的值
const validatorPass = function (rule: unknown, value: string | undefined, call: (msg?: string) => void) {
    if (!value) {
        call('密码不能为空ya');
    } else {
        call();
    }
}
// 表单校验规则
const rules = reactive<FormRules>({
    userName: [
        { required: true, message: "请输入用户名", trigger: "blur" },
    ],
    password: [
        { validator: validatorPass, trigger: "blur" },
    ]

})

// 获取store中的值
let userStore = useUserStore()

// 提交时校验
const submitForm = async (formEl: FormInstance | undefined) => {
    // 如果为undefined，直接返回
    if (!formEl || isLoading.value) return
    
    // 校验是否通过，
    // valid：是否校验通过，return:boolean
    // fields: 返回校验错误信息
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
            isLoading.value = true
            // 拼接用户数据
            let data = {
                "phone": user.userName,
                "password": hexMd5(user.password),
            }
            login(data).then(res => {
                console.log("请求成功！！", res.data);
                // 保存用户信息
                userStore.chageUserInfo(res.data)
                // 格式化路由的meta
                let new_arr = formmtinoMeta(res.data.router)
                // 保存路由信息
                userStore.chageRoutes(new_arr as Array<Router_interface>);
                // 将token保存本地
                localStorage.setItem("token", res.data.user.password);
                localStorage.setItem("userID", res.data.user.userID);
                // 动态添加路由
                addRouter(new_arr as Array<Router_interface>);
                // 设置路由状态
                userStore.chageRouter(true)
                isLoading.value = false
                router.push("/index")
            }).catch(err => {
                console.log("请求失败！", err);
                isLoading.value = false
                alterMessage()
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}

const alterMessage = function () {
    ElMessage({
        message: '密码或账号错误',
        type: 'error',
    })
}


</script>
<style lang='less' scoped>
// 背景
.content::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 500px;
    height: 500px;
    background-color: rgba(209, 207, 208, 0.521);
    border-radius: 20px;
    filter: blur(2px);
    z-index: 0;
}

.container {
    width: 100%;

    .content {
        // padding: 100px;
        width: 500px;
        height: 500px;
        display: flex;
        border-radius: 30px;
        position: relative;
        animation: balls 1s;

        .demo-ruleForm {
            z-index: 1;
        }

        .login_label {
            height: 60px;
            width: 400px;
            z-index: 2;
            position: relative;

            /* 登录表单label标签样式 */
            // 样式穿透
            ::v-deep(.el-form-item__label) {
                color: black;
                font-size: 18px;
                font-weight: bold;
            }

            /* 登录按钮样式 */
            ::v-deep(.el-button) {
                width: 100%;
            }

            // input框样式
            .input {
                height: 40px;
            }


            // 输入框的样式
            ::v-deep(.el-form-item__content) {
                @pass-font-size: 15px;
                font-size: @pass-font-size;

                ::v-deep(.el-input) {
                    font-size: @pass-font-size;
                }
            }

            // 查看密码图标
            .iconView {
                width: 1.2em;
                height: 1.2em;
                position: absolute;
                right: 20px;
                // color: rgba(165, 165, 165, 0.733);
            }

            // 登录按钮样式
            ::v-deep(.login-button) {
                font-size: 18px;
                height: 40px;

                // 等待图标
                .loading {
                    animation: loading 1s linear infinite;
                }
            }


        }
    }
}

@keyframes balls {
    0% {
        transform: translateY(-100px);
    }

    25% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0px);
    }
}
</style>
