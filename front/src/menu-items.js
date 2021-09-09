let user={"role":0}
if(JSON.parse(localStorage.getItem("userLogged"))){
    user = JSON.parse(localStorage.getItem("userLogged"));
}


/*
{
        id: 'ui-element',
        title: 'UI ELEMENT',
        type: 'group',
        icon: 'icon-ui',
        children: [
            {
                id: 'basic',
                title: 'Component',
                type: 'collapse',
                icon: 'feather icon-box',
                children: [
                    {
                        id: 'button',
                        title: 'Button',
                        type: 'item',
                        url: '/basic/button'
                    },
                    {
                        id: 'badges',
                        title: 'Badges',
                        type: 'item',
                        url: '/basic/badges'
                    },
                    {
                        id: 'breadcrumb-pagination',
                        title: 'Breadcrumb & Pagination',
                        type: 'item',
                        url: '/basic/breadcrumb-paging'
                    },
                    {
                        id: 'collapse',
                        title: 'Collapse',
                        type: 'item',
                        url: '/basic/collapse'
                    },
                    {
                        id: 'tabs-pills',
                        title: 'Tabs & Pills',
                        type: 'item',
                        url: '/basic/tabs-pills'
                    },
                    {
                        id: 'typography',
                        title: 'Typography',
                        type: 'item',
                        url: '/basic/typography'
                    }
                ]
            }
        ]
    },
    {
        id: 'ui-forms',
        title: 'Forms & Tables',
        type: 'group',
        icon: 'icon-group',
        children: [
            {
                id: 'form-basic',
                title: 'Form Elements',
                type: 'item',
                url: '/forms/form-basic',
                icon: 'feather icon-file-text'
            },
            {
                id: 'bootstrap',
                title: 'Table',
                type: 'item',
                icon: 'feather icon-server',
                url: '/tables/bootstrap'
            }
        ]
    },
    {
        id: 'chart-maps',
        title: 'Chart & Maps',
        type: 'group',
        icon: 'icon-charts',
        children: [
            {
                id: 'charts',
                title: 'Charts',
                type: 'item',
                icon: 'feather icon-pie-chart',
                url: '/charts/nvd3'
            },
            {
                id: 'maps',
                title: 'Map',
                type: 'item',
                icon: 'feather icon-map',
                url: '/maps/google-map'
            }
        ]
    },
    {
        id: 'pages',
        title: 'Pages',
        type: 'group',
        icon: 'icon-pages',
        children: [
            {
                id: 'auth',
                title: 'Authentication',
                type: 'collapse',
                icon: 'feather icon-lock',
                badge: {
                    title: 'New',
                    type: 'label-danger'
                },
                children: [
                    {
                        id: 'signup-1',
                        title: 'Sign up',
                        type: 'item',
                        url: '/auth/signup-1',
                        target: true,
                        breadcrumbs: false
                    },
                    {
                        id: 'signin-1',
                        title: 'Sign in',
                        type: 'item',
                        url: '/auth/signin-1',
                        target: true,
                        breadcrumbs: false
                    }
                ]
            },

            {
                id: 'sample-page',
                title: 'Sample Page',
                type: 'item',
                url: '/sample-page',
                classes: 'nav-item',
                icon: 'feather icon-sidebar'
            },
            {
                id: 'docs',
                title: 'Documentation',
                type: 'item',
                url: '/docs',
                classes: 'nav-item',
                icon: 'feather icon-help-circle'
            },
            {
                id: 'menu-level',
                title: 'Menu Levels',
                type: 'collapse',
                icon: 'feather icon-menu',
                children: [
                    {
                        id: 'menu-level-1.1',
                        title: 'Menu Level 1.1',
                        type: 'item',
                        url: '#!',
                    },
                    {
                        id: 'menu-level-1.2',
                        title: 'Menu Level 2.2',
                        type: 'collapse',
                        children: [
                            {
                                id: 'menu-level-2.1',
                                title: 'Menu Level 2.1',
                                type: 'item',
                                url: '#',
                            },
                            {
                                id: 'menu-level-2.2',
                                title: 'Menu Level 2.2',
                                type: 'collapse',
                                children: [
                                    {
                                        id: 'menu-level-3.1',
                                        title: 'Menu Level 3.1',
                                        type: 'item',
                                        url: '#',
                                    },
                                    {
                                        id: 'menu-level-3.2',
                                        title: 'Menu Level 3.2',
                                        type: 'item',
                                        url: '#',
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 'disabled-menu',
                title: 'Disabled Menu',
                type: 'item',
                url: '#',
                classes: 'nav-item disabled',
                icon: 'feather icon-power'
            },
*/

const itemsAdmin=[
    {
        id: 'navigation',
        title: 'Navigation',
        type: 'group',
        icon: 'icon-navigation',
        children: [
            {
                id: 'dashboard',
                title: 'Tableau de bord',
                type: 'item',
                url: '/dashboard/default',
                icon: 'feather icon-home',
            },
            {
                id: 'projets',
                title: 'Projets',
                type: 'item',
                url: '/projets-page',
                icon: 'feather icon-calendar',
            },
            {
                id: 'laboratoires',
                title: 'Laboratoires',
                type: 'item',
                url: '/laboratoires-page',
                icon: 'feather icon-list',
            },
            {
                id: 'formulaires',
                title: 'Enquétes',
                type: 'item',
                url: '/formulaires-page',
                icon: 'feather icon-clipboard',
            },
            {
                id: 'disciplines',
                title: 'Disciplines',
                type: 'item',
                url: '/disciplines-page',
                icon: 'feather icon-command',
            }
        ]
    }
];
const itemsLabo=[
    {
        id: 'navigation',
        title: 'Navigation',
        type: 'group',
        icon: 'icon-navigation',
        children: [
            {
                id: 'dashboard',
                title: 'Tableau de bord',
                type: 'item',
                url: '/dashboard/default',
                icon: 'feather icon-home',
            },
            {
                id: 'projets',
                title: 'Projets',
                type: 'item',
                url: '/projets-page',
                icon: 'feather icon-calendar',
            }
        ]
    }
];
const items=user.role===1 ? itemsAdmin : itemsLabo;

export default {
    items
    
}