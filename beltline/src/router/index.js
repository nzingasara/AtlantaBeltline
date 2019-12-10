import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import RegisterUser from '@/components/login/RegisterUser'
import RegisterEmployee from '@/components/login/RegisterEmployee'
import RegisterVisitor from '@/components/login/RegisterVisitor'
import EmployeeVisitor from '@/components/login/EmployeeVisitor'

//import navigation folder
// import {UserNavigation, RegisterNavigation, AdminNavigation, AdminVisitorNavigation
//   ManagerNavigation, ManagerVisitorNavigation, StaffNavigation,StaffVisitorNavigation, VisitorNavigation } from '@/components/navigation'
import RegisterNavigation from '@/components/navigation/RegisterNavigation'
import AdminNavigation from '@/components/navigation/AdminNavigation'
import AdminVisitorNavigation from '@/components/navigation/AdminVisitorNavigation'
import ManagerNavigation from '@/components/navigation/ManagerNavigation'
import ManagerVisitorNavigation from '@/components/navigation/ManagerVisitorNavigation'
import StaffNavigation from '@/components/navigation/StaffNavigation'
import StaffVisitorNavigation from '@/components/navigation/StaffVisitorNavigation'
import VisitorNavigation from '@/components/navigation/VisitorNavigation'
import UserNavigation from '@/components/navigation/UserNavigation'

import TakeTransit from '@/components/functionality/transit/TakeTransit'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/RegisterNavigation',
      name: 'RegisterNavigation',
      component: RegisterNavigation
    },
    {
      path: '/registerUser',
      name: 'registerUser',
      component: RegisterUser
    },
    {
      path: '/registerEmployee',
      name: 'registerEmployee',
      component: RegisterEmployee
    },
    {
      path: '/employeeVisitor',
      name: 'employeeVisitor',
      component: EmployeeVisitor
    },
    {
      path: '/UserNavigation',
      name: 'UserNavigation',
      component: UserNavigation
    },
    {
      path: '/registerVisitor',
      name: 'registerVisitor',
      component: RegisterVisitor
    },
    {
      path: '/AdminNavigation',
      name: 'AdminNavigation',
      component: AdminNavigation
    },
    {
      path: '/AdminVisitorNavigation',
      name: 'AdminVisitorNavigation',
      component: AdminVisitorNavigation
    },
    {
      path: '/ManagerNavigation',
      name: 'ManagerNavigation',
      component: ManagerNavigation
    },
    {
      path: '/ManagerVisitorNavigation',
      name: 'ManagerVisitorNavigation',
      component: ManagerVisitorNavigation
    },
    {
      path: '/StaffNavigation',
      name: 'StaffNavigation',
      component: StaffNavigation
    },
    {
      path: '/StaffVisitorNavigation',
      name: 'StaffVisitorNavigation',
      component: StaffVisitorNavigation
    },
    {
      path: '/VisitorNavigation',
      name: 'VisitorNavigation',
      component: VisitorNavigation
    },
    {
      path: '/TakeTransit',
      name: 'TakeTransit',
      component: TakeTransit
    }
  ]
})
