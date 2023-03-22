export default{
    base:'/',
    title:'hzjBlog',
    description:'一个vue3组件库',
    themeConfig:{
        siteTitle:'hzj',
        logo:"/logo.jpg",
        nav:[
            { text:"Guide",link:"/guide/" },
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
            "/guide/" : [
                {
                    text:'组件库源码实现',
                    collapsible:true,
                    collapsed:true,
                    items:[
                        {
                            text:'组件库环境搭建',
                            link:"/articles/组件库环境搭建"
                        },
                        { text:'gulp的使用',link:'/articles/gulp的使用'}
                    ]
                },
                {
                    text:"vue教程",
                    link:'/articles/pina和vuex'
                }
            ]
        }

    }
}