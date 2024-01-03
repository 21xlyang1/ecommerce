<template>
    <div class="MainDiv">
        <div class="Box">
            <div class="checkbox-Box"><input type="checkbox" @input="handleCheckboxChange" v-model="data.selected" /></div>
            <div class="user">
                <div class="l">
                    <img src="../assets/img/默认头像.svg" alt="头像" height="35px" />
                </div>
                <div class="r">
                    <div class="userName" @mouseover="showTooltip" @mouseout="hideTooltip"> {{ name }} </div>
                    <div class="toolTip" :class="{ 'visible': tooltipVisible }"> {{ name }} </div>
                </div>
            </div>
            <div class="phone_box">
                <div class="phone" @mouseover="showTooltip_phone" @mouseout="hideTooltip_phone"> {{ phoneNumber }}
                </div>
                <div class="toolTip_phone" :class="{ 'visible_phone': tooltipVisible_phone }"> {{ phoneNumber }} </div>
            </div>
            <div class="email_box">
                <div class="email" @mouseover="showTooltip_email" @mouseout="hideTooltip_email"> {{ email }} </div>
                <div class="toolTip_email" :class="{ 'visible_email': tooltipVisible_email }"> {{ email }} </div>
            </div>
            <div class="comment_box">
                <div class="box">
                    <p class="comment"> {{ data.content }} </p>
                </div>
            </div>
            <div class="submission-time"> {{ data.submission }} </div>
            <div class="action">
                <i class="el-icon-edit" v-show="!data.selected"></i>
                <i class="el-icon-delete" @click="deleteComment" v-show="!data.selected"></i>
                <i class="el-icon-delete" @click="triggerDeleteEvent" v-show="data.selected"></i>
            </div>
        </div>
    </div>
</template>
<script>

import { post } from "@/utils/http";
export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            name: '',
            phoneNumber: '',
            email: "",
            // content: "",
            // submission: "",
            // selected: false,
            tooltipVisible: false,
            tooltipVisible_phone: false,
            tooltipVisible_email: false,
        };
    },
    methods: {
        // name
        showTooltip() {
            this.tooltipVisible = true;
        },
        hideTooltip() {
            this.tooltipVisible = false;
        },

        // phone
        showTooltip_phone() {
            this.tooltipVisible_phone = true;
        },
        hideTooltip_phone() {
            this.tooltipVisible_phone = false;
        },

        // email
        showTooltip_email() {
            this.tooltipVisible_email = true;
        },
        hideTooltip_email() {
            this.tooltipVisible_email = false;
        },
        deleteComment() {
            console.log("点击了删除");
            this.$emit('delete-comment', this.data);
        },
        handleCheckboxChange() {
            this.$emit('checkbox-change', this.data);
            // this.$nextTick(() => {
            //     this.$emit('checkbox-change', this.data);
            // })
        },
        triggerDeleteEvent() {
            this.$emit('trigger-delete', this.data);
        },
        loadData() {
            post("/user/getInf", { userId: this.data.ID }).then(
                (Response) => {
                    this.name = Response.data.username;
                    this.phoneNumber = Response.data.phoneNum;
                    this.email = Response.data.email;
                    console.log("123654 用户信息请求成功", Response);
                    // var content = item

                    // content.email = Response.data.email;
                    // content.phoneNumber = Response.data.phoneNum;
                    // content.name = Response.data.username;
                    // this.$set(this.dataList,index,content);
                    // console.log("12121212 showList: ", this.showList);
                    // this.updateShowList(); // 初始化时调用一次，显示第一页的数据
                    },
                (error) => {
                    console.log("用户信息请求失败", error.message);
                }
            );
        },
    },
    mounted() {
        this.loadData();
        // this.name = data.name;
        // this.phoneNumber = data.phoneNumber;
        // this.email = data.email;
        // this.content = data.content;
        // this.submission = data.submission;
        // this.selected = data.selected;
    },
};
</script>
<style lang="scss" scoped>
.MainDiv {
    /* 设置通用的边框 */
    border: 1px solid #e3eaef;
    /* 上方边框不显示 */
    border-top: none;
    /* 右边框不显示 */
    border-right: none;
    /* 左边框不显示 */
    border-left: none;
}

