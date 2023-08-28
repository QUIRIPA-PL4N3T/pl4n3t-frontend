import userImg from '~/assets/images/all-img/user.png'

import avatar1 from '~/assets/images/avatar/av-1.svg'
import avatar2 from '~/assets/images/avatar/av-2.svg'
import avatar3 from '~/assets/images/avatar/av-3.svg'
import avatar4 from '~/assets/images/avatar/av-4.svg'
import avatar5 from '~/assets/images/avatar/av-5.svg'
import avatar6 from '~/assets/images/avatar/av-6.svg'

export const menuItems = [
  {
    isHeader: true,
    title: 'menu.title',
  },
  {
    title: 'menu.dashboard',
    icon: 'heroicons-outline:view-boards',
    link: '/dashboard',
    requiredCompany: true,
  },
  {
    title: 'menu.characterization',
    icon: 'heroicons-outline:document',
    link: '/company',
    requiredCompany: false,
    child: [
      {
        childTitle: 'menu.company',
        childLink: '/company',
      },
      {
        childTitle: 'menu.companyLocations',
        childLink: '/company/locations',
      },
    ],
  },
  {
    title: 'menu.inventory',
    icon: 'heroicons-outline:view-boards',
    link: '/company/equipments',
    requiredCompany: true,
  },
  {
    title: 'menu.register-data',
    icon: 'heroicons-outline:clipboard-list',
    link: '/activities',
    requiredCompany: true,
    child: [
      {
        childTitle: 'activities.register',
        childLink: '/activities/register',
      },
      {
        childTitle: 'activities.processActivities',
        childLink: '/activities/liquidation',
      },
    ],
  },
  {
    title: 'menu.reports',
    icon: 'heroicons:document',
    link: '/reports',
    requiredCompany: true,
    requiredData: true,
  },
  {
    title: 'menu.goals',
    icon: 'heroicons:arrow-trending-up',
    link: '/goals',
    requiredCompany: true,
    requiredData: true,
  },
]
// menu settings

export const ProfileMenu = [
  {
    label: 'Profile',
    icon: 'heroicons-outline:user',
    link: '#',
  },

  {
    label: 'Settings',
    icon: 'heroicons-outline:cog',
    link: '#',
  },
  {
    label: 'Membresía',
    icon: 'heroicons-outline:credit-card',
    link: 'pricing',
  },
  {
    label: 'Logout',
    icon: 'heroicons-outline:login',
    link: '/',
  },
]

export const notifications = [
  {
    title: 'Congratulations Darlene  🎉',
    desc: 'Won the monthly best seller badge',
    unread: true,
    image: userImg,
    link: '#',
  },
]

export const message = [
  {
    title: 'Wade Warren',
    desc: 'Hi! How are you doing?.....',
    active: true,
    hasnotifaction: true,
    notification_count: 1,
    image: userImg,
    link: '#',
  },
]

