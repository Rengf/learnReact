const menuList = [{
    title: "首页",
    key: "/home",
    icon: 'mail'
}, {
    title: "商品",
    key: "/products",
    icon: 'mail',
    children: [{
            title: "分类管理",
            key: "/category",
            icon: 'mail'
        },
        {
            title: "商品管理",
            key: "/product",
            icon: 'mail'
        }
    ]
}, {
    title: "用户管理",
    key: "/user",
    icon: 'mail'
}, {
    title: "权限管理",
    key: "/role",
    icon: 'mail'
}, {
    title: "图表",
    key: "/charts",
    icon: 'mail',
    children: [{
            title: "柱状图",
            key: "/charts/bar",
            icon: 'mail'
        },
        {
            title: "折线图",
            key: "/charts/line",
            icon: 'mail'
        }, {
            title: "饼状图",
            key: "/charts/pie",
            icon: 'mail'
        }
    ]
}]

export default menuList