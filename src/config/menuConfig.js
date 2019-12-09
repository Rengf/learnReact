const menuList = [{
        title: "系统首页",
        icon: 'iconzelvxuanzefeiyongdaosanjiaoxingfandui',
        key: "/"
    },
    {
        title: "报表管理",
        icon: 'iconbaobiao',
        key: "/area-chart",
        children: [{
            title: "访问统计",
            icon: 'mail',
            key: "/charts/report"
        }]
    },
    {
        title: "用户管理",
        icon: 'icontenantuser',
        key: "/users",
        children: [{
                title: "用户列表",
                icon: 'iconzelvxuanzefeiyongdaosanjiaoxingfandui',
                key: "/userlist"
            },
            {
                title: "管理员列表",
                icon: '&iconzelvxuanzefeiyongdaosanjiaoxingfandui',
                key: "/adminlist"
            },
            {
                title: "权限设置",
                icon: 'iconzelvxuanzefeiyongdaosanjiaoxingfandui',
                key: "/editadmin"
            }
        ]
    },
    {
        title: "文章管理",
        icon: 'iconwenzhangguanli',
        key: "/article",
        children: [{
                title: "文章列表",
                icon: 'iconzelvxuanzefeiyongdaosanjiaoxingfandui',
                key: "/articlelist"
            },
            {
                title: "添加文章",
                icon: 'iconzelvxuanzefeiyongdaosanjiaoxingfandui',
                key: "/addarticle"
            },
            {
                title: "草稿列表",
                icon: 'iconzelvxuanzefeiyongdaosanjiaoxingfandui',
                key: "/articlelist?status=0"
            }
        ]
    },
    {
        title: "商品分类",
        icon: 'iconfenleiguanli1',
        key: "/category"
    },
    {
        title: "商品管理",
        icon: 'iconshangpinguanli',
        key: "/goods",
        children: [{
                title: "添加商品",
                icon: 'iconzelvxuanzefeiyongdaosanjiaoxingfandui',
                key: "/addgoods"
            },
            {
                title: "商品列表",
                icon: 'iconzelvxuanzefeiyongdaosanjiaoxingfandui',
                key: "/goodslist"
            }
        ]
    },
    {
        title: "进货管理",
        icon: 'iconjinhuoguanli',
        key: "/warehousing",
        children: [{
                title: "进货列表",
                icon: 'iconzelvxuanzefeiyongdaosanjiaoxingfandui',
                key: "/warehousinglist"
            },
            {
                title: "添加进货",
                icon: 'iconzelvxuanzefeiyongdaosanjiaoxingfandui',
                key: "/addwarehousing"
            },
        ]
    },
    {
        title: "供货商家",
        icon: 'iconshangjiaguanli',
        key: "/supplier",
        children: [{
                title: "添加商家",
                icon: 'iconzelvxuanzefeiyongdaosanjiaoxingfandui',
                key: "/addsupplier"
            },
            {
                title: "商家列表",
                icon: 'iconzelvxuanzefeiyongdaosanjiaoxingfandui',
                key: "/supplierlist"
            }
        ]
    },
    {
        title: "订单管理",
        icon: 'icondingdan',
        key: "/orderlist",
    },
    {
        title: "物流管理",
        icon: 'iconwuliu',
        key: "/wuliu",
    },
    {
        title: "退单管理",
        icon: 'icondingdan',
        key: "/returnorder"
    },
    {
        title: "留言管理",
        icon: 'iconliuyan',
        key: "/message",
        children: [{
                title: "留言反馈",
                icon: 'iconzelvxuanzefeiyongdaosanjiaoxingfandui',
                key: "/returnmessage"
            },
            {
                title: "消息通知",
                icon: 'iconzelvxuanzefeiyongdaosanjiaoxingfandui',
                key: "/newmessage"
            }
        ]
    },
    {
        title: "评论管理",
        icon: 'iconcomment-copy',
        key: "/comment"
    }
]

export default menuList