export const topMenu = [
  {
    isHeader: true,
    title: 'DASHBOARD',
  },
  {
    title: 'Dashboard',
    icon: 'heroicons-outline:home',
    link: '/app/home',
    child: [
      {
        childTitle: 'Analytics Dashboard',
        childLink: 'home',
        childicon: 'heroicons:presentation-chart-line',
      },
      {
        childTitle: 'Ecommerce Dashboard',
        childLink: 'ecommerce',
        childicon: 'heroicons:shopping-cart',
      },
      {
        childTitle: 'Project  Dashboard',
        childLink: 'project',
        childicon: 'heroicons:briefcase',
      },
      {
        childTitle: 'CRM Dashboard',
        childLink: 'crm',
        childicon: 'ri:customer-service-2-fill',
      },
      {
        childTitle: 'Banking Dashboard',
        childLink: 'banking',
        childicon: 'heroicons:wrench-screwdriver',
      },
    ],
  },
  {
    title: 'App',
    icon: 'heroicons-outline:chip',
    link: '/app/home',
    child: [
      {
        childTitle: 'Calendar',
        childLink: 'calender',
        childicon: 'heroicons-outline:calendar',
      },
      {
        childTitle: 'Kanban',
        childLink: 'kanban',
        childicon: 'heroicons-outline:view-boards',
      },
      {
        childTitle: 'Todo',
        childLink: 'todo',
        childicon: 'heroicons-outline:clipboard-check',
      },
      {
        childTitle: 'Projects',
        childLink: 'projects',
        childicon: 'heroicons-outline:document',
      },
    ],
  },
  {
    title: 'Pages',
    icon: 'heroicons-outline:view-boards',
    link: '/app/home',
    megamenu: [
      {
        megamenutitle: 'Authentication',
        megamenuicon: 'heroicons-outline:user',
        singleMegamenu: [
          {
            m_childTitle: 'Signin One',
            m_childLink: '/',
          },
          {
            m_childTitle: 'Signin Two',
            m_childLink: '/login2',
          },
          {
            m_childTitle: 'Signin Three',
            m_childLink: '/login3',
          },
          {
            m_childTitle: 'Signup One',
            m_childLink: '/register',
          },
          {
            m_childTitle: 'Signup Two',
            m_childLink: '/register/register2',
          },
          {
            m_childTitle: 'Signup Three',
            m_childLink: '/register/register3',
          },
          {
            m_childTitle: 'Forget Password One',
            m_childLink: '/forgot-password',
          },
          {
            m_childTitle: 'Forget Password Two',
            m_childLink: '/forgot-password2',
          },
          {
            m_childTitle: 'Forget Password Three',
            m_childLink: '/forgot-password3',
          },
          {
            m_childTitle: 'Lock Screen One',
            m_childLink: '/lock-screen',
          },
          {
            m_childTitle: 'Lock Screen Two',
            m_childLink: '/lock-screen2',
          },
          {
            m_childTitle: 'Lock Screen Three',
            m_childLink: '/lock-screen3',
          },
        ],
      },

      {
        megamenutitle: 'Components',
        megamenuicon: 'heroicons-outline:user',
        singleMegamenu: [
          {
            m_childTitle: 'typography',
            m_childLink: 'typography',
          },
          {
            m_childTitle: 'colors',
            m_childLink: 'colors',
          },
          {
            m_childTitle: 'alert',
            m_childLink: 'alert',
          },
          {
            m_childTitle: 'button',
            m_childLink: 'button',
          },
          {
            m_childTitle: 'card',
            m_childLink: 'card',
          },
          {
            m_childTitle: 'carousel',
            m_childLink: 'carousel',
          },
          {
            m_childTitle: 'dropdown',
            m_childLink: 'dropdown',
          },
          {
            m_childTitle: 'image',
            m_childLink: 'image',
          },
          {
            m_childTitle: 'modal',
            m_childLink: 'modal',
          },
          {
            m_childTitle: 'Progress bar',
            m_childLink: 'progress-bar',
          },
          {
            m_childTitle: 'Placeholder',
            m_childLink: 'placeholder',
          },

          {
            m_childTitle: 'Tab & Accordion',
            m_childLink: 'tab-accordion',
          },
        ],
      },
      {
        megamenutitle: 'Forms',
        megamenuicon: 'heroicons-outline:user',
        singleMegamenu: [
          {
            m_childTitle: 'Input',
            m_childLink: 'input',
          },
          {
            m_childTitle: 'Input group',
            m_childLink: 'input-group',
          },
          {
            m_childTitle: 'Input layout',
            m_childLink: 'input-layout',
          },
          {
            m_childTitle: 'Form validation',
            m_childLink: 'form-validation',
          },
          {
            m_childTitle: 'Wizard',
            m_childLink: 'form-wizard',
          },
          {
            m_childTitle: 'Input mask',
            m_childLink: 'input-mask',
          },
          {
            m_childTitle: 'File input',
            m_childLink: 'file-input',
          },
          {
            m_childTitle: 'Form repeater',
            m_childLink: 'form-repeater',
          },
          {
            m_childTitle: 'Textarea',
            m_childLink: 'textarea',
          },
          {
            m_childTitle: 'Checkbox',
            m_childLink: 'checkbox',
          },
          {
            m_childTitle: 'Radio button',
            m_childLink: 'radio-button',
          },
          {
            m_childTitle: 'Switch',
            m_childLink: 'switch',
          },
        ],
      },
      {
        megamenutitle: 'Utility',
        megamenuicon: 'heroicons-outline:user',
        singleMegamenu: [
          {
            m_childTitle: 'Invoice',
            m_childLink: 'invoice',
          },
          {
            m_childTitle: 'Pricing',
            m_childLink: 'pricing',
          },
          {
            m_childTitle: 'Testimonial',
            m_childLink: 'testimonial',
          },
          {
            m_childTitle: 'FAQ',
            m_childLink: 'faq',
          },
          {
            m_childTitle: 'Blog',
            m_childLink: 'blog',
          },
          {
            m_childTitle: '404 page',
            m_childLink: '/404',
          },
          {
            m_childTitle: 'Coming Soon',
            m_childLink: '/coming-soon',
          },
          {
            m_childTitle: 'Under Maintanance page',
            m_childLink: '/under-construction',
          },
        ],
      },
    ],
  },

  {
    isHeader: true,
    title: 'PAGES',
  },
  {
    title: 'Widgets',
    icon: 'heroicons-outline:view-grid-add',
    link: 'form-elements',
    child: [
      {
        childTitle: 'Basic',
        childLink: 'basic',
        childicon: 'heroicons-outline:document-text',
      },
      {
        childTitle: 'Statistic',
        childLink: 'statistic',
        childicon: 'heroicons-outline:document-text',
      },
    ],
  },

  {
    title: 'Extra',
    icon: 'heroicons-outline:template',

    child: [
      {
        childTitle: 'Basic Table',
        childLink: 'table-basic',
        childicon: 'heroicons-outline:table',
      },
      {
        childTitle: 'Advanced table',
        childLink: 'table-advanced',
        childicon: 'heroicons-outline:table',
      },
      {
        childTitle: 'Apex chart',
        childLink: 'appex-chart',
        childicon: 'heroicons-outline:chart-bar',
      },
      {
        childTitle: 'Chart js',
        childLink: 'chartjs',
        childicon: 'heroicons-outline:chart-bar',
      },
      {
        childTitle: 'Map',
        childLink: 'map',
        childicon: 'heroicons-outline:map',
      },
    ],
  },
]

