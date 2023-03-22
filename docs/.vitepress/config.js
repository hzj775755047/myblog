export default{
    base:'/',
    title:'hzjBlog',
    description:'一个vue3组件库',
    themeConfig:{
        siteTitle:'hzj',
        logo:"/logo.jpg",
        nav:[
            { text:"经验",link:"/exp/index" },
            { text:"juejin",link:"https://juejin.cn/user/3386940253550120"},
            {
                text:"Drop Menu",
                items:[
                    {
                        items:[
                            { text:'Item A',link:'/item-1'},
                            { text:'Item B',link:'/item-2'},
                        ]
                    },
                    {
                        items:[
                            { text:'Item C',link:'/item-3'},
                        ]
                    }
                ]
            }
        ],
        socialLinks:[
            { icon:'github',link:'https://github.com/hzj775755047'}
        ],
        sidebar:{
            "/exp/" : [
                {
                    text:"掌握的知识",
                    collapsible:true,
                    collapsed:true,
                    items:[
                        {
                            text:'组件库环境搭建',
                            link:"/articles/组件库环境搭建"
                        },
                        { text:'单点登录的cookie校验',link:'/exp/index'}
                    ]
                },
                {
                    text:'工作经验',
                    collapsible:true,
                    collapsed:true,
                    items:[
                        {
                            text:'组件库环境搭建',
                            link:"/articles/组件库环境搭建"
                        },
                        { text:'单点登录的cookie校验',link:'/exp/index'}
                    ]
                },
                
            ]
        }

    }
}