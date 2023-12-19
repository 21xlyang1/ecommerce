<template>
    <div class="MainDiv">
        <div class="Box">
            <div class="checkbox-Box"><input type="checkbox"></div>
            <div class="author">
                <div class="up">
                    <div class="l"><img src="../assets/img/默认头像.svg" alt="头像" width="80px"></div>
                    <div class="r">
                        <div class="a0"><span>{{ name }}</span></div>
                        <div class="a1"><span>{{ email }}</span></div>
                        <div class="a2"><span>{{ wechat }}</span></div>
                        <div class="a3"><span>{{ photonumber }}</span></div>
                    </div>
                </div>
                <div class="down">
                    <div>不知道放啥</div>
                </div>
            </div>
            <div class="comment">
                {{ comments }}
            </div>
            <div class="reply">
                {{ reply }}
            </div>
            <div class="submission-time">
                {{ submission }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: "Peanut",
            email: "123456789@123123.com",
            wechat: "123456789abcd",
            photonumber: "123456789abcdefg",
            comments: "第一条评论",
            reply: "这是回复",
            submission: "1234:12:12 12:12"
        };
    },
}
</script>
<style lang="scss" scoped>
.MainDiv {
    border: 1px solid #ccc;        /* 设置通用的边框 */
    border-top: none;                   /* 上方边框不显示 */
}

.checkbox-Box {
    // background-color: black;         // 复选框的div颜色
    background-color: rgba(253, 247, 241, 1); // 复选框的div颜色
    display: flex;
    justify-content: center;            // 水平居中
    align-items: flex-start;            // 垂直居中
    padding-top: 12px;
}

.checkbox-Box input[type="checkbox"] {
    width: 18px;  /* 设置复选框的宽度 */
    height: 18px; /* 设置复选框的高度 */
    cursor: pointer;  // 悬浮改为手型
}

.Box {
    display: grid; // 评论列表的标题设置为grid布局
    grid-template-columns: 35px 300px 1fr 250px 150px; // 四列，左右布局
    background-color: rgba(253, 247, 241, 1);
    height: 150px;
}

.Box .author {
    display: grid;                      // 评论列表的标题设置为grid布局
    grid-template-rows: 120px 1fr;        // 两行，上下布局
    // background-color: red;           // 测试的时候 作者栏的div颜色
}
.author .up {
    // background-color: brown;
    display: grid;
    grid-template-columns: 80px 1fr;
    .l {
        padding-top: 10px;
    }
    .r {
        padding-left: 10px;
        padding-top: 7px;
        .a0 span {
            font-size: 1.25rem;
            cursor: pointer;            // 改变为悬停手型
        }
        .a1 span, .a2 span, .a3 span {
            font-size: 0.95rem;
            color: #00f;
            cursor: pointer;            // 改变为悬停手型
            // background-color: cyan;
        }
    }
}
.author .down {
    // background-color: darkorchid;
}

.Box .comment {
    // background-color: yellow;
}

.Box .reply {
    // background-color: blue;
}

.Box .submission-time {
    // background-color: green;
}
</style>