export const alertType = [
  {
    type: 'dark',
  },
  {
    type: 'primary',
  },

  {
    type: 'secondary',
  },
  {
    type: 'success',
  },
  {
    type: 'info',
  },
  {
    type: 'danger',
  },
  {
    type: 'warning',
  },
]

export const alertType2 = [
  {
    type: 'dark-light',
  },
  {
    type: 'primary-light',
  },

  {
    type: 'secondary-light',
  },
  {
    type: 'success-light',
  },
  {
    type: 'info-light',
  },
  {
    type: 'danger-light',
  },
  {
    type: 'warning-light',
  },
]

export const alertType3 = [
  {
    type: 'dark',
    icon: 'fluent:target-20-regular',
  },
  {
    type: 'primary',
    icon: 'fluent:target-20-regular',
  },

  {
    type: 'secondary',
    icon: 'heroicons-outline:support',
  },
  {
    type: 'success',
    icon: 'akar-icons:double-check',
  },
  {
    type: 't-info',
    icon: 'heroicons-outline:information-circle',
  },
  {
    type: 'danger',
    icon: 'heroicons-outline:exclamation',
  },
  {
    type: 'warning',
    icon: 'heroicons-outline:ban',
  },
]
export const alertType4 = [
  {
    type: 'dark-light',
    icon: 'fluent:target-20-regular',
  },
  {
    type: 'primary-light',
    icon: 'fluent:target-20-regular',
  },

  {
    type: 'secondary-light',
    icon: 'heroicons-outline:support',
  },
  {
    type: 'success-light',
    icon: 'akar-icons:double-check',
  },
  {
    type: 'info-light',
    icon: 'heroicons-outline:information-circle',
  },
  {
    type: 'danger-light',
    icon: 'heroicons-outline:exclamation',
  },
  {
    type: 'warning-light',
    icon: 'heroicons-outline:ban',
  },
]
export const alertType5 = [
  {
    type: 'dark-outline',
  },
  {
    type: 'primary-outline',
  },

  {
    type: 'secondary-outline',
  },
  {
    type: 'success-outline',
  },
  {
    type: 'info-outline',
  },
  {
    type: 'danger-outline',
  },
  {
    type: 'warning-outline',
  },
]
export const alertType6 = [
  {
    type: 'dark-outline',
    icon: 'fluent:target-20-regular',
  },
  {
    type: 'primary-outline',
    icon: 'fluent:target-20-regular',
  },

  {
    type: 'secondary-outline',
    icon: 'heroicons-outline:support',
  },
  {
    type: 'success-outline',
    icon: 'akar-icons:double-check',
  },
  {
    type: 'info-outline',
    icon: 'heroicons-outline:information-circle',
  },
  {
    type: 'danger-outline',
    icon: 'heroicons-outline:exclamation',
  },
  {
    type: 'warning-outline',
    icon: 'heroicons-outline:ban',
  },
]

