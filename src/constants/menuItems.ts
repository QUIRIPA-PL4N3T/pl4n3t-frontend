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
    link: '/characterization',
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
    link: '/activities/register',
    requiredCompany: true,
  },
  {
    title: 'activities.processActivities',
    icon: 'heroicons-outline:cog',
    link: '/activities/liquidation',
    requiredCompany: true,
  },
  {
    title: 'analytics.title',
    icon: 'heroicons-outline:calculator',
    link: '/analytics/',
    requiredCompany: true,
  },
  {
    title: 'menu.reports',
    icon: 'heroicons:document',
    link: '/reports',
    requiredCompany: true,
    requiredData: true,
    child: [
      {
        childTitle: 'reports.generate',
        childLink: '/reports/',
      },
      {
        childTitle: 'menu.goals',
        childLink: '/goals/',
      },
    ],
  },
]
