import Vue from 'vue'
import
{
    Select,
    Option,
    Tag,
    Input,
    pagination,
    cascader,
    DatePicker,
    Loading,
    Message,
    MessageBox,
    Button,
    ButtonGroup,
    Notification,
    Radio,
    RadioGroup,
    RadioButton,
    Table,
    TableColumn
} from 'element-ui'

let variable = {
    Select,
    Option,
    Tag,
    Input,
    pagination,
    cascader,
    DatePicker,
    Button,
    ButtonGroup,
    Radio,
    RadioGroup,
    RadioButton,
    Table,
    TableColumn
}
for (let item in variable) {
    Vue.use(variable[item])
}
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message