export const trackingParcel = [
  {
    title: 'Project start date',
    desc: 'This parcel is paid for by the customer. Please contact the customer for any further information.',
    date: 'Sep 20, 2021 ',
    time: '12:32 AM',
    status: 'ok',
  },
  {
    title: 'Project start date',
    date: 'Sep 20, 2021 ',
    desc: 'This parcel is paid for by the customer. Please contact the customer for any further information.',
    time: '12:32 AM',
    status: 'ok',
  },
  {
    title: 'Project start date',
    date: 'Sep 20, 2021 ',
    desc: 'This parcel is paid for by the customer. Please contact the customer for any further information.',
    time: '12:32 AM',
    status: 'ok',
  },
  {
    title: 'Project start date',
    date: 'Sep 20, 2021 ',
    desc: 'This parcel is paid for by the customer. Please contact the customer for any further information.',
    time: '12:32 AM',
  },
  {
    title: 'Project start date',
    date: 'Sep 20, 2021 ',
    desc: 'This parcel is paid for by the customer. Please contact the customer for any further information.',
    time: '12:32 AM',
  },
  {
    title: 'Project start date',
    date: 'Sep 20, 2021 ',
    desc: 'This parcel is paid for by the customer. Please contact the customer for any further information.',
    time: '12:32 AM',
  },
  {
    title: 'Project start date',
    date: 'Sep 20, 2021 ',
    desc: 'This parcel is paid for by the customer. Please contact the customer for any further information.',
    time: '12:32 AM',
  },
]

export const TodoList = [
  {
    id: 1,
    image: userImg,
    title: 'Amet minim mollit non deserunt ullam.',
    isDone: false,
  },
  {
    id: 2,
    image: userImg,
    title: 'Amet minim mollit non deserunt ullam.',
    isDone: false,
  },
  {
    id: 3,
    image: userImg,
    title: 'Amet minim mollit non deserunt ullam.',
    isDone: false,
  },
  {
    id: 4,
    image: userImg,
    title: 'Amet minim mollit non deserunt ullam.',
    isDone: false,
  },
  {
    id: 5,
    image: userImg,
    title: 'Amet minim mollit non deserunt ullam.',
    isDone: false,
  },
  {
    id: 6,
    image: userImg,
    title: 'Amet minim mollit non deserunt ullam.',
    isDone: false,
  },
]

//  todo fillter
export const fillters = [
  {
    value: 'all',
    name: 'My Task',
    icon: 'uil:image-v',
  },
  {
    value: 'fav',
    name: 'Starred',
    icon: 'heroicons:star',
  },
  {
    value: 'done',
    name: 'Completed',
    icon: 'heroicons:document-check',
  },
  {
    value: 'trash',
    name: 'Trash',
    icon: 'heroicons:trash',
  },
  {
    name: 'Team',
    icon: 'heroicons:users',
    value: 'team',
  },
  {
    name: 'low',
    icon: 'heroicons:flag',
    value: 'low',
  },
  {
    name: 'medium',
    icon: 'heroicons:flag',
    value: 'medium',
  },
  {
    name: 'high',
    icon: 'heroicons:flag',
    value: 'high',
  },
  {
    name: 'update',
    icon: 'heroicons:refresh',
    value: 'update',
  },
]

export const editCatagory = [
  {
    value: 'team',
    label: 'team',
  },
  {
    value: 'low',
    label: 'low',
  },
  {
    value: 'medium',
    label: 'medium',
  },
  {
    value: 'high',
    label: 'high',
  },
]

export const projectCatagory = [
  {
    value: 'team',
    label: 'team',
  },
  {
    value: 'low',
    label: 'low',
  },
  {
    value: 'medium',
    label: 'medium',
  },
  {
    value: 'high',
    label: 'high',
  },
]

export const assignOption = [
  {
    title: 'Mahedi Amin',
    image: avatar1,
  },
  {
    title: 'Sovo Haldar',
    image: avatar2,
  },
  {
    title: 'Rakibul Islam',
    image: avatar3,
  },
  {
    title: 'Moni Haldar',
    image: avatar4,
  },
  {
    title: 'Pritom Miha',
    image: avatar5,
  },
  {
    title: 'Simanta Kika',
    image: avatar6,
  },
]