.checkbox-Box {
    // background-color: black;         // 复选框的div颜色
    // background-color: rgba(253, 247, 241, 1); // 复选框的div颜色
    display: flex;
    justify-content: center; // 水平居中
    align-items: center; // 垂直居中
}

.checkbox-Box input[type="checkbox"] {
    width: 18px;
    /* 设置复选框的宽度 */
    height: 18px;
    /* 设置复选框的高度 */
    cursor: pointer; // 悬浮改为手型
}

.userName,
.phone,
.email {
    overflow: hidden;
    /* 防止文字换行 */
    white-space: nowrap;
    /* 在溢出的地方显示省略号 */
    text-overflow: ellipsis;
    cursor: pointer;
}

.Box {
    display: grid; // 评论列表的标题设置为grid布局
    grid-template-columns: 60px 140px 120px 160px minmax(200px, 1fr) 140px 100px; // 七列，左右布局
    // grid-template-columns: repeat(8, minmax(70px, 1fr) minmax(140px, 1fr) minmax(120px, 1fr) minmax(160px, 1fr) minmax(200px, 1fr) minmax(160px, 1fr) minmax(140px, 1fr) minmax(100px, 1fr));
    // background-color: rgba(253, 247, 241, 1);
    height: 60px;
}

.Box .user {
    display: grid; // 评论列表的标题设置为grid布局
    grid-template-columns: 1fr 95px; // 两行，左右布局, 左为头像右为名字
    // background-color: red; // 测试的颜色

    .l {
        // background-color: yellow; // 测试的颜色
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .r {
        // background-color: lightblue; // 测试的颜色
        display: flex;
        align-items: center;
        position: relative;

        .toolTip {
            background-color: rgba(0, 0, 0, 0.8);
            // background-color: lightblue;
            color: #fff;
            padding: 5px;
            border-radius: 3px;
            z-index: 999;
            position: absolute;
            top: -25%;
            left: -5px;
            opacity: 0;
            transition: opacity 0.5s;
        }

        .toolTip.visible {
            opacity: 1;
        }
    }
}

.Box .phone_box {
    // background-color: lightgreen; // 测试的颜色
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.Box .email_box {
    // background-color: lightblue; // 测试的颜色
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.toolTip_phone,
.toolTip_email {
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 5px;
    border-radius: 3px;
    z-index: 999;

    position: absolute;
    top: -50%;
    left: 50%;
    transform: translate(-50%, 50%);
    opacity: 0;
    transition: opacity 0.5s;
}

.visible_phone,
.visible_email {
    opacity: 1;
}

.Box .comment_box {
    // background-color: lightcoral;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .box {
        box-sizing: border-box;
        height: 50px;

        .comment {
            box-sizing: border-box;
            // background-color: cornflowerblue;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
}

.Box .reply_box {
    // background-color: lightcyan;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .box {
        box-sizing: border-box;
        // background-color: aqua;
        // margin: 10px;
        // margin-top: 100px;
        // width: 100%;
        // height: 100%;
        // margin-left: 10px;
        // margin-right: 10px;
        // border:1px solid black;
        height: 50px;

        .reply {
            box-sizing: border-box;
            // background-color: cornflowerblue;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
}

.Box .submission-time {
    // background-color: green;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.Box .action {
    // background-color: #fff;
    // background-color: cadetblue;
    display: flex;
    justify-content: center;
    align-items: center;

    .el-icon-edit,
    .el-icon-delete {
        width: 25px;
        height: 25px;

        font-size: 25px;
        // background-color: burlywood;
        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
        color: #98a6ad;
        transition: color 0.3s ease;
    }

    .el-icon-edit {
        margin-right: 10px;
    }

    .el-icon-edit:hover,
    .el-icon-delete:hover {
        color: #6c757d;
    }
}</style>