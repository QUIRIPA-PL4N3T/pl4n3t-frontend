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
