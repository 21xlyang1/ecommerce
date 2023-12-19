/* __placeholder__ */
export default (await import('vue')).defineComponent({
name: "",
props: {
disabled: {
type: Boolean,
default: false
},
placeholder: {
type: String,
default: '请输入昵称进行搜索，可以直接回车搜索...'
}
},
data() {
return {
keyword: '',
tableData: [{
date: '2016-05-02',
name: '王小虎',
province: '上海',
city: '普陀区',
address: '上海市普陀区金沙江路 1518 弄',
zip: 200333
}, {
date: '2016-05-04',
name: '王小虎',
province: '上海',
city: '普陀区',
address: '上海市普陀区金沙江路 1517 弄',
zip: 200333
}, {
date: '2016-05-01',
name: '王小虎',
province: '上海',
city: '普陀区',
address: '上海市普陀区金沙江路 1519 弄',
zip: 200333
}, {
date: '2016-05-03',
name: '王小虎',
province: '上海',
city: '普陀区',
address: '上海市普陀区金沙江路 1516 弄',
zip: 200333
}]
};
},
methods: {
search() {
this.$emit("search", ['search', this.keyword]);
},
handleClick(row) {
console.log(row);
}
}
});
