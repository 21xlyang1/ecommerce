<template>
    <div class="Main">
        <el-timeline-item :timestamp="data.time_data" placement="top">
            <el-card shadow="hover" class="card">
                <h4>{{ data.title }}</h4>
                <p>{{ data.text }}</p>
            </el-card>
        </el-timeline-item>
        <div>
            <!-- <BTN  :color="'blue'" :icon="'updata'" :showBorder="false" @click="editLog(); dialogVisible = true" :icon-size="'29px'"/> -->
            <div class="edit" @click="editLog(); dialogVisible = true"><i class="el-icon-edit"></i></div>
            <el-dialog title="添加日志" :visible.sync="dialogVisible" width="700px" :modal-append-to-body="false"
                :close-on-press-escape="true" style="z-index: 100;">

                <el-form :model="form" label-position="top" ref="form" :rules="rules">
                    <el-form-item label="标题" class="title" prop="title">
                        <el-input v-model="form.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="正文" class="text" prop="text">
                        <el-input type="textarea" v-model="form.text"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker v-model="form.valueDay" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-time-picker v-model="form.valueTime" :picker-options="{
                            selectableRange: '00:00:00 - 23:59:59'
                        }" :editable=false placeholder="选择时间">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item class="btn_box">
                        <el-button @click="onSubmitAndClose">确定修改</el-button>
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button @click="onReset">重置</el-button>
                    </el-form-item>
                </el-form>

            </el-dialog>
            <div class="del" @click="delLog"><i class="el-icon-delete"></i></div>
        </div>
    </div>
</template>

<script>
import BTN from "./iconbutton.vue";
export default {
    components: {
        BTN,
    },
    props: {
        data: {
            type: Object,
            required: true,
        },
        dataIdentifier: Number,
    },
    data() {
        return {
            dialogVisible: false,
            form: {
                title: this.data.title,
                text: this.data.text,
                time_data: this.data.time_data,
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                valueDay: '',
                valueTime: '',
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            rules: {
                title: [
                    { required: true, message: '请输入日志标题', trigger: 'blur' },
                ],
                text: [
                    { required: true, message: '请输入日志内容', trigger: 'blur' }
                ]
            },
        };
    },
    methods: {
        editLog() {
            this.onReset();
            console.log("编辑日志");
            // console.log(this.form);
            // console.log(this.form.time_data);
        },
        delLog() {
            console.log("删除日志");
        },
        onSubmitAndClose() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // 获取当前时间
                    const year = this.form.valueDay.getFullYear();
                    const month = this.form.valueDay.getMonth() + 1;
                    const day = this.form.valueDay.getDate();
                    const hours = this.form.valueTime.getHours();
                    const minutes = this.form.valueTime.getMinutes();
                    const seconds = this.form.valueTime.getSeconds();
                    const formattedDateTime = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    this.form.time_data = formattedDateTime;
                    console.log("提交更改了");
                    this.$emit('update-log', {
                        newData: this.form,
                    });
                    this.dialogVisible = false; // 关闭对话框
                }
                else {
                    console.log('表单验证失败');
                }
            });
        },
        delLog() {
            console.log("删除！爽！删除！爽！……");
            this.$emit('delete-log', this.dataIdentifier);
        },
        onReset() {
            // 重置表单数据
            this.form = {
                title: this.data.title,
                text: this.data.text,
                time_data: this.data.time_data,
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                valueDay: '',
                valueTime: '',
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.Main {
    position: relative;
    // background-color: black;
    // margin: 10px;
    // padding: 10px;
}

.card {
    margin-right: 30px;
}

.edit {
    bottom: 60px;
    right: -10px;
}

.del {
    bottom: 25px;
    right: -10px;
}

.edit,
.del {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;

    cursor: pointer;

    border-radius: 3px;
    // background-color: #000;
    font-size: 25px;
    width: 30px;
    height: 30px;

    box-sizing: border-box;
    // border: 0.5px solid #ccc;
    border: transparent;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.0);
    transition: all 0.2s ease, border 0.5s ease;
}

.edit:hover,
.del:hover {
    // border: 0.5px solid #fff;
    border: transparent;
}

.edit {
    background-color: #fff;
    color: #409EFF;
}

.del {
    background-color: #fff;
    color: #fa5c7c;
}

.edit:hover {
    color: #fff;
    background-color: #409EFF;
    box-shadow: 0px 0px 10px rgba(64, 158, 255, 0.3);
}

.del:hover {
    color: #fff;
    background-color: #fa5c7c;
    box-shadow: 0px 0px 10px rgba(250, 92, 124, .3);
}
</style>